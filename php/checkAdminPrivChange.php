<?php
    require 'connect.php';

    session_start();

    $username = $_SESSION['username'];
    $currentType = $_SESSION['adminType'];

    $query = "SELECT `adminType`, `isActive` FROM `admins` WHERE `username` = '$username' LIMIT 1;";
    $result = mysqli_query($conn,$query);

    if(mysqli_query($conn, $query)){
        while($row = mysqli_fetch_array($result)){
            if ($currentType != $row['adminType'] || $row['isActive'] == '0'){
                session_unset();
                session_destroy();
                echo 1;
                exit;
            }
            else{
                echo 0;
            }
        }
    }
    

?>