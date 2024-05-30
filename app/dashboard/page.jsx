import Cards from "../ui/dashboard/cards/cards";
import styles from "../ui/dashboard/dashboard.module.css";
import Info from "../ui/dashboard/info/info";

export default function DashboardPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Cards />
        </div>
        <Info />
      </div>
    </div>
  );
}
