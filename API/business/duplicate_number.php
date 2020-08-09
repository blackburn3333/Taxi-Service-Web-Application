<?php
/**
 * * * User: Jayendra Matarage
 * Date: 6/22/2019 Time: 9:10 PM
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

$database = new Database();
$db = $database->connect();

$business = new Business($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->cont_number_resp)) {
    $statement = $business->get_mobile_number($data->cont_number_resp);
    $rowCount = $statement->num_rows;
    if($rowCount > 0){
        http_response_code(200);
        echo json_encode(array("status" => true));
    }else{
        http_response_code(400);
        echo json_encode(array("status" => false));
    }
} else {
    http_response_code(400);
    echo json_encode(array("status" => false));

}
