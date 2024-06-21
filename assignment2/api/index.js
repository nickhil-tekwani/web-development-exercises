import express from "express";
import morgan from "morgan";
import cors from "cors";
import {
  getAllcourses,
  findcourseById,
  createcourse,
  updatecourse,
  createRes,
  delCourse,
  generateId
} from "./courseService.js";

import { PrismaClient } from "@prisma/client";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const prisma = new PrismaClient();

// GET: extra endpoint added to a service for the sole purpose of expressing its availability
app.get("/ping", (req, res) => {
  res.send("pong");
});

// GET: list of all courses
app.get("/courses", async (req, res) => {
  const courses = await prisma.course.findMany();
  console.log(courses)
  res.status(200).json(courses);
});

// POST: creates new course
app.post("/courses", async (req, res) => {
    if (typeof req.body.coursename == 'undefined' || req.body.coursename == "") {
        res.status(400).json(createRes("no coursename given!"))
    } else if (typeof req.body.desc == 'undefined' || req.body.desc == "") {
        res.status(400).json(createRes("no desc given!"))
    } else {
      const newCourse = await prisma.course.create({
        data: {
          id: generateId(),
          desc: req.body.desc,
          name: req.body.coursename,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })
        console.log(newCourse)
        res.status(201).json(newCourse);
    }
});

// GET: return course with :id
app.get("/courses/:id", async (req, res) => {
  const course = await prisma.course.findUnique({
    where: {
      id: Number(req.params.id),
    },
  })

  if (course) {
    res.status(200).json(course);
  } else {
    res.status(404).send(`course id ${req.params.id} not found`);
  }
});

// PUT: updates course desc with :id
app.put("/courses/:id", async (req, res) => {
  const updateCourse = await prisma.course.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      desc: req.body.desc,
      updatedAt: new Date(),
    },
  })

  if (updateCourse) {
    res.status(200).send(`${req.params.id} updated`);
  } else {
    res.status(404).send(`course id ${req.params.id} not found`);
  }
});

// DELETE: deletes course desc with :id
app.delete("/courses/:id", async (req, res) => {
  const deleteCourse = await prisma.course.delete({
    where: {
      id: Number(req.params.id),
    },
  })

  if (deleteCourse) {
    res.status(200).send(`${req.params.id} deleted`);
  } else {
    res.status(404).send(`course id ${req.params.id} not found`);
  }
});


// Starts HTTP Server
app.listen(8000, () => {
  console.log("Server running on http://localhost:8000 🎉 🚀");
});
