import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/style.css';

const Confirmation = (personalInfo, totalTripCost, tripTitle, duration) => {
    const navigate = useNavigate();
    const finalTripTitle = tripTitle;
    const date = "19/07/2024";
    const tripDuration = duration;
    const tripCost = totalTripCost;
    const [members, setMembers] = useState('');
    const navigateTo = useNavigate();

    const handleSubmit = (values) => {
        // Simulate a successful payment
        values.preventDefault();
            navigateTo('/payment', { state: { tripCost, finalTripTitle} });
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
                                    <label htmlFor="Trip"> Trip:</label>
                                    <input className="br1"
                                        type="text"
                                        id="tripTitle"
                                        value={finalTripTitle}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label htmlFor="date">Date:</label>
                                    <input className="br1"
                                        type="date"
                                        id="date"
                                        value="2021/07/07"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label htmlFor="tripDuration">Trip Duration::</label>
                                    <input className="br1"
                                        type="text"
                                        id="tripDuration"
                                        value={tripDuration}
                                        disabled={true}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="tripCost">Trip Cost :</label>
                                    <input className="br1"
                                        type="text"
                                        id="tripCost"
                                        value={tripCost}
                                        disabled={true}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label htmlFor="fullName">Full Name:</label>
                                    <input className="br1"
                                        type="text"
                                        id="fullName"
                                        value={personalInfo.fullName}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address">Address:</label>
                                    <input className="br1"
                                        type="text"
                                        id="address"
                                        value={personalInfo.address}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label htmlFor="zipcode">zipcode:</label>
                                    <input className="br1"
                                        type="text"
                                        id="zipcode"
                                        value={personalInfo.zipcode}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label htmlFor="state">state:</label>
                                    <input className="br1"
                                        type="text"
                                        id="state"
                                        value={personalInfo.state}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label htmlFor="country">country:</label>
                                    <input className="br1"
                                        type="text"
                                        id="country"
                                        value={personalInfo.country}
                                        readOnly

                                    />
                                </div>
                                <div>
                                    <label htmlFor="members">No of members:</label>
                                    <select id="members"  className="br1" value={members} onChange={(e) => setMembers(e.target.value)} required>
                                        <option value="">Select no of Members for trip(max 3)</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>
                                <button type="submit" onClick={handleSubmit}>Proceed to Booking Confirmation</button>
                            </form>

                           </div>
                       </div>
                     </div>
                </section>
    );
};

export default Confirmation;