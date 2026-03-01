<?php

require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/autoload.php';

use Portfolio\Database;

$database = new Database();
$categories = $database->query('SELECT * FROM categories');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'];
    $description = $_POST['description'];
    $technologies = $_POST['technologies'];
    $image = $_POST['image'];
    $live_url = $_POST['live_url'];
    $github_url = $_POST['github_url'];
    $category_id = $_POST['category_id'];

    $database->query(
        'INSERT INTO projects (title, description, technologies, image, live_url, github_url, category_id, created_at)
        VALUES (:title, :description, :technologies, :image, :live_url, :github_url, :category_id, NOW())',
        [
            'title' => $title,
            'description' => $description,
            'technologies' => $technologies,
            'image' => $image,
            'live_url' => $live_url,
            'github_url' => $github_url,
            'category_id' => $category_id
        ]
    );

    $_SESSION['message'] = 'Project added successfully!';
    header('Location: /Portfolio-Final/admin/index.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Project - Ajay Portfolio</title>
</head>
<body>
    <div class="admin-add">
        <h1>Add New Project</h1>
        <nav>
            <a href="/Portfolio-Final/admin/index.php">Back to Dashboard</a>
            <a href="/Portfolio-Final/admin/logout.php">Logout</a>
        </nav>

        <form action="/Portfolio-Final/admin/add.php" method="POST">
            <div>
                <label for="title">Title</label>
                <input type="text" name="title" id="title" required>
            </div>
            <div>
                <label for="description">Description</label>
                <textarea name="description" id="description" required></textarea>
            </div>
            <div>
                <label for="technologies">Technologies</label>
                <input type="text" name="technologies" id="technologies">
            </div>
            <div>
                <label for="image">Image Path</label>
                <input type="text" name="image" id="image">
            </div>
            <div>
                <label for="live_url">Live URL</label>
                <input type="text" name="live_url" id="live_url">
            </div>
            <div>
                <label for="github_url">GitHub URL</label>
                <input type="text" name="github_url" id="github_url">
            </div>
            <div>
                <label for="category_id">Category</label>
                <select name="category_id" id="category_id">
                    <?php foreach ($categories as $category): ?>
                    <option value="<?php echo $category['id']; ?>">
                        <?php echo $category['name']; ?>
                    </option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div>
                <button type="submit">Add Project</button>
            </div>
        </form>
    </div>
</body>
</html>