import { getDatabase, ref, onValue, remove } from 'firebase/database';

export function mBookList({ setMemoryBooks, user }) {
  const db = getDatabase();
  
  const memoryBooksRef = ref(db, `${user.userId}`);
  onValue(memoryBooksRef, (snapshot) => {
    if (snapshot.exists()) {
      const books = Object.entries(snapshot.val()).map(([title, data]) => ({
        title,
        img: data.img || "../../public/img/grey-book.jpg", // Default image if none uploaded
      }));
      setMemoryBooks(books);
    } else {
      setMemoryBooks([]);
    }
  });
}

export function deleteMemoryBook({ title, user, setMemoryBooks }) {
  const db = getDatabase();
  const memoryBookRef = ref(db, `${user.userId}/${title}`);

  remove(memoryBookRef)
    .then(() => {
      mBookList({ setMemoryBooks, user });
    })
    .catch((error) => {
      console.error(error);
    });
}








