<?php
    require 'connect.php';

    session_start();

    $username = $_SESSION['username'];
    $newPass = null;

    foreach($_POST as $temp){
        $newPass = $temp;
    }

    $hashedPassword = password_hash($newPass, PASSWORD_BCRYPT);

    if(isset($newPass)){
        $query = "UPDATE `admins` SET `password`='$hashedPassword' WHERE `username` = '$username'";

        if(mysqli_query($conn, $query)){
            $adminStampQuery = "INSERT INTO `admin_logs`(`username`, `activity`) VALUES ('$username','Changed password')";
            mysqli_query($conn, $adminStampQuery);
            echo 1;
        }
        else{
            echo 0;
        };
    }

?>