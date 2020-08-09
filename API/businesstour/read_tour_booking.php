<?php
/**
 * * * User: Jayendra Matarage
 * Date: 6/25/2019 Time: 2:38 PM
 * Github : /blackburn3333
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/Database.php";
include_once "../objects/BusinessTour.php";

$database = new Database();
$db = $database->connect();
$businessTour = new BusinessTour($db);


$statement = $businessTour->read();
$rowCount = $statement->num_rows;

if ($rowCount > 0) {
    $businessArray = array();
    $businessArray["records"] = array();

    while ($rowCount = $statement->fetch_assoc()) {
        extract($rowCount);

        $business_items = array(
            "id" => $id,
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
            "special_note" => $special_note,
            "team_lead" => $team_lead,
            "team_lead_contact" => $team_lead_contact,
            "travel_count" => $travel_count,
            "job_done" => $job_done,
            "business_id" => $business_id,
            "vehi_conf" => $vehi_conf,
            "bus_id" => $bus_id,
            "bus_name" => $bus_name,
            "bus_branch" => $bus_branch,
            "bus_cont" => $bus_cont,
            "bus_bus_res_name" => $bus_bus_res_name,
            "res_cont" => $res_cont
        );
        array_push($businessArray["records"], $business_items);
    }
    http_response_code(200);
    echo json_encode($businessArray);
} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "No business tours found.")
    );
}