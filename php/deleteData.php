<?php

    require 'connect.php';
    session_start();

    $code = null;
    $query = null;
    $subQuery = null;
    $subj = null;

    foreach($_POST as $temp){
        $code = $temp;
    }

    if($code == 0){
        $query = "DELETE FROM `admin_logs` WHERE 1;";
        $subQuery = "ALTER TABLE admin_logs AUTO_INCREMENT = 1";
        $subj = "admin logs";
    }
    else if($code == 1){
        $query = "DELETE FROM `appointments` WHERE 1;";
        $subQuery = "ALTER TABLE appointments AUTO_INCREMENT = 1";
        $subj = "appointments";
    }
    else if($code == 2){
        $query = "DELETE FROM `feedbacks` WHERE 1;";
        $subQuery = "ALTER TABLE feedbacks AUTO_INCREMENT = 1";
        $subj = "feedbacks";
    }
    else if($code == 3){
        $query = "DELETE FROM `announcements` WHERE 1;";
        $subQuery = "ALTER TABLE announcements AUTO_INCREMENT = 1";
        $subj = "announcements";
    }

    if(mysqli_query($conn, $query)){
        if(mysqli_query($conn, $subQuery)){
            $username = $_SESSION['username'];
            $adminStampQuery = "INSERT INTO `admin_logs`(`username`, `activity`) VALUES ('$username','Permanently deleted $subj')";
            mysqli_query($conn, $adminStampQuery);
            echo 1;
        }
        else{
            echo 0;
        }
    }
    else{
        echo 0;
    }

?>