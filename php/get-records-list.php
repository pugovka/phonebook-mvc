<?php
include('connect.php');

$recordsListQuery = '
  SELECT
    phonebook.id,
    phonebook.last_name,
    phonebook.first_name,
    phonebook.second_name,
    IFNULL(cities.city_name, "") city_name,
    IFNULL(streets.street_name, "") street_name,
    phonebook.birth_date,
    phonebook.phone_number
  FROM phonebook
  LEFT JOIN cities ON phonebook.city_id=cities.id
  LEFT JOIN streets ON phonebook.street_id=streets.id
  ORDER BY last_name ASC;';

if ($recordsList = $connection->query($recordsListQuery)) {
  $arrRecords = array();
  while ($record = $recordsList->fetch_assoc()) {
    $arrRecords[] = $record;
  }
}

echo json_encode($arrRecords);
