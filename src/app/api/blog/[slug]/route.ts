import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "../../../../lib/utils";
import { Post } from "../../../../lib/models/post";

export const GET = async (request: NextRequest, { params }: { params: any }) => {
   const { slug } = params;
   try {
      connectToDb();
      const post = await Post.findOne({ slug });
      return NextResponse.json(post);
   } catch (error) {
      console.error(error);
      throw Error("Error fetching post");
   }
}

export const DELETE = async (request: NextRequest, { params }: { params: any }) => {
   const { slug } = params;
   try {
      connectToDb();
      await Post.deleteOne({ slug });
      return NextResponse.json("Post deleted");
   } catch (error) {
      console.error(error);
      throw Error("Error deleting post");
   }
}