<?php
$servername = '127.0.0.1';
$username = 'root';
$password = '';
$dbname = 'phonebook';

$connection = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($connection->connect_error) {
  die('Connection failed: ' . $connection->connect_error);
} else {
  if (!$connection->set_charset("utf8")) {
    printf("Charset error: %s\n", $connection->error);
  }
}
