import express from "express";

const app = express();

process.on("uncaughtException", (err) => {
  console.error("uncaughtException:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection:", err);
});

app.use((req, res, next) => {
  console.log("REQ", req.method, req.url);
  next();
});

app.get("/ping", (req, res) => {
  console.log("PING HANDLER");
  res.send("pong");
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Listening on 0.0.0.0:3000");
});