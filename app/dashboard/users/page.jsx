import Pagination from "@/app/ui/users/pagination/pagination";
import Table from "@/app/ui/users/table/table";
import Link from "next/link";

export default function Users() {
  return (
    <div className="m-10 p-4 gap-1 justify-center items-center align-middle bg-bgSoft rounded-xl h-full">
      <div className="flex items-center justify-between">
        <Link href={"/dashboard/users/add"}>
          <button className="p-3 bg-buttonColor text-text border-none border rounded-md cursor-pointer">
            Add Employee
          </button>
        </Link>
      </div>
      <div className="w-3/4 m-auto align-middle items-center">
        <Table />
        <Pagination />
      </div>
    </div>
  );
}
