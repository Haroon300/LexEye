import { useParams, Link, useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

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

  const laws = dummyLaws[categoryId] || [];

  return (
    <main className="min-h-screen mt-[5%] px-6 sm:px-12 py-16 text-white">
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
              to={`/law/${law.id}`} // ✅ detail page route
              className="p-6 bg-black/60 rounded-xl border border-gray-700 hover:bg-[#e99b63] hover:text-black transition-all shadow-md"
            >
              <h2 className="text-xl font-semibold mb-2">{law.title}</h2>
              <p className="text-gray-700 ">{law.desc}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No laws found for this category.</p>
      )}
    </main>
  );
};

export default LawList;
