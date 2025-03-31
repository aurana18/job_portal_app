<?php
use PHPUnit\Framework\TestCase;
require_once __DIR__ . '/../backend/db_connect.php';

class JobTest extends TestCase {
    private $conn;

    protected function setUp(): void {
        $this->conn = new mysqli("localhost", "root", "", "jobportal");
    }

    public function testDatabaseConnection() {
        $this->assertNotNull($this->conn, "Database connection should not be null");
    }

    public function testFetchingJobs() {
        $sql = "SELECT * FROM jobs";
        $result = $this->conn->query($sql);
        $this->assertGreaterThan(0, $result->num_rows, "Jobs should be present in the database");
    }

    public function testFetchingUsers() {
        $sql = "SELECT * FROM users";
        $result = $this->conn->query($sql);
        $this->assertGreaterThan(0, $result->num_rows, "Users should exist in the database");
    }
}
?>
