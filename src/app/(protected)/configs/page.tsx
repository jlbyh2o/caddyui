"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiEdit2, FiPlusCircle, FiTrash2, FiExternalLink } from "react-icons/fi";

type Creator = {
  id: string;
  name: string | null;
  email: string;
};

type CaddyConfig = {
  id: string;
  name: string;
  domain: string;
  targetUrl: string;
  path: string | null;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
  creatorId: string;
  creator: Creator;
};

export default function ConfigsList() {
  const [configs, setConfigs] = useState<CaddyConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/configs");
        
        if (!response.ok) {
          throw new Error("Failed to fetch configurations");
        }
        
        const data = await response.json();
        setConfigs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchConfigs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this configuration?")) {
      return;
    }

    try {
      const response = await fetch(`/api/configs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete configuration");
      }

      setConfigs(configs.filter(config => config.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const config = configs.find(c => c.id === id);
      if (!config) return;

      const response = await fetch(`/api/configs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...config,
          enabled: !currentStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update configuration");
      }

      setConfigs(
        configs.map(c => 
          c.id === id ? { ...c, enabled: !currentStatus } : c
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Reverse Proxies</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Manage your Caddy reverse proxy configurations</p>
        </div>
        <Link
          href="/configs/new"
          className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white px-4 py-2 rounded-md flex items-center shadow-md transition-colors duration-200"
        >
          <FiPlusCircle className="mr-2" />
          New Proxy
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 dark:border-indigo-400"></div>
        </div>
      ) : configs.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">No reverse proxy configurations found</p>
          <Link
            href="/configs/new"
            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white px-4 py-2 rounded-md inline-flex items-center"
          >
            <FiPlusCircle className="mr-2" />
            Create Your First Proxy
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Domain
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Target
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {configs.map((config) => (
                <tr key={config.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{config.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Created by {config.creator.name || config.creator.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{config.domain}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {config.path || "/"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white flex items-center">
                      {config.targetUrl}
                      <a 
                        href={config.targetUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-2 text-indigo-500 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                      >
                        <FiExternalLink />
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleStatus(config.id, config.enabled)}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        config.enabled
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 mr-1.5 rounded-full ${
                          config.enabled ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      {config.enabled ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/configs/${config.id}`}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <FiEdit2 />
                      </Link>
                      <button
                        onClick={() => handleDelete(config.id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 