const http = require("http");
const app = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/json" });
  response.end("hello word");
});

const port = 3001;
app.listen(port);
console.log(`server running on port ${port}`);

// 使用express编写接口
const express = require("express");
const appExpress = express();
appExpress.use(express.json());

// 统一处理
const requestLogger = (request, response, next) => {
  console.log("method: ", request.method);
  console.log("path: ", request.path);
  console.log("body", request.body);

  next();
};
appExpress.use(requestLogger);

// 设置跨域
const cors = require("cors");
appExpress.use(cors());

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

appExpress.get("/", (request, response) => {
  response.send("<h1>hello world!</h1>");
});

appExpress.get("/api/noteList", (request, response) => {
  response.json(notes);
});

appExpress.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  response.json(note);
});

// 删除操作 delete
appExpress.delete("/api/del/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

const generatedId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;

  return maxId + 1;
};

// 新增操作 post
appExpress.post("/api/add/notes", (request, response) => {
  const body = request.body;
  console.log(body);
  console.log(request.header);
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
const db = require("../db/mongo.js");
appExpress.get("/api/db/getAllNote", (request, response) => {
  console.log("查询数据");
  db.find({}, (e) => {
    console.log(e);
    response.json(e);
  });
});
// 创建笔记
appExpress.post("/api/db/save", (request, response) => {
  console.log("新增笔记");
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
    console.log(e);
    response.send(e);
  });
});

// 根据id查询笔记
appExpress.get("/api/db/getNode/:id", (request, response) => {
  db.find({ _id: request.params.id }, (e) => {
    if (e) {
      response.json(e);
    } else {
      response.status(404).end();
    }
  });
});

// 删除一个笔记
appExpress.get("/api/db/delNote/:id", (request, response) => {
  db.delById({ _id: request.params.id }, (e) => {
    if (e) {
      response.json(e);
    } else {
      response.status(500).send({ error: "删除失败" });
    }
  });
});

// 更新一个笔记
appExpress.put("/api/db/updateNote/:id", (request, response) => {
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
});

// 捕捉不存的路由
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
appExpress.use(unknownEndpoint);

// 全局异常捕获
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "格式错误" });
  }

  return response.status(500).send({ error: "内部处理错误" });
};

exports.app = appExpress;
