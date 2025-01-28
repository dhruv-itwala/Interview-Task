import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
  },
  { timestamps: true }
);

const timeSlotModel =
  mongoose.models.timeslot || mongoose.model("timeslot", timeSlotSchema);

export default timeSlotModel;
