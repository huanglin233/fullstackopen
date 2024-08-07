const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../db/user");

usersRouter.post("/add", async (request, response) => {
  const { username, name, password } = request.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const saveUser = await user.save();

  response.status(200).json(saveUser);
});

usersRouter.get("/list", async (request, response) => {
  const users = await User.find({}).populate("notes", { content: "user" });

  response.status(200).json(users);
});

usersRouter.get("/list/:id", async (request, response) => {
  const userNoteList = await User.find({ _id: request.params.id }).populate(
    "notes",
  );

  response.status(200).json(userNoteList);
});

module.exports = usersRouter;
