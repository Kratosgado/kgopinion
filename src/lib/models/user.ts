import mongoose, { Document } from "mongoose";

export type User = Document & {
   username: string;
   email: string;
   password: string;
   img: string;
   isAdmin: boolean;
   posts: mongoose.Schema.Types.ObjectId[];
}

const userSchema = new mongoose.Schema<User>({
   username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20
   },
   email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
   },
   password: { type: String },
   img: { type: String },
   isAdmin: {
      type: Boolean,
      default: false,
   },
   posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
},
   { timestamps: true, _id: true }
);


export const User = mongoose.models?.User || mongoose.model<User>("User", userSchema)