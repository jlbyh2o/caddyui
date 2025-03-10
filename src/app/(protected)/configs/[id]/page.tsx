"use client";

import ProxyForm from "@/components/ProxyForm";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function EditConfig() {
  const params = useParams();
  const router = useRouter();
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/configs/${params.id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            router.push("/configs");
            return;
          }
          throw new Error("Failed to fetch configuration");
        }
        
        const data = await response.json();
        setConfig(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchConfig();
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4"
        >
          <FiArrowLeft className="mr-1" /> Back to list
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Edit Reverse Proxy</h1>
        <p className="text-gray-600 mt-2">Update your Caddy reverse proxy configuration</p>
      </div>
      {config && <ProxyForm initialData={config} isEditing={true} />}
    </div>
  );
} 