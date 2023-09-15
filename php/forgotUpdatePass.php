<?php
    require 'connect.php';

    $arr = array();

    foreach($_POST as $temp){
        array_push($arr, $temp);
    }

    $hashedPassword = password_hash($arr[1], PASSWORD_BCRYPT);

    if(isset($arr)){
        $query = "UPDATE `admins` SET `password`='$hashedPassword' WHERE `username` = '$arr[0]'";
        
        if(mysqli_query($conn, $query)){
            echo "success";
        }
        else{
            echo "fail";
        };
    }
?>