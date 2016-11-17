<?php
include('connect.php');

// Check if fields are empty
$fieldsIsValid = true;
$return = array();
// Validation settings
$settings = array(
  'last_name' => array(
    'filter' => FILTER_VALIDATE_REGEXP,
    'options' => array('regexp' => '/^[a-zA-Z]+$/')
  ),
  'first_name' => array(
    'filter' => FILTER_VALIDATE_REGEXP,
    'options' => array('regexp' => '/^[a-zA-Z]+$/')
  ),
  'second_name' => array(
    'filter' => FILTER_VALIDATE_REGEXP,
    'options' => array('regexp' => '/^[a-zA-Z]+$/')
  ),
  'city_id' => FILTER_VALIDATE_INT,
  'street_id' => FILTER_VALIDATE_INT,
  'birth_date' => array(
    'filter' => FILTER_VALIDATE_REGEXP,
    'options' => array('regexp' => '/^[0-9a-zA-Z\-]+$/')
  ),
  'phone_number' => array(
    'filter' => FILTER_VALIDATE_REGEXP,
    'options' => array('regexp' => '/^[0-9\+\(\)]+$/')
  ),
);

$data = filter_var_array($_POST['person_data']);

if (
  !empty($_POST) && (
      empty($data['last_name']) ||
      empty($data['phone_number'])
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
          "' . $data['last_name'] . '",
          "' . $data['first_name'] . '",
          "' . $data['person_data']['second_name'] . '",
          "' . intval($data['city_id']) . '",
          "' . intval($data['street_id']) . '",
          "' . $data['birth_date'] . '",
          "' . $data['phone_number'] . '"
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
