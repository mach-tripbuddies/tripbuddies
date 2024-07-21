import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/style.css';

const PersonalDetails = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [fullName, setFullName] = useState(user.displayName);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState('9123456789');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const navigateTo = useNavigate();
    const totalTripCost =7030;
    const tripTitle ='Goa';
    const duration =3;

    const handleSubmit = (event) => {
        event.preventDefault();
        const personalInfo = {
            fullName,
            email,
            gender,
            address,
            zipcode,
            phone,
            state,
            country
        };
        navigateTo('/confirmation', { state: { personalInfo, totalTripCost, tripTitle, duration } });
    };

    const statesAndUTsOfIndia = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
        "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
        "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep",
        "Delhi", "Puducherry", "Ladakh", "Jammu and Kashmir"
    ];

    return (
        <section className="layout-pt-md layout-pb-lg mt-header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="booking-page">
                            <div className="bg-light rounded-12 shadow-2 py-15 px-20">
                                <h2 className="text-30 md:text-24 fw-700 mb-30">
                                    Book Your Trip Now!!!
                                </h2>
                            </div>
                            <div className="bg-white rounded-12 shadow-2 py-30 px-30 md:py-20 md:px-20 mt-30">
                                <form onSubmit={handleSubmit} className="booking-form">
                                    <div>
                                        <label htmlFor="fullName">Full Name:</label>
                                        <input
                                            className="br1"
                                            type="text"
                                            id="fullName"
                                            value={fullName}
                                            disabled={true}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email:</label>
                                        <input
                                            className="br1"
                                            type="email"
                                            id="email"
                                            value={email}
                                            disabled={true}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone">Mobile No:</label>
                                        <input
                                            className="br1"
                                            type="text"
                                            id="phone"
                                            value={phone}
                                            disabled={true}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="gender">Select Gender:</label>
                                        <select
                                            id="gender"
                                            className="br1"
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            required
                                        >
                                            <option value="">Select a Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="nonbinary">Non-Binary</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="address">Address:</label>
                                        <input
                                            className="br1"
                                            type="text"
                                            id="address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="zipcode">Zipcode:</label>
                                        <input
                                            className="br1"
                                            type="text"
                                            id="zipcode"
                                            value={zipcode}
                                            onChange={(e) => setZipcode(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="state">Select State:</label>
                                        <select
                                            id="state"
                                            className="br1"
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                            required
                                        >
                                            {statesAndUTsOfIndia.map(state => (
                                                <option key={state} value={state}>{state}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="country">Country:</label>
                                        <input
                                            className="br1"
                                            type="text"
                                            id="country"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit">Proceed to Booking Confirmation</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PersonalDetails;
