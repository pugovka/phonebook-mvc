<?php
include('connect.php');

$userDeleteQuery = 'DELETE FROM phonebook WHERE id="' . $_POST['record_id'] . '";';

if ($connection->query($userDeleteQuery)) {
  echo json_encode(1);
}
