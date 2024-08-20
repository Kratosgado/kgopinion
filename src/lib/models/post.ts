import mongoose, { ObjectId } from "mongoose"

export type Post = {
   id: string;
   desc: string;
   img: string;
   userId: string;
   title: string;
   slug: string;
   body: string;
   createdAt: Date;
};

const postSchema = new mongoose.Schema<Post>({
   title: {
      type: String,
      required: true,
   },
   desc: {
      type: String,
      required: true,
   },
   img: { type: String },
   userId: {
      type: String,
      required: true,
   },
   slug: {
      type: String,
      required: true,
      unique: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   }
},
   { timestamps: true }
)


export const Post = mongoose.models?.Post || mongoose.model<Post>("Post", postSchema);