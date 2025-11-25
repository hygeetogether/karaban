import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Globe, Menu, User } from 'lucide-react';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
    return (
        <div className="home-page">
            <header className="header">
                <div className="container header-content">
                    <div className="logo">
                        <span className="logo-icon">🚐</span>
                        <span className="logo-text">CaravanShare</span>
                    </div>

                    <div className="search-bar">
                        <button className="search-option">Anywhere</button>
                        <span className="divider">|</span>
                        <button className="search-option">Any week</button>
                        <span className="divider">|</span>
                        <button className="search-option placeholder">Add guests</button>
                        <div className="search-icon-wrapper">
                            <Search size={16} color="white" />
                        </div>
                    </div>

                    <div className="user-menu">
                        <Link to="/trips" style={{ marginRight: '1rem', textDecoration: 'none', color: 'inherit', fontWeight: 500 }}>My Trips</Link>
                        <button className="host-link">Become a Host</button>
                        <button className="globe-icon"><Globe size={18} /></button>
                        <div className="profile-menu">
                            <Menu size={18} />
                            <User size={18} className="user-icon" />
                        </div>
                    </div>
                </div>
            </header>

            <main className="hero-section">
                <div className="container">
                    <h1>Find your next adventure</h1>
                    <p>Discover unique caravans and camping spots.</p>
                    <Link to="/caravans" className="btn btn-primary">Get Started</Link>
                </div>
            </main>
        </div>
    );
};

export default HomePage;
