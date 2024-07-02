"use client";
import { useState } from "react";
import Cards from "@/components/manager/cards";
import ScheduleTable from "@/components/manager/Schedule-Table"
export default function Page() {
    const [schedule, setSchedule] = useState();
    const [loading, setLoading] = useState(false);
    return (
        <div >
          <ScheduleTable Schedule={schedule} setSchedule={setSchedule} Loading={loading} setLoading={setLoading} />
        </div>
  );
}
