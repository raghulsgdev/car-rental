import React, { useState, useEffect } from 'react'
import axios from 'axios'
import audi from './assets/audi.avif'
import marcedes from './assets/marcedes.jpeg'
import testla from './assets/testla.avif'

function CarsManagement() {
    const [carData, setCarData] = useState([])

    const carApi = async () => {

        try {
            const carData = await axios.get("http://127.0.0.1:8000/admin/cars")

            console.log(carData.data);
            setCarData(carData.data.carsData)

        } catch (error) {
            alert("Server Response Error", error)

        }
    }

    useEffect(() => {
        carApi()
    }, [])

    return (
        <div>

            <div className="carsPage">

                <div className="carsTop">

                    <input
                        type="text"
                        placeholder="Add New Car"
                        // value={carAdd.car}
                        className="searchInput"
                        // onChange={(e) => setCarAdd({...carAdd, car: e.target.value})}
                    />

                    <button className="filterBtn">Add +</button>

                </div>

                <div className="carsGrid">

                    {
                        carData.map((val, ind) => {

                            return (
                                <div key={ind} className="carCard">
                                    <div className="carImageSection">
                                        <span className="yearTag">{val.year}</span>
                                        <img src={testla} alt="Tesla" />
                                    </div>

                                    <div className="carDetails">
                                        <p className="carCategory">Standard</p>
                                        <h3>{val.car_name} {val.model}</h3>

                                        <div className="specs">
                                            <span>Sedan</span>
                                            <span>{val.seats}</span>
                                            <span>{val.transmission}</span>
                                        </div>

                                        <div className="carBottom">
                                            {/* <button className="rentBtn">Rent Now</button> */}
                                            <p className="price"> {val.price_per_day} <span>/DAY</span></p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

            </div>
        </div>
    )
}

export default CarsManagement