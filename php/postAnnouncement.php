<?php
    session_start();
    require 'connect.php';

    $requestPayload = file_get_contents("php://input");

    $object = json_decode($requestPayload);
    $username = $_SESSION['username'];

    $object->title = htmlspecialchars($object->title, ENT_QUOTES);
    $object->body = htmlspecialchars($object->body, ENT_QUOTES);

    $query = "INSERT INTO `announcements`(`annTitle`, `annBody`, `author`) VALUES ('$object->title','$object->body','$username')";


    if (mysqli_query($conn, $query)){
        // session_start();
        $username = $_SESSION['username'];
        $adminStampQuery = "INSERT INTO `admin_logs`(`username`, `activity`) VALUES ('$username','Posted an announcement: $object->title')";
        mysqli_query($conn, $adminStampQuery);
        echo 1;
    }
    else{
        echo 0;
    }
?>