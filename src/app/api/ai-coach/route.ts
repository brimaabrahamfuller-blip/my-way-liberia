import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { askCareerCoach } from "@/lib/claude";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { message, persona, history } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const allowedPersonas = ["Leader", "Analyst", "Creative", "Supporter", "Explorer"];
    const selectedPersona = allowedPersonas.includes(persona) ? persona : "Explorer";

    const sanitizedHistory = Array.isArray(history) ? history : [];
    const responseText = await askCareerCoach(message, selectedPersona, sanitizedHistory);

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error("AI Coach API Error:", error);
    return NextResponse.json({ error: "Failed to generate AI response" }, { status: 500 });
  }
}
