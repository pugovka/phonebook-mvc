<?php
include('connect.php');
header('Access-Control-Allow-Origin: http://localhost:8080');

$citiesListQuery = '
SELECT
  cities.id,
  cities.city_name
FROM cities
ORDER BY city_name ASC
LIMIT 10;';

if ($citiesList = $connection->query($citiesListQuery)) {
  $arrCities = array();

  while ($city = $citiesList->fetch_assoc()) {
    $arrCities[] = $city;
  }
}
echo json_encode($arrCities);
