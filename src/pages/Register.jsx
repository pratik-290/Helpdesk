import { useState } from "react";
import { Eye, EyeOff, Headphones } from "lucide-react";
import { Link } from "react-router-dom";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        <div className="hidden lg:flex bg-slate-900 text-white p-10 xl:p-14 flex-col justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
                <Headphones size={22} />
              </div>

              <span className="text-xl font-semibold">
                HelpDesk Pro
              </span>
            </div>

            <div className="mt-20">
              <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
                Get your support
                <br />
                workspace ready.
              </h1>

              <p className="mt-6 text-slate-400 max-w-md leading-7">
                Create your account and start managing customer requests,
                support tickets, and conversations in one place.
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-500">
            © 2026 HelpDesk Pro
          </p>
        </div>

        <div className="p-6 sm:p-10 lg:p-12 xl:p-14">
          <div className="flex lg:hidden items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-lg bg-orange-500 text-white flex items-center justify-center">
              <Headphones size={22} />
            </div>

            <span className="text-xl font-semibold text-slate-900">
              HelpDesk Pro
            </span>
          </div>

          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900">
                Create account
              </h2>

              <p className="mt-2 text-slate-500">
                Join HelpDesk Pro and start managing support requests.
              </p>
            </div>

            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full h-12 px-4 rounded-lg border border-slate-300 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email address
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full h-12 px-4 rounded-lg border border-slate-300 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="w-full h-12 px-4 pr-12 rounded-lg border border-slate-300 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Confirm password
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="w-full h-12 px-4 pr-12 rounded-lg border border-slate-300 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 mt-0.5 accent-orange-500"
                />

                <label
                  htmlFor="terms"
                  className="text-sm text-slate-600 leading-5"
                >
                  I agree to the terms and conditions.
                </label>
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-lg bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold transition"
              >
                Create account
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-8">
              Already have an account?
              <Link
                to="/login"
                className="ml-1 font-semibold text-orange-600 hover:text-orange-700"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;