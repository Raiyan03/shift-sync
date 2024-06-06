import Navbar from "../ui/dashboard/navbar/navbar";
import styles from "@/app/ui/dashboard/dashboard.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Navbar />
        {children}
      </div>
    </div>
  );
}
