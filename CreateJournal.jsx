import React, { useState } from "react";
import { TripForm } from "./journal/TripForm";
import { TextBox } from "./journal/TextBox";
import { Button } from "./journal/Button";
import { getDatabase, ref, push as firebasePush } from "firebase/database";

export function CreateJournal({ user }) {
    const [tripData, setTripData] = useState({});
    const [textBoxContent, setTextBoxContent] = useState("");
    const [imageData, setImageData] = useState("");
    const db = getDatabase();

    const handleTripDataChange = (data) => {
        setTripData(data);
    };

    const handleSave = () => {
        const newMessageObj = {
            title: tripData.title || "Untitled",
            destination: tripData.destination,
            start: tripData.start || null,
            end: tripData.end || null,
            content: textBoxContent,
            images: imageData,
            timestamp: Date.now(),
        };

        const mBookRef = ref(db, `/${user.userId}/${tripData.memoryBook}`);
        console.log("pushing to " + tripData.memoryBook);
        const allLogsRef = ref(db, `/${user.userId}/All Logs`);
        if (tripData.memoryBook === "All Logs") {
            firebasePush(allLogsRef, newMessageObj);
        } else {
            firebasePush(allLogsRef, newMessageObj);
            firebasePush(mBookRef, newMessageObj);

            console.log("Updating memory book at:", `/${user.userId}/${tripData.memoryBook}`);
        }
        setTripData({});
        setTextBoxContent("");


        console.log("Data written to Firebase");
    };


    return (
        <div>
            <main>
                <h1 className="create-heading">Create Journal</h1>
                <div className="innerBox">
                    <TripForm onTripDataChange={handleTripDataChange} user={user} />
                    <TextBox
                        onContentChange={(content) => setTextBoxContent(content)}
                        onImageUpload={setImageData}
                    />
                    <Button onClick={handleSave} />
                </div>
            </main>
        </div>
    );

}

