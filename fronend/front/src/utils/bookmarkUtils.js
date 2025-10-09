import axios from "axios";

const API = (import.meta.env.VITE_API_URL || "") + "/bookmarks";

// Normalize backend response into an array of law objects with `_id`
const normalize = (arr = []) =>
  arr
    .map((b) => {
      if (!b) return null;

      // backend shape: { _id, userId, lawId: { _id, section, ... } }
      if (b.lawId && typeof b.lawId === "object") return b.lawId;

      // backend could directly return law objects
      if (b._id && b.section) return b;

      // backend might return just the lawId string
      if (typeof b === "string") return { _id: b };

      // already normalized
      if (b._id) return b;

      return null;
    })
    .filter(Boolean);

// --- Get bookmarks (populated) from server and write normalized array to localStorage
export const getBookmarks = async (token) => {
  try {
    const res = await axios.get(API, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    // controller returns { success, count, bookmarks }
    const raw = res.data?.bookmarks ?? res.data ?? [];
    const laws = normalize(Array.isArray(raw) ? raw : []);
    localStorage.setItem("bookmarks", JSON.stringify(laws));
    return laws;
  } catch (err) {
    console.error("getBookmarks error:", err.response?.data || err.message);
    return [];
  }
};

// alias (keeps old name usage)
export const syncBookmarks = getBookmarks;

// --- Add bookmark on server, then refresh localStorage by fetching latest bookmarks
export const addBookmark = async (lawId, token) => {
  try {
    // NOTE: change to `${API}/add` if your server expects POST /bookmarks/add
    await axios.post(API, { lawId }, { headers: { Authorization: `Bearer ${token}` } });

    // refresh local copy
    return await getBookmarks(token);
  } catch (err) {
    console.error("addBookmark error:", err.response?.data || err.message);
    throw err;
  }
};

// --- Remove bookmark on server, then refresh localStorage
export const removeBookmark = async (lawId, token) => {
  try {
    await axios.delete(`${API}/${lawId}`, { headers: { Authorization: `Bearer ${token}` } });

    // refresh local copy
    return await getBookmarks(token);
  } catch (err) {
    console.error("removeBookmark error:", err.response?.data || err.message);
    throw err;
  }
};
