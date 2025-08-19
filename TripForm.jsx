import React, { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getDatabase, ref, onValue } from "firebase/database";

export function TripForm({ onTripDataChange, user }) {
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [memoryBooks, setMemoryBooks] = useState([]);
  const [memoryBook, setMemoryBook] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const calendarRef = useRef(null);

  const db = getDatabase();

  useEffect(() => {
    if (!user) return;

    const userRef = ref(db, `${user.userId}`);
    onValue(userRef, (snapshot) => {
      const mbooksObj = snapshot.val() || {};
      const books = ["All Logs", ...Object.keys(mbooksObj).filter((book) => book !== "All Logs")];
      setMemoryBooks(books);
    });
  }, [user, db]);

  useEffect(() => {
    if (memoryBooks.length > 0 && !memoryBook) {
      setMemoryBook(memoryBooks[0]);
    }
  }, [memoryBooks]);

  const toggleCalendar = () => setCalendarVisible((prev) => !prev);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setCalendarVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="wholeInputArea-container">
      <form className="input-container" onSubmit={(e) => e.preventDefault()}>
        <div className="input-item journal-title">
          <label>Journal Title: </label>
          <input
            type="text"
            placeholder="Enter your journal title"
            className="inputArea"
            value={title}
            onChange={(e) => {
              const input = e.target.value;
              setTitle(input);

              onTripDataChange({
                title: input,
                destination,
                start: dateRange[0] ? formatDate(dateRange[0]) : null,
                end: dateRange[1] ? formatDate(dateRange[1]) : null,
                memoryBook,
              });
            }}
          />
        </div>

        <div className="input-item destination">
          <label>Destination: </label>
          <input
            type="text"
            placeholder="Enter destination"
            className="inputArea"
            value={destination}
            onChange={(e) => {
              const dest = e.target.value;
              setDestination(dest);
              onTripDataChange({
                title,
                destination: dest,
                start: dateRange[0] ? formatDate(dateRange[0]) : null,
                end: dateRange[1] ? formatDate(dateRange[1]) : null,
                memoryBook,
              });
            }}
          />
        </div>

        <div className="input-item date-area">
          <label>Date: </label>
          <input
            type="text"
            onClick={toggleCalendar}
            className="dateInput"
            placeholder={
              dateRange.length > 0
                ? formatDate(dateRange[0]) + " To " + formatDate(dateRange[1])
                : "Select Date"
            }
            readOnly
          />
          {isCalendarVisible && (
            <div className="calendar-container" ref={calendarRef}>
              <Calendar
                onChange={(range) => {
                  setDateRange(range);
                  onTripDataChange({
                    title,
                    destination,
                    start: range[0] ? formatDate(range[0]) : null,
                    end: range[1] ? formatDate(range[1]) : null,
                    memoryBook,
                  });
                }}
                value={dateRange}
                selectRange
              />
            </div>
          )}
        </div>

        <div className="input-item mbook-choice">
          <label>Memory Book: </label>
          <select
            className="data-input"
            value={memoryBook}
            onChange={(e) => {
              const selectedBook = e.target.value;
              setMemoryBook(selectedBook); 
              console.log("clicked " + selectedBook);

              onTripDataChange({
                title,
                destination,
                start: dateRange[0] ? formatDate(dateRange[0]) : null,
                end: dateRange[1] ? formatDate(dateRange[1]) : null,
                memoryBook: selectedBook, 
              });
            }}
          >
            {memoryBooks.map((book) => (
              <option key={book} value={book}>
                {book}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}













































