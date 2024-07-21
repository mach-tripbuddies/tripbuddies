import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate, useLocation } from 'react-router-dom';


// Load Stripe with your public key
const stripePromise = loadStripe('pk_test_51PNGQQP7uV08NbFwBTjw5xHkFaCY3E8x98Vr0eeXolNS9Ti0Vvyx2ps4EgoCga9WXpRSsToGPBnD63xssVcK9FSG00YT9OvQ1w'); // Replace with your actual public key

const Payment = () => {
    const [sessionId, setSessionId] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { totalTripCost, tripTitle } = location.state || {};

 /*   if (!totalTripCost) {
        return <p>No totalTripCost information received.</p>;
    }*/

    useEffect(() => {
        const createCheckoutSession = async () => {
            try {
                const res = await fetch(`${__STRIPE_CLIENT_URL__}`+'/api/stripe/create-checkout-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        productCost: totalTripCost, // Example amount in cents
                        productValue: tripTitle,
                    }),
                });

                if (!res.ok) {
                    const error = await res.json();
                    console.error(error.error);
                    return;
                }

                const data = await res.json();
                setSessionId(data.id);
            } catch (error) {
                console.error('Error creating Checkout Session:', error);
            }
        };

        createCheckoutSession();
    }, [totalTripCost, tripTitle]);

    const handleCheckout = async () => {
        const stripe = await stripePromise;

        if (!stripe || !sessionId) {
            return;
        }

        const { error } = await stripe.redirectToCheckout({
            sessionId,
        });

        if (error) {
            console.error('Error redirecting to Checkout:', error);
        }
    };

    return (
        <section className="layout-pt-md layout-pb-lg mt-header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="booking-page">
                            <div className="bg-light rounded-12 shadow-2 py-15 px-20">
                                <h2 className="text-30 md:text-24 fw-700 mb-30">
                                    Confirm and Pay!!!
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="payment-container">
                        <div className="payment-card">
                            <h2>
                            <p className="payment-description">
                                You are about to book a trip with the following details:
                            </p>
                            </h2>
                            <div className="payment-details">
                                <div><strong>Trip Title:</strong> {tripTitle}</div>
                                <div><strong>Total Cost:</strong> ₹{totalTripCost}</div>
                            </div>
                    <div className="payment-page">
                        <div className="row y-gap-30 contactForm pt-30">
                            <div className="col-12">
                                <button onClick={handleCheckout} className="btn btn-primary">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Payment;
