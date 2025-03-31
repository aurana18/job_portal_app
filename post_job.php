<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Handle CORS preflight request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

// Include database connection
require_once __DIR__ . "/db_connect.php";

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get JSON input
    $data = json_decode(file_get_contents("php://input"), true);
    
    // Validate input
    if (!isset($data["title"]) || !isset($data["location"]) || !isset($data["description"]) || !isset($data["posted_by"])) {
        echo json_encode(["message" => "Invalid input."]);
        exit();
    }

    // Insert into database
    $stmt = $conn->prepare("INSERT INTO jobs (title, location, description, budget, posted_by) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssi", $data["title"], $data["location"], $data["description"], $data["budget"], $data["posted_by"]);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Job posted successfully"]);
    } else {
        echo json_encode(["message" => "Error posting job"]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["message" => "Invalid request method"]);
}
?>


