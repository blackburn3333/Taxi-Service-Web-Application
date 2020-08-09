<?php
/**
 * * * User: Jayendra Matarage
 * Date: 6/23/2019 Time: 11:54 AM
 * Github : /blackburn3333
 */

define('PROJECT_ROOT_PATH', __DIR__);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../config/Database.php";
include_once "../objects/Business.php";
include_once "../public/General.php";

$database = new Database();
$db = $database->connect();
$business = new Business($db);
$genera = new General();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->token)) {
    $token_data = $genera->read_jwt($data->token);
    echo json_encode(array("message" => $token_data, "status" => true));
} else {
    http_response_code(400);
    echo json_encode(array("message" => "token not passed", "status" => false));

}
