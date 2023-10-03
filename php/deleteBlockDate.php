<?php
    session_start();
    require 'connect.php';

    $arr = array();

    foreach($_POST as $temp){
        array_push($arr, $temp);
    }

    $query = "DELETE FROM `block_dates` WHERE `blockID` = '$arr[0]';";

    if(mysqli_query($conn, $query)){
        $username = $_SESSION['username'];
        $adminStampQuery = "INSERT INTO `admin_logs`(`username`, `activity`) VALUES ('$username','Removed a blocked date: $arr[1]')";
        mysqli_query($conn, $adminStampQuery);
        echo 1;
    }
    else{
        echo 0;
    }
?>