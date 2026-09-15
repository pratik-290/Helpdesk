import {
  CircleHelp,
  Home,
  LogOut,
  Plus,
  Settings,
  Ticket,
  UserRound,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function CustomerSidebar({ mobile, setMobile }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const workspaceItems = [
    {
      name: "Dashboard",
      path: "/customer/dashboard",
      icon: Home,
    },
    {
      name: "My Tickets",
      path: "/customer/tickets",
      icon: Ticket,
    },
    {
      name: "Create Ticket",
      path: "/customer/tickets/create",
      icon: Plus,
    },
  ];

  const accountItems = [
    {
      name: "Profile",
      path: "/customer/profile",
      icon: UserRound,
    },
    {
      name: "Settings",
      path: "/customer/settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {mobile && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={() => setMobile(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 text-white transition-transform duration-300 ${
          mobile ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center justify-between border-b border-slate-800 px-6">
            <Link
              to="/customer/dashboard"
              onClick={() => setMobile(false)}
              className="flex items-center gap-3"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500">
                <CircleHelp size={20} />
              </div>

              <span className="text-lg font-semibold">
                HelpDesk Pro
              </span>
            </Link>

            <button
              onClick={() => setMobile(false)}
              className="text-slate-400 hover:text-white lg:hidden"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Workspace
            </p>

            <div className="space-y-1">
              {workspaceItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobile(false)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                      active
                        ? "bg-slate-800 font-medium text-white"
                        : "text-slate-400 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    <Icon size={18} />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Account
            </p>

            <div className="space-y-1">
              {accountItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobile(false)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                      active
                        ? "bg-slate-800 font-medium text-white"
                        : "text-slate-400 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    <Icon size={18} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="border-t border-slate-800 p-4">
            <div className="flex items-center gap-3 rounded-lg p-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-700">
                PK
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">
                  Pratik Khose
                </p>

                <p className="truncate text-xs text-slate-500">
                  Customer
                </p>
              </div>

              <button className="text-slate-500 hover:text-white">
                <LogOut size={17} />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default CustomerSidebar;