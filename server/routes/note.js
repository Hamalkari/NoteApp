const express = require("express");
const notes = express.Router();
const controller = require("../controllers/note");

notes.get("/list", controller.getNotes);
notes.post("/create", controller.createNote);
notes.put("/update/:id", controller.updateNote);
notes.delete("/delete/:id", controller.deleteNote);
module.exports = notes;
