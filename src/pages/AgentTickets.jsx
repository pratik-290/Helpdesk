import { useEffect, useMemo, useState } from "react";
import {
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

const statusOptions = [
  "ALL",
  "OPEN",
  "ASSIGNED",
  "IN_PROGRESS",
  "RESOLVED",
];

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
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              <LayoutDashboard size={19} />
              Dashboard
            </Link>

            <Link
              to="/agent/tickets"
              className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-3 text-sm font-medium text-white"
            >
              <Ticket size={19} />
              Tickets
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

function AgentTickets() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [category, setCategory] = useState("ALL");
  const [page, setPage] = useState(1);

  const [loading, setLoading] =
    useState(true);

  const [actionLoading, setActionLoading] =
    useState(null);

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

  const itemsPerPage = 6;

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError("");

      const [openResponse, assignedResponse] =
        await Promise.all([
          api.get("/agent/tickets/open"),
          api.get("/agent/tickets/assigned"),
        ]);

      const combined = [
        ...openResponse.data,
        ...assignedResponse.data,
      ];

      const uniqueTickets = Array.from(
        new Map(
          combined.map((ticket) => [
            ticket.id,
            ticket,
          ])
        ).values()
      );

      setTickets(uniqueTickets);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load tickets"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const assignTicket = async (ticketId) => {
    try {
      setActionLoading(ticketId);
      setError("");

      await api.post(
        `/agent/tickets/${ticketId}/assign`
      );

      await fetchTickets();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to assign ticket"
      );
    } finally {
      setActionLoading(null);
    }
  };

  const updateStatus = async (
    ticketId,
    newStatus
  ) => {
    try {
      setActionLoading(ticketId);
      setError("");

      await api.patch(
        `/agent/tickets/${ticketId}/status`,
        {
          status: newStatus,
        }
      );

      await fetchTickets();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update ticket"
      );
    } finally {
      setActionLoading(null);
    }
  };

  const categories = useMemo(() => {
    const values = tickets
      .map((ticket) => ticket.category)
      .filter(Boolean);

    return ["ALL", ...new Set(values)];
  }, [tickets]);

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const id = String(ticket.id);

      const searchMatch =
        id.includes(search) ||
        ticket.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        ticket.customerName
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const statusMatch =
        status === "ALL" ||
        ticket.status === status;

      const categoryMatch =
        category === "ALL" ||
        ticket.category === category;

      return (
        searchMatch &&
        statusMatch &&
        categoryMatch
      );
    });
  }, [tickets, search, status, category]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredTickets.length / itemsPerPage
    )
  );

  const startIndex =
    (page - 1) * itemsPerPage;

  const currentTickets =
    filteredTickets.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  const openCount = tickets.filter(
    (ticket) => ticket.status === "OPEN"
  ).length;

  const inProgressCount = tickets.filter(
    (ticket) =>
      ticket.status === "IN_PROGRESS"
  ).length;

  const resolvedCount = tickets.filter(
    (ticket) => ticket.status === "RESOLVED"
  ).length;

  const clearFilters = () => {
    setSearch("");
    setStatus("ALL");
    setCategory("ALL");
    setPage(1);
  };

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
                Ticket management
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button className="relative rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-50">
                <Clock3 size={19} />

                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-orange-500" />
              </button>

              <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white sm:flex">
                {initials}
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1 text-sm font-medium text-orange-600">
                Support queue
              </p>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Agent Tickets
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Assign and manage customer support
                tickets.
              </p>
            </div>

            <Link
              to="/agent/dashboard"
              className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              Dashboard
              <ArrowUpRight size={17} />
            </Link>
          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5 sm:p-6">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <h2 className="font-semibold text-slate-900">
                    Ticket Queue
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    {filteredTickets.length} tickets
                    matching your filters
                  </p>
                </div>

                <button
                  onClick={clearFilters}
                  className="w-fit text-sm font-medium text-slate-500 transition hover:text-orange-600"
                >
                  Clear filters
                </button>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_190px_190px]">
                <div className="relative sm:col-span-2 xl:col-span-1">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search ticket, title or customer..."
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
                    onChange={(e) => {
                      setStatus(e.target.value);
                      setPage(1);
                    }}
                    className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-700 outline-none"
                  >
                    {statusOptions.map(
                      (option) => (
                        <option
                          key={option}
                          value={option}
                        >
                          {option === "ALL"
                            ? "All Status"
                            : formatStatus(
                                option
                              )}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setPage(1);
                  }}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none"
                >
                  {categories.map(
                    (option) => (
                      <option
                        key={option}
                        value={option}
                      >
                        {option === "ALL"
                          ? "All Categories"
                          : option}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            {loading ? (
              <div className="px-6 py-20 text-center text-sm text-slate-500">
                Loading tickets...
              </div>
            ) : (
              <>
                <div className="hidden overflow-x-auto lg:block">
                  <table className="w-full min-w-[1100px]">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/70 text-left">
                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-400">
                          Ticket
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-400">
                          Customer
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-400">
                          Status
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-400">
                          Assigned To
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-400">
                          Updated
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-400">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {currentTickets.map(
                        (ticket) => (
                          <tr
                            key={ticket.id}
                            className="border-b border-slate-100 hover:bg-slate-50"
                          >
                            <td className="px-6 py-4">
                              <p className="text-xs font-semibold text-slate-400">
                                #{ticket.id}
                              </p>

                              <p className="mt-1 max-w-[280px] truncate text-sm font-semibold text-slate-800">
                                {ticket.title}
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                {ticket.category}
                              </p>
                            </td>

                            <td className="px-6 py-4">
                              <p className="text-sm font-medium text-slate-700">
                                {ticket.customerName}
                              </p>
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

                            <td className="px-6 py-4 text-sm text-slate-700">
                              {ticket.agentName ||
                                "Unassigned"}
                            </td>

                            <td className="px-6 py-4 text-sm text-slate-500">
                              {formatDate(
                                ticket.updatedAt
                              )}
                            </td>

                            <td className="px-6 py-4">
                              {ticket.status ===
                                "OPEN" && (
                                <button
                                  onClick={() =>
                                    assignTicket(
                                      ticket.id
                                    )
                                  }
                                  disabled={
                                    actionLoading ===
                                    ticket.id
                                  }
                                  className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
                                >
                                  {actionLoading ===
                                  ticket.id
                                    ? "Assigning..."
                                    : "Assign"}
                                </button>
                              )}

                              {ticket.status ===
                                "ASSIGNED" && (
                                <button
                                  onClick={() =>
                                    updateStatus(
                                      ticket.id,
                                      "IN_PROGRESS"
                                    )
                                  }
                                  disabled={
                                    actionLoading ===
                                    ticket.id
                                  }
                                  className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
                                >
                                  Start Work
                                </button>
                              )}

                              {ticket.status ===
                                "IN_PROGRESS" && (
                                <button
                                  onClick={() =>
                                    updateStatus(
                                      ticket.id,
                                      "RESOLVED"
                                    )
                                  }
                                  disabled={
                                    actionLoading ===
                                    ticket.id
                                  }
                                  className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                                >
                                  Resolve
                                </button>
                              )}

                              {ticket.status ===
                                "RESOLVED" && (
                                <span className="text-xs font-semibold text-emerald-600">
                                  Completed
                                </span>
                              )}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="space-y-3 p-4 lg:hidden">
                  {currentTickets.map(
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

                        <div className="mt-4 border-t border-slate-100 pt-3">
                          <p className="text-xs text-slate-500">
                            {ticket.category}
                          </p>

                          <div className="mt-3">
                            {ticket.status ===
                              "OPEN" && (
                              <button
                                onClick={() =>
                                  assignTicket(
                                    ticket.id
                                  )
                                }
                                className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white"
                              >
                                Assign Ticket
                              </button>
                            )}

                            {ticket.status ===
                              "ASSIGNED" && (
                              <button
                                onClick={() =>
                                  updateStatus(
                                    ticket.id,
                                    "IN_PROGRESS"
                                  )
                                }
                                className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white"
                              >
                                Start Work
                              </button>
                            )}

                            {ticket.status ===
                              "IN_PROGRESS" && (
                              <button
                                onClick={() =>
                                  updateStatus(
                                    ticket.id,
                                    "RESOLVED"
                                  )
                                }
                                className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white"
                              >
                                Resolve
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>

                {filteredTickets.length ===
                  0 && (
                  <div className="px-6 py-16 text-center">
                    <Search
                      size={22}
                      className="mx-auto text-slate-400"
                    />

                    <p className="mt-4 text-sm font-semibold text-slate-700">
                      No tickets found
                    </p>
                  </div>
                )}

                {filteredTickets.length > 0 && (
                  <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-slate-500">
                      Showing{" "}
                      {startIndex + 1}–{" "}
                      {Math.min(
                        startIndex +
                          itemsPerPage,
                        filteredTickets.length
                      )}{" "}
                      of{" "}
                      {
                        filteredTickets.length
                      }{" "}
                      tickets
                    </p>

                    <div className="flex gap-2">
                      <button
                        disabled={page === 1}
                        onClick={() =>
                          setPage(
                            Math.max(
                              1,
                              page - 1
                            )
                          )
                        }
                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold disabled:opacity-40"
                      >
                        Previous
                      </button>

                      <span className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white">
                        {page}
                      </span>

                      <button
                        disabled={
                          page >= totalPages
                        }
                        onClick={() =>
                          setPage(
                            Math.min(
                              totalPages,
                              page + 1
                            )
                          )
                        }
                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold disabled:opacity-40"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Ticket size={19} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Open
                  </p>

                  <p className="text-xl font-bold">
                    {openCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Clock3 size={19} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    In Progress
                  </p>

                  <p className="text-xl font-bold">
                    {inProgressCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={19} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Resolved
                  </p>

                  <p className="text-xl font-bold">
                    {resolvedCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AgentTickets;