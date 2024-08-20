import { getUser } from "@/lib/data";
import Image from "next/image";
import styles from "./postUser.module.css";
import { User } from "@/lib/models/user";

const PostUser = async ({ userId }: { userId: string }) => {
  const user: User = await getUser(userId);

  return (
    <div className={styles.container}>
      <Image
        className={styles.avatar}
        src={user.img ? user.img : "/noavatar.png"}
        alt="avatar"
        width={50}
        height={50}
      />
      <div className={styles.texts}>
        <span className={styles.title}>Author</span>
        {user && <span className={styles.username}>{user.username}</span>}
      </div>
    </div>
  );
};

export default PostUser;

function getData(userId: string) {
  throw new Error("Function not implemented.");
}
