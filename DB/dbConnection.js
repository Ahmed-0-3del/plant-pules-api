


import mongoose from "mongoose";

let isConnected = false;

export const connDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);

    isConnected = db.connections[0].readyState;

    console.log("DB connected successfully ");
  } catch (error) {
    console.error("DB connection failed :", error.message);
    throw error;
  }
};


