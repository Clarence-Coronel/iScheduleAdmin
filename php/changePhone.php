<?php
    require 'connect.php';

    session_start();

    $username = $_SESSION['username'];
    $newPhone = null;

    foreach($_POST as $temp){
        $newPhone = htmlspecialchars($temp);
    }

    if(isset($newPhone)){
        $query = "UPDATE `admins` SET `phone`='$newPhone' WHERE `username` = '$username'";

        if(mysqli_query($conn, $query)){
            $username = $_SESSION['username'];
            $adminStampQuery = "INSERT INTO `admin_logs`(`username`, `activity`) VALUES ('$username','Changed phone')";
            mysqli_query($conn, $adminStampQuery);
            $_SESSION['phone'] = $newPhone;
            echo 1;
        }
        else{
            echo 0;
        };
    }

?>