<?php
include('connect.php');
header('Access-Control-Allow-Origin: http://localhost:8080');

$return = array();
if (!empty($_POST['person_data']['id'])) {
  // Check if person with this number exists
  $recordQuery = 'SELECT * FROM phonebook WHERE id=' . $_POST['person_data']['id'] . ';';
  if ($record = $connection->query($recordQuery)) {
    if ($record->num_rows === 0) {
      $return['value'] = 0;
      $return['text'] = 'The record was not found.';
    } else {
      $insertRecordQuery = '
        UPDATE phonebook SET
          last_name="' . $_POST['person_data']['last_name'] . '",
          first_name="' . $_POST['person_data']['first_name'] . '",
          second_name="' . $_POST['person_data']['second_name'] . '",
          city_id=' . intval($_POST['person_data']['city_id']) . ',
          street_id=' . intval($_POST['person_data']['street_id']) . ',
          birth_date="' . $_POST['person_data']['birth_date'] . '",
          phone_number="' . $_POST['person_data']['phone_number'] . '"
        WHERE id=' . $_POST['person_data']['id'] . '
        ;';
      if ($connection->query($insertRecordQuery)) {
        $return['value'] = 1;
        $return['text'] = 'Record was successfully updated.';
      } else {
        $return['value'] = 0;
        $return['text'] = 'Error updating record. '. $connection->error ;
      }
    }
  }
}
echo json_encode($return);
