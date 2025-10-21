import mongoose from "mongoose";

const lawSchema = new mongoose.Schema(
  {
    lawTitle: { type: String, required: true, trim: true },        // NEW
    section: { type: String, required: true, trim: true },
    category: { type: String, default: "General", trim: true },
    jurisdiction: { type: String, default: "", trim: true },       // NEW
    lastUpdated: { type: String, default: "", trim: true },        // NEW
    sectionOverview: { type: String, default: "", trim: true },    // NEW
    legalConcept: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    legalConsequence: { type: String, required: true, trim: true },
    preventionSolutions: { type: String, required: true, trim: true },
    stepByStepGuide: { type: String, default: "" },
    relatedLaws: [{ type: mongoose.Schema.Types.ObjectId, ref: "Law" }],
  },
  { timestamps: true }
);

// for search
lawSchema.index({
  section: "text",
  legalConcept: "text",
  description: "text",
  lawTitle: "text",
  category: "text"
});

const Law = mongoose.model("Law", lawSchema);
export default Law;
