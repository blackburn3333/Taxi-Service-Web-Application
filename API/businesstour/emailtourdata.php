<?php
/**
 * * * User: Jayendra Matarage
 * Date: 6/25/2019 Time: 3:36 PM
 * Github : /blackburn3333
 */
define('PROJECT_ROOT_PATH', __DIR__);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../config/Database.php";
include_once "../objects/Business.php";
include_once '../public/General.php';

$genera = new General();
$database = new Database();
$db = $database->connect();
$business = new Business($db);


$data = json_decode(file_get_contents("php://input"));

if (!empty($data->ref_id)) {
    $statement = $business->confirm($data->ref_number);
    $rowCount = $statement->num_rows;
    if ($rowCount > 0) {
        while ($rowCount = $statement->fetch_assoc()) {
            extract($rowCount);
            $result = $genera->sendEmail("Test Subject","jayendramatarage@gmail.com","Jayendra","<h1>and easy to do anywhere, even with PHP</h1>");
            echo json_encode($result);
        }
    }else{}
}else{

}


/*$result = $genera->sendEmail("Test Subject","jayendramatarage@gmail.com","Jayendra","<h1>and easy to do anywhere, even with PHP</h1>");
echo json_encode($result);*/