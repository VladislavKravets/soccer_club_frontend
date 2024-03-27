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
            await registration(JSON.stringify({username, email, password, confirmPassword}));
            window.location.href = '/';
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    return (
        <div>
            <div className='container'>
                <div className="name-page">
                    <h1 style={{
                        width: "100%",
                        textAlign: "center"
                    }}>
                        Реєстрація
                    </h1>
                </div>
            </div>
            <div className="main">
                <div className='container'>
                    <div style={{
                        width: "100%",
                        background: "white",
                        padding: "100px 0",
                        borderRadius: "20px",
                        paddingLeft: "20px"
                    }}
                        className="login-page">
                        <div className="form-container">
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
                            <button style={{width: "100%"}} onClick={handleRegistration}>Зареєструватись</button>
                        </div>
                        <p>Ти вже зареєстрований? <a href="/login" style={{textDecoration: 'underline'}}>Авторизація</a></p>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistrationPage;
