<?php
    require 'connect.php';
    session_start();

    $appID = null;
    $schedDate = null;
    $schedID = null;
    $max = null;
    $total = null;

    foreach($_POST as $temp){
        if(!isset($appID)){
            $appID = $temp;
        }else if(!isset($schedDate)){
            $schedDate = $temp;
        }else if(!isset($schedID)){
            $schedID = $temp;
        }
        else{
            $max = $temp;
        }
    }

    $queryTotal = "SELECT COUNT(`appointmentID`) AS 'total' FROM `appointments` WHERE `appointmentStatus` = 'active' AND `appointmentDate` = '$schedDate' AND `scheduleID` = $schedID;";

    $result = mysqli_query($conn,$queryTotal);

    while($row = mysqli_fetch_array($result)){
        $total = (int)$row['total'];
    }

    if($total < $max){
        $query = "UPDATE `appointments` SET `scheduleID`='$schedID',`appointmentDate`='$schedDate', `appointmentStatus`='active' WHERE `appointmentID` = '$appID';";
        if(mysqli_query($conn, $query)){
            $username = $_SESSION['username'];
            $adminStampQuery = "INSERT INTO `admin_logs`(`username`, `activity`) VALUES ('$username','Approved ID=\"$appID\" follow-up request')";
            mysqli_query($conn, $adminStampQuery);

            echo sendResult();

            echo getLink($appID);
        }
        else{
            echo 0;
        }
    }
    else{
        echo 0;
    }

    function getLink($ID){
        require 'connect.php';

        $query = "SELECT `followUpImgLink` from appointments WHERE `appointmentID` = $ID;";
        $result = mysqli_query($conn,$query);
        $link = null;
        while($row = mysqli_fetch_array($result)){
            $link = $row['followUpImgLink'];
        }

        $subQuery = "UPDATE `appointments` SET `followUpImgLink`='' WHERE `appointmentID` = '$ID';";
        mysqli_query($conn, $subQuery);

        return $link;
    }

    function sendResult(){
        require 'connect.php';
        require 'functions.php';

        $depts = [
            'ENT',
            'Hematology',
            'Internal Medicine',
            'Internal Medicine Clearance',
            'Nephrology',
            'Neurology',
            'OB GYNE New',
            'OB GYNE Old',
            'OB GYNE ROS',
            'Oncology',
            'Pediatric Cardiology',
            'Pediatric Clearance',
            'Pediatric General',
            'Psychiatry New',
            'Psychiatry Old',
            'Surgery',
            'Surgery ROS'
        ];

        global $schedID;
        global $appID;
        $startTime = null;
        $stopTime = null;

        $firstName = null;
        $middleName = null;
        $lastName = null;
        $phone = null;
        $deptID = null;
        $appointmentDate = null;

        $query = "SELECT appointments.*, schedules.startTime, schedules.stopTime FROM `appointments` LEFT JOIN `schedules` ON appointments.scheduleID = schedules.scheduleID WHERE appointmentID = $appID;";
        $result = mysqli_query($conn,$query);

        while($row = mysqli_fetch_array($result)){
            $startTime = $row['startTime'];
            $stopTime = $row['stopTime'];
            $firstName = $row['firstName'];
            $middleName = $row['middleName'];
            $lastName = $row['lastName'];
            $phone = $row['phone'];
            $deptID = $row['departmentID'];
            $appointmentDate = $row['appointmentDate'];
        }


        $unconvertedName = $lastName . ', ' . $firstName . ' ' . $middleName;
        $name = ucwords(strtolower($unconvertedName));
        $dept = $depts[$deptID-1];
        $time = timeConverter($startTime) . ' - ' . timeConverter($stopTime);
        $date = dateConverter($appointmentDate);

        $msg = "$name ang iyong scheduled follow-up appointment sa $dept department ng Bulacan Medical Center ay na-aprubahan. Ikaw ay naka schedule sa $date sa oras na $time. ";

        // sendSMS($phone, $msg);
    }
?>