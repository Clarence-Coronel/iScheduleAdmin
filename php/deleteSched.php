<?php
    session_start();
    require 'connect.php';

    $arr = array();

    foreach($_POST as $temp){
        array_push($arr, $temp);
    }

    $schedID = $arr[0];
    $dept = $arr[1];
    $day = $arr[2];

    $query = "UPDATE `schedules` SET `isActive`= false WHERE `scheduleID` = $schedID";

    if(mysqli_query($conn, $query)){
        $username = $_SESSION['username'];
        $adminStampQuery = "INSERT INTO `admin_logs`(`username`, `activity`) VALUES ('$username','Removed a slot in $dept\'s $day schedule')";
        mysqli_query($conn, $adminStampQuery);
        echo 1;
    }

?>