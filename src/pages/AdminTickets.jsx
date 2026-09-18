import { useEffect, useMemo, useState } from "react";
import {
  Ticket,
  Menu,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Clock3,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import api from "../api/axios";

const statusStyles = {
  OPEN: "bg-blue-50 text-blue-700",
  ASSIGNED: "bg-purple-50 text-purple-700",
  IN_PROGRESS: "bg-amber-50 text-amber-700",
  RESOLVED: "bg-emerald-50 text-emerald-700",
  CLOSED: "bg-slate-100 text-slate-600",
};

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

function AdminTickets() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [tickets, setTickets] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const [page, setPage] = useState(0);
  const [size] = useState(10);

  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [openCount, setOpenCount] = useState(0);
  const [inProgressCount, setInProgressCount] =
    useState(0);
  const [resolvedCount, setResolvedCount] =
    useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError("");

      let url = `/admin/tickets?page=${page}&size=${size}`;

      if (status !== "ALL") {
        url += `&status=${status}`;
      }

      const response = await api.get(url);

      setTickets(response.data.content || []);
      setTotalElements(response.data.totalElements || 0);
      setTotalPages(response.data.totalPages || 0);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load tickets"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchCounts = async () => {
    try {
      const [
        openResponse,
        progressResponse,
        resolvedResponse,
      ] = await Promise.all([
        api.get(
          "/admin/tickets?page=0&size=1&status=OPEN"
        ),
        api.get(
          "/admin/tickets?page=0&size=1&status=IN_PROGRESS"
        ),
        api.get(
          "/admin/tickets?page=0&size=1&status=RESOLVED"
        ),
      ]);

      setOpenCount(
        openResponse.data.totalElements || 0
      );

      setInProgressCount(
        progressResponse.data.totalElements || 0
      );

      setResolvedCount(
        resolvedResponse.data.totalElements || 0
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [page, status]);

  useEffect(() => {
    fetchCounts();
  }, []);

  const filteredTickets = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) {
      return tickets;
    }

    return tickets.filter((ticket) => {
      return (
        String(ticket.id).includes(value) ||
        ticket.title
          ?.toLowerCase()
          .includes(value) ||
        ticket.customerName
          ?.toLowerCase()
          .includes(value) ||
        ticket.category
          ?.toLowerCase()
          .includes(value)
      );
    });
  }, [tickets, search]);

  const clearFilters = () => {
    setSearch("");
    setStatus("ALL");
    setPage(0);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AdminSidebar
        mobile={sidebarOpen}
        setMobile={setSidebarOpen}
      />

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() =>
                setSidebarOpen(true)
              }
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={22} />
            </button>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold">
                Tickets
              </h2>

              <p className="hidden text-xs text-slate-500 sm:block">
                Manage all support tickets
              </p>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Ticket Management
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Monitor support requests across the
                system.
              </p>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Ticket size={18} />
                </div>

                <p className="text-2xl font-bold">
                  {totalElements}
                </p>

                <p className="text-xs text-slate-500">
                  Current Result
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                  <Clock3 size={18} />
                </div>

                <p className="text-2xl font-bold">
                  {openCount}
                </p>

                <p className="text-xs text-slate-500">
                  Open
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <AlertCircle size={18} />
                </div>

                <p className="text-2xl font-bold">
                  {inProgressCount}
                </p>

                <p className="text-xs text-slate-500">
                  In Progress
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={18} />
                </div>

                <p className="text-2xl font-bold">
                  {resolvedCount}
                </p>

                <p className="text-xs text-slate-500">
                  Resolved
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            <div className="rounded-xl border border-slate-200 bg-white">
              <div className="border-b border-slate-200 p-4 sm:p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Filter
                    size={18}
                    className="text-slate-500"
                  />

                  <h3 className="font-semibold">
                    Filter Tickets
                  </h3>
                </div>

                <div className="grid gap-3 sm:grid-cols-[1fr_220px]">
                  <div className="relative">
                    <Search
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      placeholder="Search current page..."
                      value={search}
                      onChange={(e) =>
                        setSearch(
                          e.target.value
                        )
                      }
                      className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                  <select
                    value={status}
                    onChange={(e) => {
                      setStatus(
                        e.target.value
                      );
                      setPage(0);
                    }}
                    className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-orange-400"
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

                    <option value="CLOSED">
                      Closed
                    </option>
                  </select>
                </div>

                {(search ||
                  status !== "ALL") && (
                  <button
                    onClick={clearFilters}
                    className="mt-3 text-sm font-medium text-orange-600 hover:text-orange-700"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              {loading ? (
                <div className="px-5 py-16 text-center">
                  <p className="text-sm text-slate-500">
                    Loading tickets...
                  </p>
                </div>
              ) : (
                <>
                  <div className="hidden overflow-x-auto md:block">
                    <table className="w-full min-w-[900px]">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                          <th className="px-5 py-4">
                            Ticket
                          </th>

                          <th className="px-5 py-4">
                            Customer
                          </th>

                          <th className="px-5 py-4">
                            Category
                          </th>

                          <th className="px-5 py-4">
                            Status
                          </th>

                          <th className="px-5 py-4">
                            Agent
                          </th>

                          <th className="px-5 py-4">
                            Updated
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {filteredTickets.map(
                          (ticket) => (
                            <tr
                              key={ticket.id}
                              className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                            >
                              <td className="px-5 py-4">
                                <p className="text-sm font-semibold text-orange-600">
                                  #{ticket.id}
                                </p>

                                <p className="mt-1 max-w-[230px] truncate text-sm font-medium text-slate-800">
                                  {
                                    ticket.title
                                  }
                                </p>
                              </td>

                              <td className="px-5 py-4 text-sm font-medium">
                                {ticket.customerName ||
                                  "-"}
                              </td>

                              <td className="px-5 py-4 text-sm text-slate-600">
                                {
                                  ticket.category
                                }
                              </td>

                              <td className="px-5 py-4">
                                <span
                                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                    statusStyles[
                                      ticket
                                        .status
                                    ] ||
                                    "bg-slate-100 text-slate-600"
                                  }`}
                                >
                                  {formatStatus(
                                    ticket.status
                                  )}
                                </span>
                              </td>

                              <td className="px-5 py-4 text-sm text-slate-600">
                                {ticket.agentName ||
                                  "Unassigned"}
                              </td>

                              <td className="px-5 py-4 text-sm text-slate-500">
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
                    {filteredTickets.map(
                      (ticket) => (
                        <div
                          key={ticket.id}
                          className="p-4"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-orange-600">
                                #{ticket.id}
                              </p>

                              <h4 className="mt-1 truncate text-sm font-semibold text-slate-800">
                                {
                                  ticket.title
                                }
                              </h4>
                            </div>

                            <span
                              className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                                statusStyles[
                                  ticket
                                    .status
                                ] ||
                                "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {formatStatus(
                                ticket.status
                              )}
                            </span>
                          </div>

                          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-xs text-slate-400">
                                Customer
                              </p>

                              <p className="mt-1 font-medium text-slate-700">
                                {ticket.customerName ||
                                  "-"}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-slate-400">
                                Category
                              </p>

                              <p className="mt-1 text-slate-600">
                                {
                                  ticket.category
                                }
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-slate-400">
                                Agent
                              </p>

                              <p className="mt-1 text-slate-600">
                                {ticket.agentName ||
                                  "Unassigned"}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-slate-400">
                                Updated
                              </p>

                              <p className="mt-1 text-slate-600">
                                {formatDate(
                                  ticket.updatedAt
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {filteredTickets.length ===
                    0 && (
                    <div className="px-5 py-12 text-center">
                      <Ticket
                        size={32}
                        className="mx-auto text-slate-300"
                      />

                      <h3 className="mt-3 font-semibold text-slate-700">
                        No tickets found
                      </h3>

                      <button
                        onClick={
                          clearFilters
                        }
                        className="mt-4 text-sm font-medium text-orange-600"
                      >
                        Clear filters
                      </button>
                    </div>
                  )}

                  <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                    <p className="text-sm text-slate-500">
                      Page {page + 1} of{" "}
                      {Math.max(
                        totalPages,
                        1
                      )}
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        disabled={page === 0}
                        onClick={() =>
                          setPage(
                            Math.max(
                              0,
                              page - 1
                            )
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ChevronLeft
                          size={17}
                        />
                      </button>

                      <div className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-orange-500 px-3 text-sm font-medium text-white">
                        {page + 1}
                      </div>

                      <button
                        disabled={
                          page + 1 >=
                          totalPages
                        }
                        onClick={() =>
                          setPage(
                            Math.min(
                              totalPages - 1,
                              page + 1
                            )
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ChevronRight
                          size={17}
                        />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminTickets;