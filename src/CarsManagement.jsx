import React, { useState, useEffect } from 'react'
import axios from 'axios'
import audi from './assets/audi.avif'
import marcedes from './assets/marcedes.jpeg'
import testla from './assets/testla.avif'

function CarsManagement() {

    return (
        <div>

            <div className="carsPage">

                <div className="carsTop">

                    <input
                        type="text"
                        placeholder="Search car name, model"
                        className="searchInput"
                    />

                    <button className="filterBtn">Filter</button>

                </div>

                <div className="carsGrid">

                    <div className="carCard">
                        <div className="carImageSection">
                            <span className="yearTag">2023</span>
                            <img src={audi} alt="Audi" />
                        </div>

                        <div className="carDetails">
                            <p className="carCategory">Premium Plus</p>
                            <h3>Audi Q7</h3>

                            <div className="specs">
                                <span>SUV</span>
                                <span>4 Seats</span>
                                <span>Auto</span>
                            </div>

                            <div className="carBottom">
                                <button className="rentBtn">Rent Now</button>
                                <p className="price">₹8,500 <span>/DAY</span></p>
                            </div>
                        </div>
                    </div>


                    <div className="carCard">
                        <div className="carImageSection">
                            <span className="yearTag">2023</span>
                            <img src={marcedes} alt="Benz" />
                        </div>

                        <div className="carDetails">
                            <p className="carCategory">Luxury</p>
                            <h3>Mercedes S-Class</h3>

                            <div className="specs">
                                <span>Sedan</span>
                                <span>4 Seats</span>
                                <span>Auto</span>
                            </div>

                            <div className="carBottom">
                                <button className="rentBtn">Rent Now</button>
                                <p className="price">12,000 <span>/DAY</span></p>
                            </div>
                        </div>
                    </div>


                    <div className="carCard">
                        <div className="carImageSection">
                            <span className="yearTag">2023</span>
                            <img src={testla} alt="Tesla" />
                        </div>

                        <div className="carDetails">
                            <p className="carCategory">Standard</p>
                            <h3>Tesla Model 3</h3>

                            <div className="specs">
                                <span>Sedan</span>
                                <span>4 Seats</span>
                                <span>Electric</span>
                            </div>

                            <div className="carBottom">
                                <button className="rentBtn">Rent Now</button>
                                <p className="price">₹10,000 <span>/DAY</span></p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default CarsManagement