<?php
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/autoload.php';

use Portfolio\Database;

$database   = new Database();
$categories = $database->query('SELECT * FROM categories');

$id      = isset($_GET['id']) ? (int)$_GET['id'] : 0;
$results = $database->query('SELECT * FROM projects WHERE id = :id', ['id' => $id]);
$project = $results[0] ?? null;

if ($project === null) {
    header('Location: index.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $database->query(
        'UPDATE projects SET
         title        = :title,
         description  = :description,
         overview     = :overview,
         problem      = :problem,
         solution     = :solution,
         technologies = :technologies,
         image        = :image,
         image_2      = :image_2,
         image_3      = :image_3,
         live_url     = :live_url,
         github_url   = :github_url,
         category_id  = :category_id,
         sort_order   = :sort_order
         WHERE id     = :id',
        [
            'title'       => $_POST['title'],
            'description' => $_POST['description'],
            'overview'    => $_POST['overview'],
            'problem'     => $_POST['problem'],
            'solution'    => $_POST['solution'],
            'technologies'=> $_POST['technologies'],
            'image'       => $_POST['image'],
            'image_2'     => $_POST['image_2'],
            'image_3'     => $_POST['image_3'],
            'live_url'    => $_POST['live_url'],
            'github_url'  => $_POST['github_url'],
            'category_id' => $_POST['category_id'],
            'sort_order'  => $_POST['sort_order'],
            'id'          => $id,
        ]
    );
    $_SESSION['message'] = 'Project updated successfully!';
    header('Location: index.php');
    exit;
}

// I'm wrapping all output values in htmlspecialchars to prevent XSS
function val($project, $key) {
    return htmlspecialchars($project[$key] ?? '');
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Project</title>
    <style>
        body { font-family: sans-serif; background: #0a0a0a; color: #fff; margin: 0; padding: 2rem; max-width: 800px; }
        h1 { margin: 0 0 0.5rem; }
        nav { margin-bottom: 2rem; display: flex; gap: 1rem; }
        nav a { color: #00c8ff; text-decoration: none; font-size: 0.9rem; }
        label { display: block; font-size: 0.8rem; color: #888; margin-bottom: 0.4rem; margin-top: 1rem; }
        input, textarea, select { width: 100%; padding: 0.75rem 1rem; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #fff; font-size: 0.9rem; box-sizing: border-box; }
        textarea { min-height: 100px; resize: vertical; }
        button { margin-top: 1.5rem; padding: 0.85rem 2rem; background: #e63946; border: none; border-radius: 8px; color: #fff; font-weight: 700; cursor: pointer; }
    </style>
</head>
<body>
    <h1>Edit: <?php echo val($project, 'title'); ?></h1>
    <nav>
        <a href="index.php">← Dashboard</a>
        <a href="logout.php">Logout</a>
    </nav>
    <form action="edit.php?id=<?php echo $id; ?>" method="POST">
        <label>Title *</label>
        <input type="text" name="title" value="<?php echo val($project, 'title'); ?>" required>

        <label>Short Description *</label>
        <textarea name="description" required><?php echo val($project, 'description'); ?></textarea>

        <label>Overview</label>
        <textarea name="overview"><?php echo val($project, 'overview'); ?></textarea>

        <label>The Problem</label>
        <textarea name="problem"><?php echo val($project, 'problem'); ?></textarea>

        <label>The Solution</label>
        <textarea name="solution"><?php echo val($project, 'solution'); ?></textarea>

        <label>Technologies (comma separated)</label>
        <input type="text" name="technologies" value="<?php echo val($project, 'technologies'); ?>">

        <label>Main Image Path</label>
        <input type="text" name="image" value="<?php echo val($project, 'image'); ?>">

        <label>Image 2 Path</label>
        <input type="text" name="image_2" value="<?php echo val($project, 'image_2'); ?>">

        <label>Image 3 Path</label>
        <input type="text" name="image_3" value="<?php echo val($project, 'image_3'); ?>">

        <label>Live URL</label>
        <input type="text" name="live_url" value="<?php echo val($project, 'live_url'); ?>">

        <label>GitHub URL</label>
        <input type="text" name="github_url" value="<?php echo val($project, 'github_url'); ?>">

        <label>Category</label>
        <select name="category_id">
            <?php foreach ($categories as $cat): ?>
            <option value="<?php echo $cat['id']; ?>" <?php if ($cat['id'] == $project['category_id']) echo 'selected'; ?>>
                <?php echo htmlspecialchars($cat['name']); ?>
            </option>
            <?php endforeach; ?>
        </select>

        <label>Sort Order (1 = first)</label>
        <input type="number" name="sort_order" value="<?php echo val($project, 'sort_order'); ?>">

        <button type="submit">Save Changes</button>
    </form>
</body>
</html>
