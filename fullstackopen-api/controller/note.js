const logger = require("../utils/logger.js");
const router = require("express").Router();

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "html is easy2",
    date: "2022-05-30t17:30:31.098z",
    important: true,
  },
  {
    id: 3,
    content: "html is easy3",
    date: "2022-05-30t17:30:31.098z",
    important: true,
  },
];

router.get("/hello", (request, response) => {
  response.send("<h1>hello world!</h1>");
});

router.get("/noteList", (request, response) => {
  response.json(notes);
});

router.get("/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  response.json(note);
});

// 删除操作 delete
router.delete("/del/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

const generatedId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;

  return maxId + 1;
};

// 新增操作 post
router.post("/add/notes", (request, response) => {
  const body = request.body;
  logger.info(body);
  logger.info(request.header);
  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    id: generatedId(),
    content: body.content,
    important: body.important || false,
    date: new Date(),
  };

  notes = notes.concat(note);

  response.json(note);
});

// 查询db数据库
const db = require("../db/note.js");
router.get("/db/getAllNote", (request, response, next) => {
  logger.info("查询数据");
  try {
    db.find({}, (e) => {
      logger.info(e);
      response.json(e);
    });
  } catch (e) {
    next(e);
  }
});
// 创建笔记
router.post("/db/save", (request, response, next) => {
  logger.info("新增笔记");
  try {
    const body = request.body;

    if (body.content === undefined) {
      return response.status(400).json({ error: "content missing" });
    }

    const note = {
      content: body.content,
      important: body.important || false,
      date: new Date(),
    };

    db.save(note, (e) => {
      logger.info(e);
      response.send(e);
    });
  } catch (e) {
    next(e);
  }
});

// 根据id查询笔记
router.get("/db/getNode/:id", (request, response, next) => {
  try {
    db.find({ _id: request.params.id }, (e) => {
      if (e) {
        response.json(e);
      } else {
        response.status(404).end();
      }
    });
  } catch (e) {
    next(e);
  }
});

// 删除一个笔记
router.get("/db/delNote/:id", (request, response, next) => {
  try {
    db.delById({ _id: request.params.id }, (e) => {
      if (e) {
        response.json(e);
      } else {
        response.status(500).send({ error: "删除失败" });
      }
    });
  } catch (e) {
    next(e);
  }
});

// 更新一个笔记
router.put("/db/updateNote/:id", (request, response, next) => {
  try {
    const body = request.body;
    const note = {
      content: body.content,
      important: body.important,
    };

    db.updateById(request.params.id, note, (e) => {
      if (e) {
        response.json(e);
      } else {
        response.status(500).send({ error: "更新失败" });
      }
    });
  } catch (e) {
    next(e);
  }
});

const { Note } = require("../db/note.js");
// 新增笔记使用async/await--测试类接口
router.post("/add", async (request, response, next) => {
  try {
    const data = request.body;
    const note = new Note({
      content: data.content || "233",
      important: data.important || false,
    });
    const ret = await note.save();

    console.log(ret);

    response.json(ret);
  } catch (e) {
    next(e);
  }
});

router.post("/query/notes", async (request, response, next) => {
  try {
    const notes = await db.find({});
    response.json(notes);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
