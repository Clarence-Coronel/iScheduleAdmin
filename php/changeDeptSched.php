<?php
    require "connect.php";
    session_start();

    $requestPayload = file_get_contents("php://input");

    $object = json_decode($requestPayload);

    $query = "UPDATE `schedules` SET `startTime`='$object->startTime',`stopTime`='$object->stopTime',`max`='$object->max' WHERE `scheduleID` = $object->schedID";

    if(mysqli_query($conn, $query)){
        $username = $_SESSION['username'];
        $adminStampQuery = "INSERT INTO `admin_logs`(`username`, `activity`) VALUES ('$username','Changed a slot in $object->department\'s $object->day schedule')";
        mysqli_query($conn, $adminStampQuery);
        echo 1;
    }
?>