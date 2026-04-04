import express from "express";
import { users, getNextId } from "../data/users.js";
import { tasks } from "../data/tasks.js";
const router = express.Router();

router.get("/", (_, res) => {
  res.json(users);
});

router.get("/:id", (req, res) => {
  const user = users.find((e) => e.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.status(201).json(user);
});

router.get("/:id/tasks", (req, res) => {
  const user = users.find((e) => e.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  const userTasks = tasks.filter((e) => e.userId === Number(req.params.id));
  req.json(userTasks);
});

router.post("/", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email)
    return res.status(401).json({ error: "Name and email required" });
  const newUser = { id: getNextId(), name, email };
  users.push(newUser);
  res.json(newUser);
});

export default router;
