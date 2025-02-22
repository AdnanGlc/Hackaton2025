// src/components/Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Navbar />
            <main className="p-4">
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
