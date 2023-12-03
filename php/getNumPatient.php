<?php
    require 'connect.php';

    $date = null;
    $schedID = null;
    $numPatients = null;

    foreach($_POST as $temp){
        if(!isset($date)){
            $date = $temp;
        }
        else{
            $schedID = $temp;
        }
    }

    $query = "SELECT COUNT(`appointmentID`) AS 'total' FROM `appointments` WHERE `appointmentDate` = '$date' AND `scheduleID` = $schedID AND `appointmentStatus` = 'scheduled';";

    $result = mysqli_query($conn,$query);

    while($row = mysqli_fetch_array($result)){
        $numPatients = (int)$row['total'];
    }

    echo $numPatients;
?>