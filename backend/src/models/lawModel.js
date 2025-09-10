import mongoose from "mongoose";

const lawSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    relatedLaws: [{ type: mongoose.Schema.Types.ObjectId, ref: "Law" }],
  },
  { timestamps: true }
);

lawSchema.index({ title: "text", description: "text" });

const Law = mongoose.model("Law", lawSchema);
export default Law;
