import { useState } from "react";
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
  Send,
  Paperclip,
  Clock3,
  CheckCircle2,
  CircleDot,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const messages = [
  {
    id: 1,
    name: "You",
    role: "Customer",
    message:
      "I am unable to access my account. I tried resetting my password but I am still getting an error.",
    time: "Today, 10:24 AM",
    customer: true,
  },
  {
    id: 2,
    name: "Rahul Sharma",
    role: "Support Agent",
    message:
      "Hi! Thanks for reaching out. I checked your account and everything looks fine from our side. Could you please try clearing your browser cache and logging in again?",
    time: "Today, 10:42 AM",
    customer: false,
  },
  {
    id: 3,
    name: "You",
    role: "Customer",
    message:
      "I cleared the cache and tried again, but unfortunately the same error is still appearing.",
    time: "Today, 11:05 AM",
    customer: true,
  },
];

const activities = [
  {
    title: "Ticket created",
    time: "Today, 10:24 AM",
    icon: CircleDot,
  },
  {
    title: "Assigned to Rahul Sharma",
    time: "Today, 10:31 AM",
    icon: User,
  },
  {
    title: "Agent replied",
    time: "Today, 10:42 AM",
    icon: Send,
  },
  {
    title: "Customer replied",
    time: "Today, 11:05 AM",
    icon: MessageCircleIcon,
  },
];

function MessageCircleIcon({ size = 18 }) {
  return <CircleDot size={size} />;
}

function CustomerSidebar({ mobileOpen, setMobileOpen }) {
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
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <Link to="/customer/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 font-bold text-white">
              H
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight">HelpDesk</p>
              <p className="text-xs text-slate-400">Support Portal</p>
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
              PK
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">Pratik Khose</p>
              <p className="truncate text-xs text-slate-500">Customer</p>
            </div>
          </div>

          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-red-500/10 hover:text-red-400">
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState(messages);

  const ticketId = id || "HD-1024";

  const handleSend = () => {
    if (!message.trim()) return;

    setMessagesList((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "You",
        role: "Customer",
        message: message.trim(),
        time: "Just now",
        customer: true,
      },
    ]);

    setMessage("");
  };

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
              <span className="font-medium text-slate-900">{ticketId}</span>
            </div>

            <Link
              to="/customer/tickets/create"
              className="flex items-center gap-2 rounded-xl bg-orange-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-orange-600 sm:px-4"
            >
              <Plus size={17} />
              <span className="hidden sm:inline">New Ticket</span>
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
                    #{ticketId}
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    In Progress
                  </span>
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Unable to access my account
                </h1>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                  Having trouble signing in to my account even after resetting
                  the password.
                </p>
              </div>

              <button className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
                <CheckCircle2 size={17} />
                Close Ticket
              </button>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
            <section className="min-w-0">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-semibold text-slate-900">
                        Conversation
                      </h2>
                      <p className="mt-1 text-xs text-slate-500">
                        Communicate with our support team
                      </p>
                    </div>

                    <span className="hidden rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 sm:block">
                      {messagesList.length} messages
                    </span>
                  </div>
                </div>

                <div className="space-y-6 p-5 sm:p-6">
                  {messagesList.map((item) => (
                    <div
                      key={item.id}
                      className={`flex gap-3 sm:gap-4 ${
                        item.customer ? "justify-end" : "justify-start"
                      }`}
                    >
                      {!item.customer && (
                        <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white sm:flex">
                          RS
                        </div>
                      )}

                      <div
                        className={`max-w-[88%] sm:max-w-[75%] ${
                          item.customer ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`mb-1.5 flex flex-wrap items-center gap-2 ${
                            item.customer ? "justify-end" : "justify-start"
                          }`}
                        >
                          <span className="text-sm font-semibold text-slate-900">
                            {item.name}
                          </span>
                          <span className="text-xs text-slate-400">
                            {item.role}
                          </span>
                        </div>

                        <div
                          className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                            item.customer
                              ? "rounded-tr-md bg-orange-500 text-white"
                              : "rounded-tl-md bg-slate-100 text-slate-700"
                          }`}
                        >
                          {item.message}
                        </div>

                        <p
                          className={`mt-1.5 text-[11px] text-slate-400 ${
                            item.customer ? "text-right" : "text-left"
                          }`}
                        >
                          {item.time}
                        </p>
                      </div>

                      {item.customer && (
                        <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-700 sm:flex">
                          PK
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-200 bg-slate-50 p-4 sm:p-5">
                  <div className="rounded-xl border border-slate-200 bg-white shadow-sm focus-within:border-orange-300 focus-within:ring-2 focus-within:ring-orange-100">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="Write your reply..."
                      className="w-full resize-none bg-transparent px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    />

                    <div className="flex items-center justify-between border-t border-slate-100 px-3 py-2">
                      <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                        <Paperclip size={18} />
                      </button>

                      <button
                        onClick={handleSend}
                        className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                      >
                        Send Reply
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="font-semibold text-slate-900">
                    Ticket Details
                  </h2>

                  <button className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                    <ChevronDown size={18} />
                  </button>
                </div>

                <div className="space-y-5">
                  <div>
                    <p className="mb-1 text-xs font-medium text-slate-400">
                      Status
                    </p>
                    <span className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      In Progress
                    </span>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-medium text-slate-400">
                      Priority
                    </p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-red-600">
                      <AlertCircle size={17} />
                      High
                    </div>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-medium text-slate-400">
                      Category
                    </p>
                    <p className="text-sm font-semibold text-slate-800">
                      Account & Login
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-medium text-slate-400">
                      Created
                    </p>
                    <p className="text-sm font-semibold text-slate-800">
                      Sep 15, 2026
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-medium text-slate-400">
                      Last Updated
                    </p>
                    <p className="text-sm font-semibold text-slate-800">
                      Today, 11:05 AM
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="mb-5 font-semibold text-slate-900">
                  Assigned Agent
                </h2>

                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                    RS
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Rahul Sharma
                    </p>
                    <p className="text-xs text-slate-500">
                      Support Agent
                    </p>
                  </div>
                </div>

                <button className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  View Agent Profile
                </button>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center gap-2">
                  <Clock3 size={18} className="text-slate-500" />
                  <h2 className="font-semibold text-slate-900">
                    Activity
                  </h2>
                </div>

                <div className="relative space-y-5 pl-1">
                  {activities.map((activity, index) => {
                    const Icon = activity.icon;

                    return (
                      <div key={index} className="relative flex gap-3">
                        {index !== activities.length - 1 && (
                          <div className="absolute left-[9px] top-6 h-7 w-px bg-slate-200" />
                        )}

                        <div className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                          <Icon size={12} />
                        </div>

                        <div>
                          <p className="text-xs font-medium text-slate-700">
                            {activity.title}
                          </p>
                          <p className="mt-1 text-[11px] text-slate-400">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
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