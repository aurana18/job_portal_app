<?php
session_start();
require_once '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $job_id = $_POST['job_id'] ?? null;
    $applicant_id = $_POST['applicant_id'] ?? null;

    if (!$job_id || !$applicant_id) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing job ID or applicant ID.']);
        exit;
    }

    // Check if the user has already applied
    $check = $conn->prepare("SELECT id FROM job_applications WHERE job_id = ? AND applicant_id = ?");
    $check->execute([$job_id, $applicant_id]);

    if ($check->fetch()) {
        http_response_code(409);
        echo json_encode(['error' => 'You have already applied for this job.']);
        exit;
    }

    // Insert new application
    $stmt = $conn->prepare("INSERT INTO job_applications (job_id, applicant_id) VALUES (?, ?)");
    $stmt->execute([$job_id, $applicant_id]);

    echo json_encode(['message' => 'Application submitted successfully.']);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Only POST method is allowed.']);
}
?>

