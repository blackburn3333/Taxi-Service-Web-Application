<?php

/**
 * * * User: Jayendra Matarage
 * Date: 6/17/2019 Time: 1:51 AM
 * Github : /blackburn3333
 */
class Business
{

    private $CONN;
    private $TABLE_NAME = "businessProfile";
    public $id;
    public $business_name;
    public $branch_name;
    public $business_contact_number;
    public $business_email_address;
    public $responsible_persons_name;
    public $responsible_persons_contact_number;
    public $password;
    public $conformation_codee;
    public $main_conformation;
    public $created;

    public function __construct($database)
    {
        $this->CONN = $database;
    }

    public function read()
    {
        $query = "SELECT * FROM businessProfile";
        $stmt = $this->CONN->query($query);
        return $stmt;
    }

    public function get_user($res_contact){
        $query = "SELECT * FROM businessProfile WHERE conformation_code  = '1' AND responsible_persons_contact_number = '$res_contact' LIMIT 1";
        $stmt = $this->CONN->query($query);
        return $stmt;
    }

    public function confirm($ref_id)
    {
        $query = "SELECT * FROM businessProfile WHERE id = '$ref_id' LIMIT 1";
        $stmt = $this->CONN->query($query);
        return $stmt;
    }


    public function get_mobile_number($number){
        $query = "SELECT * FROM businessProfile WHERE responsible_persons_contact_number = '$number'";
        $stmt = $this->CONN->query($query);
        return $stmt;
    }

    public function confirm_update($id)
    {
        $update_query = "UPDATE businessProfile SET conformation_code = '1'  WHERE id = '$id'";
        if (mysqli_query($this->CONN, $update_query)) {
            return true;
        } else {
            return false;
            //echo mysqli_error($this->connect());
        }
    }

    public function main_confirm_update($id)
    {
        $update_query = "UPDATE businessProfile SET main_conformation = '1'  WHERE id = '$id'";
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



}
