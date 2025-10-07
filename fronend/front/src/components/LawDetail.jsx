import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoBookmarkSharp } from "react-icons/io5";
import { TiArrowBack } from "react-icons/ti";
import axios from "axios";
import Loader from "./Loader";

const LawDetail = () => {
  const { lawId } = useParams();
  const navigate = useNavigate();

  const [law, setLaw] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLaw = async () => {
      try {
        const { data } = await axios.get(
          `https://lex-eye-backend.vercel.app/api/laws/${lawId}`
        );
        setLaw(data);
      } catch (err) {
        setError("Failed to fetch law details.");
      } finally {
        setLoading(false);
      }
    };

    fetchLaw();
  }, [lawId]);

  if (loading) return <Loader />;
  if (error || !law)
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#08292e] text-[#89a2a6]">
        <p>{error || "Law details not found."}</p>
      </main>
    );

  return (
    <main className="relative min-h-screen mt-[6%] px-6 sm:px-12 py-16 text-white">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-10 px-5 py-2 hover:text-[#89a2a6] text-white font-semibold"
      >
        <TiArrowBack className="text-2xl mr-2" />
        Back
      </button>

      <h1 className="text-3xl sm:text-5xl font-bold mb-8 text-[#89a2a6]">
        {law.section} — {law.legalConcept}
      </h1>

      <div className="p-6 mb-8 bg-[#89a2a6]/40 rounded-2xl border border-gray-700 shadow-lg">
        <h2 className="text-2xl font-semibold mb-3">📖 Description</h2>
        <p className="text-gray-300 leading-relaxed">
          {law.description || "No description provided."}
        </p>
      </div>

      <div className="p-6 mb-8 bg-[#89a2a6]/40 rounded-2xl border border-gray-700 shadow-lg">
        <h2 className="text-2xl font-semibold mb-3">⚖️ Legal Consequence</h2>
        <p className="text-gray-300 leading-relaxed">
          {law.legalConsequence || "Not specified."}
        </p>
      </div>
      <div className="p-6 mb-8 bg-[#89a2a6]/40 rounded-2xl border border-gray-700 shadow-lg">
        <h2 className="text-2xl font-semibold mb-3">⚖️ preventionSolutions</h2>
        <p className="text-gray-300 leading-relaxed">
          {law.preventionSolutions || "Not provided."}
        </p>
      </div>
    </main>
  );
};

export default LawDetail;
