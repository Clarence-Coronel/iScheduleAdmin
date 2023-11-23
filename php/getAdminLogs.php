<?php 
    require "connect.php";
    require "functions.php";

    $requestPayload = file_get_contents("php://input");

    $object = json_decode($requestPayload);

    $object->username = htmlspecialchars($object->username);
    
    $insertWhere = true;
    
    $query = "SELECT admin_logs.username, admin_logs.activity, admin_logs.logDateTime, admins.adminType FROM `admin_logs` INNER JOIN `admins` ON admin_logs.username = admins.username ";
    

    // Date Range
    if($object->from != "" && $object->to != ""){
        if($insertWhere){
            $query .= "WHERE DATE(admin_logs.logDateTime) >= '$object->from' AND DATE(admin_logs.logDateTime) <= '$object->to' ";
            $insertWhere = false;
        }
        else{
            $query .= "AND DATE(admin_logs.logDateTime) >= '$object->from' AND DATE(admin_logs.logDateTime) <= '$object->to' ";
            $insertWhere = false;
        }
    }
    else if($object->from == "" && $object->to == ""){
        // Wala ilalagay
    }
    else{
        if($object->from != ""){
            if($insertWhere){
                $query .= "WHERE admin_logs.logDateTime >= '$object->from' ";
                $insertWhere = false;
            }
            else{
                $query .= "AND admin_logs.logDateTime >= '$object->from' ";
            }
        }
        else if ($object->to != ""){
            if($insertWhere){
                $query .= "WHERE admin_logs.logDateTime <= '$object->to' ";
                $insertWhere = false;
            }
            else{
                $query .= "AND admin_logs.logDateTime <= '$object->to' ";
            }
        }
    }

    // Activity
    if($object->activity != "all"){
        if($insertWhere){
            $query .= "WHERE activity LIKE '%$object->activity%' ";
            $insertWhere = false;
        }
        else{
            $query .= "AND activity LIKE '%$object->activity%' ";
        }
    }

    // Admin Type
    if($object->adminType != "all"){
        if($insertWhere){
            $query .= "WHERE admins.adminType = '$object->adminType' ";
            $insertWhere = false;
        }
        else{
            $query .= "AND admins.adminType = '$object->adminType' ";
        }
    }

    // Username
    if($object->username != ""){
        if($insertWhere){
            $query .= "WHERE admin_logs.username LIKE  '%$object->username%' ";
            $insertWhere = false;
        }
        else{
            $query .= "AND admin_logs.username LIKE  '%$object->username%' ";
        }
    }

    $result = mysqli_query($conn,$query);
	$count = mysqli_num_rows($result);

    class adminLog {
        public $username;
        public $activity;
        public $adminType;
        public $logDate;
        public $logTime;
    }

    $allAdminLogs = array();

    if($count > 0){

        while($row = mysqli_fetch_array($result)){
            $tempObj = new adminLog();

            $tempObj->username = $row['username'];
            $tempObj->activity = $row['activity'];
            $tempObj->adminType = $row['adminType'];

            $seperatedDateTime = seperateDateTime($row['logDateTime']);

            $tempObj->logDate = dateConverter($seperatedDateTime[0]);

            $tempObj->logTime = timeConverter($seperatedDateTime[1]);


            array_push($allAdminLogs, $tempObj);

            // echo $row['annTitle'];
        }

        // echo $query;
        echo json_encode($allAdminLogs);
    }
    else{
        // echo $query;
        echo 0;
    }

    // $test = new announcement();

    //  $test->title = 'sample title';
    //  $test->body = 'sample body';
    //  $test->datetime = 'sample datetime';

    // echo json_encode($test);
?>