import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { ZodError } from "zod";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";
import { portfolioSchema } from "@/validations/portfolio.validation";

type Params = { params: Promise<{ id: string }> };

function formatZodError(error: ZodError): string {
  return error.issues.map((e) => e.message).join(", ");
}

export async function GET(_: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    await connectDB();
    const portfolio = await Portfolio.findById(id);
    if (!portfolio) {
      return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: portfolio });
  } catch {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const validatedData = portfolioSchema.parse(body);

    const slug = validatedData.title.toLowerCase().trim().replace(/\s+/g, "-");

    const portfolio = await Portfolio.findByIdAndUpdate(
      id,
      { ...validatedData, slug },
      { new: true }
    );

    if (!portfolio) {
      return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Portfolio updated", data: portfolio });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, message: formatZodError(error) },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    await Portfolio.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Portfolio deleted" });
  } catch {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}