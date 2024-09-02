import express from "express";
import cors from "cors";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users = [];

const app = express();
app.use(express.json());
app.use(cors());


// Get all users
app.get("/usuarios", async (req, res) => {
    const users = await prisma.user.findMany();

    res.status(201).json(users); // Changed status code to 200 for successful GET request
});

// Create a new user
app.post("/usuarios", async (req, res) => {
    const newUser = await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
        },
    });
    res.status(201).json(newUser);
});
app.put("/usuarios/:id", async (req, res) => {
    const user = await prisma.user.update({
        where: {
            id: req.params.id,
        },
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
        },
    });
    res.status(200).json(user);
});
app.delete("/usuarios/:id", async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id,
        },
    });
    res.status(200).json({ mensagem: "Usuario deletato com sucesso" });
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});

/*
mo
bryanzikabm 
GDYcNjkad0WTtSNY
*/
