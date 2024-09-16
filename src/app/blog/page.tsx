import PostCard from "@/components/postCard/PostCard";
import styles from "./blog.module.css";
import { Post } from "@/lib/models/post";
// import { NEXT_PUBLIC_API_URL } from "@/lib/utils";
import { getPosts } from "@/lib/data";
// import { getPosts } from "@/lib/data";

// const getPosts = async () => {
//   const res = await fetch(`${NEXT_PUBLIC_API_URL}/blog`, {
//     next: { revalidate: 3600 },
//   });
//   console.log(res);
//   if (!res.ok) {
//     console.error(res);
//     return null;
//   }
//   return res.json();
// };

const BlogPage = async () => {
  const posts: Post[] = await getPosts();

  if (!posts) {
    return <div>Failed to fetch posts</div>;
  }

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
