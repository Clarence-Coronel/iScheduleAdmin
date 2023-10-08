-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 08, 2023 at 11:17 AM
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
('clarence-coronel1', 'super admin', 'clarence', 'reyes', 'coronel', '0967 599 8955', '$2y$10$ax.eWLAUdKoQfa97IAJa6u/z7BXBw8fXRHtgqpubF1/R1K4C0f/ee', 1),
('test-admini2', 'Admin I', 'test', 'test', 'admini', '0967 981 2341', '$2y$10$6ckYQ6MsxVD5q4oRoH1FiOXxu2Hh6MmfEnFSdC60IF9tGtHuvH0FK', 1),
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
(271, 'clarence-coronel1', 'Added a slot in Surgery ROS\'s monday schedule', '2023-09-28 15:32:28'),
(272, 'test-admins4', 'Blocked a new date: test', '2023-09-29 14:08:30'),
(273, 'test-admins4', 'Blocked a new date: test', '2023-09-29 14:15:39'),
(274, 'test-admins4', 'Removed a blocked date: ', '2023-09-29 14:37:35'),
(275, 'test-admins4', 'Blocked a new date: testtesttesttesttesttesttestte', '2023-09-29 14:38:29'),
(276, 'clarence-coronel1', 'Changed admin type of test-admini2', '2023-09-30 16:21:02'),
(277, 'clarence-coronel1', 'Changed admin type of test-admini2', '2023-09-30 16:21:09'),
(278, 'clarence-coronel1', 'Removed a blocked date: ', '2023-09-30 16:32:19'),
(279, 'clarence-coronel1', 'Viewed feedback', '2023-09-30 16:32:29'),
(280, 'clarence-coronel1', 'Viewed feedback', '2023-09-30 16:36:20'),
(281, 'clarence-coronel1', 'Removed an announcement: ', '2023-09-30 16:51:08'),
(282, 'clarence-coronel1', 'Viewed feedback', '2023-09-30 16:51:35'),
(283, 'clarence-coronel1', 'Viewed feedback', '2023-09-30 17:00:42'),
(284, 'clarence-coronel1', 'Viewed feedback', '2023-09-30 17:00:44'),
(285, 'clarence-coronel1', 'Viewed feedback', '2023-09-30 17:01:19'),
(286, 'clarence-coronel1', 'Added a slot in ENT\'s wednesday schedule', '2023-09-30 17:02:25'),
(287, 'clarence-coronel1', 'Removed a slot in ENT\'s wednesday schedule', '2023-09-30 17:02:28'),
(288, 'clarence-coronel1', 'Changed a slot in ENT\'s wednesday schedule', '2023-09-30 17:02:33'),
(289, 'clarence-coronel1', 'Viewed feedback', '2023-09-30 17:04:59'),
(290, 'clarence-coronel1', 'Viewed feedback', '2023-09-30 17:05:00'),
(291, 'clarence-coronel1', 'Inserted a new slot in Surgery ROS\'s tuesday schedule', '2023-09-30 17:10:59'),
(292, 'clarence-coronel1', 'Inserted a new slot in Neurology\'s monday schedule', '2023-09-30 10:22:23'),
(293, 'clarence-coronel1', 'Removed a slot in ENT\'s monday schedule', '2023-09-30 10:53:34'),
(294, 'clarence-coronel1', 'Inserted a new slot in ENT\'s monday schedule', '2023-09-30 10:53:42'),
(295, 'clarence-coronel1', 'Removed a slot in ENT\'s monday schedule', '2023-09-30 10:53:52'),
(296, 'clarence-coronel1', 'Inserted a new slot in ENT\'s monday schedule', '2023-09-30 10:55:56'),
(297, 'clarence-coronel1', 'Inserted a new slot in ENT\'s monday schedule', '2023-09-30 11:01:07'),
(298, 'clarence-coronel1', 'Removed a slot in ENT\'s monday schedule', '2023-09-30 11:20:45'),
(299, 'clarence-coronel1', 'Removed a blocked date: ', '2023-09-30 11:48:20'),
(300, 'clarence-coronel1', 'Changed a slot in ENT\'s tuesday schedule', '2023-09-30 13:13:09'),
(301, 'clarence-coronel1', 'Inserted a new slot in ENT\'s monday schedule', '2023-09-30 17:58:45'),
(302, 'clarence-coronel1', 'Inserted a new slot in ENT\'s monday schedule', '2023-09-30 18:32:47'),
(303, 'clarence-coronel1', 'Removed a slot in ENT\'s monday schedule', '2023-09-30 18:33:04'),
(304, 'clarence-coronel1', 'Inserted a new slot in ENT\'s monday schedule', '2023-09-30 18:33:21'),
(305, 'clarence-coronel1', 'Removed a slot in ENT\'s monday schedule', '2023-09-30 18:33:28'),
(306, 'clarence-coronel1', 'Inserted a new slot in ENT\'s monday schedule', '2023-09-30 18:33:40'),
(307, 'clarence-coronel1', 'Inserted a new slot in ENT\'s monday schedule', '2023-09-30 18:36:51'),
(308, 'clarence-coronel1', 'Removed a slot in ENT\'s monday schedule', '2023-09-30 18:38:20'),
(309, 'clarence-coronel1', 'Inserted a new slot in ENT\'s monday schedule', '2023-10-01 13:13:37'),
(310, 'clarence-coronel1', 'Inserted a new slot in ENT\'s monday schedule', '2023-10-01 13:13:49'),
(311, 'clarence-coronel1', 'Inserted a new slot in ENT\'s monday schedule', '2023-10-01 13:32:46'),
(312, 'clarence-coronel1', 'Removed a slot in ENT\'s wednesday schedule', '2023-10-01 15:51:08'),
(313, 'clarence-coronel1', 'Removed a slot in ENT\'s monday schedule', '2023-10-01 16:02:33'),
(314, 'clarence-coronel1', 'Removed a slot in ENT\'s monday schedule', '2023-10-01 16:02:36'),
(315, 'clarence-coronel1', 'Removed a slot in ENT\'s monday schedule', '2023-10-01 16:02:39'),
(316, 'clarence-coronel1', 'Removed a slot in ENT\'s monday schedule', '2023-10-01 16:03:10'),
(317, 'clarence-coronel1', 'Inserted a new slot in ENT\'s monday schedule', '2023-10-01 16:03:59'),
(318, 'clarence-coronel1', 'Inserted a new slot in ENT\'s monday schedule', '2023-10-01 16:04:43'),
(319, 'clarence-coronel1', 'Inserted a new slot in Hematology\'s wednesday schedule', '2023-10-01 16:08:05'),
(320, 'clarence-coronel1', 'Removed a slot in ENT\'s monday schedule', '2023-10-01 16:40:18'),
(321, 'clarence-coronel1', 'Removed a slot in ENT\'s monday schedule', '2023-10-01 16:40:30'),
(322, 'clarence-coronel1', 'Inserted a new slot in ENT\'s monday schedule', '2023-10-01 16:41:30'),
(323, 'clarence-coronel1', 'Inserted a new slot in ENT\'s monday schedule', '2023-10-01 16:41:34'),
(324, 'clarence-coronel1', 'Removed a slot in ENT\'s monday schedule', '2023-10-01 16:41:38'),
(325, 'clarence-coronel1', 'Removed a slot in ENT\'s monday schedule', '2023-10-01 16:41:41'),
(326, 'clarence-coronel1', 'Changed a slot in ENT\'s monday schedule', '2023-10-01 17:35:46'),
(327, 'clarence-coronel1', 'Changed a slot in ENT\'s monday schedule', '2023-10-01 17:35:52'),
(328, 'clarence-coronel1', 'Inserted a new slot in ENT\'s monday schedule', '2023-10-01 17:41:30'),
(329, 'clarence-coronel1', 'Removed a slot in ENT\'s monday schedule', '2023-10-01 17:41:36'),
(330, 'clarence-coronel1', 'Changed a slot in ENT\'s monday schedule', '2023-10-01 18:25:06'),
(331, 'clarence-coronel1', 'Removed a slot in ENT\'s monday schedule', '2023-10-01 18:25:09'),
(332, 'clarence-coronel1', 'Changed a slot in ENT\'s monday schedule', '2023-10-01 18:25:53'),
(333, 'clarence-coronel1', 'Changed a slot in ENT\'s monday schedule', '2023-10-01 18:25:59'),
(334, 'clarence-coronel1', 'Changed a slot in ENT\'s monday schedule', '2023-10-01 18:26:32'),
(335, 'clarence-coronel1', 'Inserted a new slot in ENT\'s monday schedule', '2023-10-01 20:01:57'),
(336, 'clarence-coronel1', 'Inserted a new slot in ENT\'s monday schedule', '2023-10-01 20:09:41'),
(337, 'clarence-coronel1', 'Removed a slot in ENT\'s monday schedule', '2023-10-01 20:09:47'),
(338, 'clarence-coronel1', 'Removed a slot in ENT\'s monday schedule', '2023-10-01 20:09:47'),
(339, 'clarence-coronel1', 'Removed a blocked date: ', '2023-10-03 10:47:31'),
(340, 'clarence-coronel1', 'Removed a blocked date: ', '2023-10-03 10:47:34'),
(341, 'clarence-coronel1', 'Removed a blocked date: ', '2023-10-03 10:47:36'),
(342, 'clarence-coronel1', 'Removed a blocked date: ', '2023-10-03 10:47:39'),
(343, 'clarence-coronel1', 'Removed a blocked date: ', '2023-10-03 10:47:41'),
(344, 'clarence-coronel1', 'Blocked a new date: Xmas', '2023-10-03 11:03:14'),
(345, 'clarence-coronel1', 'Blocked a new date: testtest', '2023-10-03 11:05:15'),
(346, 'clarence-coronel1', 'Blocked a new date: test', '2023-10-03 11:05:36'),
(347, 'clarence-coronel1', 'Changed phone', '2023-10-03 14:20:16'),
(348, 'clarence-coronel1', 'Changed phone', '2023-10-03 18:31:55'),
(349, 'clarence-coronel1', 'Changed password', '2023-10-03 18:32:15'),
(350, 'clarence-coronel1', 'Changed phone', '2023-10-03 18:32:52'),
(351, 'clarence-coronel1', 'Scheduled an appointment: Coronel, Clarence Reyes', '2023-10-04 05:43:57'),
(352, 'clarence-coronel1', 'Viewed feedback', '2023-10-04 18:28:01'),
(353, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:26:29'),
(354, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:26:38'),
(355, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:27:32'),
(356, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:27:40'),
(357, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:28:24'),
(358, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:28:38'),
(359, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:28:48'),
(360, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:29:08'),
(361, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:29:29'),
(362, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:29:42'),
(363, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:30:03'),
(364, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:30:46'),
(365, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:31:03'),
(366, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:31:46'),
(367, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:32:49'),
(368, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:34:10'),
(369, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:34:35'),
(370, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:35:14'),
(371, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:37:10'),
(372, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:37:35'),
(373, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:37:44'),
(374, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:38:28'),
(375, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:38:44'),
(376, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:39:09'),
(377, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:39:27'),
(378, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:39:32'),
(379, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:40:02'),
(380, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:40:12'),
(381, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:41:14'),
(382, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:41:43'),
(383, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:41:56'),
(384, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:42:05'),
(385, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:42:19'),
(386, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:42:37'),
(387, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:42:57'),
(388, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:43:04'),
(389, 'clarence-coronel1', 'Blocked a new date: test', '2023-10-07 12:49:46'),
(390, 'clarence-coronel1', 'Blocked a new date: test', '2023-10-07 12:49:56'),
(391, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:58:36'),
(392, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 12:58:42'),
(393, 'clarence-coronel1', 'Blocked a new date: test', '2023-10-07 12:59:31'),
(394, 'clarence-coronel1', 'Blocked a new date: test', '2023-10-07 12:59:45'),
(395, 'clarence-coronel1', 'Blocked a new date: test', '2023-10-07 12:59:52'),
(396, 'clarence-coronel1', 'Blocked a new date: new year', '2023-10-07 13:00:43'),
(397, 'clarence-coronel1', 'Blocked a new date: valentines', '2023-10-07 13:00:53'),
(398, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 13:00:57'),
(399, 'clarence-coronel1', 'Blocked a new date: test', '2023-10-07 13:02:02'),
(400, 'clarence-coronel1', 'Removed a blocked date: ', '2023-10-07 13:02:18'),
(401, 'clarence-coronel1', 'Blocked a new date: test', '2023-10-07 13:02:45'),
(402, 'clarence-coronel1', 'Removed a blocked date: ', '2023-10-07 13:03:49'),
(403, 'clarence-coronel1', 'Blocked a new date: test', '2023-10-07 13:04:00'),
(404, 'clarence-coronel1', 'Removed a blocked date: ', '2023-10-07 13:04:37'),
(405, 'clarence-coronel1', 'Blocked a new date: test', '2023-10-07 13:04:46'),
(406, 'clarence-coronel1', 'Removed a blocked date: ', '2023-10-07 13:05:09'),
(407, 'clarence-coronel1', 'Blocked a new date: test', '2023-10-07 13:05:37'),
(408, 'clarence-coronel1', 'Removed a blocked date: ', '2023-10-07 13:05:53'),
(409, 'clarence-coronel1', 'Blocked a new date: test', '2023-10-07 13:06:03'),
(410, 'clarence-coronel1', 'Blocked a new date: test', '2023-10-07 13:06:28'),
(411, 'clarence-coronel1', 'Removed a blocked date: ', '2023-10-07 13:07:08'),
(412, 'clarence-coronel1', 'Blocked a new date: test', '2023-10-07 13:07:13'),
(413, 'clarence-coronel1', 'Removed a blocked date: ', '2023-10-07 13:07:29'),
(414, 'clarence-coronel1', 'Removed a blocked date: ', '2023-10-07 13:07:34'),
(415, 'clarence-coronel1', 'Blocked a new date: test', '2023-10-07 13:07:40'),
(416, 'clarence-coronel1', 'Blocked a new date: test', '2023-10-07 13:07:55'),
(417, 'clarence-coronel1', 'Removed a blocked date: ', '2023-10-07 13:09:43'),
(418, 'clarence-coronel1', 'Removed a blocked date: ', '2023-10-07 13:09:53'),
(419, 'clarence-coronel1', 'Blocked a new date: test', '2023-10-07 13:09:57'),
(420, 'clarence-coronel1', 'Removed a blocked date: ', '2023-10-07 13:10:23'),
(421, 'clarence-coronel1', 'Blocked a new date: test', '2023-10-07 13:10:33'),
(422, 'clarence-coronel1', 'Blocked a new date: test', '2023-10-07 13:12:06'),
(423, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 13:16:51'),
(424, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 13:34:10'),
(425, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 13:37:06'),
(426, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 13:50:10'),
(427, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 13:54:51'),
(428, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 14:06:52'),
(429, 'clarence-coronel1', 'Viewed feedback', '2023-10-07 14:18:14'),
(430, 'clarence-coronel1', 'Viewed feedback', '2023-10-08 09:51:53'),
(431, 'clarence-coronel1', 'Viewed feedback', '2023-10-08 09:54:14'),
(432, 'clarence-coronel1', 'Viewed feedback', '2023-10-08 09:55:23'),
(433, 'clarence-coronel1', 'Viewed feedback', '2023-10-08 09:55:47'),
(434, 'clarence-coronel1', 'Viewed feedback', '2023-10-08 09:56:11'),
(435, 'clarence-coronel1', 'Blocked a new date: hey ye', '2023-10-08 10:00:57'),
(436, 'clarence-coronel1', 'Viewed feedback', '2023-10-08 13:19:54'),
(437, 'clarence-coronel1', 'Inserted a new slot in ENT\'s wednesday schedule', '2023-10-08 17:01:40'),
(438, 'clarence-coronel1', 'Inserted a new slot in ENT\'s thursday schedule', '2023-10-08 17:01:57');

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
  `scheduleID` int(11) DEFAULT NULL,
  `appointmentDate` date DEFAULT NULL,
  `caseNo` varchar(10) DEFAULT NULL,
  `appointmentStatus` varchar(30) NOT NULL,
  `cancelReason` varchar(200) DEFAULT NULL,
  `dateSubmitted` date NOT NULL DEFAULT current_timestamp(),
  `followUpImgLink` varchar(400) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`appointmentID`, `departmentID`, `firstName`, `middleName`, `lastName`, `sex`, `birthdate`, `phone`, `province`, `municipality`, `barangay`, `patientType`, `appointmentType`, `scheduleID`, `appointmentDate`, `caseNo`, `appointmentStatus`, `cancelReason`, `dateSubmitted`, `followUpImgLink`) VALUES
(12, 1, 'clarence', 'reyes', 'coronel', 'm', '2001-02-12', '0967 599 8955', 'bulacan', 'norzagaray', 'bangkal', 'old', 'website', 8, '2023-10-03', '', 'Active', '', '2023-10-01', NULL),
(13, 1, 'clarence', 'reyes', 'coronel', 'm', '2023-02-12', '0967 599 8955', 'bulacan', 'obando', 'binuangan', 'new', 'website', 30, '2023-10-02', '', 'Active', '', '2023-10-01', NULL),
(14, 1, 'clarence', 'reyes', 'coronel', 'm', '2020-03-12', '0967 599 8955', 'bulacan', 'norzagaray', 'bangkal', 'new', 'website', 32, '2023-10-02', '', 'Active', '', '2023-10-01', NULL),
(15, 1, 'Clarence', 'Reyes', 'Coronel', 'm', '2020-12-12', '0967 599 8955', 'bulacan', 'norzagaray', 'bangkal', 'old', 'admin', 19, '2023-10-03', '', 'Active', '', '2023-10-01', NULL),
(16, 1, 'Clarence', 'Reyes', 'Coronel', 'm', '2020-12-12', '0967 599 8955', 'bulacan', 'pandi', 'bagbaguin', 'old', 'admin', 21, '2023-10-02', '1234', 'Active', '', '2023-10-01', NULL),
(17, 1, 'Clarence', 'Reyes', 'Coronel', 'm', '2001-12-12', '0967 599 8955', 'bulacan', 'pandi', 'bagbaguin', 'old', 'admin', 40, '2023-10-02', '', 'Active', '', '2023-10-01', NULL),
(18, 2, 'clarence', 'reyes', 'coronel', 'm', '2001-03-12', '0967 599 8955', 'bulacan', 'meycauayan', 'bagbaguin', 'old', 'website', 42, '2023-11-08', '', 'cancelled', 'test', '2023-10-04', NULL),
(19, 6, 'Clarence', 'Reyes', 'Coronel', 'm', '2002-02-28', '0967 599 8955', 'bulacan', 'obando', 'binuangan', 'old', 'admin', 28, '2023-10-16', '12-313-123', 'active', NULL, '2023-10-04', NULL),
(20, 1, 'test', 'test', 'test', 'm', '2001-03-12', '0967 599 8955', 'bulacan', 'pulilan', 'balatong A', 'old', 'website', 8, '2023-10-17', '', 'active', NULL, '2023-10-05', NULL),
(30, 1, 'clarence', 'reyes', 'coronel', 'm', '2001-03-12', '0967 599 8955', 'bulacan', 'plaridel', 'agnaya', 'old', 'website', 8, '2023-10-24', '', 'active', NULL, '2023-10-05', NULL),
(31, 1, 'clarence', 'eyes', 'coronel', 'm', '2001-03-12', '0967 599 8955', 'bulacan', 'paombong', 'binakod', 'old', 'website', NULL, NULL, '', 'pending', NULL, '2023-10-05', 'https://firebasestorage.googleapis.com/v0/b/imgsample-86e3a.appspot.com/o/Images1%2F1694613420601.png?alt=media&token=1a9fe31d-6ecc-4261-aeca-ef654aa9efde'),
(46, 1, 'clarence', 'reyes', 'coronel', 'm', '2001-03-12', '0967 599 8955', 'bulacan', 'plaridel', 'agnaya', 'old', 'website', NULL, NULL, '', 'pending', NULL, '2023-10-05', 'https://firebasestorage.googleapis.com/v0/b/imgsample-86e3a.appspot.com/o/Images1%2Fmedicine.png?alt=media&token=15963b3e-577b-4717-b913-181c708cfc34'),
(47, 1, 'clarence', 'reyes', 'coronel', 'm', '2001-04-12', '0967 599 8955', 'bulacan', 'pulilan', 'balatong A', 'new', 'website', 47, '2023-10-30', '', 'cancelled', 'test', '2023-10-08', NULL),
(48, 1, 'clarence', 'reyes', 'coronel', 'm', '2001-04-12', '0967 599 8955', 'bulacan', 'pandi', 'bagbaguin', 'old', 'website', 47, '2023-10-16', '', 'active', NULL, '2023-10-08', NULL),
(49, 1, 'clarence', 'reyes', 'coronel', 'm', '2005-01-14', '0967 599 8955', 'bulacan', 'pulilan', 'balatong A', 'old', 'website', 43, '2023-10-16', '', 'active', NULL, '2023-10-08', NULL);

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
('active'),
('cancelled'),
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
(14, '2023-10-20', 'test', 0),
(16, '2024-09-12', 'test', 1),
(19, '2024-05-05', 'test', 0),
(20, '2024-01-01', 'new year', 1),
(22, '2023-12-28', 'test', 1),
(23, '2024-02-02', 'test', 0),
(28, '2027-10-28', 'test', 0),
(30, '2024-01-04', 'test', 0),
(31, '2024-02-03', 'test', 0),
(32, '2024-12-01', 'test', 0),
(33, '2027-12-14', 'test', 0),
(34, '2029-12-13', 'test', 0),
(35, '2024-05-06', 'hey ye', 1);

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
(20, 4, 'test', '2023-09-23 11:46:37'),
(21, 5, 'test', '2023-10-03 18:14:01'),
(22, 4, 'None', '2023-10-07 12:40:45');

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
(3, 1, 'wed', '08:50:00', '09:00:00', 10, 0, 1),
(5, 1, 'fri', '08:00:00', '09:00:00', 10, 1, 1),
(6, 1, 'sat', '08:00:00', '09:00:00', 10, 1, 1),
(8, 1, 'tue', '09:00:00', '10:00:00', 1, 1, 0),
(9, 1, 'wed', '09:00:00', '10:00:00', 15, 1, 0),
(12, 1, 'sat', '09:00:00', '10:00:00', 15, 1, 0),
(19, 1, 'tue', '07:40:00', '08:00:00', 1, 1, 1),
(20, 1, 'mon', '07:00:00', '08:00:00', 1, 0, 0),
(21, 1, 'mon', '07:00:00', '08:00:00', 10, 1, 1),
(22, 1, 'thu', '07:00:00', '08:00:00', 1, 1, 0),
(23, 1, 'thu', '07:00:00', '08:00:00', 1, 1, 0),
(24, 17, 'mon', '07:00:00', '08:00:00', 19, 1, 0),
(25, 17, 'mon', '10:00:00', '11:00:00', 10, 1, 1),
(27, 17, 'tue', '07:00:00', '08:00:00', 10, 1, 0),
(28, 6, 'mon', '07:00:00', '08:00:00', 1, 1, 0),
(29, 1, 'mon', '07:00:00', '08:00:00', 1, 0, 0),
(30, 1, 'mon', '07:00:00', '08:00:00', 1, 0, 0),
(31, 1, 'mon', '09:00:00', '10:00:00', 1, 0, 0),
(32, 1, 'mon', '08:00:00', '09:00:00', 5, 0, 0),
(33, 1, 'mon', '11:00:00', '00:00:00', 10, 0, 0),
(34, 1, 'mon', '11:00:00', '00:00:00', 1, 0, 0),
(35, 1, 'mon', '11:00:00', '12:00:00', 10, 0, 0),
(36, 1, 'mon', '11:00:00', '00:00:00', 1, 0, 0),
(37, 1, 'mon', '13:00:00', '14:00:00', 10, 0, 0),
(38, 1, 'mon', '13:00:00', '14:00:00', 10, 0, 0),
(39, 1, 'mon', '16:00:00', '17:00:00', 12, 0, 0),
(40, 1, 'mon', '07:00:00', '08:00:00', 1, 0, 0),
(41, 1, 'mon', '07:00:00', '08:00:00', 12, 0, 0),
(42, 2, 'wed', '07:00:00', '08:00:00', 10, 1, 0),
(43, 1, 'mon', '07:00:00', '08:00:00', 1, 1, 0),
(44, 1, 'mon', '10:10:00', '14:10:00', 0, 0, 0),
(45, 1, 'mon', '10:00:00', '17:00:00', 1, 0, 0),
(46, 1, 'mon', '11:02:00', '12:00:00', 1, 0, 0),
(47, 1, 'mon', '10:00:00', '00:00:00', 1, 1, 0),
(48, 1, 'wed', '10:00:00', '11:00:00', 5, 1, 1),
(49, 1, 'thu', '14:00:00', '15:00:00', 2, 1, 1);

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
(2, 'Ang iSchedule website ay kasalukuyang naka down', 'sched is down sorry', 0),
(3, 'Ang pag schedule ng appointment ay kasalukuyang hinihinto', 'test', 0);

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
  ADD KEY `appointments-departments` (`departmentID`),
  ADD KEY `appointments-schedules` (`scheduleID`),
  ADD KEY `appointments-status` (`appointmentStatus`);

--
-- Indexes for table `appointment_status`
--
ALTER TABLE `appointment_status`
  ADD PRIMARY KEY (`status`);

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
  MODIFY `adminLogsID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=439;

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `annID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `appointmentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `block_dates`
--
ALTER TABLE `block_dates`
  MODIFY `blockID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `deptID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `feedbackID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `scheduleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

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
  ADD CONSTRAINT `appointments-departments` FOREIGN KEY (`departmentID`) REFERENCES `departments` (`deptID`),
  ADD CONSTRAINT `appointments-schedules` FOREIGN KEY (`scheduleID`) REFERENCES `schedules` (`scheduleID`),
  ADD CONSTRAINT `appointments-status` FOREIGN KEY (`appointmentStatus`) REFERENCES `appointment_status` (`status`);

--
-- Constraints for table `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `schedules_departments` FOREIGN KEY (`deptID`) REFERENCES `departments` (`deptID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
