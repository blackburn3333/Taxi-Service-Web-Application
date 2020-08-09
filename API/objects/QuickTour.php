<?php

/**
 * * * User: Jayendra Matarage
 * Date: 6/3/2019 Time: 3:16 AM
 * Github : /blackburn3333
 */
class QuickTour
{

    private $CONN;
    private $TABLE_NAME = "quickTours";
    public $id;
    public $customer_name;
    public $customer_contact;
    public $customer_email;

    public $fromLocation;
    public $toLocation;
    public $selected_vehicle;
    public $price_vehicle;
    public $pick_up_date;
    public $pick_up_time;
    public $distance;
    public $durations;
    public $trip_way;
    public $conformation_code;
    public $created;

    public function __construct($database)
    {
        $this->CONN = $database;
    }

    public function read()
    {
        $query = "SELECT * FROM quickTours";
        $stmt = $this->CONN->query($query);
        //$stmt->execute();
        return $stmt;
    }

    public function confirm($ref_id)
    {
        $query = "SELECT * FROM quickTours WHERE id = '$ref_id' LIMIT 1";
        $stmt = $this->CONN->query($query);
        return $stmt;
    }

    public function confirm_update($id)
    {
        $update_query = "UPDATE quickTours SET conformation_code = '1'  WHERE id = '$id'";
        if (mysqli_query($this->CONN, $update_query)) {
            return true;
        } else {
            return false;
            //echo mysqli_error($this->connect());
        }
    }

    public function create($BtchData)
    {
        $add_query = "INSERT INTO " . $this->TABLE_NAME . " (";
        $add_query .= implode(",", array_keys($BtchData)) . ') VALUES (';
        $add_query .= "'" . implode("','", array_values($BtchData)) . "')";
        if (mysqli_query($this->CONN, $add_query)) {
            $last_id = $this->CONN->insert_id;
            $returnData = array(
                'return_data' => $last_id,
                'status' => true,
            );
            return $returnData;
        } else {
            echo mysqli_error($this->connect());
            $returnData = array(
                'return_data' => "error",
                'status' => false,
            );
            return $returnData;
        }
    }

    public function create_package($BtchData){
        $add_query = "INSERT INTO `package_booking` (";
        $add_query .= implode(",", array_keys($BtchData)) . ') VALUES (';
        $add_query .= "'" . implode("','", array_values($BtchData)) . "')";
        if (mysqli_query($this->CONN, $add_query)) {
            $last_id = $this->CONN->insert_id;
            $returnData = array(
                'return_data' => $last_id,
                'status' => true,
            );
            return $returnData;
        } else {
            echo mysqli_error($this->connect());
            $returnData = array(
                'return_data' => "error",
                'status' => false,
            );
            return $returnData;
        }
    }

    public function updateQueryQuickTour( $id, $data){
        $keys = array_keys($data);
        $values = array_values($data);
        $result = $this->mapData($keys,$values);
        $update_query = "UPDATE quickTours SET ";
        $update_query .= implode(",",$result);
        $update_query .= " WHERE id = " . $id . "";
        if(mysqli_query($this->CONN,$update_query)){
            $returnData = array(
                'return_data' => $id,
                'status' => true,
            );
            return $returnData;
        }else{
            echo mysqli_error($this->CONN());
            $returnData = array(
                'return_data' => "error",
                'status' => false,
            );
            return $returnData;
        }
    }
    private function mapData($keys, $values)
    {
        $array = array();
        for ($x = 0; $x < count($keys); $x++) {
            array_push($array,  '`'.$keys[$x].'`' .' = '. '"'.$values[$x].'"');
        }
        return $array;
    }
}
