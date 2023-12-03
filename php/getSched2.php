<?php
    require 'connect.php';
    require 'functions.php';

    $deptID = null;
    $day = null;
    $curDate = null;

    foreach($_POST as $temp){
        if(!isset($deptID)){
            $deptID = $temp;
        }
        else if(!isset($day)){
            $day = $temp;
        }
        else{
            $curDate = $temp;
        }
    }
    
    class sched {
        public $schedID;
        public $max;
        public $startTime;
        public $stopTime;
        public $isBuffer;
    }

    $allSched = array();

    $query = "SELECT `scheduleID`, `max`, `startTime`, `stopTime`, `isBuffer` FROM `schedules` INNER JOIN `schedules_set` ON schedules.setID = schedules_set.setID WHERE schedules.isActive = 1 AND schedules_set.isActive = 1 AND schedules.day = '$day' AND schedules.deptID = '$deptID' AND ('$curDate' BETWEEN schedules_set.startDate AND schedules_set.endDate) ORDER BY schedules.startTime;";
    $result = mysqli_query($conn,$query);
	$count = mysqli_num_rows($result);

    if($count > 0){
        while($row = mysqli_fetch_array($result)){
            $tempObj = new sched();

            $tempObj->schedID = $row['scheduleID'];
            $tempObj->max = $row['max'];
            $tempObj->startTime = timeConverter($row['startTime']);
            $tempObj->stopTime = timeConverter($row['stopTime']);
            $tempObj->isBuffer = $row['isBuffer'];

            array_push($allSched, $tempObj);
        }

        echo json_encode($allSched);
    }

?>