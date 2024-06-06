import { MdInfo } from "react-icons/md";
import styles from "./info.module.css"

export default function Info({name, company}) {
  return (
    <div className={styles.container}>
      <div className="flex gap-3">
      <MdInfo size={32} />
      <h2 className={styles.title}>Info</h2>
      </div>
      <div className={styles.data}>
        <span className="flex">Name: John Doe</span>
        <span>Organization: Harvey</span>
        <span></span>
      </div>
    </div>
  );
}
