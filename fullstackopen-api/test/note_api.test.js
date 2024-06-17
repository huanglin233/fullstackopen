const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("notes are returned as json", async () => {
  await api
    .get("/api/db/getNode/662fc04e39230f8a5a148f7a")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two notes", async () => {
  const response = await api.get("/api/db/getAllNote");
  assert(response.body.length, 6);
});

test("the first note is about HTTP methods", async () => {
  const response = await api.get("/api/db/getAllNote");
  const contents = response.body.map((e) => e.content);
  assert.strictEqual(contents.includes("hl233"), true);
});

after(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
    // 初始化一些测试之前的操作
})
