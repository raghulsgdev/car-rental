import React from 'react'

function Payment() {
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
                        <p className="paymentNumber">12</p>
                    </div>

                    <div className="paymentCard">
                        <h3>Total Amount Paid</h3>
                        <p className="paymentNumber">₹ 24,500</p>
                    </div>

                    <div className="paymentCard">
                        <h3>Pending Payment</h3>
                        <p className="paymentNumber">₹ 2,000</p>
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

                                <tr className="tableRow">
                                    <td>Hyundai Creta</td>
                                    <td>12 Feb 2026</td>
                                    <td>₹ 4500</td>
                                    <td className="statusPaid">Paid</td>
                                </tr>

                                <tr className="tableRow">
                                    <td>Mahindra Thar</td>
                                    <td>28 Jan 2026</td>
                                    <td>₹ 5200</td>
                                    <td className="statusPaid">Paid</td>
                                </tr>

                                <tr className="tableRow">
                                    <td>Toyota Fortuner</td>
                                    <td>10 Mar 2026</td>
                                    <td>₹ 6000</td>
                                    <td className="statusPending">Pending</td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                </section>

            </main>
        </div>
    )
}

export default Payment