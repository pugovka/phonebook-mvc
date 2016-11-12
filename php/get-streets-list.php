<?php
include('connect.php');
header('Access-Control-Allow-Origin: http://localhost:8080');

$streetsListQuery = '
  SELECT
    streets.id,
    streets.street_name
  FROM streets
  INNER JOIN city_street on streets.id=city_street.street_id
  WHERE city_street.city_id=' . $_POST['city_id'] . '
  ORDER BY street_name ASC;';

if ($streets = $connection->query($streetsListQuery)) {
  $arrStreets = array();

  while ($street = $streets->fetch_assoc()) {
    $arrStreets[] = $street;
  }
}

echo json_encode($arrStreets);
