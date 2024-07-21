import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'; // Assuming CheckoutForm is in the same directory
import { useNavigate, useLocation } from 'react-router-dom';
// Load Stripe with your public key
const stripePromise = loadStripe('pk_test_51PNGQQP7uV08NbFwBTjw5xHkFaCY3E8x98Vr0eeXolNS9Ti0Vvyx2ps4EgoCga9WXpRSsToGPBnD63xssVcK9FSG00YT9OvQ1w');

const Payment = () => {
    const [clientSecret, setClientSecret] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { totalTripCost, tripTitle } = location.state || {};

    if (!totalTripCost) {
        return <p>No totalTripCost information received.</p>;
    }

    console.log("--------", totalTripCost);
    useEffect(() => {
        const createPaymentIntent = async () => {
            const res = await fetch(`${__STRIPE_CLIENT_URL__}`+'/api/stripe/create-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productCost: 6678, // Example amount in cents
                    productValue: 'Goa',
                }),
            });

            if (!res.ok) {
                const error = await res.json();
                console.error(error.error);
                return;
            }

            const data = await res.json();
            setClientSecret(data.clientSecret);
        };

        createPaymentIntent();
    }, []);

    const options = {
        clientSecret,
        appearance: {
            /*...*/
        },
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
                    <div className="payment-page">
                        <div className="row y-gap-30 contactForm pt-30">
                            <div className="col-12">
                                {clientSecret && (
                                    <Elements stripe={stripePromise} options={options}>
                                        <CheckoutForm clientSecret={clientSecret} />
                                    </Elements>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Payment;
