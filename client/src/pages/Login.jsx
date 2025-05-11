import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../utils/auth';
import Navbar from '../components/NavBar';


const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://prodigy-fd-01-1.onrender.com/api/auth/login', form);
            authenticateUser(res.data.data.token);
            localStorage.setItem('auth-token', res.data.data.token);
            alert('Login successful!');
            navigate('/dashboard');
        } catch (err) {
            alert(err.response.data.error || 'Login failed');
        }
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
                    height: 90vh;
                    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                    font-family: 'Inter', sans-serif;
                    
                }
                .form-container {
                    background: #ffffff;
                    padding: 2.5rem;
                    
                    border-radius: 20px;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
                    width: 450px;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .form-container:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.12);
                }
                h2 {
                    text-align: center;
                    
                    font-size: 2.2rem;
                    background: linear-gradient(135deg, #2563eb, #4f46e5);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    font-weight: 700;
                }
                h3 {
                    text-align: center;
                    
                    font-size: 1.5rem;
                    background: black;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    font-weight: 500;
                }
                input {
                    width: 100%;
                    padding: 14px 18px;
                    margin: 8px 0;
                    border-radius: 12px;
                    border: 2px solid #e5e7eb;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    background: #f9fafb;
                    text-align: center;
                }
                input:focus {
                    border-color: #4f46e5;
                    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
                    outline: none;
                    background: #ffffff;
                }
                button {
                    width: 100%;
                    padding: 14px;
                    background: linear-gradient(135deg, #2563eb, #4f46e5);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    cursor: pointer;
                    font-size: 1.1rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    margin-top: 1.5rem;
                    position: relative;
                    overflow: hidden;
                }
                button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
                }
                button:active {
                    transform: translateY(0);
                }
                .input-group {
                    position: relative;
                    margin-bottom: 1.2rem;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }
                .register-link {
                    text-align: center;
                    margin-top: 1rem;
                }
                .register-link a {
                    color: #4f46e5;
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.3s ease;
                }
                .register-link a:hover {
                    color: #2563eb;
                    text-decoration: underline;
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .form-container {
                    animation: slideUp 0.6s ease-out;
                }
                input {
                    animation: fadeIn 0.4s ease-out;
                }
                button {
                    animation: fadeIn 0.6s ease-out;
                }
            `}</style>
            
            <div className="form-container">
                <h2>MERN Authentication System</h2>
                <h3>Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input 
                            name="email" 
                            type="email" 
                            placeholder="Enter your email" 
                            value={form.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            name="password" 
                            type="password" 
                            placeholder="Enter your password" 
                            value={form.password} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <button type="submit">Sign In</button>
                </form>
                <div className="register-link">
                    Don't have an account? <a href="/register">Register here</a>
                </div>
            </div>
        </div>
        
        
        </>
    );
};

export default Login;
