<?php
    require "connect.php";

    $delUsername = null;

    foreach($_POST as $temp){
        $delUsername = $temp;
    }

    $query = "UPDATE `admins` SET `isActive` = false WHERE `username` = '$delUsername'";

    if(mysqli_query($conn, $query)){
        session_start();
        $username = $_SESSION['username'];
        $adminStampQuery = "INSERT INTO `admin_logs`(`username`, `activity`) VALUES ('$username','Removed $delUsername')";
        mysqli_query($conn, $adminStampQuery);
        echo 1;
    }
    else{
        echo 0;
    }
?>