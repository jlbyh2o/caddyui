"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { FiSave, FiX } from "react-icons/fi";

const proxySchema = z.object({
  name: z.string().min(1, "Name is required"),
  domain: z.string().min(1, "Domain is required"),
  targetUrl: z.string().min(1, "Target URL is required").url("Must be a valid URL"),
  path: z.string().optional(),
  enabled: z.boolean().default(true),
});

type ProxyFormData = z.infer<typeof proxySchema>;

interface ProxyFormProps {
  initialData?: ProxyFormData & { id?: string };
  isEditing?: boolean;
}

export default function ProxyForm({ initialData, isEditing = false }: ProxyFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProxyFormData>({
    resolver: zodResolver(proxySchema),
    defaultValues: initialData || {
      name: "",
      domain: "",
      targetUrl: "",
      path: "",
      enabled: true,
    },
  });

  const onSubmit = async (data: ProxyFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      const url = isEditing && initialData?.id 
        ? `/api/configs/${initialData.id}` 
        : "/api/configs";
      
      const method = isEditing ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save configuration");
      }
      
      router.push("/configs");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 border border-gray-200 dark:border-gray-700">
      {error && (
        <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg relative mb-6">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-8 mb-8">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Name
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              id="name"
              type="text"
              {...register("name")}
              className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 sm:text-sm"
              placeholder="My App Proxy"
            />
          </div>
          {errors.name && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="domain" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Domain
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              id="domain"
              type="text"
              {...register("domain")}
              className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 sm:text-sm"
              placeholder="example.com"
            />
          </div>
          {errors.domain && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.domain.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="targetUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Target URL
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              id="targetUrl"
              type="text"
              {...register("targetUrl")}
              className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 sm:text-sm"
              placeholder="http://localhost:3000"
            />
          </div>
          {errors.targetUrl && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.targetUrl.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="path" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Path (optional)
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              id="path"
              type="text"
              {...register("path")}
              className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 sm:text-sm"
              placeholder="/api"
            />
          </div>
          {errors.path && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.path.message}</p>
          )}
        </div>
        
        <div className="flex items-center">
          <div className="flex items-center h-5">
            <input
              id="enabled"
              type="checkbox"
              {...register("enabled")}
              className="h-5 w-5 text-indigo-600 dark:text-indigo-400 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
          </div>
          <label htmlFor="enabled" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Enable this configuration
          </label>
          {errors.enabled && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.enabled.message}</p>
          )}
        </div>
      </div>
      
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors duration-200"
        >
          <FiX className="mr-2 -ml-1 h-4 w-4" />
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-5 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors duration-200"
        >
          <FiSave className="mr-2 -ml-1 h-4 w-4" />
          {isSubmitting ? "Saving..." : isEditing ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
} 