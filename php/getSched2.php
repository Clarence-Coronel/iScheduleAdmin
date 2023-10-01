<?php
    require 'connect.php';
    require 'functions.php';

    $deptID = null;
    $day = null;

    foreach($_POST as $temp){
        if(!isset($deptID)){
            $deptID = $temp;
        }
        else{
            $day = $temp;
        }
    }
    
    class sched {
        public $schedID;
        public $max;
        public $startTime;
        public $stopTime;
    }

    $allSched = array();

    $query = "SELECT `scheduleID`, `max`, `startTime`, `stopTime` FROM `schedules` WHERE `isActive` = 1 AND `isBuffer` = 0 AND `day` = '$day' AND `deptID` = $deptID;";
    $result = mysqli_query($conn,$query);
	$count = mysqli_num_rows($result);

    if($count > 0){
        while($row = mysqli_fetch_array($result)){
            $tempObj = new sched();

            $tempObj->schedID = $row['scheduleID'];
            $tempObj->max = $row['max'];
            $tempObj->startTime = timeConverter($row['startTime']);
            $tempObj->stopTime = timeConverter($row['stopTime']);

            array_push($allSched, $tempObj);
        }

        echo json_encode($allSched);
    }

?>