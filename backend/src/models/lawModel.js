import mongoose from "mongoose";

const lawSchema = new mongoose.Schema(
  {
    lawTitle: { type: String, required: true, trim: true },        
    section: { type: String, required: true, trim: true },
    category: { type: String, default: "General", trim: true },
    sabCategory: { type: String, default: "General", trim: true },
    jurisdiction: { type: String, default: "", trim: true },       
    lastUpdated: { type: String, default: "", trim: true },        
    sectionOverview: { type: String, default: "", trim: true },    
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
  lawTitle: "text",
  section: "text",
  legalConcept: "text",
  description: "text",
  lawTitle: "text",
  category: "text",
  sabCategory: "text",
  sectionOverview: "text",
  stepByStepGuide: "text",
  preventionSolutions: "text"
});

const Law = mongoose.model("Law", lawSchema);
export default Law;
