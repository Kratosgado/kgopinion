import PostCard from "@/components/postCard/PostCard";
import styles from "./blog.module.css";
import { Post } from "@/lib/models/post";
import { API } from "@/lib/utils";
// import { getPosts } from "@/lib/data";

const getPosts = async () => {
  const res = await fetch(`${API}/blog`, {
    next: { revalidate: 3600 },
  });
  console.log(res);
  if (!res.ok) {
    console.error(res);
    throw Error("Something went wrong");
  }
  return res.json();
};

const BlogPage = async () => {
  const posts: Post[] = await getPosts();
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
