-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 22, 2024 at 11:57 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ticket-ts`
--

-- --------------------------------------------------------

--
-- Table structure for table `mastermenus`
--

CREATE TABLE `mastermenus` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `icon` text DEFAULT NULL,
  `ordering` int(11) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mastermenus`
--

INSERT INTO `mastermenus` (`id`, `name`, `icon`, `ordering`, `active`, `createdAt`, `updatedAt`) VALUES
(1, 'menu management', '', 1, 1, '2024-02-11 02:28:18', '2024-02-11 02:34:13'),
(2, 'user management', '', 2, 1, '2024-02-11 02:30:27', '2024-02-11 02:30:27'),
(3, 'dashboard', '', 3, 1, '2024-02-11 02:31:37', '2024-02-11 02:31:37');

-- --------------------------------------------------------

--
-- Table structure for table `rolemenuaccesses`
--

CREATE TABLE `rolemenuaccesses` (
  `id` int(11) NOT NULL,
  `roleID` bigint(20) DEFAULT NULL,
  `submenuID` bigint(20) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rolemenuaccesses`
--

INSERT INTO `rolemenuaccesses` (`id`, `roleID`, `submenuID`, `active`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 1, '2024-02-12 00:16:42', '2024-02-12 00:19:53'),
(2, 3, 2, 1, '2024-02-12 00:21:46', '2024-02-12 00:21:46');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL,
  `roleName` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `roleName`, `active`, `createdAt`, `updatedAt`) VALUES
(1, 'Super Admin', 1, '2024-02-09 02:15:16', '2024-02-09 02:15:16'),
(2, 'Admin', 1, '2024-02-09 02:15:16', '2024-02-10 03:49:54'),
(3, 'Member', 1, '2024-02-09 02:15:16', '2024-02-09 02:15:16');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20240209015810-create-role.js'),
('20240209030540-create-user.js'),
('20240210100011-create-master-menu.js'),
('20240210100220-create-submenu.js'),
('20240211230807-create-role-menu-access.js');

-- --------------------------------------------------------

--
-- Table structure for table `submenus`
--

CREATE TABLE `submenus` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `masterMenuID` bigint(20) DEFAULT NULL,
  `url` text DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `icon` text DEFAULT NULL,
  `ordering` int(11) DEFAULT NULL,
  `isTargetSelf` tinyint(1) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `submenus`
--

INSERT INTO `submenus` (`id`, `name`, `masterMenuID`, `url`, `title`, `icon`, `ordering`, `isTargetSelf`, `active`, `createdAt`, `updatedAt`) VALUES
(1, 'Data Master', 1, '/masterData', 'Data Master', 'icon', 1, 1, 1, '2024-02-11 04:07:33', '2024-02-12 01:06:08'),
(2, 'Dashboard', 3, '/dashboard', 'Dashboard', 'icon', 1, 1, 1, '2024-02-12 00:21:08', '2024-02-12 00:21:08'),
(4, 'Data User', 2, '/UserData', 'User Data', 'icon', 1, 1, 1, '2024-02-12 01:06:46', '2024-02-12 01:06:46');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `roleID` bigint(20) DEFAULT NULL,
  `accessToken` text DEFAULT NULL,
  `verified` tinyint(1) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `roleID`, `accessToken`, `verified`, `active`, `createdAt`, `updatedAt`) VALUES
(1, 'pandhu', 'pandhu@gmail.com', '$2b$10$moRHdcGBpfZt1.egfZRgo.emgc0BQo8InEJ/.lnPbtlM2f9o3nluO', 1, NULL, 1, 1, '2024-02-09 03:43:25', '2024-02-22 10:45:15'),
(3, 'Asfina', 'asfina@gmail.com', '$2b$10$f2M3oDpEfPlafXcLQyhAEuTiZEKAttNyOd1mKqIq2DicNoa.MFS2.', 3, NULL, 1, 1, '2024-02-10 03:16:58', '2024-02-22 10:48:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mastermenus`
--
ALTER TABLE `mastermenus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rolemenuaccesses`
--
ALTER TABLE `rolemenuaccesses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `submenus`
--
ALTER TABLE `submenus`
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
-- AUTO_INCREMENT for table `mastermenus`
--
ALTER TABLE `mastermenus`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `rolemenuaccesses`
--
ALTER TABLE `rolemenuaccesses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `submenus`
--
ALTER TABLE `submenus`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
