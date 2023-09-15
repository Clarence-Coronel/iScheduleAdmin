<?php
    require 'connect.php';
    session_start();

    $username = $_SESSION['username'];
    $inputPass = "";

    foreach($_POST as $temp){
        $inputPass = $temp;
    }
    
    $query = "SELECT password FROM `admins` WHERE username='$username'";
    $result = mysqli_query($conn,$query);
	$row = mysqli_fetch_array($result);

    $encrypted_password = $row['password'];

    if(password_verify($inputPass, $encrypted_password)){
        echo 1;
    }
    else{
        echo 0;
    }

?>