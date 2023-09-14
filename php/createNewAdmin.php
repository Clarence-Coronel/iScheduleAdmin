<?php 

    require "connect.php";

    $requestPayload = file_get_contents("php://input");

    $object = json_decode($requestPayload);

    $query = "SELECT * from admins";
	$result = mysqli_query($conn,$query);
	$count = mysqli_num_rows($result);

    if(isset($object)){
        $generatedUsername = $object->firstName . "-" . $object->lastName . $count+1;
        $hashedPassword = password_hash($object->password, PASSWORD_BCRYPT);

        $sql_query = "INSERT INTO admins (username, adminType, firstName, middleName, lastName, phone, password) 
		VALUES ('$generatedUsername', '$object->adminType','$object->firstName','$object->middleName','$object->lastName','$object->phone','$hashedPassword')";
	
		if (mysqli_query($conn, $sql_query)) 
		{
            echo $generatedUsername;
		} 
		else
		{
			echo 0;
		}
    }

    mysqli_close($conn);
?>