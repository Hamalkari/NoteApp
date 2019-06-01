const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Создаем схему
const NoteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

// Создаем модель
const Note = mongoose.model("Note", NoteSchema);

// Экспортируем модель
module.exports = Note;
