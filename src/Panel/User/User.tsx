import React, {useState} from 'react';
import './User.scss';
import axios from "axios";
import {useNavigate} from "react-router-dom";

interface IProps {
}

const User: React.FC<IProps> = (props) => {

    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleSave = () => {
        const newUser = {
            username: newUsername,
            password: newPassword,
        };

        axios.put('https://db-be-d85969a6a61b.herokuapp.com/api/authorization', newUser)
            .then(response => {
                navigate('/login');
            })
            .catch(error => {
            });
    };

    return (
        <div className="user-container">
            <label>
                Yeni Kullanıcı Adı:
                <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                />
            </label>
            <br/>
            <label>
                Yeni Şifre:
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </label>
            <br/>
            <div className={'user-container__buttons'}>
                <button className={'user-container__buttons-password'} type="button" onClick={togglePasswordVisibility}>
                    {isPasswordVisible ? "Şifreyi Gizle" : "Şifreyi Göster"}
                </button>
                <button onClick={handleSave}>Kaydet</button>
            </div>
        </div>
    );
};

export default User;