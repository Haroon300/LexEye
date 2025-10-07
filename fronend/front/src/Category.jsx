import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "./components/Loader";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [laws, setLaws] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/laws/categories");
        setCategories(res.data.categories || []);
      } catch (err) {
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // ✅ Fetch laws when category clicked
  const handleCategoryClick = async (category) => {
    setLoading(true);
    setError("");
    setLaws([]);
    try {
      const res = await axios.post("http://localhost:5000/api/laws/category", {
        category,
      });
      setLaws(res.data.laws || []);
    } catch (err) {
      setError("No laws found in this category.");
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="relative mt-[20%] sm:mt-[10%] min-h-screen flex flex-col items-center px-4 sm:px-8 md:px-12 py-12 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Law Categories</h1>

      {/* 🔍 Search Bar */}
      <div className="flex items-center w-full max-w-md bg-[#89a2a6]/60 border border-[#08292e] rounded-full px-4 py-2 mb-8">
        <AiOutlineSearch className="text-[#08292e] text-xl" />
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent outline-none text-[#08292e] px-2"
        />
      </div>

      {/* 🧾 Categories List */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-5xl">
        {filteredCategories.map((cat) => (
          <button
            key={cat.category}
            onClick={() => handleCategoryClick(cat.category)}
            className="px-4 py-2 bg-white/10 border border-[#89a2a6] rounded-full text-sm hover:bg-white/20"
          >
            {cat.category} ({cat.count})
          </button>
        ))}
      </div>

      {loading && <Loader />}
      {error && <p className="mt-4 text-red-400">{error}</p>}

      {/* ⚖️ Show Laws */}
      {laws.length > 0 && (
        <div className="mt-8 w-full max-w-3xl text-left">
          <h2 className="text-2xl font-semibold mb-4">Laws in this Category:</h2>
          <ul className="space-y-3">
            {laws.map((law) => (
              <li
                key={law._id}
                className="p-3 border border-[#89a2a6]/50 rounded-lg bg-white/5 hover:bg-white/20 transition"
              >
                <Link to={`/law/${law._id}`}>
                  <p className="text-lg font-bold text-[#89a2a6]">
                    {law.section || "Unnamed Law"}
                  </p>
                  <p className="text-gray-300 text-sm">
                    {law.description || "No description available."}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
};

export default Category;
