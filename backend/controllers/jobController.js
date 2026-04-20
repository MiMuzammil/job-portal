import Job from "../models/Job.js";

/* ================= CREATE JOB (ADMIN) ================= */
export const createJob = async (req, res) => {
  try {
    const { title, company, location, description } = req.body;

    // Validation
    if (!title || !company || !location || !description) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const job = await Job.create({
      title,
      company,
      location,
      description,
      createdBy: req.user.id, // track creator
    });

    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

/* ================= GET ALL JOBS ================= */
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

/* ================= APPLY JOB ================= */
export const applyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }

    // Prevent duplicate apply
    if (job.applicants.includes(req.user.id)) {
      return res.status(400).json({ msg: "Already applied" });
    }

    job.applicants.push(req.user.id);
    await job.save();

    res.json({ msg: "Applied successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

/* ================= GET MY APPLICATIONS ================= */
export const getMyApplications = async (req, res) => {
  try {
    const jobs = await Job.find({
      applicants: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

/* ================= ADMIN: VIEW APPLICANTS ================= */
export const getApplicants = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "applicants",
      "name email"
    );

    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }

    res.json(job.applicants);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

/* ================= ADMIN: DELETE JOB ================= */
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }

    await job.deleteOne();

    res.json({ msg: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};