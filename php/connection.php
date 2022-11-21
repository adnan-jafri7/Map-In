<?php
   $HOST= "localhost";
   $DB   = "mapdb";
   $USER = "root";
   $PASS = "";
 

// Create connection
$db_connection = new mysqli($HOST, $USER, $PASS, $DB);

// Check connection
if ($db_connection ->connect_error) {
  die("Connection failed: " . $db_connection ->connect_error);
}
//echo "Connected successfully";
?>