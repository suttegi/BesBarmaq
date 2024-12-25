import { useState } from "react";
import Link from "next/link";
import { loginUser } from "../lib/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 

    try {
      const data = await loginUser(username, password);
      alert("Login successful");
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-8 text-yellow-500">login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 focus:outline-none focus:border-yellow-500 transition-colors"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 focus:outline-none focus:border-yellow-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-black font-bold py-2 rounded hover:bg-yellow-400 transition-colors"
          >
            login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          don't have an account?{" "}
          <Link href="/register" className="text-yellow-500 hover:text-yellow-400">
            register
          </Link>
        </p>
      </div>
    </div>
  );
}
