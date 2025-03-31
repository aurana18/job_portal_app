<?php
// Allow CORS for frontend access
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . "/db_connect.php";

// Validate and sanitize user ID
$user_id = isset($_GET["user_id"]) ? intval($_GET["user_id"]) : 0;

if ($user_id <= 0) {
    echo json_encode(["success" => false, "message" => "Invalid or missing user ID"]);
    exit();
}

// Check if the database connection is valid
if (!$conn) {
    echo json_encode(["success" => false, "message" => "Database connection error"]);
    exit();
}

// Adjust query if `jobs` table has `applied_by` column
$sql = "SELECT * FROM jobs WHERE applied_by = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$jobs = [];
while ($row = $result->fetch_assoc()) {
    $jobs[] = $row;
}

if (empty($jobs)) {
    echo json_encode(["success" => true, "jobs" => [], "message" => "No applied jobs found"]);
} else {
    echo json_encode(["success" => true, "jobs" => $jobs]);
}

// Close database connection
$stmt->close();
$conn->close();
?>


