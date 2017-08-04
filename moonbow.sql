-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 05, 2017 at 01:38 AM
-- Server version: 10.1.25-MariaDB-1~xenial
-- PHP Version: 7.0.18-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `moonbow`
--

-- --------------------------------------------------------

--
-- Table structure for table `section_list`
--

CREATE TABLE `section_list` (
  `sid` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `position` int(11) DEFAULT NULL,
  `class_id` varchar(255) DEFAULT NULL,
  `tid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `section_list`
--

INSERT INTO `section_list` (`sid`, `title`, `description`, `position`, `class_id`, `tid`) VALUES
(1, 'welcome', 'let\'s get to know each other', 1, 'welcome', 1),
(2, 'portfolio', 'portfolio description', 2, 'portfolio', 2),
(3, 'testimonials', 'what the clients say', 3, 'testimonials', 1),
(4, 'connect', 'want to get in touch, talk business or just say hi? here\'s where you can find me', 4, 'connect', 1);

-- --------------------------------------------------------

--
-- Table structure for table `section_type`
--

CREATE TABLE `section_type` (
  `tid` int(11) NOT NULL,
  `type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `section_type`
--

INSERT INTO `section_type` (`tid`, `type`) VALUES
(1, 'blank'),
(2, 'portfolio'),
(3, 'test123');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `homepage_color` varchar(255) NOT NULL,
  `dashboard_color` varchar(255) NOT NULL,
  `website_name` varchar(255) NOT NULL,
  `website_description` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `email_address` varchar(255) NOT NULL,
  `footer_info` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `homepage_color`, `dashboard_color`, `website_name`, `website_description`, `author`, `email_address`, `footer_info`) VALUES
(1, 'White', 'Black', 'kostadinovski.me', 'this is the website desc', '@imilosk, @imstef', 'milos.kostadinovski97@gmail.com', '<p>The Moonbow CMS is completely free and open-source. You can download it on GitHub.</p>\n        <p>Made with <span class="icon icon-heart inverse-icon icon-heart-footer"></span> by @imstef, @imilosk</p>');

-- --------------------------------------------------------

--
-- Table structure for table `template_blank`
--

CREATE TABLE `template_blank` (
  `bid` int(11) NOT NULL,
  `content` text,
  `sid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `template_blank`
--

INSERT INTO `template_blank` (`bid`, `content`, `sid`) VALUES
(1, 'Hi there, I\'m a software developer, tech blogger and hobbyist photographer.', 1),
(2, 'good', 3),
(3, '<ul>\r\n            <li><a href="#">LinkedIn</a></li>\r\n            <li><a href="#">GitHub</a></li>\r\n            <li><a href="#">StackOverflow</a></li>\r\n</ul>', 4);

-- --------------------------------------------------------

--
-- Table structure for table `template_portfolio`
--

CREATE TABLE `template_portfolio` (
  `tpid` int(11) NOT NULL,
  `sid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `template_portfolio`
--

INSERT INTO `template_portfolio` (`tpid`, `sid`) VALUES
(1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `template_portfolio_categories`
--

CREATE TABLE `template_portfolio_categories` (
  `cid` int(11) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `position` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `template_portfolio_categories`
--

INSERT INTO `template_portfolio_categories` (`cid`, `category`, `position`) VALUES
(1, 'web', 1),
(2, 'games', 2),
(3, 'desktop', 3);

-- --------------------------------------------------------

--
-- Table structure for table `template_portfolio_projects`
--

CREATE TABLE `template_portfolio_projects` (
  `pid` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `modal_content` text,
  `logo` varchar(255) DEFAULT NULL,
  `technologies` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `link_icon` varchar(255) DEFAULT NULL,
  `tpid` int(11) DEFAULT NULL,
  `cid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `template_portfolio_projects`
--

INSERT INTO `template_portfolio_projects` (`pid`, `title`, `description`, `modal_content`, `logo`, `technologies`, `link`, `link_icon`, `tpid`, `cid`) VALUES
(1, 'Twitter Clone', 'lightweight and minimal Twitter-like updates sharing platform.', '                    <h2>Project Description</h2>\n                    <p><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid animi asperiores consequatur cupiditate distinctio 123123123123123lorem, enim hic ipsa laborum molestias, mollitia nisi nostrum nulla pariatur quasi ratione rem sequi. Dolore laboriosam officia possimus quam quasi reiciendis, saepe vel!</span></p>\n                    <h2>Technologies and Frameworks</h2>\n                    <p><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, consequatur cupiditate est exercitationem iste iure magni nesciunt nostrum officiis placeat quaerat quisquam quo ullam, voluptate voluptatibus! Dolorem expedita incidunt repellat.</span><span>Dolores laudantium magnam nam non quas tempore vel? Animi eos eum ipsum obcaecati odit possimus quo. Aliquid, atque corporis dolor illo iste nemo nobis officiis quasi repudiandae sequi, tempora unde!</span>\n                    </p>\n                    <h2>Screenshots</h2>\n                    <div class="gallery">\n                        Screenshot 1\n                        Screenshot 2\n                        Screenshot 3\n                    </div>', 'logos/logo.png', 'php;js;python;java;csharp', 'https://github.com/imstef/moonbow-cms', 'github', 1, 1),
(2, 'Snake game', 'snake game', '123', 'logos/logo.png', '123', 'https://github.com/imstef/moonbow-cms', 'github', 1, 2),
(3, 'Moonbow CMS', 'test item', 'this is a test text', 'logos/logo.png', 'html;css;js;python', 'https://github.com/imstef/moonbow-cms', 'github', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(11, 'milos', '$5$rounds=535000$Ue/.4UKWV/e86DkL$sBFlBONRG6IKINqhYEH83PmIWBJEt4f67K2huSJrk92');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `section_list`
--
ALTER TABLE `section_list`
  ADD PRIMARY KEY (`sid`),
  ADD KEY `tid` (`tid`);

--
-- Indexes for table `section_type`
--
ALTER TABLE `section_type`
  ADD PRIMARY KEY (`tid`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `template_blank`
--
ALTER TABLE `template_blank`
  ADD PRIMARY KEY (`bid`),
  ADD KEY `sid` (`sid`);

--
-- Indexes for table `template_portfolio`
--
ALTER TABLE `template_portfolio`
  ADD PRIMARY KEY (`tpid`),
  ADD KEY `sid` (`sid`);

--
-- Indexes for table `template_portfolio_categories`
--
ALTER TABLE `template_portfolio_categories`
  ADD PRIMARY KEY (`cid`);

--
-- Indexes for table `template_portfolio_projects`
--
ALTER TABLE `template_portfolio_projects`
  ADD PRIMARY KEY (`pid`),
  ADD KEY `tpid` (`tpid`),
  ADD KEY `cid` (`cid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `section_list`
--
ALTER TABLE `section_list`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `section_type`
--
ALTER TABLE `section_type`
  MODIFY `tid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `template_blank`
--
ALTER TABLE `template_blank`
  MODIFY `bid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `template_portfolio`
--
ALTER TABLE `template_portfolio`
  MODIFY `tpid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `template_portfolio_categories`
--
ALTER TABLE `template_portfolio_categories`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `template_portfolio_projects`
--
ALTER TABLE `template_portfolio_projects`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `section_list`
--
ALTER TABLE `section_list`
  ADD CONSTRAINT `section_list_ibfk_1` FOREIGN KEY (`tid`) REFERENCES `section_type` (`tid`);

--
-- Constraints for table `template_blank`
--
ALTER TABLE `template_blank`
  ADD CONSTRAINT `template_blank_ibfk_1` FOREIGN KEY (`sid`) REFERENCES `section_list` (`sid`);

--
-- Constraints for table `template_portfolio`
--
ALTER TABLE `template_portfolio`
  ADD CONSTRAINT `template_portfolio_ibfk_1` FOREIGN KEY (`sid`) REFERENCES `section_list` (`sid`);

--
-- Constraints for table `template_portfolio_projects`
--
ALTER TABLE `template_portfolio_projects`
  ADD CONSTRAINT `template_portfolio_projects_ibfk_1` FOREIGN KEY (`tpid`) REFERENCES `template_portfolio` (`tpid`),
  ADD CONSTRAINT `template_portfolio_projects_ibfk_2` FOREIGN KEY (`cid`) REFERENCES `template_portfolio_categories` (`cid`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
