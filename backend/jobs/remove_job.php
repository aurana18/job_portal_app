<?php
session_start();
require_once '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $job_id = $_POST['job_id'] ?? null;
    $poster_id = $_POST['poster_id'] ?? null;

    if (!$job_id || !$poster_id) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing job ID or poster ID.']);
        exit;
    }

    // Verify that the user is the poster of the job
    $check = $conn->prepare("SELECT id FROM jobs WHERE id = ? AND poster_id = ?");
    $check->execute([$job_id, $poster_id]);

    if (!$check->fetch()) {
        http_response_code(403);
        echo json_encode(['error' => 'Unauthorized to delete this job.']);
        exit;
    }

    // Perform a soft delete by setting deleted_at timestamp
    $stmt = $conn->prepare("UPDATE jobs SET deleted_at = NOW() WHERE id = ?");
    $stmt->execute([$job_id]);

    echo json_encode(['message' => 'Job removed successfully.']);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Only POST method is allowed.']);
}
?>
