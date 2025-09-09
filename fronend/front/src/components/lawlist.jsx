import { useParams, Link, useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { useEffect, useState } from "react";
import Loader from "./Loader"; // ✅ apna loader component import karo

const dummyLaws = {
  "criminal-law": [
    { id: 1, title: "Criminal Procedure Code 1898", desc: "Deals with criminal procedures." },
    { id: 2, title: "Pakistan Penal Code", desc: "Defines crimes and punishments." },
  ],
  "property-law": [
    { id: 3, title: "Transfer of Property Act", desc: "Regulates property transfer." },
    { id: 4, title: "Land Revenue Act", desc: "Relates to land and revenue matters." },
  ],
  "human-rights": [
    { id: 5, title: "Human Rights Act", desc: "Protection of fundamental rights." },
  ],
};

const LawList = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [laws, setLaws] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ simulate API call
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLaws(dummyLaws[categoryId] || []);
      setLoading(false);
    }, 1200); // fake delay 1.2s

    return () => clearTimeout(timer);
  }, [categoryId]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loader /> {/* ✅ show loader while fetching */}
      </main>
    );
  }

  return (
    <main className="min-h-screen mt-[10%] px-6 sm:px-12 py-16 text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-6 px-4 py-2 bg-[#e99b63] hover:bg-[#ffb27d] text-black font-semibold rounded-full transition-all"
      >
        <TiArrowBack className="text-2xl mr-2" />
        Back
      </button>

      {/* Title */}
      <h1 className="text-3xl sm:text-5xl font-bold mb-10 capitalize">
        {categoryId.replace("-", " ")} Laws
      </h1>

      {/* Laws List */}
      {laws.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {laws.map((law) => (
            <Link
              key={law.id}
              to={`/law/${law.id}`}
              className="p-6 bg-black/60 rounded-xl border border-gray-700 hover:bg-[#e99b63] hover:text-black transition-all shadow-md"
            >
              <h2 className="text-xl font-semibold mb-2">{law.title}</h2>
              <p className="opacity-80">{law.desc}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="p-6 mt-6 bg-black/60 border border-gray-700 rounded-xl text-center text-gray-400">
           No laws found for this category.
        </div>
      )}
    </main>
  );
};

export default LawList;
