import { Map } from "lucide-react";

export function Header() {
  return (
    <div className="flex items-center gap-2 bg-white p-4 shadow-md">
      <div className="p-2 bg-[#0C6A3D] rounded-full">
        <Map width={24} height={24} color={"white"} />
      </div>
      <h1 className="text-[#0C6A3D] font-bold">Parks & Trails Companion</h1>
    </div>
  );
}
