import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { bio, location, skills } = await req.json();
    
    const updatedProfile = await prisma.profile.update({
      where: { userId: (session.user as any).id },
      data: {
        bio,
        location,
        skills
      }
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error("Profile Update Error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}