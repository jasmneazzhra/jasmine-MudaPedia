import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { portfolioSchema } from "@/validations/portfolio.validation";
import { createPortfolio } from "@/services/portfolio.service";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const validatedData =
      portfolioSchema.parse(body);

    const portfolio =
      await createPortfolio({
        userId: body.userId,
        ...validatedData,
      });

    return NextResponse.json(
      {
        success: true,
        message: "Portfolio created successfully",
        data: portfolio,
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
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}