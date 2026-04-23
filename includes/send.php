<?php
header("Content-Type: application/json; charset=UTF-8");

use Portfolio\Database;

spl_autoload_register(function ($class) {
    $class    = str_replace('Portfolio\\', '', $class);
    $class    = str_replace("\\", DIRECTORY_SEPARATOR, $class);
    $filepath = __DIR__ . '/classes/' . $class . '.php';
    $filepath = str_replace("/", DIRECTORY_SEPARATOR, $filepath);
    require_once $filepath;
});

$errors = [];

// Honeypot — bots fill this hidden field, real users never see it
$honeypot = $_POST['website'] ?? '';
if ($honeypot !== '') {
    echo json_encode(['errors' => ['Bot detected.']]);
    exit;
}

$first_name = trim($_POST['first_name'] ?? '');
$last_name  = trim($_POST['last_name']  ?? '');
$email      = trim($_POST['email']      ?? '');
$social     = trim($_POST['social']     ?? '');
$message    = trim($_POST['message']    ?? '');

if ($first_name === '') { $errors[] = 'First name is required.'; }
if ($last_name  === '') { $errors[] = 'Last name is required.'; }
if ($email      === '') { $errors[] = 'Email is required.'; }
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = '"' . htmlspecialchars($email) . '" is not a valid email address.';
}
if ($message === '') { $errors[] = 'Message is required.'; }

if (count($errors) > 0) {
    echo json_encode(['errors' => $errors]);
    exit;
}

try {
    $db   = new Database();
    $conn = $db->connect();

    $stmt = $conn->prepare(
        'INSERT INTO contacts (first_name, last_name, email, social, message, created_at)
         VALUES (:first_name, :last_name, :email, :social, :message, NOW())'
    );

    $stmt->execute([
        ':first_name' => $first_name,
        ':last_name'  => $last_name,
        ':email'      => $email,
        ':social'     => $social,
        ':message'    => $message,
    ]);

    echo json_encode([
        'message' => 'Thanks ' . htmlspecialchars($first_name) . '! Your message has been received. I\'ll get back to you within 24 hours.'
    ]);

} catch (Exception $e) {
    echo json_encode(['errors' => ['Server error. Please try again later.']]);
}
?>
