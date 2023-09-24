<?php
    session_start();
    require 'connect.php';

    $requestPayload = file_get_contents("php://input");
    $object = json_decode($requestPayload);

    $query = "UPDATE `website_status` SET `isActive`= false WHERE status = $object->currentStatus; UPDATE `website_status` SET `isActive`= true, `message` =  '$object->message' WHERE status = $object->newStatus;";

    if(mysqli_multi_query($conn, $query)){
        echo 1;
    }
    else{
        echo 0;
    }
?>