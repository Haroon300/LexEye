import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // later you can link with auth system
  lawId: { type: mongoose.Schema.Types.ObjectId, ref: "Law", required: true },
});

export default mongoose.model("Bookmark", bookmarkSchema);
