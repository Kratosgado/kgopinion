'use server'

import { Post } from "./models/post";
import { unstable_noStore as noStore } from 'next/cache';
import { User } from "./models/user";
import { connectToDb } from "./utils"


export const getPosts = async () => {
   try {
      await connectToDb();
      const posts = await Post.find<Post>();
      console.log("Posts: " + posts.length)
      return posts;
   } catch (error) {
      console.log(error);
      throw new Error("Error fetching posts: " + error)
   }
}

export const getPost = async (slug: string) => {
   try {
      await connectToDb();
      console.info("finding post with slug: " + slug)
      const post = await Post.findOne({ slug });
      console.log("Post: " + post?.slug)
      return post;
   } catch (error) {
      console.log(error);
      throw new Error("Error fetching post: " + error)
   }
}

export const getUser = async (userId: string) => {
   noStore();
   try {
      await connectToDb();
      const user = await User.findById<User>(userId);
      console.log("User: " + user?.email)
      return user;
   } catch (error) {
      console.error(error);
      throw error;
   }
}

export const getUsers = async () => {
   try {
      await connectToDb();
      const users = await User.find<User>();
      console.log("Users: " + users)
      return users;
   } catch (error) {
      console.error(error);
      throw error;
   }
}
