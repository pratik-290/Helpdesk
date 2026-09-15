import { useMemo, useState } from "react";
import {
  Search,
  UserPlus,
  ShieldCheck,
  UserRound,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";

const users = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav@example.com",
    role: "Customer",
    status: "Active",
    tickets: 8,
    joined: "Sep 12, 2026",
  },
  {
    id: 2,
    name: "Neha Kulkarni",
    email: "neha@example.com",
    role: "Agent",
    status: "Active",
    tickets: 18,
    joined: "Sep 10, 2026",
  },
  {
    id: 3,
    name: "Riya Patil",
    email: "riya@example.com",
    role: "Customer",
    status: "Active",
    tickets: 5,
    joined: "Sep 08, 2026",
  },
  {
    id: 4,
    name: "Aditya Shah",
    email: "aditya@example.com",
    role: "Agent",
    status: "Active",
    tickets: 14,
    joined: "Sep 05, 2026",
  },
  {
    id: 5,
    name: "Rahul Mehta",
    email: "rahul@example.com",
    role: "Customer",
    status: "Inactive",
    tickets: 3,
    joined: "Aug 29, 2026",
  },
  {
    id: 6,
    name: "Karan Joshi",
    email: "karan@example.com",
    role: "Agent",
    status: "Active",
    tickets: 11,
    joined: "Aug 26, 2026",
  },
  {
    id: 7,
    name: "Sneha Joshi",
    email: "sneha@example.com",
    role: "Customer",
    status: "Active",
    tickets: 7,
    joined: "Aug 22, 2026",
  },
  {
    id: 8,
    name: "Vikram Desai",
    email: "vikram@example.com",
    role: "Customer",
    status: "Active",
    tickets: 4,
    joined: "Aug 18, 2026",
  },
];

function roleStyle(role) {
  if (role === "Agent") {
    return "bg-blue-50 text-blue-700";
  }

  if (role === "Admin") {
    return "bg-purple-50 text-purple-700";
  }

  return "bg-slate-100 text-slate-600";
}

function statusStyle(status) {
  return status === "Active"
    ? "bg-emerald-50 text-emerald-700"
    : "bg-slate-100 text-slate-500";
}

export default function AdminUsers() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredUsers = useMemo(() => {
    const value = search.toLowerCase().trim();

    return users.filter((user) => {
      const matchesSearch =
        !value ||
        user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value);

      const matchesRole =
        roleFilter === "All" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [search, roleFilter, statusFilter]);

  const clearFilters = () => {
    setSearch("");
    setRoleFilter("All");
    setStatusFilter("All");
  };

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
                className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              >
                <Menu size={22} />
              </button>

              <div className="min-w-0">
                <h1 className="truncate text-lg font-bold text-slate-900 sm:text-xl">
                  Users
                </h1>

                <p className="hidden text-sm text-slate-500 sm:block">
                  Manage customers, agents and administrators.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <button className="hidden items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 sm:flex">
                <UserPlus size={17} />
                Add User
              </button>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                A
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">
                  User Management
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  All Users
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  View and manage everyone using HelpDesk Pro.
                </p>
              </div>

              <button className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 sm:hidden">
                <UserPlus size={17} />
                Add User
              </button>
            </div>

            <section className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-medium text-slate-500">
                  Total Users
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  1,284
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-medium text-slate-500">
                  Customers
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  1,156
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-medium text-slate-500">
                  Agents
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  118
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-medium text-slate-500">
                  Active Users
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  1,247
                </p>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 p-4 sm:p-5">
                <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                  <div className="relative flex-1 xl:max-w-md">
                    <Search
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search name or email..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-orange-400 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:flex">
                    <select
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-orange-400"
                    >
                      <option value="All">All Roles</option>
                      <option value="Customer">Customer</option>
                      <option value="Agent">Agent</option>
                      <option value="Admin">Admin</option>
                    </select>

                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-orange-400"
                    >
                      <option value="All">All Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                {(search ||
                  roleFilter !== "All" ||
                  statusFilter !== "All") && (
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-xs text-slate-500">
                      Showing {filteredUsers.length} users
                    </p>

                    <button
                      onClick={clearFilters}
                      className="text-xs font-semibold text-orange-600 hover:text-orange-700"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70 text-left text-xs uppercase tracking-wide text-slate-400">
                      <th className="px-5 py-4 font-semibold">
                        User
                      </th>

                      <th className="px-5 py-4 font-semibold">
                        Role
                      </th>

                      <th className="px-5 py-4 font-semibold">
                        Status
                      </th>

                      <th className="px-5 py-4 font-semibold">
                        Tickets
                      </th>

                      <th className="px-5 py-4 font-semibold">
                        Joined
                      </th>

                      <th className="px-5 py-4 text-right font-semibold">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 font-bold text-orange-600">
                              {user.name.charAt(0)}
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-slate-900">
                                {user.name}
                              </p>

                              <p className="mt-0.5 text-xs text-slate-500">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${roleStyle(
                              user.role
                            )}`}
                          >
                            {user.role}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle(
                              user.status
                            )}`}
                          >
                            {user.status}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {user.tickets}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-500">
                          {user.joined}
                        </td>

                        <td className="px-5 py-4 text-right">
                          <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                            <MoreHorizontal size={19} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-3 p-4 md:hidden">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 font-bold text-orange-600">
                          {user.name.charAt(0)}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            {user.name}
                          </p>

                          <p className="truncate text-xs text-slate-500">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <button className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-slate-700">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${roleStyle(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle(
                          user.status
                        )}`}
                      >
                        {user.status}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-200 pt-3">
                      <div>
                        <p className="text-[11px] text-slate-400">
                          Tickets
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {user.tickets}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] text-slate-400">
                          Joined
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {user.joined}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredUsers.length === 0 && (
                <div className="px-5 py-16 text-center">
                  <UserRound
                    size={32}
                    className="mx-auto text-slate-300"
                  />

                  <h3 className="mt-3 text-sm font-semibold text-slate-700">
                    No users found
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Try changing your search or filters.
                  </p>

                  <button
                    onClick={clearFilters}
                    className="mt-4 text-sm font-semibold text-orange-600"
                  >
                    Clear filters
                  </button>
                </div>
              )}

              <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <p className="text-xs text-slate-500">
                  Showing{" "}
                  <span className="font-semibold text-slate-700">
                    {filteredUsers.length}
                  </span>{" "}
                  of 1,284 users
                </p>

                <div className="flex items-center gap-2">
                  <button className="rounded-lg border border-slate-200 p-2 text-slate-400 hover:bg-slate-50">
                    <ChevronLeft size={17} />
                  </button>

                  <button className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white">
                    1
                  </button>

                  <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                    2
                  </button>

                  <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                    3
                  </button>

                  <button className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50">
                    <ChevronRight size={17} />
                  </button>
                </div>
              </div>
            </section>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    User permissions
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Agents can manage assigned tickets while customers
                    can create and track their own support requests.
                    Admins have full access to the support system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}