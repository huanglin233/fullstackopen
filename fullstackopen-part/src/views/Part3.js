// 用户登录表单react
import {useState} from 'react';

import Text from '../component/Text';

const LoginForm = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        console.log("logging in with", username, password);
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
