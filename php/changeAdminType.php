<?php
    require 'connect.php';
    session_start();

    $arr = array();

    foreach($_POST as $temp){
        array_push($arr, $temp);
    }

    $query = "UPDATE `admins` SET `adminType`='$arr[1]' WHERE `username` = '$arr[0]'";

    if(mysqli_query($conn, $query)){
        $username = $_SESSION['username'];
        $adminStampQuery = "INSERT INTO `admin_logs`(`username`, `activity`) VALUES ('$username','Changed admin type of $arr[0]')";
        mysqli_query($conn, $adminStampQuery);
        echo 1;
    }
    else{
        echo 0;
    }
?>