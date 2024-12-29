import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { blogSchema } from "@/schemas/blog-schema";

export async function POST(request: Request) {
  try {
    const [data, session] = await Promise.all([request.json(), auth()]);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "You must be logged in to create a blog." },
        { status: 401 },
      );
    }

    const { title, content, description } = blogSchema.parse(data);
    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        description: description || "",
        authorId: session.user.id!,
      },
    });
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.log("Failed to create blog.", error);
    return NextResponse.json(
      { error: "Failed to create blog." },
      { status: 500 },
    );
  }
}
