<?php
    require 'connect.php';

    $days = null;
    
    foreach($_POST as $temp){
        $days = $temp;
    }

    class deptCount{
        public $deptID;
        public $count;
    }

    $allDeptStats = array();

    $query = "SELECT departmentID, COUNT(*) AS 'count' FROM appointments WHERE `dateSubmitted` BETWEEN (CURDATE() - INTERVAL $days DAY) AND CURDATE() GROUP BY `departmentID` ORDER BY departmentID ASC;";
    $result = mysqli_query($conn,$query);
	$count = mysqli_num_rows($result);

    if($count > 0){

        while($row = mysqli_fetch_array($result)){
            $tempObj = new deptCount();

            $tempObj->deptID = $row['departmentID'];
            $tempObj->count = $row['count'];

            array_push($allDeptStats, $tempObj);

            // echo $row['annTitle'];
        }

        echo json_encode($allDeptStats);
    }
    else{
        echo 0;
    }

?>