import mongoose from "mongoose";
import xlsx from "xlsx";
import dotenv from "dotenv";
import Law from "./src/models/lawModel.js";

dotenv.config();

// ✅ Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ MONGO_URI missing in .env");
  process.exit(1);
}
await mongoose.connect(MONGO_URI);
console.log("✅ Connected to MongoDB");

// ✅ Read Excel file
const workbook = xlsx.readFile("./narcotics lexeye.xlsx");
const sheet = workbook.Sheets["LexEye Law Template"] || workbook.Sheets[workbook.SheetNames[0]];
const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });
console.log(`📄 Loaded ${rows.length} rows from Excel`);

// ✅ Parse vertically structured Excel
function parseVertical(rows) {
  const laws = [];
  let current = {};

  for (let i = 1; i < rows.length; i++) {
    const key = rows[i][0]?.trim();
    const val = rows[i][1]?.toString().trim();

    if (!key && !val) continue;
    if (key === "Law Title" && Object.keys(current).length > 0) {
      laws.push(current);
      current = {};
    }

    switch (key) {
      case "Law Title": current.lawTitle = val; break;
      case "Section": current.section = val; break;
      case "Category": current.category = val; break;
      case "Jurisdiction": current.jurisdiction = val; break;
      case "Last Updated": current.lastUpdated = val; break;
      case "Section Overview": current.sectionOverview = val; break;
      case "Offense": current.legalConcept = val; break;
      case "Simple Explanation": current.description = val; break;
      case "Legal Punishment": current.legalConsequence = val; break;
      case "Step-by-Step Legal Help Guide": current.stepByStepGuide = val; break;
      case "Prevention & Awareness Solutions": current.preventionSolutions = val; break;
      case "Related Laws": current.relatedLawsText = val; break;
    }
  }

  if (Object.keys(current).length > 0) laws.push(current);
  return laws;
}

const parsed = parseVertical(rows);
console.log(`✅ Parsed ${parsed.length} laws from Excel`);

function normalize(str) {
  return str ? str.trim().toLowerCase().replace(/[^\w\s]/gi, "") : "";
}

// ✅ Load all existing laws
const all = await Law.find({});
console.log(`📚 Found ${all.length} existing laws in MongoDB`);

let inserted = 0, updated = 0, skipped = 0;

// ✅ Insert or update laws
for (const law of parsed) {
  const { lawTitle, section, category, jurisdiction, lastUpdated, sectionOverview,
          legalConcept, description, legalConsequence, preventionSolutions,
          stepByStepGuide } = law;

  if (!legalConcept && !section) { skipped++; continue; }

  const match = all.find(
    l => normalize(l.legalConcept) === normalize(legalConcept) ||
         normalize(l.section) === normalize(section)
  );

  if (match) {
    const updates = {};
    if (lawTitle && lawTitle !== match.lawTitle) updates.lawTitle = lawTitle;
    if (category && category !== match.category) updates.category = category;
    if (jurisdiction && jurisdiction !== match.jurisdiction) updates.jurisdiction = jurisdiction;
    if (lastUpdated && lastUpdated !== match.lastUpdated) updates.lastUpdated = lastUpdated;
    if (sectionOverview && sectionOverview !== match.sectionOverview) updates.sectionOverview = sectionOverview;
    if (legalConcept && legalConcept !== match.legalConcept) updates.legalConcept = legalConcept;
    if (description && description !== match.description) updates.description = description;
    if (legalConsequence && legalConsequence !== match.legalConsequence) updates.legalConsequence = legalConsequence;
    if (preventionSolutions && preventionSolutions !== match.preventionSolutions) updates.preventionSolutions = preventionSolutions;
    if (stepByStepGuide && stepByStepGuide !== match.stepByStepGuide) updates.stepByStepGuide = stepByStepGuide;

    if (Object.keys(updates).length > 0) {
      await Law.updateOne({ _id: match._id }, { $set: updates });
      console.log(`🟢 Updated: ${match.legalConcept || match.section}`);
      updated++;
    } else {
      console.log(`⚪ No change: ${match.legalConcept || match.section}`);
    }
  } else {
    const newLaw = new Law({
      lawTitle: lawTitle || "Untitled Law",
      section: section || "",
      category: category || "General",
      jurisdiction: jurisdiction || "",
      lastUpdated: lastUpdated || "",
      sectionOverview: sectionOverview || "",
      legalConcept: legalConcept || "",
      description: description || "",
      legalConsequence: legalConsequence || "",
      preventionSolutions: preventionSolutions || "",
      stepByStepGuide: stepByStepGuide || "",
    });

    await newLaw.save();
    console.log(`🟣 Inserted new: ${legalConcept || section}`);
    inserted++;
  }
}

// ✅ Summary
console.log("\n🎯 Import Completed!");
console.log(`🟣 Inserted: ${inserted}`);
console.log(`🟢 Updated: ${updated}`);
console.log(`⚪ Skipped: ${skipped}`);
console.log(`📊 Total processed: ${parsed.length}`);

await mongoose.connection.close();
console.log("🔒 MongoDB connection closed.");
