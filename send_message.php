<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db_connect.php";

$data = json_decode(file_get_contents("php://input"), true);

$sender_id = $data["sender_id"];
$receiver_id = $data["receiver_id"];
$message = $data["message"];

$stmt = $conn->prepare("INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)");
$stmt->bind_param("iis", $sender_id, $receiver_id, $message);

$response = ["success" => false];
if ($stmt->execute()) {
    $response["success"] = true;
}

echo json_encode($response);
$stmt->close();
$conn->close();
?>

