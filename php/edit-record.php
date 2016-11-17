<?php
include('connect.php');

$return = array();

if (empty($_POST)) {
  $return['value'] = 0;
  $return['text'] = "Request is empty";
  echo json_encode($return);

  return;
}

if (empty($_POST['record_id'])) {
  $return['value'] = 0;
  $return['text'] = "Record id is empty";
  echo json_encode($return);

  return;
}
// Check if person with this number exists
$recordQuery = 'SELECT * FROM phonebook WHERE id=' . $_POST['record_id'] . ';';
if ($record = $connection->query($recordQuery)) {
  if ($record->num_rows === 0) {
    $return['value'] = 0;
    $return['text'] = 'The record was not found.';

    echo json_encode($return);
    return;
  }
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

  $data = filter_var_array($_POST['person_data'], $settings);
  if (
      empty($data['last_name']) ||
      empty($data['phone_number'])
    ) {
    $return['value'] = 0;
    $return['text'] = 'Phone or surname is invalid.';

    echo json_encode($return);
    return;
  }

  $insertRecordQuery = '
    UPDATE phonebook SET
      last_name="' . $data['last_name'] . '",
      first_name="' . $data['first_name'] . '",
      second_name="' . $data['second_name'] . '",
      city_id=' . intval($data['city_id']) . ',
      street_id=' . intval($data['street_id']) . ',
      birth_date="' . $data['birth_date'] . '",
      phone_number="' . $data['phone_number'] . '"
    WHERE id=' . $_POST['record_id'] . '
    ;';

  if (!$connection->query($insertRecordQuery)) {
    $return['value'] = 0;
    $return['text'] = 'Error updating record. '. $connection->error ;

    echo json_encode($return);
    return;
  }
  $return['value'] = 1;
  $return['text'] = 'Record was successfully updated.';
} else {
  $return['value'] = 0;
  $return['text'] = "Error: ". $connection->error ;
}

echo json_encode($return);
