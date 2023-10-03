<?php
    require 'connect.php';

    $date= null;

    foreach($_POST as $temp){
        $date = $temp;
    }

    $query = "SELECT * FROM `block_dates` WHERE DATE_FORMAT(blockDate, '%m-%d') = DATE_FORMAT('$date', '%m-%d')";
    $result = mysqli_query($conn,$query);
    $count = mysqli_num_rows($result);

    if($count > 0){
        echo 1;
    }
    else{
        echo 0;
    }
?>