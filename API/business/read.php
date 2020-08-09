<?php
/**
 * * * User: Jayendra Matarage
 * Date: 6/17/2019 Time: 1:52 AM
 * Github : /blackburn3333
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/Database.php";
include_once "../objects/Business.php";

$database = new Database();
$db = $database->connect();
$business = new Business($db);

$statement = $business->read();
$rowCount = $statement->num_rows;

if ($rowCount > 0) {
    $businessArray = array();
    $businessArray["records"] = array();

    while ($rowCount = $statement->fetch_assoc()) {
        extract($rowCount);

        $business_items = array(
            "id"=>$id,
            "business_name" => $business_name,
            "branch_name" => $branch_name,
            "business_contact_number" => $business_contact_number,
            "business_email_address" => $business_email_address,
            "responsible_persons_name" => $responsible_persons_name,
            "responsible_persons_contact_number" => $responsible_persons_contact_number,
            "password" => $password,
            "conformation_code" => $conformation_code,
            "main_conformation" => $main_conformation,
            "created" => $created
        );
        array_push($businessArray["records"], $business_items);
    }
    http_response_code(200);
    echo json_encode($businessArray);
} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "No business profiles found.")
    );
}