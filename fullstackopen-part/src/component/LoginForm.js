// 登录组件
const Login = ({
  handleSubmit,
  handleUserNameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <h2>login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          ussername
          <input value={username} onChange={handleUserNameChange}></input>
        </div>
        <div>
          password
          <input
            value={password}
            onChange={handlePasswordChange}
            type="password"
          ></input>
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
