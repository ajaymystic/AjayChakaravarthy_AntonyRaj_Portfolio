<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - Ajay Portfolio</title>
</head>
<body>
    <div class="admin-login">
        <h1>Admin Login</h1>

        <?php if (isset($_SESSION['error_messages']['login'])): ?>
            <p><?php echo $_SESSION['error_messages']['login']; ?></p>
            <?php unset($_SESSION['error_messages']['login']); ?>
        <?php endif; ?>

        <form action="/Portfolio-Final/admin/includes/login.php" method="POST">
            <div>
                <label for="username">Username</label>
                <input type="text" name="username" id="username">
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" name="password" id="password">
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    </div>
</body>
</html>
<?php
$_SESSION['error_messages'] = [];
?>