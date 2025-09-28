"use client";

import { useState, useEffect } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import { useSession } from "next-auth/react";
import { FiServer, FiSliders, FiUser, FiSave, FiRefreshCw, FiTrash2 } from "react-icons/fi";
import PasswordChangeForm from "../../../components/PasswordChangeForm";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { data: session } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Server connection settings
  const [caddyAdminUrl, setCaddyAdminUrl] = useState("http://localhost:2019");
  const [caddyTestSuccess, setCaddyTestSuccess] = useState<boolean | null>(null);
  const [caddyTestLoading, setCaddyTestLoading] = useState(false);

  // User preferences
  const [defaultDomain, setDefaultDomain] = useState("");
  const [confirmDeletion, setConfirmDeletion] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(30);

  useEffect(() => {
    // Check if user is admin
    setIsAdmin(session?.user?.isAdmin || false);

    // Load saved settings from localStorage
    const loadSettings = () => {
      const savedSettings = localStorage.getItem("caddyui_settings");
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setCaddyAdminUrl(settings.caddyAdminUrl || "http://localhost:2019");
        setDefaultDomain(settings.defaultDomain || "");
        setConfirmDeletion(settings.confirmDeletion !== false);
        setAutoRefresh(settings.autoRefresh || false);
        setRefreshInterval(settings.refreshInterval || 30);
      }
    };

    loadSettings();
  }, [session]);

  const saveSettings = () => {
    setIsSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Save settings to localStorage
      const settings = {
        caddyAdminUrl,
        defaultDomain,
        confirmDeletion,
        autoRefresh,
        refreshInterval,
        theme
      };

      localStorage.setItem("caddyui_settings", JSON.stringify(settings));
      
      setSuccessMessage("Settings saved successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage("Failed to save settings");
      console.error("Error saving settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const testCaddyConnection = async () => {
    setCaddyTestLoading(true);
    setCaddyTestSuccess(null);
    
    try {
      // In a real implementation, this would make an actual request to the Caddy server
      // For demo purposes, we'll just simulate a request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate success if URL looks valid
      if (caddyAdminUrl.startsWith('http') && caddyAdminUrl.includes('localhost')) {
        setCaddyTestSuccess(true);
      } else {
        setCaddyTestSuccess(false);
      }
    } catch (error) {
      setCaddyTestSuccess(false);
      console.error("Error testing Caddy connection:", error);
    } finally {
      setCaddyTestLoading(false);
    }
  };

  const resetSettings = () => {
    if (window.confirm("Are you sure you want to reset all settings to default values?")) {
      setCaddyAdminUrl("http://localhost:2019");
      setDefaultDomain("");
      setConfirmDeletion(true);
      setAutoRefresh(false);
      setRefreshInterval(30);
      localStorage.removeItem("caddyui_settings");
      setSuccessMessage("Settings reset to defaults");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Settings</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Configure your Caddy UI preferences and server connections
        </p>
      </div>

      {errorMessage && (
        <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg mb-6">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 dark:bg-green-900/50 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-200 px-4 py-3 rounded-lg mb-6">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-3">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <FiServer className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mr-2" />
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Server Connection</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="caddyAdminUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Caddy Admin API URL
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    id="caddyAdminUrl"
                    value={caddyAdminUrl}
                    onChange={(e) => setCaddyAdminUrl(e.target.value)}
                    className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 sm:text-sm"
                    placeholder="http://localhost:2019"
                  />
                  <button
                    onClick={testCaddyConnection}
                    disabled={caddyTestLoading}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors whitespace-nowrap"
                  >
                    {caddyTestLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Testing...
                      </span>
                    ) : (
                      "Test Connection"
                    )}
                  </button>
                </div>
                {caddyTestSuccess === true && (
                  <p className="mt-2 text-sm text-green-600 dark:text-green-400">Connection successful</p>
                )}
                {caddyTestSuccess === false && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">Connection failed. Please check the URL and ensure Caddy is running.</p>
                )}
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  The Caddy Admin API is usually available at http://localhost:2019 by default
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <FiSliders className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mr-2" />
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Appearance & Behavior</h2>
            </div>
            <div className="space-y-4">
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</span>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className="sr-only">Toggle theme</span>
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="defaultDomain" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Default Domain
                </label>
                <input
                  type="text"
                  id="defaultDomain"
                  value={defaultDomain}
                  onChange={(e) => setDefaultDomain(e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 sm:text-sm"
                  placeholder="example.com"
                />
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  This domain will be pre-filled when creating new proxy configurations
                </p>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="confirmDeletion"
                    type="checkbox"
                    checked={confirmDeletion}
                    onChange={(e) => setConfirmDeletion(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 dark:text-indigo-400 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="confirmDeletion" className="font-medium text-gray-700 dark:text-gray-300">
                    Confirm before deleting configurations
                  </label>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="autoRefresh"
                    type="checkbox"
                    checked={autoRefresh}
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 dark:text-indigo-400 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="autoRefresh" className="font-medium text-gray-700 dark:text-gray-300">
                    Auto-refresh configurations list
                  </label>
                </div>
              </div>

              {autoRefresh && (
                <div>
                  <label htmlFor="refreshInterval" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Refresh interval (seconds)
                  </label>
                  <input
                    type="number"
                    id="refreshInterval"
                    min="5"
                    max="300"
                    value={refreshInterval}
                    onChange={(e) => setRefreshInterval(parseInt(e.target.value))}
                    className="block w-24 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 sm:text-sm"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <FiUser className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mr-2" />
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">User Profile</h2>
            </div>
            <div className="mb-6">
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-100 dark:bg-indigo-900/50 rounded-full p-3">
                  <FiUser className="h-8 w-8 text-indigo-600 dark:text-indigo-300" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                    {session?.user?.name || "User"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {session?.user?.email || "email@example.com"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {session?.user?.isAdmin ? "Administrator" : "Standard User"}
                  </p>
                </div>
              </div>
            </div>
            
            <PasswordChangeForm />
          </div>
        </div>

        {isAdmin && (
          <div className="md:col-span-3">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <FiUser className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mr-2" />
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Admin Settings</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  You have administrator privileges. Additional settings would be shown here.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button
          onClick={resetSettings}
          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors duration-200"
        >
          <FiRefreshCw className="mr-2 -ml-1 h-4 w-4" />
          Reset to Defaults
        </button>
        <button
          onClick={saveSettings}
          disabled={isSaving}
          className={`inline-flex items-center px-5 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors duration-200 ${
            isSaving ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isSaving ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : (
            <>
              <FiSave className="mr-2 -ml-1 h-4 w-4" />
              Save Settings
            </>
          )}
        </button>
      </div>
    </div>
  );
} 
