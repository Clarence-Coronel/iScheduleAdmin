<?php
    require 'connect.php';

    session_start();

    $username = $_SESSION['username'];
    $newPhone = null;

    foreach($_POST as $temp){
        $newPhone = $temp;
    }

    if(isset($newPhone)){
        $query = "UPDATE `admins` SET `phone`='$newPhone' WHERE `username` = '$username'";

        if(mysqli_query($conn, $query)){
            $_SESSION['phone'] = $newPhone;
            echo 1;
        }
        else{
            echo 0;
        };
    }

?>