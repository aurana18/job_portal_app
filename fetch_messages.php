<?php
include 'cors.php';
include 'db_connect.php';

$sender_id = $_GET['sender_id'] ?? null;
$receiver_id = $_GET['receiver_id'] ?? null;

if (!$sender_id || !$receiver_id) {
    echo json_encode(["success" => false, "message" => "Both sender and receiver IDs required"]);
    exit();
}

$stmt = $conn->prepare("SELECT * FROM messages WHERE 
                        (sender_id = ? AND receiver_id = ?) OR 
                        (sender_id = ? AND receiver_id = ?) 
                        ORDER BY timestamp ASC");
$stmt->bind_param("iiii", $sender_id, $receiver_id, $receiver_id, $sender_id);
$stmt->execute();
$result = $stmt->get_result();

$messages = [];
while ($row = $result->fetch_assoc()) {
    $messages[] = $row;
}

echo json_encode(["success" => true, "messages" => $messages]);

$stmt->close();
$conn->close();
?>

