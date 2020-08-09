<?php
/**
 * * * User: Jayendra Matarage
 * Date: 6/20/2019 Time: 7:35 PM
 * Github : /blackburn3333
 */
include_once "../config/Database.php";
include_once "../objects/Business.php";
include_once "../public/General.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$database = new Database();
$db = $database->connect();
$business = new Business($db);
$genera = new General();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->user_name) && !empty($data->user_password)) {

    $result = $business->get_user($data->user_name);
    $rowCount = $result->num_rows;
    if ($rowCount > 0) {
        if ($genera->passwordVerify($result->fetch_assoc()['password'], $data->user_password)) {
            $token_array = array();
            $new_result = $business->get_user($data->user_name);
            while ($row = $new_result->fetch_assoc()) {
                $token_item = array(
                    "id" => $row['id'],
                    "business_name" => $row['business_name'],
                    "business_res_name" => $row['responsible_persons_name'],
                    "business_res_cont" => $row['responsible_persons_contact_number'],
                    "branch_name" => $row['branch_name'],
                    "role" => "business",
                    "exp" => time() + (60 * 180),
                    "iat" => time(),
                );
                $token_array = $token_item;
            }
            $jwtdata = $genera->generateJWT($token_array);
            http_response_code(200);
            echo json_encode(array("message" => "Login Successful", "token" => $jwtdata, "status" => true));
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Incorrect password", "status" => false));
        }
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "Incorrect responsible person's mobile number", "status" => false));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to login"));
}
