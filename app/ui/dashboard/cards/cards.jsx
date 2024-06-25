import { MdSupervisedUserCircle } from "react-icons/md"
import styles from "./cards.module.css"

export default function Cards({employees}) {
  return (
    <div className={styles.container}>
        <MdSupervisedUserCircle size={32}/>
        <div className="flex flex-col gap-5">
            <span className="text-xl">Total Employees</span>
            <span className="text-2xl font-500">{employees}</span>
        </div>
    </div>
  )
}
