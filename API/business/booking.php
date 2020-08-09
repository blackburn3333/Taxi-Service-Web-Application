<?php
/**
 * * * User: Jayendra Matarage
 * Date: 6/25/2019 Time: 11:43 AM
 * Github : /blackburn3333
 */

define('PROJECT_ROOT_PATH', __DIR__);

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
$general = new General();

$business = new Business($db);

$data = json_decode(file_get_contents("php://input"));


if (!empty($data->from_loc) &&
    !empty($data->to_loc) ||
    !empty($data->pick_up_date) &&
    !empty($data->pick_up_time) &&
    !empty($data->distance_value) &&
    !empty($data->distance_text) &&
    !empty($data->duration_value) &&
    !empty($data->duration_text) &&
    !empty($data->trip_type) &&
    !empty($data->sel_vehi) &&
    !empty($data->sel_vehi_price) &&
    !empty($data->res_full_name) &&
    !empty($data->res_cont_number) &&
    !empty($data->group_members_count) &&
    !empty($data->cont_number) &&
    !empty($data->token) ||
    !empty($data->spe_note)
) {

    if (!empty($data->token)) {
        $tokenData = $general->read_jwt($data->token);
        $number_token = str_replace('"', "", json_encode($tokenData->data->res_cont));
        if (strval($number_token) == strval($data->cont_number)) {

            $booking_data = array(
                'business_id' => mysqli_real_escape_string($database->connect(), str_replace('"', "", json_encode($tokenData->data->id))),
                'fromLocation' => mysqli_real_escape_string($database->connect(), $data->from_loc),
                'toLocation' => mysqli_real_escape_string($database->connect(), $data->to_loc),
                'selected_vehicle' => mysqli_real_escape_string($database->connect(), $data->sel_vehi),
                'price_vehicle' => mysqli_real_escape_string($database->connect(), $data->sel_vehi_price),
                'pick_up_date' => mysqli_real_escape_string($database->connect(), $data->pick_up_date),
                'pick_up_time' => mysqli_real_escape_string($database->connect(), $data->pick_up_time),
                'distance' => mysqli_real_escape_string($database->connect(), $data->distance_text),
                'distance_value' => mysqli_real_escape_string($database->connect(), $data->distance_value),
                'durations' => mysqli_real_escape_string($database->connect(), $data->duration_text),
                'durations_value' => mysqli_real_escape_string($database->connect(), $data->duration_value),
                'trip_way' => mysqli_real_escape_string($database->connect(), $data->trip_type),
                'special note' => mysqli_real_escape_string($database->connect(), $data->spe_note),
                'team_lead' => mysqli_real_escape_string($database->connect(), $data->res_full_name),
                'team_lead_contact' => mysqli_real_escape_string($database->connect(), $data->res_cont_number),
                'travel_count' => mysqli_real_escape_string($database->connect(), $data->group_members_count),
            );
            $result = $business->book($booking_data);
            if ($result['status']) {
                http_response_code(200);
                echo json_encode(array("message" => "Your booking has been placed", "last_id" => $result['return_data'], "status" => false));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to place your booking", "status" => false));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Authentication Error", "status" => false));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to place your booking", "status" => false));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to place your booking", "status" => false));
}