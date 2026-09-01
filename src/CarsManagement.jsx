import React, { useState, useEffect } from 'react'
import axios from 'axios'
import audi from './assets/audi.avif'
import marcedes from './assets/marcedes.jpeg'
import testla from './assets/testla.avif'

function CarsManagement() {

    const [carData, setCarData] = useState([])


    // Add Car
    const [add, setAdd] = useState(false)
    const [addCar, setAddCar] = useState({
        car_name: "",
        brand: "",
        model: "",
        year: "",
        description: "",
        price_per_day: "",
        fuel_type: "",
        seats: "",
        transmission: ""
    })


    // Fetch Car From DB
    const carApi = async () => {

        try {
            const carData = await axios.get("http://127.0.0.1:8000/admin/cars")
            console.log(carData.data);
            setCarData(carData.data.carsData)

        } catch (error) {
            alert("Server Response Error", error)

        }
    }


    // Post New Cars
    const handleAPI = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post("http://127.0.0.1:8000/admin/add-cars", addCar)
            console.log(res.data);
            // setCarData(res.data)
            await carApi()

        } catch (error) {
            alert("Server Response Error", error)

        } finally {
            setAdd(false)
            
            setAddCar({
                car_name: "",
                brand: "",
                model: "",
                year: "",
                description: "",
                price_per_day: "",
                fuel_type: "",
                seats: "",
                transmission: ""
            })

        }

    }

    useEffect(() => {
        carApi()
    }, [])


    return (
        <div>

            {/* Add New Car to DB */}
            <div className="carsPage">

                {add ?
                    <section>
                        <form className='addSection' onSubmit={handleAPI}>

                            <h2>Add New Cars 🚗</h2>

                            <div>
                                <input
                                    type="text"
                                    placeholder='Car Name'
                                    className='addInpt'
                                    name='car_name'
                                    value={addCar.car_name}
                                    onChange={(e) => setAddCar({ ...addCar, [e.target.name]: e.target.value })}
                                    required
                                />

                                <input
                                    type="text"
                                    placeholder='Brand'
                                    className='addInpt'
                                    name='brand'
                                    value={addCar.brand}
                                    onChange={(e) => setAddCar({ ...addCar, [e.target.name]: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder='Model'
                                    className='addInpt'
                                    name='model'
                                    value={addCar.model}
                                    onChange={(e) => setAddCar({ ...addCar, [e.target.name]: e.target.value })}
                                    required
                                />

                                <input
                                    type="number"
                                    placeholder='Year'
                                    className='addInpt'
                                    min={1900} max={2100}
                                    step={1}
                                    name='year'
                                    value={addCar.year}
                                    onChange={(e) => setAddCar({ ...addCar, [e.target.name]: e.target.value })}
                                    required
                                />
                            </div>

                            <div>

                                <input
                                    type="text"
                                    placeholder='Transmission'
                                    className='addInpt'
                                    name='transmission'
                                    value={addCar.transmission}
                                    onChange={(e) => setAddCar({ ...addCar, [e.target.name]: e.target.value })}
                                    required
                                />

                                <input
                                    type="text"
                                    placeholder='Price Per Day'
                                    className='addInpt'
                                    name='price_per_day'
                                    value={addCar.price_per_day}
                                    onChange={(e) => setAddCar({ ...addCar, [e.target.name]: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder='Fuel Type'
                                    className='addInpt'
                                    name='fuel_type'
                                    value={addCar.fuel_type}
                                    onChange={(e) => setAddCar({ ...addCar, [e.target.name]: e.target.value })}
                                    required
                                />

                                <input
                                    type="number"
                                    placeholder='Total Seats'
                                    className='addInpt'
                                    name='seats'
                                    value={addCar.seats}
                                    onChange={(e) => setAddCar({ ...addCar, [e.target.name]: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <textarea
                                    placeholder='Description'
                                    className='desInpt'
                                    name='description'
                                    value={addCar.description}
                                    onChange={(e) => setAddCar({ ...addCar, [e.target.name]: e.target.value })}
                                    required
                                >
                                </textarea>
                            </div>

                            {/* <div>
                                <input type="file" />
                            </div> */}

                            <div>
                                <button className='addBtn'>
                                    Add
                                </button>
                                <button className='backBtn' onClick={() => setAdd(false)}>
                                    Back
                                </button>
                            </div>

                        </form>
                    </section>
                    :
                    <>
                        <div className="carsTop">
                            <button className="filterBtn" onClick={() => setAdd(true)}>
                                <span class="material-symbols-outlined Icon">
                                    add
                                </span>
                                Add 🚗
                            </button>
                        </div>

                        {/* Fetch Cars From DB */}
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
                                                    <span>{val.brand}</span>
                                                    <span>{val.seats}</span>
                                                    <span>{val.transmission}</span>

                                                </div>
                                                <div className='desSec'>
                                                    <span className='description'>{val.description}</span>
                                                </div>

                                                <div className="carBottom">
                                                    <p className="price"> {val.price_per_day} <span>/DAY</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </>
                }

            </div>
        </div>
    )
}

export default CarsManagement