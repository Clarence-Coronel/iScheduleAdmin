<?php
    require "connect.php";
    session_start();
    $loggedIn = $_SESSION['username'];

    $query = " SELECT `username`, `adminType`, `firstName`, `middleName`, `lastName`, `phone` FROM `admins` WHERE `username` != '$loggedIn' AND `isActive` = true ORDER BY lastName ASC;";
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