<?php
    require 'connect.php';
    require 'functions.php';

    $deptID = null;
    $query = null;

    foreach($_POST as $temp){
        $deptID = $temp;
    }

    class schedSet {
        public $setID;
        public $deptID;
        public $startDate;
        public $endDate;
    }

    $allSchedSet = array();

    if($deptID == "all"){
        $query = "SELECT * FROM schedules_set WHERE `isActive` = true ORDER BY startDate DESC;";
    }
    else $query = "SELECT * FROM schedules_set WHERE `isActive` = true AND deptID = '$deptID' ORDER BY startDate DESC;";

    $result = mysqli_query($conn,$query);
	$count = mysqli_num_rows($result);

    if($count > 0){

        while($row = mysqli_fetch_array($result)){
            $tempObj = new schedSet();

            $tempObj->setID = $row['setID'];
            $tempObj->deptID = $row['deptID'];

            $tempObj->startDate = dateConverter($row['startDate']);
            $tempObj->endDate = dateConverter($row['endDate']);


            array_push($allSchedSet, $tempObj);

            // echo $row['annTitle'];
        }

        echo json_encode($allSchedSet);
    }
    else{
        echo 0;
    }

?>