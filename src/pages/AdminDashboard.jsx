import { useMemo, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Ticket,
  Settings,
  Menu,
  Search,
  UserPlus,
  ArrowUpRight,
  Clock3,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  MoreHorizontal,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const tickets = [
  {
    id: "HD-1042",
    subject: "Unable to reset password",
    customer: "Aarav Sharma",
    status: "Open",
    priority: "High",
    updated: "10 min ago",
  },
  {
    id: "HD-1041",
    subject: "Payment failed during checkout",
    customer: "Riya Patil",
    status: "In Progress",
    priority: "Urgent",
    updated: "25 min ago",
  },
  {
    id: "HD-1040",
    subject: "Account verification issue",
    customer: "Rahul Mehta",
    status: "Resolved",
    priority: "Medium",
    updated: "1 hour ago",
  },
  {
    id: "HD-1039",
    subject: "Unable to update profile",
    customer: "Sneha Joshi",
    status: "Open",
    priority: "Low",
    updated: "2 hours ago",
  },
];

const users = [
  {
    name: "Aarav Sharma",
    email: "aarav@example.com",
    role: "Customer",
    status: "Active",
  },
  {
    name: "Neha Kulkarni",
    email: "neha@example.com",
    role: "Agent",
    status: "Active",
  },
  {
    name: "Riya Patil",
    email: "riya@example.com",
    role: "Customer",
    status: "Active",
  },
];

const workload = [
  {
    name: "Neha Kulkarni",
    tickets: 18,
    percentage: 72,
  },
  {
    name: "Aditya Shah",
    tickets: 14,
    percentage: 56,
  },
  {
    name: "Karan Joshi",
    tickets: 11,
    percentage: 44,
  },
];

function statusStyle(status) {
  if (status === "Open") {
    return "bg-orange-50 text-orange-700";
  }

  if (status === "In Progress") {
    return "bg-blue-50 text-blue-700";
  }

  if (status === "Resolved") {
    return "bg-emerald-50 text-emerald-700";
  }

  return "bg-slate-100 text-slate-700";
}

function priorityStyle(priority) {
  if (priority === "Urgent") {
    return "bg-red-50 text-red-700";
  }

  if (priority === "High") {
    return "bg-orange-50 text-orange-700";
  }

  if (priority === "Medium") {
    return "bg-yellow-50 text-yellow-700";
  }

  return "bg-slate-100 text-slate-600";
}

function StatCard({ title, value, change, icon: Icon, iconStyle }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </h2>
        </div>

        <div className={`rounded-xl p-3 ${iconStyle}`}>
          <Icon size={20} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1 text-xs">
        <ArrowUpRight size={14} className="text-emerald-600" />

        <span className="font-semibold text-emerald-600">
          {change}
        </span>

        <span className="text-slate-400">vs last month</span>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredTickets = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) {
      return tickets;
    }

    return tickets.filter(
      (ticket) =>
        ticket.id.toLowerCase().includes(value) ||
        ticket.subject.toLowerCase().includes(value) ||
        ticket.customer.toLowerCase().includes(value)
    );
  }, [search]);

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
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
              >
                <Menu size={22} />
              </button>

              <div className="min-w-0">
                <h1 className="truncate text-lg font-bold text-slate-900 sm:text-xl">
                  Admin Dashboard
                </h1>

                <p className="hidden text-sm text-slate-500 sm:block">
                  Manage your support system from one place.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <Link
                to="/admin/users"
                className="hidden items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 sm:flex"
              >
                <UserPlus size={17} />
                Add User
              </Link>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                A
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 lg:hidden">
              <Link
                to="/admin/users"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white"
              >
                <UserPlus size={17} />
                Add User
              </Link>
            </div>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Total Users"
                value="1,284"
                change="+8.2%"
                icon={Users}
                iconStyle="bg-orange-50 text-orange-600"
              />

              <StatCard
                title="Total Tickets"
                value="2,846"
                change="+12.4%"
                icon={Ticket}
                iconStyle="bg-blue-50 text-blue-600"
              />

              <StatCard
                title="Open Tickets"
                value="184"
                change="+4.6%"
                icon={AlertCircle}
                iconStyle="bg-red-50 text-red-600"
              />

              <StatCard
                title="Resolution Rate"
                value="91.8%"
                change="+3.1%"
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
                      Latest activity across the support system
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
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search tickets..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-orange-400 focus:bg-white"
                    />
                  </div>

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
                            Priority
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
                        {filteredTickets.map((ticket) => (
                          <tr
                            key={ticket.id}
                            className="border-b border-slate-100 last:border-0"
                          >
                            <td className="py-4">
                              <div>
                                <p className="text-sm font-semibold text-slate-900">
                                  {ticket.id}
                                </p>

                                <p className="mt-1 max-w-[220px] truncate text-xs text-slate-500">
                                  {ticket.subject}
                                </p>
                              </div>
                            </td>

                            <td className="py-4 text-sm text-slate-600">
                              {ticket.customer}
                            </td>

                            <td className="py-4">
                              <span
                                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${priorityStyle(
                                  ticket.priority
                                )}`}
                              >
                                {ticket.priority}
                              </span>
                            </td>

                            <td className="py-4">
                              <span
                                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle(
                                  ticket.status
                                )}`}
                              >
                                {ticket.status}
                              </span>
                            </td>

                            <td className="py-4 text-right text-xs text-slate-500">
                              {ticket.updated}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-3 md:hidden">
                    {filteredTickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-slate-900">
                              {ticket.id}
                            </p>

                            <p className="mt-1 truncate text-sm text-slate-600">
                              {ticket.subject}
                            </p>
                          </div>

                          <MoreHorizontal
                            size={19}
                            className="shrink-0 text-slate-400"
                          />
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-white px-2.5 py-1 text-xs text-slate-600">
                            {ticket.customer}
                          </span>

                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${priorityStyle(
                              ticket.priority
                            )}`}
                          >
                            {ticket.priority}
                          </span>

                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle(
                              ticket.status
                            )}`}
                          >
                            {ticket.status}
                          </span>
                        </div>

                        <div className="mt-3 flex items-center gap-1 text-xs text-slate-400">
                          <Clock3 size={13} />
                          {ticket.updated}
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredTickets.length === 0 && (
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
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-bold text-slate-900">
                      Agent Workload
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Current assigned tickets
                    </p>
                  </div>

                  <Users
                    size={20}
                    className="text-slate-400"
                  />
                </div>

                <div className="mt-6 space-y-6">
                  {workload.map((agent) => (
                    <div key={agent.name}>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-2">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                            <UserRound size={15} />
                          </div>

                          <span className="truncate text-sm font-medium text-slate-700">
                            {agent.name}
                          </span>
                        </div>

                        <span className="shrink-0 text-xs font-semibold text-slate-500">
                          {agent.tickets} tickets
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
                  ))}
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
                      1,156
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">
                      Agents
                    </p>

                    <p className="mt-1 text-xl font-bold text-slate-900">
                      118
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">
                      Admins
                    </p>

                    <p className="mt-1 text-xl font-bold text-slate-900">
                      10
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {users.map((user) => (
                    <div
                      key={user.email}
                      className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-3"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50 text-sm font-bold text-orange-600">
                          {user.name.charAt(0)}
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
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                          user.role === "Agent"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {user.role}
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
                      Manage users, support agents, tickets and
                      system settings from the admin panel.
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
          </div>
        </main>
      </div>
    </div>
  );
}