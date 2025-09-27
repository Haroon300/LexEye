import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:5000/api/laws/categories"
        );
        // API returns { _id: "Human Rights", count: 22 }
        setCategories(res.data);
      } catch (err) {
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat._id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="relative mt-[20%] sm:mt-[10%] min-h-screen flex flex-col items-center px-4 sm:px-8 md:px-12 py-12">
      {/* Glow Effect */}
      <div className="h-0 w-[20rem] sm:w-[30rem] md:w-[40rem] absolute top-[35%] sm:top-[40%] left-[10%] sm:left-[20%] shadow-[0_0_600px_30px_#000000] sm:shadow-[0_0_900px_40px_#000000] rotate-[150deg] -z-10"></div>

      {/* Title */}
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-wide text-white mb-6 sm:mb-10 text-center">
        Law Categories
      </h1>

      {/* Search Input */}
      <div className="flex items-center w-full max-w-md sm:max-w-lg bg-[#89a2a6]/60 border border-[#08292e] rounded-full px-3 sm:px-4 py-2 sm:py-3 focus-within:border-[#08292e] transition-all mb-8 sm:mb-10">
        <AiOutlineSearch className="text-[#08292e] text-lg sm:text-xl md:text-2xl" />
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent outline-none text-[#08292e] placeholder-[#08292e] px-2 sm:px-3 text-sm sm:text-base md:text-lg"
        />
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-gray-400">Loading categories...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5 w-full max-w-5xl">
        {filteredCategories.map((cat) => (
          <Link
            key={cat._id}
            to={`/category/${cat._id.toLowerCase().replace(/\s+/g, "-")}`}
            className="px-4 sm:px-6 py-3 sm:py-4 bg-black/60 text-gray-300 text-center rounded-xl border border-gray-700 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-[#e99b63] hover:text-black shadow-md text-sm sm:text-base md:text-lg"
          >
            {cat._id} <span className="text-sm text-gray-400">({cat.count})</span>
          </Link>
        ))}

        {filteredCategories.length === 0 && !loading && (
          <p className="col-span-full text-gray-400 text-center text-sm sm:text-base">
            No categories found.
          </p>
        )}
      </div>
    </main>
  );
};

export default Category;
