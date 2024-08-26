// 用户登录表单react
import { useState, useEffect } from "react";
import requestUtil from "../api/requestUtil.js";

import Text from "../component/Text";
import Login from "../component/LoginForm.js";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newNote, setNewNote] = useState(null);
  const [Notes, setNotes] = useState([]);

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    requestUtil
      .login({
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res);
        setUser(res);
        window.localStorage.setItem("loggedNoteappUser", JSON.stringify(res));
        requestUtil.setToken(res.token);
        setUsername("");
        setPassword("");
      });
  };

  const addNote = (event) => {
    event.preventDefault();
    requestUtil.saveByUserId({ content: newNote }).then((res) => {
      getNoteList();
    });
  };
  const handleNoteChange = ({ target }) => {
    console.log(target.value);
    setNewNote(target.value);
  };

  const getNoteList = () => {
    requestUtil.getNoteByUser().then((res) => {
      console.log(res[0].notes);
      setNotes(res[0].notes);
      console.log(Notes);
    });
  };

  // 检查是否登录了
  useEffect(() => {
    const userStr = window.localStorage.getItem("loggedNoteappUser");
    if (user) {
      const user = JSON.parse(userStr);
      setUser(user);
      requestUtil.setToken(user.token);
      getNoteList();
    }
  }, []);

  const note = () => (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange} />
      <button type="submit">save</button>
    </form>
  );

  const login = () => (
    <Login
      handleSubmit={handleLogin}
      handleUserNameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      username={username}
      password={password}
    ></Login>
  );

  return (
    <div>
      <Text text="用户登录表单"></Text>
      {user === null ? login() : note()}
      {user !== null && <button onClick={getNoteList}>获取笔记列表</button>}
      <h2>NotesList</h2>
      <ul>
        {Notes.map((e) => (
          <li>{e.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default LoginForm;
