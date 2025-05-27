import { SimpleGrid, Group } from '@mantine/core';
import PostCard from "@/components/Contents/PostCard/PostCard";
import { PageData, createPageData, getPostData } from "../lib/functions";
import Pagination from "@/components/Contents/Pagenation/Pagenation";

export default async function Home() {
  const posts = await getPostData();
  const pageData: PageData = createPageData(1, posts.length);

  return (
    <>
      {/* 記事一覧表示 */}
      <SimpleGrid cols={{ base: 1, sm: 1, md: 2 }} spacing="lg">
        {posts.slice(pageData.start, pageData.end).map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </SimpleGrid>

      {/* ページネーション */}
      <Group justify="flex-end" mt="xl">
        <Pagination
          type="page"
          pages={pageData.pages}
        />
      </Group>
    </>
  );
}