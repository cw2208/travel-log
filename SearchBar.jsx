import React from 'react';
import { useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom"; 

export function SearchBar({ user }) {
    const [logInput, setLogInput] = useState("");
    const [result, setResult] = useState([]);
    const [alertMessage, setAlertMessage] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mBookList, setMBookList] = useState([]);

    if (!user) {
        console.error("No user is logged in.");
        return;
    }

    const id = user.userId;

    const handleSearch = () => {
        if (!id) {
            setAlertMessage(true);
            setResult(null);
            return;
        }

        const db = getDatabase();
        const userRef = ref(db, `${id}`); 
        setIsSearching(true);
        setAlertMessage(false);

        onValue(userRef, (snapshot) => {
            const userData = snapshot.val(); 

            if (!userData) { 
                setAlertMessage(true);
                setIsSearching(false);
                return;
            }

            setIsSearching(true);
            setMBookList([]);

            let found = false;
            for (const memoryBookName in userData) {

                const logs = userData[memoryBookName];

                for (const oneLog in logs) { 
                    const log = logs[oneLog]; 
                    if (!log.title) {
                        continue; 
                    }
                    if (log.title.toLowerCase() == logInput.toLowerCase()) {
                        setMBookList(prevList => [...prevList, memoryBookName]);
                        setResult({ log });
                        setIsModalOpen(true);
                        found = true;
                    }
                }
            }
            if (!found) setAlertMessage(true);
            setIsSearching(false);
        });

    };

    const handleKey = (e) => {
        if (e.code === "Enter") {
            handleSearch();
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setResult(null);
    };

    const handleReadMore = (mBook) => {
        const resultUri = encodeURIComponent(mBook.toLowerCase().replace(/\s+/g, '-'))
        if (result) {
            navigate(`/memory-books/${resultUri}`);
        }
    };

    const mBookBtn = mBookList.map((mBook, index) => (
        <button key={index} className="read-button" onClick={() => handleReadMore(mBook)}>Go to {mBook}</button>
    ))

    return (
        <div className="search-container">
            <input
                type="text"
                aria-label="search bar"
                className="search-input"
                placeholder="Search by title..."
                value={logInput}
                onChange={(e) => setLogInput(e.target.value)}
                onKeyDown={handleKey}
            />
            {isSearching && <p>Searching...</p >}
            {alertMessage && <p className="error-message">No matching logs found!</p >}

            {isModalOpen && result && (
                <div className="modal">
                    <div className="modal-content">

                        <h2>{result.log.title}</h2>
                        <p>{result.log.destination} -  From {result.log.start}to {result.log.end}</p>
                        <p>{result.log.content}</p>
                        {result.log.images && result.log.images !== "" && (
                            <img src={result.log.images} alt={result.log.title} />
                        )}

                        <div className='button-group'>
                            {mBookBtn}
                            <button className="close-button" onClick={closeModal}>Close</button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}