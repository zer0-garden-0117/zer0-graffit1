
import PostCard from "@/components/Contents/PostCard/PostCard";
import { PageData, createPageData, getPostData } from "../lib/functions";
import Pagination from "@/components/Contents/Pagenation/Pagenation";

export default async function Home() {
  const posts = await getPostData();

  const pageData: PageData = createPageData(1, posts.length);

  return (
    <div className="container">
      <div className="row">
        {posts.slice(pageData.start, pageData.end).map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <div className="mb-3">
        <Pagination
          type="page"
          pages={pageData.pages}
          currentPage={pageData.currentPage}
        />
      </div>
    </div>
  );
}