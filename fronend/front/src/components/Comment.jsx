import React from "react";

// src/components/Comment.jsx
export default function Comment() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#092226] text-white">
      <div className="max-w-lg w-full bg-[#0e2f34] p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Leave a Comment</h1>
        <form
          action="https://formsubmit.co/YOUR_GMAIL_ADDRESS"
          method="POST"
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-lg bg-black/30 border border-gray-700 text-white focus:outline-none focus:border-[#092226]"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 rounded-lg bg-black/30 border border-gray-700 text-white focus:outline-none focus:border-[#092226]"
            required
          />
          <textarea
            name="message"
            placeholder="Write your comment here..."
            required
            className="w-full px-4 py-3 rounded-lg bg-black/30 border border-gray-700 text-white focus:outline-none focus:border-[#092226]"
            rows="4"
          ></textarea>

          {/* Hidden fields */}
          <input
            type="hidden"
            name="_next"
            value="https://lexeye.vercel.app/"
          />
          <input type="hidden" name="_captcha" value="false" />

          <button
            type="submit"
            className="bg-[#89a2a6] text-[#08292e] py-2 px-4 rounded-lg hover:bg-[#08292e] hover:text-[#89a2a6] transition font-semibold hover:border hover:border-[#89a2a6]"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
