<?php
    require "connect.php";
    require "functions.php";

    $requestPayload = file_get_contents("php://input");

    $object = json_decode($requestPayload);

    $whereInserted = false;

    $query = "SELECT * FROM appointments ";

    if($object->deptID != "all"){
        if(!$whereInserted){
            $query .= "WHERE departmentID = $object->deptID ";
            $whereInserted = true;
        }
    }

    if($object->appDateFrom != "" && $object->appDateTo != ""){
        if(!$whereInserted){
            $query .= "WHERE appointmentDate BETWEEN '$object->appDateFrom' AND '$object->appDateTo'";
            $whereInserted = true;
        }
        else{
            $query .= "AND appointmentDate BETWEEN '$object->appDateFrom' AND '$object->appDateTo'";
        }
    }
    else if($object->appDateFrom != "" || $object->appDateTo != ""){
        if($object->appDateFrom == ""){
            if(!$whereInserted){
                $query .= "WHERE ('$object->appDateTo' >= appointmentDate) ";
                $whereInserted = true;
            }
            else{
                $query .= "AND ('$object->appDateTo' >= appointmentDate) ";
            }
        }
        else if($object->appDateTo == ""){
            if(!$whereInserted){
                $query .= "WHERE ('$object->appDateFrom' <= appointmentDate) ";
                $whereInserted = true;
            }
            else{
                $query .= "AND ('$object->appDateFrom' <= appointmentDate) ";
            }
        }
    }

    if($object->timeslotID != "all"){
        if(!$whereInserted){
            $query .= "WHERE scheduleID = $object->timeslotID ";
            $whereInserted = true;
        }
        else{
            $query .= "AND scheduleID = $object->timeslotID ";
        }
    }

    if($object->sex != "all"){
        if(!$whereInserted){
            $query .= "WHERE sex = '$object->sex' ";
            $whereInserted = true;
        }
        else{
            $query .= "AND sex = '$object->sex' ";
        }
    }

    if($object->province == "bulacan"){
        if(!$whereInserted){
            $query .= "WHERE province = '$object->province' ";
            $whereInserted = true;
        }
        else{
            $query .= "AND province = '$object->province' ";
        }
    }
    else if($object->province == "other"){
        if(!$whereInserted){
            $query .= "WHERE province != 'bulacan' ";
            $whereInserted = true;
        }
        else{
            $query .= "AND province != 'bulacan' ";
        }
    }


    if($object->municipality != "all" && $object->municipality != "other"){
        if(!$whereInserted){
            $query .= "WHERE municipality = '$object->municipality' ";
            $whereInserted = true;
        }
        else{
            $query .= "AND municipality = '$object->municipality' ";
        }
    }

    if($object->barangay != "all" && $object->barangay != "other"){
        if(!$whereInserted){
            $query .= "WHERE barangay = '$object->barangay' ";
            $whereInserted = true;
        }
        else{
            $query .= "AND barangay = '$object->barangay' ";
        }
    }

    echo $query;

?>