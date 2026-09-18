import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  LayoutDashboard,
  ListFilter,
  LogOut,
  Menu,
  Search,
  Settings,
  Ticket,
  User,
  Users,
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

function statusStyle(status) {
  if (status === "OPEN") {
    return "bg-blue-50 text-blue-700";
  }

  if (status === "ASSIGNED") {
    return "bg-purple-50 text-purple-700";
  }

  if (status === "IN_PROGRESS") {
    return "bg-amber-50 text-amber-700";
  }

  if (status === "RESOLVED") {
    return "bg-emerald-50 text-emerald-700";
  }

  return "bg-slate-100 text-slate-600";
}

function AgentSidebar({
  mobileOpen,
  setMobileOpen,
}) {
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
    : "AG";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col bg-slate-950 text-white transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <Link
            to="/agent/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 font-bold">
              H
            </div>

            <div>
              <p className="text-lg font-bold tracking-tight">
                HelpDesk
              </p>
              <p className="text-xs text-slate-400">
                Agent Portal
              </p>
            </div>
          </Link>

          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 px-4 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Workspace
          </p>

          <nav className="space-y-1">
            <Link
              to="/agent/dashboard"
              className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-3 text-sm font-medium text-white"
            >
              <LayoutDashboard size={19} />
              Dashboard
            </Link>

            <Link
              to="/agent/tickets"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              <Ticket size={19} />
              All Tickets
            </Link>

            <Link
              to="/agent/tickets"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              <Users size={19} />
              My Assigned
            </Link>
          </nav>

          <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Account
          </p>

          <nav className="space-y-1">
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white">
              <User size={19} />
              Profile
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white">
              <Settings size={19} />
              Settings
            </button>
          </nav>
        </div>

        <div className="border-t border-white/10 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/15 text-sm font-bold text-orange-400">
              {initials}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                {user.name || "Agent"}
              </p>

              <p className="truncate text-xs text-slate-500">
                Support Agent
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          <Icon size={21} />
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}

function AgentDashboard() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [openTickets, setOpenTickets] =
    useState([]);

  const [assignedTickets, setAssignedTickets] =
    useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState("");

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const initials = user.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "AG";

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          openResponse,
          assignedResponse,
        ] = await Promise.all([
          api.get("/agent/tickets/open"),
          api.get("/agent/tickets/assigned"),
        ]);

        setOpenTickets(openResponse.data);
        setAssignedTickets(
          assignedResponse.data
        );
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const allTickets = useMemo(() => {
    const combined = [
      ...openTickets,
      ...assignedTickets,
    ];

    return Array.from(
      new Map(
        combined.map((ticket) => [
          ticket.id,
          ticket,
        ])
      ).values()
    );
  }, [openTickets, assignedTickets]);

  const assignedCount =
    assignedTickets.filter(
      (ticket) =>
        ticket.status === "ASSIGNED"
    ).length;

  const inProgressCount =
    assignedTickets.filter(
      (ticket) =>
        ticket.status === "IN_PROGRESS"
    ).length;

  const resolvedCount =
    assignedTickets.filter(
      (ticket) =>
        ticket.status === "RESOLVED"
    ).length;

  const filteredTickets = useMemo(() => {
    return allTickets.filter((ticket) => {
      const value =
        search.toLowerCase().trim();

      const searchMatch =
        !value ||
        String(ticket.id).includes(value) ||
        ticket.title
          ?.toLowerCase()
          .includes(value) ||
        ticket.customerName
          ?.toLowerCase()
          .includes(value);

      const statusMatch =
        status === "ALL" ||
        ticket.status === status;

      return searchMatch && statusMatch;
    });
  }, [allTickets, search, status]);

  const recentTickets = useMemo(() => {
    return [...filteredTickets]
      .sort(
        (a, b) =>
          new Date(b.updatedAt) -
          new Date(a.updatedAt)
      )
      .slice(0, 6);
  }, [filteredTickets]);

  return (
    <div className="min-h-screen bg-slate-50">
      <AgentSidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className="lg:ml-72">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <button
              onClick={() =>
                setMobileOpen(true)
              }
              className="rounded-xl border border-slate-200 p-2 text-slate-600 lg:hidden"
            >
              <Menu size={21} />
            </button>

            <div className="hidden sm:block">
              <p className="text-sm font-medium text-slate-500">
                Agent workspace
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button className="relative rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900">
                <AlertCircle size={19} />
              </button>

              <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white sm:flex">
                {initials}
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-1 text-sm font-medium text-orange-600">
                Welcome, {user.name || "Agent"}
              </p>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Support Dashboard
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Manage customer requests and keep
                tickets moving.
              </p>
            </div>

            <Link
              to="/agent/tickets"
              className="flex w-fit items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              View All Tickets
              <ArrowUpRight size={17} />
            </Link>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Available Tickets"
              value={
                loading
                  ? "-"
                  : openTickets.length
              }
              description="Open tickets waiting for an agent"
              icon={Ticket}
            />

            <StatCard
              title="Assigned"
              value={
                loading
                  ? "-"
                  : assignedCount
              }
              description="Tickets assigned to you"
              icon={Users}
            />

            <StatCard
              title="In Progress"
              value={
                loading
                  ? "-"
                  : inProgressCount
              }
              description="Currently being handled"
              icon={Clock3}
            />

            <StatCard
              title="Resolved"
              value={
                loading
                  ? "-"
                  : resolvedCount
              }
              description="Tickets you have resolved"
              icon={CheckCircle2}
            />
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <section className="min-w-0 rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-5 sm:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Recent Tickets
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Open tickets and your assigned
                      requests
                    </p>
                  </div>

                  <Link
                    to="/agent/tickets"
                    className="text-sm font-semibold text-orange-600 hover:text-orange-700"
                  >
                    View all
                  </Link>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_180px]">
                  <div className="relative">
                    <Search
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      value={search}
                      onChange={(e) =>
                        setSearch(
                          e.target.value
                        )
                      }
                      placeholder="Search tickets..."
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-orange-300 focus:bg-white focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                  <div className="relative">
                    <ListFilter
                      size={17}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <select
                      value={status}
                      onChange={(e) =>
                        setStatus(
                          e.target.value
                        )
                      }
                      className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-700 outline-none"
                    >
                      <option value="ALL">
                        All Status
                      </option>

                      <option value="OPEN">
                        Open
                      </option>

                      <option value="ASSIGNED">
                        Assigned
                      </option>

                      <option value="IN_PROGRESS">
                        In Progress
                      </option>

                      <option value="RESOLVED">
                        Resolved
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="px-6 py-16 text-center text-sm text-slate-500">
                  Loading tickets...
                </div>
              ) : (
                <>
                  <div className="hidden overflow-x-auto lg:block">
                    <table className="w-full min-w-[750px]">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/70 text-left">
                          <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Ticket
                          </th>

                          <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Customer
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
                              className="border-b border-slate-100 transition hover:bg-slate-50"
                            >
                              <td className="px-6 py-4">
                                <p className="text-xs font-semibold text-slate-400">
                                  #{ticket.id}
                                </p>

                                <p className="mt-1 max-w-[280px] truncate text-sm font-semibold text-slate-800">
                                  {ticket.title}
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                  {
                                    ticket.category
                                  }
                                </p>
                              </td>

                              <td className="px-6 py-4">
                                <span className="text-sm font-medium text-slate-700">
                                  {ticket.customerName ||
                                    "-"}
                                </span>
                              </td>

                              <td className="px-6 py-4">
                                <span
                                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(
                                    ticket.status
                                  )}`}
                                >
                                  {formatStatus(
                                    ticket.status
                                  )}
                                </span>
                              </td>

                              <td className="px-6 py-4 text-sm text-slate-500">
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

                  <div className="space-y-3 p-4 lg:hidden">
                    {recentTickets.map(
                      (ticket) => (
                        <div
                          key={ticket.id}
                          className="rounded-xl border border-slate-200 p-4"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-xs font-semibold text-slate-400">
                                #{ticket.id}
                              </p>

                              <h3 className="mt-1 text-sm font-semibold text-slate-900">
                                {ticket.title}
                              </h3>

                              <p className="mt-1 text-xs text-slate-500">
                                {
                                  ticket.customerName
                                }
                              </p>
                            </div>

                            <span
                              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyle(
                                ticket.status
                              )}`}
                            >
                              {formatStatus(
                                ticket.status
                              )}
                            </span>
                          </div>

                          <p className="mt-3 text-xs text-slate-400">
                            {formatDate(
                              ticket.updatedAt
                            )}
                          </p>
                        </div>
                      )
                    )}
                  </div>

                  {recentTickets.length ===
                    0 && (
                    <div className="px-6 py-14 text-center">
                      <Search
                        size={28}
                        className="mx-auto text-slate-300"
                      />

                      <p className="mt-3 text-sm font-semibold text-slate-700">
                        No tickets found
                      </p>
                    </div>
                  )}
                </>
              )}
            </section>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="font-semibold text-slate-900">
                  My Workload
                </h2>

                <div className="mt-5 space-y-5">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-500">
                        Assigned
                      </span>

                      <span className="font-semibold text-slate-800">
                        {assignedCount}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-purple-500"
                        style={{
                          width: `${
                            assignedTickets.length
                              ? (assignedCount /
                                  assignedTickets.length) *
                                100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-500">
                        In Progress
                      </span>

                      <span className="font-semibold text-slate-800">
                        {inProgressCount}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-amber-500"
                        style={{
                          width: `${
                            assignedTickets.length
                              ? (inProgressCount /
                                  assignedTickets.length) *
                                100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-500">
                        Resolved
                      </span>

                      <span className="font-semibold text-slate-800">
                        {resolvedCount}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{
                          width: `${
                            assignedTickets.length
                              ? (resolvedCount /
                                  assignedTickets.length) *
                                100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-900 p-5 text-white shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500">
                  <Ticket size={19} />
                </div>

                <h2 className="mt-5 text-lg font-semibold">
                  Need to review more tickets?
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Open the complete ticket queue and
                  work on pending customer requests.
                </p>

                <Link
                  to="/agent/tickets"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300"
                >
                  Open ticket queue
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AgentDashboard;