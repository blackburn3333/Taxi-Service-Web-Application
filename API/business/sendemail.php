<?php
/**
 * * * User: Jayendra Matarage
 * Date: 6/25/2019 Time: 5:47 PM
 * Github : /blackburn3333
 */

define('PROJECT_ROOT_PATH', __DIR__);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../public/General.php';
$genera = new General();

include_once "../config/Database.php";
include_once "../objects/Business.php";
include_once '../public/General.php';

$genera = new General();
$database = new Database();
$db = $database->connect();
$business = new Business($db);


$data = json_decode(file_get_contents("php://input"));

if (!empty($data->ref_id)) {
    $statement = $business->confirm($data->ref_id);
    $rowCount = $statement->num_rows;
    if ($rowCount > 0) {
        while ($rowCount = $statement->fetch_assoc()) {
            extract($rowCount);
            $otp = $conformation_code;
            $content = $genera->generateBusinessRegEmail($otp, $business_name);
            echo $otp . " " .$content;
            $result = $genera->sendEmail("Business Registration", $business_email_address, $business_name, $content);
            echo json_encode($result);
        }
    } else {
    }
} else {

}