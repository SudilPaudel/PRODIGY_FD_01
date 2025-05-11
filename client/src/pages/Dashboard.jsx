import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import Navbar from '../components/NavBar';

const Dashboard = () => {
  const [data, setData] = useState('');
  const [fetchedUser, setFetchedUser] = useState('');
  const navigate = useNavigate();

  const fetchProtectedData = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      console.log('Token retrieved:', token);
      const res = await axios.get('https://prodigy-fd-01-1.onrender.com/api/auth/protected', {
        headers: { 'x-auth-token': token }
      });
      setData(res.data.message);
    } catch (err) {
      alert('Session expired or unauthorized. Redirecting to login.');
      localStorage.removeItem('auth-token');
      navigate('/login');
    }
  };

  const fetchUserData = async ()=>{
    try {
      const token = localStorage.getItem('auth-token');
      const res = await axios.get('https://prodigy-fd-01-1.onrender.com/api/auth/me', {
        headers: { 'x-auth-token': token }
      });
      setFetchedUser(res.data.user);
    } catch (err) {
      alert('Session expired or unauthorized. Redirecting to login.');
      localStorage.removeItem('auth-token');
      navigate('/login');
    }
  }

  useEffect(() => {
    if (!isAuthenticated()) {
      
      navigate('/login');
    }
    fetchProtectedData();
    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    navigate('/');
  };

return (
    <>
    <Navbar />
    <div className="container">
        <style>{`
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 90vh;
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                font-family: 'Inter', sans-serif;
                padding: 20px;
            }
            .dashboard-container {
                background: rgba(255, 255, 255, 0.95);
                padding: 2.5rem;
                border-radius: 24px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                width: 450px;
                transform: translateY(20px);
                animation: slideUp 0.8s ease forwards;
                backdrop-filter: blur(10px);
            }
            @keyframes slideUp {
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
                from {
                    transform: translateY(30px);
                    opacity: 0;
                }
            }
            .profile-section {
                text-align: center;
                margin-bottom: 2.5rem;
            }
            .avatar {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                background: linear-gradient(45deg, #667eea, #764ba2);
                margin: 0 auto 1.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2.5rem;
                color: white;
                box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
                transition: transform 0.3s ease;
            }
            .avatar:hover {
                transform: scale(1.05);
            }
            .user-info {
                background: linear-gradient(to right, #f8fafc, #f1f5f9);
                padding: 1.25rem;
                border-radius: 16px;
                margin-bottom: 1.5rem;
                transition: all 0.3s ease;
                border: 1px solid rgba(0, 0, 0, 0.05);
            }
            .user-info:hover {
                transform: translateX(5px);
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
            }
            h2 {
                color: #1e293b;
                font-size: 1.75rem;
                margin-bottom: 1.5rem;
                font-weight: 600;
                background: linear-gradient(45deg, #1e293b, #334155);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .info-label {
                color: #64748b;
                font-size: 0.9rem;
                margin-bottom: 0.4rem;
                font-weight: 500;
            }
            .info-value {
                color: #334155;
                font-size: 1.1rem;
                font-weight: 600;
            }
            button {
                width: 100%;
                padding: 1rem;
                background: linear-gradient(45deg, #667eea, #764ba2);
                color: white;
                border: none;
                border-radius: 12px;
                font-weight: 600;
                font-size: 1.1rem;
                margin-top: 1.5rem;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
            }
            button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
            }
            button:active {
                transform: translateY(0);
            }
        `}</style>

        <div className="dashboard-container">
            <div className="profile-section">
                <div className="avatar">
                    {fetchedUser.username ? fetchedUser.username[0].toUpperCase() : '?'}
                </div>
                <h2>{fetchedUser.username}'s Dashboard</h2>
            </div>

            <div className="user-info">
                <div className="info-label">Username</div>
                <div className="info-value">{fetchedUser.username || 'Loading...'}</div>
            </div>

            <div className="user-info">
                <div className="info-label">Email</div>
                <div className="info-value">{fetchedUser.email || 'Loading...'}</div>
            </div>
            <NavLink to={"/"} style={{ textDecoration: 'none' }}><button>Home</button></NavLink>
                
            <button onClick={handleLogout}>Sign Out</button>
        </div>
    </div>
    </>
);
};

export default Dashboard;
