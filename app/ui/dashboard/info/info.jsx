import { MdInfo } from "react-icons/md";

export default function Info({name, company}) {
  return (
    <div className="flex bg-bgSoft p-5 rounded-[10px] gap-[10px] flex-col">
      <div className="flex gap-3">
      <MdInfo size={32} />
      <h2 className="text-xl">Info</h2>
      </div>
      <div className="flex flex-col p-[10px]">
        <span className="flex text-xl">Name: Fiedel Castro</span>
        <span>Organization: Cuba</span>
        <span></span>
      </div>
    </div>
  );
}
