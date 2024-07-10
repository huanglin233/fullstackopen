const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const bcrypt = require("bcrypt");
const User = require("../db/user");

const api = supertest(app);

describe("初始化一个用户到数据库中", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("yyds233", 10);
    const user = new User({ username: "yyds", passwordHash });

    await user.save();
  });

  test("调用接口创建一个用户,并测试用户是否创建成功了", async () => {
    const userAtStart = await helper.usersInDb();

    const newUser = {
      username: "yyds2",
      name: "hl",
      password: "yyds233",
    };

    await api
      .post("/api/user/add")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const userAtEnd = await helper.usersInDb();
    assert.strictEqual(userAtStart.length + 1, userAtEnd.length);

    const usernames = userAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });
});
