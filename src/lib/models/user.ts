import mongoose from "mongoose";

type User = {
   username: string;
   email: string;
   password: string;
   img: string;
   isAdmin: string;
}

const userSchema = new mongoose.Schema({
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
},
   { timestamps: true }
);


export const User = mongoose.models?.User || mongoose.model("User", userSchema)