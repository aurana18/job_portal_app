<?php
session_start();
require_once '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $poster_id = $_GET['poster_id'] ?? null;

    if (!$poster_id) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing poster ID.']);
        exit;
    }

    $stmt = $conn->prepare("SELECT id, title, description, payout, location, created_at 
                            FROM jobs 
                            WHERE poster_id = ? AND deleted_at IS NULL 
                            ORDER BY created_at DESC");
    $stmt->execute([$poster_id]);

    $jobs = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($jobs);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Only GET method is allowed.']);
}
?>


