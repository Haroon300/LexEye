// Save bookmarks in localStorage
export const getBookmarks = () => {
  const data = localStorage.getItem("bookmarks");
  return data ? JSON.parse(data) : [];
};

export const addBookmark = (law) => {
  const bookmarks = getBookmarks();
  // avoid duplicates
  if (!bookmarks.some((item) => item.id === law.id)) {
    bookmarks.push(law);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
};

export const removeBookmark = (id) => {
  const bookmarks = getBookmarks().filter((law) => law.id !== id);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
};

export const isBookmarked = (id) => {
  const bookmarks = getBookmarks();
  return bookmarks.some((law) => law.id === id);
};
