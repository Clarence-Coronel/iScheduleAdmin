<?php
    require 'connect.php';
    require 'functions.php';

    class appointment {
        public $appointmentID;
        public $departmentID;
        public $firstName;
        public $middleName;
        public $lastName;
        public $sex;
        public $birthDate;
        public $phone;
        public $province;
        public $municipality;
        public $barangay;
        public $patientType;
        public $appointmentType;
        public $startTime;
        public $stopTime;
        public $appointmentDate;
        public $caseNo;
        public $appointmentStatus;
        public $cancelReason;
        public $dateSubmitted;
        public $scheduleID;
        public $rawAppDate;
        public $consultation;
    }

    $selectedDept = null;
    $queryType = null;
    $query = null;

    foreach($_POST as $temp){
        if(!isset($selectedDept)) $selectedDept = $temp;
        else $queryType = $temp;
    }

    $currentDate = date("Y-m-d");
    // $currentDate = "2023-12-12";
    $allApp = array();

    if($queryType == 'today') $query = "SELECT appointments.*, schedules.scheduleID, schedules.startTime, schedules.stopTime FROM appointments INNER JOIN schedules ON appointments.scheduleID = schedules.scheduleID WHERE appointments.appointmentStatus = 'active' AND appointments.appointmentDate = '$currentDate' AND appointments.departmentID = '$selectedDept' ORDER BY schedules.startTime ASC;";
    else if ($queryType == 'completed') $query = "SELECT appointments.*, schedules.scheduleID, schedules.startTime, schedules.stopTime FROM appointments INNER JOIN schedules ON appointments.scheduleID = schedules.scheduleID  WHERE appointments.appointmentStatus = 'completed' AND appointments.departmentID = '$selectedDept' AND `appointmentDate` BETWEEN (CURDATE() - INTERVAL 30 DAY) AND CURDATE() ORDER BY `appointmentDate` DESC, schedules.startTime ASC;";
    else if ($queryType == 'cancelled') $query = "SELECT appointments.*, schedules.scheduleID, schedules.startTime, schedules.stopTime FROM appointments LEFT JOIN schedules ON appointments.scheduleID = schedules.scheduleID  WHERE appointments.appointmentStatus = 'cancelled' AND appointments.departmentID = '$selectedDept' AND appointments.dateSubmitted BETWEEN (CURDATE() - INTERVAL 30 DAY) AND CURDATE() ORDER BY appointments.dateSubmitted DESC, schedules.startTime ASC;";

    $result = mysqli_query($conn,$query);
	$count = mysqli_num_rows($result);

    if($count > 0){
        while($row = mysqli_fetch_array($result)){
            $tempObj = new appointment();

            $tempObj->appointmentID = $row['appointmentID'];
            $tempObj->departmentID = $row['departmentID'];
            $tempObj->firstName = $row['firstName'];
            $tempObj->middleName = $row['middleName'];
            $tempObj->lastName = $row['lastName'];
            $tempObj->sex = $row['sex'];
            $tempObj->birthdate = dateConverter($row['birthdate']);
            $tempObj->phone = $row['phone'];
            $tempObj->province = $row['province'];
            $tempObj->municipality = $row['municipality'];
            $tempObj->barangay = $row['barangay'];
            $tempObj->patientType = $row['patientType'];
            $tempObj->appointmentType = $row['appointmentType'];
            $tempObj->consultation = $row['consultation'];
            
            if($row['startTime'] != null){
                $tempObj->startTime = timeConverter($row['startTime']);
            }
            else{
                $tempObj->startTime = "";
            }
            if($row['stopTime'] != null){
                $tempObj->stopTime = timeConverter($row['stopTime']);
            }
            else{
                $tempObj->stopTime = "";
            }
            if($row['appointmentDate'] != null){
                $tempObj->appointmentDate = dateConverter($row['appointmentDate']);
                $tempObj->rawAppDate = $row['appointmentDate'];
            }
            else{
                $tempObj->appointmentDate = "";
                $tempObj->rawAppDate = "";
            }

            if($row['scheduleID'] != null){
                $tempObj->scheduleID = $row['scheduleID'];
            }
            else{
                $tempObj->scheduleID = "";
            }

            $tempObj->cancelReason = $row['cancelReason'];
            $tempObj->caseNo = $row['caseNo'];
            $tempObj->appointmentStatus = $row['appointmentStatus'];

            $tempObj->dateSubmitted = dateConverter($row['dateSubmitted']);

            array_push($allApp, $tempObj);
        }
        
        session_start();
        $username = $_SESSION['username'];
        $adminStampQuery = "INSERT INTO `admin_logs`(`username`, `activity`) VALUES ('$username','Viewed appointments')";
        mysqli_query($conn, $adminStampQuery);

        echo json_encode($allApp);
    }
    else {
        echo 0;
    }
?>