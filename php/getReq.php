<?php
    require 'connect.php';

    class req {
        public $appID;
        public $deptID;
        public $firstName;
        public $middleName;
        public $lastName;
        public $phone;
        public $imgLink;
    }

    $allReq = array();

    $query = "SELECT `appointmentID`, `departmentID`, `firstName`, `middleName`, `lastName`, `phone`, `followUpImgLink` FROM `appointments` WHERE `appointmentStatus` = 'pending' ORDER BY `dateSubmitted` ASC;";
    $result = mysqli_query($conn,$query);
	$count = mysqli_num_rows($result);

    if($count > 0){
        while($row = mysqli_fetch_array($result)){
            $tempObj = new req();

            $tempObj->appID = $row['appointmentID'];
            $tempObj->deptID = $row['departmentID'];
            $tempObj->firstName = $row['firstName'];
            $tempObj->middleName = $row['middleName'];
            $tempObj->lastName = $row['lastName'];
            $tempObj->phone = $row['phone'];
            $tempObj->imgLink = $row['followUpImgLink'];

            array_push($allReq, $tempObj);
        }
        echo json_encode($allReq);
    }
?>