<?php

session_start();

use Portfolio\Database;

spl_autoload_register(function ($class) {
    $class = str_replace('Portfolio\\', '', $class);
    $class = str_replace("\\", DIRECTORY_SEPARATOR, $class);
    $filepath = __DIR__ . '/../../includes/classes/' . $class . '.php';
    $filepath = str_replace("/", DIRECTORY_SEPARATOR, $filepath);
    require_once $filepath;
});

$username = $_POST['username'];
$password = $_POST['password'];

$database = new Database();
$results = $database->query('SELECT * FROM users WHERE username = :username', ['username' => $username]);
$user = $results[0] ?? null;

$passwordMatches = password_verify($password, $user['password']);

if ($passwordMatches) {
    $_SESSION['logged_in_user'] = $user;
    header('Location: /Portfolio-Final/admin/index.php');
} else {
    $_SESSION['error_messages'] = [];
    $_SESSION['error_messages']['login'] = 'Invalid username or password.';
    header('Location: /Portfolio-Final/admin/login.php');
}
?>