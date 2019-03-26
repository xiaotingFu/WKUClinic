-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 03, 2016 at 04:16 AM
-- Server version: 10.1.9-MariaDB
-- PHP Version: 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `clinicseng`
--

-- --------------------------------------------------------

--
-- Table structure for table `diagnosis`
--

CREATE TABLE `diagnosis` (
  `did` int(10) NOT NULL,
  `sid` int(10) NOT NULL,
  `pid` int(7) NOT NULL,
  `time` date NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `temperature` int(3) DEFAULT NULL,
  `systolicBP` int(4) DEFAULT NULL,
  `diastolicBP` int(4) DEFAULT NULL,
  `heartrate` int(3) DEFAULT NULL,
  `advice` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `diagnosis`
--

INSERT INTO `diagnosis` (`did`, `sid`, `pid`, `time`, `description`, `temperature`, `systolicBP`, `diastolicBP`, `heartrate`, `advice`) VALUES
(1, 1, 10000, '2016-05-27', 'test diagnosis description', 37, 120, 70, 80, 'test diagnosis advice'),
(141, 1, 930705, '2016-03-16', 'fever, sore throat', 39, 120, 65, 80, 'aviod exercises, take more sleep'),
(142, 1, 930331, '2016-04-26', 'running nose', 37, 110, 60, 76, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `identity`
--

CREATE TABLE `identity` (
  `id` int(1) NOT NULL,
  `identity` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `identity`
--

INSERT INTO `identity` (`id`, `identity`) VALUES
(1, 'student'),
(2, 'staff'),
(3, 'faculty');

-- --------------------------------------------------------

--
-- Table structure for table `illness`
--

CREATE TABLE `illness` (
  `sid` int(10) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `categorya` varchar(40) NOT NULL,
  `categoryb` varchar(20) NOT NULL,
  `defaultdescription` varchar(100) DEFAULT NULL,
  `defaultadvice` varchar(100) DEFAULT NULL,
  `pinyin` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `illness`
--

INSERT INTO `illness` (`sid`, `name`, `categorya`, `categoryb`, `defaultdescription`, `defaultadvice`, `pinyin`) VALUES
(1, 'amygdalitis', 'upper respiratory infection', 'respiration disease', 'test description', 'test advice', 'btty');

-- --------------------------------------------------------

--
-- Table structure for table `medicine`
--

CREATE TABLE `medicine` (
  `mid` int(10) NOT NULL,
  `name` varchar(20) NOT NULL,
  `inventory` int(3) DEFAULT NULL,
  `specification` varchar(20) DEFAULT NULL,
  `producer` varchar(20) DEFAULT NULL,
  `price` int(10) DEFAULT NULL,
  `paytype` tinyint(1) DEFAULT '0',
  `defaultusage` varchar(30) DEFAULT '0',
  `category` tinyint(1) DEFAULT NULL,
  `pinyin` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `medicine`
--

INSERT INTO `medicine` (`mid`, `name`, `inventory`, `specification`, `producer`, `price`, `paytype`, `defaultusage`, `category`, `pinyin`) VALUES
(1, 'Ganmaoling Granules', 50, '100g/bag', '999 company', 12, 0, '3 times/day; 1 bag/time', 0, 'gmlkl');

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `pid` int(7) NOT NULL,
  `name` varchar(20) NOT NULL,
  `identity` int(1) DEFAULT '1',
  `insurance` varchar(20) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `gender` varchar(2) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,
  `pasthistory` varchar(100) DEFAULT NULL,
  `allergichistory` varchar(100) DEFAULT NULL,
  `height` int(4) DEFAULT NULL,
  `weight` int(4) DEFAULT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`pid`, `name`, `identity`, `insurance`, `birthday`, `gender`, `pasthistory`, `allergichistory`, `height`, `weight`, `status`) VALUES
(10000, 'Wang Bai', 0, 'None', '1995-11-22', 'F', 'None', 'None', 163, 50, 'Active'),
(930705, 'Li Ming', 2, 'None', '1995-11-15', 'M', 'None', 'None', 178, 62, 'Active'),
(9307772, 'Wang Di', 1, 'Yes', '1998-05-03', 'M', 'None', 'None', 0, 0, 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `prescription`
--

CREATE TABLE `prescription` (
  `pscid` int(10) NOT NULL,
  `mid` int(10) NOT NULL,
  `did` int(10) NOT NULL,
  `customusage` varchar(20) DEFAULT NULL,
  `quantity` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `prescription`
--

INSERT INTO `prescription` (`pscid`, `mid`, `did`, `customusage`, `quantity`) VALUES
(1, 1, 1, 'test customusage', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `diagnosis`
--
ALTER TABLE `diagnosis`
  ADD PRIMARY KEY (`did`);

--
-- Indexes for table `identity`
--
ALTER TABLE `identity`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `illness`
--
ALTER TABLE `illness`
  ADD PRIMARY KEY (`sid`),
  ADD UNIQUE KEY `sid` (`sid`);

--
-- Indexes for table `medicine`
--
ALTER TABLE `medicine`
  ADD PRIMARY KEY (`mid`),
  ADD UNIQUE KEY `mid` (`mid`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`pid`),
  ADD UNIQUE KEY `pid` (`pid`);

--
-- Indexes for table `prescription`
--
ALTER TABLE `prescription`
  ADD PRIMARY KEY (`pscid`),
  ADD UNIQUE KEY `pscid` (`pscid`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
