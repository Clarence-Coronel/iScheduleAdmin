<?php
    require 'functions.php';
    require 'connect.php';

    class appointment {
        public $departmentID;
        public $firstName;
        public $middleName;
        public $lastName;
        public $phone;
        public $startTime;
        public $stopTime;
        public $appointmentDate;
    }

    $allApp = array();

    $query = "SELECT appointments.*, schedules.startTime, schedules.stopTime FROM `appointments` LEFT JOIN `schedules` ON appointments.scheduleID = schedules.scheduleID WHERE DATE(appointmentDate) = DATE_ADD(CURDATE(), INTERVAL 1 DAY);";

    $result = mysqli_query($conn,$query);
    $count = mysqli_num_rows($result);

    if($count > 0){
        while($row = mysqli_fetch_array($result)){
            $tempObj = new appointment();     
            $tempObj->departmentID = $row['departmentID'];
            $tempObj->firstName = $row['firstName'];
            $tempObj->lastName = $row['lastName'];
            $tempObj->middleName = $row['middleName'];
            $tempObj->phone = $row['phone'];
            $tempObj->startTime = $row['startTime'];
            $tempObj->stopTime = $row['stopTime'];
            $tempObj->appointmentDate = $row['appointmentDate'];

            array_push($allApp, $tempObj);
        }
    }

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
    
    foreach($allApp as $app){

        $unconvertedName = $app->lastName . ', ' . $app->firstName . ' ' . $app->middleName;
        $name = ucwords(strtolower($unconvertedName));
        $phone = $tempObj->phone;
        $dept = $depts[$tempObj->departmentID-1];
        $time = timeConverter($tempObj->startTime) . ' - ' . timeConverter($tempObj->stopTime);
        $date = dateConverter($tempObj->appointmentDate);

        $msg = "$name ito ay isang paalala para sa iyong scheduled appointment sa $dept department ng Bulacan Medical Center bukas; $date sa oras na $time.";
        // \n\nIto ay isang automated message; huwag mag reply. removed
        sendSMS($phone, $msg);
    }
?>