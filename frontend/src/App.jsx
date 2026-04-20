import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));


  return (
    <Routes>
      {/* Login */}
      <Route path="/login" element={<Login setToken={setToken} />} />

      {/* Protected Dashboard */}
      <Route
        path="/"
        element={
          <ProtectedRoute token={token}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
 
// function App() {
//   const [jobs, setJobs] = useState([]);
//   const [token, setToken] = useState(localStorage.getItem("token"));

//   const [showModal, setShowModal] = useState(false);
//   const [jobForm, setJobForm] = useState({
//     title: "",
//     company: "",
//     location: "",
//     description: "",
//   });

//   // 🔹 Fetch Jobs
//   const fetchJobs = async () => {
//     const res = await fetch("http://localhost:5000/api/jobs");
//     const data = await res.json();
//     setJobs(data);
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   // 🔹 Logout
//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//     alert("Logged out");
//   };

//   // 🔹 Handle input
//   const handleChange = (e) => {
//     setJobForm({
//       ...jobForm,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // 🔹 Create Job
//   const createJob = async () => {
//     if (!token) return alert("Login first");

//     const res = await fetch("http://localhost:5000/api/jobs", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(jobForm),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       alert("Job created successfully");
//       fetchJobs();
//       setShowModal(false);
//       setJobForm({
//         title: "",
//         company: "",
//         location: "",
//         description: "",
//       });
//     } else {
//       alert(data.msg);
//     }
//   };
// }
//   // 🔹 Apply Job
//   const applyJob = async (id) => {
//     if (!token) return alert("Login first");

//     const res = await fetch(
//       `http://localhost:5000/api/jobs/apply/${id}`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     const data = await res.json();

//     if (res.ok) alert("Applied successfully 🚀");
//     else alert(data.msg);
//   };


//      const styles = {
//   page: {
//     minHeight: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "linear-gradient(135deg, #0f172a, #1e293b)",
//     fontFamily: "Arial",
//   },

//   card: {
//     width: "400px",
//     padding: "30px",
//     borderRadius: "16px",
//     background: "rgba(255,255,255,0.05)",
//     backdropFilter: "blur(10px)",
//     boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
//     textAlign: "center",
//     color: "#fff",
//   },

//   title: {
//     marginBottom: "20px",
//   },

//   topBar: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginBottom: "20px",
//   },

//   logoutBtn: {
//     padding: "8px 14px",
//     borderRadius: "8px",
//     border: "none",
//     background: "#ef4444",
//     color: "white",
//     cursor: "pointer",
//   },

//   createBtn: {
//     padding: "8px 14px",
//     borderRadius: "8px",
//     border: "none",
//     background: "linear-gradient(135deg,#6366f1,#22d3ee)",
//     color: "white",
//     cursor: "pointer",
//   },

//   section: {
//     marginBottom: "15px",
//   },

//   jobCard: {
//     padding: "15px",
//     borderRadius: "12px",
//     background: "#1e293b",
//     marginBottom: "15px",
//     transition: "0.3s",
//   },

//   applyBtn: {
//     marginTop: "10px",
//     padding: "8px 16px",
//     borderRadius: "8px",
//     border: "none",
//     background: "#f59e0b",
//     color: "white",
//     cursor: "pointer",
//   },
// };


//   return (
//   <div style={styles.page}>
//     <div style={styles.card}>
      
//       <h1 style={styles.title}>🚀 Job Portal</h1>

//       <div style={styles.topBar}>
//         <button style={styles.logoutBtn} onClick={logout}>
//           Logout
//         </button>

//         {user?.role === "admin" && (
//           <button style={styles.createBtn} onClick={() => setShowModal(true)}>
//             Create Job
//           </button>
//         )}
//       </div>

//       <h2 style={styles.section}>💼 Available Jobs</h2>

//       {jobs.map((job) => (
//         <div key={job._id} style={styles.jobCard}>
//           <h3>{job.title}</h3>
//           <p>🏢 {job.company}</p>
//           <p>📍 {job.location}</p>
//           <p>{job.description}</p>

//           <button
//             style={styles.applyBtn}
//             onClick={() => applyJob(job._id)}
//           >
//             Apply 🚀
//           </button>
//         </div>
//       ))}

//     </div>
//   </div>
// );