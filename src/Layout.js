import React from "react";
import Routers from './router/Route';
import { useEffect, useState } from "react";
import { DarkModeContext } from './context/darkModeContext';
import { useContext } from "react";

const Layout = () => {
    const { darkMode } = useContext(DarkModeContext);
    return (
        <>
            <div className={darkMode ? "app dark" : "app"}>
                <Routers />
            </div>
        </>
    );
};

export default Layout;