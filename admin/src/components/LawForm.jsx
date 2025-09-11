import { useState } from "react";

function LawForm({ categories, allLaws, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [related, setRelated] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !category) return;
    onSubmit({ title, description, category, relatedLaws: related });
    setTitle("");
    setDescription("");
    setCategory("");
    setRelated([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow-md">
      <input
        type="text"
        placeholder="Law Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <textarea
        placeholder="Law Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <label className="block text-sm">Related Laws:</label>
      <select
        multiple
        value={related}
        onChange={(e) =>
          setRelated([...e.target.selectedOptions].map((o) => o.value))
        }
        className="w-full border p-2 rounded h-32"
      >
        {allLaws.map((l) => (
          <option key={l.id} value={l.id}>{l.title}</option>
        ))}
      </select>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Law
      </button>
    </form>
  );
}

export default LawForm;
