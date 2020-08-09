<?php
/**
 * * * User: Jayendra Matarage
 * Date: 6/18/2019 Time: 1:22 AM
 * Github : /blackburn3333
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../config/Database.php";
include_once "../objects/Business.php";
include_once "../public/General.php";

$database = new Database();
$db = $database->connect();

$business = new Business($db);
$general = new General();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->bus_name) &&
    !empty($data->bus_branch) ||
    !empty($data->bus_email) &&
    !empty($data->bus_contact) &&
    !empty($data->bus_res_per_name) &&
    !empty($data->bus_res_per_contact) &&
    !empty($data->bus_password)

) {
    $conf_code = $general->generateOTP(6);
    $tableData = array(
        'business_name' => mysqli_real_escape_string($database->connect(), $data->bus_name),
        'branch_name' => mysqli_real_escape_string($database->connect(), $data->bus_branch),
        'business_contact_number' => mysqli_real_escape_string($database->connect(), $data->bus_contact),
        'business_email_address' => mysqli_real_escape_string($database->connect(), $data->bus_email),
        'responsible_persons_name' => mysqli_real_escape_string($database->connect(),$data->bus_res_per_name),
        'responsible_persons_contact_number' => mysqli_real_escape_string($database->connect(), $data->bus_res_per_contact),
        'password' => mysqli_real_escape_string($database->connect(), $general->slashPassword($data->bus_password)),
        'conformation_code' => mysqli_real_escape_string($database->connect(), $conf_code)
    );
    $result = $business->create($tableData);
    if ($result['status']) {
        http_response_code(200);
        echo json_encode(array("message" => "Your business has been registered", "last_id" => $result['return_data']));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Business registration failed"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to register your business"));
}

