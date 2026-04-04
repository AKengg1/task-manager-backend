import express from "express";
import { tasks, getNextId } from "../data/tasks.js";
const router = express.Router();

router.get("/", (req, res) => {
  const done = req.query.done;
  if (done !== undefined) {
    const isDone = done === true;
    return res.json(tasks.filter((e) => e.done === isDone));
  }
  res.json(tasks);
});

router.get("/:id", (req, res) => {
  const task = tasks.find((e) => e.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.status(200).json(task);
});

router.post("/", (req, res) => {
  const { title, userId } = req.body;
  if (!title || !userId)
    return res.status(400).json({ error: "Title and userid required" });
  const newTask = { id: getNextId(), title, done: false, userId };
  tasks.push(newTask);
  res.json(newTask);
});

router.put("/:id", (req, res) => {
  const { title, done } = req.body;
  const task = tasks.find((e) => e.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });

  if (!title || !done)
    return res.status(400).json({ error: "Title and done status required" });

  task.title = title;
  task.done = done;
  res.json(task);
});

router.delete("/:id", (req, res) => {
  const taskIndex = tasks.findIndex((e) => e.id === Number(req.params.id));
  if (taskIndex === -1)
    return res.status(404).json({ error: "Task not found" });
  const deleted = tasks.splice(taskIndex, 1);
  res.json({ deleted: deleted[0] });
});

export default router;
