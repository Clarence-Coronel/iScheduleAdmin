<?php 
    require "connect.php";
    require "functions.php";
    
    $input = null;

    foreach($_POST as $temp){
        $input = htmlspecialchars($temp);
    }

    $query = "SELECT admin_logs.username, admin_logs.activity, admin_logs.logDateTime, admins.adminType FROM `admin_logs` INNER JOIN `admins` ON admin_logs.username = admins.username WHERE CONCAT(admin_logs.username, admin_logs.activity, admin_logs.logDateTime, admins.adminType) LIKE '%$input%' ORDER BY logDateTime DESC;";
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

?>