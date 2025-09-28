import { prisma } from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

// GET single config
export async function GET(
  req: NextRequest,
  ctx: RouteContext<'/configs/[id]'>
//  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { 
        status: 401 
      });
    }
    
    const { id } = await ctx.params
    
    const config = await prisma.caddyConfig.findUnique({
      where: {
        id: id
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    
    if (!config) {
      return new NextResponse(JSON.stringify({ error: "Config not found" }), { 
        status: 404 
      });
    }
    
    return NextResponse.json(config);
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { 
      status: 500 
    });
  }
}

// PUT/UPDATE config
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { 
        status: 401 
      });
    }
    
    const { name, domain, targetUrl, path, enabled } = await req.json();
    
    // Validate required fields
    if (!name || !domain || !targetUrl) {
      return new NextResponse(JSON.stringify({ error: "Missing required fields" }), { 
        status: 400 
      });
    }
    
    // Extract id from params to fix the "params should be awaited before using its properties" error
    const id = params.id;
    
    // Check if the config exists
    const existingConfig = await prisma.caddyConfig.findUnique({
      where: {
        id
      }
    });
    
    if (!existingConfig) {
      return new NextResponse(JSON.stringify({ error: "Config not found" }), { 
        status: 404 
      });
    }
    
    // Only allow admins or the creator to update
    if (existingConfig.creatorId !== session.user.id && !session.user.isAdmin) {
      return new NextResponse(JSON.stringify({ error: "Forbidden" }), { 
        status: 403 
      });
    }
    
    const updatedConfig = await prisma.caddyConfig.update({
      where: {
        id
      },
      data: {
        name,
        domain,
        targetUrl,
        path: path || null,
        enabled: enabled ?? true
      }
    });
    
    // Here we would also update the actual Caddy configuration
    // This would involve calling Caddy's API
    
    return NextResponse.json(updatedConfig);
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { 
      status: 500 
    });
  }
}

// DELETE config
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { 
        status: 401 
      });
    }
    
    // Extract id from params to fix the "params should be awaited before using its properties" error
    const id = params.id;
    
    // Check if the config exists
    const existingConfig = await prisma.caddyConfig.findUnique({
      where: {
        id
      }
    });
    
    if (!existingConfig) {
      return new NextResponse(JSON.stringify({ error: "Config not found" }), { 
        status: 404 
      });
    }
    
    // Only allow admins or the creator to delete
    if (existingConfig.creatorId !== session.user.id && !session.user.isAdmin) {
      return new NextResponse(JSON.stringify({ error: "Forbidden" }), { 
        status: 403 
      });
    }
    
    await prisma.caddyConfig.delete({
      where: {
        id
      }
    });
    
    // Here we would also update the actual Caddy configuration
    // This would involve calling Caddy's API
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { 
      status: 500
    });
  }
} 
