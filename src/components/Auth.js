import React, { useState } from "react";
import { apiRequest } from "../api";

export default function Auth({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("consumer");
  const [isLogin, setIsLogin] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    const path = isLogin ? "/auth/login" : "/auth/signup";
    const body = { email, password, ...(isLogin ? {} : { role }) };
    const data = await apiRequest(path, "POST", body, false);
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    } else {
      alert(data.error || "Auth failed");
    }
  }

  return (
    <div>
      <h2>{isLogin ? "Login" : "Signup"}</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        {!isLogin && (
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="consumer">Consumer</option>
            <option value="creator">Creator</option>
          </select>
        )}
        <button type="submit">{isLogin ? "Login" : "Signup"}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Switch to Signup" : "Switch to Login"}
      </button>
    </div>
  );
}
