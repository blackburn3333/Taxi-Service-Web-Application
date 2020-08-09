<?php
require '../vendor/sendgrid-php/sendgrid-php.php';
include_once "../vendor/autoload.php";
use \Firebase\JWT\JWT;

/**
 * * * User: Jayendra Matarage
 * Date: 6/18/2019 Time: 1:28 AM
 * Github : /blackburn3333
 */
class General
{
    public function generateOTP($n)
    {
        //abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
        $generator = "0123456789";
        $result = "";
        for ($i = 1; $i <= $n; $i++) {
            $result .= substr($generator, (rand() % (strlen($generator))), 1);
        }
        return $result;
    }

    public function slashPassword($password)
    {
        $option = [
            'cost' => 12,
        ];
        return password_hash($password, PASSWORD_ARGON2I);
    }

    public function passwordVerify($password, $ent_password)
    {
        if (password_verify($ent_password, $password)) {
            return true;
        } else {
            return false;
        }
    }

    public function generateJWT($data)
    {
        switch ($data['role']) {
            case 'business':
                $token = array(
                    "iss" => "Cab service",
                    "aud" => "Jays Code works",
                    "iat" => $data['iat'],
                    "exp" => $data['exp'],
                    "data" => array(
                        "id" => $data['id'],
                        "business" => $data['business_name'],
                        "res_name" => $data['business_res_name'],
                        "res_cont" => $data['business_res_cont'],
                        "branch" => $data['branch_name'],
                        "role" => $data['role'],
                    ),
                );
                break;
            case 'employee':
                $token = array(
                    "iss" => "Cab service",
                    "aud" => "Jays Code works",
                    "iat" => $data['iat'],
                    "exp" => $data['exp'],
                    "data" => array(
                        "id" => $data['id'],
                        "employee_name" => $data['full_name'],
                        "employee_nic" => $data['nic'],
                        "employee_status" => $data['status'],
                        "branch" => $data['bank_branch'],
                        "dl_no" => $data['dl_no'],
                        "role" => $data['role'],
                        "type" => $data['type'],
                    ),
                );
                break;
            default:
                break;

        }
        $jwt = JWT::encode($token, "STILL_SECRET");
        return $jwt;
    }

    public function read_jwt($token)
    {

        try {
            $decode = JWT::decode($token, "STILL_SECRET", array('HS256'));
            return $decode;
        } catch (Exception $e) {
            // set response code
            http_response_code(401);
            // tell the user access denied  & show error message
            echo json_encode(array(
                "message" => "Access denied.",
                "error" => $e->getMessage(),
            ));
        }
    }

    public function sendEmail($subject, $to, $to_name, $content)
    {
        $email = new \SendGrid\Mail\Mail();
        $email->setFrom("email here@heroku.com", "Title here");
        $email->setSubject($subject);
        $email->addTo($to, $to_name);
        $email->addContent("text/html", $content);
        $sendgrid = new \SendGrid("Send Grid api key");
        try {
            $response = $sendgrid->send($email);
            /*print $response->statusCode() . "\n";
            print_r($response->headers());
            print $response->body() . "\n";*/
            return $response->statusCode();
        } catch (Exception $e) {
            /*print $e->getMessage();*/
            return $e->getMessage();
        }
    }

    public function generateBusinessRegEmail($key, $businessName)
    {
        $content = "<h2>Thank you for registering your " . $businessName . " with our Cab service</h2><hr/>";
        $content .= "</hr>";
        $content .= "<h3 align='center'>Following is your confirmation key</h3><br/>";
        $content .= "<h1 align='center'>$key</h1>";
        return $content;
    }

    public function generateRegEmail($key)
    {
        $content = "<h2>Thank you for join with our  Cab service</h2><hr/>";
        $content .= "</hr>";
        $content .= "<h3 align='center'>Following is your confirmation key</h3><br/>";
        $content .= "<h1 align='center'>$key</h1>";
        return $content;
    }
}
