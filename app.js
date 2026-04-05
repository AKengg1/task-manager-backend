import express from "express";
import userRoutes from './routes/users.routes.js'
import tasksRoutes from './routes/tasks.routes.js'

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.use('/app/users', userRoutes)
app.use('/app/tasks', tasksRoutes)

app.get("/", (_, res) => {
  res.redirect("/app");
});

app.get("/app", (_, res) => {
  res.json({ status: "ok" });
});

export default app;
