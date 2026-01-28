"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../services/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<null | string>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await authService.signIn(email, password);
      sessionStorage.setItem("authToken", data.user.id!);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen p-4 sm:p-10 flex justify-center items-center">
      <div className="p-8 sm:p-12 w-full max-w-md bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-3xl">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent mb-2">
          Login
        </h1>

        <form className="flex flex-col gap-6 pt-5" onSubmit={handleSubmit}>
          <div className="relative">
            <label
              htmlFor="email"
              className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                focusedField === "email" || email
                  ? "-top-2.5 text-xs bg-white px-2 text-blue-600 font-medium"
                  : "top-4 text-zinc-400"
              }`}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              className="w-full px-4 py-4 border-2 border-zinc-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-200 bg-white/50"
              required
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                focusedField === "password" || password
                  ? "-top-2.5 text-xs bg-white px-2 text-blue-600 font-medium"
                  : "top-4 text-zinc-400"
              }`}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              className="w-full px-4 py-4 border-2 border-zinc-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-200 bg-white/50"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm -mt-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 font-semibold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 mt-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
