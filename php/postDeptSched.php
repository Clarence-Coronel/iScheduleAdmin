<?php
    $requestPayload = file_get_contents("php://input");

    $object = json_decode($requestPayload);

    require 'connect.php';

    $query = "INSERT INTO `schedules`(`deptID`, `day`, `startTime`, `stopTime`, `max`, `isActive`, `isBuffer`) VALUES ('$object->deptID','$object->day','$object->startTime','$object->stopTime','$object->max',true,$object->isBuffer);";

    if(mysqli_query($conn, $query)){
        session_start();
        $username = $_SESSION['username'];
        $adminStampQuery = "INSERT INTO `admin_logs`(`username`, `activity`) VALUES ('$username','Added a slot in $object->deptName\'s $object->dayName schedule')";
        mysqli_query($conn, $adminStampQuery);
        echo 1;
    }
?>  