<?php
/**
 * * * User: Jayendra Matarage
 * Date: 6/3/2019 Time: 6:47 PM
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
    !empty($data->cus_fromLocation) &&
    !empty($data->cus_toLocation) &&
    !empty($data->cus_selected_vehicle) &&
    !empty($data->cus_price_vehicle) &&
    !empty($data->cus_pick_up_date) &&
    !empty($data->cus_pick_up_time) &&
    !empty($data->cus_distance) &&
    !empty($data->cus_durations) &&
    !empty($data->cus_distance_value) &&
    !empty($data->cus_durations_value) &&
    !empty($data->cus_trip_way)

) {
    $otp = $general->generateOTP(6);
    $tableData = array(
        'customer_name' => mysqli_real_escape_string($database->connect(), $data->cus_name),
        'customer_contact' => mysqli_real_escape_string($database->connect(), $data->cus_contact),
        'customer_email' => mysqli_real_escape_string($database->connect(), $data->cus_email),
        'fromLocation' => mysqli_real_escape_string($database->connect(), $data->cus_fromLocation),
        'toLocation' => mysqli_real_escape_string($database->connect(), $data->cus_toLocation),
        'selected_vehicle' => mysqli_real_escape_string($database->connect(), $data->cus_selected_vehicle),
        'price_vehicle' => mysqli_real_escape_string($database->connect(), $data->cus_price_vehicle),
        'pick_up_date' => mysqli_real_escape_string($database->connect(), $data->cus_pick_up_date),
        'pick_up_time' => mysqli_real_escape_string($database->connect(), $data->cus_pick_up_time),
        'distance' => mysqli_real_escape_string($database->connect(), $data->cus_distance),
        'durations' => mysqli_real_escape_string($database->connect(), $data->cus_durations),
        'durations_value' => mysqli_real_escape_string($database->connect(), $data->cus_durations_value),
        'distance_value' => mysqli_real_escape_string($database->connect(), $data->cus_distance_value),
        'trip_way' => mysqli_real_escape_string($database->connect(), $data->cus_trip_way),
        'conformation_code' => mysqli_real_escape_string($database->connect(), $otp),
    );

    $result = $quick_tour->create($tableData);
    if ($result['status']) {
        $template = $general->generateRegEmail($otp);
        $general->sendEmail("Booking Confirmation", $data->cus_email, $data->cus_name, $template);
        http_response_code(200);
        echo json_encode(array("message" => "Your taxi has been booked", "last_id" => $result['return_data']));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Booking failed"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to place your booking"));
}
