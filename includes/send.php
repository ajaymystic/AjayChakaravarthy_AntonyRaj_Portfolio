<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    $db_host = 'localhost';
    $db_user = 'root';
    $db_pass = '';
    $db_name = 'ajay_portfolio';

    $connection = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
    $errors = array();

    // I'm checking the honeypot — bots fill this, real users never see it
    $honeypot = $_POST['website'] ?? '';
    if ($honeypot !== '') {
        echo json_encode(array("errors" => array("Bot detected.")));
        exit;
    }

    // I'm validating the bot math question — answer is 5
    $botCheck = $_POST['botCheck'] ?? '';
    if ($botCheck !== '5') {
        $errors[] = "Incorrect answer to the bot check question.";
    }

    $first_name = mysqli_real_escape_string($connection, $_POST['first_name'] ?? '');
    if ($first_name == NULL) {
        $errors[] = "First name field is empty.";
    }

    $last_name = mysqli_real_escape_string($connection, $_POST['last_name'] ?? '');
    if ($last_name == NULL) {
        $errors[] = "Last name field is empty.";
    }

    $email = $_POST['email'] ?? '';
    if ($email == NULL) {
        $errors[] = "Email field is empty.";
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "\"" . $email . "\" is not a valid email address.";
    }

    $social = mysqli_real_escape_string($connection, $_POST['social'] ?? '');

    $message = mysqli_real_escape_string($connection, $_POST['message'] ?? '');
    if ($message == NULL) {
        $errors[] = "Message field is empty.";
    }

    $errcount = count($errors);
    if ($errcount > 0) {
        $errmsg = array();
        for ($i = 0; $i < $errcount; $i++) {
            $errmsg[] = $errors[$i];
        }
        echo json_encode(array("errors" => $errmsg));
    } else {
        $querystring = "INSERT INTO contacts(first_name, last_name, email, social, message, created_at) VALUES('" . $first_name . "','" . $last_name . "','" . $email . "','" . $social . "','" . $message . "', NOW())";
        mysqli_query($connection, $querystring);
        echo json_encode(array("message" => "Thanks " . $first_name . "! Your message has been received. I'll get back to you within 24 hours."));
    }
?>