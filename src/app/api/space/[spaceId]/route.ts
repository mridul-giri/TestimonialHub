import { getCurrentUser } from "@/lib/getCurrentUser";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ spaceId: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { spaceId } = await params;
    const space = await prisma.space.findFirst({
      where: {
        id: spaceId,
        userId: user.id,
      },
      include: {
        testimonial: true,
      },
    });
    if (!space) {
      return NextResponse.json(
        { message: "Space not found or access denied" },
        { status: 404 }
      );
    }
    return NextResponse.json(space);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ spaceId: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { spaceName, title, description, image, isActive } = await req.json();
    const { spaceId } = await params;
    const updatedSpace = await prisma.space.update({
      where: {
        id: spaceId,
        userId: user.id,
      },
      data: {
        spaceName,
        title,
        description,
        image,
        isActive,
      },
    });
    return NextResponse.json(updatedSpace);
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { message: "Space not found or access denied" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ spaceId: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { spaceId } = await params;
    const spaceDeleted = await prisma.space.delete({
      where: {
        id: spaceId,
        userId: user.id,
      },
    });
    return NextResponse.json(spaceDeleted);
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { message: "Space not found or access denied" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
