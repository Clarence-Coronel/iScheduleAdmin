<?php
    session_start();
    require 'connect.php';

    $appID = null;
    $newStatus = null;

    foreach($_POST as $temp){
        if(!isset($appID)){
            $appID = $temp;
        }
        else{
            $newStatus = $temp;
        }
    }

    $query = "UPDATE `appointments` SET `appointmentStatus` = '$newStatus' WHERE `appointmentID` = '$appID';";

    if(mysqli_query($conn, $query)){
        $username = $_SESSION['username'];
        $adminStampQuery = "INSERT INTO `admin_logs`(`username`, `activity`) VALUES ('$username','Changed ID=\"$appID\" appointment status')";
        mysqli_query($conn, $adminStampQuery);
        echo 1;
    }

?>