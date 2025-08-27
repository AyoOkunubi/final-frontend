import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";

export default function Comments({ videoId, user }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    apiRequest(`/comments/${videoId}`, "GET", null, false).then(setComments);
  }, [videoId, ]);

  async function postComment(e) {
    e.preventDefault();
    const data = await apiRequest(`/comments/${videoId}`, "POST", { text });
    if (!data.error) {
      setComments([...comments, data]);
      setText("");
    }
  }

  return (
    <div>
      <h4>Comments</h4>
      {comments.map((c, i) => (
  <p key={i}>
    {c.text} :<b>{c.user}</b>
    {/* {c.sentiment && ` (Sentiment: ${c.sentiment.label}, Score: ${c.sentiment.score})`} */}
  </p>
))}

      {user && (
        <form onSubmit={postComment}>
          <input value={text} onChange={e => setText(e.target.value)} placeholder="Add a comment" />
          <button type="submit">Post</button>
        </form>
      )}
    </div>
  );
}
