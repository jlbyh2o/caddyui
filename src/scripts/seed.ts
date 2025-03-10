/**
 * DEPRECATED: This seed script is no longer used in the application.
 * 
 * We've replaced it with a setup page that allows users to create their
 * own admin account on first run. This provides a better security model
 * and user experience.
 * 
 * This file is kept for reference purposes only.
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  try {
    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 10);
    
    const admin = await prisma.user.upsert({
      where: { email: "admin@example.com" },
      update: {},
      create: {
        email: "admin@example.com",
        name: "Admin User",
        password: adminPassword,
        isAdmin: true,
      },
    });
    
    console.log("Admin user created:", admin.email);
    
    // Create a sample config
    const sampleConfig = await prisma.caddyConfig.upsert({
      where: { id: "sample-config" },
      update: {},
      create: {
        id: "sample-config",
        name: "Example Website",
        domain: "example.com",
        targetUrl: "http://localhost:3000",
        enabled: true,
        creatorId: admin.id,
      },
    });
    
    console.log("Sample config created:", sampleConfig.name);
    
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 