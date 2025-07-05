import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { name, email, content, rating, imageUrl } = await req.json();
    const { slug } = await params;
    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        email,
        content,
        rating,
        imageUrl,
        spaceId: slug,
      },
    });
    return NextResponse.json(testimonial);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { slug } = await params;
    const { name, email, imageUrl, isApproved } = await req.json();
    const updatedTestimonial = await prisma.testimonial.update({
      where: {
        id: slug,
      },
      data: {
        name,
        email,
        imageUrl,
        isApproved,
      },
    });
    return NextResponse.json(updatedTestimonial);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { slug } = await params;
    const deleteTestimonial = await prisma.testimonial.delete({
      where: {
        id: slug,
      },
    });
    return NextResponse.json(deleteTestimonial);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      {
        status: 500,
      }
    );
  }
}
