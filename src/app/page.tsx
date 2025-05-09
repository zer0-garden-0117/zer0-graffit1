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