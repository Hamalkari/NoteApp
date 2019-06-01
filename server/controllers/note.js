const Note = require("../models/note");

module.exports = {
  getNotes: async (req, res) => {
    try {
      const notes = await Note.find({}).sort({ updatedAt: "descending" });
      res.status(200).json({ status: "success", notes });
    } catch (error) {
      res.json({ status: "error", title: `${error}` });
    }
  },
  createNote: async (req, res) => {
    try {
      const { title, body } = req.body;
      const note = new Note({ title, body });
      await note.save();
      res
        .status(200)
        .json({ status: "success", title: "Запись успешно добавлена" });
    } catch (error) {
      res.json({ status: "error", title: `${error}` });
    }
  },
  updateNote: async (req, res) => {
    try {
      const { title, body } = req.body;
      const note = await Note.findByIdAndUpdate(
        req.params.id,
        { title, body },
        {
          new: true
        }
      );
      res.status(200).json({ status: "success", note });
    } catch (error) {
      res.json({ status: "error", title: `${error}` });
    }
  },
  deleteNote: async (req, res) => {
    try {
      await Note.findByIdAndRemove(req.params.id);
      res
        .status(200)
        .json({ status: "success", title: "Заметка успешна удалена" });
    } catch (error) {
      res.json({ status: "error", title: `${error}` });
    }
  }
};
