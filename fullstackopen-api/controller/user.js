const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../db/user");
const jwt = require("jsonwebtoken");

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

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization) {
    return authorization;
  }
  return null;
};
usersRouter.get("/note/list", async (request, response) => {
  // 校验token是否有效
  const token = getTokenFrom(request);
  const decodeToken = jwt.verify(token, process.env.SECRET);
  if (!decodeToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const userNoteList = await User.find({ _id: decodeToken.id }).populate(
    "notes",
  );

  response.status(200).json(userNoteList);
});

module.exports = usersRouter;
