import styles from "./index.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={styles.footer}>
        Copyright © {new Date().getFullYear()}, Hotdealsbazaar.com | All Rights
        Reserved
      </div>
    </footer>
  );
};
export default Footer;
