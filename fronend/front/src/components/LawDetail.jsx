import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoBookmarkSharp } from "react-icons/io5";
import { TiArrowBack } from "react-icons/ti";
import axios from "axios";
import Loader from "./Loader";
import { addBookmark, removeBookmark, loadLocalBookmarks, processPendingSyncs } from "../utils/bookmarkUtils";

const LawDetail = () => {
  const { lawId } = useParams();
  const navigate = useNavigate();
  const [law, setLaw] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLaw = async () => {
      try {
        const { data } = await axios.get(`https://lex-eye-backend.vercel.app/api/laws/${lawId}`);
        setLaw(data);
      } catch {
        const local = loadLocalBookmarks();
        const found = local.find((l) => l._id === lawId);
        setLaw(found || null);
      } finally {
        setLoading(false);
      }
    };
    fetchLaw();
  }, [lawId]);

  useEffect(() => {
    const local = loadLocalBookmarks();
    setIsBookmarked(local.some((b) => b._id === lawId));
    window.addEventListener("online", () => processPendingSyncs(token));
    return () => window.removeEventListener("online", () => processPendingSyncs(token));
  }, [lawId, token]);

  const toggleBookmark = async () => {
    if (!law) return;
    if (!token) return navigate("/signin");

    if (isBookmarked) {
      await removeBookmark(law._id, token);
      setIsBookmarked(false);
    } else {
      await addBookmark(law, token);
      setIsBookmarked(true);
    }
  };

  if (loading) return <Loader />;

  return (
    <main className="min-h-screen text-white mt-[5%] px-8 py-16">
      <button onClick={() => navigate(-1)} className="mb-8 flex items-center">
        <TiArrowBack className="mr-2 text-2xl" /> Back
      </button>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{law?.section}</h1>
        <button
          onClick={toggleBookmark}
          className={`text-3xl ${isBookmarked ? "text-yellow-400" : "text-gray-400 hover:text-yellow-400"}`}
        >
          <IoBookmarkSharp />
        </button>
      </div>
      <h3>{law?.legalConcept}</h3>
      <p>{law?.description || "No description available."}</p>
      <p>{law?.legalConsequence || "No legalConsequence available."}</p>
      <p>{law?.preventionSolutions || "No preventionSolutions available."}</p>
    </main>
  );
};

export default LawDetail;
