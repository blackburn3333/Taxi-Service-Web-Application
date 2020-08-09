<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../config/Database.php";
include_once "../objects/Driver.php";
include_once "../public/General.php";

$database = new Database();
$db = $database->connect();

$driver = new Driver($db);
$general = new General();

$data = json_decode(file_get_contents("php://input"));
if (!empty($data->user_name) && !empty($data->user_password)) {

    $result = $driver->get_user($data->user_name);
    $rowCount = $result->num_rows;
    if ($rowCount > 0) {
        if ($general->passwordVerify($result->fetch_assoc()['password'], $data->user_password)) {
            $token_array = array();
            $new_result = $driver->get_user($data->user_name);
            while ($row = $new_result->fetch_assoc()) {
                $status = $row['status'];
                $type = $row['emp_type'];
                $token_item = array(
                    "id" => $row['id'],
                    "full_name" => $row['full_name'],
                    "nic" => $row['nic'],
                    "status" => $row['status'],
                    "bank_branch" => $row['bank_branch'],
                    "emp_type" => $row['emp_type'],
                    "dl_no" => $row['dl_no'],
                    "role" => 'employee',
                    "type" => $row['emp_type'],
                    "exp" => time() + (60 * 180),
                    "iat" => time(),
                );
                $token_array = $token_item;
            }
            $jwtdata = $general->generateJWT($token_array);
            http_response_code(200);
            echo json_encode(array("message" => "Login Successful", "token" => $jwtdata, "available" => $status, "type" => $type, "status" => true));
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Incorrect password", "status" => false));
        }
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "Incorrect NIC number", "status" => false));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to login"));
}
