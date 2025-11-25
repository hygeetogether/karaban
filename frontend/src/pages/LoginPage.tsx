import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import '../styles/LoginPage.css';
import axios from 'axios';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'GUEST' | 'HOST'>('GUEST');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // In a real app, we would call the backend login API.
            // For MVP, we'll simulate a login by creating/fetching a user.
            // Since we don't have a real auth endpoint yet, we'll use the user creation endpoint
            // to ensure the user exists for the demo.

            const response = await axios.post('/api/users', {
                name: email.split('@')[0], // Simple name derivation
                email,
                role
            });

            console.log('Login successful:', response.data);
            // Store user info in localStorage or context
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <Link to="/" className="logo">
                        <span className="logo-icon">🚐</span>
                        <span className="logo-text">CaravanShare</span>
                    </Link>
                    <h2>Welcome back</h2>
                    <p>Login to your account to continue</p>
                </div>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <div className="input-wrapper">
                            <Mail size={20} className="input-icon" />
                            <input
                                type="email"
                                id="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <Lock size={20} className="input-icon" />
                            <input
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>I am a...</label>
                        <div className="role-selector">
                            <button
                                type="button"
                                className={`role-btn ${role === 'GUEST' ? 'active' : ''}`}
                                onClick={() => setRole('GUEST')}
                            >
                                Guest
                            </button>
                            <button
                                type="button"
                                className={`role-btn ${role === 'HOST' ? 'active' : ''}`}
                                onClick={() => setRole('HOST')}
                            >
                                Host
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                        {!isLoading && <ArrowRight size={20} className="btn-icon" />}
                    </button>
                </form>

                <div className="login-footer">
                    <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
