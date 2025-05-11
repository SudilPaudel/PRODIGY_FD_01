import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { isAuthenticated } from '../utils/auth';
import axios from "axios";

const Navbar = () => {
    const navigate = useNavigate();
    const [fetchedUser, setFetchedUser] = useState("");
    const [username, setUsername] = useState(null);


    useEffect(() => {
        // Check token and user from localStorage
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData && userData.username) {
            setUsername(userData.username);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("auth-token");
        localStorage.removeItem("user");
        setUsername(null);
        navigate("/");
    };
    const fetchedUserData = async () => {
        try {
            const token = localStorage.getItem('auth-token');
            const res = await axios.get('https://prodigy-fd-01-1.onrender.com/api/auth/me', {
                headers: { 'x-auth-token': token }
            });
            setFetchedUser(res.data.user);
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        
        fetchedUserData();
    }, []);

    return (
        <nav style={{
            ...styles.navbar,
            transition: 'all 0.3s ease-in-out',
            animation: 'fadeIn 0.5s ease-in-out'
        }}>
            <div style={{
                ...styles.left,
                transform: 'translateX(0)',
                transition: 'transform 0.3s ease-in-out',
                ':hover': {
                    transform: 'translateX(10px)'
                }
            }}>
                <NavLink to={"/"} style={{
                    ...styles.username,
                    position: 'relative',
                    '::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: '-2px',
                        left: '0',
                        width: '0',
                        height: '2px',
                        backgroundColor: 'white',
                        transition: 'width 0.3s ease-in-out'
                    },
                    ':hover::after': {
                        width: '100%'
                    }
                }}>
                    Authentication System
                </NavLink>
            </div>
            <div style={{
                ...styles.right,
                animation: 'slideIn 0.5s ease-in-out'
            }}>
                {fetchedUser.username ? (
                    <>
                        <NavLink to={"/dashboard"} style={{
                            ...styles.button,
                            transition: 'all 0.3s ease-in-out',
                            ':hover': {
                                backgroundColor: '#2d3748',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }
                        }}>
                            {fetchedUser.username}
                        </NavLink>
                        <button style={{
                            ...styles.button,
                            transition: 'all 0.3s ease-in-out',
                            ':hover': {
                                backgroundColor: '#ef4444',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }
                        }} onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button style={{
                            ...styles.button,
                            transition: 'all 0.3s ease-in-out',
                            ':hover': {
                                backgroundColor: '#3b82f6',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }
                        }} onClick={() => navigate("/login")}>
                            Login
                        </button>
                        <button style={{
                            ...styles.button,
                            transition: 'all 0.3s ease-in-out',
                            ':hover': {
                                backgroundColor: '#10b981',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }
                        }} onClick={() => navigate("/register")}>
                            Sign Up
                        </button>
                    </>
                )}
            </div>
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes slideIn {
                        from { transform: translateX(20px); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                `}
            </style>
        </nav>
    );
};

const styles = {
    navbar: {
        backgroundColor: "#0f172a",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    },
    left: {
        fontSize: "1.5rem",
        fontWeight: "bold",
    },
    logo: {
        margin: 0,
    },
    right: {
        display: "flex",
        gap: "1rem",
        alignItems: "center",
    },
    button: {
        textDecoration: "none",
        fontSize: "1rem",
        fontWeight: "500",
        backgroundColor: "#1e293b",
        color: "white",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "6px",
        cursor: "pointer",
    },
    username: {
        color: "white",
        textDecoration: "none",
        margin: 0,
    },
};

export default Navbar;
