<?php

class Vehicle
{

    private $CONN;
    private $TABLE_NAME = "vehicle_of_driver";
    public $id;
    public $owner_id;
    public $reg_number;
    public $chasi_number;
    public $eng_number;
    public $reg_year;
    public $manufac_year;
    public $main_image;
    public $sub_image_one;
    public $sub_image_two;
    public $sub_image_three;
    public $sub_image_four;
    public $type;
    public $created;

    public function __construct($database)
    {
        $this->CONN = $database;
    }

    public function read()
    {
        $query = "SELECT * FROM " . $this->TABLE_NAME;
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
