CREATE TABLE `booklog` (
  `ISBN13` varchar(13) NOT NULL,
  `ISBN10` varchar(10) DEFAULT NULL,
  `BookName` varchar(50) NOT NULL,
  `Author` varchar(25) DEFAULT NULL,
  `Publisher` varchar(25) DEFAULT NULL,
  `Genre` varchar(25) DEFAULT NULL,
  `IssueDate` date DEFAULT NULL,
  `GetDate` date DEFAULT NULL,
  `ReadDate` date DEFAULT NULL,
  `Ownership` tinyint(1) DEFAULT NULL,
  `Purchase` int(11) DEFAULT NULL,
  `Library` varchar(25) DEFAULT NULL,
  `Overview` varchar(255) DEFAULT NULL,
  `Impressions` text,
  `State` varchar(10) DEFAULT NULL,
  `CoverImg` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`ISBN13`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
