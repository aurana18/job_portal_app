<?php
session_start();

// Destroy all session data
$_SESSION = [];
session_unset();
session_destroy();

if (ini_get("session.use_cookies")) {
    setcookie(session_name(), '', time() - 42000, '/');
}

echo json_encode(['message' => 'Logged out successfully.']);
?>
