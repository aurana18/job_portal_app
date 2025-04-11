<?php
use PHPUnit\Framework\TestCase;

class RegisterTest extends TestCase
{
    protected $db;

    protected function setUp(): void
    {
        // Setup test DB or mock connection here
        $this->db = new PDO('sqlite::memory:');
        $this->db->exec("CREATE TABLE users (
            id INTEGER PRIMARY KEY,
            username TEXT UNIQUE,
            email TEXT UNIQUE,
            password_hash TEXT
        )");
    }

    public function testUserRegistersSuccessfully()
    {
        $_POST = [
            'username' => 'testuser',
            'email' => 'test@example.com',
            'password' => 'test123'
        ];

        ob_start();
        include '../auth/register.php';
        ob_end_clean();

        $stmt = $this->db->query("SELECT COUNT(*) FROM users");
        $count = $stmt->fetchColumn();

        $this->assertEquals(1, $count);
    }
}

?>