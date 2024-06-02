import React, {useEffect} from 'react';

import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './reducers'; // Ваш кореневий редуктор

import Header from './components/Header';
import Home from './pages/Home';
import './styles/reset.css'
import './styles/App.css'
import Footer from "./components/Footer";
import Tournament from "./pages/Tournament/Tournament";
import Participants from "./pages/Participants";
import Posts from "./pages/News/Posts";
import PostPage from "./pages/News/PostPage";
import Team from "./pages/Team/Team";
import Tour from "./pages/Tournament/Tour";
import NewsForm from "./pages/admin/News/NewsForm";
import PhotoUploadForm from "./pages/admin/PhotoUploadForm";
import LoginPage from "./pages/authorizationRegistration/LoginPage";
import RegistrationPage from "./pages/authorizationRegistration/RegistrationPage";
import CreateTournament from "./pages/admin/Tour/CreateTournament";
import UpdateTournament from "./pages/admin/Tour/UpdateTournament";
import {Roles} from "./enum/Roles";
import CreateTeam from "./pages/admin/Team/CreateTeam";
import TournamentForm from "./pages/admin/Tour/TournamentForm";
import CreateMatch from "./pages/admin/CreateMatch";
import UpdateMatch from "./pages/admin/UpdateMatch";
import {PrivateRoute} from "./functions/userOrAdminAuthenticated";
import CreatePlayer from "./pages/admin/Team/CreatePlayer";
import Match from "./pages/Match/Match";
import UpdateTeam from "./pages/admin/Team/UpdateTeam";

const store = createStore(rootReducer, applyMiddleware(thunk));

// require('dotenv').config();

function App() {

    useEffect(() => {
        checkTokenExpiration();
    }, []);

    const checkTokenExpiration = () => {
        // Получение токена из localStorage
        const token = localStorage.getItem('token');

        if (token) {
            // Декодирование токена
            const decodedToken = JSON.parse(localStorage.getItem('userInfo'));

            // Получение времени истечения токена
            const expirationTime = decodedToken.exp;

            // Получение текущего времени
            const currentTime = Date.now() / 1000;

            // Проверка истечения срока действия токена
            if (currentTime > expirationTime) {
                // Токен истек, очистка localStorage
                localStorage.clear('userInfo');
                localStorage.clear('token');
                // <Navigate to="/" />
            } else {
                // Токен действителен
                // console.log('Токен действителен.');
            }
        } else {
            // console.log('Токен не найден в localStorage.');
        }
    };

    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Header/>
                    <Routes>
                        <Route path="*" element={<Navigate to="/"/>}/>

                        <Route path="/" element={<Home/>}/>

                        <Route path="/tournament" element={<Tournament/>}/>
                        <Route path="/tournament/:id" element={<Tour/>}/>

                        <Route path="/participants" element={<Participants/>}/>
                        <Route path="/participants/team/:id" element={<Team/>}/>

                        <Route path="/posts" element={<Posts/>}/>
                        <Route path="/posts/:id" element={<PostPage/>}/>

                        <Route path="/match/:id" element={<Match/>}/>

                        {/* regAuth */}
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/registration" element={<RegistrationPage/>}/>

                        {
                            JSON.parse(localStorage.getItem('userInfo'))?.roles.toString() === Roles.admin &&
                            <>
                                {/*tournament*/}
                                <Route
                                    path="/admin/create-tournament"
                                    element={<PrivateRoute element={<CreateTournament/>} roles={[Roles.admin]}/>}
                                />
                                <Route
                                    path="/admin/update-tournament/:id"
                                    element={<PrivateRoute element={<UpdateTournament/>} roles={[Roles.admin]}/>}
                                />
                                <Route
                                    path="/admin/tournament-form/:id"
                                    element={<PrivateRoute element={<TournamentForm/>} roles={[Roles.admin]}/>}
                                />

                                <Route
                                    path="/admin/create-match/:id"
                                    element={<PrivateRoute element={<CreateMatch/>} roles={[Roles.admin]}/>}
                                />
                                <Route
                                    path="/admin/update-match/:id"
                                    element={<PrivateRoute element={<UpdateMatch/>} roles={[Roles.admin]}/>}
                                />

                                <Route
                                    path="/admin/photo-upload/:tag?"
                                    element={<PrivateRoute element={<PhotoUploadForm/>} roles={[Roles.admin]}/>}
                                />
                                {/*news*/}
                                <Route
                                    path="/admin/create-news/:tag?"
                                    element={<PrivateRoute element={<NewsForm/>} roles={[Roles.admin]}/>}
                                />
                                {/*team*/}
                                <Route
                                    path="/admin/create-team"
                                    element={<PrivateRoute element={<CreateTeam/>} roles={[Roles.admin]}/>}
                                />
                                <Route
                                    path="/admin/update-team/:id"
                                    element={<PrivateRoute element={<UpdateTeam/>} roles={[Roles.admin]}/>}
                                />

                                <Route
                                    path="/admin/create-player/:teamName?"
                                    element={<PrivateRoute element={<CreatePlayer/>} roles={[Roles.admin]}/>}
                                />
                            </>
                        }
                    </Routes>
                    {/*<Footer/>*/}
                </div>
            </Router>
        </Provider>
    );
}

export default App;
