import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from "./SearchBar";
import { useState, useEffect } from 'react';
import { deleteMemoryBook, mBookList } from './journal/mbookList';

export function LogSection({ mBookArray, onDelete }) {
  const mbooks = mBookArray.map((mbook) => (
    <div className="log-item-wrapper" key={mbook.title}>
      <Link to={`/memory-books/${encodeURIComponent(mbook.title.toLowerCase().replace(/\s+/g, '-'))}`} className="log-link">
        <div className="log-item">
          <img src={mbook.img} alt={mbook.title} />
          <h2>{mbook.title}</h2>
          {mbook.title !== "All Logs" && (
            <button
              className="delete-btn"
              onClick={(e) => {
                e.preventDefault(); 
                onDelete(mbook.title);
              }}
            >
              Delete
            </button>
          )}
        </div>
      </Link>
    </div>
  ));

  return (
    <div>
      <div className="actions">
        <Link to="/create-memory-book" className="btn create-memory-book-btn">
          + Create New Memory Book
        </Link>
      </div>
      <div className="logs">{mbooks}</div>
    </div>
  );
}


export function MemoryBooks({ user }) {
  const [mBookArray, setMemoryBooks] = useState([]); 

  useEffect(() => {
    if (user) {
      mBookList({ setMemoryBooks, user });
    } else {
      setMemoryBooks([]);
    }
  }, [user]);

  const handleDelete = (title) => {
    if (user) {
      deleteMemoryBook({ title, user, setMemoryBooks });
    }
  };

  return (
    <div>
      <header className="header-with-img">
        <div className="mylog-profile">
          <img src="img/pfp.jpg" alt="Profile" className="circle-profile-pic" />
          {user ? <h1>{user.userName}</h1> : <h1></h1>}
        </div>
      </header>
      <main>
        <SearchBar user={user} />
        <LogSection mBookArray={mBookArray} onDelete={handleDelete} />
      </main>
    </div>
  );
}
