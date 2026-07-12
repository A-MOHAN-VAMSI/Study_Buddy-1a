import { User, Mail, Shield, LogOut } from "lucide-react";

import AnimatedPage from "../components/common/AnimatedPage";

export default function AdminSettings() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <AnimatedPage>
      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Admin Settings
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your administrator account.
          </p>

        </div>

        <div
          className="
            rounded-3xl
            border
            border-white/10
            bg-white/5
            p-8
          "
        >

          <div className="space-y-8">

            <div className="flex items-center gap-4">

              <User
                size={24}
                className="text-cyan-400"
              />

              <div>

                <div className="text-slate-400">
                  Name
                </div>

                <div className="text-xl font-semibold text-white">
                  {user.name}
                </div>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <Mail
                size={24}
                className="text-cyan-400"
              />

              <div>

                <div className="text-slate-400">
                  Email
                </div>

                <div className="text-xl font-semibold text-white">
                  {user.email}
                </div>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <Shield
                size={24}
                className="text-cyan-400"
              />

              <div>

                <div className="text-slate-400">
                  Role
                </div>

                <div className="text-xl font-semibold text-white">
                  Administrator
                </div>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <Shield
                size={24}
                className="text-emerald-400"
              />

              <div>

                <div className="text-slate-400">
                  Account Status
                </div>

                <div className="text-xl font-semibold text-emerald-400">
                  Active
                </div>

              </div>

            </div>

            <button
              onClick={handleLogout}
              className="
                mt-4
                flex
                items-center
                gap-2
                rounded-xl
                bg-red-600
                px-6
                py-3
                font-semibold
                text-white
                transition
                hover:bg-red-700
              "
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>

        </div>

      </div>
    </AnimatedPage>
  );
}