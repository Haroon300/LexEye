import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

const categories = [
  "Criminal Law",
  "Property Law",
  "Human Rights",
  "Contract Law",
  "Narcotics",
  "Family Law",
  "Labor Law",
  "Cyber Crime",
  "Tax Law",
  "Environmental Law",
  "Intellectual Property",
  "Consumer Protection",
];

const Category = () => {
  const [search, setSearch] = useState("");

  const filteredCategories = categories.filter((cat) =>
    cat.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="relative mt-[5%] min-h-screen flex flex-col items-center px-6 sm:px-12 py-16">
      {/* Glow Effect */}
      <div className="h-0 w-[40rem] absolute top-[40%] left-[20%] shadow-[0_0_900px_40px_#e99b63] rotate-[150deg] -z-10"></div>

      {/* Title */}
      <h1 className="text-3xl sm:text-5xl font-bold tracking-wide text-white mb-10">
        Law Categories
      </h1>

      {/* Search Input */}
      <div className="flex items-center w-full max-w-lg bg-black/60 border border-gray-700 rounded-full px-4 py-3 focus-within:border-[#e99b63] transition-all mb-10">
        <AiOutlineSearch className="text-gray-400 text-xl sm:text-2xl" />
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-500 px-3 text-sm sm:text-base"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 w-full max-w-4xl">
        {filteredCategories.map((cat) => (
          <Link
            key={cat}
            to={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`} // ✅ slug bana diya
            className="px-6 py-4 bg-black/60 text-gray-300 text-center rounded-xl border border-gray-700 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-[#e99b63] hover:text-black shadow-md"
          >
            {cat}
          </Link>
        ))}
        {filteredCategories.length === 0 && (
          <p className="col-span-full text-gray-400 text-center">
            No categories found.
          </p>
        )}
      </div>
    </main>
  );
};

export default Category;
