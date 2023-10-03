<?php
    require 'connect.php';

    $date = null;
    $schedID = null;
    $max = null;
    $numPatients = null;

    foreach($_POST as $temp){
        if(!isset($date)){
            $date = $temp;
        }
        else if(!isset($schedID)){
            $schedID = $temp;
        }
        else{
            $max = (int)$temp;
        }
    }

    $query = "SELECT COUNT(`appointmentID`) AS 'total' FROM `appointments` WHERE `appointmentDate` = '$date' AND `scheduleID` = $schedID;";

    $result = mysqli_query($conn,$query);

    while($row = mysqli_fetch_array($result)){
        $numPatients = (int)$row['total'];
    }

    if($numPatients >= $max){
        echo 0;
    }
    else{
        echo 1;
    }
?>