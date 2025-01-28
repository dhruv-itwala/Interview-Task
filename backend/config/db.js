import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(`${process.env.MONGOURI}/user`)
    .then(() => console.log("DB Connected"));
};
