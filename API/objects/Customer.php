<?php
    class Customer{
        private $CONN;
        private $TABLE_NAME="quicktours";
        public $id;
        public $customer_name;
        public $customer_contact;
        public $customer_email;
        public $from_location;
        public $to_location;
        public $selected_vehicle;
        public $price_vehicle;
        public $pick_up_date;
        public $pick_up_time;
        public $distance;
        public $distance_value;
        public $durations;
        public $durations_value;
        public $trip_way;
        public $conformation_code;
        public $job_done;
        public $vehi_confirm;
        public $client_location;
        public $created;

        public function __construct($database)
        {
        $this->CONN = $database;
        }

        public function read($res_mobile){
            $query = "SELECT * FROM quicktours WHERE customer_contact ='$res_mobile' LIMIT 1";
            $stmt = $this->CONN->query($query);
            return $stmt;
        }

    }
?>