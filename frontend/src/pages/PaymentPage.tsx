import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { paymentService } from '../services/paymentService';
import '../styles/PaymentPage.css';

const PaymentPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { reservationId, amount } = location.state || {};
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (!reservationId || !amount) {
            alert('Invalid payment details');
            navigate('/');
        }
    }, [reservationId, amount, navigate]);

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            await paymentService.create({
                reservationId,
                amount
            });
            alert('Payment Successful! Your trip is confirmed.');
            navigate('/trips');
        } catch (error) {
            console.error('Payment failed', error);
            alert('Payment failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    if (!reservationId || !amount) return null;

    return (
        <div className="payment-page">
            <div className="container" style={{ maxWidth: '500px', marginTop: '50px' }}>
                <div className="payment-card" style={{ padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Confirm and Pay</h2>
                    <div className="payment-summary" style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>Reservation ID:</span>
                            <strong>#{reservationId}</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
                            <span>Total Amount:</span>
                            <span>${amount}</span>
                        </div>
                    </div>

                    <form onSubmit={handlePayment}>
                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Card Number</label>
                            <input type="text" placeholder="0000 0000 0000 0000" className="form-control" style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }} required />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Expiry</label>
                                <input type="text" placeholder="MM/YY" className="form-control" style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }} required />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>CVV</label>
                                <input type="text" placeholder="123" className="form-control" style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }} required />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            style={{ width: '100%', padding: '1rem', fontSize: '1rem', fontWeight: 'bold', backgroundColor: '#FF385C', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                            disabled={isProcessing}
                        >
                            {isProcessing ? 'Processing...' : `Pay $${amount}`}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
