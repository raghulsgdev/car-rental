import React from 'react'

function Demo() {
    return (
        <div>
            <div className="bookingPopup">

                <div className="popupBox">

                    <h3>Booking Summary</h3>

                    <div className="popupDetails">
                        <p><strong>Car:</strong> {bookingData.data?.car_name}</p>
                        <p><strong>Pickup Date:</strong>{bookingData.Bill?.start_date}</p>
                        <p><strong>Return Date:</strong>{bookingData.Bill?.end_date}</p>
                        <p><strong>Total Days:</strong> 2</p>
                        <p><strong>Price / Day:</strong> {bookingData.Price_Per_Day}</p>
                        <p className="totalPrice"><strong>Total Amount:</strong> {bookingData.Total_Amount}</p>
                    </div>

                    <button className="confirmPaymentBtn" onClick={() => handlePayment}>Confirm</button>

                </div>

            </div>
        </div>
    )
}

export default Demo