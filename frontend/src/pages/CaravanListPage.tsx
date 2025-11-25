import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import client from '../api/client';
import type { Caravan } from '../types';
import '../styles/CaravanListPage.css';
import { Star } from 'lucide-react';
import CaravanMap from '../components/CaravanMap';

const CaravanListPage: React.FC = () => {
    const [caravans, setCaravans] = useState<Caravan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Search state
    const [location, setLocation] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const fetchCaravans = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (location) params.append('location', location);
            if (minPrice) params.append('minPrice', minPrice);
            if (maxPrice) params.append('maxPrice', maxPrice);

            const response = await client.get<Caravan[]>(`/caravans?${params.toString()}`);
            setCaravans(response.data);
        } catch (err) {
            setError('Failed to load caravans');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCaravans();
    }, []);

    const [showMap, setShowMap] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchCaravans();
    };

    return (
        <div className="caravan-list-page">
            <div className="search-bar-container" style={{ backgroundColor: 'white', padding: '1rem 0', borderBottom: '1px solid #eee' }}>
                <div className="container">
                    <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div className="search-input-group" style={{ flex: 1, minWidth: '200px' }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Location</label>
                            <input
                                type="text"
                                placeholder="Where are you going?"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div className="search-input-group" style={{ width: '120px' }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Min Price</label>
                            <input
                                type="number"
                                placeholder="Min"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div className="search-input-group" style={{ width: '120px' }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Max Price</label>
                            <input
                                type="number"
                                placeholder="Max"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ height: '40px', marginTop: 'auto' }}>
                            Search
                        </button>
                    </form>
                </div>
            </div>

            <div className="filters-bar">
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className="filter-scroll" style={{ flex: 1 }}>
                        {['All', 'Beachfront', 'Cabins', 'OMG!', 'Camping', 'Tiny homes'].map((filter, idx) => (
                            <div key={filter} className={`filter-item ${idx === 0 ? 'active' : ''}`}>
                                <span className="filter-icon">🚐</span>
                                <span className="filter-label">{filter}</span>
                            </div>
                        ))}
                    </div>
                    <button
                        className="btn"
                        onClick={() => setShowMap(!showMap)}
                        style={{ marginLeft: '1rem', padding: '0.5rem 1rem', border: '1px solid #ddd', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', backgroundColor: showMap ? '#222' : 'white', color: showMap ? 'white' : 'black' }}
                    >
                        {showMap ? 'Show List' : 'Show Map'} <span style={{ fontSize: '1.2rem' }}>🗺️</span>
                    </button>
                </div>
            </div>

            <div className="container">
                {loading ? (
                    <div style={{ paddingTop: '100px' }}>Loading...</div>
                ) : error ? (
                    <div style={{ paddingTop: '100px' }}>{error}</div>
                ) : (
                    <>
                        {showMap ? (
                            <div style={{ height: 'calc(100vh - 250px)', width: '100%', marginTop: '1rem' }}>
                                <CaravanMap caravans={caravans} />
                            </div>
                        ) : (
                            <div className="caravan-grid">
                                {caravans.length > 0 ? (
                                    caravans.map((caravan) => (
                                        <Link to={`/caravans/${caravan.id}`} key={caravan.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <div className="caravan-card">
                                                <div className="card-image">
                                                    {caravan.photos && caravan.photos.length > 0 ? (
                                                        <img src={caravan.photos[0]} alt={caravan.name} />
                                                    ) : (
                                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
                                                            No Image
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="card-content">
                                                    <div className="card-header">
                                                        <h3 className="card-title">{caravan.name}</h3>
                                                        <div className="card-rating">
                                                            <Star size={14} fill="black" />
                                                            <span>4.9</span>
                                                        </div>
                                                    </div>
                                                    <p className="card-info">Capacity: {caravan.capacity} guests</p>
                                                    <p className="card-info">{caravan.location?.address || 'Unknown Location'}</p>
                                                    <div className="card-price">
                                                        <span className="price-value">${caravan.dailyRate}</span> night
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div style={{ padding: '2rem', textAlign: 'center', width: '100%' }}>No caravans found matching your criteria.</div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default CaravanListPage;
