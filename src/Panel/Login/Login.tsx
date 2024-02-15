import React, {useState} from 'react';
import './Login.scss';
import axios from "axios";
import {useNavigate} from "react-router-dom";

interface IProps {
    loginSuccess: () => void;
}

const Login: React.FC<IProps> = (props) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const handleLogin = () => {
        const user = {
            username: username,
            password: password
        }
        axios.post('https://db-be-d85969a6a61b.herokuapp.com/api/authorization/auth', user)
            .then(response => {
                if (response.data) {
                    props.loginSuccess();
                }
            })
            .catch(error => {
                console.error('Veri çekme hatası:', error);
            });
    };

    return (
        <div className="login-screen">
            <h2>Login</h2>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
