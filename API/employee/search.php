<?php
/**
 * * * User: Jayendra Matarage
 * Date: 7/13/2019 Time: 10:30 AM
 * Github : /blackburn3333
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/Database.php";
include_once "../objects/Driver.php";

$database = new Database();
$db = $database->connect();
$driver = new Driver($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->emp_number)) {

    $statement = $driver->search_employee($data->emp_number);
    $rowCount = $statement->num_rows;

    if ($rowCount > 0) {
        $driverArray = array();
        $driverArray["records"] = array();

        while ($rowCount = $statement->fetch_assoc()) {
            extract($rowCount);

            $driver_items = array(
                "emp_id" => $id,
                "full_name" => $full_name,
                "nic" => $nic,
                "address" => $address,
                "contact_number" => $contact_number,
                "email" => $email,
                "bank" => $bank,
                "bank_branch" => $bank_branch,
                "account_number" => $account_number,
                "dl_no" => $dl_no,
                "emp_type" => $emp_type,
                "profile_image" => $profile_image,
                "status" => $status,
                "created" => $created,
                "vs_count" => $vs_count,
            );
            array_push($driverArray["records"], $driver_items);
        }
        http_response_code(200);
        echo json_encode($driverArray);
    } else {
        http_response_code(404);
        echo json_encode(
            array("message" => "No drivers found.")
        );
    }

} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "No drivers found.")
    );
}
