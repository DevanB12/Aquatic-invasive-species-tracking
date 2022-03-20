<?php
$host="longvillerideshare.cutndb7xnjzj.us-east-2.rds.amazonaws.com";
			$port=3306;
			$socket="";
			$user="admin";
			$password="Lk65bv1998";
			$database="longvillerideshare";
			$dbname="AIS";

			$conn = new mysqli($host, $user, $password, $database)
				or die ('Could not connect to the database server' . mysqli_connect_error());

			$db = mysqli_select_db($dbname);
			
$species = $_POST['myCountry'];
$photo = $_POST['capture'];
$date = date("Y/m/d");
$time = date("h:i:sa");
$comment = $_POST['comment'];
echo $_POST['comment'];

$query = "INSERT into 'AIS'('species', 'photo', 'time', 'date', 'comment')
VALUES ($species, $photo, $time, $date, $comment)";
mysqli_query($conn, $query);
?>

