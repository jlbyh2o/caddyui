import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // First, check if setup is required
    const userCount = await prisma.user.count();
    
    // If there are already users, deny the setup request
    if (userCount > 0) {
      return NextResponse.json(
        { error: "Setup already completed. Cannot create initial admin." },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { name, email, password } = body;

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Password strength validation
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the admin user
    const admin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isAdmin: true,
      },
    });

    // Create a sample config to get started
    await prisma.caddyConfig.create({
      data: {
        id: "sample-config",
        name: "Example Website",
        domain: "example.com",
        targetUrl: "http://localhost:3000",
        enabled: true,
        creatorId: admin.id,
      },
    });

    return NextResponse.json({ 
      success: true,
      message: "Setup completed successfully. You can now log in with your credentials."
    });
  } catch (error) {
    console.error("Error completing setup:", error);
    
    // Check for unique constraint violation (email already exists)
    if ((error as any)?.code === "P2002") {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to complete setup" },
      { status: 500 }
    );
  }
} 