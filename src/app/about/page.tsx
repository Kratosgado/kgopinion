import { Metadata } from "next";
import Image from "next/image";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Page",
  description: "About description",
};

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>About KgOpinion</h2>
        <h1 className={styles.title}>
          KGOPINION ~ The Origin.
        </h1>
        <p className={styles.desc}>
          We are a team of two who aim to leave a mark on this world in our own way.
          We create digital ideas that are bigger, bolder, braver and better. we
          believe in good ideas, flexibility and precision.
          Our Special Team also aims to provide various tech services for anything at all.
        </p>
        <div className={styles.boxes}>
          <div className={styles.box}>
            <h1>2+</h1> <p>Years of experience</p>
          </div>
          <div className={styles.box}>
            <h1>0+</h1> <p>subscribers</p>
          </div>
          
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/about.png" alt="About Image" fill className={styles.img} />
      </div>
    </div>
  );
};

export default AboutPage;
