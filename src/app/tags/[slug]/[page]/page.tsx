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

type Props = {
  params: { slug: string; page: number };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const tag = decodeURIComponent(params.slug);
  const title = `${tag} - ${params.page}ページ目 | Nemutai`;
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
  const posts = await getTagsData(params.slug);

  const pageData: PageData = createPageData(params.page, posts.length);

  return (
    <>
      <div className="my-8">
        <div className="row">
          {posts.slice(pageData.start, pageData.end).map((post) => (
            <PostCard key={post.title} post={post} />
          ))}
        </div>
        <div className="mb-3">
          <Pagination
            type={`tags/${params.slug}`}
            pages={pageData.pages}
            currentPage={pageData.currentPage}
          />
        </div>
      </div>
    </>
  );
}