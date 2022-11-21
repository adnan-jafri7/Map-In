<?php
	error_reporting(E_ERROR | E_WARNING | E_PARSE);
    include_once ("connection.php");

	$EncodedData = file_get_contents('php://input');
	$DecodedData = json_decode($EncodedData, true);

	$name=$DecodedData['name'];
	$mobile = $DecodedData['mobile'];
    $email = $DecodedData['email'];
    $address = $DecodedData['address'];
    $city = $DecodedData['city'];
    $state = $DecodedData['state'];
    $pincode = $DecodedData['pincode'];
	$mob_model=$DecodedData['mob_model'];
	$os_version=$DecodedData['os_version'];
	$code=0;

	if(strlen($mobile)==10 && strlen($name)>1 && strlen($email)>4 && strlen($pincode)==6 ) {

	$SQ = "SELECT * from users WHERE mobile = '$mobile' ";
	$check = mysqli_query($db_connection, $SQ);
	if ( mysqli_num_rows($check)>0 )
	{
		$Message = "An account with this phone number already exist!";
		$code=1;
		
	}
	else
	{
		$IQ = "INSERT INTO users (name, mobile, email, address, city, state, pincode,mob_model,os_version,id) VALUES ('$name', '$mobile', '$email', '$address', '$city', '$state', '$pincode','$mob_model','$os_version','')";

		$result = mysqli_query($db_connection, $IQ);
//echo $IQ;
		if($result)
		{
			$Message = "Successfully Registered!";
			$code=3;
			//$row = mysqli_fetch_row($result);
			
		}
		else
		{
			$Message = "Server Error...Please try later";
			$code=2;
		}
	}
}
else	{$Message="Missing parameters";
		 $code=4;
		}
	
	$Response = ["Message" => $Message,"Code"=>$code];
	echo json_encode($Response);

$db_connection->close();
?>