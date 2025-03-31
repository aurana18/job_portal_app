<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . "/db_connect.php";

$user_id = $_GET["user_id"] ?? null;
if (!$user_id) {
    echo json_encode(["success" => false, "message" => "User ID is required"]);
    exit();
}

$sql = "SELECT * FROM jobs WHERE posted_by = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$jobs = [];
while ($row = $result->fetch_assoc()) {
    $jobs[] = $row;
}

echo json_encode(["success" => true, "jobs" => $jobs]);
?>



