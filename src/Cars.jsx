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

  // Pending Payment Inpt
  const [payInpt, setPayInpt] = useState({
    payment: ""
  })

  const [bookingData, setBookingData] = useState([])
  // Search Car
  const [search, setSearch] = useState("")

  // Car Id and Car Price Per Day
  const [carId, setCarId] = useState(0)
  const [price, setPrice] = useState(0)

  const [rentNow, setrentNow] = useState(false)

  
  
  const [bookingConfirmation, setBookingConfirmation] = useState(false)

  // Get Cars
  const [carData, setCarData] = useState([])
  const carApi = async () => {

    try {
      const carData = await axios.get("http://127.0.0.1:8000/users/cars")

      console.log(carData.data);
      setCarData(carData.data.CarData)

    } catch (error) {
      alert("Server Response Error", error)

    }
  }


  // Post Bookings
  const confirmBooking = async () => {
    const userId = localStorage.getItem("User Id")

    try {
      const bookingData = await axios.post(`http://127.0.0.1:8000/users/booking-confirm/${userId}`, {
        car_id: carId,
        start_date: value.start_date,
        end_date: value.end_date,
        car_price: price,
        payment: payInpt.payment
      })

      console.log(bookingData.data);

      if (bookingData.data.Message === "dateMismatch") {
        alert("End date must be after start date")
        return

      } else if (bookingData.data.Message === "Booking Confirmed") {
        setBookingData(bookingData.data)
        alert("Booked Successfully!")

      }

    } catch (error) {
      alert("Server Response Error", error)

    }
  }


  const handelBill = async () => {

    try {

      const res = await axios.post("http://127.0.0.1:8000/users/booking-bill", {
        car_id: carId,
        start_date: value.start_date,
        end_date: value.end_date,
        car_price: price

      })

      if (res.data.Message === "dateMismatch") {
        alert("End date must be after start date")
        return
      }

      setBookingData(res.data)
      setBookingConfirmation(true)

    } catch (error) {
      alert("Server Response Error", error)
    }
  }


  const filteredCars = carData.filter((car) =>

    car.car_name.toLowerCase().includes(search.toLowerCase()) ||
    car.brand.toLowerCase().includes(search.toLowerCase()) ||
    car.model.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    carApi()
  }, [])


  // Rental Logic
  function handleRent(carId, carPrice) {
    setCarId(carId)
    setPrice(carPrice)
    // console.log("Car Id", carId);
    // console.log("Car Price", carPrice);
    setrentNow(true)
  }

  async function handleConfirmation(e) {
    e.preventDefault()
    await handelBill()

  }

  async function handlePayment() {

    await confirmBooking()
    setrentNow(false)
    setBookingConfirmation(false)

    setValue({
      start_date: "",
      end_date: ""
    })

    setPayInpt({
      payment: ""
    })

  }

  return (
    <div>
      <div className="carsPage">

        <div className="carsTop">

          <input
            type="text"
            placeholder="Search car name, model"
            className="searchInput"
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className='carsGrid'>
          {
            filteredCars.map((cars, ind) => {
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
                      <span>{cars.brand}</span>
                      <span>{cars.seats}</span>
                      <span>{cars.transmission}</span>
                      <p>{cars.available_status}</p>
                    </div>

                    <div className='desSec'>
                      <span className='description'>{cars.description}</span>
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

        {bookingConfirmation &&
          <div className="bookingPopup">
            <div className="popupBox">
              <h3>Booking Summary</h3>

              <div className="popupDetails">
                <p><strong>Car:</strong> {bookingData.Bill?.car_name}</p>
                <p><strong>Pickup Date:</strong>{bookingData.Bill?.start_date}</p>
                <p><strong>Return Date:</strong>{bookingData.Bill?.end_date}</p>
                <p><strong>Price / Day:</strong> {bookingData.Price_Per_Day}</p>
                <p className="totalPrice"><strong>Total Amount:</strong> {bookingData.Total_Amount}</p>
                <input
                  type="number"
                  className='payInpt'
                  placeholder='Enter the Paying Amount'
                  value={payInpt.payment}
                  onChange={(e) => setPayInpt({ ...payInpt, payment: Number(e.target.value) })}
                />
              </div>

              <button className="confirmPaymentBtn" onClick={() => handlePayment()}>Confirm</button>
            </div>

          </div>
        }
      </div>

    </div>
  )
}

export default Cars