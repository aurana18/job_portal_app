<?php
use PHPUnit\Framework\TestCase;

class LoginTest extends TestCase {
    private $conn;

    protected function setUp(): void {
        $this->conn = new mysqli("localhost", "root", "", "jobportal");
    }

    public function testSuccessfulLogin() {
        $email = "saif@email";
        $password = "saif";

        $stmt = $this->conn->prepare("SELECT password FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($row = $result->fetch_assoc()) {
            $hashedPassword = $row['password'];
            $this->assertTrue(password_verify($password, $hashedPassword));
        } else {
            $this->fail("user not found");
        }
    }

    public function testFailedLoginIncorrectPassword() {
        $email = "test@example";
        $wrongPassword = "wrong";

        $stmt = $this->conn->prepare("SELECT password FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($row = $result->fetch_assoc()) {
            $hashedPassword = $row['password'];
            $this->assertFalse(password_verify($wrongPassword, $hashedPassword));
        } else {
            $this->fail("user not found");
        }
    }

    public function testFailedLoginNonExistentUser() {
        $email = "nonexistent@example.com";
        $password = "password123";

        $stmt = $this->conn->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        $this->assertEquals(0, $result->num_rows);
    }
}
?>
