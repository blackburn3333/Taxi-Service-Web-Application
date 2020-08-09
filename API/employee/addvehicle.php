<?php
/**
 * * * User: Jayendra Matarage
 * Date: 6/25/2019 Time: 2:39 PM
 * Github : /blackburn3333
 */

define('PROJECT_ROOT_PATH', __DIR__);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../config/Database.php";
include_once "../objects/Vehicle.php";
include_once "../public/General.php";

$database = new Database();
$db = $database->connect();
$general = new General();

$vehicle = new Vehicle($db);

$data = json_decode(file_get_contents("php://input"));


if (
    !empty($data->username) &&

    !empty($data->vehicle_brand) &&
    !empty($data->vehicle_name) &&
    !empty($data->registered_number) &&
    !empty($data->chasi_number) &&
    !empty($data->engine_number) &&
    !empty($data->registered_year) &&
    !empty($data->type) ||
    !empty($data->employee_id) ||
    !empty($data->manufac_year) ||
    !empty($data->main_image) ||
    !empty($data->token) ||
    !empty($data->sub_image_one) ||
    !empty($data->sub_image_two) ||
    !empty($data->sub_image_three) ||
    !empty($data->sub_image_four)
) {
    $owner_id = "";
    if ($data->username === "0") {
        if (!empty($data->token)) {
            $tokenData = $general->read_jwt($data->token);
            $number_token = str_replace('"', "", json_encode($tokenData->data->id));

            if (strval($number_token) == strval($data->employee_id)) {
                $owner_id = str_replace('"', "", json_encode($tokenData->data->id));
            } else {
                http_response_code(400);
                echo json_encode(array("message" => "Authentication Error", "status" => false));
            }
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Authentication Error", "status" => false));
        }
    } else {
        $owner_id = $data->employee_id;
    }

    $vehicle_data = array(
        'owner_id' => mysqli_real_escape_string($database->connect(), $owner_id),
        'vehicle_brand' => mysqli_real_escape_string($database->connect(), $data->vehicle_brand),
        'vehicle_name' => mysqli_real_escape_string($database->connect(), $data->vehicle_name),
        'reg_number' => mysqli_real_escape_string($database->connect(), $data->registered_number),
        'chasi_number' => mysqli_real_escape_string($database->connect(), $data->chasi_number),
        'eng_number' => mysqli_real_escape_string($database->connect(), $data->engine_number),
        'reg_year' => mysqli_real_escape_string($database->connect(), $data->registered_year),
        'manufac_year' => mysqli_real_escape_string($database->connect(), $data->manufac_year),
        'main_image' => mysqli_real_escape_string($database->connect(), $data->main_image),
        'sub_image_one' => mysqli_real_escape_string($database->connect(), $data->sub_image_one),
        'sub_image_two' => mysqli_real_escape_string($database->connect(), $data->sub_image_two),
        'sub_image_three' => mysqli_real_escape_string($database->connect(), $data->sub_image_three),
        'sub_image_four' => mysqli_real_escape_string($database->connect(), $data->sub_image_four),
        'type' => mysqli_real_escape_string($database->connect(), $data->type)
    );
    $result = $vehicle->create($vehicle_data);
    if ($result['status']) {
        http_response_code(200);
        echo json_encode(array("message" => "Your Vehicle has been added", "last_id" => $result['return_data'], "status" => true));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to add your vehicle", "status" => false));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to add your vehicle", "status" => false));
}


