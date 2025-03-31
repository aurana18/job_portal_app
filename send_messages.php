<?php
include 'cors.php';
include 'db_connect.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['sender_id'], $data['receiver_id'], $data['message'])) {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
    exit();
}

$stmt = $conn->prepare("INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)");
$stmt->bind_param("iis", $data['sender_id'], $data['receiver_id'], $data['message']);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Message sent successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error sending message"]);
}

$stmt->close();
$conn->close();
?>



