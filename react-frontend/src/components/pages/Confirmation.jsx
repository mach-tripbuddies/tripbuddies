import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/style.css';

const Confirmation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    const date = "19/07/2024";
    const { personalInfo, totalTripCost, tripTitle, duration } = location.state || {};

    if (!personalInfo) {
        return <p>No personal information received.</p>;
    }

    console.log("--------", data);

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/payment', { state: { totalTripCost, tripTitle } });
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
                    <div className="bg-white rounded-12 shadow-2 py-30 px-30 md:py-20 md:px-20 mt-30">
                        <form onSubmit={handleSubmit} className="booking-form">
                            <div>
                                <label htmlFor="tripTitle">Trip:</label>
                                <input className="br1" type="text" id="tripTitle" value={tripTitle} readOnly />
                            </div>
                            <div>
                                <label htmlFor="date">Date:</label>
                                <input className="br1" type="date" id="date" value="2021/07/07" readOnly />
                            </div>
                            <div>
                                <label htmlFor="duration">Trip Duration:</label>
                                <input className="br1" type="text" id="duration" value={duration} readOnly />
                            </div>
                            <div>
                                <label htmlFor="totalTripCost">Trip Cost:</label>
                                <input className="br1" type="text" id="totalTripCost" value={totalTripCost} readOnly />
                            </div>
                            <div>
                                <label htmlFor="fullName">Full Name:</label>
                                <input className="br1" type="text" id="fullName" value={personalInfo.fullName} readOnly />
                            </div>
                            <div>
                                <label htmlFor="address">Address:</label>
                                <input className="br1" type="text" id="address" value={personalInfo.address} readOnly />
                            </div>
                            <div>
                                <label htmlFor="zipcode">Zipcode:</label>
                                <input className="br1" type="text" id="zipcode" value={personalInfo.zipcode} readOnly />
                            </div>
                            <div>
                                <label htmlFor="state">State:</label>
                                <input className="br1" type="text" id="state" value={personalInfo.state} readOnly />
                            </div>
                            <div>
                                <label htmlFor="country">Country:</label>
                                <input className="br1" type="text" id="country" value={personalInfo.country} readOnly />
                            </div>
                            <button type="submit">Proceed to Booking Confirmation</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Confirmation;
