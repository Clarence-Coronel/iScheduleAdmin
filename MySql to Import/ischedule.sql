-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 29, 2023 at 04:52 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ischedule`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `username` varchar(80) NOT NULL,
  `adminType` varchar(20) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `middleName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `phone` varchar(13) NOT NULL,
  `password` varchar(128) NOT NULL,
  `isActive` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`username`, `adminType`, `firstName`, `middleName`, `lastName`, `phone`, `password`, `isActive`) VALUES
('clarence-coronel1', 'super admin', 'clarence', 'reyes', 'coronel', '0967 599 8955', '$2y$10$hCCpnZ1vHQ2HSRNnGZING.ye1SUSTJG6x60gOuYZNrV/RmiGzKewW', 1),
('test-admini2', 'admin i', 'test', 'test', 'admini', '0967 981 2341', '$2y$10$6ckYQ6MsxVD5q4oRoH1FiOXxu2Hh6MmfEnFSdC60IF9tGtHuvH0FK', 1),
('test-adminii3', 'admin ii', 'test', 'test', 'adminii', '0986 123 3442', '$2y$10$04dLVovICNDlQXcDTQx7/uHZ/Ee0t8.csy3MDOAqSAm6ORmw0Qe42', 1),
('test-admins4', 'super admin', 'test', 'test', 'admins', '0962 259 9922', '$2y$10$qVNgfInvgxRUEOr3entVE.ym5chgBghGloImpIuO91odrPl9yCct6', 1),
('test-test5', 'admin ii', 'test', 'test', 'test', '0947 594 8455', '$2y$10$n76h.qZJ7LqMa2bmSfPo4OgRaHF.BWFcMIVIud9P5FP5RKlQGqsmW', 0);

-- --------------------------------------------------------

--
-- Table structure for table `admin_activities`
--

CREATE TABLE `admin_activities` (
  `activity` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admin_logs`
--

CREATE TABLE `admin_logs` (
  `adminLogsID` int(11) NOT NULL,
  `username` varchar(80) NOT NULL,
  `activity` varchar(120) NOT NULL,
  `logDateTime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_logs`
--

INSERT INTO `admin_logs` (`adminLogsID`, `username`, `activity`, `logDateTime`) VALUES
(112, 'clarence-coronel1', 'Posted an announcement: Posting an Announcement to Test admin logs', '2023-09-23 09:26:31'),
(113, 'clarence-coronel1', 'Blocked a date: xmas', '2023-09-23 09:45:31'),
(114, 'clarence-coronel1', 'Blocked a date: test', '2023-09-23 09:45:44'),
(115, 'clarence-coronel1', 'Blocked a date: test', '2023-09-23 09:45:54'),
(116, 'clarence-coronel1', 'Changed desktop video tutorial', '2023-09-23 09:46:47'),
(117, 'clarence-coronel1', 'Changed mobile video tutorial', '2023-09-23 09:47:08'),
(118, 'clarence-coronel1', 'Changed mobile video tutorial', '2023-09-23 09:47:12'),
(119, 'clarence-coronel1', 'Changed mobile video tutorial', '2023-09-23 09:47:15'),
(120, 'clarence-coronel1', 'Changed phone', '2023-09-23 09:53:30'),
(121, 'clarence-coronel1', 'Changed password', '2023-09-23 09:53:59'),
(122, 'clarence-coronel1', 'Changed password', '2023-09-23 09:54:25'),
(123, 'clarence-coronel1', 'Removed a blocked date: ', '2023-09-23 10:43:26'),
(124, 'clarence-coronel1', 'Removed an announcement: ', '2023-09-23 10:44:02'),
(125, 'clarence-coronel1', 'Changed admin type of test-admins4', '2023-09-23 10:44:51'),
(126, 'clarence-coronel1', 'Changed admin type of test-admins4', '2023-09-23 10:44:54'),
(127, 'clarence-coronel1', 'Changed phone', '2023-09-23 10:45:33'),
(128, 'clarence-coronel1', 'Changed password', '2023-09-23 10:46:11'),
(129, 'clarence-coronel1', 'Posted an announcement: sample', '2023-09-23 10:55:30'),
(130, 'clarence-coronel1', 'Removed an announcement: ', '2023-09-23 10:55:37'),
(131, 'clarence-coronel1', 'Changed phone', '2023-09-23 13:32:04'),
(133, 'clarence-coronel1', 'Viewed feedback', '2023-09-23 13:53:18'),
(134, 'clarence-coronel1', 'Viewed feedback', '2023-09-23 14:02:31'),
(135, 'clarence-coronel1', 'Viewed feedback', '2023-09-23 14:02:32'),
(136, 'clarence-coronel1', 'Viewed feedback', '2023-09-23 14:02:33'),
(137, 'clarence-coronel1', 'Viewed feedback', '2023-09-23 14:08:39'),
(187, 'clarence-coronel1', 'Viewed feedback', '2023-09-24 14:25:17'),
(188, 'clarence-coronel1', 'Viewed feedback', '2023-09-24 14:25:19'),
(189, 'clarence-coronel1', 'Viewed feedback', '2023-09-24 14:25:40'),
(190, 'clarence-coronel1', 'Viewed feedback', '2023-09-24 16:17:59'),
(191, 'clarence-coronel1', 'Viewed feedback', '2023-09-24 16:18:01'),
(192, 'clarence-coronel1', 'Viewed feedback', '2023-09-25 21:36:19'),
(195, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:27:53'),
(196, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:28:18'),
(197, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:28:30'),
(198, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:29:01'),
(199, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:29:25'),
(200, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:31:37'),
(201, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:31:53'),
(202, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:32:12'),
(203, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:32:29'),
(204, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:40:58'),
(205, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:41:09'),
(206, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:46:18'),
(207, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:47:22'),
(208, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:47:40'),
(209, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:48:31'),
(210, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:48:51'),
(211, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:49:10'),
(212, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:49:42'),
(213, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:49:59'),
(214, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:50:09'),
(215, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:50:56'),
(216, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:51:14'),
(217, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:51:26'),
(218, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:52:05'),
(219, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:53:21'),
(220, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:53:32'),
(221, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:54:43'),
(222, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:54:59'),
(223, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:55:08'),
(224, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:55:41'),
(225, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:56:27'),
(226, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:57:42'),
(227, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:57:45'),
(228, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:57:59'),
(229, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 17:59:34'),
(230, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 18:00:22'),
(231, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 18:00:32'),
(232, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 18:00:58'),
(233, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 18:02:52'),
(234, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 18:02:57'),
(235, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 18:04:34'),
(236, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 18:11:42'),
(237, 'clarence-coronel1', 'Changed a time slot in ENT\'s monday schedule', '2023-09-26 18:11:49'),
(238, 'clarence-coronel1', 'Removed a slot in ENT\'s monday schedule', '2023-09-28 09:06:36'),
(239, 'clarence-coronel1', 'Removed a slot in ENT\'s thursday schedule', '2023-09-28 09:10:57'),
(240, 'clarence-coronel1', 'Removed a slot in ENT\'s friday schedule', '2023-09-28 09:12:03'),
(241, 'clarence-coronel1', 'Changed a slot in ENT\'s tuesday schedule', '2023-09-28 09:17:39'),
(242, 'clarence-coronel1', 'Changed a slot in ENT\'s tuesday schedule', '2023-09-28 09:18:49'),
(243, 'clarence-coronel1', 'Changed a slot in ENT\'s tuesday schedule', '2023-09-28 09:18:55'),
(244, 'clarence-coronel1', 'Changed a slot in ENT\'s tuesday schedule', '2023-09-28 09:19:02'),
(245, 'clarence-coronel1', 'Changed a slot in ENT\'s tuesday schedule', '2023-09-28 09:19:08'),
(246, 'clarence-coronel1', 'Changed a slot in ENT\'s tuesday schedule', '2023-09-28 09:19:14'),
(247, 'clarence-coronel1', 'Changed a slot in ENT\'s tuesday schedule', '2023-09-28 09:20:18'),
(248, 'clarence-coronel1', 'Changed a slot in ENT\'s monday schedule', '2023-09-28 09:20:25'),
(249, 'clarence-coronel1', 'Changed a slot in ENT\'s monday schedule', '2023-09-28 09:23:37'),
(250, 'clarence-coronel1', 'Changed a slot in ENT\'s monday schedule', '2023-09-28 13:53:29'),
(251, 'clarence-coronel1', 'Changed a slot in ENT\'s monday schedule', '2023-09-28 14:40:05'),
(252, 'clarence-coronel1', 'Changed a slot in ENT\'s monday schedule', '2023-09-28 14:42:17'),
(253, 'clarence-coronel1', 'Changed a slot in ENT\'s tuesday schedule', '2023-09-28 14:43:24'),
(254, 'clarence-coronel1', 'Removed a slot in ENT\'s monday schedule', '2023-09-28 15:10:01'),
(255, 'clarence-coronel1', 'Added a slot in ENT\'s monday schedule', '2023-09-28 15:12:12'),
(256, 'clarence-coronel1', 'Removed a slot in ENT\'s monday schedule', '2023-09-28 15:12:23'),
(257, 'clarence-coronel1', 'Removed a slot in ENT\'s monday schedule', '2023-09-28 15:12:26'),
(258, 'clarence-coronel1', 'Changed a slot in ENT\'s monday schedule', '2023-09-28 15:15:41'),
(259, 'clarence-coronel1', 'Added a slot in ENT\'s monday schedule', '2023-09-28 15:22:20'),
(260, 'clarence-coronel1', 'Added a slot in ENT\'s tuesday schedule', '2023-09-28 15:22:39'),
(261, 'clarence-coronel1', 'Added a slot in ENT\'s monday schedule', '2023-09-28 15:26:00'),
(262, 'clarence-coronel1', 'Added a slot in ENT\'s monday schedule', '2023-09-28 15:26:05'),
(263, 'clarence-coronel1', 'Added a slot in ENT\'s thursday schedule', '2023-09-28 15:26:15'),
(264, 'clarence-coronel1', 'Removed a slot in ENT\'s monday schedule', '2023-09-28 15:26:39'),
(265, 'clarence-coronel1', 'Removed a slot in ENT\'s monday schedule', '2023-09-28 15:26:41'),
(266, 'clarence-coronel1', 'Removed a slot in ENT\'s monday schedule', '2023-09-28 15:26:45'),
(267, 'clarence-coronel1', 'Removed a slot in ENT\'s thursday schedule', '2023-09-28 15:26:48'),
(268, 'clarence-coronel1', 'Added a slot in ENT\'s thursday schedule', '2023-09-28 15:26:54'),
(269, 'clarence-coronel1', 'Changed a slot in ENT\'s tuesday schedule', '2023-09-28 15:27:29'),
(270, 'clarence-coronel1', 'Added a slot in Surgery ROS\'s monday schedule', '2023-09-28 15:31:45'),
(271, 'clarence-coronel1', 'Added a slot in Surgery ROS\'s monday schedule', '2023-09-28 15:32:28');

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `annID` int(11) NOT NULL,
  `annTitle` varchar(120) NOT NULL,
  `annBody` varchar(1000) NOT NULL,
  `annDateTime` datetime NOT NULL DEFAULT current_timestamp(),
  `author` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`annID`, `annTitle`, `annBody`, `annDateTime`, `author`) VALUES
(1, 'test', 'test', '2023-09-16 11:12:49', 'clarence-coronel1'),
(2, 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest', 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest', '2023-09-16 11:22:14', 'clarence-coronel1'),
(3, 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis nat', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. N', '2023-09-16 12:10:18', 'clarence-coronel1'),
(4, 'test', 'test', '2023-09-16 12:13:36', 'clarence-coronel1'),
(5, 'testtes', 'test', '2023-09-16 12:13:39', 'clarence-coronel1'),
(6, 'test', 'test', '2023-09-16 12:13:42', 'clarence-coronel1'),
(7, 'tes', 'test', '2023-09-16 12:13:44', 'clarence-coronel1'),
(8, 'test diff admin', 'annCtrannCtrannCtrannCtra nnCtrannCtrannCtrannCtrannCtrannCtrannCtrannCtr annCtrannCtrannCtr annCtr', '2023-09-16 12:17:51', 'test-adminii3'),
(9, 'title changed', 'qwrqwrqwerrwr', '2023-09-17 15:16:23', 'clarence-coronel1'),
(10, '&gt;&lt; \' &amp; test', '&gt;&lt; \' &amp; test &gt;&lt; \' &amp; test &gt;&lt; \' &amp; test', '2023-09-17 15:31:59', 'clarence-coronel1'),
(11, 'posting }{  / &amp; % ^ $ # testing &lt;&gt;', 'test        display: flex;\n        flex-flow: column;\n        justify-content: center;\n        align-items: flex-start;        display: flex;\n        flex-flow: column;\n        justify-content: center;\n        align-items: flex-start;        display: flex;\n        flex-flow: column;\n        justify-content: center;\n        align-items: flex-start;        display: flex;\n        flex-flow: column;\n        justify-content: center;\n        align-items: flex-start;        display: flex;\n        flex-flow: column;\n        justify-content: center;\n        align-items: flex-start;        display: flex;\n        flex-flow: column;\n        justify-content: center;\n        align-items: flex-start;        display: flex;\n        flex-flow: column;\n        justify-content: center;\n        align-items: flex-start;        display: flex;\n        flex-flow: column;\n        justify-content: center;\n        align-items: flex-start;        display: flex;\n        flex-flow: column;\n        justify-content: c', '2023-09-18 17:42:47', 'test-adminii3'),
(12, 'testtttest', 'testtttest', '2023-09-18 18:01:34', 'clarence-coronel1'),
(13, 'test2', 'test2', '2023-09-18 18:01:57', 'clarence-coronel1'),
(14, 'test', 'test', '2023-09-18 18:02:11', 'clarence-coronel1'),
(15, 'testsetstes', 'testestset', '2023-09-18 18:10:50', 'clarence-coronel1'),
(17, 'test', 'testetsetest', '2023-09-18 18:12:35', 'clarence-coronel1'),
(18, 'test', 'test', '2023-09-18 18:20:10', 'clarence-coronel1'),
(19, 'test', 'test', '2023-09-19 15:17:14', 'clarence-coronel1');

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `appointmentID` int(11) NOT NULL,
  `departmentID` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `middleName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `sex` char(1) NOT NULL,
  `birthdate` date NOT NULL,
  `phone` varchar(13) NOT NULL,
  `province` varchar(60) NOT NULL,
  `municipality` varchar(60) NOT NULL,
  `barangay` varchar(60) NOT NULL,
  `patientType` varchar(3) NOT NULL,
  `appointmentType` varchar(30) NOT NULL,
  `scheduleID` int(11) NOT NULL,
  `appointmentDate` date DEFAULT NULL,
  `day` varchar(3) NOT NULL,
  `caseNo` varchar(10) DEFAULT NULL,
  `appointmentStatus` varchar(30) NOT NULL,
  `isArchived` tinyint(1) NOT NULL,
  `cancelReason` varchar(200) DEFAULT NULL,
  `dateSubmitted` date NOT NULL DEFAULT current_timestamp(),
  `followUpImgLink` varchar(400) DEFAULT NULL,
  `followUpDateNote` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `appointment_status`
--

CREATE TABLE `appointment_status` (
  `status` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment_status`
--

INSERT INTO `appointment_status` (`status`) VALUES
('cancelled'),
('active'),
('completed'),
('missed'),
('pending');

-- --------------------------------------------------------

--
-- Table structure for table `block_dates`
--

CREATE TABLE `block_dates` (
  `blockID` int(11) NOT NULL,
  `blockDate` date NOT NULL,
  `blockName` varchar(30) NOT NULL,
  `isYearly` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `block_dates`
--

INSERT INTO `block_dates` (`blockID`, `blockDate`, `blockName`, `isYearly`) VALUES
(4, '2023-12-25', 'xmas', 1),
(5, '2025-10-12', 'test', 1),
(6, '2028-08-08', 'test', 0);

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `deptID` int(11) NOT NULL,
  `deptName` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`deptID`, `deptName`) VALUES
(1, 'ENT'),
(2, 'Hematology'),
(3, 'Internal Medicine'),
(4, 'Internal Medicine Clearance'),
(5, 'Nephrology'),
(6, 'Neurology'),
(7, 'GYNE New'),
(8, 'GYNE Old'),
(9, 'GYNE ROS'),
(10, 'Oncology'),
(11, 'Pediatric Cardiology'),
(12, 'Pediatric Clearance'),
(13, 'Pediatric General'),
(14, 'Psychiatry New'),
(15, 'Psychiatry Old'),
(16, 'Surgery'),
(17, 'Surgery ROS');

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks`
--

CREATE TABLE `feedbacks` (
  `feedbackID` int(11) NOT NULL,
  `rate` tinyint(1) NOT NULL,
  `feedbackContent` varchar(200) NOT NULL,
  `dateTimeSubmitted` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedbacks`
--

INSERT INTO `feedbacks` (`feedbackID`, `rate`, `feedbackContent`, `dateTimeSubmitted`) VALUES
(11, 5, 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest', '2023-09-19 11:37:23'),
(12, 1, 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest', '2023-09-19 11:37:29'),
(13, 5, 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest', '2023-09-19 11:37:32'),
(14, 2, 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest', '2023-09-19 11:37:37'),
(15, 3, 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest', '2023-09-19 11:37:51'),
(16, 4, 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest', '2023-09-19 11:37:57'),
(17, 5, 'test', '2023-09-20 06:28:34'),
(18, 5, 'TESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTEST', '2023-09-20 06:29:42'),
(19, 4, 'test', '2023-09-23 10:42:29'),
(20, 4, 'test', '2023-09-23 11:46:37');

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `scheduleID` int(11) NOT NULL,
  `deptID` int(11) NOT NULL,
  `day` varchar(3) NOT NULL,
  `startTime` time NOT NULL,
  `stopTime` time NOT NULL,
  `max` int(11) NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `isBuffer` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schedules`
--

INSERT INTO `schedules` (`scheduleID`, `deptID`, `day`, `startTime`, `stopTime`, `max`, `isActive`, `isBuffer`) VALUES
(2, 1, 'tue', '10:00:00', '11:00:00', 10, 1, 1),
(3, 1, 'wed', '08:00:00', '09:00:00', 10, 1, 1),
(5, 1, 'fri', '08:00:00', '09:00:00', 10, 1, 1),
(6, 1, 'sat', '08:00:00', '09:00:00', 10, 1, 1),
(8, 1, 'tue', '09:00:00', '10:00:00', 15, 1, 0),
(9, 1, 'wed', '09:00:00', '10:00:00', 15, 1, 0),
(12, 1, 'sat', '09:00:00', '10:00:00', 15, 1, 0),
(19, 1, 'tue', '07:40:00', '08:00:00', 1, 1, 1),
(20, 1, 'mon', '07:00:00', '08:00:00', 1, 1, 0),
(21, 1, 'mon', '07:00:00', '08:00:00', 1, 1, 1),
(22, 1, 'thu', '07:00:00', '08:00:00', 1, 1, 0),
(23, 1, 'thu', '07:00:00', '08:00:00', 1, 1, 0),
(24, 17, 'mon', '07:00:00', '08:00:00', 19, 1, 0),
(25, 17, 'mon', '10:00:00', '11:00:00', 10, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `video_tutorials`
--

CREATE TABLE `video_tutorials` (
  `vidType` varchar(10) NOT NULL,
  `link` varchar(360) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `video_tutorials`
--

INSERT INTO `video_tutorials` (`vidType`, `link`) VALUES
('mobile', 'https://www.youtube.com/embed/eyTUFaQuIHk?si=l-ox6j5n4_b1Bi9T'),
('desktop', 'https://www.youtube.com/embed/dglBgJSMr-E?si=6Fw109QZEgLiquCl');

-- --------------------------------------------------------

--
-- Table structure for table `website_status`
--

CREATE TABLE `website_status` (
  `status` int(11) NOT NULL,
  `title` varchar(120) DEFAULT NULL,
  `message` varchar(240) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `website_status`
--

INSERT INTO `website_status` (`status`, `title`, `message`, `isActive`) VALUES
(1, NULL, '', 1),
(2, 'Ang iSchedule website ay kasalukuyang naka down', 'eyyy', 0),
(3, 'Ang pag schedule ng appointment ay kasalukuyang hinihinto', 'tes', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `admin_activities`
--
ALTER TABLE `admin_activities`
  ADD PRIMARY KEY (`activity`);

--
-- Indexes for table `admin_logs`
--
ALTER TABLE `admin_logs`
  ADD PRIMARY KEY (`adminLogsID`),
  ADD KEY `admin_logs-admin` (`username`);

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`annID`);

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`appointmentID`),
  ADD KEY `appointment-departments` (`departmentID`);

--
-- Indexes for table `block_dates`
--
ALTER TABLE `block_dates`
  ADD PRIMARY KEY (`blockID`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`deptID`);

--
-- Indexes for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`feedbackID`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`scheduleID`),
  ADD KEY `schedules_departments` (`deptID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_logs`
--
ALTER TABLE `admin_logs`
  MODIFY `adminLogsID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=272;

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `annID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `appointmentID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `block_dates`
--
ALTER TABLE `block_dates`
  MODIFY `blockID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `deptID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `feedbackID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `scheduleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_logs`
--
ALTER TABLE `admin_logs`
  ADD CONSTRAINT `admin_logs-admin` FOREIGN KEY (`username`) REFERENCES `admins` (`username`);

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointment-departments` FOREIGN KEY (`departmentID`) REFERENCES `departments` (`deptID`);

--
-- Constraints for table `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `schedules_departments` FOREIGN KEY (`deptID`) REFERENCES `departments` (`deptID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
