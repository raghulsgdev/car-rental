import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Payment() {

    const [paymentSummary, setPaymentSummary] = useState({
        // totalBookings: 0,
        // totalPaidAmount: 0,
        // pendingAmount: 0
    })

    const [recentPayments, setRecentPayments] = useState([])

    const handleRecentPayments = async () => {

        const userId = localStorage.getItem("User Id")

        try {

            const res = await axios.get(`http://127.0.0.1:8000/users/recent-payments/${userId}`)
            console.log(res.data)
            setRecentPayments(res.data.recentPayments)

        } catch (error) {

            console.log("Server Error", error)

        }

    }

    const handlePaymentSummary = async () => {
        const userId = localStorage.getItem("User Id")

        try {
            const res = await axios.get(`http://127.0.0.1:8000/users/payment-summary/${userId}`)

            console.log(res.data);
            setPaymentSummary(res.data)

        } catch (error) {
            alert("Server Response Error", error)

        }
    }

    useEffect(() => {
        handlePaymentSummary()
        handleRecentPayments()
    }, [])



    return (
        <div>
            <main className="paymentParent">

                <header className="paymentHeader">
                    <h1>Payment Summary</h1>
                    <p>View your booking payments and transaction details</p>
                </header>

                <section className="paymentCards">

                    <div className="paymentCard">
                        <h3>Total Bookings</h3>
                        <p className="paymentNumber">{paymentSummary?.totalBookings}</p>
                    </div>

                    <div className="paymentCard">
                        <h3>Total Amount Paid</h3>
                        <p className="paymentNumber">{paymentSummary?.totalPaidAmount}</p>
                    </div>

                    <div className="paymentCard">
                        <h3>Pending Payment</h3>
                        <p className="paymentNumber">{paymentSummary?.pendingAmount}</p>
                    </div>

                </section>

                <section className="paymentHistory">
                    <h2>Recent Payments</h2>
                    <div className="paymentTable">
                        <table>
                            <thead className="tbHeader">
                                <tr>
                                    <th>Car</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    recentPayments.map((val, ind) => (

                                        <tr key={ind} className="tableRow">
                                            <td>{val.car_name}</td>
                                            <td>{val.payment_date}</td>
                                            <td>{val.paid_amount}</td>
                                            <td className="statusPaid">{val.payment_status}</td>
                                        </tr>

                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Payment