import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = (session.user as any).id;

    const applications = await prisma.jobApplication.findMany({
      where: { userId },
      include: {
        job: true
      },
      orderBy: { appliedAt: "desc" }
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Applications GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = (session.user as any).id;
    const { jobId, coverLetter, status } = await req.json();

    const application = await prisma.jobApplication.create({
      data: {
        userId,
        jobId,
        coverLetter,
        status: status || "APPLIED"
      }
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error("Application POST Error:", error);
    if ((error as any).code === "P2002") {
      return NextResponse.json({ error: "Already applied to this job" }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to apply to job" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id, coverLetter, status } = await req.json();

    const application = await prisma.jobApplication.update({
      where: { id },
      data: {
        coverLetter,
        status
      }
    });

    return NextResponse.json(application);
  } catch (error) {
    console.error("Application PUT Error:", error);
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.jobApplication.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Application deleted" });
  } catch (error) {
    console.error("Application DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete application" }, { status: 500 });
  }
}
