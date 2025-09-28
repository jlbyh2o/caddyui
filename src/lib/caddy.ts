import axios from "axios";

// Default to localhost admin API, but allow override through env vars
const CADDY_ADMIN_URL = process.env.CADDY_ADMIN_URL || "http://localhost:2019";

/**
 * Get the current Caddy configuration
 */
export async function getCaddyConfig() {
  try {
    const response = await axios.get(`${CADDY_ADMIN_URL}/config/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Caddy config:", error);
    throw new Error("Failed to fetch Caddy configuration");
  }
}

/**
 * Update a specific path in the Caddy configuration
 */
export async function updateCaddyConfig(path: string, config: object) {
  try {
    const response = await axios.patch(`${CADDY_ADMIN_URL}/${path}`, config);
    return response.data;
  } catch (error) {
    console.error("Error updating Caddy config:", error);
    throw new Error("Failed to update Caddy configuration");
  }
}

/**
 * Replace the entire Caddy configuration
 */
export async function replaceCaddyConfig(config: object) {
  try {
    const response = await axios.post(`${CADDY_ADMIN_URL}/load`, config);
    return response.data;
  } catch (error) {
    console.error("Error replacing Caddy config:", error);
    throw new Error("Failed to replace Caddy configuration");
  }
}

/**
 * Add a reverse proxy route to Caddy
 */
export async function addReverseProxy(
  domain: string,
  targetUrl: string,
  path?: string
) {
  try {
    // Build the route matcher
    const routeMatcher = path ? `${domain}${path}*` : domain;

    // Build the reverse proxy configuration
    const routeConfig = {
      handle: [
        {
          handler: "reverse_proxy",
          upstreams: [{ dial: targetUrl }],
        },
      ],
    };

    // Add the route to Caddy
    const response = await axios.put(
      `${CADDY_ADMIN_URL}/config/apps/http/servers/srv0/routes/${routeMatcher}`,
      routeConfig
    );

    return response.data;
  } catch (error) {
    console.error("Error adding reverse proxy:", error);
    throw new Error("Failed to add reverse proxy to Caddy");
  }
}

/**
 * Remove a reverse proxy route from Caddy
 */
export async function removeReverseProxy(domain: string, path?: string) {
  try {
    // Build the route matcher
    const routeMatcher = path ? `${domain}${path}*` : domain;

    // Remove the route from Caddy
    const response = await axios.delete(
      `${CADDY_ADMIN_URL}/config/apps/http/servers/srv0/routes/${routeMatcher}`
    );

    return response.data;
  } catch (error) {
    console.error("Error removing reverse proxy:", error);
    throw new Error("Failed to remove reverse proxy from Caddy");
  }
}
