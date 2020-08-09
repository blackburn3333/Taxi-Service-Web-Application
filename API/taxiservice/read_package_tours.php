<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once "../config/Database.php";
    include_once "../objects/Package.php";

    $database = new Database();
    $db = $database->connect();
    $package = new Package($db);

    $statement = $package->read();
    $rowCount = $statement->num_rows;

    if($rowCount>0){
        $packageArray = array();
        $packageArray["records"] = array();

        while($rowCount = $statement->fetch_assoc()){
            extract($rowCount);
            $package_items=array(
                "id" => $id,
                "customer_name" => $customer_name,
                "customer_contact" => $customer_contact,
                "customer_email" => $customer_email,
                "package_name" => $package_name,
                "selected_vehicle" => $selected_vehicle,
                "package_price" => $package_price,
                "pick_up_date" => $pick_up_date,
                "pick_up_time" => $pick_up_time,
                "confermation" => $confermation,
                "pack_done" => $pack_done,
                "client_location" => $client_location,
                "created" => $created
            );
            array_push($packageArray["records"],$package_items);
        }
        http_response_code(200);
        echo json_encode($packageArray);
    }else{
        http_response_code(404);
        echo json_encode(
            array("message" => "No Package found.")
        );
    }

?>