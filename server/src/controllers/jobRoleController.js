const prisma = require("../services/prisma");

const getJobRoles = async (req, res) => {
    try {
        const jobRoles = await prisma.jobRole.findMany({
            orderBy: {
                name: "asc"
            }
        });

        res.json({
            success: true,
            jobRoles
        });
    } catch (error) {
        console.error("Get job roles error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    getJobRoles
};