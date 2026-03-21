import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Profile from './Profile';

function Login() {

    const navigate = useNavigate()
    // const [first, setfirst] = useState(1)

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(userData);

        try {
            const storedData = await axios.post("http://127.0.0.1:8000/users/login", userData)
            console.log(storedData.data);
            console.log(storedData.data.Id);
            const userId = storedData.data.Id
            localStorage.setItem("User Id", JSON.stringify(userId))

            // alert(`Welcome Back ${storedData.data.Customer_name}`);
            // navigate("/userdashboard");

            if (storedData.data.Status === "notRegistered") {
                alert("Login failed — your email and password don’t match our records.")

            } else if (storedData.data.Status === "passwordIncorrect") {
                alert("Password is invalid. Check and re-enter.")

            } else {
                alert(`Welcome Back ${storedData.data.Customer_name}`)
                navigate("/userdashboard");
            }

        } catch (error) {
            // console.error("Server Response Error:", error);
            alert("Server Response Error:", error)
        }

    }

    return (

        <div>

            {/* <Profile/> */}
            <div className="container">
                <div className="miniContainer">
                    <h2>User Login</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="input">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                value={userData.email}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="input">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                value={userData.password}
                                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                required
                            />
                        </div>

                        <button type="submit" className="submitBtn">Login</button>
                        <div className='forgotSection'>
                            <Link className='link' to={'/userregister'}>New User?</Link>
                            <Link className='link' to={'/forgotpassword'}>Forgot Password?</Link>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    )
}

export default Login