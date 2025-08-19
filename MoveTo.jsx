import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ref, get, set as firebaseSet, remove } from "firebase/database";
import { db } from "../firebase/firebase";
import { mBookNoAll } from "./journal/mBookNoAll";

export function MoveTo({ user }) {
    const location = useLocation();
    const navigate = useNavigate();

    const { userId, bookTitle, logId } = location.state || {};
    const [memoryBooks, setMemoryBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        if (user) {
            mBookNoAll({ setMemoryBooks, user, currentBook: bookTitle });
        }
    }, [user, bookTitle]);

    //handleMove is assisted by AI
    const handleMove = () => {
        if (!selectedBook) {
            console.error("No book selected");
            return;
        }

        const currentRef = ref(db, `${userId}/${bookTitle}/${logId}`);
        const targetRef = ref(db, `${userId}/${selectedBook}/${logId}`);
        
        get(currentRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const logData = snapshot.val();
                    firebaseSet(targetRef, logData)
                        .then(() => {
                            if (bookTitle !== "All Logs") {
                                return remove(currentRef);
                            }
                        })
                        .then(() => {
                            navigate("/memory-books");
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                } else {
                    console.error("Log does not exist.");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const bookList = memoryBooks.map((book) => (
        <button
            className={`mbook-item ${selectedBook === book ? "selected" : ""}`}
            key={book}
            onClick={() => setSelectedBook(book)}
        >
            {book}
        </button>
    ));

    return (
        <main className="move-to">
            <h1>Select a Memory Book</h1>
            <div className="mbook-list">{bookList}</div>
            <div className="moveto-button">
                <button
                    className="moveto-btn btn-cancel"
                    onClick={() => navigate("/memory-books")}
                >
                    Cancel
                </button>
                <button className="moveto-btn btn-move" onClick={handleMove}>
                    Move
                </button>
            </div>
        </main>
    );
}

