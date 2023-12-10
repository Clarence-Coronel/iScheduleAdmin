<?php
    require 'connect.php';
    require 'functions.php';

    $sortBy = null;
    $sortState = null;

    foreach($_POST as $temp){
        if(!isset($sortBy)){
            $sortBy = $temp;
        }else{
            $sortState = $temp;
        }
    }

    class req {
        public $appID;
        public $deptID;
        public $firstName;
        public $middleName;
        public $lastName;
        public $phone;
        public $dateSubmitted;
        public $imgLink;
    }

    $allReq = array();

    $query = "SELECT `appointmentID`, `departmentID`, `firstName`, `middleName`, `lastName`, `phone`, `followUpImgLink`, `dateSubmitted` FROM `appointments` WHERE `appointmentStatus` = 'pending' ";
    
    if($sortBy != "" && $sortState != ""){
        if($sortBy == "name" && $sortState == "1"){
            $query .= "ORDER BY lastName ASC, firstName ASC, middleName ASC ";
        }
        else if($sortBy == "name" && $sortState == "2"){
            $query .= "ORDER BY lastName DESC, firstName DESC, middleName DESC ";
        }

        if($sortBy == "dept" && $sortState == "1"){
            $query .= "ORDER BY departmentID ASC ";
        }
        else if($sortBy == "dept" && $sortState == "2"){
            $query .= "ORDER BY departmentID DESC ";
        }

        if($sortBy == "phoneNo" && $sortState == "1"){
            $query .= "ORDER BY phone ASC ";
        }
        else if($sortBy == "phoneNo" && $sortState == "2"){
            $query .= "ORDER BY phone DESC ";
        }

        if($sortBy == "dateSubmitted" && $sortState == "1"){
            $query .= "ORDER BY dateSubmitted ASC ";
        }
        else if($sortBy == "dateSubmitted" && $sortState == "2"){
            $query .= "ORDER BY dateSubmitted DESC ";
        }
    }    

    // echo $query;
    
    
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
            $tempObj->dateSubmitted = dateConverter($row['dateSubmitted']);

            array_push($allReq, $tempObj);
        }
        echo json_encode($allReq);
    }
?>