<?php

header("Content-Type: application/json; charset=UTF-8");

use Portfolio\Database;

spl_autoload_register(function ($class) {
    $class = str_replace('Portfolio\\', '', $class);
    $class = str_replace("\\", DIRECTORY_SEPARATOR, $class);
    $filepath = __DIR__ . '/classes/' . $class . '.php';
    $filepath = str_replace("/", DIRECTORY_SEPARATOR, $filepath);
    require_once $filepath;
});

$database = new Database();
$testimonials = $database->query('SELECT * FROM testimonials ORDER BY created_at ASC');

echo json_encode($testimonials);
?>