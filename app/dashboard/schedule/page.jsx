"use client"
import styles from "@/app/ui/schedule/schedule.module.css"
import Table from "@/app/ui/schedule/table/table"
import Schedule from "@/app/ui/schedule/scheduleTable/scheduleTable"

export default function SchedulePage() {
  return (
    <div className={styles.container}>
      <Table />
    </div>
  )
}
