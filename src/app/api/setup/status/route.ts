import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Count the number of users in the database
    const userCount = await prisma.user.count();
    
    // If there are no users, setup is required
    const setupRequired = userCount === 0;
    
    return NextResponse.json({ 
      setupRequired,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error checking setup status:", error);
    return NextResponse.json(
      { error: "Failed to check setup status" },
      { status: 500 }
    );
  }
} 