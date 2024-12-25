import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleQuit = async () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false); 
  };

  return (
    <header className="p-4 flex justify-between items-center bg-zinc-900">
      <Link href="/" className="text-2xl font-bold text-yellow-500">BesBarmaq</Link>
      <nav className="space-x-4">
        {isAuthenticated ? (
          <>
            <Link href="/profile" className="hover:text-yellow-500 transition-colors">
              Profile
            </Link>
            <button 
              onClick={handleQuit} 
              className="hover:text-yellow-500 transition-colors text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-yellow-500 transition-colors">
              Login
            </Link>
            <Link href="/register" className="hover:text-yellow-500 transition-colors">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
