import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
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
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;
    if (!session || !user) {
      return NextResponse.json(
        { message: "Not Authenticated" },
        { status: 401 }
      );
    }
    const findSpace = await prisma.space.findMany({
      where: {
        userId: user.id,
      },
    });
    return NextResponse.json(findSpace);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
