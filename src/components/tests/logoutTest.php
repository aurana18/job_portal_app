<?php
use PHPUnit\Framework\TestCase;

class LogoutTest extends TestCase
{
    public function testSessionDestroyedOnLogout()
    {
        $_SESSION['user_id'] = 1;
        ob_start();
        include '../auth/logout.php';
        ob_end_clean();

        $this->assertArrayNotHasKey('user_id', $_SESSION);
    }
}
?>


