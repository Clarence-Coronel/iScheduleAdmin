<?php
    session_start();
    require 'connect.php';

    $requestPayload = file_get_contents("php://input");

    $object = json_decode($requestPayload);
    $username = $_SESSION['username'];

    $object->title = htmlspecialchars($object->title);
    $object->body = htmlspecialchars($object->body);

    $query = "INSERT INTO `announcements`(`annTitle`, `annBody`, `author`) VALUES ('$object->title','$object->body','$username')";

    if (mysqli_query($conn, $query)){
        echo 1;
    }
    else{
        echo 0;
    }
?>