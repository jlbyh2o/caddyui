"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/configs", label: "Reverse Proxies" },
    { href: "/settings", label: "Settings" },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-indigo-900 dark:to-indigo-950 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href={session ? "/dashboard" : "/"}
              className="flex items-center text-white font-bold text-xl"
            >
              <svg
                className="h-8 w-8 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              Caddy UI
            </Link>
            {session && (
              <div className="hidden md:block ml-10">
                <div className="flex space-x-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`${
                        pathname === link.href
                          ? "bg-indigo-800 dark:bg-indigo-950 text-white"
                          : "text-white hover:bg-indigo-500 dark:hover:bg-indigo-800"
                      } px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <ThemeToggle />

              {session ? (
                <div className="flex items-center gap-4">
                  <span className="text-white">{session.user?.name || session.user?.email}</span>
                  <button
                    onClick={() => signOut()}
                    className="bg-indigo-800 hover:bg-indigo-900 dark:bg-indigo-950 dark:hover:bg-indigo-900 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <Link
                  href="/api/auth/signin"
                  className="bg-indigo-800 hover:bg-indigo-900 dark:bg-indigo-950 dark:hover:bg-indigo-900 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="text-white p-2 rounded-md hover:bg-indigo-600 dark:hover:bg-indigo-800 focus:outline-none"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-700 dark:bg-indigo-900">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {session &&
              navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${
                    pathname === link.href
                      ? "bg-indigo-800 dark:bg-indigo-950 text-white"
                      : "text-white hover:bg-indigo-600 dark:hover:bg-indigo-800"
                  } block px-3 py-2 rounded-md text-base font-medium`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            {session ? (
              <button
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-600 dark:hover:bg-indigo-800"
              >
                Sign out
              </button>
            ) : (
              <Link
                href="/api/auth/signin"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-600 dark:hover:bg-indigo-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
} 