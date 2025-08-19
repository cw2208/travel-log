import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, set as firebaseSet } from 'firebase/database';

export function CreateMemoryBook({ user }) {
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const db = getDatabase();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !user) {
      return;
    }

    const newMemoryBook = {
      img: img || "../../public/img/grey-book.jpg", // Default placeholder if no image
      createdAt: Date.now(),
    };

    const memoryBookRef = ref(db, `${user.userId}/${name}`);
    firebaseSet(memoryBookRef, newMemoryBook)
      .then(() => {
        console.log(`Memory book "${name}" added successfully to Firebase`);
        navigate("/memory-books");
      })
      .catch((error) => {
        console.error('Error adding memory book:', error);
      });
  };

  return (
    <div>
      <header>
        <h1 className='create-mbook-title'>Create a New Memory Book</h1>
      </header>
      <main>
        <form className="mbook-form" onSubmit={handleSubmit}>
          <label className="mbook-input">
            Memory Book Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter memory book name"
              required
            />
          </label>
          <label className="mbook-input">
            Upload Cover Image (optional):
            <input
              type="file"
              id="fileUpload"
              name="fileUpload"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          {preview && (
            <div className="img-preview">
              <p>Preview:</p >
              < img src={preview} alt="Preview" className="preview-image" />
            </div>
          )}
          <button type="submit" className="btn btn-primary">Create Memory Book</button>
        </form>
      </main>
    </div>
  );
}