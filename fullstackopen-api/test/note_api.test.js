const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");

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

test("a valid note can be added", async () => {
  const newNote = {
    content: "hl2331 come on",
    important: true,
  };

  const oldNotes = await api.get("/api/db/getAllNote");
  await api
    .post("/api/add")
    .send(newNote)
    .set("Content-Type", "application/json; charset=utf-8")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const curNotes = await api.get("/api/db/getAllNote");
  const contents = curNotes.body.map((e) => e.content);
  await api.get("/api/db/delNote/" + curNotes.body[curNotes.body.length - 1].id)
    .expect(200);
  assert.strictEqual(curNotes.body.length, oldNotes.body.length + 1);
  assert(contents.includes("hl2331 come on"));
});

after(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  // 初始化一些测试之前的操作
});
