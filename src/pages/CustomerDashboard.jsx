import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  ChevronDown,
  CircleHelp,
  Clock3,
  FileText,
  Home,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  Ticket,
  UserRound,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function formatStatus(status) {
  if (!status) return "";

  return status
    .toLowerCase()
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

function formatDate(date) {
  if (!date) return "-";

  return new Date(date).toLocaleString();
}

function getStatusClass(status) {
  if (status === "RESOLVED") {
    return "bg-emerald-50 text-emerald-700";
  }

  if (status === "IN_PROGRESS") {
    return "bg-blue-50 text-blue-700";
  }

  if (status === "ASSIGNED") {
    return "bg-purple-50 text-purple-700";
  }

  if (status === "CLOSED") {
    return "bg-slate-100 text-slate-600";
  }

  return "bg-orange-50 text-orange-700";
}

function CustomerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const initials = user.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "CU";

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          "/customer/tickets"
        );

        setTickets(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const totalTickets = tickets.length;

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "OPEN"
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === "IN_PROGRESS"
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "RESOLVED"
  ).length;

  const recentTickets = useMemo(() => {
    return [...tickets]
      .sort(
        (a, b) =>
          new Date(b.updatedAt) -
          new Date(a.updatedAt)
      )
      .slice(0, 4);
  }, [tickets]);

  const stats = [
    {
      title: "Total Tickets",
      value: totalTickets,
      text: "All support requests",
      icon: Ticket,
    },
    {
      title: "Open Tickets",
      value: openTickets,
      text: "Waiting for support",
      icon: FileText,
    },
    {
      title: "In Progress",
      value: inProgressTickets,
      text: "Currently being handled",
      icon: Clock3,
    },
    {
      title: "Resolved",
      value: resolvedTickets,
      text: "Issues resolved",
      icon: CircleHelp,
    },
  ];

  const today = new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
    }
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 text-white transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center justify-between border-b border-slate-800 px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500">
                <CircleHelp size={20} />
              </div>

              <span className="text-lg font-semibold">
                HelpDesk Pro
              </span>
            </div>

            <button
              onClick={() =>
                setSidebarOpen(false)
              }
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
              <Link
                to="/customer/dashboard"
                className="flex w-full items-center gap-3 rounded-lg bg-slate-800 px-3 py-2.5 text-sm font-medium text-white"
              >
                <Home size={18} />
                Dashboard
              </Link>

              <Link
                to="/customer/tickets"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-900 hover:text-white"
              >
                <Ticket size={18} />
                My Tickets
              </Link>

              <Link
                to="/customer/tickets/create"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-900 hover:text-white"
              >
                <Plus size={18} />
                Create Ticket
              </Link>
            </div>

            <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Account
            </p>

            <div className="space-y-1">
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-900 hover:text-white">
                <UserRound size={18} />
                Profile
              </button>

              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-900 hover:text-white">
                <Settings size={18} />
                Settings
              </button>
            </div>
          </nav>

          <div className="border-t border-slate-800 p-4">
            <div className="flex items-center gap-3 rounded-lg p-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-700">
                {initials}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">
                  {user.name || "Customer"}
                </p>

                <p className="truncate text-xs text-slate-500">
                  Customer
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="text-slate-500 hover:text-white"
              >
                <LogOut size={17} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setSidebarOpen(true)
              }
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={22} />
            </button>

            <div>
              <p className="text-sm text-slate-500">
                Customer Portal
              </p>

              <h1 className="text-lg font-semibold sm:text-xl">
                Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="hidden rounded-lg border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-50 sm:block">
              <Search size={19} />
            </button>

            <button className="relative rounded-lg border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-50">
              <Bell size={19} />
            </button>

            <div className="hidden h-8 w-px bg-slate-200 sm:block" />

            <button className="hidden items-center gap-2 sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-700">
                {initials}
              </div>

              <ChevronDown
                size={16}
                className="text-slate-400"
              />
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">
                {today}
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                Welcome, {user.name || "Customer"}
              </h2>

              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                Here's what's happening with your
                support requests.
              </p>
            </div>

            <Link
              to="/customer/tickets/create"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 text-sm font-semibold text-white transition hover:bg-orange-600 sm:w-auto"
            >
              <Plus size={18} />
              New Ticket
            </Link>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        {stat.title}
                      </p>

                      <p className="mt-2 text-3xl font-bold tracking-tight">
                        {loading
                          ? "-"
                          : stat.value}
                      </p>
                    </div>

                    <div className="rounded-lg bg-orange-50 p-2.5 text-orange-600">
                      <Icon size={20} />
                    </div>
                  </div>

                  <p className="mt-4 text-xs font-medium text-slate-500">
                    {stat.text}
                  </p>
                </div>
              );
            })}
          </section>

          <section className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <h3 className="text-lg font-semibold">
                  Recent Tickets
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Your latest support requests
                </p>
              </div>

              <Link
                to="/customer/tickets"
                className="text-left text-sm font-semibold text-orange-600 hover:text-orange-700 sm:text-right"
              >
                View all tickets
              </Link>
            </div>

            {loading ? (
              <div className="p-10 text-center text-sm text-slate-500">
                Loading tickets...
              </div>
            ) : recentTickets.length === 0 ? (
              <div className="p-10 text-center">
                <p className="text-sm text-slate-500">
                  No tickets yet.
                </p>

                <Link
                  to="/customer/tickets/create"
                  className="mt-3 inline-block text-sm font-semibold text-orange-600"
                >
                  Create your first ticket
                </Link>
              </div>
            ) : (
              <>
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full min-w-[700px]">
                    <thead>
                      <tr className="border-b border-slate-100 text-left">
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Ticket
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Category
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Status
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Updated
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {recentTickets.map(
                        (ticket) => (
                          <tr
                            key={ticket.id}
                            onClick={() =>
                              navigate(
                                `/customer/tickets/${ticket.id}`
                              )
                            }
                            className="cursor-pointer border-b border-slate-100 last:border-0 hover:bg-slate-50"
                          >
                            <td className="px-6 py-5">
                              <p className="text-xs font-medium text-slate-400">
                                #{ticket.id}
                              </p>

                              <p className="mt-1 font-medium text-slate-800">
                                {ticket.title}
                              </p>
                            </td>

                            <td className="px-6 py-5 text-sm text-slate-600">
                              {ticket.category}
                            </td>

                            <td className="px-6 py-5">
                              <span
                                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                                  ticket.status
                                )}`}
                              >
                                {formatStatus(
                                  ticket.status
                                )}
                              </span>
                            </td>

                            <td className="px-6 py-5 text-sm text-slate-500">
                              {formatDate(
                                ticket.updatedAt
                              )}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="divide-y divide-slate-100 md:hidden">
                  {recentTickets.map(
                    (ticket) => (
                      <div
                        key={ticket.id}
                        onClick={() =>
                          navigate(
                            `/customer/tickets/${ticket.id}`
                          )
                        }
                        className="cursor-pointer p-5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-slate-400">
                              #{ticket.id}
                            </p>

                            <h4 className="mt-1 text-sm font-semibold text-slate-800">
                              {ticket.title}
                            </h4>
                          </div>

                          <span
                            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                              ticket.status
                            )}`}
                          >
                            {formatStatus(
                              ticket.status
                            )}
                          </span>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                          <span>
                            {ticket.category}
                          </span>

                          <span>•</span>

                          <span>
                            {formatDate(
                              ticket.updatedAt
                            )}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </>
            )}
          </section>

          <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-orange-50 p-3 text-orange-600">
                  <CircleHelp size={21} />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Need more help?
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Track your support requests and
                    their current status.
                  </p>

                  <Link
                    to="/customer/tickets"
                    className="mt-4 inline-block text-sm font-semibold text-orange-600 hover:text-orange-700"
                  >
                    View tickets →
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-900 p-5 text-white shadow-sm sm:p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-white/10 p-3">
                  <Plus size={21} />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Have an issue?
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    Create a new support ticket and
                    our team will get back to you.
                  </p>

                  <Link
                    to="/customer/tickets/create"
                    className="mt-4 inline-block text-sm font-semibold text-white hover:text-orange-300"
                  >
                    Create a ticket →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default CustomerDashboard;