<?php

    require 'connect.php';

    $requestPayload = file_get_contents("php://input");
    $object = json_decode($requestPayload);

    $toDelete = $object->delete;
    $toEditRange = $object->range;
    $toEditSched = $object->edit;
    $toAddSched = $object->add;

    if(delete($toDelete) && editRange($toEditRange) && edit($toEditSched) && add($toAddSched, $toEditRange->setID, $toEditRange->deptID)){
        session_start();
        $username = $_SESSION['username'];
        $adminStampQuery = "INSERT INTO `admin_logs`(`username`, `activity`) VALUES ('$username','Changed a schedule in $object->deptName')";
        mysqli_query($conn, $adminStampQuery);
        echo 1;
    }else echo 0;

    function delete($toDelete){
        require 'connect.php';
    
        $deleteQuery = "UPDATE `schedules` SET `isActive`=false WHERE";
    
        foreach($toDelete as $temp){
            $deleteQuery .= " scheduleID = $temp OR";
        }

        if(count($toDelete) == 0) return true;
    
        $deleteQuery = rtrim($deleteQuery, ' OR');
    
        if(mysqli_query($conn, $deleteQuery)){
            return true;
        }
        else{
            return false;
        }
    }

    function editRange($toEditRange){
        require 'connect.php';

        $query2 = "SELECT * FROM schedules_set WHERE ((`startDate` != '$toEditRange->oldStart') AND (`endDate` != '$toEditRange->oldEnd')) AND `deptID` = '$toEditRange->deptID' AND `isActive` = true AND (('$toEditRange->start' BETWEEN startDate AND endDate) OR ('$toEditRange->end' BETWEEN startDate AND endDate));";
        $query2 = "SELECT * FROM schedules_set WHERE ((`startDate` != '$toEditRange->oldStart') AND (`endDate` != '$toEditRange->oldEnd')) AND  `deptID` = '$toEditRange->deptID' AND `isActive` = true AND ((('$toEditRange->start' BETWEEN startDate AND endDate) OR ('$toEditRange->end' BETWEEN startDate AND endDate)) OR ((startDate BETWEEN '$toEditRange->start' AND '$toEditRange->end') OR (endDate BETWEEN '$toEditRange->start' AND '$toEditRange->end')));";
        $result2 = mysqli_query($conn,$query2);
        $existingCount = mysqli_num_rows($result2);
    
        if(intval($existingCount) > 0) {
            echo 2;
            exit();
        }

        $rangeQuery = "UPDATE `schedules_set` SET `startDate`='$toEditRange->start',`endDate`='$toEditRange->end' WHERE `setID` = $toEditRange->setID";

        if(mysqli_query($conn, $rangeQuery)) return true;
        else return false;
    }

    function edit($toEditSched){
        require 'connect.php';

        $query = "";

        if(count($toEditSched) == 0) return true;

        foreach($toEditSched as $sched){
            $query .= "UPDATE `schedules` SET `startTime`='$sched->startTime',`stopTime`='$sched->stopTime',`max`='$sched->max', `isBuffer`='$sched->isBuffer' WHERE `scheduleID` = '$sched->schedID'; ";
        }

        if(mysqli_multi_query($conn, $query)){
            return true;
        }
        else{
            return false;
        }
    }

    function add($toAddSched, $setID, $deptID){
        require 'connect.php';

        $counter = 0;
        
        $query = "INSERT INTO `schedules`(`deptID`, `day`, `startTime`, `stopTime`, `max`, `isActive`, `isBuffer`, `setID`) VALUES";

        foreach($toAddSched as $sched){
            if($sched->tempActive == true){
                $query .= " ('$sched->deptID', '$sched->day','$sched->startTime','$sched->stopTime','$sched->max', true,'$sched->isBuffer','$setID'), ";
                $counter++;
            }
        }

        if($counter == 0) return true;

        $query = rtrim($query, ', ');

        if(mysqli_query($conn, $query)) return true;
        else return false;
    }
?>