import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function ForgotPassword() {

    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        new_password: "",
        confirm_password: ""
    })

    const [mail, setMail] = useState({
        email: ""
    })

    const [userId, setUserId] = useState(null)

    const [sectionAction, setSectionAction] = useState(true)

    const handleUser = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://127.0.0.1:8000/users/email-check", mail)
            console.log(res.data);
            setUserId(res.data.UserId)
            setSectionAction(false)

        } catch (error) {
            alert("Server Response Error:", error)

        }
    }

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.put(`http://127.0.0.1:8000/users/forgot-password/${userId}`, userData)
            console.log(res.data);

            if (res.data.Message === "Password Mismatch") {
                alert("Passwords do not Match")

            } else {
                alert("Password Changed Successfully")
                navigate("/userlogin")

            }
            


        } catch (error) {
            alert("Server Response Error:", error)

        }

    }



    return (
        <main>
            <section className="container">
                {sectionAction ?
                    <div className="miniContainer">
                        <h2>Email Confirmation</h2>

                        <form onSubmit={handleUser}>
                            <div className="input">
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    value={mail.email}
                                    onChange={(e) => setMail({ ...mail, email: e.target.value })}
                                    required
                                />
                            </div>

                            <button type="submit" className="submitBtn">Confirm</button>

                        </form>
                    </div>
                    :
                    <div className="miniContainer">
                        <h2>Reset Password</h2>

                        <form onSubmit={handleForgotPassword}>

                            <div className="input">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    value={userData.new_password}
                                    onChange={(e) => setUserData({ ...userData, new_password: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="input">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    value={userData.confirm_password}
                                    onChange={(e) => setUserData({ ...userData, confirm_password: e.target.value })}
                                    required
                                />
                            </div>

                            <button type="submit" className="submitBtn">Reset Password</button>
                        </form>
                    </div>}
            </section>
        </main>
    )
}

export default ForgotPassword