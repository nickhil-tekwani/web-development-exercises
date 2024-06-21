import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// GET: extra endpoint added to a service for the sole purpose of expressing its availability
app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/todos", async (req, res) => {
  const posts = await prisma.todoItem.findMany({
    where: {
      author: {
        email: "cristian.penarrieta@gmail.com",
      },
    },
  });
  res.json(posts);
});

// creates a todo item 
app.post("/todo", async (req, res) => {
  const { title, authorEmail } = req.body;
  const todoItem = await prisma.todoItem.create({
    data: {
      title,
      author: { connect: { email: authorEmail } },
    },
  });
  res.json(todoItem);
});

// deletes a todo item by id
app.delete(`/todo/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.delete({
    where: {
      id: Number(id),
    },
  })
  res.json(post)
})

// get a todo item by id
app.get('/todo/:id', async (req, res) => {
  const { id } = req.params
  const posts = await prisma.post.findMany({
    where: { id: id },
    // include: { author: true },
  })
  res.json(posts)
})

// updates a todo item by id
app.put('/todo/:id', async (req, res) => {
  const { id } = req.params
  const { title, authorEmail } = req.body;
  const post = await prisma.post.update({
    where: { id: Number(id) },
    data: {
      title,
      author: { connect: { email: authorEmail } },
    },
  })
  res.json(post)
})

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000 🎉 🚀");
});
