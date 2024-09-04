import Image from "next/image";
import styles from "./singlePost.module.css";
import { Post } from "@/lib/models/post";

import PostUser from "@/components/postUser/PostUser";
import { Suspense } from "react";
import { NEXT_PUBLIC_API_URL } from "@/lib/utils";
import { getPost, getUser } from "@/lib/data";
import { User } from "@/lib/models/user";
// import { getPost } from "@/lib/data";

// const getPost = async (slug: string) => {
//   const res = await fetch(`${NEXT_PUBLIC_API_URL}/blog/${slug}`, {
//     next: { revalidate: 3600 },
//   });
//   if (!res.ok) {
//     console.error(res);
//     return null;
//   }
//   return res.json();
// };

export const generateMetadata = async ({ params }: { params: any }) => {
  const { slug } = params;
  const post: Post = await getPost(slug);

  if (!post) {
    return {
      title: "Post not found",
      description: "",
      image: "",
    };
  }

  return {
    title: post.title,
    description: post.desc,
    image: post.img,
  };
};

const SinglePostPage = async ({ params }: { params: any }) => {
  const { slug } = params;
  const post: Post = await getPost(slug);

  if (!post) {
    return <div>Post not found</div>;
  }


  return (
    <div className={styles.container}>
      {post.img && (
        <div className={styles.imgContainer}>
          <Image
            src={post.img}
            alt=""
            fill
            sizes="50"
            className={styles.img}
          />
        </div>
      )}
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
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={post.userId} />
            </Suspense>
          )}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published </span>
            <span className={styles.detailValue}>
              {post.createdAt.toString().slice(4, 16)}
            </span>
          </div>
        </div>
        <div className={styles.content}>{post.body} </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
