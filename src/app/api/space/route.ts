<<<<<<< HEAD
import { getCurrentUser } from "@/lib/getCurrentUser";
import prisma from "@/lib/prisma";
=======
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession, User } from "next-auth";
>>>>>>> 0d0f5291b3f78378fdff1103382425c197029645
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
<<<<<<< HEAD
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
=======
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !user) {
      return NextResponse.json(
        { message: "Not Authenticated" },
        { status: 401 }
      );
    }

    const { title, description } = await req.json();

    const space = await prisma.space.create({
      data: { title: title, description: description, userId: user.id },
    });

    return NextResponse.json(space);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
>>>>>>> 0d0f5291b3f78378fdff1103382425c197029645
      { status: 500 }
    );
  }
}

<<<<<<< HEAD
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
=======
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;
    if (!session || !user) {
      return NextResponse.json(
        { message: "Not Authenticated" },
        { status: 401 }
      );
>>>>>>> 0d0f5291b3f78378fdff1103382425c197029645
    }
    const findSpace = await prisma.space.findMany({
      where: {
        userId: user.id,
      },
    });
    return NextResponse.json(findSpace);
  } catch (error) {
    return NextResponse.json(
<<<<<<< HEAD
      { message: "Internal Server Error:", error },
=======
      { message: "Internal Server Error" },
>>>>>>> 0d0f5291b3f78378fdff1103382425c197029645
      { status: 500 }
    );
  }
}
