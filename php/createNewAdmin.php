<?php 

    require "connect.php";

    $requestPayload = file_get_contents("php://input");

    $object = json_decode($requestPayload);

    $query = "SELECT * from admins";
	$result = mysqli_query($conn,$query);
	$count = mysqli_num_rows($result);

    if(isset($object)){
        $generatedUsername = str_replace(" ", "", $object->firstName) . "-" . str_replace(" ", "", $object->lastName) . $count+1;
        $hashedPassword = password_hash($object->password, PASSWORD_BCRYPT);

        $sql_query = "INSERT INTO admins (username, adminType, firstName, middleName, lastName, phone, password, isActive) 
		VALUES ('$generatedUsername', '$object->adminType','$object->firstName','$object->middleName','$object->lastName','$object->phone','$hashedPassword', 1)";
	
		if (mysqli_query($conn, $sql_query)) 
		{
            session_start();
            $username = $_SESSION['username'];
            $adminStampQuery = "INSERT INTO `admin_logs`(`username`, `activity`) VALUES ('$username','Created a new admin: $generatedUsername')";
            mysqli_query($conn, $adminStampQuery);
            echo $generatedUsername;
		} 
		else
		{
			echo 0;
		}
    }

    mysqli_close($conn);
?>