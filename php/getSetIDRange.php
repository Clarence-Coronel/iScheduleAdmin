<?php
    require 'connect.php';

    $setID= null;

    foreach($_POST as $temp){
        $setID = $temp;
    }

    $arr = array();
    $start = null;
    $end = null;

    $query = "SELECT startDate, endDate FROM schedules_set WHERE setID = '$setID';";
    $result = mysqli_query($conn, $query);
    
    while($row = mysqli_fetch_array($result)){
        $start = $row['startDate'];
        $end = $row['endDate'];
    }

    array_push($arr, $start);
    array_push($arr, $end);

    echo json_encode($arr);

?>