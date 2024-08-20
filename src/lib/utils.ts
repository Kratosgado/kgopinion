import mongoose, { Connection, ConnectionStates } from "mongoose";

let connection: Connection = new Connection();

export const connectToDb = async () => {
   try {
      if (connection.readyState === ConnectionStates.connected) {
         console.log("using exxisting connection");
         return;
      }
      const db = await mongoose.connect(process.env.MONGO || process.env.MONGO_ONLINE || "", {
         dbName: process.env.DB_NAME,
      });
      connection = db.connections[0];
   } catch (error) {
      console.log(error);
      throw error;
   }
}

export const API = process.env.API || "/api";