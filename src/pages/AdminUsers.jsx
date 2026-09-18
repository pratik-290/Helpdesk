import { useEffect, useMemo, useState } from "react";
import {
  Search,
  ShieldCheck,
  UserRound,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import api from "../api/axios";

function roleStyle(role) {
  if (role === "AGENT") {
    return "bg-blue-50 text-blue-700";
  }

  if (role === "ADMIN") {
    return "bg-purple-50 text-purple-700";
  }

  return "bg-slate-100 text-slate-600";
}

function formatRole(role) {
  if (!role) return "";

  return role.charAt(0) + role.slice(1).toLowerCase();
}

export default function AdminUsers() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const loggedInUser =
    JSON.parse(localStorage.getItem("user")) || {};

  const itemsPerPage = 6;

  const adminInitials = loggedInUser.name
    ? loggedInUser.name
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "AD";

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/admin/users");

      setUsers(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (userId, newRole) => {
    try {
      setUpdatingId(userId);
      setError("");

      const response = await api.patch(
        `/admin/users/${userId}/role`,
        {
          role: newRole,
        }
      );

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === userId
            ? response.data
            : user
        )
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update role"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredUsers = useMemo(() => {
    const value = search
      .toLowerCase()
      .trim();

    return users.filter((user) => {
      const matchesSearch =
        !value ||
        user.name
          ?.toLowerCase()
          .includes(value) ||
        user.email
          ?.toLowerCase()
          .includes(value);

      const matchesRole =
        roleFilter === "ALL" ||
        user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredUsers.length / itemsPerPage
    )
  );

  const startIndex =
    (page - 1) * itemsPerPage;

  const currentUsers =
    filteredUsers.slice(
      startIndex,
      startIndex + itemsPerPage
    );

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

  const clearFilters = () => {
    setSearch("");
    setRoleFilter("ALL");
    setPage(1);
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
                onClick={() =>
                  setSidebarOpen(true)
                }
                className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              >
                <Menu size={22} />
              </button>

              <div className="min-w-0">
                <h1 className="truncate text-lg font-bold text-slate-900 sm:text-xl">
                  Users
                </h1>

                <p className="hidden text-sm text-slate-500 sm:block">
                  Manage customers, agents and
                  administrators.
                </p>
              </div>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
              {adminInitials}
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6">
              <p className="text-sm font-medium text-orange-600">
                User Management
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                All Users
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                View users and control their roles.
              </p>
            </div>

            <section className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-medium text-slate-500">
                  Total Users
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {totalUsers}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-medium text-slate-500">
                  Customers
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {customerCount}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-medium text-slate-500">
                  Agents
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {agentCount}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-medium text-slate-500">
                  Admins
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {adminCount}
                </p>
              </div>
            </section>

            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Search
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      value={search}
                      onChange={(e) => {
                        setSearch(
                          e.target.value
                        );
                        setPage(1);
                      }}
                      placeholder="Search name or email..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-orange-400 focus:bg-white"
                    />
                  </div>

                  <select
                    value={roleFilter}
                    onChange={(e) => {
                      setRoleFilter(
                        e.target.value
                      );
                      setPage(1);
                    }}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-orange-400"
                  >
                    <option value="ALL">
                      All Roles
                    </option>

                    <option value="CUSTOMER">
                      Customer
                    </option>

                    <option value="AGENT">
                      Agent
                    </option>

                    <option value="ADMIN">
                      Admin
                    </option>
                  </select>
                </div>

                {(search ||
                  roleFilter !== "ALL") && (
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-xs text-slate-500">
                      Showing{" "}
                      {filteredUsers.length} users
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

              {loading ? (
                <div className="px-5 py-16 text-center">
                  <p className="text-sm text-slate-500">
                    Loading users...
                  </p>
                </div>
              ) : (
                <>
                  <div className="hidden overflow-x-auto md:block">
                    <table className="w-full min-w-[700px]">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/70 text-left text-xs uppercase tracking-wide text-slate-400">
                          <th className="px-5 py-4 font-semibold">
                            User
                          </th>

                          <th className="px-5 py-4 font-semibold">
                            Current Role
                          </th>

                          <th className="px-5 py-4 font-semibold">
                            Change Role
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentUsers.map(
                          (user) => (
                            <tr
                              key={user.id}
                              className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                            >
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 font-bold text-orange-600">
                                    {user.name
                                      ?.charAt(0)
                                      .toUpperCase()}
                                  </div>

                                  <div>
                                    <p className="text-sm font-semibold text-slate-900">
                                      {
                                        user.name
                                      }
                                    </p>

                                    <p className="mt-0.5 text-xs text-slate-500">
                                      {
                                        user.email
                                      }
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
                                  {formatRole(
                                    user.role
                                  )}
                                </span>
                              </td>

                              <td className="px-5 py-4">
                                {user.id ===
                                loggedInUser.id ? (
                                  <span className="text-xs font-medium text-slate-400">
                                    Current
                                    account
                                  </span>
                                ) : (
                                  <select
                                    value={
                                      user.role
                                    }
                                    disabled={
                                      updatingId ===
                                      user.id
                                    }
                                    onChange={(
                                      e
                                    ) =>
                                      updateRole(
                                        user.id,
                                        e
                                          .target
                                          .value
                                      )
                                    }
                                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-orange-400 disabled:opacity-50"
                                  >
                                    <option value="CUSTOMER">
                                      Customer
                                    </option>

                                    <option value="AGENT">
                                      Agent
                                    </option>

                                    <option value="ADMIN">
                                      Admin
                                    </option>
                                  </select>
                                )}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-3 p-4 md:hidden">
                    {currentUsers.map(
                      (user) => (
                        <div
                          key={user.id}
                          className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 font-bold text-orange-600">
                              {user.name
                                ?.charAt(0)
                                .toUpperCase()}
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

                          <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3">
                            <span
                              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${roleStyle(
                                user.role
                              )}`}
                            >
                              {formatRole(
                                user.role
                              )}
                            </span>

                            {user.id !==
                              loggedInUser.id && (
                              <select
                                value={
                                  user.role
                                }
                                disabled={
                                  updatingId ===
                                  user.id
                                }
                                onChange={(
                                  e
                                ) =>
                                  updateRole(
                                    user.id,
                                    e.target
                                      .value
                                  )
                                }
                                className="rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs"
                              >
                                <option value="CUSTOMER">
                                  Customer
                                </option>

                                <option value="AGENT">
                                  Agent
                                </option>

                                <option value="ADMIN">
                                  Admin
                                </option>
                              </select>
                            )}
                          </div>
                        </div>
                      )
                    )}
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

                      <button
                        onClick={
                          clearFilters
                        }
                        className="mt-4 text-sm font-semibold text-orange-600"
                      >
                        Clear filters
                      </button>
                    </div>
                  )}

                  {filteredUsers.length >
                    0 && (
                    <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                      <p className="text-xs text-slate-500">
                        Showing{" "}
                        {startIndex + 1}–{" "}
                        {Math.min(
                          startIndex +
                            itemsPerPage,
                          filteredUsers.length
                        )}{" "}
                        of{" "}
                        {
                          filteredUsers.length
                        }{" "}
                        users
                      </p>

                      <div className="flex items-center gap-2">
                        <button
                          disabled={
                            page === 1
                          }
                          onClick={() =>
                            setPage(
                              Math.max(
                                1,
                                page - 1
                              )
                            )
                          }
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 disabled:opacity-40"
                        >
                          <ChevronLeft
                            size={17}
                          />
                        </button>

                        <span className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white">
                          {page}
                        </span>

                        <button
                          disabled={
                            page >=
                            totalPages
                          }
                          onClick={() =>
                            setPage(
                              Math.min(
                                totalPages,
                                page + 1
                              )
                            )
                          }
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 disabled:opacity-40"
                        >
                          <ChevronRight
                            size={17}
                          />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
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
                    Customers can create tickets.
                    Agents can manage assigned
                    tickets. Admins can manage
                    users and roles.
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