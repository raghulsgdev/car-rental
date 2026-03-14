import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

    const navigate = useNavigate()

    const eMail = 'raghul@gmail.com'
    const passWord = '9080'

    const [adminData, setAdminData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(adminData);

        if (adminData.email !== eMail && adminData.password !== passWord) {
            alert("Login failed — your email and password don’t match our records.")

        } else if (adminData.email === eMail && adminData.password !== passWord) {
            alert("Password is invalid. Check and re-enter.")

        } else if (adminData.email !== eMail && adminData.password === passWord) {
            alert("Please enter a valid email address.")

        } else {
            alert("Welcome back! You’ve logged in successfully.")
            navigate('/admindashboard')
        }

    };

    
    return (
        <div className="container">
            <div className="miniContainer">
                <h2>Admin Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="input">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter Admin Email"
                            name="email"
                            value={adminData.email}
                            onChange={(e) => setAdminData({ ...adminData, [e.target.name]: e.target.value })}
                            required
                        />
                    </div>

                    <div className="input">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            value={adminData.password}
                            onChange={(e) => setAdminData({ ...adminData, [e.target.name]: e.target.value })}
                            required
                        />
                    </div>

                    <button type="submit" className="submitBtn">Login</button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;