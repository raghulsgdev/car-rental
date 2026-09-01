-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 07, 2026 at 11:52 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `car_rental`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` varchar(30) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `user_id`, `car_id`, `start_date`, `end_date`, `total_amount`, `status`, `created_at`) VALUES
(1, 1, 2, '2026-04-04', '2026-04-06', 5000.00, 'Accepted', '2026-04-03 15:56:48');

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `id` int(11) NOT NULL,
  `car_name` varchar(60) NOT NULL,
  `model` varchar(30) NOT NULL,
  `brand` varchar(30) NOT NULL,
  `year` int(11) NOT NULL,
  `description` varchar(500) NOT NULL,
  `price_per_day` decimal(10,2) NOT NULL,
  `fuel_type` varchar(20) NOT NULL,
  `seats` int(11) NOT NULL,
  `transmission` varchar(20) NOT NULL,
  `available_status` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`id`, `car_name`, `model`, `brand`, `year`, `description`, `price_per_day`, `fuel_type`, `seats`, `transmission`, `available_status`, `created_at`) VALUES
(1, 'Swift', 'Ertiga', 'Maruti Suzuki', 2022, 'Spacious MPV for family trips with good mileage. Comfortable seating for long journeys. Low maintenance cost makes it ideal for rentals.', 3500.00, 'Petrol + CNG', 7, 'Manual', '', '2026-04-03 15:41:52'),
(2, 'Hyundai', 'i20', 'Hyundai i20', 2021, 'Premium hatchback, best for city driving. Smooth handling and easy maneuverability in traffic. Modern features and good fuel efficiency.', 2500.00, 'Diesel', 5, 'Manual', '', '2026-04-03 15:45:10'),
(3, 'Kia', 'Sonet', 'Kia Sonet', 2022, 'Stylish compact SUV with modern features. High ground clearance suitable for rough roads. Advanced infotainment system with premium interiors.', 3300.00, 'Petrol', 5, 'Manual', '', '2026-04-03 15:48:41'),
(4, 'Mahindra', 'XUV500', 'Mahindra XUV500', 2019, 'Powerful SUV for long-distance travel. Strong engine performance for highways and hills. Spacious cabin with good safety features.', 4000.00, 'Diesel', 7, 'Manual / Auto', '', '2026-04-03 16:02:05');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `paid_amount` decimal(10,2) NOT NULL,
  `pending_amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(30) NOT NULL DEFAULT 'Online',
  `payment_status` varchar(30) NOT NULL DEFAULT 'Pending',
  `payment_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `booking_id`, `paid_amount`, `pending_amount`, `payment_method`, `payment_status`, `payment_date`) VALUES
(1, 1, 5000.00, 0.00, 'Online', 'Paid', '2026-04-03 15:56:48');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` decimal(10,0) NOT NULL,
  `password` varchar(50) NOT NULL,
  `user_status` varchar(20) NOT NULL DEFAULT 'Active',
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `customer_name`, `email`, `phone`, `password`, `user_status`, `created_at`) VALUES
(1, 'Raghul', 'raghul@gmail.com', 9080335985, 'raghul1234', 'Active', '2026-04-03 15:32:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
