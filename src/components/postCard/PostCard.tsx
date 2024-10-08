import Image from "next/image";
import styles from "./postCard.module.css";
import Link from "next/link";
import { Post } from "@/lib/models/post";

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {post && (
          <div className={styles.imgContainer}>
            <Image src={post.img} alt="post" fill className={styles.img} />
          </div>
        )}
        <span className={styles.date}>{post.createdAt.toISOString().split('T')[0]}</span>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.desc}>{post.desc}</p>
        <Link className={styles.link} href={`/blog/${post.slug}`}>
          READ MORE
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
