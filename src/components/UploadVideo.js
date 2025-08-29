import React, { useState } from "react";

const API_BASE = "https://videos-edaxbna0g4b9fqc5.northeurope-01.azurewebsites.net";

export default function UploadVideo() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [genre, setGenre] = useState("");
  const [ageRating, setAgeRating] = useState("");
  const [status, setStatus] = useState("");

  async function handleUpload(e) {
    e.preventDefault();
    setStatus("");

    if (!file) { setStatus("Please choose a video file."); return; }

    const token = localStorage.getItem("token");
    if (!token) { setStatus("Not authenticated."); return; }

    const formData = new FormData();
    // ⚠️ Match this key with your backend interceptor/handler:
    formData.append("video", file); 
    formData.append("title", title);
    formData.append("publisher", publisher);
    formData.append("genre", genre);
    formData.append("ageRating", ageRating);

    try {
      const res = await fetch(`${API_BASE}/videos/upload`, {
        method: "POST",
        // Do NOT set Content-Type when sending FormData.
        // Let the browser add the correct multipart boundary.
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
        mode: "cors",
      });

      // Handle non-2xx clearly
      const isJson = res.headers.get("content-type")?.includes("application/json");
      const payload = isJson ? await res.json().catch(() => ({})) : {};
      if (!res.ok) {
        throw new Error(payload.message || `Upload failed (${res.status})`);
      }

      setStatus(payload.message || "Uploaded successfully.");
    } catch (err) {
      setStatus(err.message || "Network error – check CORS.");
    }
  }

  return (
    <div>
      <h2>Upload Video</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept="video/*" onChange={e => setFile(e.target.files?.[0] ?? null)} />
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="Publisher" value={publisher} onChange={e => setPublisher(e.target.value)} />
        <input placeholder="Genre" value={genre} onChange={e => setGenre(e.target.value)} />
        <input placeholder="Age Rating" value={ageRating} onChange={e => setAgeRating(e.target.value)} />
        <button type="submit">Upload</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}
