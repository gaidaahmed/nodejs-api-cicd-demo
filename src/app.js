const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const Note = mongoose.model(
  "Note",
  new mongoose.Schema({ text: { type: String, required: true } }, { timestamps: true })
);

app.get("/", (_req, res) => res.send("Hello from Node.js API 🚀"));

app.post("/notes", async (req, res) => {
  try {
    const note = await Note.create({ text: req.body.text });
    res.status(201).json(note);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = app;
