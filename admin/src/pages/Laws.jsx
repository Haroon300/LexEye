import { useState } from "react";
import LawForm from "../components/LawForm";
import LawCard from "../components/LawCard";

function Laws() {
  const [laws, setLaws] = useState([
    {
      id: 1,
      title: "Section 302",
      description: "Punishment for murder",
      category: "Criminal Law",
      relatedLaws: [],
    },
    {
      id: 2,
      title: "Property Rights Act",
      description: "Law about ownership and transfer of property",
      category: "Property Law",
      relatedLaws: [],
    },
  ]);

  const categories = ["Criminal Law", "Property Law", "Contract Law"];

  // Handle Add
  const addLaw = (law) => {
    setLaws([...laws, { id: Date.now(), ...law }]);
  };

  // Handle Delete
  const deleteLaw = (id) => {
    setLaws(laws.filter((l) => l.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Laws</h2>

      {/* Form to add law */}
      <LawForm
        categories={categories}
        allLaws={laws}
        onSubmit={addLaw}
      />

      {/* List of laws */}
      <div className="mt-6 space-y-3">
        {laws.length > 0 ? (
          laws.map((law) => (
            <LawCard
              key={law.id}
              law={law}
              onDelete={deleteLaw}
              onBookmark={() => {}} // bookmark not needed for admin
              isBookmarked={false}
            />
          ))
        ) : (
          <p className="text-gray-500">No laws added yet.</p>
        )}
      </div>
    </div>
  );
}

export default Laws;
