import mongoose from "mongoose";
import xlsx from "xlsx";
import dotenv from "dotenv";
import Law from "./src/models/lawModel.js"; // ✅ ensure correct path

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ MONGO_URI not found in .env file");
  process.exit(1);
}

await mongoose.connect(MONGO_URI);
console.log("✅ Connected to MongoDB");

// ✅ Load Excel Sheet2
const workbook = xlsx.readFile("./traffic law 3.xlsx");
const sheet = workbook.Sheets["Sheet2"];
const data = xlsx.utils.sheet_to_json(sheet);

// ✅ Normalize helper
function normalize(str) {
  return str ? str.toString().trim().toLowerCase().replace(/[^\w\s]/gi, "") : "";
}

// ✅ Fetch all laws once
const allLaws = await Law.find({});
console.log(`📚 Loaded ${allLaws.length} laws from database`);

// ✅ Helper: find related law ObjectIds based on section numbers
async function findRelatedLaws(relevantLawText) {
  if (!relevantLawText) return [];

  const lawNumbers = relevantLawText.match(/\d+/g); // Extract digits like 320, 279
  if (!lawNumbers) return [];

  const related = await Law.find({
    section: { $regex: lawNumbers.join("|"), $options: "i" },
  }).select("_id");

  return related.map((r) => r._id);
}

// ✅ Update process
let updatedCount = 0;
let notFound = [];

for (const row of data) {
  const legalConcept = row["legalConcept"];
  const stepByStepGuide = row["stepByStepGuide"];
  const relevantLaws = row["Relevant Law(s) (PPC / PMVO)"] || row["Relevant Law(s) (PPC/PMVO)"];

  if (!legalConcept) continue;

  const excelName = normalize(legalConcept);
  const match = allLaws.find((law) => normalize(law.legalConcept) === excelName);

  if (match) {
    const updateFields = {};

    // ✅ Step guide
    if (stepByStepGuide && stepByStepGuide.trim()) {
      updateFields.stepByStepGuide = stepByStepGuide;
    }

    // ✅ Related laws (ObjectIds)
    if (relevantLaws && relevantLaws.trim()) {
      const relatedIds = await findRelatedLaws(relevantLaws);
      if (relatedIds.length) {
        updateFields.relatedLaws = relatedIds;
      }
    }

    if (Object.keys(updateFields).length > 0) {
      await Law.updateOne({ _id: match._id }, { $set: updateFields });
      console.log(`✅ Updated: ${match.legalConcept}`);
      updatedCount++;
    }
  } else {
    console.log(`⚠️ No match found for: ${legalConcept}`);
    notFound.push(legalConcept);
  }
}

// ✅ Summary
console.log("\n🎯 Update Completed!");
console.log(`✅ Successfully updated: ${updatedCount}`);
if (notFound.length) {
  console.log(`⚠️ ${notFound.length} unmatched entries:`);
  console.log(notFound.join(", "));
}

await mongoose.connection.close();
console.log("🔒 MongoDB connection closed.");
