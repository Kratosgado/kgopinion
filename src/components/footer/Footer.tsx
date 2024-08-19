import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Kratosgado</div>
      <div className={styles.text}>
        Kratosgado thoughts blog @ All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
