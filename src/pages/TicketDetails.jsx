import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Menu,
  X,
  LayoutDashboard,
  Ticket,
  Plus,
  User,
  Settings,
  LogOut,
  Clock3,
  CheckCircle2,
  CircleDot,
} from "lucide-react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import api from "../api/axios";

function CustomerSidebar({
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
    : "CU";

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
            to="/customer/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 font-bold text-white">
              H
            </div>

            <div>
              <p className="text-lg font-bold tracking-tight">
                HelpDesk
              </p>
              <p className="text-xs text-slate-400">
                Support Portal
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
              to="/customer/dashboard"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              <LayoutDashboard size={19} />
              Dashboard
            </Link>

            <Link
              to="/customer/tickets"
              className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-3 text-sm font-medium text-white"
            >
              <Ticket size={19} />
              My Tickets
            </Link>

            <Link
              to="/customer/tickets/create"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              <Plus size={19} />
              Create Ticket
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
                {user.name || "Customer"}
              </p>

              <p className="truncate text-xs text-slate-500">
                {user.role || "CUSTOMER"}
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

function TicketDetails() {
  const { id } = useParams();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] = useState("");
  const [closing, setClosing] =
    useState(false);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/customer/tickets/${id}`
        );

        setTicket(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load ticket"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  const formatStatus = (status) => {
    if (!status) return "";

    return status
      .toLowerCase()
      .split("_")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString();
  };

  const getStatusClass = (status) => {
    if (status === "RESOLVED") {
      return "bg-emerald-50 text-emerald-700";
    }

    if (status === "IN_PROGRESS") {
      return "bg-blue-50 text-blue-700";
    }

    if (status === "ASSIGNED") {
      return "bg-purple-50 text-purple-700";
    }

    if (status === "CLOSED") {
      return "bg-slate-100 text-slate-600";
    }

    return "bg-orange-50 text-orange-700";
  };

  const handleCloseTicket = async () => {
    try {
      setClosing(true);
      setError("");

      const response = await api.patch(
        `/customer/tickets/${id}/close`
      );

      setTicket(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to close ticket"
      );
    } finally {
      setClosing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">
          Loading ticket...
        </p>
      </div>
    );
  }

  if (error && !ticket) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50">
        <p className="font-medium text-red-500">
          {error}
        </p>

        <Link
          to="/customer/tickets"
          className="text-sm font-semibold text-orange-600"
        >
          Back to My Tickets
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <CustomerSidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className="lg:ml-72">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-xl border border-slate-200 p-2 text-slate-600 lg:hidden"
            >
              <Menu size={21} />
            </button>

            <div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
              <Link
                to="/customer/tickets"
                className="transition hover:text-slate-900"
              >
                My Tickets
              </Link>

              <span>/</span>

              <span className="font-medium text-slate-900">
                #{ticket.id}
              </span>
            </div>

            <Link
              to="/customer/tickets/create"
              className="flex items-center gap-2 rounded-xl bg-orange-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-orange-600 sm:px-4"
            >
              <Plus size={17} />

              <span className="hidden sm:inline">
                New Ticket
              </span>
            </Link>
          </div>
        </header>

        <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mb-6">
            <Link
              to="/customer/tickets"
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
              <ArrowLeft size={17} />
              Back to My Tickets
            </Link>

            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-slate-500">
                    #{ticket.id}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                      ticket.status
                    )}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />

                    {formatStatus(
                      ticket.status
                    )}
                  </span>
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {ticket.title}
                </h1>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                  {ticket.description}
                </p>
              </div>

              {ticket.status === "RESOLVED" && (
                <button
                  onClick={handleCloseTicket}
                  disabled={closing}
                  className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-60"
                >
                  <CheckCircle2 size={17} />

                  {closing
                    ? "Closing..."
                    : "Close Ticket"}
                </button>
              )}
            </div>

            {error && ticket && (
              <p className="mt-4 text-sm font-medium text-red-500">
                {error}
              </p>
            )}
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
            <section className="min-w-0">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
                  <h2 className="font-semibold text-slate-900">
                    Ticket Description
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Information provided when the
                    ticket was created
                  </p>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-700">
                      CU
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {ticket.customerName ||
                          "Customer"}
                      </p>

                      <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600">
                        {ticket.description}
                      </p>

                      <p className="mt-3 text-xs text-slate-400">
                        {formatDate(
                          ticket.createdAt
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-200 bg-slate-50 px-5 py-4">
                  <p className="text-sm text-slate-500">
                    Conversation replies will be
                    available after the messaging
                    module is connected.
                  </p>
                </div>
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="mb-5 font-semibold text-slate-900">
                  Ticket Details
                </h2>

                <div className="space-y-5">
                  <div>
                    <p className="mb-1 text-xs font-medium text-slate-400">
                      Status
                    </p>

                    <span
                      className={`inline-flex rounded-lg px-3 py-2 text-sm font-semibold ${getStatusClass(
                        ticket.status
                      )}`}
                    >
                      {formatStatus(
                        ticket.status
                      )}
                    </span>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-medium text-slate-400">
                      Category
                    </p>

                    <p className="text-sm font-semibold text-slate-800">
                      {ticket.category}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-medium text-slate-400">
                      Created
                    </p>

                    <p className="text-sm font-semibold text-slate-800">
                      {formatDate(
                        ticket.createdAt
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-medium text-slate-400">
                      Last Updated
                    </p>

                    <p className="text-sm font-semibold text-slate-800">
                      {formatDate(
                        ticket.updatedAt
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="mb-5 font-semibold text-slate-900">
                  Assigned Agent
                </h2>

                {ticket.agentName ? (
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                      {ticket.agentName
                        .split(" ")
                        .map(
                          (word) =>
                            word[0]
                        )
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {ticket.agentName}
                      </p>

                      <p className="text-xs text-slate-500">
                        Support Agent
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">
                    No agent assigned yet.
                  </p>
                )}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center gap-2">
                  <Clock3
                    size={18}
                    className="text-slate-500"
                  />

                  <h2 className="font-semibold text-slate-900">
                    Activity
                  </h2>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                    <CircleDot size={12} />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-700">
                      Ticket created
                    </p>

                    <p className="mt-1 text-[11px] text-slate-400">
                      {formatDate(
                        ticket.createdAt
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TicketDetails;