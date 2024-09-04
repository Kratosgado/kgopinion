import Image from "next/image";
import styles from "./home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>KGOPINION ~ INSIGHTS ON TECH AND MORE</h1>
        <p className={styles.desc}>
          <b>KGOPINION</b> offers thought-provoking articles and expert opinions on the latest in technology, science, and a variety of trending topics. Dive into in-depth analyses, personal perspectives, and fresh takes from a unique voice in the tech and science world.
        </p>
        <div className={styles.buttons}>
          <button className={styles.button}>Learn More</button>
          <button className={styles.button}>Contact</button>
        </div>
        <div className={styles.brands}>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/hero.gif" alt="" fill className={styles.heroImg} />
      </div>
    </div>
  );
};

export default Home;
