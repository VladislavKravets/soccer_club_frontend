import React, {useState} from 'react';
import './RegistrationPage.css';
import {registration} from "../../services/apiAuth";
function RegistrationPage(props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegistration = async () => {
        try {
            await registration(JSON.stringify({ username, email, password, confirmPassword }));
            window.location.href = '/';
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    return (
        <div className='container main'>
            <div className="form-container">
                <h2 className="page-title">Реєстрація</h2>
                <input
                    type="text"
                    placeholder="Ім'я користувача"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="@mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Повторити пароль"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
                <button onClick={handleRegistration}>Зареєструватись</button>
            </div>
            <p>Ти вже зареєстрований? <a href="/login" style={{textDecoration: 'underline'}}>Авторизація</a></p>
        </div>
    );
}

export default RegistrationPage;
