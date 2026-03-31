import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = (session.user as any).id;
    
    const resume = await prisma.resume.findUnique({
      where: { userId },
      include: {
        experience: { orderBy: { startDate: "desc" } },
        education: { orderBy: { startDate: "desc" } }
      }
    });

    return NextResponse.json(resume || {});
  } catch (error) {
    console.error("Resume GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch resume" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = (session.user as any).id;
    const { title, summary, skills, certifications, languages } = await req.json();

    const resume = await prisma.resume.upsert({
      where: { userId },
      create: {
        userId,
        title,
        summary,
        skills: skills || [],
        certifications: certifications || [],
        languages: languages || []
      },
      update: {
        title,
        summary,
        skills: skills || [],
        certifications: certifications || [],
        languages: languages || []
      }
    });

    return NextResponse.json(resume, { status: 201 });
  } catch (error) {
    console.error("Resume POST Error:", error);
    return NextResponse.json({ error: "Failed to save resume" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = (session.user as any).id;
    const { title, summary, skills, certifications, languages } = await req.json();

    const resume = await prisma.resume.update({
      where: { userId },
      data: {
        title,
        summary,
        skills: skills || [],
        certifications: certifications || [],
        languages: languages || []
      }
    });

    return NextResponse.json(resume);
  } catch (error) {
    console.error("Resume PUT Error:", error);
    return NextResponse.json({ error: "Failed to update resume" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = (session.user as any).id;

    await prisma.resume.delete({
      where: { userId }
    });

    return NextResponse.json({ message: "Resume deleted" });
  } catch (error) {
    console.error("Resume DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete resume" }, { status: 500 });
  }
}
