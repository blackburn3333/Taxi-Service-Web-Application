<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/Database.php";
include_once "../objects/Customer.php";

$database = new Database();
$db = $database->connect();
$customer = new Customer($db);

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->CUST_mobile)){
    $statment = $customer->read($data->CUST_mobile);
    $rowcount = $statment->num_rows;

if($rowcount>0){
    $customerArray = array();
    $customerArray["records"] = array();

    while($rowcount=$statment->fetch_assoc()){
            extract($rowcount);

            $customer_info = array(
                "id"=>$id,
                "customer_name"=> $customer_name,
                "customer_contact"=> $customer_contact,
                "customer_email"=>$customer_email,
                "fromLocation"=>$fromLocation,
                "toLocation" => $toLocation,
                "selected_vehicle" => $selected_vehicle,
                "price_vehicle" => $price_vehicle,
                "pick_up_date"=>$pick_up_date,
                "pick_up_time"=>$pick_up_time,
                "distance"=>$distance,
                "distance_value"=>$distance_value,
                "durations"=>$durations,
                "durations_value"=>$durations_value,
                "trip_way"=>$trip_way,
                "conformation_code"=>$conformation_code,
                "job_done"=>$job_done,
                "vehi_confirm"=>$vehi_confirm,
                "client_location"=>$client_location,
                "created"=>$created
            );
            array_push($customerArray["records"],$customer_info);
    }
    http_response_code(200);
    echo json_encode($customerArray);

}else{
    http_response_code(404);
    echo json_encode(
        array("message" => "No Custommer found.")
    );
}
}else{
    http_response_code(404);
    echo json_encode(
        array("message" => "No Custommer found 2.")
    );
}

?>