<?php
    require 'connect.php';
    require 'functions.php';

    $deptID = null;

    foreach($_POST as $temp){
        $deptID = $temp;
    }

    class schedules{
        public $setID;
        public $deptID;
        public $startDate;
        public $endDate;
    }

    $allSchedules = array();

    $query = "SELECT * FROM schedules_set WHERE deptID = $deptID AND isActive = true;";
    $result = mysqli_query($conn,$query);
	$count = mysqli_num_rows($result);

    while($row = mysqli_fetch_array($result)){
        $tempObj = new schedules();

        $tempObj->setID = $row['setID'];
        $tempObj->deptID = $row['deptID'];
        $tempObj->startDate = dateConverter($row['startDate']);
        $tempObj->endDate = dateConverter($row['endDate']);

        array_push($allSchedules, $tempObj);
    }

    echo json_encode($allSchedules);

?>