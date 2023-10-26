<?php
    $dept = null;

    foreach($_POST as $temp){
        $dept = $temp;
    }

    $stats = array();

    array_push($stats, getAppRate($dept));
    array_push($stats, getCompRate($dept));
    array_push($stats, getMissRate($dept));
    array_push($stats, getCancelRate($dept));

    echo json_encode($stats);

    function getAppRate($dept){
        require 'connect.php';

        $primaryQ = "SELECT COUNT(appointmentID) as 'total' from appointments WHERE dateSubmitted BETWEEN (CURDATE() - INTERVAL 30 DAY) AND CURDATE();";
        $secondaryQ = "SELECT COUNT(appointmentID) as 'total' from appointments WHERE dateSubmitted BETWEEN (CURDATE() - INTERVAL 30 DAY) AND CURDATE() AND departmentID = '$dept';";
        
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
        require 'connect.php';

        $primaryQ = "SELECT COUNT(appointmentID) as 'total' from appointments WHERE appointmentDate BETWEEN (CURDATE() - INTERVAL 30 DAY) AND CURDATE() AND departmentID = '$dept';";
        $secondaryQ = "SELECT COUNT(appointmentID) as 'total' from appointments WHERE appointmentDate BETWEEN (CURDATE() - INTERVAL 30 DAY) AND CURDATE() AND appointmentStatus = 'completed' AND departmentID = '$dept';";
        
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
        require 'connect.php';

        $primaryQ = "SELECT COUNT(appointmentID) as 'total' from appointments WHERE appointmentDate BETWEEN (CURDATE() - INTERVAL 30 DAY) AND CURDATE() AND departmentID = '$dept';";
        $secondaryQ = "SELECT COUNT(appointmentID) as 'total' from appointments WHERE appointmentDate BETWEEN (CURDATE() - INTERVAL 30 DAY) AND CURDATE() AND appointmentStatus = 'missed' AND departmentID = '$dept';";
      
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
        require 'connect.php';

        $primaryQ = "SELECT COUNT(appointmentID) as 'total' from appointments WHERE appointmentDate BETWEEN (CURDATE() - INTERVAL 30 DAY) AND CURDATE() AND departmentID = '$dept';";
        $secondaryQ = "SELECT COUNT(appointmentID) as 'total' from appointments WHERE appointmentDate BETWEEN (CURDATE() - INTERVAL 30 DAY) AND CURDATE() AND appointmentStatus = 'cancelled' AND departmentID = '$dept';";
      
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
?>