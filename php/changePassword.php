<?php
    require 'connect.php';

    session_start();

    $username = $_SESSION['username'];
    $newPass = null;

    foreach($_POST as $temp){
        $newPass = htmlspecialchars($temp);
    }

    $hashedPassword = password_hash($newPass, PASSWORD_BCRYPT);

    if(isset($newPass)){
        $query = "UPDATE `admins` SET `password`='$hashedPassword' WHERE `username` = '$username'";

        if(mysqli_query($conn, $query)){
            echo 1;
        }
        else{
            echo 0;
        };
    }

?>