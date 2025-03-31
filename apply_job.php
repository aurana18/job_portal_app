<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "db_connect.php"; // Connect to database

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->user_id) || !isset($data->job_id)) {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit;
}

$user_id = intval($data->user_id);
$job_id = intval($data->job_id);

// Check if the user already applied
$checkQuery = "SELECT * FROM job_applications WHERE user_id = ? AND job_id = ?";
$stmt = $conn->prepare($checkQuery);
$stmt->bind_param("ii", $user_id, $job_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "You have already applied for this job."]);
    exit;
}

// Insert new application
$query = "INSERT INTO job_applications (user_id, job_id) VALUES (?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $user_id, $job_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Application submitted successfully!"]);
} else {
    echo json_encode(["success" => false, "message" => "Database error. Try again later."]);
}

$stmt->close();
$conn->close();
?>
