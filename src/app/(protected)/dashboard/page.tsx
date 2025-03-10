"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiPlusCircle, FiServer, FiSettings, FiLink } from "react-icons/fi";

export default function Dashboard() {
  const [configCount, setConfigCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/configs");
        if (res.ok) {
          const data = await res.json();
          setConfigCount(data.length);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const dashboardCards = [
    {
      title: "Manage Proxies",
      description: "View and manage your reverse proxy configurations",
      icon: <FiServer className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />,
      link: "/configs",
      color: "bg-blue-50 dark:bg-blue-950",
      textColor: "text-gray-800 dark:text-gray-100",
      descriptionColor: "text-gray-600 dark:text-gray-300",
    },
    {
      title: "Add New Proxy",
      description: "Create a new reverse proxy configuration",
      icon: <FiPlusCircle className="h-8 w-8 text-green-500 dark:text-green-400" />,
      link: "/configs/new",
      color: "bg-green-50 dark:bg-green-950",
      textColor: "text-gray-800 dark:text-gray-100",
      descriptionColor: "text-gray-600 dark:text-gray-300",
    },
    {
      title: "Settings",
      description: "Configure Caddy UI and system settings",
      icon: <FiSettings className="h-8 w-8 text-purple-500 dark:text-purple-400" />,
      link: "/settings",
      color: "bg-purple-50 dark:bg-purple-950",
      textColor: "text-gray-800 dark:text-gray-100",
      descriptionColor: "text-gray-600 dark:text-gray-300",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Manage your Caddy reverse proxies</p>
      </div>

      {/* Stats Section */}
      <div className="mb-10 bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-800 dark:to-indigo-900 rounded-lg p-6 text-white shadow-lg">
        <h2 className="text-xl font-bold mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/20 dark:bg-indigo-950/40 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-white/10 dark:border-indigo-700/50">
            <div className="flex items-center">
              <FiLink className="h-6 w-6 mr-2 text-indigo-200" />
              <h3 className="text-lg font-semibold">Active Proxies</h3>
            </div>
            <p className="text-3xl font-bold mt-2">
              {loading ? (
                <span className="text-xl">Loading...</span>
              ) : (
                configCount
              )}
            </p>
          </div>
          <div className="bg-white/20 dark:bg-indigo-950/40 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-white/10 dark:border-indigo-700/50">
            <div className="flex items-center">
              <FiServer className="h-6 w-6 mr-2 text-indigo-200" />
              <h3 className="text-lg font-semibold">Caddy Status</h3>
            </div>
            <p className="text-xl font-semibold mt-2">
              <span className="inline-block w-3 h-3 bg-green-400 dark:bg-green-300 rounded-full mr-2"></span>
              Running
            </p>
          </div>
          <div className="bg-white/20 dark:bg-indigo-950/40 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-white/10 dark:border-indigo-700/50">
            <div className="flex items-center">
              <FiSettings className="h-6 w-6 mr-2 text-indigo-200" />
              <h3 className="text-lg font-semibold">Quick Actions</h3>
            </div>
            <div className="mt-2">
              <Link 
                href="/configs/new" 
                className="text-sm bg-white dark:bg-indigo-200 text-indigo-700 dark:text-indigo-900 px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors duration-200 inline-block font-medium shadow-sm"
              >
                Add New Proxy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dashboardCards.map((card, index) => (
          <Link href={card.link} key={index}>
            <div className={`rounded-lg shadow-md p-6 transition-all duration-200 hover:shadow-lg ${card.color} border border-gray-200 dark:border-gray-700 h-full`}>
              <div className="flex items-center justify-center mb-4">
                {card.icon}
              </div>
              <h3 className={`text-xl font-bold text-center ${card.textColor} mb-2`}>
                {card.title}
              </h3>
              <p className={`${card.descriptionColor} text-center`}>{card.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 