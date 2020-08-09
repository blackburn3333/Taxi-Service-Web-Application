<?php
/**
 * * * User: Jayendra Matarage
 * Date: 6/26/2019 Time: 7:08 PM
 * Github : /blackburn3333
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->user_name) && !empty($data->user_password)) {

    /*$result = $business->get_user($data->user_name);
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
            $jwtdata = $genera->generateJWT($token_array);*/
    if ($data->user_name == "admin" && $data->user_password == "admin") {
        http_response_code(200);
        echo json_encode(array("message" => "Login Successful",/* "token" => $jwtdata, */"status" => true));
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "Invalid username or password", /*"token" => $jwtdata,*/ "status" => false));
    }


} else {
    http_response_code(404);
    echo json_encode(array("message" => "Incorrect password", "status" => false));

}
/*else {
    http_response_code(404);
    echo json_encode(array("message" => "Incorrect responsible person's mobile number", "status" => false));

} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to login"));
}*/
