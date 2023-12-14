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
        public $isBuffer;
    }

    $schedules = array();

    $query = "SELECT `scheduleID`, `startTime`, `stopTime`, `max`, `isBuffer` FROM schedules INNER JOIN `schedules_set` ON schedules.setID = schedules_set.setID WHERE schedules.day = '$day' AND schedules.isActive = '1' AND schedules_set.isActive = '1' AND schedules.deptID = '$deptID' AND ('$date' BETWEEN schedules_set.startDate AND schedules_set.endDate) ORDER BY schedules.startTime ASC;";

    // echo $query;
    $result = mysqli_query($conn,$query);

    while($row = mysqli_fetch_array($result)){
        $tempObj = new sched();

        $tempObj->schedID = $row['scheduleID'];
        $tempObj->startTime = timeConverter($row['startTime']);
        $tempObj->stopTime = timeConverter($row['stopTime']);
        $tempObj->max = $row['max'];
        $tempObj->isBuffer = $row['isBuffer'];

        array_push($schedules, $tempObj);
    }

    foreach($schedules as $sched){
        $numOfPatients = null;
        $query = "SELECT COUNT(`appointmentID`) AS 'total' FROM appointments WHERE `appointmentDate` = '$date' AND `scheduleID` = '$sched->schedID' AND `appointmentStatus` = 'scheduled';";
        $result = mysqli_query($conn,$query);

        while($row = mysqli_fetch_array($result)){

            $numOfPatients = $row['total'];

            $sched->openSlots = (int)$sched->max - (int)$numOfPatients;

        }
    }

    echo json_encode($schedules);
?>