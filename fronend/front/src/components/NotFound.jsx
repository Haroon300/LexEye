import { Link } from "react-router-dom";
import { FaBookBookmark } from "react-icons/fa6";

const NotFound = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[#08292e] text-gray-300">
      <h1 className="text-6xl font-bold text-[#89a2a6] mb-4">404</h1>
      <p className="text-lg sm:text-xl mb-8">
        Oops! The page you are looking for doesn’t exist.
      </p>

      <div className="flex gap-4">
        <Link
          to="/"
          className="bg-[#89a2a6] text-[#08292e] px-6 py-3 rounded-full font-medium"
        >
          Go Home
        </Link>
        <Link
          to="/bookmarks"
          className="flex items-center gap-2 border border-gray-500 px-6 py-3 rounded-full hover:bg-[#89a2a6]  hover:text-[#08292e] transition"
        >
          <FaBookBookmark />
          See Bookmarks
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
