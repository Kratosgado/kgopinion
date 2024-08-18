import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    const { title, content } = await req.json();
    const post = await prisma.post.create({
        data: {
            title, content
        },
    });

    return new NextResponse(JSON.stringify(post), { status: 201 });
}

export const GET = async (req: NextRequest) => {
    const posts = await prisma.post.findMany();
    return new NextResponse(JSON.stringify(posts), { status: 200 });
}