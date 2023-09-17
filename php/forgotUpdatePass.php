<?php
    require 'connect.php';

    $arr = array();

    foreach($_POST as $temp){
        array_push($arr, $temp);
    }

    $hashedPassword = password_hash($arr[1], PASSWORD_BCRYPT);

    $convertedSpeChar = htmlspecialchars($arr[0]);

    if(isset($arr)){
        $query = "UPDATE `admins` SET `password`='$hashedPassword' WHERE `username` = '$convertedSpeChar'";
        
        if(mysqli_query($conn, $query)){
            echo "success";
        }
        else{
            echo "fail";
        };
    }
?>