<?php
    require 'connect.php';

    $date= null;

    foreach($_POST as $temp){
        $date = $temp;
    }

    $query = "SELECT * FROM `block_dates` WHERE blockDate = '$date'";
    $result = mysqli_query($conn,$query);
    $count = mysqli_num_rows($result);

    if($count > 0){
        echo 1;
    }
    else{
        echo 0;
    }
?>