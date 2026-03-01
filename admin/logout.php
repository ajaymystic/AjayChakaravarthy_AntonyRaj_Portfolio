<?php

session_start();
session_destroy();

header('Location: /Portfolio-Final/admin/login.php');
?>