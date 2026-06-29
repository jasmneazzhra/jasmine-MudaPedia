import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { ZodError } from "zod";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { portfolioSchema } from "@/validations/portfolio.validation";
import { createPortfolio, getPortfoliosByUser } from "@/services/portfolio.service";

function formatZodError(error: ZodError): string {
  return error.issues.map((issue) => issue.message).join(", ");
}

export async function POST(request: NextRequest) {
  try {
    const session = (await getServerSession(authOptions)) as Session | null;
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const validatedData = portfolioSchema.parse(body);

    const portfolio = await createPortfolio({
      userId: session.user.id,
      ...validatedData,
    });

    return NextResponse.json(
      { success: true, message: "Portfolio created successfully", data: portfolio },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, message: formatZodError(error) },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = (await getServerSession(authOptions)) as Session | null;
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const portfolios = await getPortfoliosByUser(session.user.id);

    return NextResponse.json({ success: true, data: portfolios });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to fetch" },
      { status: 500 }
    );
  }
}