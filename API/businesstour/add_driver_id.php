<?php
/**
 * * * User: Jayendra Matarage
 * Date: 6/26/2019 Time: 12:57 AM
 * Github : /blackburn3333
 */


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/Database.php";
include_once "../objects/BusinessTour.php";
include_once "../public/General.php";

$database = new Database();
$db = $database->connect();
$businessTour = new BusinessTour($db);
$general = new General();

$data = json_decode(file_get_contents("php://input"));


if (!empty($data->driver_id && !empty($data->tour_id))) {
    $result = $businessTour->update_tour_job($data->driver_id,$data->tour_id);
    if($result){
        http_response_code(200);
        echo json_encode(array("message" => "driver id set", "status" => true));
    }else{
        http_response_code(503);
        echo json_encode(array("message" => "Error when set driver id", "status" => false));
    }
}else{
    http_response_code(400);
    echo json_encode(array("message" => "Unable to set driver id", "status" => false));
}