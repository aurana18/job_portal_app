<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


// Include database connection
include "db_connect.php";

// Fetch jobs from the database
$sql = "SELECT id, title, name, location, description, budget FROM jobs ORDER BY id DESC";
$result = $conn->query($sql);

$jobs = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $jobs[] = $row;
    }
}

// Return JSON response
echo json_encode($jobs);
$conn->close();
?>
