<?php
    include_once ("connection.php");

	$EncodedData = file_get_contents('php://input');
	$DecodedData = json_decode($EncodedData, true);

	$user_mobile = $DecodedData['mobile'];
//$user_mobile='9871106478';
	$SQ = "SELECT * from users WHERE mobile = '$user_mobile'";
	$check = mysqli_query($db_connection, $SQ);
	
	if ( mysqli_num_rows($check)>0 )
	{
		$Row = mysqli_fetch_assoc($check);
		$status="Success";
		$Message = "Successfully logged into account!";
		$id = $Row["id"];
		$email = $Row["email"];
		$mobile = $Row["mobile"];
		$name = $Row["name"];
		$address = $Row["address"];
		$city = $Row["city"];
		$state=$Row["state"];
		$pincode=$Row["pincode"];
	}
	else
	{	$status="Failed";
		$Message = "No account exists with the phone number '$user_mobile' ";
		$id = 0;
		$email = "";
		$mobile = "";
		$name = "";
		$address = "";
		$city="";
		$state="";
		$pincode="";
	}
	
	$Response = ["status"=>$status, "Message" => $Message, "id" => $id, "name" => $name, "mobile" => $mobile, "email" => $email, "address" => $address,"city"=>$city,"state"=>$state,"pincode"=>$pincode];
	echo json_encode($Response);

$db_connection->close();
?>