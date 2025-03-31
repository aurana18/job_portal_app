<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Include database connection
require_once __DIR__ . "/db_connect.php";

// Fetch jobs with the name of the user who posted them
$sql = "SELECT jobs.id, jobs.title, jobs.location, jobs.description, jobs.budget, 
               users.name AS posted_by_name 
        FROM jobs 
        LEFT JOIN users ON jobs.posted_by = users.id";

$result = $conn->query($sql);

$jobs = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $jobs[] = $row;
    }
}

// Return jobs as JSON
echo json_encode($jobs);

$conn->close();
?>

