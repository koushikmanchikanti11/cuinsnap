import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const snaps = await prisma.snap.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        imageUrl: true,
        tag: true,
        comment: true,
        createdAt: true,
      },
    });
    return Response.json(snaps);
  } catch (error) {
    console.error("GET /api/snaps error:", error);
    return Response.json(
      { error: "Failed to fetch snaps" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageUrl, tag, comment } = body;

    if (!imageUrl) {
      return Response.json(
        { error: "imageUrl is required" },
        { status: 400 }
      );
    }

    const snap = await prisma.snap.create({
      data: {
        imageUrl,
        tag: tag?.trim() || null,
        comment: comment?.trim() || null,
      },
    });

    return Response.json(snap, { status: 201 });
  } catch (error) {
    console.error("POST /api/snaps error:", error);
    return Response.json(
      { error: "Failed to create snap" },
      { status: 500 }
    );
  }
}
