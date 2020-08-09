<?php
/**
 * * * User: Jayendra Matarage
 * Date: 7/16/2019 Time: 8:31 PM
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
    !empty($data->package_name) &&
    !empty($data->cus_email) &&
    !empty($data->cus_selected_vehicle) &&
    !empty($data->cus_price) &&
    !empty($data->cus_pick_up_date) &&
    !empty($data->cus_pick_up_time)
) {

    $tableData = array(
        'customer_name' => mysqli_real_escape_string($database->connect(), $data->cus_name),
        'customer_contact' => mysqli_real_escape_string($database->connect(), $data->cus_contact),
        'customer_email' => mysqli_real_escape_string($database->connect(), $data->cus_email),

        'package_name' => mysqli_real_escape_string($database->connect(), $data->package_name),
        'selected_vehicle' => mysqli_real_escape_string($database->connect(), $data->cus_selected_vehicle),
        'package_price' => mysqli_real_escape_string($database->connect(), $data->cus_price),
        'pick_up_date' => mysqli_real_escape_string($database->connect(), $data->cus_pick_up_date),
        'pick_up_time' => mysqli_real_escape_string($database->connect(), $data->cus_pick_up_time),
    );

    $result = $quick_tour->create_package($tableData);
    if ($result['status']) {
        http_response_code(200);
        echo json_encode(array("message" => "Your package booking has been placed, our company customer care contact you for confirmation", "last_id" => $result['return_data']));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Booking failed"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to place your booking"));
}
