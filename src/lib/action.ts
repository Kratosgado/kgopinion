"use server";

import { revalidatePath } from "next/cache";
import { Post } from "./models/post";
import { connectToDb } from "./utils";


export const addPost = async (formData: FormData) => {
   const { title, desc, img, slug, userId } = Object.fromEntries(formData);

   try {
      await connectToDb();
      const newPost = new Post({ title, desc, img, slug, userId });
      await newPost.save();
      console.info("Post saved");
      revalidatePath("/blog");
   } catch (error) {
      console.error(error);
      return { error: "Error saving post" };
   }
}

export const deltePost = async (formData: FormData) => {
   const { slug } = Object.fromEntries(formData);
   try {
      await connectToDb();
      await Post.findOneAndDelete({ slug });
      console.info("Post deleted");
      revalidatePath("/blog");
   } catch (error) {
      console.error(error);
      return { error: "Error deleting post" };
   }
}