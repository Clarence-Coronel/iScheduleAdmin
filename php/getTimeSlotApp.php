<?php
    require 'functions.php';
    require 'connect.php';

    $dept = null;
    $day = null;

    foreach($_POST as $temp){
        if(!isset($dept)){
            $dept = $temp;
        }else{
            $day = $temp;
        }
    }
    class timeSlot {
        public $scheduleID;
        public $startTime;
        public $stopTime;
    }
    
    $allTimeSlot = array();

    $query = "SELECT scheduleID, startTime, stopTime FROM schedules WHERE deptID = '$dept' AND day = '$day' AND isActive = 1 ORDER BY startTime ASC;";

    $result = mysqli_query($conn, $query);

    while($row = mysqli_fetch_array($result)){
        $tempObj = new timeSlot();

        $tempObj->scheduleID = $row['scheduleID'];
        $tempObj->startTime = timeConverter($row['startTime']);
        $tempObj->stopTime = timeConverter($row['stopTime']);

        array_push($allTimeSlot, $tempObj);
    }
    

    echo json_encode($allTimeSlot);

?>