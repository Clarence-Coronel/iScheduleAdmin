<?php
    session_start();
    require 'connect.php';

    $requestPayload = file_get_contents("php://input");
    $object = json_decode($requestPayload);

    $query = "UPDATE `website_status` SET `isActive`= false WHERE status = $object->currentStatus; UPDATE `website_status` SET `isActive`= true, `message` =  '$object->message' WHERE status = $object->newStatus;";

    if(mysqli_multi_query($conn, $query)){
        $username = $_SESSION['username'];
        $adminStampQuery = "INSERT INTO `admin_logs`(`username`, `activity`) VALUES ('$username','Changed website status')";
        mysqli_query($conn, $adminStampQuery);
        echo 1;
    }
    else{
        echo 0;
    }
?>