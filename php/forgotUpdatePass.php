<?php
    require 'connect.php';

    $arr = array();

    foreach($_POST as $temp){
        array_push($arr, $temp);
    }

    $hashedPassword = password_hash($arr[1], PASSWORD_BCRYPT);

    $convertedSpeChar = htmlspecialchars($arr[0], ENT_QUOTES);

    if(isset($arr)){
        $query = "UPDATE `admins` SET `password`='$hashedPassword' WHERE `username` = '$convertedSpeChar'";
        
        if(mysqli_query($conn, $query)){
            session_start();
            $adminStampQuery = "INSERT INTO `admin_logs`(`username`, `activity`) VALUES ('$arr[0]','Changed password')";
            mysqli_query($conn, $adminStampQuery);
            echo "success";
        }
        else{
            echo "fail";
        };
    }
?>