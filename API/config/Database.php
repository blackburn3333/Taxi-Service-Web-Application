<?php

/**
 * * * User: Jayendra Matarage
 * Date: 6/2/2019 Time: 5:44 PM
 * Github : /blackburn3333
 */
class Database
{
    private static $serverName = "";
    private static $serverUserName = "";
    private static $serverPassword = "";
    private static $serverDatabase = "";

    private function createQuickTaxi()
    {
        $query = "CREATE TABLE IF NOT EXISTS `quickTours` (
            `id` int NOT NULL  PRIMARY KEY AUTO_INCREMENT,
            `customer_name` varchar(200) NOT NULL,
            `customer_contact` varchar(50) NOT NULL,
            `customer_email` varchar(100) NOT NULL,

            `fromLocation` text NOT NULL,
            `toLocation` text NOT NULL,
            `selected_vehicle` varchar(1) NOT NULL,
            `price_vehicle` int NOT NULL,
            `pick_up_date`  varchar(20) NOT NULL,
            `pick_up_time` varchar(20) NOT NULL,
            `distance` varchar(20) NOT NULL,
            `distance_value` text NOT NULL,
            `durations` varchar(20) NOT NULL,
            `durations_value` text NOT NULL,
            `trip_way`varchar(1) NOT NULL,
            `conformation_code` varchar(10) NOT NULL,

            `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
          );ALTER TABLE `quickTours` AUTO_INCREMENT = 1000;";
        return $query;
    }

    private function createBusiness()
    {
        $query = "CREATE TABLE IF NOT EXISTS `businessProfile`(
                `id` int NOT NULL  PRIMARY KEY AUTO_INCREMENT,
 `business_name` varchar(200) NOT NULL,
 `branch_name` varchar(100) NULL,
 `business_contact_number` int NOT NULL,
 `business_email_address` varchar(100) NULL,
 `responsible_persons_name` varchar(200) NOT NULL,
 `responsible_persons_contact_number` int NOT NULL,
 `password` varchar(200) NOT NULL,
 `conformation_code` varchar(10) NOT NULL,
 `main_conformation` varchar(5) DEFAULT '0',
 `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);ALTER TABLE `businessProfile` AUTO_INCREMENT = 1000;";
        return $query;
    }

    public function connect()
    {
        $conn = new mysqli(self::$serverName, self::$serverUserName, self::$serverPassword, self::$serverDatabase);
        if (!$conn) {
            die("Connection error: " . mysqli_connect_error());
        } else {
            $conn->query($this->createQuickTaxi());
            $conn->query($this->createBusiness());
            return $conn;
        }

    }

}
