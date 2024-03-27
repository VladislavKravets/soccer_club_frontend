import {Roles} from "../enum/Roles";
import {Navigate} from "react-router-dom";
import React from "react";

export const isAuthenticated = () => {
    // Проверка наличия токена или другой логики проверки авторизации
    const token = localStorage.getItem('userInfo');
    return !!token;
};

const userHasAdminRole = () => {
    // Проверка наличия роли администратора
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return userInfo?.roles.includes(Roles.admin);
};

export const PrivateRoute = ({ element, roles }) => {
    if (!isAuthenticated() || (roles && !userHasAdminRole())) {
        return <Navigate to="/" />;
    }
    return element;
};
export const DontVisible = ({ element, roles }) => {
    if (!isAuthenticated() || (roles && !userHasAdminRole())) {
        return null;
    }
    return element;
};