import { NextResponse } from "next/server";
import { connectDB } from "@/db/mongodb";

export async function GET() {
  try {
    await connectDB();

    return NextResponse.json({  
      success: true,
      message: "MongoDB Connected Successfully",
    });
  } catch (error) {
  console.error("MongoDB Error:", error);

  return NextResponse.json(
    {
      success: false,
      message: "Failed to connect to MongoDB",
    },
    {
      status: 500,
    }
  );
}
}