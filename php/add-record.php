<?php
include('connect.php');
header('Access-Control-Allow-Origin: http://localhost:8080');

// Check if fields are empty
$fieldsIsValid = true;
$return = array();
if (
  !empty($_POST) && (
      empty($_POST['person_data']['last_name']) ||
      empty($_POST['person_data']['phone_number'])
    )
  ) {
  $fieldsIsValid = false;
}
if (!$fieldsIsValid) {
  $return['value'] = 0;
  $return['text'] = "Phone or surname is empty";
} else {
  // Check if person with this number exists
  $recordFieldsByPhone = 'SELECT * FROM phonebook WHERE phone_number="' . $_POST['person_data']['phone_number'] . '";';
  if ($searchResult = $connection->query($recordFieldsByPhone)) {
    if ($searchResult->num_rows === 0) {
      $newRecord = '
        INSERT INTO phonebook(
          last_name,
          first_name,
          second_name,
          city_id,
          street_id,
          birth_date,
          phone_number
        )
        VALUES(
          "' . $_POST['person_data']['last_name'] . '",
          "' . $_POST['person_data']['first_name'] . '",
          "' . $_POST['person_data']['second_name'] . '",
          "' . intval($_POST['person_data']['city_id']) . '",
          "' . intval($_POST['person_data']['street_id']) . '",
          "' . $_POST['person_data']['birth_date'] . '",
          "' . $_POST['person_data']['phone_number'] . '"
        );
      ';
      if ($connection->query($newRecord)) {
        $return['value'] = 1;
        $return['text'] = "Successfully added the record.";
      } else {
        $return['value'] = 0;
        $return['text'] = "Error: ". $connection->error ;
      }
    } else {
      $return['value'] = 0;
      $return['text'] = "Phone number already exists.";
    }
  }
}

echo json_encode($return);
