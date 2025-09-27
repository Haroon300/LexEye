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
            className="p-3 rounded-lg text-black"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="p-3 rounded-lg text-black"
            required
          />
          <textarea
            name="message"
            placeholder="Write your comment here..."
            required
            className="p-3 rounded-lg text-black"
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
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
