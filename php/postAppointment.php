<?php

    require 'connect.php';
    
    $requestPayload = file_get_contents("php://input");
    $object = json_decode($requestPayload);
    
    if(!isFull($object->scheduleDate, $object->timeSlot, getMax($object->timeSlot))){
        $query = "INSERT INTO `appointments`(`departmentID`, `firstName`, `middleName`, `lastName`, `sex`, `birthdate`, `phone`, `province`, `municipality`, `barangay`, `patientType`, `appointmentType`, `scheduleID`, `appointmentDate`, `caseNo`, `appointmentStatus`, `consultation`) VALUES ('$object->department', '$object->firstName', '$object->middleName', '$object->lastName', '$object->sex', '$object->dateOfBirth', '$object->phone', '$object->province', '$object->municipality', '$object->barangay', '$object->typeOfPatient', 'admin website', '$object->timeSlot', '$object->scheduleDate', '$object->caseNo', 'active', '$object->consultation')";
        if(mysqli_query($conn, $query)){
            session_start();
            $username = $_SESSION['username'];
            $adminStampQuery = "INSERT INTO `admin_logs`(`username`, `activity`) VALUES ('$username','Scheduled an appointment: $object->lastName, $object->firstName $object->middleName')";
            mysqli_query($conn, $adminStampQuery);
            echo 1;
        }else{
            echo 0;
        }
    }

    function getMax($id){
        require 'connect.php';

        $getMaxQuery = "SELECT `max` FROM schedules WHERE `scheduleID` = '$id';";
        $result = mysqli_query($conn,$getMaxQuery);
        $max = null;

        while($row = mysqli_fetch_array($result)){
            $max = (int)$row['max'];
        }

        return $max;
    }

    function isFull($date, $schedID, $max){
        require 'connect.php';

        $query = "SELECT COUNT(`appointmentID`) AS 'total' FROM `appointments` WHERE `appointmentDate` = '$date' AND `scheduleID` = $schedID;";
        $result = mysqli_query($conn,$query);
        $numPatients = null;

        while($row = mysqli_fetch_array($result)){
            $numPatients = (int)$row['total'];
        }

        if($numPatients >= $max){
            return true;
        }
        else{
            return  false;
        }
    }
?>