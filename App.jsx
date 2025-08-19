import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Homepage } from "./Homepage";
import { Board } from "./Board";
import { MemoryBooks } from "./MemoryBooks";
import { CreateJournal } from "./CreateJournal";
import { NavigationBar } from "./NavigationBar";
import { Footer } from "./Footer";
import { CreateMemoryBook } from "./CreateMemoryBook";
import { CompleteSubmit } from "./CompleteSubmit.jsx";
import { MoveTo } from "./MoveTo";
import Custom404 from "./NotFound";
import { MySignInScreen } from "./SingInPage.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleCreateMemoryBook = (newBook) => {
    setMemoryBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        console.log("User is logged in:", firebaseUser);
        setCurrentUser({
          userName: firebaseUser.displayName,
          userImg: firebaseUser.photoURL || "/img/plane.jpg",
          userId: firebaseUser.uid,
        });
      } else {
        console.log("No user logged in");
        setCurrentUser(null);
      }
      setIsLoading(false); 
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("User signed out successfully!");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };



  return (
    <>
      <NavigationBar onSignOut={handleSignOut} user={currentUser}/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage user={currentUser}/>} />
        <Route path="/create" element={<CreateJournal user={currentUser}/>} />
        <Route path="/sign-in" element={<MySignInScreen />} />
        <Route
          path="/memory-books"
          element={
            <MemoryBooks
              user={currentUser}
            />
          }
        />
        <Route
          path="/create-memory-book"
          element={<CreateMemoryBook onCreate={handleCreateMemoryBook} user={currentUser} />}
        />
        <Route
          path="/memory-books/:bookId"
          element={<Board user={currentUser} />}
        />
        <Route path="/move-to" element={<MoveTo user= { currentUser }/>} />
        <Route path="/complete-submit" element={<CompleteSubmit />} />
        <Route path="*" element={<Custom404 />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

