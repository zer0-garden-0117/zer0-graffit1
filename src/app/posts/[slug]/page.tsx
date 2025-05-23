import fs from "fs";
import path from "path";
import Link from "next/link";
import React from "react";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { rehype } from "rehype";
import rehypeRaw from "rehype-raw";
import rehypePrism from "rehype-prism-plus";
import rehypeStringify from "rehype-stringify";
import rehypeExternalLinks from "rehype-external-links";
import { PostItem } from "../../../lib/types";
import { Metadata } from "next";
import { getPostData } from "../../../lib/functions";
import {
  Title,
  Text,
  Group,
  Badge,
  Stack,
  Box,
  Divider,
  Card,
  Space,
  Blockquote,
  Code,
  Anchor,
  Paper
} from "@mantine/core";
import { CodeHighlight } from '@mantine/code-highlight';
import { CiCalendarDate } from "react-icons/ci";
import GiscusComments from "@/components/Contents/GiscusComments/GiscusComments";
import parse, { DOMNode, HTMLReactParserOptions, domToReact } from "html-react-parser";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const param = await params;
  const slug = param.slug;
  const post = await createPostData(slug); 

  return {
    title: `${post.title} | ブログタイトル`,
    description: `${post.description ?? post.title}`,
    openGraph: {
      title: `${post.title} | ブログタイトル`,
      description: `${post.description ?? post.title}`,
    },
  };
}

export async function generateStaticParams() {
  // const postsDirectory = path.join(process.cwd(), "src/posts");
  const posts = await getPostData();
  return posts.map((post: PostItem) => {
    return {
      path: `/posts/${post.slug}`,
      slug: post.slug,
    };
  });
}

async function createPostData(slug: string): Promise<PostItem> {
  const filePath = path.join(process.cwd(), "src/posts", `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  // h1要素を非表示
  const contentWithoutH1 = content.replace(/^#\s.+$/gm, '');

  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(contentWithoutH1);

  const contentHtml = processedContent.toString();

  const rehypedContent = await rehype()
    .data("settings", { fragment: true })
    .use(rehypeRaw)
    .use(rehypePrism)
    .use(rehypeExternalLinks, { target: "_blank", rel: ["nofollow"] })
    .use(rehypeStringify)
    .process(contentHtml);

  return {
    slug: slug,
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags,
    contentHtml: rehypedContent.value.toString(),
  };
}

const MantineMarkdownRenderer = ({ html }: { html: string }) => {

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode.type === "tag" && domNode.name) {
        switch (domNode.name) {
          case "h1":
            return null;
          case "h2":
            return (
              <Stack gap={0}>
                <Title
                  order={2}
                  mt="xs"
                > 
                  {domToReact(domNode.children as DOMNode[], options)}
                </Title>
                <Divider my="1" mb="xs"/>
                </Stack>
            );
          case "h3":
            return (
              <Title order={3} mt="lg" mb="sm">
                {domToReact(domNode.children as DOMNode[], options)}
              </Title>
            );
          case "p":
            return (
              <Text mb="md" size="lg">
                {domToReact(domNode.children as DOMNode[], options)}
              </Text>
            );
          // case "ul":
          //   return (
          //     <List withPadding mb="md" size="lg">
          //       {domToReact(domNode.children as DOMNode[], options)}
          //     </List>
          //   );
          // case "ol":
          //   return (
          //     <List type="ordered" withPadding mb="md" size="lg">
          //       {domToReact(domNode.children as DOMNode[], options)}
          //     </List>
          //   );
          // case "li":
          //   return (
          //     <List withPadding mb="md" size="lg">1
          //       {domToReact(domNode.children as DOMNode[], options)}
          //     </List>
          //   );
          case "a":
            return (
              <Anchor
                href={domNode.attribs?.href}
                target="_blank"
                rel="nofollow"
                underline='always'
              >
                {domToReact(domNode.children as DOMNode[], options)}
              </Anchor>
            );
          case "blockquote":
            return (
              <Blockquote
                mb="md"
                cite={domNode.attribs?.cite}
              >
                {domToReact(domNode.children as DOMNode[], options)}
              </Blockquote>
            );
          case "pre":
            return (
              <Box mb="md">
                <Code block>{domToReact(domNode.children as DOMNode[], options)}</Code>
              </Box>
            );
          case "code":
            const getCodeString = (nodes: DOMNode[]): string => {
              return nodes
                .map((node) => {
                  if (node.type === 'text') {
                    return node.data;
                  }
                  if (node.type === 'tag' && node.children) {
                    return getCodeString(node.children as DOMNode[]);
                  }
                  return '';
                })
                .join('');
            };
            const codeString = domNode.children ? getCodeString(domNode.children as DOMNode[]) : '';
            return (
              <CodeHighlight
                code={codeString} 
                withCopyButton
                withExpandButton={false}
                defaultExpanded={true}
              />
            );
           case "img":
            return (
              <Box
                my="xl"
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
              </Box>
            );
          default:
            return null;
        }
      }
    },
  };

  return <>{parse(html, options)}</>;
};

export default async function Post({ params }: Props) {
  const param = await params;
  const postData = await createPostData(param.slug);

  return (
    <>
      <Card radius="md" p="xl" withBorder shadow="sm">
        <Stack gap="xs">
          <Stack gap="xs">
            <Title order={1}>
              {postData.title}
            </Title>

            <Group gap="3">
              <CiCalendarDate size={18} color="#495057" />
              <Text size="sm" c="dimmed" mt={2}>
                {new Date(postData.date).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </Group>

            {postData.tags && postData.tags.length > 0 && (
              <Group gap="xs">
                {postData.tags.map((tag) => (
                  <Badge
                    color="blue"
                    variant="light"
                    key={tag}
                    radius="md"
                    component={Link}
                    href={`/tags/${tag}`}
                    style={{
                      cursor: "pointer",
                      "&:hover": {
                        transform: "translateY(-1px)",
                        transition: "transform 0.2s ease",
                        backgroundColor: "#e9ecef",
                      },
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </Group>
            )}
          </Stack>

          <Divider />

          <Paper p="md" withBorder>
            <MantineMarkdownRenderer html={postData.contentHtml} />
          </Paper>
        </Stack>
      </Card>
      <Space h={"md"} />
      <Card radius="md" p="xl" withBorder shadow="sm">
        <GiscusComments />
      </Card>
    </>
  );
}