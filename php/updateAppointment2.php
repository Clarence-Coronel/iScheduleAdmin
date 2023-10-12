<?php
    require 'connect.php';
    session_start();

    $appID = null;

    foreach($_POST as $temp){
        $appID = $temp;
    }


    $query = "UPDATE `appointments` SET `appointmentStatus`='rejected' WHERE `appointmentID` = '$appID';";
    if(mysqli_query($conn, $query)){
        $username = $_SESSION['username'];
        $adminStampQuery = "INSERT INTO `admin_logs`(`username`, `activity`) VALUES ('$username','Rejected a follow-up request')";
        mysqli_query($conn, $adminStampQuery);

        echo getLink($appID);
    }
    else{
        echo 0;
    }

    function getLink($ID){
        require 'connect.php';

        $query = "SELECT `followUpImgLink` from appointments WHERE `appointmentID` = $ID;";
        $result = mysqli_query($conn,$query);
        $link = null;
        while($row = mysqli_fetch_array($result)){
            $link = $row['followUpImgLink'];
        }

        $subQuery = "UPDATE `appointments` SET `followUpImgLink`='' WHERE `appointmentID` = '$ID';";
        mysqli_query($conn, $subQuery);

        return $link;
    }
?>