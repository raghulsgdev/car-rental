import React, { useState, useEffect } from 'react'
import axios from 'axios'
import audi from './assets/audi.avif'
import marcedes from './assets/marcedes.jpeg'
import testla from './assets/testla.avif'

function Cars() {

  // Getting Inpt Values
  const [value, setValue] = useState({
    start_date: "",
    end_date: ""
  })

  // Car Id and Car Price Per Day
  const [carId, setCarId] = useState(0)
  const [price, setPrice] = useState(0)

  const [rentNow, setrentNow] = useState(false)

  const [carData, setCarData] = useState([])
  const [bookingData, setBookingData] = useState([])
  const [bookingConfirmation, setBookingConfirmation] = useState(false)

  // console.log("API Checking 3...");

  // Get Cars
  const carApi = async () => {
    // console.log("API Checking 1...");
    try {
      // console.log("API Checking 2...");

      const carData = await axios.get("http://127.0.0.1:8000/users/cars")
      console.log(carData.data);
      setCarData(carData.data.CarData)

    } catch (error) {
      alert("Server Response Error", error)

    }
  }


  // Post Bookings
  const bookingApi = async () => {
    try {

      const userId = localStorage.getItem("User Id")
      const bookingData = await axios.post(`http://127.0.0.1:8000/users/booking-form/${userId}`, {
        car_id: carId,
        start_date: value.start_date,
        end_date: value.end_date,
        car_price: price
      })

      if (bookingData.data.Message === "dateMismatch") {
        alert("End date must be after start date")
        return
      }


      setBookingData(bookingData.data)
      // setBookingConfirmation(true)

    } catch (error) {
      alert("Server Response Error", error)

    }
  }

  useEffect(() => {
    carApi()
  }, [])


  // Rental Logic
  function handleRent(carId, carPrice) {
    setCarId(carId)
    setPrice(carPrice)
    console.log("Car Id", carId);
    console.log("Car Price", carPrice);
    setrentNow(true)
  }

  function handleConfirmation(e) {
    e.preventDefault()
    console.log(value);
    setBookingConfirmation(true)
    // rentNow(false)
    // bookingApi()

    setValue({
      start_date: "",
      end_date: ""
    })
  }

  function handlePayment() {
    setrentNow(false)
    setBookingConfirmation(false)
    bookingApi()
  }

  return (
    <div>
      <div className="carsPage">

        <div className="carsTop">

          <input
            type="text"
            placeholder="Search car name, model"
            className="searchInput"
          />

          {/* <button className="filterBtn">Filter</button> */}

        </div>

        {/* Cars List */}
        <div className='carsGrid'>
          {
            carData.map((cars, ind) => {
              return (
                <div key={ind}>
                  <div className="carImageSection">
                    <span className="yearTag">{cars.year}</span>
                    <img src={audi} alt="Audi" />
                  </div>

                  <div className="carDetails">
                    <p className="carCategory">Premium Plus</p>
                    <h3>{cars.car_name} {cars.model}</h3>

                    <div className="specs">
                      <span>SUV</span>
                      <span>{cars.seats}</span>
                      <span>{cars.transmission}</span>
                      <p>{cars.available_status}</p>
                    </div>

                    <div className="carBottom">
                      <button className="rentBtn" onClick={() => handleRent(ind + 1, cars.price_per_day)}>Rent Now</button>
                      <p className="price">₹{cars.price_per_day} <span>/DAY</span></p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>

        {/* Booking PopUp */}
        {rentNow &&
          <form className="bookingParent" onSubmit={handleConfirmation}>

            <h3 className="bookingTitle">Book This Car</h3>

            <div className="bookingForm">

              <div className="inputGroup">
                <label>Start Date</label>
                <input type="date"
                  name='start_date'
                  value={value.start_date}
                  onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })}
                  required
                />
              </div>

              <div className="inputGroup">
                <label>End Date</label>
                <input type="date"
                  name='end_date'
                  value={value.end_date}
                  onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })}
                  required
                />
              </div>

            </div>

            <button className="bookBtn">Confirm Booking</button>

          </form>
        }

        {/* Booking Confirmation PopUp */}
        {bookingConfirmation &&
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
        }
      </div>
      
    </div>
  )
}

export default Cars