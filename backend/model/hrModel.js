import mongoose from "mongoose";

const hrSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const hrModel = mongoose.models.user || mongoose.model("user", hrSchema);

export default hrModel;
