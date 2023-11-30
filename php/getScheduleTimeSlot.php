<?php
    require 'connect.php';
    require 'functions.php';

    $setID = null;

    foreach($_POST as $temp){
        $setID = $temp; 
    }
    
    class sched {
        public $schedID;
        public $max;
        public $startTime;
        public $stopTime;
        public $isBuffer;
        public $day;
    }

    $allSched = array();

    $query = "SELECT `scheduleID`, `max`, `day`, `startTime`, `stopTime`, `isBuffer` FROM `schedules` INNER JOIN `schedules_set` ON schedules.setID = schedules_set.setID WHERE schedules.isActive = 1 AND schedules_set.isActive = 1 AND schedules_set.setID = $setID ORDER BY `startTime`;";
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
            $tempObj->day = $row['day'];

            array_push($allSched, $tempObj);
        }

        echo json_encode($allSched);
    }

?>