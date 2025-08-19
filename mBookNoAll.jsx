import { getDatabase, ref, onValue } from "firebase/database";

export function mBookNoAll({ setMemoryBooks, user, currentBook }) {
  if (!user) {
    setMemoryBooks([]); 
    return;
  }

  const db = getDatabase();
  const userRef = ref(db, `${user.userId}`);

  onValue(userRef, (snapshot) => {
    const mbooksObj = snapshot.val();

    if (mbooksObj) {
      const books = Object.keys(mbooksObj).filter(
        (title) => title !== "All Logs" && title !== currentBook
      );
      setMemoryBooks(books); 
    } else {
      setMemoryBooks([]);
    }
  });
}

