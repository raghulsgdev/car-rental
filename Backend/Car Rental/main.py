from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
from datetime import date
from decimal import Decimal

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"],
)

def car_rental():
     return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="car_rental",
        port="3306"
    )

# Users Login Page
class UserLogin(BaseModel):
    email: str
    password: str

@app.post("/users/login")
def insert_user(data: UserLogin):
    db = car_rental()
    cursor = db.cursor(dictionary=True)

    try:
        cursor.execute(
            "SELECT * FROM users WHERE email = %s"
            , (data.email,)
        )
        user = cursor.fetchone()

        if not user:
            return {
                "Status": "notRegistered",
                "Error": "Account Not Found"
            }

        elif user["password"] != data.password:
            return {
                "Status": "passwordIncorrect",
                "Error": "Incorrect Password"
            }

        return {
            "Status": "Success",
            "Message": "Login Successful",
            "Id": user["id"],
            "Customer_name": user["customer_name"]
        }

    except Exception as  e:
        return {"Server Response Error", e}

    finally:
        cursor.close()
        db.close()



# Forgot Password - Email Confirmation
class MailConfirmation(BaseModel):
    email: str

@app.post("/users/email-check")
def user_registration(request: MailConfirmation):
    db = car_rental()
    cursor = db.cursor(dictionary=True)

    try:
        cursor.execute(
            "SELECT id FROM users WHERE email = %s"
            , (request.email,)
        )
        emailFound = cursor.fetchone()

        if not emailFound:
            return {"Message": "User Not Found"}

        else:
            return {
                "Message": "User Found",
                "UserId": emailFound["id"]
            }

    except Exception as e:
        return {"Server Response Error", e}

    finally:
        cursor.close()
        db.close()



# Forgot Password - Reset
class ForgotPassword(BaseModel):
    new_password: str
    confirm_password: str

@app.put("/users/forgot-password/{user_id}")
def user_registration(request: ForgotPassword, user_id: int):
    db = car_rental()
    cursor = db.cursor(dictionary=True)

    try:
        if request.new_password != request.confirm_password:
            return {"Message": "Password Mismatch"}

        else:
            cursor.execute(
                "UPDATE users SET password = %s WHERE id = %s"
                ,(request.new_password, user_id)
            )
            db.commit()

        return {"Message": "Password Updated Successfully"}

    except Exception as e:
        return {"Server Response Error", e}

    finally:
        cursor.close()
        db.close()

# Users Register Page
class UserRegister(BaseModel):
    customer_name: str
    email: str
    phone: str
    password: str

@app.post("/users/registration")
def user_registration(data: UserRegister):
    db = car_rental()
    cursor = db.cursor(dictionary=True)

    try:
        cursor.execute(
            "SELECT * FROM users WHERE email = %s"
            , (data.email,)
        )
        registeredUser = cursor.fetchone()

        if registeredUser:
            return {
                "Status": "error",
                "Message": "User already registered with this email"
            }

        cursor.execute(
            "INSERT INTO users (customer_name, email, phone, password) VALUES (%s, %s, %s, %s)"
            , (data.customer_name, data.email, data.phone, data.password)
        )
        db.commit()

        return {
            "Message": "Registration Successful",
            "Result": data
        }

    except Exception as e:
        return {"Server Response Error", e}

    finally:
        cursor.close()
        db.close()




# Users Management Page
@app.get("/users/management")
def users_list():
    db = car_rental()
    cursor = db.cursor(dictionary=True)

    try:
        cursor.execute(
            "SELECT id, customer_name, email, phone, created_at FROM users"
        )
        users = cursor.fetchall()

        return {
            "Message": "success",
            "Status": "Active",
            "Users": users
        }

    except Exception as e:
        return {"Server Response Error", e}

    finally:
        cursor.close()
        db.close()



# Cars Management Page
@app.get("/users/cars")
def cars_list():
    db = car_rental()
    cursor = db.cursor(dictionary=True)

    try:
        cursor.execute(
            "SELECT car_name, brand, model, year, price_per_day, seats, transmission, available_status, description FROM cars"
        )
        cars = cursor.fetchall()

        return {
            "CarData": cars
        }

    except Exception as e:
        print("Server Response Error", e)

    finally:
        cursor.close()
        db.close()


# User Dashboard
@app.get("/users/booking/{user_id}")
def cars_booking(user_id: int):
    db = car_rental()
    cursor = db.cursor(dictionary=True)

    try:
        cursor.execute(
           "SELECT COUNT(*) AS total_bookings FROM bookings WHERE user_id = %s", (user_id, )
        )
        total_bookings = cursor.fetchone()["total_bookings"] or 0

        cursor.execute(
            "SELECT SUM(total_amount) AS total_spend FROM bookings WHERE user_id = %s"
            , (user_id,)
        )
        total_amount_spend = cursor.fetchone()["total_spend"] or 0

        cursor.execute(
            "SELECT customer_name FROM users WHERE id = %s"
            ,(user_id,)
        )
        user_name = cursor.fetchone()["customer_name"]

        return {
            "Message": "Success",
            "userName": user_name,
            "totalBookings": total_bookings,
            "totalAmtSpend": total_amount_spend
        }

    except Exception as e:
        print("Server Response Error", e)

    finally:
        cursor.close()
        db.close()


# Car Booking Form
class BillRequest(BaseModel):
    car_id: int
    start_date: date
    end_date: date
    car_price: float

@app.post("/users/booking-bill")
def booking_bill(request: BillRequest):

    if request.end_date <= request.start_date:
        return {"Message": "dateMismatch"}

    db = car_rental()
    cursor = db.cursor(dictionary=True)

    try:
        days = (request.end_date - request.start_date).days
        total_amount = days * request.car_price

        cursor.execute(
            "SELECT car_name FROM cars WHERE id = %s",
            (request.car_id,)
        )
        car = cursor.fetchone()

        return {
            "Message": "Success",
            "Price_Per_Day": request.car_price,
            "Total_Amount": total_amount,
            "Bill": {
                "car_name": car["car_name"],
                "start_date": request.start_date,
                "end_date": request.end_date
            }
        }

    except Exception as e:
        return {"Server Response Error", e}

    finally:
        cursor.close()
        db.close()



# Confirm Booking
class BookingConfirm(BaseModel):
    car_id: int
    start_date: date
    end_date: date
    car_price: float
    payment: float

@app.post("/users/booking-confirm/{user_id}")
def booking_confirm(request: BookingConfirm, user_id: int):
    db = car_rental()
    cursor = db.cursor(dictionary=True)

    try:
        if request.end_date <= request.start_date:
            return {"Message": "dateMismatch"}

        days = (request.end_date - request.start_date).days
        total_amount = days * request.car_price
        pending_amount = total_amount - request.payment
        payment_status = "Paid" if pending_amount <= 0 else "Partial"

        cursor.execute(
            "INSERT INTO bookings (user_id, car_id, start_date, end_date, total_amount) VALUES (%s, %s, %s, %s, %s)",
            (user_id, request.car_id, request.start_date, request.end_date, total_amount)
        )
        booking_id = cursor.lastrowid

        cursor.execute(
            "INSERT INTO payments (booking_id, paid_amount, pending_amount, payment_method, payment_status) VALUES (%s,%s,%s,'Online',%s)",
            (booking_id, request.payment, pending_amount, payment_status)
        )
        db.commit()

        return {"Message": "Booking Confirmed"}

    except Exception as e:
        return {"Server Response Error": e}

    finally:
        cursor.close()
        db.close()


# My Bookings - Current Bookings / Completed Bookings
@app.get("/users/my-bookings/{user_id}")
def my_bookings(user_id: int):
    db = car_rental()
    cursor = db.cursor(dictionary=True)

    try:
        today = date.today()

        cursor.execute(
            "UPDATE bookings SET status = 'Completed' WHERE end_date < %s AND status != 'Completed'",
            (today,)
        )
        db.commit()

        cursor.execute(
            "SELECT c.car_name, b.start_date, b.end_date, b.total_amount, b.status FROM bookings AS b JOIN cars AS c ON b.car_id = c.id WHERE b.user_id = %s"
            , (user_id,)
        )
        currentBookings = cursor.fetchall()

        cursor.execute(
            "SELECT c.car_name, b.start_date, b.total_amount, b.status FROM bookings AS b JOIN cars AS c ON b.car_id = c.id WHERE b.user_id = %s"
            , (user_id,)
        )
        recentBookings = cursor.fetchall()

        return {
            "Message": "Success",
            "currentBookingData": currentBookings,
            "completedBookingData": recentBookings
        }

    except Exception as e:
        print("Server Response Error", e)

    finally:
        cursor.close()
        db.close()


# My Bookings - Completed Bookings
@app.get("/users/completed-bookings/{user_id}")
def completed_bookings(user_id: int):
    db = car_rental()
    cursor = db.cursor(dictionary=True)

    try:
        cursor.execute(
            "SELECT c.car_name, b.start_date, b.end_date, b.total_amount, b.status FROM bookings AS b JOIN cars AS c ON b.car_id = c.id WHERE b.user_id = %s AND b.status = 'Completed'"
            , (user_id,)
        )
        completedBookings = cursor.fetchall()

        return {
            "Message": "Success",
            "completedBookingData": completedBookings
        }

    except Exception as e:
        print("Server Response Error", e)

    finally:
        cursor.close()
        db.close()



# Payment Summary
@app.get("/users/payment-summary/{user_id}")
def payment_summary(user_id: int):
    db = car_rental()
    cursor = db.cursor(dictionary=True)

    try:
        cursor.execute(
            "SELECT COUNT(*) AS total_bookings FROM bookings WHERE user_id = %s",
            (user_id,)
        )
        totalBookings = cursor.fetchone()["total_bookings"] or 0

        cursor.execute(
            "SELECT SUM(b.total_amount) AS total_amount FROM bookings AS b WHERE user_id = %s",
            (user_id,)
        )
        totalAmount = cursor.fetchone()["total_amount"] or 0

        cursor.execute(
            "SELECT SUM(p.paid_amount) AS paid_amount FROM payments AS p RIGHT JOIN bookings AS b ON p.booking_id = b.id WHERE b.user_id = %s",
            (user_id,)
        )
        totalPaid = cursor.fetchone()["paid_amount"] or 0

        cursor.execute(
            "SELECT SUM(p.pending_amount) AS pending FROM payments p JOIN bookings b ON p.booking_id = b.id WHERE b.user_id = %s",
            (user_id,)
        )
        pendingAmount = cursor.fetchone()["pending"] or 0

        return {
            "totalBookings": totalBookings,
            "totalPaidAmount": totalPaid,
            "pendingAmount": pendingAmount
        }

    except Exception as e:
        print("Server Response Error", e)

    finally:
        cursor.close()
        db.close()


# Recent Bookings
@app.get("/users/recent-payments/{user_id}")
def recent_payments(user_id: int):
    db = car_rental()
    cursor = db.cursor(dictionary=True)

    try:
        cursor.execute(
            "SELECT c.car_name, p.payment_date, p.paid_amount, p.payment_status, booking_id FROM payments p JOIN bookings b ON p.booking_id = b.id JOIN cars c ON b.car_id = c.id  WHERE b.user_id = %s ORDER BY p.payment_date DESC LIMIT 5"
            ,(user_id,)
        )
        payments = cursor.fetchall()

        return {
            "recentPayments": payments
        }

    except Exception as e:
        print("Server Response Error", e)

    finally:
        cursor.close()
        db.close()



# Pending Pay
class PendingPayment(BaseModel):
    pending_amount: float

@app.put("/users/pending-pay/{booking_id}")
def pending_pay(request: PendingPayment, booking_id: int):
    db = car_rental()
    cursor = db.cursor(dictionary=True)

    try:
        cursor.execute(
            "SELECT paid_amount, pending_amount FROM payments WHERE booking_id = %s",
            (booking_id,)
        )
        data = cursor.fetchone()

        if not data:
            return {"Message": "Payment Not Found"}

        amount = Decimal(str(request.pending_amount))

        new_paid = data["paid_amount"] + amount
        new_pending = data["pending_amount"] - amount

        if new_pending < 0:
            new_pending = 0

        status = "Paid" if new_pending == 0 else "Partial"

        cursor.execute(
            "UPDATE payments SET paid_amount = %s, pending_amount = %s, payment_status = %s WHERE booking_id = %s",
            (new_paid, new_pending, status, booking_id)
        )
        db.commit()

        return {"Message": "Paid Successfully"}

    except Exception as e:
        return {"Server Response Error": str(e)}

    finally:
        cursor.close()
        db.close()


# Profile Page
@app.get("/users/profile/{user_id}")
def profile(user_id: int):
    db = car_rental()
    cursor = db.cursor(dictionary=True)

    try:
        cursor.execute(
            "SELECT customer_name, phone, email, created_at FROM users WHERE id = %s"
            , (user_id,)
        )
        usersProfile = cursor.fetchone()

        return {
            "Message": "Success",
            "profileData": usersProfile
        }

    except Exception as e:
        print("Server Response Error", e)

    finally:
        cursor.close()
        db.close()


# Update Profile
class UpdateProfile(BaseModel):
    customer_name: str
    email: str
    phone: str

@app.put("/users/update-profile/{user_id}")
def update_profile(request: UpdateProfile ,user_id: int):
    db = car_rental()
    cursor = db.cursor(dictionary=True)

    try:
        cursor.execute(
            "UPDATE users SET customer_name = %s, email = %s, phone = %s WHERE id = %s"
            , (request.customer_name, request.email, request.phone, user_id,)
        )
        db.commit()

        return {"Message": "Profile Updated Successfully"}

    except Exception as e:
        return {"Server Response Error", e}

    finally:
        cursor.close()
        db.close()


# Update Profile Changing Password
class ChangePassword(BaseModel):
    current_password: str
    new_password: str
    confirm_password: str

@app.put("/users/change-password/{user_id}")
def change_password(request: ChangePassword ,user_id: int):
    db = car_rental()
    cursor = db.cursor(dictionary=True)

    try:
        cursor.execute(
            "SELECT password FROM users WHERE id = %s",
            (user_id,)
        )
        user = cursor.fetchone()

        if request.current_password != user["password"]:
            return {"Message": "Incorrect Password"}

        elif request.new_password != request.confirm_password:
            return {"Message": "Password Mismatch"}

        else:
            cursor.execute(
                "UPDATE users SET password = %s WHERE id = %s"
                ,(request.new_password, user_id,)
            )
            db.commit()

            return {"Message": "Password Updated Successfully"}

    except Exception as e:
        return {"Server Response Error", e}

    finally:
        cursor.close()
        db.close()


# Admin Panel Dashboard
# Overview
@app.get("/admin/overview")
def overview():
    db = car_rental()
    cursor = db.cursor(dictionary=True)

    try:
        cursor.execute(
            "SELECT COUNT(*) AS total_users FROM users"
        )
        usersCount = cursor.fetchone()["total_users"]

        cursor.execute(
            "SELECT COUNT(*) AS total_cars FROM cars"
        )
        carsCount = cursor.fetchone()["total_cars"]

        cursor.execute(
            "SELECT COUNT(*) AS total_bookings FROM bookings"
        )
        bookingsCount = cursor.fetchone()["total_bookings"]

        cursor.execute(
            "SELECT SUM(total_amount) AS total_revenue FROM bookings"
        )
        revenueCount = cursor.fetchone()["total_revenue"] or 0

        return {
            "totalCars": carsCount,
            "totalUsers": usersCount,
            "totalBookings": bookingsCount,
            "totalRevenue": revenueCount
        }

    except Exception as e:
        return {"Server Response Error", e}

    finally:
        cursor.close()
        db.close()



# Car Management
@app.get("/admin/cars")
def cars():
    db = car_rental()
    cursor = db.cursor(dictionary=True)

    try:
        cursor.execute(
            "SELECT car_name, brand, model, year, price_per_day, seats, transmission, available_status, description FROM cars"
        )
        cars = cursor.fetchall()

        return {
            "carsData": cars
        }

    except Exception as e:
        return {"Server Response Error", e}

    finally:
        cursor.close()
        db.close()


# Add Cars
class AddCar(BaseModel):
    car_name: str
    brand: str
    model: str
    year: int
    description: str
    price_per_day: float
    fuel_type: str
    seats: int
    transmission: str

@app.post("/admin/add-cars")
def add_cars(request: AddCar):
    db = car_rental()
    cursor = db.cursor()

    try:
        cursor.execute(
            "INSERT INTO cars (car_name, brand, model, year, description, price_per_day, fuel_type, seats, transmission) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
            ,(request.car_name, request.brand, request.model, request.year, request.description, request.price_per_day, request.fuel_type, request.seats, request.transmission)
        )
        db.commit()

        return {"Message": "Car Added Successfully."}

    except Exception as e:
        return {"Server Response Error", e}

    finally:
        cursor.close()
        db.close()



# Users Management
@app.get("/admin/users-management")
def users_management():
    db = car_rental()
    cursor = db.cursor(dictionary=True)

    try:
        cursor.execute(
            "SELECT u.id, u.customer_name, u.email, u.phone, u.user_status, u.created_at, COUNT(b.id) AS total_bookings FROM users AS u LEFT JOIN bookings AS b ON u.id = b.user_id GROUP BY u.id"
        )
        usersList = cursor.fetchall()

        return {"usersList": usersList}

    except Exception as e:
        return {"Server Response Error", e}

    finally:
        cursor.close()
        db.close()



# Bookings Management
@app.get("/admin/bookings-management")
def bookings_management():
    db = car_rental()
    cursor = db.cursor(dictionary=True)

    try:
        cursor.execute(
            "SELECT COUNT(*) AS total_bookings FROM bookings"
        )
        bookingsCount = cursor.fetchone()["total_bookings"]

        cursor.execute(
            "SELECT COUNT(*) AS active_users FROM users WHERE user_status = 'Active'"
        )
        activeCount = cursor.fetchone()["active_users"]

        cursor.execute(
            "SELECT COUNT(*) AS completed FROM bookings WHERE status = 'Completed'"
        )
        completedCount = cursor.fetchone()["completed"]

        cursor.execute(
            "SELECT COUNT(*) AS cancelled FROM bookings WHERE status = 'Cancelled'"
        )
        cancelledCount = cursor.fetchone()["cancelled"]

        return {
            "totalBookings": bookingsCount,
            "totalActives": activeCount,
            "totalCompleted": completedCount,
            "totalCancelled": cancelledCount
        }

    except Exception as e:
        return {"Server Response Error", e}

    finally:
        cursor.close()
        db.close()


# Booking Action
class BookingAction(BaseModel):
    action: int
    status: str

@app.post("/admin/booking-action")
def booking_action(request: BookingAction):
    db = car_rental()
    cursor = db.cursor()

    try:
        cursor.execute(
            "UPDATE bookings SET status = %s WHERE id = %s",
            (request.status, request.action)
        )
        db.commit()

        return {"message": "Booking Status Updated"}

    except Exception as e:
        return {"Server Response Error", e}

    finally:
        cursor.close()
        db.close()



# Recent Bookings
@app.get("/admin/recent-bookings")
def recent_bookings():
    db = car_rental()
    cursor = db.cursor(dictionary=True)

    try:
        cursor.execute(
            "SELECT b.id, u.customer_name, c.car_name, b.start_date, b.end_date, u.user_status, b.status, b.total_amount FROM users AS u JOIN bookings AS b ON u.id = b.user_id JOIN cars AS c ON c.id = b.car_id ORDER BY b.id DESC "
        )
        recentBookings = cursor.fetchall()

        return {"recentBookingsData": recentBookings}

    except Exception as e:
        return {"Server Response Error", e}

    finally:
        cursor.close()
        db.close()



# Reports / Analysis
@app.get("/admin/reports")
def reports():
    db = car_rental()
    cursor = db.cursor(dictionary=True)

    try:
        cursor.execute(
            "SELECT COUNT(*) AS this_month_bookings FROM bookings WHERE MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())"
        )
        monthBookings = cursor.fetchone()["this_month_bookings"]

        cursor.execute(
            "SELECT SUM(total_amount) AS this_month_revenue FROM bookings WHERE MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())"
        )
        monthRevenue = cursor.fetchone()["this_month_revenue"] or 0

        cursor.execute(
            "SELECT c.car_name FROM bookings b JOIN cars c ON b.car_id = c.id GROUP BY b.car_id ORDER BY COUNT(b.car_id) DESC LIMIT 1"
        )
        mostBooked = cursor.fetchone()

        mostBookedCar = mostBooked["car_name"] if mostBooked else None

        cursor.execute(
            "SELECT COUNT(*) AS active_users FROM users WHERE user_status = 'Active'"
        )
        activeUsers = cursor.fetchone()["active_users"]

        cursor.execute(
            "SELECT MONTHNAME(created_at) AS month, COUNT(*) AS total_bookings, SUM(total_amount) AS total_revenue FROM bookings GROUP BY MONTH(created_at), YEAR(created_at) ORDER BY MONTH(created_at)"
        )
        monthlyRevenue = cursor.fetchall()

        return {
            "thisMonthBookings": monthBookings,
            "thisMonthRevenue": monthRevenue,
            "mostBookedCar": mostBookedCar,
            "activeUsers": activeUsers,
            "monthlyRevenue": monthlyRevenue
        }

    except Exception as e:
        print("Server Response Error", e)

    finally:
        cursor.close()
        db.close()
