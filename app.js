import express from "express";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.get("/", (_, res) => {
  res.redirect("/app");
});

app.get("/app", (_, res) => {
  res.json({ status: "ok" });
});

export default app;
