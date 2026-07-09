import { Outlet } from "react-router-dom";

import BackgroundEffects from "../common/BackgroundEffects";
import Navbar from "./Navbar";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  return (
    <>
      <BackgroundEffects />

      <div className="sb-layout">

        <AdminSidebar />

        <div className="sb-main">

          <Navbar />

          <main className="sb-content">
            <Outlet />
          </main>

        </div>

      </div>
    </>
  );
}