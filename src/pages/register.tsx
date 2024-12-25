import { useState } from "react";
import Link from "next/link";
import { registerUser } from "../lib/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const data = await registerUser(username, password); 
      alert("Registration successful");
      window.location.href = "/login"; 
    } catch (err: any) {
      setError(err.message); 
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-8 text-yellow-500">register</h1>
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
          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="confirm password"
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 focus:outline-none focus:border-yellow-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-black font-bold py-2 rounded hover:bg-yellow-400 transition-colors"
          >
            register
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          already have an account?{" "}
          <Link href="/login" className="text-yellow-500 hover:text-yellow-400">
            login
          </Link>
        </p>
      </div>
    </div>
  );
}
