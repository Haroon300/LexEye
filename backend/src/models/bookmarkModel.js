import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookmarks: [
      {
        _id: String, // Law ID
        section: String,
        legalConcept: String,
        description: String,
        legalConsequence: String,
        preventionSolutions: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Bookmark", bookmarkSchema);
