import express from "express";

const app = express();
app.use(express.json());
app.get("/", (req, res, next) => {
  res.send("helllo world");
});
export default app;
