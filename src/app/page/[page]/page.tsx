import { Metadata } from "next";
import { POSTS_PER_PAGE } from "../../../lib/constants";
import { PageData, createPageData, getPostData } from "../../../lib/functions";
import PostCard from "@/components/Contents/PostCard/PostCard";
import Pagination from "@/components/Contents/Pagenation/Pagenation";
import { SimpleGrid, Group } from "@mantine/core";

type PageProps = {
  params: Promise<{ page: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page } = await params;
  const title = `${page}ページ目`;
  return {
    title: `${title} | ブログタイトル`,
    description: `${title}`,
  };
}

// 静的ルートの作成
export async function generateStaticParams() {
  const posts = await getPostData();

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(), // 文字列型で返す
  }));
}

export default async function Page({ params }: PageProps) {
  const { page } = await params;
  const posts = await getPostData();
  const currentPage = parseInt(page) || 1; // 数値に変換

  const pageData: PageData = createPageData(currentPage, posts.length);

  return (
    <>
      {/* 記事一覧表示 */}
      <SimpleGrid cols={{ base: 1, sm: 1, md: 2 }} spacing="lg">
        {posts.slice(pageData.start, pageData.end).map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </SimpleGrid>

      {/* ページネーション */}
      <Group justify="center" mt="xl">
        <Pagination
          type="page"
          pages={pageData.pages}
        />
      </Group>
    </>
  );
}