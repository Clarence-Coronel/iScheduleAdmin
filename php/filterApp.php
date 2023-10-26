<?php 
    session_start();
    require "connect.php";
    require "functions.php";
    
    $requestPayload = file_get_contents("php://input");
    $object = json_decode($requestPayload);

    $query = "SELECT appointments.*, schedules.startTime, schedules.stopTime FROM `appointments` INNER JOIN `schedules` ON appointments.scheduleID = schedules.scheduleID";
    $firstConditionDone = false;
    
    if($object->dept != ""){
        $Q_dept = " WHERE appointments.departmentID = '$object->dept' ";
        $query .= $Q_dept;
        $firstConditionDone = true;
    }
    if($object->appointmentDate != ""){
        if($firstConditionDone){
            $query .= " AND ";
        }
        else{
            $query .= " WHERE ";
        }
        $Q_appDate = " appointments.appointmentDate = '$object->appointmentDate' ";
        $query .= $Q_appDate;
        $firstConditionDone = true;
    }
    if($object->scheduleID != ""){
        if($firstConditionDone){
            $query .= " AND ";
        }
        else{
            $query .= " WHERE ";
        }
        $Q_scheduleID = " appointments.scheduleID = '$object->scheduleID' ";
        $query .= $Q_scheduleID;
        $firstConditionDone = true;
    }
    if($object->sex != ""){
        if($firstConditionDone){
            $query .= " AND ";
        }
        else{
            $query .= " WHERE ";
        }
        $Q_sex = " appointments.sex = '$object->sex' ";
        $query .= $Q_sex;
        $firstConditionDone = true;
    }
    if($object->barangay != ""){
        if($firstConditionDone){
            $query .= " AND ";
        }
        else{
            $query .= " WHERE ";
        }
        $Q_barangay = " appointments.barangay = '$object->barangay' ";
        $query .= $Q_barangay;
        $firstConditionDone = true;
    }
    if($object->municipality != ""){
        if($firstConditionDone){
            $query .= " AND ";
        }
        else{
            $query .= " WHERE ";
        }
        $Q_municipality = " appointments.municipality = '$object->municipality' ";
        $query .= $Q_municipality;
        $firstConditionDone = true;
    }
    if($object->province != ""){
        if($firstConditionDone){
            $query .= " AND ";
        }
        else{
            $query .= " WHERE ";
        }
        $Q_province = " appointments.province = '$object->province' ";
        $query .= $Q_province;
        $firstConditionDone = true;
    }
    if($object->patientType != ""){
        if($firstConditionDone){
            $query .= " AND ";
        }
        else{
            $query .= " WHERE ";
        }
        $Q_patientType = " appointments.patientType = '$object->patientType' ";
        $query .= $Q_patientType;
        $firstConditionDone = true;
    }
    if($object->status != ""){
        if($firstConditionDone){
            $query .= " AND ";
        }
        else{
            $query .= " WHERE ";
        }
        $Q_status = " appointments.appointmentStatus = '$object->status' ";
        $query .= $Q_status;
        $firstConditionDone = true;
    }
    if($object->sortBy != ""){
        if($object->sortBy == "0"){
            $sortBy = " appointments.lastName ASC";
        }
        else if($object->sortBy == "1"){
            $sortBy = " appointments.lastName DESC";
        }
        else if($object->sortBy == "2"){
            $sortBy = " appointments.appointmentDate DESC";
        }
        else if($object->sortBy == "3"){
            $sortBy = " appointments.appointmentDate ASC";
        }
        else if($object->sortBy == "4"){
            $sortBy = " appointments.appointmentDate DESC";
        }
        else if($object->sortBy == "5"){
            $sortBy = " appointments.appointmentDate ASC";
        }

        $Q_sortBy = " ORDER BY $sortBy; ";
        $query .= $Q_sortBy;
    }
    
    
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