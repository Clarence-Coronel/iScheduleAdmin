<?php
    require "connect.php";
    session_start();
    $loggedIn = $_SESSION['username'];

    $sortBy = null;
    $sortState = null;

    foreach($_POST as $temp){
        if(!isset($sortBy)){
            $sortBy = $temp;
        }
        else{
            $sortState = $temp;
        }
    }
    
    $query = " SELECT `username`, `adminType`, `firstName`, `middleName`, `lastName`, `phone` FROM `admins` WHERE `username` != '$loggedIn' AND `isActive` = true ";

    if($sortBy != "" && $sortState != ""){
        if($sortBy == "name" && $sortState == "1"){
            $query .= "ORDER BY lastName ASC, firstName ASC, middleName ASC ";
        }
        else if($sortBy == "name" && $sortState == "2"){
            $query .= "ORDER BY lastName DESC, firstName DESC, middleName DESC ";
        }

        if($sortBy == "username" && $sortState == "1"){
            $query .= "ORDER BY username ASC ";
        }
        else if($sortBy == "username" && $sortState == "2"){
            $query .= "ORDER BY username DESC ";
        }

        if($sortBy == "phoneNo" && $sortState == "1"){
            $query .= "ORDER BY phone ASC ";
        }
        else if($sortBy == "phoneNo" && $sortState == "2"){
            $query .= "ORDER BY phone DESC ";
        }

        if($sortBy == "adminType" && $sortState == "1"){
            $query .= "ORDER BY adminType ASC ";
        }
        else if($sortBy == "adminType" && $sortState == "2"){
            $query .= "ORDER BY adminType DESC ";
        }
    }


    $result = mysqli_query($conn,$query);
	$count = mysqli_num_rows($result);

    class admin {
        public $username;
        public $adminType;
        public $firstName;
        public $middleName;
        public $lastName;
        public $phone;
    }

    $allAdmin = array();

    if($count > 0){
        while($row = mysqli_fetch_array($result)){
            $tempObj = new admin();
            
            $tempObj->username = $row['username'];
            $tempObj->adminType = $row['adminType'];
            $tempObj->firstName = $row['firstName'];
            $tempObj->middleName = $row['middleName'];
            $tempObj->lastName = $row['lastName'];
            $tempObj->phone = $row['phone'];
    
            array_push($allAdmin, $tempObj); 
        }
        echo json_encode($allAdmin);
    }
    else{
        echo 0;
    }

?>