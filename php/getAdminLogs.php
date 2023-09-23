<?php 
    require "connect.php";
    
    $query = "SELECT admin_logs.username, admin_logs.activity, admin_logs.logDateTime, admins.adminType FROM `admin_logs` INNER JOIN `admins` ON admin_logs.username = admins.username ORDER BY logDateTime DESC LIMIT 100";
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

    // $test = new announcement();

    //  $test->title = 'sample title';
    //  $test->body = 'sample body';
    //  $test->datetime = 'sample datetime';

    // echo json_encode($test);

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