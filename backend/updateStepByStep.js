import mongoose from "mongoose";
import xlsx from "xlsx";
import dotenv from "dotenv";
import Law from "./src/models/lawModel.js"; // ✅ make sure path is correct

dotenv.config();

// ✅ 1. Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ MONGO_URI not found in .env file");
  process.exit(1);
}

await mongoose.connect(MONGO_URI);
console.log("✅ Connected to MongoDB");

// ✅ 2. Load Excel data
const workbook = xlsx.readFile("./Copy of narcotics law final.xlsx");
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(sheet);

// ✅ Helper function to normalize text (for better matching)
function normalize(str) {
  return str
    ? str.toString().trim().toLowerCase().replace(/[^\w\s]/gi, "")
    : "";
}

// ✅ 3. Fetch all laws once to speed up matching
const allLaws = await Law.find({});
console.log(`📚 Loaded ${allLaws.length} laws from database`);

// ✅ 4. Loop through Excel rows
let updatedCount = 0;
let notFound = [];

for (const row of data) {
  const { legalConcept, stepByStepGuide } = row;
  if (!legalConcept || !stepByStepGuide) continue;

  const excelName = normalize(legalConcept);

  // ✅ Try to find matching law by normalized name
  const match = allLaws.find(
    (law) => normalize(law.legalConcept) === excelName
  );

  if (match) {
    await Law.updateOne(
      { _id: match._id },
      { $set: { stepByStepGuide } }
    );
    console.log(`✅ Updated: ${match.legalConcept}`);
    updatedCount++;
  } else {
    console.log(`⚠️ No match found for: ${legalConcept}`);
    notFound.push(legalConcept);
  }
}

// ✅ 5. Summary
console.log("\n🎯 Update process completed!");
console.log(`✅ Successfully updated: ${updatedCount}`);
if (notFound.length) {
  console.log(`⚠️ ${notFound.length} unmatched entries:`);
  console.log(notFound.join(", "));
}

await mongoose.connection.close();
console.log("🔒 MongoDB connection closed.");
