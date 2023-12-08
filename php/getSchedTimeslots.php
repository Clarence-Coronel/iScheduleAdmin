<?php
    require 'functions.php';
    require 'connect.php';

    $start = null;
    $end = null;
    $dept = null;

    foreach($_POST as $temp){
        if(!isset($start)) $start = $temp;
        else if(!isset($end)) $end = $temp;
        else $dept = $temp;
    }

    class timeSlot {
        public $scheduleID;
        public $startTime;
        public $stopTime;
        public $deptID;
        public $setActive;
        public $slotActive;
        public $day;
        public $startDate;
        public $endDate;
    }
    
    $allTimeSlot = array();

    $query = null;

    if($dept == "all"){
        if($end == ""){
            $query = "SELECT scheduleID, startTime, stopTime, schedules.day, schedules_set.startDate, schedules_set.endDate, schedules.deptID, schedules.isActive as slotActive, schedules_set.isActive as setActive FROM schedules INNER JOIN schedules_set on schedules.setID = schedules_set.setID WHERE ('$start' <= schedules_set.startDate) ORDER BY schedules.deptID ASC, FIELD(schedules.day, 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'), schedules.startTime ASC;";
        }
        else if ($start == ""){
            $query = "SELECT scheduleID, startTime, stopTime, schedules.day, schedules_set.startDate, schedules_set.endDate, schedules.deptID, schedules.isActive as slotActive, schedules_set.isActive as setActive FROM schedules INNER JOIN schedules_set on schedules.setID = schedules_set.setID WHERE ('$end' >= schedules_set.endDate) ORDER BY schedules.deptID ASC, FIELD(schedules.day, 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'), schedules.startTime ASC;";
        }
        else{
            $query = "SELECT scheduleID, startTime, stopTime, schedules.day, schedules_set.startDate, schedules_set.endDate, schedules.deptID, schedules.isActive as slotActive, schedules_set.isActive as setActive FROM schedules INNER JOIN schedules_set on schedules.setID = schedules_set.setID WHERE ((('$start' BETWEEN schedules_set.startDate AND schedules_set.endDate) OR ('$end' BETWEEN schedules_set.startDate AND schedules_set.endDate)) OR ((schedules_set.startDate BETWEEN '$start' AND '$end') OR (schedules_set.endDate BETWEEN '$start' AND '$end'))) ORDER BY schedules.deptID ASC, FIELD(schedules.day, 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'), schedules.startTime ASC;";
        }
    }
    else{
        if($end == ""){
            $query = "SELECT scheduleID, startTime, stopTime, schedules.day, schedules_set.startDate, schedules_set.endDate, schedules.deptID, schedules.isActive as slotActive, schedules_set.isActive as setActive FROM schedules INNER JOIN schedules_set on schedules.setID = schedules_set.setID WHERE schedules_set.deptID = '$dept' AND ('$start' <= schedules_set.startDate) ORDER BY schedules.deptID ASC, FIELD(schedules.day, 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'), schedules.startTime ASC;";
        }
        else if ($start == ""){
            $query = "SELECT scheduleID, startTime, stopTime, schedules.day, schedules_set.startDate, schedules_set.endDate, schedules.deptID, schedules.isActive as slotActive, schedules_set.isActive as setActive FROM schedules INNER JOIN schedules_set on schedules.setID = schedules_set.setID WHERE schedules_set.deptID = '$dept' AND ('$end' >= schedules_set.endDate) ORDER BY schedules.deptID ASC, FIELD(schedules.day, 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'), schedules.startTime ASC;";
        }
        else{
            $query = "SELECT scheduleID, startTime, stopTime, schedules.day, schedules_set.startDate, schedules_set.endDate, schedules.deptID, schedules.isActive as slotActive, schedules_set.isActive as setActive FROM schedules INNER JOIN schedules_set on schedules.setID = schedules_set.setID WHERE schedules_set.deptID = '$dept' AND ((('$start' BETWEEN schedules_set.startDate AND schedules_set.endDate) OR ('$end' BETWEEN schedules_set.startDate AND schedules_set.endDate)) OR ((schedules_set.startDate BETWEEN '$start' AND '$end') OR (schedules_set.endDate BETWEEN '$start' AND '$end'))) ORDER BY schedules.deptID ASC, FIELD(schedules.day, 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'), schedules.startTime ASC;";
        }
    }

    // echo $query;
    
    $result = mysqli_query($conn, $query);

    while($row = mysqli_fetch_array($result)){
        $tempObj = new timeSlot();

        $tempObj->scheduleID = $row['scheduleID'];
        $tempObj->startTime = timeConverter($row['startTime']);
        $tempObj->stopTime = timeConverter($row['stopTime']);
        $tempObj->deptID = $row['deptID'];
        $tempObj->setActive = $row['setActive'];
        $tempObj->slotActive = $row['slotActive'];
        $tempObj->day = $row['day'];
        $tempObj->startDate = $row['startDate'];
        $tempObj->endDate = $row['endDate'];

        array_push($allTimeSlot, $tempObj);
    }
    

    echo json_encode($allTimeSlot);

?>