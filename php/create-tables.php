<?php
include('connect.php');

$phonebookTable =
  'CREATE TABLE IF NOT EXISTS phonebook(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    last_name VARCHAR(25) NOT NULL,
    first_name VARCHAR(25),
    second_name VARCHAR(25),
    city_id INT,
    street_id INT,
    birth_date VARCHAR(25),
    phone_number VARCHAR(25) NOT NULL UNIQUE
  );';

if ($connection->query($phonebookTable) === TRUE) {
  echo("Table phonebook created successfully.\n");
} else {
  echo("Error creating table: " . $connection->error ."\n");
}

$citiesTable =
  'CREATE TABLE IF NOT EXISTS cities(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    city_name VARCHAR(25) NOT NULL
  );';

if ($connection->query($citiesTable) === TRUE) {
  echo("Table cities created successfully.\n");
} else {
  echo("Error creating table: " . $connection->error ."\n");
}

$streetsTable =
  'CREATE TABLE IF NOT EXISTS streets(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    street_name VARCHAR(25) NOT NULL
  );';

if ($connection->query($streetsTable) === TRUE) {
  echo("Table streets created successfully.\n");
} else {
  echo("Error creating table: " . $connection->error ."\n");
}

$cityStreetLinkTable =
  'CREATE TABLE IF NOT EXISTS city_street(
    street_id INT NOT NULL UNIQUE,
    city_id INT NOT NULL,
    primary key (city_id, street_id)
  );';

if ($connection->query($cityStreetLinkTable) === TRUE) {
  echo("Table city_street created successfully.\n");
} else {
  echo("Error creating table: " . $connection->error ."\n");
}
