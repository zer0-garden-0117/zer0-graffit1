import { PostItem } from "@/lib/types";
import Link from "next/link";

const PostCard = ({ post }: { post: PostItem }) => {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="align-self-baseline col-lg-4 d-flex flex-column justify-content-between scale-95 hover:scale-100 ease-in duration-100"
    >
      {post.image && (
        <div className="border rounded-lg mx-auto">
          <picture>
            <img
              src={`${post.image}`}
              width={600}
              height={300}
              alt={post.title}
              className="object-contain img-fluid img-thumbnail"
              style={{ maxWidth: "100%", height: "224px" }}
            />
          </picture>
        </div>
      )}
      <div className="px-2 py-3 mt-auto">
        <h1 className="font-bold text-lg">{post.title}</h1>
        <span className="badge bg-secondary text-white">{post.date}</span>
      </div>
    </Link>
  );
};

export default PostCard;