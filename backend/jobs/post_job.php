<?php
session_start();
require_once '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim($_POST['title'] ?? '');
    $description = trim($_POST['description'] ?? '');
    $payout = $_POST['payout'] ?? null;
    $location = trim($_POST['location'] ?? '');
    $poster_id = $_POST['poster_id'] ?? null;

    if (!$title || !$poster_id) {
        http_response_code(400);
        echo json_encode(['error' => 'Title and poster ID are required.']);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO jobs (title, description, payout, location, poster_id) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$title, $description, $payout, $location, $poster_id]);

    echo json_encode(['message' => 'Job posted successfully.']);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Only POST method is allowed.']);
}
?>


