
const logger = require('../utils/logger.js');
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  id: String,
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  date: Date,
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString();
    delete returnObject._id;
    delete returnObject.__v;
  },
});

const Note = mongoose.model("NoteTest", noteSchema);

module.exports = {Note}
