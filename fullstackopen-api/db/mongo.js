const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// if(process.argv.length < 3) {
//     console.log('请在命令参数带上mongodb的密码');
//     process.exit(1);
// }

const password = "fullstack";
const url = `mongodb://fullstack:${password}@192.168.56.101/fullstack?retryWrites=true&w=majority`;

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
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
  n.save().then((result) => {
    console.log("note save");
    callback(result);
  });
};

const find = (query, callback) => {
  Note.find(query).then(async (note) => {
    if (note) {
      callback(note);
    }
  });
};

module.exports = { find, save };
