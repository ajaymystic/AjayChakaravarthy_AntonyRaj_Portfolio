<?php

require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/autoload.php';

use Portfolio\Database;

$database = new Database();
$projects = $database->query('SELECT projects.*, categories.name AS category_name 
    FROM projects 
    LEFT JOIN categories ON projects.category_id = categories.id 
    ORDER BY projects.created_at DESC');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Ajay Portfolio</title>
</head>
<body>
    <div class="admin-dashboard">
        <h1>Admin Dashboard</h1>
        <nav>
            <a href="/Portfolio-Final/admin/add.php">Add New Project</a>
            <a href="/Portfolio-Final/admin/logout.php">Logout</a>
        </nav>

        <?php if (isset($_SESSION['message'])): ?>
            <p><?php echo $_SESSION['message']; ?></p>
            <?php unset($_SESSION['message']); ?>
        <?php endif; ?>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Created</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($projects as $project): ?>
                <tr>
                    <td><?php echo $project['id']; ?></td>
                    <td><?php echo $project['title']; ?></td>
                    <td><?php echo $project['category_name']; ?></td>
                    <td><?php echo $project['created_at']; ?></td>
                    <td>
                        <a href="/Portfolio-Final/admin/edit.php?id=<?php echo $project['id']; ?>">Edit</a>
                        <a href="/Portfolio-Final/admin/delete.php?id=<?php echo $project['id']; ?>">Delete</a>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</body>
</html>