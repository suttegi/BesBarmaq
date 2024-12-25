import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col">
      <Header />
      <main className="flex-1">
        <Component {...pageProps} />
      </main>
    </div>
  );
}