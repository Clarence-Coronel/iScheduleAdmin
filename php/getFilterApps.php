<?php
    require "connect.php";
    require "functions.php";

    $requestPayload = file_get_contents("php://input");

    $object = json_decode($requestPayload);

    $whereInserted = false;

    $query = "SELECT * FROM appointments INNER JOIN `schedules` ON appointments.scheduleID = schedules.scheduleID ";

    if($object->deptID != "all"){
        if(!$whereInserted){
            $query .= "WHERE departmentID = $object->deptID ";
            $whereInserted = true;
        }
    }

    if($object->appDateFrom != "" && $object->appDateTo != ""){
        if(!$whereInserted){
            $query .= "WHERE appointmentDate BETWEEN '$object->appDateFrom' AND '$object->appDateTo' ";
            $whereInserted = true;
        }
        else{
            $query .= "AND appointmentDate BETWEEN '$object->appDateFrom' AND '$object->appDateTo' ";
        }
    }
    else if($object->appDateFrom != "" || $object->appDateTo != ""){
        if($object->appDateFrom == ""){
            if(!$whereInserted){
                $query .= "WHERE ('$object->appDateTo' >= appointmentDate) ";
                $whereInserted = true;
            }
            else{
                $query .= "AND ('$object->appDateTo' >= appointmentDate) ";
            }
        }
        else if($object->appDateTo == ""){
            if(!$whereInserted){
                $query .= "WHERE ('$object->appDateFrom' <= appointmentDate) ";
                $whereInserted = true;
            }
            else{
                $query .= "AND ('$object->appDateFrom' <= appointmentDate) ";
            }
        }
    }

    if($object->timeslotID != "all"){
        if(!$whereInserted){
            $query .= "WHERE scheduleID = $object->timeslotID ";
            $whereInserted = true;
        }
        else{
            $query .= "AND scheduleID = $object->timeslotID ";
        }
    }

    if($object->sex != "all"){
        if(!$whereInserted){
            $query .= "WHERE sex = '$object->sex' ";
            $whereInserted = true;
        }
        else{
            $query .= "AND sex = '$object->sex' ";
        }
    }

    if($object->province == "bulacan"){
        if(!$whereInserted){
            $query .= "WHERE province = '$object->province' ";
            $whereInserted = true;
        }
        else{
            $query .= "AND province = '$object->province' ";
        }
    }
    else if($object->province == "other"){
        if(!$whereInserted){
            $query .= "WHERE province != 'bulacan' ";
            $whereInserted = true;
        }
        else{
            $query .= "AND province != 'bulacan' ";
        }
    }


    if($object->municipality != "all" && $object->municipality != "other"){
        if(!$whereInserted){
            $query .= "WHERE municipality = '$object->municipality' ";
            $whereInserted = true;
        }
        else{
            $query .= "AND municipality = '$object->municipality' ";
        }
    }

    if($object->barangay != "all" && $object->barangay != "other"){
        if(!$whereInserted){
            $query .= "WHERE barangay = '$object->barangay' ";
            $whereInserted = true;
        }
        else{
            $query .= "AND barangay = '$object->barangay' ";
        }
    }

    if($object->patientType != "all"){
        if(!$whereInserted){
            $query .= "WHERE patientType = '$object->patientType' ";
            $whereInserted = true;
        }
        else{
            $query .= "AND patientType = '$object->patientType' ";
        }
    }

    if($object->caseNo != ""){
        if(!$whereInserted){
            $query .= "WHERE caseNo = '$object->caseNo' ";
            $whereInserted = true;
        }
        else{
            $query .= "AND caseNo = '$object->caseNo' ";
        }
    }

    if($object->visitType !=  "all"){
        $visit = intval($object->visitType);
        if(!$whereInserted){
            $query .= "WHERE isFollowUp = '$visit' ";
            $whereInserted = true;
        }
        else{
            $query .= "AND isFollowUp = '$visit' ";
        }
    }

    if($object->schedVia !=  "all"){
        if(!$whereInserted){
            $query .= "WHERE appointmentType = '$object->schedVia' ";
            $whereInserted = true;
        }
        else{
            $query .= "AND appointmentType = '$object->schedVia' ";
        }
    }

    if($object->status !=  "all"){
        if(!$whereInserted){
            $query .= "WHERE appointmentStatus = '$object->status' ";
            $whereInserted = true;
        }
        else{
            $query .= "AND appointmentStatus = '$object->status' ";
        }
    }

    if($object->lastName !=  ""){
        if(!$whereInserted){
            $query .= "WHERE lastName LIKE '%$object->lastName%' ";
            $whereInserted = true;
        }
        else{
            $query .= "AND lastName LIKE '%$object->lastName%' ";
        }
    }

    if($object->firstName !=  ""){
        if(!$whereInserted){
            $query .= "WHERE firstName LIKE '%$object->firstName%' ";
            $whereInserted = true;
        }
        else{
            $query .= "OR firstName LIKE '%$object->firstName%' ";
        }
    }

    if($object->middleName !=  ""){
        if(!$whereInserted){
            $query .= "WHERE middleName LIKE '%$object->middleName%' ";
            $whereInserted = true;
        }
        else{
            $query .= "OR middleName LIKE '%$object->middleName%' ";
        }
    }

    if($object->subDateFrom != "" && $object->subDateTo != ""){
        if(!$whereInserted){
            $query .= "WHERE dateSubmitted BETWEEN '$object->subDateFrom' AND '$object->subDateTo' ";
            $whereInserted = true;
        }
        else{
            $query .= "AND dateSubmitted BETWEEN '$object->subDateFrom' AND '$object->subDateTo' ";
        }
    }
    else if($object->subDateFrom != "" || $object->subDateTo != ""){
        if($object->subDateFrom == ""){
            if(!$whereInserted){
                $query .= "WHERE ('$object->subDateTo' >= dateSubmitted) ";
                $whereInserted = true;
            }
            else{
                $query .= "AND ('$object->subDateTo' >= dateSubmitted) ";
            }
        }
        else if($object->subDateTo == ""){
            if(!$whereInserted){
                $query .= "WHERE ('$object->subDateFrom' <= dateSubmitted) ";
                $whereInserted = true;
            }
            else{
                $query .= "AND ('$object->subDateFrom' <= dateSubmitted) ";
            }
        }
    }

    if($object->sortBy != "" && $object->sortState != ""){
        if($object->sortBy == "id" && $object->sortState == "1"){
            $query .= "ORDER BY appointments.appointmentID ASC ";
        }
        else if($object->sortBy == "id" && $object->sortState == "2"){
            $query .= "ORDER BY appointments.appointmentID DESC ";
        }

        else if($object->sortBy == "name" && $object->sortState == "1"){
            $query .= "ORDER BY appointments.lastName ASC, appointments.firstName ASC, appointments.middleName ASC ";
        }
        else if($object->sortBy == "name" && $object->sortState == "2"){
            $query .= "ORDER BY appointments.lastName DESC, appointments.firstName DESC, appointments.middleName DESC ";
        }

        else if($object->sortBy == "refNo" && $object->sortState == "1"){
            $query .= "ORDER BY appointments.appointmentDate ASC, appointments.departmentID ASC, appointments.scheduleID ASC, appointments.appointmentID ASC ";
        }
        else if($object->sortBy == "refNo" && $object->sortState == "2"){
            $query .= "ORDER BY appointments.appointmentDate DESC, appointments.departmentID DESC, appointments.scheduleID DESC, appointments.appointmentID DESC ";
        }

        else if($object->sortBy == "dept" && $object->sortState == "1"){
            $query .= "ORDER BY appointments.departmentID ASC ";
        }
        else if($object->sortBy == "dept" && $object->sortState == "2"){
            $query .= "ORDER BY appointments.departmentID DESC ";
        }

        else if($object->sortBy == "consultation" && $object->sortState == "1"){
            $query .= "ORDER BY appointments.consultation ASC ";
        }
        else if($object->sortBy == "consultation" && $object->sortState == "2"){
            $query .= "ORDER BY appointments.consultation DESC ";
        }

        else if($object->sortBy == "appDate" && $object->sortState == "1"){
            $query .= "ORDER BY appointments.appointmentDate ASC ";
        }
        else if($object->sortBy == "appDate" && $object->sortState == "2"){
            $query .= "ORDER BY appointments.appointmentDate DESC ";
        }

        else if($object->sortBy == "slot" && $object->sortState == "1"){
            $query .= "ORDER BY schedules.startTime ASC, schedules.stopTime ASC ";
        }
        else if($object->sortBy == "slot" && $object->sortState == "2"){
            $query .= "ORDER BY schedules.startTime DESC, schedules.stopTime DESC ";
        }

        else if($object->sortBy == "status" && $object->sortState == "1"){
            $query .= "ORDER BY appointments.appointmentStatus ASC ";
        }
        else if($object->sortBy == "status" && $object->sortState == "2"){
            $query .= "ORDER BY appointments.appointmentStatus DESC ";
        }

        else if($object->sortBy == "schedVia" && $object->sortState == "1"){
            $query .= "ORDER BY appointments.appointmentType ASC ";
        }
        else if($object->sortBy == "schedVia" && $object->sortState == "2"){
            $query .= "ORDER BY appointments.appointmentType DESC ";
        }

        else if($object->sortBy == "sex" && $object->sortState == "1"){
            $query .= "ORDER BY appointments.sex ASC ";
        }
        else if($object->sortBy == "sex" && $object->sortState == "2"){
            $query .= "ORDER BY appointments.sex DESC ";
        }

        else if($object->sortBy == "birthdate" && $object->sortState == "1"){
            $query .= "ORDER BY appointments.birthdate ASC ";
        }
        else if($object->sortBy == "birthdate" && $object->sortState == "2"){
            $query .= "ORDER BY appointments.birthdate DESC ";
        }

        else if($object->sortBy == "phoneNo" && $object->sortState == "1"){
            $query .= "ORDER BY appointments.phone ASC ";
        }
        else if($object->sortBy == "phoneNo" && $object->sortState == "2"){
            $query .= "ORDER BY appointments.phone DESC ";
        }

        else if($object->sortBy == "address" && $object->sortState == "1"){
            $query .= "ORDER BY appointments.province ASC, appointments.municipality ASC, appointments.barangay ASC ";
        }
        else if($object->sortBy == "address" && $object->sortState == "2"){
            $query .= "ORDER BY appointments.province DESC, appointments.municipality DESC, appointments.barangay DESC ";
        }

        else if($object->sortBy == "patientType" && $object->sortState == "1"){
            $query .= "ORDER BY appointments.patientType ASC ";
        }
        else if($object->sortBy == "patientType" && $object->sortState == "2"){
            $query .= "ORDER BY appointments.patientType DESC ";
        }
        
        else if($object->sortBy == "caseNo" && $object->sortState == "1"){
            $query .= "ORDER BY appointments.caseNo ASC ";
        }
        else if($object->sortBy == "caseNo" && $object->sortState == "2"){
            $query .= "ORDER BY appointments.caseNo DESC ";
        }

        else if($object->sortBy == "dateSubmitted" && $object->sortState == "1"){
            $query .= "ORDER BY appointments.dateSubmitted ASC ";
        }
        else if($object->sortBy == "dateSubmitted" && $object->sortState == "2"){
            $query .= "ORDER BY appointments.dateSubmitted DESC ";
        }

        else if($object->sortBy == "reasonCancelled" && $object->sortState == "1"){
            $query .= "ORDER BY appointments.cancelReason ASC ";
        }
        else if($object->sortBy == "reasonCancelled" && $object->sortState == "2"){
            $query .= "ORDER BY appointments.cancelReason DESC ";
        }
    }

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
        
        // session_start();
        // $username = $_SESSION['username'];
        // $adminStampQuery = "INSERT INTO `admin_logs`(`username`, `activity`) VALUES ('$username','Viewed appointments')";
        // mysqli_query($conn, $adminStampQuery);

        echo json_encode($allApp);
    }
    else {
        echo 0;
    }

?>