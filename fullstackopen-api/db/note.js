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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

noteSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString();
    delete returnObject._id;
    delete returnObject.__v;
  },
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "HTML is Easy",
  date: new Date(),
  important: true,
});

const save = (data, callback) => {
  const n = new Note({
    ...data,
  });
  n.save()
    .then((result) => {
      logger.info("note save");
      callback(result);
    })
    .catch((e) => {
      callback({ error: "新增错误" + e });
    });
};

const find = (query, callback) => {
  Note.find(query)
    .then(async (note) => {
      if (note) {
        callback(note);
      }
    })
    .catch((e) => {
      callback(null);
    });
};

const delById = (query, callback) => {
  Note.deleteOne(query)
    .then((res) => {
      logger.info(res);
      callback(res);
    })
    .catch((e) => {
      callback(null);
    });
};

const updateById = (id, note, callback) => {
  Note.findByIdAndUpdate(id, note, { new: true })
    .then((res) => {
      callback(res);
    })
    .catch((e) => {
      logger.info(e);
      callback(null);
    });
};

module.exports = { find, save, delById, updateById, Note };
