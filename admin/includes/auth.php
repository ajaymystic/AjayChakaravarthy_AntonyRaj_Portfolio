<?php

session_start();

if (!isset($_SESSION['logged_in_user'])) {
    header('Location: /Portfolio-Final/admin/login.php');
    exit;
}
?>