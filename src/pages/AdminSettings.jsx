import { useState } from "react";
import {
  User,
  Bell,
  Ticket,
  Shield,
  SlidersHorizontal,
  Save,
  Menu,
} from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";

function AdminSettings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [ticketNotifications, setTicketNotifications] = useState(true);
  const [autoAssignment, setAutoAssignment] = useState(true);
  const [customerReplies, setCustomerReplies] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AdminSidebar
        mobile={sidebarOpen}
        setMobile={setSidebarOpen}
      />

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex min-h-16 items-center border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="mr-3 rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div>
            <h2 className="text-lg font-semibold">
              Settings
            </h2>

            <p className="hidden text-xs text-slate-500 sm:block">
              Manage system configuration
            </p>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                System Settings
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Configure your HelpDesk Pro administration preferences.
              </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-[220px_1fr]">
              <div className="h-fit rounded-xl border border-slate-200 bg-white p-2">
                <button className="flex w-full items-center gap-3 rounded-lg bg-orange-50 px-3 py-3 text-left text-sm font-medium text-orange-600">
                  <User size={18} />
                  Profile
                </button>

                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-slate-600 hover:bg-slate-50">
                  <Bell size={18} />
                  Notifications
                </button>

                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-slate-600 hover:bg-slate-50">
                  <Ticket size={18} />
                  Tickets
                </button>

                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-slate-600 hover:bg-slate-50">
                  <Shield size={18} />
                  Security
                </button>

                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-slate-600 hover:bg-slate-50">
                  <SlidersHorizontal size={18} />
                  System
                </button>
              </div>

              <div className="space-y-6">
                <section className="rounded-xl border border-slate-200 bg-white">
                  <div className="border-b border-slate-200 p-5">
                    <h3 className="font-semibold">
                      Administrator Profile
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Update your administrator account information.
                    </p>
                  </div>

                  <div className="grid gap-5 p-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Full Name
                      </label>

                      <input
                        type="text"
                        defaultValue="Admin User"
                        className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Email Address
                      </label>

                      <input
                        type="email"
                        defaultValue="admin@helpdeskpro.com"
                        className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Role
                      </label>

                      <input
                        type="text"
                        value="Administrator"
                        readOnly
                        className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Time Zone
                      </label>

                      <select className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-orange-400">
                        <option>Asia/Kolkata</option>
                        <option>Asia/Dubai</option>
                        <option>Europe/London</option>
                        <option>America/New_York</option>
                      </select>
                    </div>
                  </div>
                </section>

                <section className="rounded-xl border border-slate-200 bg-white">
                  <div className="border-b border-slate-200 p-5">
                    <h3 className="font-semibold">
                      Notification Preferences
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Control how administrators and agents receive alerts.
                    </p>
                  </div>

                  <div className="divide-y divide-slate-100">
                    <div className="flex items-center justify-between gap-4 p-5">
                      <div>
                        <p className="text-sm font-medium">
                          Email Notifications
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Receive important system updates by email.
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          setEmailNotifications(!emailNotifications)
                        }
                        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                          emailNotifications
                            ? "bg-orange-500"
                            : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                            emailNotifications
                              ? "left-6"
                              : "left-1"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-4 p-5">
                      <div>
                        <p className="text-sm font-medium">
                          Ticket Notifications
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Get notified when ticket activity changes.
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          setTicketNotifications(!ticketNotifications)
                        }
                        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                          ticketNotifications
                            ? "bg-orange-500"
                            : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                            ticketNotifications
                              ? "left-6"
                              : "left-1"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-4 p-5">
                      <div>
                        <p className="text-sm font-medium">
                          Customer Replies
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Notify agents when customers reply to tickets.
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          setCustomerReplies(!customerReplies)
                        }
                        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                          customerReplies
                            ? "bg-orange-500"
                            : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                            customerReplies
                              ? "left-6"
                              : "left-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </section>

                <section className="rounded-xl border border-slate-200 bg-white">
                  <div className="border-b border-slate-200 p-5">
                    <h3 className="font-semibold">
                      Ticket Configuration
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Configure how support tickets are handled.
                    </p>
                  </div>

                  <div className="grid gap-5 p-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Default Priority
                      </label>

                      <select className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-orange-400">
                        <option>Medium</option>
                        <option>Low</option>
                        <option>High</option>
                        <option>Critical</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Default Status
                      </label>

                      <select className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-orange-400">
                        <option>OPEN</option>
                        <option>ASSIGNED</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4 sm:col-span-2">
                      <div>
                        <p className="text-sm font-medium">
                          Automatic Assignment
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Automatically assign new tickets to available agents.
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          setAutoAssignment(!autoAssignment)
                        }
                        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                          autoAssignment
                            ? "bg-orange-500"
                            : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                            autoAssignment
                              ? "left-6"
                              : "left-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </section>

                <section className="rounded-xl border border-slate-200 bg-white">
                  <div className="border-b border-slate-200 p-5">
                    <h3 className="font-semibold">
                      System Configuration
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Manage system-wide behavior.
                    </p>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 p-4">
                      <div>
                        <p className="text-sm font-medium">
                          Maintenance Mode
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Temporarily restrict access while performing system
                          maintenance.
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          setMaintenanceMode(!maintenanceMode)
                        }
                        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                          maintenanceMode
                            ? "bg-orange-500"
                            : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                            maintenanceMode
                              ? "left-6"
                              : "left-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </section>

                <div className="flex justify-end">
                  <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-600 sm:w-auto">
                    <Save size={17} />
                    Save Changes
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

export default AdminSettings;