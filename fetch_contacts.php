<?php
include 'cors.php'; // Include CORS fix
include 'db_connect.php'; // Database connection

$user_id = $_GET['user_id'] ?? null;

if (!$user_id) {
    echo json_encode(["success" => false, "message" => "User ID required"]);
    exit();
}

$stmt = $conn->prepare("SELECT id, name FROM users WHERE id != ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode(["success" => true, "users" => $users]);

$stmt->close();
$conn->close();
?>

