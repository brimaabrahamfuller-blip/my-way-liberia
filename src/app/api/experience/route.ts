import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = (session.user as any).id;

    const experience = await prisma.experience.findMany({
      where: { userId },
      orderBy: { startDate: "desc" }
    });

    return NextResponse.json(experience);
  } catch (error) {
    console.error("Experience GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch experience" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = (session.user as any).id;
    const { jobTitle, company, location, startDate, endDate, isCurrent, description, resumeId } = await req.json();

    // Ensure resume exists
    let resume = await prisma.resume.findUnique({
      where: { userId }
    });

    if (!resume) {
      resume = await prisma.resume.create({
        data: { userId }
      });
    }

    const experience = await prisma.experience.create({
      data: {
        userId,
        resumeId: resumeId || resume.id,
        jobTitle,
        company,
        location,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        isCurrent,
        description
      }
    });

    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    console.error("Experience POST Error:", error);
    return NextResponse.json({ error: "Failed to add experience" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id, jobTitle, company, location, startDate, endDate, isCurrent, description } = await req.json();

    const experience = await prisma.experience.update({
      where: { id },
      data: {
        jobTitle,
        company,
        location,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        isCurrent,
        description
      }
    });

    return NextResponse.json(experience);
  } catch (error) {
    console.error("Experience PUT Error:", error);
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.experience.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Experience deleted" });
  } catch (error) {
    console.error("Experience DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 });
  }
}
