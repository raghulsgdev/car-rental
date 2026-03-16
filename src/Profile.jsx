import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Profile() {

    const navigate = useNavigate()

    const [profileData, setProfileData] = useState([])

    // Updating Profile
    const [editMode, setEditMode] = useState(false)
    const [editProfile, setEditProfile] = useState({
        customer_name: "",
        email: "",
        phone: ""
    })

    // Changing Password
    const [passwordMode, setPasswordMode] = useState(false)
    const [changePassword, setchangePassword] = useState({
        current_password: "",
        new_password: "",
        confirm_password: ""
    })

    const handleProfile = async () => {

        const userId = localStorage.getItem("User Id")

        try {
            const Profile = await axios.get(`http://127.0.0.1:8000/users/profile/${userId}`)
            const data = Profile.data.profileData
            console.log("Profile Data", data)
            setProfileData([data])
            setEditProfile({
                customer_name: data.customer_name,
                email: data.email,
                phone: data.phone
            })

        } catch (error) {
            alert("Server Response Error", error)
        }
    }

    useEffect(() => {
        handleProfile()
    }, [])


    const handleSave = async () => {
        const userId = localStorage.getItem("User Id")

        try {

            await axios.put(`http://127.0.0.1:8000/users/update-profile/${userId}`, editProfile)
            setEditMode(false)
            handleProfile()

        } catch (error) {
            alert("Update Failed")
        }
    }


    const handlePasswordChange = async () => {

        if (changePassword.new_password !== changePassword.confirm_password) {
            alert("Passwords do not Match")
            return
        }

        const userId = localStorage.getItem("User Id")

        try {
            const res = await axios.put(`http://127.0.0.1:8000/users/change-password/${userId}`, changePassword)

            if (res.data.Message === "Incorrect Password") {
                alert("Current Password is Incorrect! Please Re-Enter.")

            } else {
                alert("Password Updated Successfully.")
        
            }

            setchangePassword({
                current_password: "",
                new_password: "",
                confirm_password: ""
            })


        } catch (error) {
            alert("Server Respose Error", error)

        }

    }


    return (
        <div>

            <main className="profileParent">

                <header className="profileHeader">
                    <h1>My Profile</h1>
                    <p>Manage your personal and account details</p>
                </header>

                <section className="profileCard">

                    {profileData.map((profile, ind) => {

                        return (

                            <div key={ind}>

                                <div className="profileTop">

                                    <div className="profileImageBox">
                                        <span className="material-symbols-outlined profileIcon">
                                            account_circle
                                        </span>
                                    </div>

                                    <div className="profileNameBox">

                                        {/* {editMode ?
                                            <input
                                                className="editInput"
                                                value={editProfile.customer_name}
                                                onChange={(e) =>
                                                    setEditProfile({
                                                        ...editProfile,
                                                        customer_name: e.target.value
                                                    })
                                                }
                                            />
                                            : */}
                                        <h2>{profile.customer_name}</h2>

                                        {/* } */}
                                        <p className="profileEmail">{profile.email}</p>

                                    </div>

                                </div>

                                <div className="profileDetails">

                                    <div className="detailRow">
                                        <span className="detailLabel">Full Name</span>

                                        {editMode ?
                                            <input
                                                className="editInput"
                                                value={editProfile.customer_name}
                                                onChange={(e) =>
                                                    setEditProfile({
                                                        ...editProfile,
                                                        customer_name: e.target.value
                                                    })
                                                }
                                            />
                                            :
                                            <span className="detailValue">{profile.customer_name}</span>
                                        }

                                    </div>

                                    <div className="detailRow">
                                        <span className="detailLabel">Email</span>

                                        {editMode ?
                                            <input
                                                className="editInput"
                                                value={editProfile.email}
                                                onChange={(e) =>
                                                    setEditProfile({
                                                        ...editProfile,
                                                        email: e.target.value
                                                    })
                                                }
                                            />
                                            :
                                            <span className="detailValue">{profile.email}</span>

                                        }

                                    </div>

                                    <div className="detailRow">
                                        <span className="detailLabel">Phone</span>
                                        {editMode ?
                                            <input
                                                className="editInput"
                                                value={editProfile.phone}
                                                onChange={(e) =>
                                                    setEditProfile({
                                                        ...editProfile,
                                                        phone: e.target.value
                                                    })
                                                }
                                            />
                                            :
                                            <span className="detailValue">{profile.phone}</span>
                                        }
                                    </div>


                                    <div className="detailRow">
                                        <span className="detailLabel">City</span>
                                        <span className="detailValue">Kumbakonam</span>
                                    </div>

                                    <div className="detailRow">
                                        <span className="detailLabel">Driver License</span>
                                        <span className="detailValue">TN123456789</span>
                                    </div>

                                    <div className="detailRow">
                                        <span className="detailLabel">Account Created</span>
                                        <span className="detailValue">{profile.created_at}</span>
                                    </div>

                                </div>

                            </div>

                        )

                    })}

                    <div className="profileButtons">
                        {!editMode ?
                            <>
                                <button className="editBtn" onClick={() => setEditMode(true)}>
                                    Edit Profile
                                </button>

                                <button className="passwordBtn" onClick={() => setPasswordMode(true)}>
                                    Change Password
                                </button>

                                <button className="logoutBtn" onClick={() => navigate("/")}>
                                    Logout
                                </button>
                            </>
                            :
                            <>
                                <button className="editBtn" onClick={handleSave}>
                                    Save
                                </button>

                                <button className="passwordBtn" onClick={() => setEditMode(false)}>
                                    Cancel
                                </button>
                            </>
                        }
                    </div>
                </section>

                {passwordMode && (

                    <div className="passwordCard">

                        <div className='passwordBox'>
                            <h2>Change Password</h2>
                            <div className="passwordForm">

                                <div className="passwordRow">
                                    <label>Current Password</label>
                                    <input
                                        type="password"
                                        value={changePassword.current_password}
                                        placeholder='Current Password'
                                        onChange={(e) =>
                                            setchangePassword({ ...changePassword, current_password: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="passwordRow">
                                    <label>New Password</label>
                                    <input
                                        type="password"
                                        value={changePassword.new_password}
                                        placeholder='New Password'
                                        onChange={(e) =>
                                            setchangePassword({ ...changePassword, new_password: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="passwordRow">
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        value={changePassword.confirm_password}
                                        placeholder='Confirm Password'
                                        onChange={(e) =>
                                            setchangePassword({ ...changePassword, confirm_password: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="passwordButtons">

                                    <button className="editBtn" onClick={() => handlePasswordChange()}>
                                        Update Password
                                    </button>

                                    <button className="passwordBtn" onClick={() => setPasswordMode(false)}>
                                        Cancel
                                    </button>

                                </div>

                            </div>
                        </div>



                    </div>

                )}

            </main>
        </div >
    )
}

export default Profile