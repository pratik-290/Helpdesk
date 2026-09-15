import { useState } from "react";
import {
  ArrowLeft,
  CircleHelp,
  FileText,
  Home,
  LogOut,
  Menu,
  Paperclip,
  Plus,
  Settings,
  Ticket,
  UserRound,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

function CreateTicket() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 text-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center justify-between border-b border-slate-800 px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500">
                <CircleHelp size={20} />
              </div>

              <span className="text-lg font-semibold">HelpDesk Pro</span>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="text-slate-400 hover:text-white lg:hidden"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Workspace
            </p>

            <div className="space-y-1">
              <Link
                to="/customer/dashboard"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-900 hover:text-white"
              >
                <Home size={18} />
                Dashboard
              </Link>

              <Link
                to="/customer/tickets"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-900 hover:text-white"
              >
                <Ticket size={18} />
                My Tickets
              </Link>

              <button className="flex w-full items-center gap-3 rounded-lg bg-slate-800 px-3 py-2.5 text-sm font-medium text-white">
                <Plus size={18} />
                Create Ticket
              </button>
            </div>

            <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Account
            </p>

            <div className="space-y-1">
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-900 hover:text-white">
                <UserRound size={18} />
                Profile
              </button>

              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-900 hover:text-white">
                <Settings size={18} />
                Settings
              </button>
            </div>
          </nav>

          <div className="border-t border-slate-800 p-4">
            <div className="flex items-center gap-3 rounded-lg p-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-700">
                PK
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">
                  Pratik Khose
                </p>

                <p className="truncate text-xs text-slate-500">
                  Customer
                </p>
              </div>

              <button className="text-slate-500 hover:text-white">
                <LogOut size={17} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="flex h-20 items-center border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="mr-3 rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div>
            <p className="text-sm text-slate-500">Customer Portal</p>
            <h1 className="text-lg font-semibold sm:text-xl">
              Create Ticket
            </h1>
          </div>
        </header>

        <main className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
          <Link
            to="/customer/tickets"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800"
          >
            <ArrowLeft size={17} />
            Back to tickets
          </Link>

          <div className="mb-7">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              How can we help?
            </h2>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Tell us about your issue and our support team will get back to
              you.
            </p>
          </div>

          <form className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5 sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-lg bg-orange-50 p-2.5 text-orange-600">
                  <FileText size={20} />
                </div>

                <div>
                  <h3 className="font-semibold">Ticket information</h3>
                  <p className="text-sm text-slate-500">
                    Provide details about your request.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Subject
                  </label>

                  <input
                    type="text"
                    placeholder="Briefly describe your issue"
                    className="h-12 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Category
                    </label>

                    <select className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100">
                      <option>Select category</option>
                      <option>Account</option>
                      <option>Billing</option>
                      <option>Technical</option>
                      <option>General</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Priority
                    </label>

                    <select className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100">
                      <option>Select priority</option>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Description
                  </label>

                  <textarea
                    rows="7"
                    placeholder="Describe your issue in detail..."
                    className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm leading-6 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Attachment
                  </label>

                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 px-5 py-8 text-center transition hover:border-orange-400 hover:bg-orange-50/30">
                    <div className="rounded-full bg-slate-100 p-3 text-slate-500">
                      <Paperclip size={20} />
                    </div>

                    <p className="mt-3 text-sm font-medium text-slate-700">
                      Attach a file
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      PNG, JPG or PDF up to 10MB
                    </p>

                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 bg-slate-50 p-5 sm:flex-row sm:justify-end sm:p-6">
              <Link
                to="/customer/tickets"
                className="flex h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </Link>

              <Link to="/customer/tickets/HD-1025"
                type="submit"
                className="flex h-11 items-center justify-center rounded-lg bg-orange-500 px-6 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Submit Ticket
              </Link>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default CreateTicket;