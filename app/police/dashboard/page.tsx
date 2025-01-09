import Logo from "@/components/ui/Logo";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";

export default function PoliceDashboard() {
  return (
    <div className="grid grid-cols-11 grid-rows-8 h-screen w-screen">
      {/* topbar */}
      <div className="col-span-12 w-full h-16 flex items-center gap-3 px-4">
        <Logo />
        <h1 className="font-black text-2xl">Roadsafe</h1>
      </div>

      <div className="row-span-7 row-start-2 flex flex-col justify-start items-center w-20">
        <Sidebar />
      </div>
      <div className="col-span-11 row-span-7 row-start-2">
        <Dashboard />
      </div>
    </div>
  );
}
