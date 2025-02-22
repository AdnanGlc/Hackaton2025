// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <>
            {/* Navbar */}
            <div className="flex justify-between items-center bg-white shadow-md p-4">
                <button
                    className="p-2 bg-gray-200 rounded-xl text-black font-bold"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>

                <img className="object-contain h-16" src={logo} alt="Logo" />

                <button
                    className="p-2 bg-gray-200 rounded-xl"
                    onClick={() => setLogoutModalOpen(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="icon icon-tabler icon-tabler-user-circle">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                        <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                        <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                    </svg>
                </button>
            </div>

            {/* Slide-in Menu */}
            <div className={`fixed inset-0 z-30 bg-gray-800 bg-opacity-20 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setMenuOpen(false)} />
            <div className={`fixed top-0 left-0 bg-white z-50 h-full w-2/3 md:w-1/2 transition-transform duration-300 transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex justify-end p-4">
                    <button onClick={() => setMenuOpen(false)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {/* User Info */}
                <div className="text-center py-8">
                    <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-800">{userData?.userName}</h3>
                </div>

                {/* Menu Links */}
                <div className="space-y-4 px-4">
                    <Link to="/" onClick={() => setMenuOpen(false)} className="block p-4 text-gray-800 hover:bg-gray-100 rounded-lg">Home</Link>
                    <Link to="/AddRecipe" onClick={() => setMenuOpen(false)} className="block p-4 text-gray-800 hover:bg-gray-100 rounded-lg">Write a Recipe</Link>
                    <Link to="/products" onClick={() => setMenuOpen(false)} className="block p-4 text-gray-800 hover:bg-gray-100 rounded-lg">Products</Link>
                    <Link to="/profile" onClick={() => setMenuOpen(false)} className="block p-4 text-gray-800 hover:bg-gray-100 rounded-lg">My Profile</Link>
                </div>
            </div>

            {/* Logout Modal */}
            {logoutModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
                        <p className="mb-6 text-gray-600">Are you sure you want to log out?</p>
                        <div className="flex justify-end space-x-3">
                            <button className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400" onClick={() => setLogoutModalOpen(false)}>Cancel</button>
                            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
