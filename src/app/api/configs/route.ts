import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../lib/authOptions";

// GET all configs
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const configs = await prisma.caddyConfig.findMany({
      include: {
        creator: {
          select: {
            name: true,
            email: true,
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(configs);
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
      }
    );
  }
}

// POST new config
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const { name, domain, targetUrl, path, enabled } = await req.json();

    // Validate required fields
    if (!name || !domain || !targetUrl) {
      return new NextResponse(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
        }
      );
    }

    const config = await prisma.caddyConfig.create({
      data: {
        name,
        domain,
        targetUrl,
        path: path || null,
        enabled: enabled ?? true,
        creatorId: session.user.id,
      },
    });

    // Here we would also update the actual Caddy configuration
    // This would involve calling Caddy's API

    return NextResponse.json(config);
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
      }
    );
  }
}
