// 用户登录表单react
import {useState} from 'react';
import requestUtil from '../api/requestUtil.js';

import Text from '../component/Text';

const LoginForm = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const handleLogin = (event) => {
        event.preventDefault();
        console.log("logging in with", username, password);
        requestUtil.login({
            username: username,
            password: password
        }).then(res => {
                console.log(res);
                setUser(res);
                setUsername('');
                setPassword('');
            })
    }

    return (
        <div>
            <Text text="用户登录表单"></Text>
            <form onSubmit={handleLogin}>
                <div>
                    username:
                    <input type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)} />
                </div>
                <div>
                    password:
                    <input type="password" value={password} name="Password" onChange={({target}) => setPassword(target.value)} />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm;
