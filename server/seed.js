require("dotenv").config();

const prisma = require("./src/services/prisma");

const seed = async () => {
    const roles = [
        {
            name: "Full Stack Developer",
            description: "Builds both frontend and backend applications"
        },
        {
            name: "Backend Developer",
            description: "Builds and maintains server-side applications and APIs"
        },
        {
            name: "Frontend Developer",
            description: "Builds user interfaces and frontend applications"
        },
        {
            name: "Data Analyst",
            description: "Analyzes data to generate useful insights"
        },
        {
            name: "Machine Learning Engineer",
            description: "Builds and deploys machine learning systems"
        }
    ];

    for (const role of roles) {
        await prisma.jobRole.upsert({
            where: {
                name: role.name
            },
            update: {
                description: role.description
            },
            create: role
        });
    }

    console.log("Job roles seeded successfully");
};

seed()
    .catch((error) => {
        console.error("Seed error:", error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });