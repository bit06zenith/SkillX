const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const jobRoleRoutes = require("./routes/jobRoleRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/job-roles", jobRoleRoutes);

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Skill Gap Analyzer API is running"
    });
});

module.exports = app;