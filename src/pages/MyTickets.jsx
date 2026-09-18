import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  Plus,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomerSidebar from "../components/CustomerSidebar";
import api from "../api/axios";

function MyTickets() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const initials = user.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "CU";

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/customer/tickets");

        setTickets(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load tickets"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const formatStatus = (value) => {
    if (!value) return "";

    return value
      .toLowerCase()
      .split("_")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString();
  };

  const getStatusClass = (ticketStatus) => {
    if (ticketStatus === "RESOLVED") {
      return "bg-emerald-50 text-emerald-700";
    }

    if (ticketStatus === "IN_PROGRESS") {
      return "bg-blue-50 text-blue-700";
    }

    if (ticketStatus === "ASSIGNED") {
      return "bg-purple-50 text-purple-700";
    }

    if (ticketStatus === "CLOSED") {
      return "bg-slate-100 text-slate-600";
    }

    return "bg-orange-50 text-orange-700";
  };

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const ticketId = String(ticket.id);

      const matchesSearch =
        ticket.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        ticketId.includes(search);

      const matchesStatus =
        status === "ALL" || ticket.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [tickets, search, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTickets.length / itemsPerPage)
  );

  const startIndex = (page - 1) * itemsPerPage;

  const currentTickets = filteredTickets.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <CustomerSidebar
        mobile={sidebarOpen}
        setMobile={setSidebarOpen}
      />

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={22} />
            </button>

            <div>
              <p className="text-sm text-slate-500">
                Customer Portal
              </p>

              <h1 className="text-lg font-semibold sm:text-xl">
                My Tickets
              </h1>
            </div>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-700">
              {initials}
            </div>

            <ChevronDown
              size={16}
              className="text-slate-400"
            />
          </div>
        </header>

        <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Support requests
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                All your tickets
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Search and manage your previous support requests.
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/customer/tickets/create")
              }
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 text-sm font-semibold text-white transition hover:bg-orange-600 sm:w-auto"
            >
              <Plus size={18} />
              New Ticket
            </button>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-4 sm:p-5">
              <div className="flex flex-col gap-3 lg:flex-row">
                <div className="relative flex-1">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search by ticket ID or title..."
                    className="h-11 w-full rounded-lg border border-slate-300 pl-10 pr-4 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div className="relative lg:w-[220px]">
                  <select
                    value={status}
                    onChange={handleStatusChange}
                    className="h-11 w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 pr-10 text-sm text-slate-700 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
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

                  <ChevronDown
                    size={17}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>
            </div>

            {loading && (
              <div className="px-6 py-16 text-center">
                <p className="text-sm text-slate-500">
                  Loading tickets...
                </p>
              </div>
            )}

            {!loading && error && (
              <div className="px-6 py-16 text-center">
                <p className="font-medium text-red-500">
                  {error}
                </p>
              </div>
            )}

            {!loading &&
              !error &&
              filteredTickets.length > 0 && (
                <>
                  <div className="hidden overflow-x-auto md:block">
                    <table className="w-full min-w-[750px]">
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
                        {currentTickets.map((ticket) => (
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
                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
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
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="divide-y divide-slate-100 md:hidden">
                    {currentTickets.map((ticket) => (
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

                            <h3 className="mt-1 text-sm font-semibold text-slate-800">
                              {ticket.title}
                            </h3>
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

                        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-500">
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
                    ))}
                  </div>

                  <div className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-500">
                      Showing{" "}
                      <span className="font-medium text-slate-700">
                        {filteredTickets.length === 0
                          ? 0
                          : startIndex + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium text-slate-700">
                        {Math.min(
                          startIndex + itemsPerPage,
                          filteredTickets.length
                        )}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-slate-700">
                        {filteredTickets.length}
                      </span>{" "}
                      tickets
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        disabled={page === 1}
                        onClick={() =>
                          setPage((current) =>
                            Math.max(
                              1,
                              current - 1
                            )
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ChevronLeft size={17} />
                      </button>

                      <div className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-orange-500 px-3 text-sm font-medium text-white">
                        {page}
                      </div>

                      <button
                        disabled={page >= totalPages}
                        onClick={() =>
                          setPage((current) =>
                            Math.min(
                              totalPages,
                              current + 1
                            )
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ChevronRight size={17} />
                      </button>
                    </div>
                  </div>
                </>
              )}

            {!loading &&
              !error &&
              filteredTickets.length === 0 && (
                <div className="px-6 py-16 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                    <Search size={21} />
                  </div>

                  <h3 className="mt-4 font-semibold text-slate-800">
                    No tickets found
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Try changing your search or filters.
                  </p>

                  <button
                    onClick={() => {
                      setSearch("");
                      setStatus("ALL");
                      setPage(1);
                    }}
                    className="mt-4 text-sm font-semibold text-orange-600 hover:text-orange-700"
                  >
                    Clear filters
                  </button>
                </div>
              )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default MyTickets;