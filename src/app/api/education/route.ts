import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = (session.user as any).id;

    const education = await prisma.education.findMany({
      where: { userId },
      orderBy: { startDate: "desc" }
    });

    return NextResponse.json(education);
  } catch (error) {
    console.error("Education GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch education" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = (session.user as any).id;
    const { institution, degree, fieldOfStudy, startDate, endDate, grade, description, resumeId } = await req.json();

    // Ensure resume exists
    let resume = await prisma.resume.findUnique({
      where: { userId }
    });

    if (!resume) {
      resume = await prisma.resume.create({
        data: { userId }
      });
    }

    const education = await prisma.education.create({
      data: {
        userId,
        resumeId: resumeId || resume.id,
        institution,
        degree,
        fieldOfStudy,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        grade,
        description
      }
    });

    return NextResponse.json(education, { status: 201 });
  } catch (error) {
    console.error("Education POST Error:", error);
    return NextResponse.json({ error: "Failed to add education" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id, institution, degree, fieldOfStudy, startDate, endDate, grade, description } = await req.json();

    const education = await prisma.education.update({
      where: { id },
      data: {
        institution,
        degree,
        fieldOfStudy,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        grade,
        description
      }
    });

    return NextResponse.json(education);
  } catch (error) {
    console.error("Education PUT Error:", error);
    return NextResponse.json({ error: "Failed to update education" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.education.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Education deleted" });
  } catch (error) {
    console.error("Education DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete education" }, { status: 500 });
  }
}
