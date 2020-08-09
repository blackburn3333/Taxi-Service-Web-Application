<?php


/**
 * * * User: Jayendra Matarage
 * Date: 6/3/2019 Time: 3:34 AM
 * Github : /blackburn3333
 */
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/Database.php";
include_once "../objects/QuickTour.php";

$database = new Database();
$db = $database->connect();

$quick_tour = new QuickTour($db);

$statement = $quick_tour->read();
$rowCount = $statement->num_rows;

if ($rowCount > 0) {
    $taxiArray = array();
    $taxiArray["records"] = array();

    while ($rowCount = $statement->fetch_assoc()) {
        extract($rowCount);

        $taxi_items = array(
            "id"=>$id,
            "customer_name" => $customer_name,
            "customer_contact" => $customer_contact,
            "customer_email" => $customer_email,
            "fromLocation" => $fromLocation,
            "toLocation" => $toLocation,
            "selected_vehicle" => $selected_vehicle,
            "price_vehicle" => $price_vehicle,
            "pick_up_date" => $pick_up_date,
            "pick_up_time" => $pick_up_time,
            "distance" => $distance,
            "distance_value" => $distance_value,
            "durations" => $durations,
            "durations_value" => $durations_value,
            "trip_way" => $trip_way,
            "conformation_code" => $conformation_code,
            "created" => $created,
            "job_done" =>$job_done,
            "vehi_confirm" => $vehi_confirm,
            "client_location" => $client_location
        );
        array_push($taxiArray["records"], $taxi_items);
    }
    http_response_code(200);
    echo json_encode($taxiArray);
} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "No taxis found.")
    );
}
