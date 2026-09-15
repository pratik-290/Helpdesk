import { useMemo, useState } from "react";
import {
  Ticket,
  Menu,
  Plus,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  UserRound,
  Clock3,
  AlertCircle,
} from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";

const ticketsData = [
  {
    id: "HD-1024",
    subject: "Unable to reset password",
    customer: "Rahul Sharma",
    category: "Account",
    priority: "High",
    status: "OPEN",
    agent: "Amit Patil",
    updated: "10 min ago",
  },
  {
    id: "HD-1023",
    subject: "Payment failed during checkout",
    customer: "Sneha Joshi",
    category: "Billing",
    priority: "Critical",
    status: "IN_PROGRESS",
    agent: "Priya Deshmukh",
    updated: "25 min ago",
  },
  {
    id: "HD-1022",
    subject: "Application showing blank screen",
    customer: "Rohan Mehta",
    category: "Technical",
    priority: "High",
    status: "IN_PROGRESS",
    agent: "Amit Patil",
    updated: "1 hour ago",
  },
  {
    id: "HD-1021",
    subject: "Unable to update profile",
    customer: "Neha Kulkarni",
    category: "Account",
    priority: "Medium",
    status: "RESOLVED",
    agent: "Vikram Shah",
    updated: "2 hours ago",
  },
  {
    id: "HD-1020",
    subject: "Refund not received",
    customer: "Aditya More",
    category: "Billing",
    priority: "High",
    status: "OPEN",
    agent: "Priya Deshmukh",
    updated: "3 hours ago",
  },
  {
    id: "HD-1019",
    subject: "Dashboard loading slowly",
    customer: "Kunal Joshi",
    category: "Technical",
    priority: "Medium",
    status: "RESOLVED",
    agent: "Amit Patil",
    updated: "5 hours ago",
  },
  {
    id: "HD-1018",
    subject: "Account verification issue",
    customer: "Pooja Singh",
    category: "Account",
    priority: "Low",
    status: "CLOSED",
    agent: "Vikram Shah",
    updated: "1 day ago",
  },
  {
    id: "HD-1017",
    subject: "Unable to download invoice",
    customer: "Sahil Verma",
    category: "Billing",
    priority: "Medium",
    status: "OPEN",
    agent: "Priya Deshmukh",
    updated: "1 day ago",
  },
];

const statusStyles = {
  OPEN: "bg-blue-50 text-blue-700",
  ASSIGNED: "bg-purple-50 text-purple-700",
  IN_PROGRESS: "bg-amber-50 text-amber-700",
  RESOLVED: "bg-emerald-50 text-emerald-700",
  CLOSED: "bg-slate-100 text-slate-600",
};

const priorityStyles = {
  Critical: "bg-red-50 text-red-700",
  High: "bg-orange-50 text-orange-700",
  Medium: "bg-yellow-50 text-yellow-700",
  Low: "bg-slate-100 text-slate-600",
};

function AdminTickets() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [category, setCategory] = useState("All");
  const [agent, setAgent] = useState("All");

  const filteredTickets = useMemo(() => {
    const value = search.toLowerCase().trim();

    return ticketsData.filter((ticket) => {
      const searchMatch =
        ticket.id.toLowerCase().includes(value) ||
        ticket.subject.toLowerCase().includes(value) ||
        ticket.customer.toLowerCase().includes(value);

      const statusMatch =
        status === "All" || ticket.status === status;

      const priorityMatch =
        priority === "All" || ticket.priority === priority;

      const categoryMatch =
        category === "All" || ticket.category === category;

      const agentMatch =
        agent === "All" || ticket.agent === agent;

      return (
        searchMatch &&
        statusMatch &&
        priorityMatch &&
        categoryMatch &&
        agentMatch
      );
    });
  }, [search, status, priority, category, agent]);

  const clearFilters = () => {
    setSearch("");
    setStatus("All");
    setPriority("All");
    setCategory("All");
    setAgent("All");
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
              onClick={() => setSidebarOpen(true)}
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

          <button className="flex items-center gap-2 rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium text-white hover:bg-orange-600 sm:px-4">
            <Plus size={18} />
            <span className="hidden sm:inline">
              Create Ticket
            </span>
          </button>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Ticket Management
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Monitor and manage support requests across the system.
              </p>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Ticket size={18} />
                </div>

                <p className="text-2xl font-bold">
                  2,846
                </p>

                <p className="text-xs text-slate-500">
                  Total Tickets
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                  <Clock3 size={18} />
                </div>

                <p className="text-2xl font-bold">
                  184
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
                  76
                </p>

                <p className="text-xs text-slate-500">
                  In Progress
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <UserRound size={18} />
                </div>

                <p className="text-2xl font-bold">
                  91.8%
                </p>

                <p className="text-xs text-slate-500">
                  Resolution Rate
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white">
              <div className="border-b border-slate-200 p-4 sm:p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Filter size={18} className="text-slate-500" />

                  <h3 className="font-semibold">
                    Filter Tickets
                  </h3>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  <div className="relative lg:col-span-2">
                    <Search
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      placeholder="Search tickets..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-orange-400"
                  >
                    <option value="All">
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

                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-orange-400"
                  >
                    <option value="All">
                      All Priority
                    </option>
                    <option value="Critical">
                      Critical
                    </option>
                    <option value="High">
                      High
                    </option>
                    <option value="Medium">
                      Medium
                    </option>
                    <option value="Low">
                      Low
                    </option>
                  </select>

                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-orange-400"
                  >
                    <option value="All">
                      All Categories
                    </option>
                    <option value="Account">
                      Account
                    </option>
                    <option value="Billing">
                      Billing
                    </option>
                    <option value="Technical">
                      Technical
                    </option>
                  </select>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <select
                    value={agent}
                    onChange={(e) => setAgent(e.target.value)}
                    className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-orange-400"
                  >
                    <option value="All">
                      All Agents
                    </option>
                    <option value="Amit Patil">
                      Amit Patil
                    </option>
                    <option value="Priya Deshmukh">
                      Priya Deshmukh
                    </option>
                    <option value="Vikram Shah">
                      Vikram Shah
                    </option>
                  </select>

                  <button
                    onClick={clearFilters}
                    className="text-sm font-medium text-orange-600 hover:text-orange-700"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[950px]">
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
                        Priority
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

                      <th className="px-5 py-4">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredTickets.map((ticket) => (
                      <tr
                        key={ticket.id}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                      >
                        <td className="px-5 py-4">
                          <div>
                            <p className="text-sm font-semibold text-orange-600">
                              {ticket.id}
                            </p>

                            <p className="mt-1 max-w-[220px] truncate text-sm font-medium text-slate-800">
                              {ticket.subject}
                            </p>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm font-medium">
                            {ticket.customer}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {ticket.category}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${priorityStyles[ticket.priority]}`}
                          >
                            {ticket.priority}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[ticket.status]}`}
                          >
                            {ticket.status.replace("_", " ")}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {ticket.agent}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-500">
                          {ticket.updated}
                        </td>

                        <td className="px-5 py-4">
                          <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100">
                            <Eye size={15} />
                            View
                          </button>
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
                    className="p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-orange-600">
                          {ticket.id}
                        </p>

                        <h4 className="mt-1 truncate text-sm font-semibold text-slate-800">
                          {ticket.subject}
                        </h4>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${priorityStyles[ticket.priority]}`}
                      >
                        {ticket.priority}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-slate-400">
                          Customer
                        </p>

                        <p className="mt-1 font-medium text-slate-700">
                          {ticket.customer}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Category
                        </p>

                        <p className="mt-1 text-slate-600">
                          {ticket.category}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Agent
                        </p>

                        <p className="mt-1 text-slate-600">
                          {ticket.agent}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Updated
                        </p>

                        <p className="mt-1 text-slate-600">
                          {ticket.updated}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[ticket.status]}`}
                      >
                        {ticket.status.replace("_", " ")}
                      </span>

                      <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100">
                        <Eye size={15} />
                        View Ticket
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredTickets.length === 0 && (
                <div className="px-5 py-12 text-center">
                  <Ticket
                    size={32}
                    className="mx-auto text-slate-300"
                  />

                  <h3 className="mt-3 font-semibold text-slate-700">
                    No tickets found
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Try changing your search or filters.
                  </p>

                  <button
                    onClick={clearFilters}
                    className="mt-4 text-sm font-medium text-orange-600"
                  >
                    Clear filters
                  </button>
                </div>
              )}

              <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <p className="text-sm text-slate-500">
                  Showing {filteredTickets.length} of{" "}
                  {ticketsData.length} tickets
                </p>

                <div className="flex items-center gap-2">
                  <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">
                    <ChevronLeft size={17} />
                  </button>

                  <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-sm font-medium text-white">
                    1
                  </button>

                  <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50">
                    2
                  </button>

                  <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">
                    <ChevronRight size={17} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminTickets;