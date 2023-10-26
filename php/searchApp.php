<?php
    require "connect.php";
    require "functions.php";

    session_start();
    $username = $_SESSION['username'];

    $input = null;

    foreach($_POST as $temp){
        $input = htmlspecialchars($temp);
    }

    $query = "SELECT appointments.*, schedules.startTime, schedules.stopTime FROM appointments INNER JOIN schedules ON appointments.scheduleID = schedules.scheduleID WHERE CONCAT(lastName, ', ', firstName, ' ', middleName, phone, province, municipality, barangay, patientType, appointmentType, caseNo, appointmentStatus, schedules.startTime, schedules.stopTime) LIKE '%$input%' ORDER BY lastName ASC;";
    $result = mysqli_query($conn,$query);
	$count = mysqli_num_rows($result);

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
    }

    $allApp = array();

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
            
            try {
                $tempObj->startTime = timeConverter($row['startTime']);
                $tempObj->stopTime = timeConverter($row['stopTime']);
                $tempObj->appointmentDate = dateConverter($row['appointmentDate']);
            } catch (\Throwable $th) {
                $tempObj->startTime = "";
                $tempObj->stopTime = "";
                $tempObj->appointmentDate = "";
            }

            $tempObj->cancelReason = $row['cancelReason'];
            $tempObj->caseNo = $row['caseNo'];
            $tempObj->appointmentStatus = $row['appointmentStatus'];

            $tempObj->dateSubmitted = dateConverter($row['dateSubmitted']);
            
            array_push($allApp, $tempObj);
        }
        $username = $_SESSION['username'];
        $adminStampQuery = "INSERT INTO `admin_logs`(`username`, `activity`) VALUES ('$username','Viewed appointments')";
        mysqli_query($conn, $adminStampQuery);

        echo json_encode($allApp);
    }
    else {
        echo 0;
    }

?>