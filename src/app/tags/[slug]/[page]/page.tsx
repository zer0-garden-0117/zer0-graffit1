import { PostItem } from "../../../../lib/types";
import { Metadata, ResolvingMetadata } from "next";
import {
  PageData,
  createPageData,
  getPostData,
  getTagsData,
} from "../../../../lib/functions";
import PostCard from "@/components/Contents/PostCard/PostCard";
import Pagination from "@/components/Contents/Pagenation/Pagenation";
import { SimpleGrid, Group } from "@mantine/core";

type Props = {
  params: { slug: string; page: number };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const param = await params
  const tag = decodeURIComponent(param.slug);
  const title = `${tag} - ${param.page}ページ目`;
  return {
    title: title,
    description: `${tag}`,
  };
}

// 静的ルートの作成
export async function generateStaticParams() {
  const tagMaps: Record<string, number> = {};
  const posts = await getPostData();
  posts.forEach((post: PostItem) => {
    if (post.tags) {
      post.tags.forEach((tag: string) => {
        tag = encodeURIComponent(tag);
        if (tagMaps[tag]) {
          tagMaps[tag]++;
        } else {
          tagMaps[tag] = 1;
        }
      });
    }
  });

  let params: { path: string; slug: string; page: string }[] = [];

  // ページ数で按分
  for (const key in tagMaps) {
    if (tagMaps.hasOwnProperty(key)) {
      const totalPages = Math.ceil(tagMaps[key] / 1);
      for (let i = 1; i <= totalPages; i++) {
        const routes = {
          path: `/tags/${key}/${i}`,
          slug: `${key}`,
          page: `${i}`,
        };
        params.push(routes);
      }
    }
  }

  return params;
}

export default async function TagPage({
  params,
}: {
  params: { slug: string; page: number };
}) {
  const param = await params
  const posts = await getTagsData(param.slug);

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
          type={`tags/${param.slug}`}
          pages={pageData.pages}
        />
      </Group>
    </>
  );
}