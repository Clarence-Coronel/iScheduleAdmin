<?php
    require 'connect.php';

    $setID = null;

    foreach($_POST as $temp){
        $setID = $temp;
    }

    $query = "UPDATE `schedules_set` SET `isActive`= '0' WHERE `setID` = $setID;";

    if(mysqli_query($conn, $query)) echo 1;
    else echo 0;

?>