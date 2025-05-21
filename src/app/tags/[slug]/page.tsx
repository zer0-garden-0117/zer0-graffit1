import { PostItem } from "../../../lib/types";
import { Metadata } from "next";
import { PageData, createPageData, getPostData, getTagsData } from "../../../lib/functions";
import PostCard from "@/components/Contents/PostCard/PostCard";
import Pagination from "@/components/Contents/Pagenation/Pagenation";
import { SimpleGrid, Group } from "@mantine/core";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = decodeURIComponent(slug);
  return {
    title: `${tag} | ブログタイトル`,
    description: `${tag}`,
  };
}

// 静的ルートの作成
export async function generateStaticParams() {
  const allTags = new Set<string>();

  const posts = await getPostData();
  posts.forEach((post: PostItem) => {
    if (post.tags) {
      post.tags.forEach((tag: string) => {
        allTags.add(encodeURIComponent(tag));
      });
    }
  });

  return Array.from(allTags).map((tag) => (
    { slug: tag }));
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await getTagsData(slug);
  const pageData: PageData = createPageData(1, posts.length);

  return (
    <>
      {/* 記事一覧表示 */}
      <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="lg">
        {posts.slice(pageData.start, pageData.end).map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </SimpleGrid>

      {/* ページネーション */}
      <Group justify="center" mt="xl">
        <Pagination
          type={`tags/${slug}`}
          pages={pageData.pages}
        />
      </Group>
    </>
  );
}