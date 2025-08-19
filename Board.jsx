import { BoardLog } from "./board/BoardLog"
import { BackButton } from "./BackButtion"
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { SortButton } from "./board/SortButton";
import { NavLink } from "react-router-dom";

import sortBy from 'lodash/sortBy';

import { onValue, ref } from "firebase/database";
import { db } from "../firebase/firebase";

export function Board({ user }) {

    const { bookId } = useParams();

    const [logsInBook, setLogsInBook] = useState([]);
    const [logTitle, setLogTitle] = useState('');
    const [isAscending, setIsAscending] = useState(null);
    const [isEmptyBook, setIsEmptyBook] = useState(true);

    useEffect(() => {
        const decodedBookId = decodeURIComponent(bookId);
        console.log("Decoded BookId:", decodedBookId);

        const userRef = ref(db, `${user.userId}`);

        const unsubscribe = onValue(userRef, (snapshot) => {
            const usersData = snapshot.val();
            console.log("usersData:", usersData);

            if (usersData) {
                for (const bookTitle in usersData) {
                    if (encodeURIComponent(bookTitle.toLowerCase().replace(/\s+/g, '-')) === decodedBookId) {
                        setLogTitle(bookTitle);

                        console.log(usersData[bookTitle].isNew)
                        console.log(Object.keys(usersData[bookTitle]))
                        const logsArray = Object.keys(usersData[bookTitle])
                            .filter(logId => typeof usersData[bookTitle][logId] === 'object' && usersData[bookTitle][logId] !== null) //this is helped with AI.
                            .map(logId => ({
                                id: logId,
                                ...usersData[bookTitle][logId],
                            }));

                        setLogsInBook(logsArray);

                        if (logsArray.length == 0) {
                            setIsEmptyBook(true);
                        } else {
                            setIsEmptyBook(false);
                        }
                        return;
                    } else {
                        setLogsInBook([]); 
                    }
                }
            }
        });

        return () => unsubscribe(); 
    }, [bookId, user.userId]); 


    const handleClick = (event) => {
        if (isAscending === null) {
            setIsAscending(false);
        } else if (isAscending === false) {
            setIsAscending(true);
        } else if (isAscending === true) {
            setIsAscending(null);
        }
    };

    
    const sortedArray = isAscending === null
        ? logsInBook
        : isAscending === false //This part has help with AI.
            ? sortBy(logsInBook, 'start').reverse()
            : sortBy(logsInBook, 'start');

    console.log(isEmptyBook)
    console.log(sortedArray) 

    if (isEmptyBook) {
        return (
            <div>
                <main>
                    <div className='log-back-sort'>
                        <BackButton />
                    </div>

                    <div className="board-title">
                        <h1>{logTitle}</h1>
                        <SortButton
                            name="time"
                            onClick={handleClick}
                            ascending={isAscending}
                            active={isAscending === true || isAscending === false} />
                    </div>

                    <div className="board-empty-message">
                        <p>It is an empty memory book, click the button below to recrod your memory!</p>
                        <NavLink to="/create" className="nav-link">
                            Start Your Journey
                        </NavLink>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div>
            <main>
                <div className='log-back-sort'>
                    <BackButton />
                </div>

                <div className="board-title">
                    <h1>{logTitle}</h1>
                    <SortButton
                        name="time"
                        onClick={handleClick}
                        ascending={isAscending}
                        active={isAscending === true || isAscending === false} />
                </div>

                <div className="all-board">
                    <BoardLog logData={sortedArray}
                        userId={user.userId}
                        bookTitle={logTitle} />
                </div>
            </main>
        </div>
    );
}
