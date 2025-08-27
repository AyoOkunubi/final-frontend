import React, { useState } from "react";
import Auth from "./components/Auth";
import VideoDashboard from "./components/VideoDashboard";
import UploadVideo from "./components/UploadVideo";

function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  function logout() {
    localStorage.clear();
    setUser(null);
  }

  return (
    <div>
      <h1>Video Sharing App</h1>
      {!user ? (
        <Auth setUser={setUser} />
      ) : (
        <div>
          <p>Welcome {user.email} ({user.roles.join(", ")})</p>
          <button onClick={logout}>Logout</button>
          {user.roles.includes("creator") && <UploadVideo />}
          <VideoDashboard user={user} />
        </div>
      )}
    </div>
  );
}

export default App;
