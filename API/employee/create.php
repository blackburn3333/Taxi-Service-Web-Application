<?php
/**
 * * * User: Jayendra Matarage
 * Date: 6/26/2019 Time: 9:45 PM
 * Github : /blackburn3333
 */


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../config/Database.php";
include_once "../objects/Driver.php";
include_once "../public/General.php";

$database = new Database();
$db = $database->connect();

$driver = new Driver($db);
$general = new General();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->emp_name) &&
    !empty($data->emp_nic) ||
    !empty($data->emp_address) &&
    !empty($data->emp_contact) &&
    !empty($data->emp_bank) &&
    !empty($data->emp_bank_branch) &&
    !empty($data->emp_bank_acc) &&
    !empty($data->emp_dl_number) &&
    !empty($data->emp_password) &&
    !empty($data->emp_type) ||
    !empty($data->emp_profile) ||
    !empty($data->emp_email)

) {
    $tableData = array(
        'full_name' => mysqli_real_escape_string($database->connect(), $data->emp_name),
        'nic' => mysqli_real_escape_string($database->connect(), $data->emp_nic),
        'address' => mysqli_real_escape_string($database->connect(), $data->emp_address),
        'contact_number' => mysqli_real_escape_string($database->connect(), $data->emp_contact),
        'email' => mysqli_real_escape_string($database->connect(), $data->emp_email),
        'bank' => mysqli_real_escape_string($database->connect(), $data->emp_bank),
        'bank_branch' => mysqli_real_escape_string($database->connect(),$data->emp_bank_branch),
        'account_number' => mysqli_real_escape_string($database->connect(), $data->emp_bank_acc),
        'dl_no' => mysqli_real_escape_string($database->connect(), $data->emp_dl_number),
        'profile_image' => mysqli_real_escape_string($database->connect(), $data->emp_profile),
        'emp_type' => mysqli_real_escape_string($database->connect(), $data->emp_type),
        'password' => mysqli_real_escape_string($database->connect(), $general->slashPassword($data->emp_password)),
    );
    $result = $driver->create($tableData);
    if ($result['status']) {
        http_response_code(200);
        echo json_encode(array("message" => "Employee added", "last_id" => $result['return_data']));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Employee registration failed"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to register your Employee"));
}

