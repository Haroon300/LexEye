import axios from "axios";

const API = import.meta.env.VITE_API_URL + "/bookmarks"; // example

// Save bookmark both in DB and localStorage
export const addBookmark = async (lawId, token) => {
  await axios.post(API, { lawId }, { headers: { Authorization: `Bearer ${token}` } });
  const local = JSON.parse(localStorage.getItem("bookmarks")) || [];
  if (!local.includes(lawId)) local.push(lawId);
  localStorage.setItem("bookmarks", JSON.stringify(local));
};

// Remove bookmark
export const removeBookmark = async (lawId, token) => {
  await axios.delete(`${API}/${lawId}`, { headers: { Authorization: `Bearer ${token}` } });
  const local = JSON.parse(localStorage.getItem("bookmarks")) || [];
  const updated = local.filter(id => id !== lawId);
  localStorage.setItem("bookmarks", JSON.stringify(updated));
};

// Get all bookmarks from server and sync to localStorage
export const syncBookmarks = async (token) => {
  const res = await axios.get(API, { headers: { Authorization: `Bearer ${token}` } });
  const ids = res.data.map(b => b.lawId._id);
  localStorage.setItem("bookmarks", JSON.stringify(ids));
  return res.data;
};
