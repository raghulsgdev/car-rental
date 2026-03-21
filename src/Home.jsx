import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Home() {

    const [home, setHome] = useState([])

    const handleApi = async () => {
        try {
            const userId = localStorage.getItem("User Id")
            const home = await axios.get(`http://127.0.0.1:8000/users/booking/${userId}`)
            console.log(home.data);
            setHome(home.data)


        } catch (error) {
            alert("Server Response Error", error)

        }
    }

    useEffect(() => {
        handleApi()
    }, [])

    return (
        <div>
            <main className="homeParent">

                <section className="bannerSection">

                    <img
                        className="bannerImage"
                        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7"
                        // src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
                        // src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
                        alt="car banner"
                    />

                    <div className="bannerContent">
                        <h2>Drive Your Dream Car</h2>
                        <p>Explore premium cars for your next journey.</p>
                    </div>

                </section>

                <section className="welcomeBox">
                    <h1 className="welcomeTitle">Welcome Back <span> {home.userName} 👋🏻</span></h1>
                    <p className="welcomeText">
                        Book your favorite cars easily and manage your bookings here.
                    </p>
                </section>

                <section className="statsSection">

                    <div className="statCard">
                        <h2 className="statTitle">Total Bookings 🗓️</h2>
                        <p className="statNumber">{home.totalBookings}</p>
                        <p className="statText">Cars booked</p>
                    </div>

                    <div className="statCard">
                        <h2 className="statTitle">Total Amount Spent 💵</h2>
                        <p className="statNumber">{home.totalAmtSpend}</p>
                        <p className="statText">On car rentals</p>
                    </div>

                </section>

            </main>
        </div>
    )
}

export default Home