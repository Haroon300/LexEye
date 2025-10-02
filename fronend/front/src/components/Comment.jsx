import React, { useState } from "react";
import { GiScales } from "react-icons/gi";

export default function FeedbackPage() {
  const [clarity, setClarity] = useState(5);
  const [speed, setSpeed] = useState(3);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#092226] text-white px-4 pt-[6rem] pb-[6rem]">
      <div className="max-w-3xl w-full bg-[#0e2f34] p-10 rounded-2xl shadow-xl border border-gray-700 transition-all duration-300 hover:shadow-[0_0_25px_rgba(137,162,166,0.4)]">
        
        {/* Title + Intro */}
        <div className="flex items-center gap-3 mb-6 animate-fadeIn">
          <GiScales className="text-4xl text-[#89a2a6] animate-pulse" />
          <h1 className="text-3xl font-bold">Help Us Balance the Scales</h1>
        </div>
        <p className="text-gray-300 mb-8 leading-relaxed text-lg">
          Your feedback makes LexEye clearer, faster, and more reliable for everyone. 
          Please take a minute to share your thoughts below.
        </p>

        <form
          action="https://formsubmit.co/contact.lexeye78@gmail.com"
          method="POST"
          className="flex flex-col gap-10"
        >
          {/* Contact Info */}
          <div className="transition-all duration-300 hover:shadow-[0_0_15px_rgba(137,162,166,0.3)] p-5 rounded-xl">
            <h2 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              👤 Your Details
            </h2>

            {/* Name */}
            <div className="mb-4">
              <label className="block font-semibold mb-2">Your Name:</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                required
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-gray-700 text-white 
                  focus:outline-none focus:border-[#89a2a6] focus:shadow-[0_0_10px_#89a2a6] transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold mb-2">📧 Your Email:</label>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                required
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-gray-700 text-white 
                  focus:outline-none focus:border-[#89a2a6] focus:shadow-[0_0_10px_#89a2a6] transition"
              />
            </div>
          </div>

          {/* Section A */}
          <div className="transition-all duration-300 hover:shadow-[0_0_15px_rgba(137,162,166,0.3)] p-5 rounded-xl">
            <h2 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              A. Clarity and Content
            </h2>

            {/* Topic Reviewed */}
            <div className="mb-4 relative">
              <label className="block font-semibold mb-2">📂 Which topic did you review?</label>
              <select
                name="topicReviewed"
                required
                className="w-full px-4 py-3 pr-10 rounded-lg bg-black/30 border border-gray-700 text-white 
                  focus:outline-none focus:border-[#89a2a6] focus:shadow-[0_0_10px_#89a2a6] transition appearance-none"
              >
                <option value="" disabled selected className="text-gray-400">
                  Select Category
                </option>
                <option>Tenancy Rights</option>
                <option>Workplace Issues</option>
                <option>Harassment</option>
                <option>Digital Safety</option>
                <option>Consumer Issues</option>
                <option>Other / Missing Topic</option>
              </select>
              <span className="absolute right-3 top-[3.5rem] -translate-y-1/2 text-gray-400 pointer-events-none">
                ▼
              </span>
            </div>

            {/* Clarity Rating */}
            <div className="mb-4">
              <label className="block font-semibold mb-2">⚖️ How clear was the content?</label>
              <input
                type="range"
                name="clarity"
                min="1"
                max="5"
                value={clarity}
                onChange={(e) => setClarity(e.target.value)}
                className="w-full cursor-pointer accent-[#89a2a6] hover:accent-[#a3c8cc] transition"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Too Complex</span>
                <span>Perfectly Clear</span>
              </div>
            </div>

            {/* Accuracy */}
            <div>
              <label className="block font-semibold mb-2">✅ Was the content accurate?</label>
              <div className="flex gap-6 text-gray-300">
                {["Yes", "No", "Unsure"].map((val, i) => (
                  <label key={i} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="accuracy"
                      value={val}
                      required={val === "Yes"}
                      className="peer hidden"
                    />
                    <span className="w-4 h-4 rounded-full border border-gray-500 flex items-center justify-center 
                      peer-checked:bg-[#89a2a6] peer-checked:border-[#89a2a6] transition"></span>
                    <span className="group-hover:text-[#89a2a6]">{val}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Section B */}
          <div className="transition-all duration-300 hover:shadow-[0_0_15px_rgba(137,162,166,0.3)] p-5 rounded-xl">
            <h2 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              B. Usability and Performance
            </h2>

            {/* Feature */}
            <div className="mb-4">
              <label className="block font-semibold mb-2">💻 Which feature are you commenting on?</label>
              <div className="flex flex-col gap-2 text-gray-300">
                {["Search", "Bookmarks", "Categories", "UI/Design", "Offline Mode"].map((val, i) => (
                  <label key={i} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="featureFocus"
                      value={val}
                      required={val === "Search"}
                      className="peer hidden"
                    />
                    <span className="w-4 h-4 rounded-full border border-gray-500 flex items-center justify-center 
                      peer-checked:bg-[#89a2a6] peer-checked:border-[#89a2a6] transition"></span>
                    <span className="group-hover:text-[#89a2a6]">{val}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Speed Rating */}
            <div className="mb-4">
              <label className="block font-semibold mb-2">⚡ How fast was your experience?</label>
              <input
                type="range"
                name="speed"
                min="1"
                max="5"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
                className="w-full cursor-pointer accent-[#89a2a6] hover:accent-[#a3c8cc] transition"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Too Slow</span>
                <span>Instantly Fast</span>
              </div>
            </div>

            {/* Bug Report */}
            <div>
              <label className="block font-semibold mb-2">🐞 Describe any issue or bug:</label>
              <textarea
                name="bugDescription"
                placeholder="E.g., Search button didn’t work..."
                rows="3"
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-gray-700 text-white 
                  focus:outline-none focus:border-[#89a2a6] focus:shadow-[0_0_10px_#89a2a6] transition"
              ></textarea>
            </div>
          </div>

          {/* Section C */}
          <div className="transition-all duration-300 hover:shadow-[0_0_15px_rgba(137,162,166,0.3)] p-5 rounded-xl">
            <h2 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              C. General Contribution
            </h2>

            {/* Suggestion */}
            <div className="mb-4">
              <label className="block font-semibold mb-2">💡 Suggest a new topic we should cover:</label>
              <input
                type="text"
                name="newTopic"
                placeholder="E.g., Traffic Fines..."
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-gray-700 text-white 
                  focus:outline-none focus:border-[#89a2a6] focus:shadow-[0_0_10px_#89a2a6] transition"
              />
            </div>

            {/* Satisfaction */}
            <div>
              <label className="block font-semibold mb-2">😀 Overall, how satisfied are you?</label>
              <div className="flex gap-4 text-2xl">
                {["😞", "😐", "🙂", "😀", "🤩"].map((emoji, i) => (
                  <label key={i} className="cursor-pointer transition-transform hover:scale-125">
                    <input
                      type="radio"
                      name="satisfaction"
                      value={i + 1}
                      required={i === 0}
                      className="hidden peer"
                    />
                    <span className="peer-checked:drop-shadow-[0_0_8px_#89a2a6]">{emoji}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Hidden Redirects */}
          <input type="hidden" name="_next" value="https://lexeye.vercel.app/" />
          <input type="hidden" name="_captcha" value="false" />

          {/* Submit */}
          <button
            type="submit"
            className="bg-[#89a2a6] text-[#08292e] py-3 px-6 rounded-lg font-semibold transition-all duration-300 
              hover:bg-[#08292e] hover:text-[#89a2a6] hover:shadow-[0_0_15px_#89a2a6] hover:border hover:border-[#89a2a6] active:scale-95"
          >
            Submit My Insights
          </button>
        </form>
      </div>
    </div>
  );
}
