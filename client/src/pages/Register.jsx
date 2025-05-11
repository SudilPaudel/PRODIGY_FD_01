import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';

const Register = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res =await axios.post('http://localhost:4020/api/auth/register', form);
            alert('Registration successful!');
            localStorage.setItem('auth-token', res.data.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert(err.response.data.error || 'Registration failed');
        }
    };

    return (
        <>
        <Navbar />
        <div className="container">
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes slideIn {
                    from { transform: translateX(-20px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }

                .container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    font-family: 'Poppins', sans-serif;
                    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                }

                form {
                    display: flex;
                    flex-direction: column;
                    width: 380px;
                    gap: 20px;
                    padding: 40px;
                    background: rgba(255, 255, 255, 0.95);
                    border-radius: 16px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                    animation: fadeIn 0.6s ease-out;
                    backdrop-filter: blur(8px);
                }

                h2 {
                    color: white;
                    margin-bottom: 25px;
                    text-align: center;
                    font-size: 2rem;
                    animation: slideIn 0.5s ease-out;
                }

                input {
                    padding: 14px;
                    font-size: 1rem;
                    border: 2px solid #e1e3e6;
                    border-radius: 12px;
                    transition: all 0.3s ease;
                    background: rgba(255, 255, 255, 0.9);
                }

                input:focus {
                    outline: none;
                    border-color: #3498db;
                    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
                    transform: translateY(-2px);
                }

                button {
                    padding: 14px;
                    background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
                    color: white;
                    border: none;
                    cursor: pointer;
                    border-radius: 12px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(52, 152, 219, 0.3);
                    background: linear-gradient(135deg, #2980b9 0%, #2c3e50 100%);
                }

                input, button {
                    animation: slideIn 0.6s ease-out;
                }
            `}</style>

            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
        </div>
        </>
    );
};

export default Register;
