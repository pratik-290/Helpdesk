import { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Ticket,
  Settings,
  Menu,
  Search,
  ArrowUpRight,
  Clock3,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
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

function formatRole(role) {
  if (!role) return "";

  return (
    role.charAt(0) +
    role.slice(1).toLowerCase()
  );
}

function formatDate(date) {
  if (!date) return "-";

  return new Date(date).toLocaleString();
}

function statusStyle(status) {
  if (status === "OPEN") {
    return "bg-orange-50 text-orange-700";
  }

  if (status === "ASSIGNED") {
    return "bg-purple-50 text-purple-700";
  }

  if (status === "IN_PROGRESS") {
    return "bg-blue-50 text-blue-700";
  }

  if (status === "RESOLVED") {
    return "bg-emerald-50 text-emerald-700";
  }

  return "bg-slate-100 text-slate-700";
}

function roleStyle(role) {
  if (role === "AGENT") {
    return "bg-blue-50 text-blue-700";
  }

  if (role === "ADMIN") {
    return "bg-purple-50 text-purple-700";
  }

  return "bg-slate-100 text-slate-600";
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconStyle,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </h2>
        </div>

        <div className={`rounded-xl p-3 ${iconStyle}`}>
          <Icon size={20} />
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([]);
  const [recentTickets, setRecentTickets] =
    useState([]);

  const [allTickets, setAllTickets] =
    useState([]);

  const [totalTickets, setTotalTickets] =
    useState(0);

  const [openCount, setOpenCount] =
    useState(0);

  const [inProgressCount, setInProgressCount] =
    useState(0);

  const [resolvedCount, setResolvedCount] =
    useState(0);

  const [closedCount, setClosedCount] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState("");

  const loggedInUser =
    JSON.parse(localStorage.getItem("user")) || {};

  const initials = loggedInUser.name
    ? loggedInUser.name
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "AD";

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          usersResponse,
          recentResponse,
          allResponse,
          openResponse,
          progressResponse,
          resolvedResponse,
          closedResponse,
        ] = await Promise.all([
          api.get("/admin/users"),

          api.get(
            "/admin/tickets?page=0&size=5"
          ),

          api.get(
            "/admin/tickets?page=0&size=1000"
          ),

          api.get(
            "/admin/tickets?page=0&size=1&status=OPEN"
          ),

          api.get(
            "/admin/tickets?page=0&size=1&status=IN_PROGRESS"
          ),

          api.get(
            "/admin/tickets?page=0&size=1&status=RESOLVED"
          ),

          api.get(
            "/admin/tickets?page=0&size=1&status=CLOSED"
          ),
        ]);

        setUsers(usersResponse.data || []);

        setRecentTickets(
          recentResponse.data.content || []
        );

        setAllTickets(
          allResponse.data.content || []
        );

        setTotalTickets(
          recentResponse.data.totalElements || 0
        );

        setOpenCount(
          openResponse.data.totalElements || 0
        );

        setInProgressCount(
          progressResponse.data.totalElements || 0
        );

        setResolvedCount(
          resolvedResponse.data.totalElements || 0
        );

        setClosedCount(
          closedResponse.data.totalElements || 0
        );
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load admin dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const totalUsers = users.length;

  const customerCount = users.filter(
    (user) => user.role === "CUSTOMER"
  ).length;

  const agentCount = users.filter(
    (user) => user.role === "AGENT"
  ).length;

  const adminCount = users.filter(
    (user) => user.role === "ADMIN"
  ).length;

  const resolutionRate =
    totalTickets === 0
      ? 0
      : (
          ((resolvedCount + closedCount) /
            totalTickets) *
          100
        ).toFixed(1);

  const filteredTickets = useMemo(() => {
    const value = search
      .toLowerCase()
      .trim();

    if (!value) {
      return recentTickets;
    }

    return recentTickets.filter(
      (ticket) =>
        String(ticket.id).includes(value) ||
        ticket.title
          ?.toLowerCase()
          .includes(value) ||
        ticket.customerName
          ?.toLowerCase()
          .includes(value)
    );
  }, [search, recentTickets]);

  const workload = useMemo(() => {
    const agentTickets = {};

    allTickets.forEach((ticket) => {
      if (!ticket.agentName) {
        return;
      }

      if (!agentTickets[ticket.agentName]) {
        agentTickets[ticket.agentName] = 0;
      }

      agentTickets[ticket.agentName] += 1;
    });

    const result = Object.entries(
      agentTickets
    )
      .map(([name, tickets]) => ({
        name,
        tickets,
      }))
      .sort(
        (a, b) =>
          b.tickets - a.tickets
      )
      .slice(0, 5);

    const highest =
      result.length > 0
        ? result[0].tickets
        : 1;

    return result.map((agent) => ({
      ...agent,
      percentage:
        (agent.tickets / highest) * 100,
    }));
  }, [allTickets]);

  const visibleUsers = users.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-100">
      <AdminSidebar
        mobile={sidebarOpen}
        setMobile={setSidebarOpen}
      />

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex min-h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                onClick={() =>
                  setSidebarOpen(true)
                }
                className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
              >
                <Menu size={22} />
              </button>

              <div className="min-w-0">
                <h1 className="truncate text-lg font-bold text-slate-900 sm:text-xl">
                  Admin Dashboard
                </h1>

                <p className="hidden text-sm text-slate-500 sm:block">
                  Welcome,{" "}
                  {loggedInUser.name ||
                    "Administrator"}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <Link
                to="/admin/users"
                className="hidden items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 sm:flex"
              >
                <Users size={17} />
                Manage Users
              </Link>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                {initials}
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Total Users"
                value={
                  loading
                    ? "-"
                    : totalUsers
                }
                description="Registered platform users"
                icon={Users}
                iconStyle="bg-orange-50 text-orange-600"
              />

              <StatCard
                title="Total Tickets"
                value={
                  loading
                    ? "-"
                    : totalTickets
                }
                description="All support requests"
                icon={Ticket}
                iconStyle="bg-blue-50 text-blue-600"
              />

              <StatCard
                title="Open Tickets"
                value={
                  loading
                    ? "-"
                    : openCount
                }
                description="Waiting for assignment"
                icon={AlertCircle}
                iconStyle="bg-red-50 text-red-600"
              />

              <StatCard
                title="Resolution Rate"
                value={
                  loading
                    ? "-"
                    : `${resolutionRate}%`
                }
                description="Resolved and closed tickets"
                icon={CheckCircle2}
                iconStyle="bg-emerald-50 text-emerald-600"
              />
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-bold text-slate-900">
                      Recent Tickets
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Latest activity across the
                      support system
                    </p>
                  </div>

                  <Link
                    to="/admin/tickets"
                    className="text-sm font-semibold text-orange-600 hover:text-orange-700"
                  >
                    View all
                  </Link>
                </div>

                <div className="mt-5">
                  <div className="relative mb-4">
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
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-orange-400 focus:bg-white"
                    />
                  </div>

                  {loading ? (
                    <div className="py-12 text-center text-sm text-slate-500">
                      Loading tickets...
                    </div>
                  ) : (
                    <>
                      <div className="hidden overflow-x-auto md:block">
                        <table className="w-full min-w-[650px]">
                          <thead>
                            <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400">
                              <th className="pb-3 font-semibold">
                                Ticket
                              </th>

                              <th className="pb-3 font-semibold">
                                Customer
                              </th>

                              <th className="pb-3 font-semibold">
                                Status
                              </th>

                              <th className="pb-3 text-right font-semibold">
                                Updated
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {filteredTickets.map(
                              (ticket) => (
                                <tr
                                  key={
                                    ticket.id
                                  }
                                  className="border-b border-slate-100 last:border-0"
                                >
                                  <td className="py-4">
                                    <p className="text-sm font-semibold text-slate-900">
                                      #
                                      {
                                        ticket.id
                                      }
                                    </p>

                                    <p className="mt-1 max-w-[220px] truncate text-xs text-slate-500">
                                      {
                                        ticket.title
                                      }
                                    </p>
                                  </td>

                                  <td className="py-4 text-sm text-slate-600">
                                    {ticket.customerName ||
                                      "-"}
                                  </td>

                                  <td className="py-4">
                                    <span
                                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle(
                                        ticket.status
                                      )}`}
                                    >
                                      {formatStatus(
                                        ticket.status
                                      )}
                                    </span>
                                  </td>

                                  <td className="py-4 text-right text-xs text-slate-500">
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

                      <div className="space-y-3 md:hidden">
                        {filteredTickets.map(
                          (ticket) => (
                            <div
                              key={
                                ticket.id
                              }
                              className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <p className="text-sm font-bold text-slate-900">
                                    #
                                    {
                                      ticket.id
                                    }
                                  </p>

                                  <p className="mt-1 text-sm text-slate-600">
                                    {
                                      ticket.title
                                    }
                                  </p>
                                </div>

                                <span
                                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle(
                                    ticket.status
                                  )}`}
                                >
                                  {formatStatus(
                                    ticket.status
                                  )}
                                </span>
                              </div>

                              <p className="mt-3 text-xs text-slate-500">
                                Customer:{" "}
                                {ticket.customerName ||
                                  "-"}
                              </p>

                              <div className="mt-3 flex items-center gap-1 text-xs text-slate-400">
                                <Clock3
                                  size={13}
                                />

                                {formatDate(
                                  ticket.updatedAt
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </div>

                      {filteredTickets.length ===
                        0 && (
                        <div className="py-10 text-center">
                          <Ticket
                            size={28}
                            className="mx-auto text-slate-300"
                          />

                          <p className="mt-2 text-sm font-medium text-slate-600">
                            No tickets found
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-bold text-slate-900">
                      Agent Workload
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Assigned ticket distribution
                    </p>
                  </div>

                  <Users
                    size={20}
                    className="text-slate-400"
                  />
                </div>

                <div className="mt-6 space-y-6">
                  {workload.length > 0 ? (
                    workload.map((agent) => (
                      <div key={agent.name}>
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-2">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                              <UserRound
                                size={15}
                              />
                            </div>

                            <span className="truncate text-sm font-medium text-slate-700">
                              {agent.name}
                            </span>
                          </div>

                          <span className="shrink-0 text-xs font-semibold text-slate-500">
                            {agent.tickets}{" "}
                            tickets
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-orange-500"
                            style={{
                              width: `${agent.percentage}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">
                      No assigned tickets yet.
                    </p>
                  )}
                </div>

                <Link
                  to="/admin/users"
                  className="mt-7 flex w-full items-center justify-center rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Manage Agents
                </Link>
              </div>
            </section>

            <section className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-bold text-slate-900">
                      User Overview
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Current platform users
                    </p>
                  </div>

                  <Link
                    to="/admin/users"
                    className="text-sm font-semibold text-orange-600 hover:text-orange-700"
                  >
                    Manage
                  </Link>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">
                      Customers
                    </p>

                    <p className="mt-1 text-xl font-bold text-slate-900">
                      {customerCount}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">
                      Agents
                    </p>

                    <p className="mt-1 text-xl font-bold text-slate-900">
                      {agentCount}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">
                      Admins
                    </p>

                    <p className="mt-1 text-xl font-bold text-slate-900">
                      {adminCount}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {visibleUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-3"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50 text-sm font-bold text-orange-600">
                          {user.name
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-800">
                            {user.name}
                          </p>

                          <p className="truncate text-xs text-slate-500">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${roleStyle(
                          user.role
                        )}`}
                      >
                        {formatRole(
                          user.role
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-slate-950 p-6 shadow-sm">
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-white">
                      <ShieldCheck size={22} />
                    </div>

                    <h2 className="mt-5 text-xl font-bold text-white">
                      System Administration
                    </h2>

                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                      Manage users, support agents,
                      tickets and system settings from
                      the admin panel.
                    </p>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    <Link
                      to="/admin/users"
                      className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                    >
                      <Users size={17} />
                      Manage Users
                    </Link>

                    <Link
                      to="/admin/tickets"
                      className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      <Ticket size={17} />
                      Manage Tickets
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-500">
                  In Progress
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {inProgressCount}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-500">
                  Resolved
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {resolvedCount}
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}