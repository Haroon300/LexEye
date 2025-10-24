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
const workbook = xlsx.readFile("./constitution law lexeye.xlsx");
const sheet =
  workbook.Sheets["LexEye Law Template"] ||
  workbook.Sheets[workbook.SheetNames[0]];
const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });
console.log(`📄 Loaded ${rows.length} rows from Excel`);

// ✅ Parse Excel structure
function parseExcelStructure(rows) {
  const laws = [];
  let currentLaw = {};
  let currentField = "";

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    
    // Skip empty rows
    if (!row || row.length === 0) continue;
    
    // Check if this is a field row (like "Law Title", "Section", etc.)
    if (row[0] && typeof row[0] === 'string' && row[0].includes("Field")) {
      // This is a header row, skip it
      continue;
    }
    
    // Check if this row contains a field name in first column
    if (row[0] && typeof row[0] === 'string' && row[0].trim() !== "") {
      const fieldName = row[0].toString().trim();
      
      // If we encounter "Law Title" and we already have a law object, save it
      if (fieldName === "Law Title" && Object.keys(currentLaw).length > 0) {
        laws.push(currentLaw);
        currentLaw = {};
      }
      
      currentField = fieldName;
      
      // Get the value from second column if exists
      if (row[1] !== undefined) {
        const value = row[1].toString().trim();
        
        switch (currentField) {
          case "Law Title":
            currentLaw.lawTitle = value;
            break;
          case "Section":
            currentLaw.section = value;
            break;
          case "Category":
            currentLaw.sabCategory = value; // Excel category goes to sabCategory
            break;
          case "Jurisdiction":
            currentLaw.jurisdiction = value;
            break;
          case "Last Updated":
            currentLaw.lastUpdated = value;
            break;
          case "Section Overview":
            currentLaw.sectionOverview = value;
            break;
          case "Offense":
            currentLaw.legalConcept = value;
            break;
          case "Simple Explanation":
            currentLaw.description = value;
            break;
          case "Legal Punishment":
            currentLaw.legalConsequence = value;
            break;
          case "Step-by-Step Legal Help Guide":
            currentLaw.stepByStepGuide = value;
            break;
          case "Prevention & Awareness Solutions":
            currentLaw.preventionSolutions = value;
            break;
          case "Related Laws":
            currentLaw.relatedLawsText = value;
            break;
        }
      }
    }
    // Handle content in second column when first column is empty (continuation)
    else if (currentField && row[1] !== undefined && row[1].toString().trim() !== "") {
      const value = row[1].toString().trim();
      // Append to existing field if it's a continuation
      switch (currentField) {
        case "Section Overview":
          currentLaw.sectionOverview = (currentLaw.sectionOverview || "") + " " + value;
          break;
        case "Offense":
          currentLaw.legalConcept = (currentLaw.legalConcept || "") + " " + value;
          break;
        case "Simple Explanation":
          currentLaw.description = (currentLaw.description || "") + " " + value;
          break;
        case "Legal Punishment":
          currentLaw.legalConsequence = (currentLaw.legalConsequence || "") + " " + value;
          break;
        case "Step-by-Step Legal Help Guide":
          currentLaw.stepByStepGuide = (currentLaw.stepByStepGuide || "") + " " + value;
          break;
        case "Prevention & Awareness Solutions":
          currentLaw.preventionSolutions = (currentLaw.preventionSolutions || "") + " " + value;
          break;
        case "Related Laws":
          currentLaw.relatedLawsText = (currentLaw.relatedLawsText || "") + " " + value;
          break;
      }
    }
  }

  // Push the last law
  if (Object.keys(currentLaw).length > 0) {
    laws.push(currentLaw);
  }

  return laws;
}

const parsed = parseExcelStructure(rows);
console.log(`✅ Parsed ${parsed.length} laws from Excel`);

// Debug: Show parsed laws
console.log("Parsed laws:", JSON.stringify(parsed, null, 2));

function normalize(str) {
  return str ? str.trim().toLowerCase().replace(/[^\w\s]/gi, "") : "";
}

// ✅ Load all existing laws
const all = await Law.find({});
console.log(`📚 Found ${all.length} existing laws in MongoDB`);

let inserted = 0,
  updated = 0,
  skipped = 0;

// ✅ MANUAL CATEGORY - Yahan apni manual category set karen
const MANUAL_CATEGORY = "Constitution Law"; // 👈 Yahan apni category set karen

// ✅ Insert or update laws
for (const law of parsed) {
  const {
    lawTitle,
    section,
    sabCategory, // Excel se ayegi (e.g., "Drug & Narcotics Law")
    jurisdiction,
    lastUpdated,
    sectionOverview,
    legalConcept,
    description,
    legalConsequence,
    preventionSolutions,
    stepByStepGuide,
    relatedLawsText,
  } = law;

  // Skip if no legal concept or section
  if (!legalConcept && !section) {
    console.log(`⚪ Skipping: No legal concept or section`);
    skipped++;
    continue;
  }

  // Find matching law
  const match = all.find(
    (l) =>
      (legalConcept && normalize(l.legalConcept) === normalize(legalConcept)) ||
      (section && normalize(l.section) === normalize(section))
  );

  // ✅ FIXED: Parse related laws text → string array (ObjectId ki jagah)
  const relatedLawsArray = relatedLawsText
    ? relatedLawsText.split(";").map((x) => x.trim()).filter(Boolean)
    : [];

  if (match) {
    // Update existing law
    const updates = {};
    if (lawTitle && lawTitle !== match.lawTitle) updates.lawTitle = lawTitle;
    if (MANUAL_CATEGORY && MANUAL_CATEGORY !== match.category)
      updates.category = MANUAL_CATEGORY; // Manual category
    if (sabCategory && sabCategory !== match.sabCategory)
      updates.sabCategory = sabCategory; // Excel category to sabCategory
    if (jurisdiction && jurisdiction !== match.jurisdiction)
      updates.jurisdiction = jurisdiction;
    if (lastUpdated && lastUpdated !== match.lastUpdated)
      updates.lastUpdated = lastUpdated;
    if (sectionOverview && sectionOverview !== match.sectionOverview)
      updates.sectionOverview = sectionOverview;
    if (legalConcept && legalConcept !== match.legalConcept)
      updates.legalConcept = legalConcept;
    if (description && description !== match.description)
      updates.description = description;
    if (legalConsequence && legalConsequence !== match.legalConsequence)
      updates.legalConsequence = legalConsequence;
    if (preventionSolutions && preventionSolutions !== match.preventionSolutions)
      updates.preventionSolutions = preventionSolutions;
    if (stepByStepGuide && stepByStepGuide !== match.stepByStepGuide)
      updates.stepByStepGuide = stepByStepGuide;

    // ✅ FIXED: Handle Related Laws update - ab string array hi rahega
    if (
      relatedLawsArray.length > 0 &&
      JSON.stringify(relatedLawsArray) !== JSON.stringify(match.relatedLaws)
    ) {
      updates.relatedLaws = relatedLawsArray;
    }

    if (Object.keys(updates).length > 0) {
      await Law.updateOne({ _id: match._id }, { $set: updates });
      console.log(`🟢 Updated: ${match.legalConcept || match.section}`);
      console.log(`   Category: ${MANUAL_CATEGORY}, sabCategory: ${sabCategory}`);
      updated++;
    } else {
      console.log(`⚪ No change: ${match.legalConcept || match.section}`);
    }
  } else {
    // Insert new law
    const newLaw = new Law({
      lawTitle: lawTitle || "Untitled Law",
      section: section || "",
      category: MANUAL_CATEGORY, // Manual category
      sabCategory: sabCategory || "General", // Excel category to sabCategory
      jurisdiction: jurisdiction || "",
      lastUpdated: lastUpdated || "",
      sectionOverview: sectionOverview || "",
      legalConcept: legalConcept || "",
      description: description || "",
      legalConsequence: legalConsequence || "",
      preventionSolutions: preventionSolutions || "",
      stepByStepGuide: stepByStepGuide || "",
      relatedLaws: relatedLawsArray, // 👈 Yeh ab string array hai
    });

    await newLaw.save();
    console.log(`🟣 Inserted new: ${legalConcept || section}`);
    console.log(`   Category: ${MANUAL_CATEGORY}, sabCategory: ${sabCategory}`);
    inserted++;
  }
}

// ✅ Summary
console.log("\n🎯 Import Completed!");
console.log(`🟣 Inserted: ${inserted}`);
console.log(`🟢 Updated: ${updated}`);
console.log(`⚪ Skipped: ${skipped}`);
console.log(`📊 Total processed: ${parsed.length}`);
console.log(`🏷️ Manual Category: ${MANUAL_CATEGORY}`);

await mongoose.connection.close();
console.log("🔒 MongoDB connection closed.");