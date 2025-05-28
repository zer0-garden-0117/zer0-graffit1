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
  List,
  Image
} from "@mantine/core";
import { CodeHighlight } from '@mantine/code-highlight';
import { CiCalendarDate } from "react-icons/ci";
import GiscusComments from "@/components/Contents/GiscusComments/GiscusComments";
import parse, { DOMNode, HTMLReactParserOptions, domToReact } from "html-react-parser";
import { IconExternalLink } from '@tabler/icons-react';
import remarkGfm from 'remark-gfm'

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const param = await params;
  const slug = param.slug;
  const post = await createPostData(slug); 
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    title: `${post.title} | zer0 graffit1`,
    description: `${post.contentWithoutHtml}`,
    openGraph: {
      title: `${post.title} | zer0 graffit1`,
      description: `${post.contentWithoutHtml}`,
    },
    twitter: {
      card: 'summary',
      title: `${post.title} | zer0 graffit1`,
      description: `${post.contentWithoutHtml}`,
      images: [`${baseUrl}/ogp.jpg`], 
    }
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

  // HTMLタグを含まないプレーンテキストを生成
  const contentWithoutHtml = contentWithoutH1
    .replace(/<[^>]*>/g, '') // HTMLタグを削除
    .replace(/\n+/g, ' ') // 複数改行をスペースに
    .replace(/\s+/g, ' ') // 連続するスペースを1つに
    .trim()
    .substring(0, 200); // 200文字に制限

  const processedContent = await remark()
    .use(remarkGfm)
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
    contentWithoutHtml
  };
}

const MantineMarkdownRenderer = ({ html }: { html: string }) => {

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode.type === "tag" && domNode.name) {
        switch (domNode.name) {
          // 各HTML要素に対するMantineコンポーネントの割り当て
          case "h1":
            return (
              <Stack gap={0}>
                <Title
                  order={1}
                  mt="xs"
                > 
                  {domToReact(domNode.children as DOMNode[], options)}
                </Title>
                <Divider my="1" mb="xs"/>
              </Stack>
            );
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
              <Text size="lg">
                {domToReact(domNode.children as DOMNode[], options)}
              </Text>
            );
          case "ul":
            return (
              <List withPadding>
                {domToReact(domNode.children as DOMNode[], options)}
              </List>
            );
          case "ol":
            return (
              <List type="ordered" withPadding>
                {domToReact(domNode.children as DOMNode[], options)}
              </List>
            );
          case "a":
            return (
              <>
                <Anchor
                  href={domNode.attribs?.href}
                  target="_blank"
                  rel="nofollow"
                  underline='always'
                  mr={1}
                >
                  {domToReact(domNode.children as DOMNode[], options)}
                </Anchor>
                <IconExternalLink stroke={1.5} size={12} color="var(--mantine-color-anchor)"/>
              </>
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
            const classNames = domNode.attribs?.class || '';
            const languageMatch = classNames.match(/language-(\w+)/);
            const language = languageMatch ? languageMatch[1] : 'tsx';
            return (
              <CodeHighlight
                code={codeString} 
                withCopyButton
                withExpandButton={false}
                defaultExpanded={true}
                language={language}
                styles={{
                  pre: {
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  },
                  control: {
                    color: 'var(--mantine-color-gray-6)',
                  },
                }}
              />
            );
           case "img":
            return (
              <Image
                src={domNode.attribs?.src}
                alt=""
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "var(--mantine-radius-md)",
                }}
              />
            );
          case "del":
          case "s":
            return (
              <Text span style={{ textDecoration: "line-through" }}>
                {domToReact(domNode.children as DOMNode[], options)}
              </Text>
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

          <MantineMarkdownRenderer html={postData.contentHtml} />
        </Stack>
      </Card>
      <Space h={"md"} />
      <Card radius="md" p="xl" withBorder shadow="sm">
        <GiscusComments />
      </Card>
    </>
  );
}