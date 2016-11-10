<?php
include('connect.php');
header('Access-Control-Allow-Origin: http://localhost:8080');

$userDeleteQuery = 'DELETE FROM phonebook WHERE id="' . $_POST['record_id'] . '";';

if ($connection->query($userDeleteQuery)) {
  echo json_encode(1);
}
