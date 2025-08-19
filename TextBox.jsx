import React, { useState } from 'react';

export function Textarea({ textContent, onTextChange }){
    return(
        <textarea rows= "70" cols="50" placeholder="Write down the highlights of your journey..." 
        value={textContent}
        onChange={(e) => onTextChange(e.target.value)}></textarea>
    )
}


export function ImageInput({ onImageDataChange }) {
    const [previewImage, setPreviewImage] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file || !file.type.startsWith("image/")) {
            alert("Please upload a valid image file.");
            return;
        }

        const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl);

        const imgElem = new Image();
        imgElem.src = imageUrl;

        imgElem.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = imgElem.width;
            canvas.height = imgElem.height;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(imgElem, 0, 0);

            const imageDataString = canvas.toDataURL();


            // Pass the image data to the parent component
            if (onImageDataChange) onImageDataChange(imageDataString);
        };
    };
    return (
        <div className="image-input">
            {previewImage && <img src={previewImage} alt="Preview" width="100" />}
            <input type="file" accept="image/*" onChange={handleFileUpload} />
        </div>
    );
}

export function TextBox({onContentChange, onImageUpload}){
    const [content, setContent] = useState("");
    const [imageData, setImageData] = useState("");
    

    
    return(
        <div className='text-box'>
            <Textarea
                textContent={content}
                onTextChange={(newText) => {
                    setContent(newText);
                    onContentChange(newText);
                }}
            />
            <ImageInput
                onImageDataChange={(newImageData) => {
                    setImageData(newImageData);
                    onImageUpload(newImageData); 
                }}
            />
        </div>
    )
}