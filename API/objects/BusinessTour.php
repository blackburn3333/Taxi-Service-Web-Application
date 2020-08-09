<?php

/**
 * * * User: Jayendra Matarage
 * Date: 6/25/2019 Time: 2:40 PM
 * Github : /blackburn3333
 */
class BusinessTour
{

    private $CONN;
    private $TABLE_NAME = "businessTours";
    public $id;
    public $fromLocation;
    public $toLocation;
    public $selected_vehicle;
    public $price_vehicle;
    public $pick_up_date;
    public $pick_up_time;
    public $distance;
    public $distance_value;
    public $durations;
    public $durations_value;
    public $trip_way;
    public $special_note;
    public $team_lead;
    public $team_lead_contact;
    public $travel_count;
    public $job_done;
    public $business_id;
    public $created;

    public function __construct($database)
    {
        $this->CONN = $database;
    }

    public function read()
    {
        $query = "SELECT *,businessProfile.id as bus_id,businessProfile.business_name as bus_name,businessProfile.branch_name as bus_branch,businessProfile.business_contact_number as bus_cont,businessProfile.responsible_persons_name as bus_bus_res_name,businessProfile.responsible_persons_contact_number as res_cont FROM businessTours INNER JOIN businessProfile ON businessTours.business_id = businessProfile.id";
        $stmt = $this->CONN->query($query);
        return $stmt;
    }

    public function read_spec($ref){
        $query = "SELECT * FROM businessTours WHERE business_id='$ref'";
        $stmt = $this->CONN->query($query);
        return $stmt;
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

    public function update_tour_job($driver_id,$tour_id){
        $update_query = "UPDATE businessTours SET job_done = '$driver_id'  WHERE id = '$tour_id'";
        if (mysqli_query($this->CONN, $update_query)) {
            return true;
        } else {
            return false;
            //echo mysqli_error($this->connect());
        }
    }
}