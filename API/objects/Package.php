<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

    class Package{
        private $CONN;
        private $table_name="package_booking";
        public $id;
        public $customer_name;
        public $customer_contact;
        public $customer_email;
        public $package_name;
        public $selected_vehicle;
        public $package_price;
        public $pick_up_date;
        public $pick_up_time;
        public $confermation;
        public $pack_done;
        public $client_location;
        public $created;

        public function __construct($database)
        {
        $this->CONN = $database;
        }

        public function read(){
            $query = "SELECT * FROM package_booking";
            $stmt = $this->CONN->query($query);
            return $stmt;
        }

    }
?>