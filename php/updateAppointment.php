<?php
    require 'connect.php';
    session_start();

    $appID = null;
    $schedDate = null;
    $schedID = null;
    $max = null;
    $total = null;

    foreach($_POST as $temp){
        if(!isset($appID)){
            $appID = $temp;
        }else if(!isset($schedDate)){
            $schedDate = $temp;
        }else if(!isset($schedID)){
            $schedID = $temp;
        }
        else{
            $max = $temp;
        }
    }
    $queryTotal = "SELECT COUNT(`appointmentID`) AS 'total' FROM `appointments` WHERE `appointmentStatus` = 'active' AND `appointmentDate` = '$schedDate' AND `scheduleID` = $schedID;";

    $result = mysqli_query($conn,$queryTotal);

    while($row = mysqli_fetch_array($result)){
        $total = (int)$row['total'];
    }

    if($total < $max){
        $query = "UPDATE `appointments` SET `scheduleID`='$schedID',`appointmentDate`='$schedDate', `appointmentStatus`='active', `followUpImgLink`='' WHERE `appointmentID` = '$appID';";
        if(mysqli_query($conn, $query)){
            $username = $_SESSION['username'];
            $adminStampQuery = "INSERT INTO `admin_logs`(`username`, `activity`) VALUES ('$username','Approved a follow-up request')";
            mysqli_query($conn, $adminStampQuery);
            echo 1;
        }
    }
    else{
        echo 0;
    }

    
?>