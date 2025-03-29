<?php
$host = "localhost";  // Change if your database is hosted elsewhere
$user = "root";       // Default MySQL username in XAMPP
$pass = "";           // Default MySQL password (empty in XAMPP)
$dbname = "job_portal";  // Replace with your actual database name

$conn = new mysqli($host, $user, $pass, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
