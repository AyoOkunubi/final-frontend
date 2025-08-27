import React, { useState } from "react";

export default function UploadVideo() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [genre, setGenre] = useState("");
  const [ageRating, setAgeRating] = useState("");

  async function handleUpload(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("video", file);
    formData.append("title", title);
    formData.append("publisher", publisher);
    formData.append("genre", genre);
    formData.append("ageRating", ageRating);

    const res = await fetch(process.env.REACT_APP_API_BASE + "/videos/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json();
    alert(data.message || "Uploaded");
  }

  return (
    <div>
      <h2>Upload Video</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="Publisher" value={publisher} onChange={e => setPublisher(e.target.value)} />
        <input placeholder="Genre" value={genre} onChange={e => setGenre(e.target.value)} />
        <input placeholder="Age Rating" value={ageRating} onChange={e => setAgeRating(e.target.value)} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
