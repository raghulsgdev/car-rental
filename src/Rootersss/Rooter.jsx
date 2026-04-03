import React from 'react'
import Index from '../Index'
import Admin from '../Admin'
import Login from '../Login'
import Register from '../Register'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from '../AdminDashboard'
import Overview from '../Overview'
import UsersManagement from '../UsersManagement'
import CarsManagement from '../CarsManagement'
import Report from '../Report'
import Bookings from '../Bookings'
import UserDashboard from '../UserDashboard'
import Home from '../Home'
import Cars from '../Cars'
import MyBookings from '../MyBookings'
import Payment from '../Payment'
import Profile from '../Profile'
import ForgotPassword from '../ForgotPassword'

function Rooter() {
    return (
        <>
            <Routes>
                <Route path='/' element={< Index />} />
                <Route path='/adminlogin' element={<Admin />} />
                <Route path='/userlogin' element={< Login />} />
                <Route path='/forgotpassword' element={< ForgotPassword />} />
                <Route path='/userregister' element={< Register />} />

                <Route path='/admindashboard' element={< AdminDashboard />}>
                    <Route index element={<Overview />} />
                    <Route path="users" element={<UsersManagement />} />
                    <Route path="cars" element={<CarsManagement />} />
                    <Route path="bookings" element={<Bookings />} />
                    <Route path="report" element={<Report />} />
                </Route>

                <Route path='/userdashboard' element={<UserDashboard />}>
                    <Route index element={<Home />} />
                    <Route path='cars' element={<Cars />} />
                    <Route path='mybookings' element={<MyBookings />} />
                    <Route path='payment' element={<Payment />} />
                    <Route path='profile' element={<Profile />} />
                </Route>
            </Routes>
        </>
    )
}

export default Rooter