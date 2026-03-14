import React, { useEffect, useState } from "react";
import axios from "axios";

function MyBookings() {

    const [currentBookings, setCurrentBookings] = useState([])
    const [completedBookings, setCompletedBookings] = useState([])

    const handleAPI = async () => {

        try {
            const userId = localStorage.getItem("User Id")

            const res = await axios.get(`http://127.0.0.1:8000/users/my-bookings/${userId}`)
            console.log(res.data);
            setCurrentBookings(res.data.currentBookingData)
            setCompletedBookings(res.data.completedBookingData)

        } catch (error) {
            alert("Server Response Error", error)

        }
    }

    useEffect(() => {
        handleAPI()
    }, [])

    return (
        <main className="bookingContainer">

            <header className="bookingHeader">
                <h1>My Bookings</h1>
                <p>View your current and past car bookings</p>
            </header>

            <section className="currentBookingSection">

                <h2 className="sectionTitle">Current Booking</h2>

                {
                    currentBookings.map((val, ind) => {
                        return (
                            <article key={ind} className="bookingCard">

                                <img
                                    className="carImage"
                                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
                                    alt="car"
                                />

                                <div className="bookingDetails">

                                    <h3 className="carName">{val.car_name}</h3>
                                    <p>Pickup Date: <strong>{val.start_date}</strong></p>
                                    <p>Return Date: <strong>{val.end_date}</strong></p>
                                    <p>Total Price: <strong>{val.total_amount}</strong></p>
                                    <span className="statusActive">{val.status}</span>

                                </div>

                            </article>
                        )
                    })
                }

            </section>

            <section className="historySection">

                <h2 className="sectionTitle">Booking History</h2>

                <div className="historyList">

                    {
                        
                        completedBookings.map((val, ind) => {
                            return (
                                <article key={ind} className="bookingCard">

                                    <img
                                        className="carImage"
                                        // src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7"
                                        src="https://images.unsplash.com/photo-1645145214095-84fca73e0cc5"
                                        alt="car"
                                    />

                                    <div className="bookingDetails">

                                        <h3 className="carName">{val.car_name}</h3>
                                        <p>{val.start_date}</p>
                                        <p>{val.end_date}</p>
                                        <p>{val.total_amount}</p>
                                        <span className="statusComplete">{val.status}</span>

                                    </div>

                                </article>
                            )
                        })
                    }

                </div>

            </section>

        </main>
    );
}

export default MyBookings;