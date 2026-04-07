import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate password strength
function validatePassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters" };
  }
  return { valid: true };
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role } = await req.json();

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, and password" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.message },
        { status: 400 }
      );
    }

    // Validate role if provided
    const validRoles = ["STUDENT", "EMPLOYER", "COUNSELOR"];
    if (role && !validRoles.includes(role)) {
      return NextResponse.json(
        { error: "Invalid role. Must be STUDENT, EMPLOYER, or COUNSELOR" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "STUDENT",
      },
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    
    // Handle specific Prisma errors
    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase();
      
      if (errorMessage.includes("unique constraint failed") || errorMessage.includes("duplicate key")) {
        return NextResponse.json(
          { error: "Email already registered" },
          { status: 409 }
        );
      }
      
      if (errorMessage.includes("prismaClientInitializationError") || errorMessage.includes("connect econnrefused")) {
        console.error("Database connection error:", error);
        return NextResponse.json(
          { error: "Database connection failed. Please try again later." },
          { status: 503 }
        );
      }
      
      if (errorMessage.includes("prismaClientRustPanicError")) {
        console.error("Prisma runtime error:", error);
        return NextResponse.json(
          { error: "Database error. Please try again later." },
          { status: 503 }
        );
      }
    }
    
    console.error("Unexpected signup error:", error);
    return NextResponse.json(
      { error: "Failed to create user. Please try again later." },
      { status: 500 }
    );
  }
}
