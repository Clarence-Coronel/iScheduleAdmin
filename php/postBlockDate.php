<?php

    $requestPayload = file_get_contents("php://input");

    $object = json_decode($requestPayload);

    require 'connect.php';

    $object->dateName = htmlspecialchars($object->dateName);

    $query = "INSERT INTO `block_dates`(`blockDate`, `blockName`, `isYearly`) VALUES ('$object->date','$object->dateName','$object->isYearly')";

    if(mysqli_query($conn, $query)){
        session_start();
        $username = $_SESSION['username'];
        $adminStampQuery = "INSERT INTO `admin_logs`(`username`, `activity`) VALUES ('$username','Blocked a date: $object->dateName')";
        mysqli_query($conn, $adminStampQuery);
        echo 1;
    }
    else{
        echo 0;
    }
?>