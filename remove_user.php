<?php
session_start();
require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $admin_id = $_POST['admin_id'] ?? null;
    $user_id = $_POST['user_id'] ?? null;
    $reason = trim($_POST['reason'] ?? '');

    if (!$admin_id || !$user_id || !$reason) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing admin ID, user ID, or reason.']);
        exit;
    }

    // Soft-delete: Remove the user and log the action
    $conn->beginTransaction();

    try {
        // Delete user (can be soft delete depending on your app logic)
        $delete = $conn->prepare("DELETE FROM users WHERE id = ?");
        $delete->execute([$user_id]);

        // Log removal in user_removals table
        $log = $conn->prepare("INSERT INTO user_removals (admin_id, user_id, reason) VALUES (?, ?, ?)");
        $log->execute([$admin_id, $user_id, $reason]);

        $conn->commit();
        echo json_encode(['message' => 'User removed successfully.']);
    } catch (PDOException $e) {
        $conn->rollBack();
        http_response_code(500);
        echo json_encode(['error' => 'Failed to remove user: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Only POST method is allowed.']);
}
?>
