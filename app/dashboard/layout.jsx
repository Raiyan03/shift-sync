import Navbar from "../ui/dashboard/navbar/navbar";

export default function Layout({ children }) {
  return (
    <div>
      <div className="flex-4 p-5">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
