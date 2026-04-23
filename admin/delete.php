<?php
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/autoload.php';

use Portfolio\Database;

$id       = isset($_GET['id']) ? (int)$_GET['id'] : 0;
$database = new Database();
$results  = $database->query('SELECT id FROM projects WHERE id = :id', ['id' => $id]);

if (empty($results)) {
    header('Location: index.php');
    exit;
}

$database->query('DELETE FROM projects WHERE id = :id', ['id' => $id]);
$_SESSION['message'] = 'Project deleted successfully.';
header('Location: index.php');
exit;
?>
