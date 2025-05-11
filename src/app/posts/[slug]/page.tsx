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
import { Metadata, ResolvingMetadata } from "next";
import { getPostData } from "../../../lib/functions";
import {
  Title,
  Text,
  Image,
  Group,
  Badge,
  Stack,
  Box,
  Divider,
  Card,
  Space,
} from "@mantine/core";
import { CiCalendarDate } from "react-icons/ci";
import GiscusComments from "@/components/Contents/GiscusComments/GiscusComments";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
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
      images: post.image ? [{ url: post.image }] : [],
    },
  };
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "src/posts");
  const filenames = fs.readdirSync(postsDirectory);
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

  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(content);

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
    image: data.image,
    tags: data.tags,
    contentHtml: rehypedContent.value.toString(),
  };
}

export default async function Post({ params }: Props) {
  const param = await params;
  const postData = await createPostData(param.slug);

  return (
    <>
    <Card
      radius="md"
      p="xl"
      withBorder
      shadow="sm"
      // style={{ backgroundColor: 'white' }}
    >
      <Stack gap="lg">
        {postData.image && (
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: '16px',
            }}
          >
            <Image
              src={postData.image}
              alt={postData.title}
              radius="md"
              fit="contain"
              style={{
                maxHeight: 400,
                width: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        )}

        <Stack gap="xs">
          <Title order={1} w={800} c="dark">
            {postData.title}
          </Title>

          <Group gap="3">
            <CiCalendarDate size={18} color="#495057"/>
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
                  key={tag}
                  variant="filled"
                  radius="sm"
                  component={Link}
                  href={`/tags/${tag}`}
                  style={{
                    cursor: "pointer",
                    backgroundColor: '#f1f3f5',
                    color: '#495057',
                    "&:hover": {
                      transform: "translateY(-1px)",
                      transition: "transform 0.2s ease",
                      backgroundColor: '#e9ecef',
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

        <Box
          className="markdown-content"
          style={{
            "& h2": {
              marginTop: '24px',
              marginBottom: '16px',
              fontWeight: 700,
              fontSize: '20px',
              borderBottom: '1px solid #e9ecef',
              paddingBottom: '10px',
              color: '#212529',
            },
            "& h3": {
              marginTop: '20px',
              marginBottom: '12px',
              fontWeight: 600,
              fontSize: '18px',
              color: '#212529',
            },
            "& pre": {
              borderRadius: '8px',
              marginTop: '16px',
              marginBottom: '16px',
              backgroundColor: '#f8f9fa',
              padding: '16px',
              overflow: 'auto',
            },
            "& code": {
              borderRadius: '4px',
              padding: '4px 8px',
              backgroundColor: '#f8f9fa',
              color: '#e64980',
            },
            "& a": {
              color: '#228be6',
              textDecoration: "underline",
            },
            "& img": {
              maxWidth: "100%",
              borderRadius: '8px',
              marginTop: '16px',
              marginBottom: '16px',
            },
            "& blockquote": {
              borderLeft: '4px solid #e9ecef',
              paddingLeft: '16px',
              marginLeft: 0,
              color: '#495057',
              fontStyle: "italic",
            },
            "& p": {
              color: '#212529',
              lineHeight: 1.6,
            },
          }}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </Stack>
    </Card>
    <Space h={"md"}/>
    <Card
      radius="md"
      p="xl"
      withBorder
      shadow="sm"
    >
      <GiscusComments />
    </Card>
    </>
  );
}