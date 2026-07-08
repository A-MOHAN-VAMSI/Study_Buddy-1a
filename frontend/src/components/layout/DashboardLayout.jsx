import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import BackgroundEffects from "../common/BackgroundEffects";

export default function DashboardLayout({ children }) {
  return (
    <>
      <BackgroundEffects />

      <div className="sb-layout">

        <Sidebar />

        <div className="sb-main">

          <Navbar />

          <main className="sb-content">
            {children}
          </main>

        </div>

      </div>
    </>
  );
}