import axios from "axios";

const API = "https://lex-eye-backend.vercel.app/api/bookmarks";
const LOCAL_KEY = "offlineBookmarks";
const PENDING_SYNC_KEY = "pendingBookmarkActions";

// --- Load Local ---
export const loadLocalBookmarks = () =>
  JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");

// --- Save Local ---
export const saveLocalBookmarks = (bookmarks) =>
  localStorage.setItem(LOCAL_KEY, JSON.stringify(bookmarks));

// --- Sync from server on login ---
export const Server = async (token) => {
  try {
    const res = await axios.get(API, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data.bookmarks || [];
    saveLocalBookmarks(data);
    return data;
  } catch (err) {
    console.error("⚠️ Sync from server failed:", err.message);
    return loadLocalBookmarks();
  }
};

// --- Add Bookmark ---
export const addBookmark = async (law, token) => {
  const current = loadLocalBookmarks();
  if (!current.some((b) => b._id === law._id)) {
    const updated = [...current, law];
    saveLocalBookmarks(updated);
  }

  // Online Sync
  if (navigator.onLine && token) {
    try {
      await axios.post(
        `${API}/add`,
        { lawId: law._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.warn("⚠️ Add bookmark sync failed, queueing:", err.message);
      queueSyncAction({ type: "add", law });
    }
  } else {
    queueSyncAction({ type: "add", law });
  }
};

// --- Remove Bookmark ---
export const removeBookmark = async (lawId, token) => {
  const updated = loadLocalBookmarks().filter((b) => b._id !== lawId);
  saveLocalBookmarks(updated);

  // Online Sync
  if (navigator.onLine && token) {
    try {
      await axios.delete(`${API}/${lawId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.warn("⚠️ Remove bookmark sync failed, queueing:", err.message);
      queueSyncAction({ type: "remove", lawId });
    }
  } else {
    queueSyncAction({ type: "remove", lawId });
  }
};

// --- Queue offline sync actions ---
const queueSyncAction = (action) => {
  const pending = JSON.parse(localStorage.getItem(PENDING_SYNC_KEY) || "[]");
  pending.push(action);
  localStorage.setItem(PENDING_SYNC_KEY, JSON.stringify(pending));
};

// --- Process pending syncs on reconnect ---
export const processPendingSyncs = async (token) => {
  const pending = JSON.parse(localStorage.getItem(PENDING_SYNC_KEY) || "[]");
  if (pending.length === 0 || !navigator.onLine) return;

  for (const action of pending) {
    try {
      if (action.type === "add") {
        await axios.post(
          `${API}/add`,
          { lawId: action.law._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else if (action.type === "remove") {
        await axios.delete(`${API}/${action.lawId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (err) {
      console.warn("⚠️ Sync failed for", action, err.message);
    }
  }

  localStorage.removeItem(PENDING_SYNC_KEY);
};
