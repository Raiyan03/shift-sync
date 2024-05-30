import { MdSupervisedUserCircle } from "react-icons/md"
import styles from "./cards.module.css"

export default function Cards() {
  return (
    <div className={`${styles.container} px-32`}>
        <MdSupervisedUserCircle size={24}/>
        <div className="flex flex-col gap-5">
            <span>Total Users</span>
            <span className="text-2xl font-500">10</span>
        </div>
    </div>
  )
}
