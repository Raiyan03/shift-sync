import styles from "@/app/ui/dashboard/navbar/user/user.module.css"

export default function User() {
  return (
    <div className={styles.container}>
      <div className="flex flex-col m-auto">
        <span className="font-bold text-x"> John Doe </span>
        <span className=""> Manager </span>
      </div>
      <div>
        <span className="items-center align-middle"></span>
      </div>
    </div>
  );
}
