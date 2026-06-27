import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/db/mongodb";
import User from "@/models/User";
import { registerSchema } from "@/validations/auth";

export async function POST(request: NextRequest) {
  try {
    // 1. Ambil data dari body
    const body = await request.json();

    // 2. Validasi input
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.error.issues[0].message,
        },
        {
          status: 400,
        }
      );
    }

    const { name, email, password } = result.data;

    // 3. Connect Database
    await connectDB();

    // 4. Cek email
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }

    // 5. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6. Simpan user
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 7. Success
    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}