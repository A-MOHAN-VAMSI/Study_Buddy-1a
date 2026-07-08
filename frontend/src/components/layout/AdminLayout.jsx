import { Outlet } from "react-router-dom";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      <div className="mx-auto max-w-7xl px-8 py-8">
        {children ? children : <Outlet />}
      </div>
    </div>
  );
}