<?php
use PHPUnit\Framework\TestCase;

class FetchJobsTest extends TestCase {
    private $conn;

    protected function setUp(): void {
        $this->conn = new mysqli("localhost", "root", "", "jobportal");

        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    public function testFetchJobs() {
        $this->conn->query("INSERT INTO users (id, name) VALUES (999, 'Test User')");
        $this->conn->query("INSERT INTO jobs (id, title, location, description, budget, posted_by) 
                            VALUES (999, 'Test Job', 'Remote', 'Job description', 500, 999)");

       
        $response = file_get_contents("http://localhost/backend/fetch_jobs.php");
        $this->assertNotFalse($response, "API request failed");

        
        $data = json_decode($response, true);
        $this->assertIsArray($data, "Response should be an array");

        
        $this->assertGreaterThan(0, count($data), "There should be at least one job in the response");

        
        $job = $data[0];
        $this->assertArrayHasKey("id", $job);
        $this->assertArrayHasKey("title", $job);
        $this->assertArrayHasKey("location", $job);
        $this->assertArrayHasKey("description", $job);
        $this->assertArrayHasKey("budget", $job);
        $this->assertArrayHasKey("posted_by_name", $job);

       
        $this->conn->query("DELETE FROM jobs WHERE id = 999");
        $this->conn->query("DELETE FROM users WHERE id = 999");
    }

    protected function tearDown(): void {
        $this->conn->close();
    }
}
