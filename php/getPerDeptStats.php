<?php
    $dept = null;
    $numOfDays = null;

    foreach($_POST as $temp){
        if(!isset($dept)){
            $dept = $temp;
        }
        else{
            $numOfDays = $temp;
        }
    }

    $stats = array();

    array_push($stats, getAppRate($dept));
    array_push($stats, getCompRate($dept));
    array_push($stats, getMissRate($dept));
    array_push($stats, getCancelRate($dept));
    array_push($stats, getMale($dept));
    array_push($stats, getFemale($dept));
    array_push($stats, getAgeCount($dept, 0, 2));
    array_push($stats, getAgeCount($dept, 3, 12));
    array_push($stats, getAgeCount($dept, 13, 18));
    array_push($stats, getAgeCount($dept, 19, 25));
    array_push($stats, getAgeCount($dept, 26, 59));
    array_push($stats, getAgeCount($dept, 60, 200));

    echo json_encode($stats);

    function getAppRate($dept){
        global $numOfDays;
        require 'connect.php';

        $primaryQ = "SELECT COUNT(appointmentID) as 'total' from appointments WHERE dateSubmitted BETWEEN (CURDATE() - INTERVAL $numOfDays DAY) AND CURDATE();";
        $secondaryQ = "SELECT COUNT(appointmentID) as 'total' from appointments WHERE dateSubmitted BETWEEN (CURDATE() - INTERVAL $numOfDays DAY) AND CURDATE() AND departmentID = '$dept';";
        
        $total = null;
        $deptTotal = null;

        $result = mysqli_query($conn,$primaryQ);

        while($row = mysqli_fetch_array($result)){
            $total = $row['total'];
        }

        $result = mysqli_query($conn,$secondaryQ);

        while($row = mysqli_fetch_array($result)){
            $deptTotal = $row['total'];
        }

        try {
            return ($deptTotal / $total) * 100;
        } catch (\Throwable $th) {
            return 0;
        }

    }

    function getCompRate($dept){
        global $numOfDays;
        require 'connect.php';

        $primaryQ = "SELECT COUNT(appointmentID) as 'total' from appointments WHERE appointmentDate BETWEEN (CURDATE() - INTERVAL $numOfDays DAY) AND CURDATE() AND departmentID = '$dept';";
        $secondaryQ = "SELECT COUNT(appointmentID) as 'total' from appointments WHERE appointmentDate BETWEEN (CURDATE() - INTERVAL $numOfDays DAY) AND CURDATE() AND appointmentStatus = 'completed' AND departmentID = '$dept';";
        
        $total = null;
        $deptTotal = null;

        $result = mysqli_query($conn,$primaryQ);

        while($row = mysqli_fetch_array($result)){
            $total = $row['total'];
        }

        $result = mysqli_query($conn,$secondaryQ);

        while($row = mysqli_fetch_array($result)){
            $deptTotal = $row['total'];
        }

        try {
            return ($deptTotal / $total) * 100;
        } catch (\Throwable $th) {
            return 0;
        }

    }

    function getMissRate($dept){
        global $numOfDays;
        require 'connect.php';

        $primaryQ = "SELECT COUNT(appointmentID) as 'total' from appointments WHERE appointmentDate BETWEEN (CURDATE() - INTERVAL $numOfDays DAY) AND CURDATE() AND departmentID = '$dept';";
        $secondaryQ = "SELECT COUNT(appointmentID) as 'total' from appointments WHERE appointmentDate BETWEEN (CURDATE() - INTERVAL $numOfDays DAY) AND CURDATE() AND appointmentStatus = 'missed' AND departmentID = '$dept';";
      
        $total = null;
        $deptTotal = null;

        $result = mysqli_query($conn,$primaryQ);

        while($row = mysqli_fetch_array($result)){
            $total = $row['total'];
        }

        $result = mysqli_query($conn,$secondaryQ);

        while($row = mysqli_fetch_array($result)){
            $deptTotal = $row['total'];
        }

        try {
            return ($deptTotal / $total) * 100;
        } catch (\Throwable $th) {
            return 0;
        }

    }

    function getCancelRate($dept){
        global $numOfDays;
        require 'connect.php';

        $primaryQ = "SELECT COUNT(appointmentID) as 'total' from appointments WHERE dateSubmitted BETWEEN (CURDATE() - INTERVAL $numOfDays DAY) AND CURDATE() AND departmentID = '$dept';";
        $secondaryQ = "SELECT COUNT(appointmentID) as 'total' from appointments WHERE dateSubmitted BETWEEN (CURDATE() - INTERVAL $numOfDays DAY) AND CURDATE() AND appointmentStatus = 'cancelled' AND departmentID = '$dept';";
      
        $total = null;
        $deptTotal = null;

        $result = mysqli_query($conn,$primaryQ);

        while($row = mysqli_fetch_array($result)){
            $total = $row['total'];
        }

        $result = mysqli_query($conn,$secondaryQ);

        while($row = mysqli_fetch_array($result)){
            $deptTotal = $row['total'];
        }

        try {
            return ($deptTotal / $total) * 100;
        } catch (\Throwable $th) {
            return 0;
        }

    }

    function getMale($dept){
        global $numOfDays;
        require 'connect.php';

        $male = null;

        $primaryQ = "SELECT COUNT(appointmentID) as 'total' FROM `appointments` WHERE dateSubmitted BETWEEN (CURDATE() - INTERVAL $numOfDays DAY) AND CURDATE() AND `sex` = 'm' AND departmentID = $dept;";

        $result = mysqli_query($conn,$primaryQ);

        while($row = mysqli_fetch_array($result)){
            $male = $row['total'];
        }

        return $male;
    }

    function getFemale($dept){
        global $numOfDays;
        require 'connect.php';

        $female = null;

        $secondaryQ = "SELECT COUNT(appointmentID) as 'total' FROM `appointments` WHERE dateSubmitted BETWEEN (CURDATE() - INTERVAL $numOfDays DAY) AND CURDATE() AND `sex` = 'f' AND departmentID = $dept;";

        $result = mysqli_query($conn,$secondaryQ);

        while($row = mysqli_fetch_array($result)){
            $female = $row['total'];
        }

        return $female;
    }

    function getAgeCount($dept, $start, $end){
        global $numOfDays;

        require 'connect.php';

        $total = null;

        $primaryQ = "SELECT COUNT(*) AS total FROM appointments WHERE departmentID = $dept AND dateSubmitted BETWEEN (CURDATE() - INTERVAL 50 DAY) AND CURDATE() AND TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) BETWEEN $start AND $end ";

        $result = mysqli_query($conn,$primaryQ);

        while($row = mysqli_fetch_array($result)){
            $total = $row['total'];
        }

        return $total;
    }
?>