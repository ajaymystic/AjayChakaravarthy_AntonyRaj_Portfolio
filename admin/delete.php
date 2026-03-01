<?php

require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/autoload.php';

use Portfolio\Database;

$id = $_GET['id'];

$database = new Database();
$projects = $database->query('SELECT * FROM projects WHERE id = :id', ['id' => $id]);
$project = $projects[0] ?? null;

if ($project === null) {
    header('Location: /Portfolio-Final/admin/index.php');
    exit;
}

$database->query('DELETE FROM projects WHERE id = :id', ['id' => $id]);

$_SESSION['message'] = 'Project deleted successfully!';
header('Location: /Portfolio-Final/admin/index.php');
exit;
?>