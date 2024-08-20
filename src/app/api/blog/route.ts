import { Post } from "@/lib/models/post";
import { connectToDb } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (request: NextRequest) => {
   try {
      await connectToDb();
      const posts = await Post.find<Post>();
      return NextResponse.json(posts);
   } catch (error) {
      console.error(error);
      throw error;

   }
}