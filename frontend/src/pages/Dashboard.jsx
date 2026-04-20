 import { useEffect, useState } from "react";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dark, setDark] = useState(true);

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
  });

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  /* ---------- FETCH JOBS ---------- */
  const fetchJobs = async () => {
    const res = await fetch("http://localhost:5000/api/jobs");
    const data = await res.json();
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  /* ---------- INTERACTIONS (ONLY 3 BUTTONS) ---------- */
  const glowHover = (e) => {
    e.target.style.transform = "scale(1.08)";
    e.target.style.boxShadow = "0 0 12px #3b82f6";
  };

  const glowLeave = (e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.boxShadow = "none";
  };

  const glowClick = (e) => {
    e.target.style.transform = "scale(0.95)";
    e.target.style.boxShadow = "0 0 18px #22d3ee";
  };

  const glowRelease = (e) => {
    e.target.style.transform = "scale(1.08)";
  };

  /* ---------- LOGOUT ---------- */
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  /* ---------- APPLY JOB ---------- */
  const applyJob = async (id) => {
    const res = await fetch(
      `http://localhost:5000/api/jobs/apply/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (res.ok) alert("Applied successfully 🚀");
    else alert(data.msg);
  };

  /* ---------- CREATE JOB ---------- */
  const createJob = async () => {
    const res = await fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Job created ✅");
      setShowModal(false);
      fetchJobs();
    } else {
      alert(data.msg);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: dark
          ? "linear-gradient(135deg,#0f172a,#1e293b)"
          : "#f3f4f6",
        color: dark ? "#fff" : "#000",
      }}
    >
      {/* NAVBAR */}
      <div style={styles.navbar}>
        <h2>🚀 Job Portal</h2>

        <div style={styles.navRight}>
          <span>👤 {user?.email || "User"}</span>

          <button onClick={() => setDark(!dark)}>
            {dark ? "🌙" : "☀️"}
          </button>

          {/* 🔴 LOGOUT (GLOW ENABLED) */}
          <button
            style={styles.logoutBtn}
            onMouseEnter={glowHover}
            onMouseLeave={glowLeave}
            onMouseDown={glowClick}
            onMouseUp={glowRelease}
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div style={styles.container}>
        {/* 🔵 CREATE JOB (GLOW ENABLED) */}
        <button
          style={styles.createBtn}
          onMouseEnter={glowHover}
          onMouseLeave={glowLeave}
          onMouseDown={glowClick}
          onMouseUp={glowRelease}
          onClick={() => setShowModal(true)}
        >
          Create Job
        </button>

        <h2 style={{ margin: "20px 0" }}>💼 Jobs</h2>

        {jobs.map((job) => (
          <div key={job._id} style={styles.card}>
            <h3>{job.title}</h3>
            <p>🏢 {job.company}</p>
            <p>📍 {job.location}</p>
            <p>{job.description}</p>

            {/* 🟢 APPLY (GLOW ENABLED) */}
            <button
              style={styles.applyBtn}
              onMouseEnter={glowHover}
              onMouseLeave={glowLeave}
              onMouseDown={glowClick}
              onMouseUp={glowRelease}
              onClick={() => applyJob(job._id)}
            >
              Apply 🚀
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3>Create Job</h3>

            <input
              placeholder="Title"
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <input
              placeholder="Company"
              onChange={(e) =>
                setForm({ ...form, company: e.target.value })
              }
            />

            <input
              placeholder="Location"
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
            />

            <input
              placeholder="Description"
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
            />

            <div style={{ marginTop: "10px" }}>
              <button onClick={createJob}>Submit</button>
              <button onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "#111827",
    color: "#fff",
  },

  navRight: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },

  logoutBtn: {
    background: "red",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  container: {
    width: "400px",
    margin: "40px auto",
    textAlign: "center",
  },

  createBtn: {
    padding: "10px",
    marginBottom: "10px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  card: {
    background: "#1e293b",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "10px",
  },

  applyBtn: {
    marginTop: "10px",
    padding: "6px 12px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
}; 


