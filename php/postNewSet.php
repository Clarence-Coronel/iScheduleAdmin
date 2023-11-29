<?php
    require "connect.php";

    $requestPayload = file_get_contents("php://input");
    $object = json_decode($requestPayload);

    $deptID = $object->meta->dept;
    $startDate = $object->meta->start;
    $endDate = $object->meta->end;
    $isActive = true;
    $deptName = $object->meta->deptName;

    $schedulesObj = $object->sched;

    $query = "SELECT * from schedules_set";

	$result = mysqli_query($conn,$query);

	$setID = mysqli_num_rows($result) + 1;

    $scheduleSetQuery = "INSERT INTO `schedules_set`(`deptID`, `startDate`, `endDate`, `isActive`) VALUES ('$deptID','$startDate','$endDate','$isActive');";
    $scheduleQuery = "INSERT INTO `schedules`(`deptID`, `day`, `startTime`, `stopTime`, `max`, `isActive`, `isBuffer`, `setID`) VALUES";
    

    
    foreach($schedulesObj as $day){
        foreach($day as $sched){
            $scheduleQuery .= " ('" . $sched->deptID . "', '" . $sched->day . "', '" . $sched->startTime . "', '" . $sched->stopTime . "', '" . $sched->max . "', " . "1, " . $sched->isBuffer . ", '" . $setID . "'), ";
        }
    }

    $scheduleQuery = rtrim($scheduleQuery, ', ');

    if (mysqli_query($conn, $scheduleSetQuery)){
        if(mysqli_query($conn, $scheduleQuery)){
            session_start();
            $username = $_SESSION['username'];
            $adminStampQuery = "INSERT INTO `admin_logs`(`username`, `activity`) VALUES ('$username','Created a new schedule in $deptName')";
            mysqli_query($conn, $adminStampQuery);
            echo 1;
        }
        else echo 0;
    }
    else echo 0;
?>