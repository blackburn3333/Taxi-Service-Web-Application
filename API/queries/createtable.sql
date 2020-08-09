CREATE TABLE IF NOT EXISTS `quickTours` (
  `id` int NOT NULL  PRIMARY KEY AUTO_INCREMENT ,
  `customer_name` varchar(200)  NULL,
  `customer_contact` varchar(50)  NULL,
  `customer_email` varchar(100)  NULL,
  
  `fromLocation` text  NULL,
  `toLocation` text  NULL,
  `selected_vehicle` varchar(1)  NULL,
  `price_vehicle` int  NULL,
  `pick_up_date`  varchar(20)  NULL,
  `pick_up_time` varchar(20)  NULL,
  `distance` varchar(20)  NULL,
  `distance_value` text  NULL, 
  `durations` varchar(20)  NULL,
  `durations_value` text  NULL, 
  `trip_way`varchar(1)  NULL,
  `conformation_code` varchar(10)  NULL,
  `job_done` int  DEFAULT 0,
  `vehi_confirm` int  DEFAULT 0,
  `client_location` varchar(250) DEFAULT "NO",
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE `quickTours` AUTO_INCREMENT = 1000;

CREATE TABLE IF NOT EXISTS `businessProfile`(
 `id` int NOT NULL  PRIMARY KEY AUTO_INCREMENT,
 `business_name` varchar(200) NOT NULL,
 `branch_name` varchar(100) NULL,
 `business_contact_number` varchar(15) NOT NULL,
 `business_email_address` varchar(100) NULL,
 `responsible_persons_name` varchar(200) NOT NULL,
 `responsible_persons_contact_number` varchar(15) NOT NULL,
 `password`  text NOT NULL,
 `conformation_code` varchar(10) NOT NULL,
 `main_conformation` varchar(5) DEFAULT '0',
 `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE `businessProfile` AUTO_INCREMENT = 1000;


DROP table businessprofile;
DROP table quickTours;
DELETE FROM quickTours;
select * from businessProfile;

create table if not exists `businessTours`(
  `id` int NOT NULL  PRIMARY KEY AUTO_INCREMENT,
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
  `special_note` text null,
  `team_lead` text not null,
  `team_lead_contact` varchar(15) NOT NULL,
  `travel_count` int default 3,
  `job_done` int  DEFAULT 0,
  `business_id` int,
  `vehi_conf` int  DEFAULT 0,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  foreign key(`business_id`) references `businessProfile`(`id`)
);
ALTER TABLE `businessTours` AUTO_INCREMENT = 1000;
select * from businessTours;

DROP table businessTours;
DELETE FROM businessTours;
SELECT *,businessProfile.id as bus_id,businessProfile.business_name as bus_name,businessProfile.branch_name as bus_branch,businessProfile.business_contact_number as bus_cont,businessProfile.responsible_persons_name as bus_bus_res_name,businessProfile.responsible_persons_contact_number as res_cont FROM businessTours INNER JOIN businessProfile ON businessTours.business_id = businessProfile.id;


DESCRIBE vehicles_employee;
CREATE TABLE IF NOT EXISTS `vehicles_employee`(
	`id` int NOT NULL  PRIMARY KEY AUTO_INCREMENT,
	`full_name` varchar (150) null,
    `nic` varchar(15) null,
    `address` varchar(400) null,
    `contact_number` varchar(15) null,
	`email` varchar(150) null,
    `bank` varchar(50) null,
    `bank_branch` varchar(50) null,
	`account_number` varchar(50) null,
    `dl_no` varchar(15) null,
    `emp_type` varchar(2) null,
	`profile_image` longtext null,
    `password` text null,
    `status` varchar(2) default "1",
    `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE `vehicles_employee` AUTO_INCREMENT = 1000;



DROP table vehicles_employee;
drop table vehicle_of_driver;
select * from vehicles_employee;


CREATE TABLE IF NOT EXISTS `vehicle_of_driver`(
    `id` int NOT NULL  PRIMARY KEY AUTO_INCREMENT,
    `vehicle_brand` varchar(30)not null,
    `vehicle_name` varchar(30) not null,
    `owner_id` int NOT NULL,
	`reg_number` varchar(10) not null,
    `chasi_number` varchar(20) not null,
    `eng_number` varchar(20) not null,
    `reg_year` varchar(15) not null,
    `manufac_year` varchar(15),
    `main_image` longtext null,
    `sub_image_one` longtext null,
    `sub_image_two` longtext null,
    `sub_image_three` longtext null,
    `sub_image_four` longtext null,
    `type` varchar(20) not null,
	`created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    foreign key(`owner_id`) references `vehicles_employee`(`id`)
);
ALTER TABLE `vehicle_of_driver` AUTO_INCREMENT = 1000;
select * from vehicle_of_driver;
drop table vehicle_of_driver;

create table `tour_connection`(
	`id` int NOT NULL  PRIMARY KEY AUTO_INCREMENT,
    `start_time` varchar(20) not null,
	`end_time` varchar(20) not null,
    `start_meter` varchar(20) not null,
    `end_meter` varchar(20) not null,
    `status` varchar(2) not null,
    `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

select * from vehicles_employee;

select vehicles_employee.id as emp_id, vehicles_employee.*,vehicle_of_driver.id as v_id, vehicle_of_driver.* from `vehicles_employee` left join `vehicle_of_driver` on vehicles_employee.id = vehicle_of_driver.owner_id;


SELECT *, vehicles_employee.id as emp_id, (SELECT COUNT(*) FROM vehicle_of_driver where owner_id = emp_id ) FROM vehicles_employee;



CREATE TABLE IF NOT EXISTS `package_booking` (
  `id` int NOT NULL  PRIMARY KEY AUTO_INCREMENT ,
  `customer_name` varchar(200)  NULL,
  `customer_contact` varchar(50)  NULL,
  `customer_email` varchar(100)  NULL,
  
  `package_anme` text  NULL,
  `selected_vehicle` varchar(1)  NULL,
  `package_price` int  NULL,
  `pick_up_date`  varchar(20)  NULL,
  `pick_up_time` varchar(20)  NULL,
  
  `conformation_code` varchar(10)  default 0,
  `pack_done` int  DEFAULT 0,
  
  `client_location` varchar(250) DEFAULT "NO",
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE `package_booking` AUTO_INCREMENT = 1000;