import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  Plus,
  Search,
} from "lucide-react";
import CustomerSidebar from "../components/CustomerSidebar";

const tickets = [
  {
    id: "#HD-1048",
    title: "Unable to access my account",
    category: "Account",
    status: "In Progress",
    priority: "High",
    updated: "12 min ago",
  },
  {
    id: "#HD-1045",
    title: "Payment was charged twice",
    category: "Billing",
    status: "Open",
    priority: "Medium",
    updated: "1 hour ago",
  },
  {
    id: "#HD-1042",
    title: "Unable to download invoice",
    category: "Billing",
    status: "Open",
    priority: "Low",
    updated: "4 hours ago",
  },
  {
    id: "#HD-1039",
    title: "Need help changing email address",
    category: "Account",
    status: "Resolved",
    priority: "Low",
    updated: "Yesterday",
  },
  {
    id: "#HD-1036",
    title: "Application keeps crashing",
    category: "Technical",
    status: "In Progress",
    priority: "High",
    updated: "Yesterday",
  },
  {
    id: "#HD-1032",
    title: "Application keeps loading",
    category: "Technical",
    status: "Closed",
    priority: "Medium",
    updated: "2 days ago",
  },
  {
    id: "#HD-1028",
    title: "Profile information not updating",
    category: "Account",
    status: "Resolved",
    priority: "Low",
    updated: "3 days ago",
  },
  {
    id: "#HD-1024",
    title: "Incorrect subscription amount",
    category: "Billing",
    status: "Closed",
    priority: "High",
    updated: "4 days ago",
  },
];

function MyTickets() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [priority, setPriority] = useState("All Priorities");
  const [page, setPage] = useState(1);

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesSearch =
        ticket.title.toLowerCase().includes(search.toLowerCase()) ||
        ticket.id.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "All Status" || ticket.status === status;

      const matchesPriority =
        priority === "All Priorities" ||
        ticket.priority === priority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [search, status, priority]);

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
              PK
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

            <button className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 text-sm font-semibold text-white transition hover:bg-orange-600 sm:w-auto">
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
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search by ticket ID or title..."
                    className="h-11 w-full rounded-lg border border-slate-300 pl-10 pr-4 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:w-[430px]">
                  <div className="relative">
                    <select
                      value={status}
                      onChange={(e) => {
                        setStatus(e.target.value);
                        setPage(1);
                      }}
                      className="h-11 w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 pr-10 text-sm text-slate-700 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    >
                      <option>All Status</option>
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                      <option>Closed</option>
                    </select>

                    <ChevronDown
                      size={17}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  </div>

                  <div className="relative">
                    <select
                      value={priority}
                      onChange={(e) => {
                        setPriority(e.target.value);
                        setPage(1);
                      }}
                      className="h-11 w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 pr-10 text-sm text-slate-700 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    >
                      <option>All Priorities</option>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>

                    <ChevronDown
                      size={17}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {filteredTickets.length > 0 ? (
              <>
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full min-w-[800px]">
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
                          Priority
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Updated
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredTickets.map((ticket) => (
                        <tr
                          key={ticket.id}
                          className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                        >
                          <td className="px-6 py-5">
                            <p className="text-xs font-medium text-slate-400">
                              {ticket.id}
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
                              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                ticket.status === "Resolved"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : ticket.status === "In Progress"
                                  ? "bg-blue-50 text-blue-700"
                                  : ticket.status === "Closed"
                                  ? "bg-slate-100 text-slate-600"
                                  : "bg-orange-50 text-orange-700"
                              }`}
                            >
                              {ticket.status}
                            </span>
                          </td>

                          <td className="px-6 py-5">
                            <span
                              className={`text-sm font-medium ${
                                ticket.priority === "High"
                                  ? "text-red-600"
                                  : ticket.priority === "Medium"
                                  ? "text-amber-600"
                                  : "text-slate-500"
                              }`}
                            >
                              {ticket.priority}
                            </span>
                          </td>

                          <td className="px-6 py-5 text-sm text-slate-500">
                            {ticket.updated}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="divide-y divide-slate-100 md:hidden">
                  {filteredTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="p-5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-slate-400">
                            {ticket.id}
                          </p>

                          <h3 className="mt-1 text-sm font-semibold text-slate-800">
                            {ticket.title}
                          </h3>
                        </div>

                        <span
                          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                            ticket.status === "Resolved"
                              ? "bg-emerald-50 text-emerald-700"
                              : ticket.status === "In Progress"
                              ? "bg-blue-50 text-blue-700"
                              : ticket.status === "Closed"
                              ? "bg-slate-100 text-slate-600"
                              : "bg-orange-50 text-orange-700"
                          }`}
                        >
                          {ticket.status}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-500">
                        <span>{ticket.category}</span>

                        <span>•</span>

                        <span
                          className={
                            ticket.priority === "High"
                              ? "font-medium text-red-600"
                              : ticket.priority === "Medium"
                              ? "font-medium text-amber-600"
                              : ""
                          }
                        >
                          {ticket.priority}
                        </span>

                        <span>•</span>

                        <span>{ticket.updated}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-slate-500">
                    Showing{" "}
                    <span className="font-medium text-slate-700">
                      1
                    </span>{" "}
                    to{" "}
                    <span className="font-medium text-slate-700">
                      {filteredTickets.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-slate-700">
                      {filteredTickets.length}
                    </span>{" "}
                    tickets
                  </p>

                  <div className="flex items-center gap-1">
                    <button
                      disabled={page === 1}
                      onClick={() =>
                        setPage(Math.max(1, page - 1))
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ChevronLeft size={17} />
                    </button>

                    <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-sm font-medium text-white">
                      1
                    </button>

                    <button
                      onClick={() => setPage(2)}
                      className="hidden h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 sm:flex"
                    >
                      2
                    </button>

                    <button
                      onClick={() =>
                        setPage(Math.min(2, page + 1))
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
                    >
                      <ChevronRight size={17} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
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
                    setStatus("All Status");
                    setPriority("All Priorities");
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