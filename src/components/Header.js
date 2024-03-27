import React, {useState} from 'react';
import '../styles/header.css'
import extractUserInfoFromToken from "../functions/extractUserInfoFromToken";

const Header = () => {
    const [isDropdown1Open, setIsDropdown1Open] = useState(false);
    const [isDropdown2Open, setIsDropdown2Open] = useState(false);
    const userInfo = extractUserInfoFromToken();
    const toggleDropdown1 = () => {
        setIsDropdown1Open(!isDropdown1Open);
    };

    const toggleDropdown2 = () => {
        setIsDropdown2Open(!isDropdown2Open);
    };

    // console.log(JSON.parse(localStorage.getItem('userInfo')));
    return (
        <div className="header">
            <div className="logo">
                <img src='/res/logo.png' alt="Фото"/>
                <div className="text">
                    <p>ГО"ФЕДЕРАЦІЯ ФУТБОЛУ ЗВЕНИГОРОДСЬКОЇ ОБ'ЄДНАНОЇ ТЕРИТОРІАЛЬНОЇ ГРОМАДИ ЧЕРКАСЬКОЇ ОБЛАСТІ</p>
                </div>
            </div>
            <div className="navigation">
                <ul>
                    <li><a href="/">Про федерацію</a></li>
                    <li className="dropdown" onMouseEnter={toggleDropdown1} onMouseLeave={toggleDropdown1}>
                        <a href="/tournament">Турніри</a>
                        {/*{isDropdown1Open && (*/}
                        {/*    <div className="dropdown-content">*/}
                        {/*        <a href="#">Турнір 1</a>*/}
                        {/*        <a href="#">Турнір 2</a>*/}
                        {/*        <a href="/tournament">Всі турніри</a>*/}
                        {/*    </div>*/}
                        {/*)}*/}
                    </li>
                    <li className="dropdown" onMouseEnter={toggleDropdown2} onMouseLeave={toggleDropdown2}>
                        <a href="/participants">Учасники</a>
                        {/*{isDropdown2Open && (*/}
                        {/*    <div className="dropdown-content">*/}
                        {/*        <a href="/teams">Команди</a>*/}
                        {/*        <a href="/players">Гравці</a>*/}
                        {/*        <a href="/referees">Судді</a>*/}
                        {/*    </div>*/}
                        {/*)}*/}
                    </li>
                    <li><a href="/posts">Новини</a></li>
                    {/*<li><a href="#">Медіа</a></li>*/}
                    <li>
                        <a href="#">Контакти</a>
                    </li>
                    {/*<li>*/}
                    {/*    {userInfo && (*/}
                    {/*        <>*/}
                    {/*            <p> {userInfo.username} {userInfo.roles.join(', ')}</p>*/}
                    {/*        </>*/}
                    {/*    )}*/}
                    {/*</li>*/}
                    {
                        localStorage.getItem('userInfo') ?
                            <li>
                                <a href="#" onClick={() => {
                                    localStorage.clear();
                                    window.location.reload()
                                }}>Вийти</a>
                            </li>
                            :
                            <li>
                                <a href="/login">Авторизуватися</a>
                            </li>
                    }
                </ul>
            </div>
        </div>
    );
}
export default Header;
