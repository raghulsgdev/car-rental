import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        customer_name: "",
        email: "",
        phone: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log("Hello");

        try {
            // console.log('Hii');
            const response = await axios.post("http://127.0.0.1:8000/users/registration", formData);
            console.log("Server Response:", response.data);
            // console.log("Server Response:", formData);

            if (response.data.Status === "error") {
                alert(response.data.Message)

            } else {
                alert("Registration Successful")
                navigate("/userlogin")

            }

            setFormData({
                customer_name: "",
                email: "",
                phone: "",
                password: "",
            })

        } catch (error) {
            console.error("Server Response Error:", error);
        }
    };

    return (
        <div>
            <div className="container">
                <div className="miniContainer">
                    <h2>Welcome Back</h2>
                    <p className="subtitle">Register To Rent Your Car 🚗</p>

                    <form onSubmit={handleSubmit}>
                        <div className="input">
                            <label>Username</label>
                            <input
                                type="text"
                                name="customer_name"
                                placeholder="Enter your name"
                                value={formData.customer_name}
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                required
                            />
                        </div>

                        <div className="input">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                required
                            />
                        </div>

                        <div className="input">
                            <label>Mobile Number</label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Enter your mobile number"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                required
                            />
                        </div>

                        <div className="input">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                required
                            />
                        </div>

                        <button type="submit" className="submitBtn">Continue</button>
                        <Link className="link" to={'/userlogin'}>Already have an account?</Link>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default Register;