<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - Ajay Portfolio</title>
    <style>
        body { font-family: sans-serif; background: #0a0a0a; color: #fff; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
        .login-box { background: #111; padding: 2.5rem; border-radius: 12px; border: 1px solid #222; width: 100%; max-width: 380px; }
        h1 { margin: 0 0 1.5rem; font-size: 1.4rem; }
        label { display: block; font-size: 0.8rem; margin-bottom: 0.4rem; color: #888; }
        input { width: 100%; padding: 0.75rem 1rem; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box; margin-bottom: 1rem; }
        button { width: 100%; padding: 0.85rem; background: #e63946; border: none; border-radius: 8px; color: #fff; font-weight: 700; font-size: 0.95rem; cursor: pointer; }
        .error { background: rgba(230,57,70,0.15); border: 1px solid rgba(230,57,70,0.4); padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1rem; font-size: 0.875rem; color: #e63946; }
    </style>
</head>
<body>
<?php
session_start();
$error = $_SESSION['error_messages']['login'] ?? '';
$_SESSION['error_messages'] = [];
?>
    <div class="login-box">
        <h1>Admin Login</h1>
        <?php if ($error): ?>
        <div class="error"><?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>
        <form action="includes/login.php" method="POST">
            <div>
                <label for="username">Username</label>
                <input type="text" name="username" id="username" required autocomplete="username">
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" name="password" id="password" required autocomplete="current-password">
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</body>
</html>
