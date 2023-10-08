<?php
    require 'connect.php';
    require 'functions.php';
    session_start();

    $date = null;
    $deptID = null;
    $day = null;
    

    foreach($_POST as $temp){

        if(!isset($date)){
            $date = $temp;
        }
        else if(!isset($deptID)){
            $deptID = $temp;
        }
        else{
            $day = $temp;
        }
    }

    class sched {
        public $schedID;
        public $startTime;
        public $stopTime;
        public $max;
        public $openSlots;
    }

    $schedules = array();

    $query = "SELECT `scheduleID`, `startTime`, `stopTime`, `max` FROM schedules WHERE `isBuffer` = '1' AND `day` = '$day' AND `isActive` = '1' AND `deptID` = '$deptID' ORDER BY `startTime` ASC;";

    $result = mysqli_query($conn,$query);

    while($row = mysqli_fetch_array($result)){
        $tempObj = new sched();

        $tempObj->schedID = $row['scheduleID'];
        $tempObj->startTime = timeConverter($row['startTime']);
        $tempObj->stopTime = timeConverter($row['stopTime']);
        $tempObj->max = $row['max'];

        array_push($schedules, $tempObj);
    }

    foreach($schedules as $sched){
        $numOfPatients = null;
        $query = "SELECT COUNT(`appointmentID`) AS 'total' FROM appointments WHERE `appointmentDate` = '$date' AND `scheduleID` = '$sched->schedID' AND `appointmentStatus` = 'active';";
        $result = mysqli_query($conn,$query);

        while($row = mysqli_fetch_array($result)){

            $numOfPatients = $row['total'];

            $sched->openSlots = (int)$sched->max - (int)$numOfPatients;

        }
    }

    echo json_encode($schedules);;
?>