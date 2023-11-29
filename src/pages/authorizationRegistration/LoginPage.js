import React, {useState} from 'react';
import './LoginPage.css';
import {authorization} from '../../services/apiAuth'
import extractUserInfoFromToken from "../../functions/extractUserInfoFromToken";

function LoginPage(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleAuthorization = async () => {
        try {
            const response = await authorization(JSON.stringify({username, password}));
            localStorage.setItem('token', response.token);
            extractUserInfoFromToken(response.token);
            window.location.href = '/';
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    return (
        <div className='container main login-page'>
            <div className="form-container">
                <h2 className="page-title">Авторизація</h2>
                <input
                    type="text"
                    placeholder="Ім'я користувача"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button onClick={handleAuthorization}>Увійти</button>
                {error && <div className="error">{error}</div>}
            </div>
            <p>Нема аккаунту? Зареєеструйся - <a href="/registration"
                                                 style={{textDecoration: 'underline'}}>Реєстрація</a></p>
            <p>Забув пароль? Що ти тут забув? - <a href="#" style={{textDecoration: 'underline'}}>Скинути пароль</a></p>
        </div>
    );
}

export default LoginPage;
