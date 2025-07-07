import { getCurrentUser } from "@/lib/getCurrentUser";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { spaceName, image, title, description } = await req.json();
    const space = await prisma.space.create({
      data: { spaceName, image, title, description, userId: user.id },
    });
    return NextResponse.json(space);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const findSpace = await prisma.space.findMany({
      where: {
        userId: user.id,
      },
    });
    if (findSpace.length == 0) {
      return NextResponse.json(
        { message: "Space not found or access denied" },
        { status: 404 }
      );
    }
    return NextResponse.json(findSpace);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error:", error },
      { status: 500 }
    );
  }
}
