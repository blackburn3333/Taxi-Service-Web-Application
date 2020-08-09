<?php

/**
 * * * User: Jayendra Matarage
 * Date: 6/26/2019 Time: 9:39 PM
 * Github : /blackburn3333
 */
class Driver
{

    private $CONN;
    private $TABLE_NAME = "vehicles_employee";
    public $id;
    public $full_name;
    public $nic;
    public $address;
    public $contact_number;
    public $email;
    public $bank;
    public $bank_branch;
    public $account_number;
    public $dl_no;
    public $emp_type;
    public $profile_image;
    public $created;

    public function __construct($database)
    {
        $this->CONN = $database;
    }

    public function read()
    {
        $query = "SELECT *, vehicles_employee.id as emp_id, (SELECT COUNT(*) FROM vehicle_of_driver where owner_id = emp_id ) as vs_count FROM vehicles_employee;";
        $stmt = $this->CONN->query($query);
        //$stmt->execute();
        return $stmt;
    }

    public function search_employee($id)
    {
        $query = "SELECT *, vehicles_employee.id as emp_id, (SELECT COUNT(*) FROM vehicle_of_driver where owner_id = emp_id ) as vs_count FROM vehicles_employee WHERE nic = '$id';";
        $stmt = $this->CONN->query($query);
        //$stmt->execute();
        return $stmt;
    }

    public function read_all_details()
    {
        $query = "select vehicles_employee.id as emp_id, vehicles_employee.*,vehicle_of_driver.id as v_id, vehicle_of_driver.* from `vehicles_employee` left join `vehicle_of_driver` on vehicles_employee.id = vehicle_of_driver.owner_id;";
        $stmt = $this->CONN->query($query);
        //$stmt->execute();
        return $stmt;
    }

    public function get_user($res_contact)
    {
        $query = "SELECT * FROM vehicles_employee WHERE nic = '$res_contact' LIMIT 1";
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
            echo mysqli_error($this->CONN);
            $returnData = array(
                'return_data' => "error",
                'status' => false,
            );
            return $returnData;
        }
    }

}
