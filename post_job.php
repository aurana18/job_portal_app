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
$databaseFile = __DIR__ . "/db_connect.php";
if (!file_exists($databaseFile)) {
    die(json_encode(["message" => "Database connection file not found."]));
}
include $databaseFile;

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get JSON input
    $data = json_decode(file_get_contents("php://input"), true);
    
    // Validate input
    if (!isset($data["title"]) || !isset($data["name"]) || !isset($data["location"]) || !isset($data["description"])) {
        echo json_encode(["message" => "Invalid input."]);
        exit();
    }

    // Insert into database
    $stmt = $conn->prepare("INSERT INTO jobs (title, name, location, description, budget) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $data["title"], $data["name"], $data["location"], $data["description"], $data["budget"]);

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
