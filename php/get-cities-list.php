<?php
include('connect.php');

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
