<?php 
    require "connect.php";

    $dept = null;

    foreach($_POST as $temp){
        $dept = $temp;
    }

    $query = "SELECT `scheduleID`, `day`, `startTime`, `stopTime`, `max`, `isBuffer` FROM `schedules` WHERE deptID = $dept AND isActive = true ORDER BY `startTime` ASC;";
    $result = mysqli_query($conn,$query);
	$count = mysqli_num_rows($result);

    class sched {
        public $scheduleID;
        public $day;
        public $startTime;
        public $stopTime;
        public $max;
        public $isBuffer;
    }

    $allSched = array();

    if($count > 0){

        while($row = mysqli_fetch_array($result)){
            $tempObj = new sched();

            $tempObj->scheduleID = $row['scheduleID'];
            $tempObj->day = $row['day'];
            $tempObj->startTime = timeConverter($row['startTime']);
            $tempObj->stopTime = timeConverter($row['stopTime']);
            $tempObj->max = $row['max'];
            $tempObj->isBuffer = $row['isBuffer'];

            array_push($allSched, $tempObj);

            // echo $row['annTitle'];
        }

        echo json_encode($allSched);
    }
    else{
        echo 0;
    }

    // 13:00
    function timeConverter($time){
        $delimiter = ':';
        $seperated = explode($delimiter, $time);

        if((int)$seperated[0] >= 12){
            if((int)$seperated[0] > 12){
                $seperated[0] = (int)$seperated[0] - 12;
            }
            
            return "{$seperated[0]}:{$seperated[1]} PM";
        }
        else{
            return "{$seperated[0]}:{$seperated[1]} AM";
        }  
    }
?>