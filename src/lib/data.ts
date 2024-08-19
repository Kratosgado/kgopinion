import { Post } from "./models/post";
import { connectToDb } from "./utils"


export const getPosts = async () => {
   try {
      await connectToDb();
      const posts = await Post.find<Post>();
      console.log("Posts: " + posts)
      return posts;
   } catch (error) {
      console.log(error);
      throw new Error("Error fetching posts: " + error)
   }
}