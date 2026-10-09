const prisma = require("../services/prisma");

const getProfile = async (req, res) => {
    try {
        const profile = await prisma.studentProfile.findUnique({
            where: {
                userId: req.user.userId
            },
            include: {
                targetJobRole: true
            }
        });

        res.json({
            success: true,
            profile
        });
    } catch (error) {
        console.error("Get profile error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { branch, semester, targetJobRoleId } = req.body;

        const profile = await prisma.studentProfile.upsert({
            where: {
                userId: req.user.userId
            },
            update: {
                branch,
                semester,
                targetJobRoleId
            },
            create: {
                userId: req.user.userId,
                branch,
                semester,
                targetJobRoleId
            },
            include: {
                targetJobRole: true
            }
        });

        res.json({
            success: true,
            message: "Profile updated successfully",
            profile
        });
    } catch (error) {
        console.error("Update profile error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    getProfile,
    updateProfile
};