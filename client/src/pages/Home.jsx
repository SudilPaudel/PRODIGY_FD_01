import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar';

const Home = () => {
    return (
        <>
        <Navbar />
        <div className="home-container">
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }

                .home-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                    text-align: center;
                    font-family: 'Inter', sans-serif;
                    padding: 20px;
                }

                .content {
                    animation: fadeIn 0.8s ease-out;
                    padding: 3rem;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 24px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                    width: 90%;
                    max-width: 450px;
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                h2 {
                    font-size: clamp(1.8rem, 5vw, 2.8rem);
                    margin-bottom: 1.5rem;
                    color: #ffffff;
                    font-weight: 700;
                    animation: float 3s ease-in-out infinite;
                }

                p {
                    font-size: clamp(1rem, 3vw, 1.2rem);
                    margin-bottom: 2.5rem;
                    color: #a0aec0;
                    line-height: 1.6;
                }

                .btn {
                    display: inline-block;
                    padding: 14px 28px;
                    background: linear-gradient(45deg, #4f46e5, #7c3aed);
                    color: white;
                    text-decoration: none;
                    border-radius: 12px;
                    transition: all 0.3s ease;
                    margin: 0.7rem;
                    font-weight: 500;
                    letter-spacing: 0.5px;
                    border: none;
                    position: relative;
                    overflow: hidden;
                }

                .btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 6px 20px rgba(124, 58, 237, 0.3);
                }

                .btn::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.2),
                        transparent
                    );
                    transition: 0.5s;
                }

                .btn:hover::after {
                    left: 100%;
                }

                @media (max-width: 480px) {
                    .content {
                        padding: 2rem;
                    }
                    .btn {
                        display: block;
                        margin: 1rem auto;
                        width: 80%;
                    }
                }
            `}</style>
            
            <div className="content">
                <h2>Welcome to the MERN Authentication System</h2>
                <p>Sign up, log in, and access your dashboard!</p>
                <Link className="btn" to="/login">Login</Link>
                <Link className="btn" to="/register">Sign Up</Link>
                <Link className="btn" to="/dashboard">Dashboard</Link>
                
            </div>
        </div>
        </>
    );
};

export default Home;
