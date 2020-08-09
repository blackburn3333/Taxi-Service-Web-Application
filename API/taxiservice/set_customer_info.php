<?php
/**
 * * * User: Jayendra Matarage
 * Date: 6/26/2019 Time: 8:06 PM
 * Github : /blackburn3333
 */


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../config/Database.php";
include_once "../objects/QuickTour.php";
include_once "../public/General.php";

$database = new Database();
$db = $database->connect();

$quick_tour = new QuickTour($db);
$general = new General();

$data = json_decode(file_get_contents("php://input"));


if (!empty($data->cus_name) &&
    !empty($data->cus_contact) &&
    !empty($data->cus_email) &&
    !empty($data->address)

) {

    $tableData = array(
        'customer_name' => mysqli_real_escape_string($database->connect(), $data->cus_name),
        'customer_contact' => mysqli_real_escape_string($database->connect(), $data->cus_contact),
        'customer_email' => mysqli_real_escape_string($database->connect(), $data->cus_email),
        'client_location' => mysqli_real_escape_string($database->connect(), $data->address)
    );

    $result = $quick_tour->create($tableData);
    if ($result['status']) {
        http_response_code(200);
        echo json_encode(array("message" => "User contact data added", "last_id" => $result['return_data']));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "User contact data adding failed"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to place User contact"));
}
