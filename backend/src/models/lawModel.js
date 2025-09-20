import mongoose from "mongoose";

const lawSchema = new mongoose.Schema(
  {
    section: {type: String, required: true, trim: true},
    legalConcept: {type: String,required: true,trim: true},
    description: {type: String,required: true,trim: true},
    legalConsequence: {type: String,required: true,trim: true},
    preventionSolutions: {type: String,required: true,trim: true},
    category: {type: String,default: "General"},
    relatedLaws: [{type: mongoose.Schema.Types.ObjectId,ref: "Law"},],
  },
  { timestamps: true }
);

lawSchema.index({ section: "text", legalConcept: "text", description: "text" });

const Law = mongoose.model("Law", lawSchema);
export default Law;
