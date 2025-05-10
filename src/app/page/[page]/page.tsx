import { Metadata, ResolvingMetadata } from "next";
import { POSTS_PER_PAGE } from "../../../lib/constants";
import { PageData, createPageData, getPostData } from "../../../lib/functions";
import PostCard from "@/components/Contents/PostCard/PostCard";
import Pagination from "@/components/Contents/Pagenation/Pagenation";
import { SimpleGrid, Group } from "@mantine/core";

type Props = {
  params: { page: number };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const param = await params
  const title = `${param.page}ページ目`;
  return {
    title: `${title} | ブログタイトル`,
    description: `${title}`,
  };
}

// 静的ルートの作成
export async function generateStaticParams() {
  const posts = await getPostData();

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const pages = Array.from({ length: totalPages }, (_, i) => {
    return {
      path: `/page/${i + 1}`,
      page: `${i + 1}`,
    };
  });

  return pages;
}

export default async function Page({ params }: { params: { page: number } }) {
  const param = await params
  const posts = await getPostData();

  const pageData: PageData = createPageData(param.page, posts.length);

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
          type="page"
          pages={pageData.pages}
        />
      </Group>
    </>
  );
}