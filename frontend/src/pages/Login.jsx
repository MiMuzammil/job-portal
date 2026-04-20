import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        navigate("/"); // ✅ redirect after login
      } else {
        alert(data.msg);
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>🔐 Login</h2>

        <input
          style={styles.input}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#0f172a,#1e293b)",
  },
  card: {
    padding: "30px",
    borderRadius: "12px",
    background: "#1e293b",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "300px",
  },

  title: {
     marginBottom: "20px",
   },

   topBar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
  },
  button: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    background: "#3b82f6",
    color: "#fff",
    cursor: "pointer",
  },
};