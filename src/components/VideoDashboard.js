import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";
import Comments from "./Comments";

export default function VideoDashboard({ user }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    apiRequest("/videos", "GET", null, false).then(setVideos);
  }, []);

  return (
    <div>
      <h2>Latest Videos</h2>
      {videos.map(video => (
        <div key={video.id}>
          <h3>{video.title} ({video.publisher})</h3>
          <video width="300" controls src={video.blobUrl}></video>
          <p>Genre: {video.genre} | Age: {video.ageRating}</p>
          <Comments videoId={video.id} user={user} />
        </div>
      ))}
    </div>
  );
}
