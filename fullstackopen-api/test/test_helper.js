const { Note } = require("../db/note");
const User = require("../db/user");

const initialNotes = [
  {
    content: "HTML is easy",
    important: false,
  },
  {
    content: "Browser can execute only JavaScript",
    important: true,
  },
];

const nonExistingId = async () => {
  const note = new Note({ content: "test_hl233", important: false });
  await note.save();
  await note.deleteOne();

  return note._id.toString();
};

const notesInDb = async () => {
  const notes = await Note.find({});

  return notes;
};

const deleteOne = async (id) => {
  await Note.deleteOne({ _id: id });
};

// 查询数据库中的用户列表
const usersInDb = async () => {
  const users = await User.find({});
  if (users) {
    return users.map((u) => u.toJSON());
  } else {
    return [];
  }
};

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
  deleteOne,
  usersInDb,
};
