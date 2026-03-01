-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 01, 2026 at 03:21 AM
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
-- Database: `ajay_portfolio`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Web Development'),
(2, 'UI/UX Design'),
(3, 'Motion Design');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `social` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `first_name`, `last_name`, `email`, `social`, `message`, `created_at`) VALUES
(2, 'asd dasd asd', 'asd dasd asd', 'asd dasd asd', 'asd dasd asd', 'asd dasd asd', '2026-02-27 00:37:38'),
(3, 'Ajay', 'Mystic', 'ajay@gmail.com', 'instagram', 'hey there let have some fun', '2026-02-27 00:41:23'),
(7, 'Ajay ', 'Ajay', 'ajay@asdsda.com', 'instagram', 'asdasdasdasdasd', '2026-02-28 01:53:48'),
(8, 'Ajay ', 'Mystic', 'balamurugan1232@y.com', 'instagram', 'heyheyheyhey', '2026-02-28 01:54:58');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `technologies` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `live_url` varchar(255) DEFAULT NULL,
  `github_url` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `description`, `technologies`, `image`, `live_url`, `github_url`, `category_id`, `created_at`) VALUES
(3, 'Industry Night 2025', 'A dedicated showcase website for Interactive Media Design students to present their portfolios and achievements to industry professionals.', 'Web Design, UI/UX, Responsive', 'images/projects/industrynight.jpg', '', 'https://github.com/Alex4747-J/Group_7-Industry_Night.git', 1, '2026-02-28 19:36:54'),
(4, 'Full Fledged Website - LuxAudio Buds', 'E-commerce platform for premium audio products featuring product showcases, shopping cart, and responsive design.', 'E-Commerce, JavaScript, Responsive', 'images/projects/luxbuds.jpg', '', 'https://github.com/ajaymystic/AntonyRaj_AjayChakaravarthy_EarBuds.git', 1, '2026-02-28 19:36:54'),
(5, 'Brand Refresh - Seven', 'Complete brand identity redesign including logo, color palette, typography, and brand guidelines.', 'Branding, Graphics, Identity', 'images/projects/brandrefresh-7.jpg', '', '', 2, '2026-02-28 19:36:54'),
(6, 'Motion Graphics Showreel', 'Collection of animated graphics and video projects showcasing motion design skills.', 'Motion, After Effects, Animation', 'images/projects/matchday.jpg', '', '', 3, '2026-02-28 19:36:54'),
(7, '3D Design', 'Built from scratch on Cinema4D', 'Portfolio, SASS, GSAP', 'images/projects/earbuds.jpg', '', '', 1, '2026-02-28 19:36:54'),
(8, 'Brand Refresh - Squeezit', 'Complete brand identity redesign including logo, color palette, typography, and brand guidelines.', 'Logo, Branding, Illustrator', 'images/projects/squeezit.jpg', '', '', 2, '2026-02-28 19:36:54');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `quote` text NOT NULL,
  `name` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL,
  `company` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `quote`, `name`, `role`, `company`, `created_at`) VALUES
(1, 'Working with Ajay was an absolute pleasure. His attention to detail and creative approach brought our vision to life in ways we never imagined.', 'Sarah Johnson', 'Marketing Director', 'TechCorp Inc.', '2026-02-28 20:06:50'),
(2, 'Ajay\'s UI/UX expertise transformed our product completely. User engagement increased by 200% after the redesign. Highly recommended!', 'Michael Chen', 'Product Manager', 'StartupXYZ', '2026-02-28 20:06:50'),
(3, 'Professional, creative, and efficient. Ajay delivered beyond our expectations and on time. His design skills are truly exceptional.', 'Emily Rodriguez', 'CEO', 'Digital Solutions Ltd.', '2026-02-28 20:06:50'),
(4, 'The best designer we\'ve worked with. Ajay\'s ability to understand our brand and translate it into stunning visuals is remarkable.', 'David Thompson', 'Creative Director', 'BrandStudio', '2026-02-28 20:06:50'),
(5, 'Ajay doesn\'t just design interfaces, he creates experiences. Our users love the new design and so do we!', 'Lisa Wang', 'Founder', 'InnovateTech', '2026-02-28 20:06:50');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(120) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(3, 'ajay', '$2y$10$CFlrrczmQwHDUPef//AZAePpTHiltefHZc1ZRF4rk8YjWOA.wBvS6');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username_unique` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
