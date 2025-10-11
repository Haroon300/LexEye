import axios from "axios";

// Base API (e.g. https://lex-eye-backend.vercel.app/api/bookmarks)
const API = ("https://lex-eye-backend.vercel.app/api/bookmarks");

// --- Normalize backend response ---
const normalize = (arr = []) =>
  arr
    .map((b) => {
      if (!b) return null;

      // Expected backend shape: { _id, section, legalConcept, ... }
      if (b._id && b.section) return b;

      // Sometimes backend may send nested law objects (if populated)
      if (b.lawId && typeof b.lawId === "object") return b.lawId;

      // In case of simple string IDs
      if (typeof b === "string") return { _id: b };

      return null;
    })
    .filter(Boolean);

// --- Get bookmarks (from backend) ---
export const getBookmarks = async (token) => {
  try {
    const res = await axios.get(API, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    // Controller returns { success, bookmarks: [...] }
    const raw = res.data?.bookmarks ?? [];
    const laws = normalize(raw);

    // Save normalized bookmarks to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(laws));

    return laws;
  } catch (err) {
    console.error("getBookmarks error:", err.response?.data || err.message);
    return [];
  }
};

// --- Add a new bookmark ---
export const addBookmark = async (lawId, token) => {
  try {
    await axios.post(
      `${API}/add`,
      { lawId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Refresh local copy after successful addition
    return await getBookmarks(token);
  } catch (err) {
    console.error("addBookmark error:", err.response?.data || err.message);
    throw err;
  }
};

// --- Remove a bookmark ---
export const removeBookmark = async (lawId, token) => {
  try {
    await axios.delete(`${API}/${lawId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Refresh local copy after removal
    return await getBookmarks(token);
  } catch (err) {
    console.error("removeBookmark error:", err.response?.data || err.message);
    throw err;
  }
};

// --- Alias for backward compatibility ---
export const syncBookmarks = getBookmarks;
