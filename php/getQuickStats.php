<?php    
    class stat{
        public $id;
        public $num;
    }

    $numOfDays = null;

    foreach($_POST as $temp){
        $numOfDays = $temp;
    }

    $statCollection = array();

    for ($i = 0; $i < 6; $i++) {
        switch ($i) {
            case 0:
                $temp = new stat();
                $temp->id = 0;
                $temp->num = getRecentApps();
                array_push($statCollection, $temp);
                break;
            case 1:
                $temp = new stat();
                $temp->id = 1;
                $temp->num = getRecentComp();
                array_push($statCollection, $temp);
                break;
            case 2:
                $temp = new stat();
                $temp->id = 2;
                $temp->num = getRecentCancel();
                array_push($statCollection, $temp);
                break;
            case 3:
                $temp = new stat();
                $temp->id = 3;
                $temp->num = getRecentAppsMiss();
                array_push($statCollection, $temp);
                break;
            case 4:
                $temp = new stat();
                $temp->id = 4;
                $temp->num = getRecentAvgFB();
                array_push($statCollection, $temp);
                break;
            case 5:
                $temp = new stat();
                $temp->id = 5;
                $temp->num = getRecentAdminActs();
                array_push($statCollection, $temp);
                break;
          }
    }

    echo json_encode($statCollection);

    function getRecentApps(){
        global $numOfDays;
        require 'connect.php';
        $stat = null;

        $query = "SELECT COUNT(appointmentID) as 'total' from appointments WHERE dateSubmitted BETWEEN (CURDATE() - INTERVAL $numOfDays DAY) AND CURDATE();";
        $result = mysqli_query($conn,$query);

        while($row = mysqli_fetch_array($result)){
            $stat = $row['total'];
        }

        if(isset($stat)){
            return $stat;
        }
        else{
            return 0;
        }
    }

    function getRecentComp(){
        global $numOfDays;
        require 'connect.php';
        $stat = null;
        
        $query = "SELECT COUNT(appointmentID) as 'total' from appointments WHERE dateSubmitted BETWEEN (CURDATE() - INTERVAL $numOfDays DAY) AND CURDATE() AND appointmentStatus = 'completed';";
        $result = mysqli_query($conn,$query);

        while($row = mysqli_fetch_array($result)){
            $stat = $row['total'];
        }

        if(isset($stat)){
            return $stat;
        }
        else{
            return 0;
        }
    }

    function getRecentCancel(){
        global $numOfDays;
        require 'connect.php';
        $stat = null;
        
        $query = "SELECT COUNT(appointmentID) as 'total' from appointments WHERE dateSubmitted BETWEEN (CURDATE() - INTERVAL $numOfDays DAY) AND CURDATE() AND appointmentStatus = 'cancelled';";
        $result = mysqli_query($conn,$query);

        while($row = mysqli_fetch_array($result)){
            $stat = $row['total'];
        }
        
        if(isset($stat)){
            return $stat;
        }
        else{
            return 0;
        }
    }

    function getRecentAppsMiss(){
        global $numOfDays;
        require 'connect.php';
        $stat = null;
        
        $query = "SELECT COUNT(appointmentID) as 'total' from appointments WHERE dateSubmitted BETWEEN (CURDATE() - INTERVAL $numOfDays DAY) AND CURDATE() AND appointmentStatus = 'missed';";
        $result = mysqli_query($conn,$query);

        while($row = mysqli_fetch_array($result)){
            $stat = $row['total'];
        }

        if(isset($stat)){
            return $stat;
        }
        else{
            return 0;
        }
    }

    function getRecentAvgFB(){
        global $numOfDays;
        require 'connect.php';
        $stat = null;
        $numFeedbacks = null;
        
        $query1 = "SELECT COUNT(*) as 'total' from feedbacks WHERE dateTimeSubmitted BETWEEN (CURDATE() - INTERVAL $numOfDays DAY) AND CURDATE();";
        $result1 = mysqli_query($conn,$query1);

        while($row = mysqli_fetch_array($result1)){
            $numFeedbacks = $row['total'];
        }

        if($numFeedbacks == 0) return "-";

        $query2 = "SELECT ROUND(AVG(`rate`), 2) as 'total' from feedbacks WHERE dateTimeSubmitted BETWEEN (CURDATE() - INTERVAL $numOfDays DAY) AND CURDATE();";
        $result2 = mysqli_query($conn,$query2);

        while($row = mysqli_fetch_array($result2)){
            $stat = $row['total'];
        }

        if(isset($stat)){
            return $stat;
        }
        else{
            return 0;
        }
    }

    function getRecentAdminActs(){
        global $numOfDays;
        require 'connect.php';
        $stat = null;
        
        $query = "SELECT COUNT(adminLogsID) as 'total' from admin_logs WHERE logDateTime BETWEEN (CURDATE() - INTERVAL $numOfDays DAY) AND CURDATE();";
        $result = mysqli_query($conn,$query);

        while($row = mysqli_fetch_array($result)){
            $stat = $row['total'];
        }
        
        if(isset($stat)){
            return $stat;
        }
        else{
            return 0;
        }
        
    }


?>