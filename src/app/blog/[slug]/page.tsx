import Image from "next/image";
import styles from "./singlePost.module.css";

const SinglePostPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="/about.png" alt="" fill sizes="50" className={styles.img} />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Title</h1>
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
        <div className={styles.content}>
          More like the description of each posts, relax we will be doing
          everything and all will be fine just combine what you want and you
          want go ole, fact on the only
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
