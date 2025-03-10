"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiServer, FiShield, FiGlobe } from "react-icons/fi";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSetup, setIsCheckingSetup] = useState(true);

  useEffect(() => {
    // First, check if the user is already logged in
    if (session) {
      router.push("/dashboard");
      return;
    }

    // If not logged in, check if setup is required
    const checkSetupStatus = async () => {
      try {
        const response = await fetch("/api/setup/status");
        const data = await response.json();
        
        // If setup is required, redirect to setup page
        if (data.setupRequired) {
          router.push("/setup");
          return;
        }

        // Otherwise, show the login page
        setIsCheckingSetup(false);
      } catch (error) {
        console.error("Error checking setup status:", error);
        // If we can't check setup status, default to showing the login page
        setIsCheckingSetup(false);
      }
    };

    checkSetupStatus();
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    
    try {
      setIsLoading(true);
      setError("");
      
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      
      if (result?.error) {
        setError(result.error);
      }
    } catch (err) {
      setError("An error occurred during sign in");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading" || isCheckingSetup) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 dark:border-indigo-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <svg
                className="h-8 w-8 text-indigo-600 dark:text-indigo-400"
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
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Caddy UI</span>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                Manage Caddy with ease
              </h1>
              <p className="mt-6 text-xl text-gray-500 dark:text-gray-300">
                A beautiful web interface for managing your Caddy web server. Configure reverse proxies, SSL certificates, and more with just a few clicks.
              </p>
              
              <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
                <div className="pt-6">
                  <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8 shadow-md h-full">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 dark:bg-indigo-600 rounded-md shadow-lg">
                          <FiServer className="h-6 w-6 text-white" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">Easy Configuration</h3>
                      <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                        Configure reverse proxies with a simple, intuitive interface. No more editing config files manually.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6">
                  <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8 shadow-md h-full">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 dark:bg-indigo-600 rounded-md shadow-lg">
                          <FiShield className="h-6 w-6 text-white" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">Secure Access</h3>
                      <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                        User authentication ensures only authorized users can manage your Caddy server.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6">
                  <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8 shadow-md h-full">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 dark:bg-indigo-600 rounded-md shadow-lg">
                          <FiGlobe className="h-6 w-6 text-white" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">Modern Interface</h3>
                      <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                        Beautiful, responsive design that works on desktop and mobile devices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0 lg:col-span-6">
              <div className="bg-white dark:bg-gray-800 sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden shadow-lg">
                <div className="px-4 py-8 sm:px-10">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
                      Sign in to your account
                    </h2>
                  </div>

                  <div className="mt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {error && (
                        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded relative">
                          <span className="block sm:inline">{error}</span>
                        </div>
                      )}
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email address
                        </label>
                        <div className="mt-1">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Password
                        </label>
                        <div className="mt-1">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                        >
                          {isLoading ? "Signing in..." : "Sign in"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="px-4 py-6 bg-gray-50 dark:bg-gray-700 border-t-2 border-gray-200 dark:border-gray-600 sm:px-10">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    By signing in, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
