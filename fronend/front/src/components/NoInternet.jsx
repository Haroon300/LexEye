import { Link } from "react-router-dom";
import { FaBookBookmark } from "react-icons/fa6";
import { MdSignalWifiOff } from "react-icons/md";

const NoInternet = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-#092226/70 text-gray-300">
      <MdSignalWifiOff className="text-6xl text-red-500 mb-4" />
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">No Internet Connection</h1>
      <p className="text-lg sm:text-xl mb-8">
        Please check your connection. Meanwhile, you can view your saved bookmarks.
      </p>

      <Link
        to="/bookmarks"
        className="flex items-center gap-2 hover:bg-[#08292e] bg-[#becac8] text-[#08292e] hover:text-[#becac8] text-black px-6 py-3 rounded-full font-medium transition"
      >
        <FaBookBookmark />
        See Bookmarks
      </Link>
    </main>
  );
};

export default NoInternet;
