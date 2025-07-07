import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { name, email, content, rating, imageUrl } = await req.json();
    const { slug } = await params;
    const spaceId = slug;
    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        email,
        content,
        rating,
        imageUrl,
        spaceId,
      },
    });
    return NextResponse.json(testimonial);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      {
        status: 500,
      }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { slug } = await params;
    const spaceId = slug;
    const allTestimonial = await prisma.testimonial.findMany({
      where: {
        spaceId,
        space: {
          userId: user.id,
        },
      },
    });
    if (allTestimonial.length == 0) {
      return NextResponse.json(
        { message: "Testimonial not found or access denied" },
        { status: 404 }
      );
    }
    return NextResponse.json(allTestimonial);
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
    const testimonialId = slug;
    const { name, email, imageUrl, isApproved } = await req.json();
    const updatedTestimonial = await prisma.testimonial.update({
      where: {
        id: testimonialId,
        space: {
          userId: user.id,
        },
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
    const testimonialId = slug;
    const deleteTestimonial = await prisma.testimonial.delete({
      where: {
        id: testimonialId,
        space: {
          userId: user.id,
        },
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
