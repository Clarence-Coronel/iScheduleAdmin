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
        $adminStampQuery = "INSERT INTO `admin_logs`(`username`, `activity`) VALUES ('$username','Rejected ID=\"$appID\" follow-up request')";
        mysqli_query($conn, $adminStampQuery);

        sendResult();

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

    function sendResult(){
        require 'connect.php';
        require 'functions.php';

        $depts = [
            'ENT',
            'Hematology',
            'Internal Medicine',
            'Internal Medicine Clearance',
            'Nephrology',
            'Neurology',
            'OB GYNE New',
            'OB GYNE Old',
            'OB GYNE ROS',
            'Oncology',
            'Pediatric Cardiology',
            'Pediatric Clearance',
            'Pediatric General',
            'Psychiatry New',
            'Psychiatry Old',
            'Surgery',
            'Surgery ROS'
        ];

        global $appID;

        $firstName = null;
        $middleName = null;
        $lastName = null;

        $phone = null;
        $deptID = null;

        $query = "SELECT * FROM appointments WHERE appointmentID = $appID;";
        $result = mysqli_query($conn,$query);
        while($row = mysqli_fetch_array($result)){
            $firstName = $row['firstName'];
            $middleName = $row['middleName'];
            $lastName = $row['lastName'];
            $phone = $row['phone'];
            $deptID = $row['departmentID'];
        }


        $unconvertedName = $lastName . ', ' . $firstName . ' ' . $middleName;
        $name = ucwords(strtolower($unconvertedName));
        $dept = $depts[$deptID-1];

        $msg = "$name kinakalungkot naming sabihing ang iyong scheduled follow-up appointment request sa $dept department ng Bulacan Medical Center ay hindi na-aprubahan. Posibleng ito ay dahil sa malabong picture ng iyong follow-up slip o puno na ang mga slot.";

        sendSMS($phone, $msg);
    }
?>