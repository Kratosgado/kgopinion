import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.footerName}>
        Kratosgado && Prodigygenes</div>
      <div className={styles.text}>
        KGOPINION @ {2024} All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
