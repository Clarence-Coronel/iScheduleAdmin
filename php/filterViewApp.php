<?php

    session_start();
    require "connect.php";
    require "functions.php";

    $requestPayload = file_get_contents("php://input");
    $object = json_decode($requestPayload);

    $insertedWhere = false;

    $query = "SELECT * FROM `appointments` ";

    if($object->deptID != "all"){
        $query .= "WHERE deptID = '$object->deptID' ";
        
        $insertedWhere = true;
    }
    // if($object->appDateFrom != "" || $object->appDateTo != ""){

    // }

    

?>