"use client";

import ProxyForm from "@/components/ProxyForm";

export default function NewConfig() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Add New Reverse Proxy</h1>
        <p className="text-gray-600 mt-2">Create a new Caddy reverse proxy configuration</p>
      </div>
      <ProxyForm />
    </div>
  );
} 