<?php
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/autoload.php';

use Portfolio\Database;

$database = new Database();
$projects = $database->query(
    'SELECT projects.*, categories.name AS category_name
     FROM projects
     LEFT JOIN categories ON projects.category_id = categories.id
     ORDER BY projects.sort_order ASC'
);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Ajay Portfolio</title>
    <style>
        body { font-family: sans-serif; background: #0a0a0a; color: #fff; margin: 0; padding: 2rem; }
        h1 { margin: 0 0 0.5rem; }
        nav { margin-bottom: 2rem; display: flex; gap: 1rem; }
        nav a { color: #00c8ff; text-decoration: none; font-size: 0.9rem; }
        .msg { background: rgba(0,200,100,0.15); border: 1px solid rgba(0,200,100,0.4); padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1.5rem; color: #00c864; font-size: 0.875rem; }
        table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
        th, td { padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid #1e1e1e; }
        th { color: #666; font-weight: 600; text-transform: uppercase; font-size: 0.72rem; letter-spacing: 0.08em; }
        tr:hover td { background: #111; }
        a.btn { display: inline-block; padding: 0.3rem 0.75rem; border-radius: 6px; font-size: 0.8rem; text-decoration: none; margin-right: 0.4rem; }
        .btn-edit { background: #1a2a3a; color: #00c8ff; border: 1px solid #00c8ff44; }
        .btn-delete { background: #2a1a1a; color: #e63946; border: 1px solid #e6394644; }
    </style>
</head>
<body>
    <h1>Admin Dashboard</h1>
    <nav>
        <a href="add.php">+ Add Project</a>
        <a href="../index.html">View Site</a>
        <a href="logout.php">Logout</a>
    </nav>

    <?php if (isset($_SESSION['message'])): ?>
    <div class="msg"><?php echo htmlspecialchars($_SESSION['message']); unset($_SESSION['message']); ?></div>
    <?php endif; ?>

    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Order</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($projects as $project): ?>
            <tr>
                <td><?php echo $project['id']; ?></td>
                <td><?php echo htmlspecialchars($project['title']); ?></td>
                <td><?php echo htmlspecialchars($project['category_name']); ?></td>
                <td><?php echo $project['sort_order']; ?></td>
                <td>
                    <a href="edit.php?id=<?php echo $project['id']; ?>" class="btn btn-edit">Edit</a>
                    <a href="delete.php?id=<?php echo $project['id']; ?>" class="btn btn-delete" onclick="return confirm('Delete this project?')">Delete</a>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</body>
</html>
