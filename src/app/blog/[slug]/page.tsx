import Image from "next/image";
import styles from "./singlePost.module.css";
import { PostProps } from "@/conponents/postCard/PostCard";

const getPost = async (slug: any) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);
  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return (await res.json()) as PostProps;
};

const SinglePostPage = async ({ params }: { params: any }) => {
  const { slug } = params;
  const post = await getPost(slug);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="/about.png" alt="" fill sizes="50" className={styles.img} />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          <Image
            src="/about.png"
            className={styles.avatar}
            alt=""
            width={50}
            height={50}
          />
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Author</span>
            <span className={styles.detailValue}>Kratosgado </span>
          </div>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published </span>
            <span className={styles.detailValue}>01.01.2024</span>
          </div>
        </div>
        <div className={styles.content}>{post.body} </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
