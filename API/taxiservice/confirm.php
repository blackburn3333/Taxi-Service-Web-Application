<?php
define('PROJECT_ROOT_PATH', __DIR__);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../config/Database.php";
include_once "../objects/QuickTour.php";

$database = new Database();
$db = $database->connect();

$quick_tour = new QuickTour($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->ref_number) && !empty($data->conf_number)) {
    $statement = $quick_tour->confirm($data->ref_number);
    $rowCount = $statement->num_rows;

    if ($rowCount > 0) {
        while ($rowCount = $statement->fetch_assoc()) {
            extract($rowCount);
            if ($data->conf_number == $conformation_code) {
                $updateData = $quick_tour->confirm_update($data->ref_number, "1");
                if ($updateData) {
                    http_response_code(200);
                    echo json_encode(array("message" => "Your booking has been placed!", "status" => true));
                } else {
                    http_response_code(503);
                    echo json_encode(array("message" => "Your confirmation code is wrong or critical error, contact our customer care tell your reference number", "status" => false));
                }
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Your confirmation code is wrong or critical error, contact our customer care tell your reference number", "status" => false));
            }
        }
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "Your confirmation code is wrong or critical error, contact our customer care tell your reference number", "status" => false));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Your confirmation code is wrong or critical error, contact our customer care tell your reference number", "status" => false));
}
