<?php
    require 'connect.php';

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
    }

    $allSched = array();

    $query = "SELECT `scheduleID`, `max` FROM `schedules` INNER JOIN `schedules_set` ON schedules.setID = schedules_set.setID WHERE schedules.isActive = 1 AND schedules_set.isActive = 1 AND schedules_set.deptID = $deptID AND ('$curDate' BETWEEN schedules_set.startDate AND schedules_set.endDate) AND day = '$day';";
    $result = mysqli_query($conn,$query);
	$count = mysqli_num_rows($result);

    if($count > 0){
        while($row = mysqli_fetch_array($result)){
            $tempObj = new sched();

            $tempObj->schedID = $row['scheduleID'];
            $tempObj->max = $row['max'];

            array_push($allSched, $tempObj);
        }

        echo json_encode($allSched);
    }

?>