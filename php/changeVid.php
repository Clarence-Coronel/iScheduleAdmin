<?php
    require 'connect.php';
    session_start();

    $arr = array();

    foreach($_POST as $temp){
        array_push($arr, $temp);
    }

    $type = $arr[0];
    $link = htmlspecialchars($arr[1]);

    $query = "UPDATE `video_tutorials` SET `link`='$link' WHERE `vidType` = '$type'";

    if(mysqli_query($conn, $query)){
        $username = $_SESSION['username'];
        $adminStampQuery = "INSERT INTO `admin_logs`(`username`, `activity`) VALUES ('$username','Changed $type video tutorial')";
        mysqli_query($conn, $adminStampQuery);
        echo 1;
    }
    else{
        echo 0;
    }
?>