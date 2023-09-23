<?php 
    session_start();
    require "connect.php";
    
    $requestPayload = file_get_contents("php://input");
    $object = json_decode($requestPayload);

    $query = "SELECT admin_logs.username, admin_logs.activity, admin_logs.logDateTime, admins.adminType FROM `admin_logs` INNER JOIN `admins` ON admin_logs.username = admins.username";
    $date = null;
    $activity = null;
    $adminType = null;
    $sortBy = null;
    $firstConditionDone = false;
    
    if($object->date != ""){
        $date = $object->date;
        $Q_date = " WHERE DATE(admin_logs.logDateTime) = '$date' ";
        $query .= $Q_date;
        $firstConditionDone = true;
    }
    if($object->activity != ""){
        if($firstConditionDone){
            $query .= " AND ";
        }
        else{
            $query .= " WHERE ";
        }
        $activity = $object->activity;
        $Q_activity = " activity LIKE '%$activity%' ";
        $query .= $Q_activity;
        $firstConditionDone = true;
    }
    if($object->adminType != ""){
        if($firstConditionDone){
            $query .= " AND ";
        }
        else{
            $query .= " WHERE ";
        }
        $adminType = $object->adminType;
        $Q_adminType = " admins.adminType = '$adminType' ";
        $query .= $Q_adminType;
        $firstConditionDone = true;
    }
    if($object->sortBy != ""){
        if($object->sortBy == "0"){
            $sortBy = " admin_logs.username ASC";
        }
        else if($object->sortBy == "1"){
            $sortBy = " admin_logs.username DESC";
        }
        else if($object->sortBy == "2"){
            $sortBy = " admin_logs.activity";
        }
        else if($object->sortBy == "3"){
            $sortBy = " admins.adminType";
        }
        else if($object->sortBy == "4"){
            $sortBy = " admin_logs.logDateTime DESC";
        }
        else if($object->sortBy == "5"){
            $sortBy = " admin_logs.logDateTime ASC";
        }

        $Q_sortBy = " ORDER BY $sortBy; ";
        $query .= $Q_sortBy;
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

        echo json_encode($allAdminLogs);
    }
    else{
        echo 0;
    }

    function seperateDateTime($datetime){
        $delimiter = ' ';
        return $seperated = explode($delimiter, $datetime);
    }

    function dateConverter($date){
        $delimiter = '-';
        $seperated = explode($delimiter, $date);

        $monthNames = array("January", "February", "March","April", "May", "June","July", "August", "September","October", "November", "December"); 

        $year = $seperated[0];
        $month = $seperated[1]-1;
        $day = $seperated[2];

        return "{$monthNames[$month]} {$day}, {$year}";
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