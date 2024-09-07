import mongoose, { Document, ObjectId } from "mongoose"
import { User } from "./user";

export type Post = Document & {
   id: string;
   desc: string;
   img: string;
   user: mongoose.Schema.Types.ObjectId | User;
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
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   slug: {
      type: String,
      required: true,
      unique: true,
   },
   body: {
      type: String,
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   }
},
   { timestamps: true }
)


export const Post = mongoose.models?.Post || mongoose.model<Post>("Post", postSchema);