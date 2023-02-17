import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import List from "../pages/list/List";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "../style/dark.scss";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import useAuth from "../custom-hook/useAuth";
const Routers = () => {
    const [islogin, useusLogin] = useState(true);
    const check = async () => {
        await onAuthStateChanged(auth, (user) => {
            if (!user) {
                useusLogin(false);
            } else {
                useusLogin(true);
            }
        });
    };
    check()



    return (
        <Routes>
            <Route
                path="/"
                element={
                    islogin ? <Home /> : <Login />
                }
            />
            <Route path="/login" element={!islogin ? <Login /> : <Home />} />
            <Route
                path="/control"
                element={
                    islogin ? <List /> : <Login />
                }
            />
        </Routes>

    );
}

export default Routers;
