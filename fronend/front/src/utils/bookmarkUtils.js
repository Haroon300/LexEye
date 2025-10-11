import axios from "axios";

const API = (import.meta.env.VITE_API_URL || "") + "/bookmarks";

// --- Normalize backend response ---
const normalize = (arr = []) =>
  arr
    .map((b) => {
      if (!b) return null;

      if (b._id && b.section) return b; // Already a law object
      if (b.lawId && typeof b.lawId === "object") return b.lawId; // Populated case
      if (typeof b === "string") return { _id: b }; // String-only case

      return null;
    })
    .filter(Boolean);

// --- Get bookmarks from backend ---
export const getBookmarks = async (token) => {
  try {
    const res = await axios.get(API, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    const raw = res.data?.bookmarks ?? [];
    const laws = normalize(raw);
    localStorage.setItem("bookmarks", JSON.stringify(laws));
    return laws;
  } catch (err) {
    console.error("getBookmarks error:", err.response?.data || err.message);
    return [];
  }
};

// --- Add bookmark ---
export const addBookmark = async (lawId, token) => {
  try {
    await axios.post(
      `${API}/add`,
      { lawId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return await getBookmarks(token);
  } catch (err) {
    console.error("addBookmark error:", err.response?.data || err.message);
    throw err;
  }
};

// --- Remove bookmark ---
export const removeBookmark = async (lawId, token) => {
  try {
    await axios.delete(`${API}/${lawId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await getBookmarks(token);
  } catch (err) {
    console.error("removeBookmark error:", err.response?.data || err.message);
    throw err;
  }
};

// --- Alias ---
export const syncBookmarks = getBookmarks;
