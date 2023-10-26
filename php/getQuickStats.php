<?php    
    class stat{
        public $id;
        public $num;
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
        require 'connect.php';
        $stat = null;

        $query = "SELECT COUNT(appointmentID) as 'total' from appointments WHERE dateSubmitted BETWEEN (CURDATE() - INTERVAL 30 DAY) AND CURDATE();";
        $result = mysqli_query($conn,$query);

        while($row = mysqli_fetch_array($result)){
            $stat = $row['total'];
        }

        return $stat;
    }

    function getRecentComp(){
        require 'connect.php';
        $stat = null;
        
        $query = "SELECT COUNT(appointmentID) as 'total' from appointments WHERE dateSubmitted BETWEEN (CURDATE() - INTERVAL 30 DAY) AND CURDATE() AND appointmentStatus = 'completed';";
        $result = mysqli_query($conn,$query);

        while($row = mysqli_fetch_array($result)){
            $stat = $row['total'];
        }

        return $stat;
    }

    function getRecentCancel(){
        require 'connect.php';
        $stat = null;
        
        $query = "SELECT COUNT(appointmentID) as 'total' from appointments WHERE dateSubmitted BETWEEN (CURDATE() - INTERVAL 30 DAY) AND CURDATE() AND appointmentStatus = 'cancelled';";
        $result = mysqli_query($conn,$query);

        while($row = mysqli_fetch_array($result)){
            $stat = $row['total'];
        }
        
        return $stat;
    }

    function getRecentAppsMiss(){
        require 'connect.php';
        $stat = null;
        
        $query = "SELECT COUNT(appointmentID) as 'total' from appointments WHERE dateSubmitted BETWEEN (CURDATE() - INTERVAL 30 DAY) AND CURDATE() AND appointmentStatus = 'missed';";
        $result = mysqli_query($conn,$query);

        while($row = mysqli_fetch_array($result)){
            $stat = $row['total'];
        }

        return $stat;
    }

    function getRecentAvgFB(){
        require 'connect.php';
        $stat = null;
        
        $query = "SELECT ROUND(AVG(`rate`), 2) as 'total' from feedbacks;";
        $result = mysqli_query($conn,$query);

        while($row = mysqli_fetch_array($result)){
            $stat = $row['total'];
        }

        return $stat;
    }

    function getRecentAdminActs(){
        require 'connect.php';
        $stat = null;
        
        $query = "SELECT COUNT(adminLogsID) as 'total' from admin_logs WHERE logDateTime BETWEEN (CURDATE() - INTERVAL 30 DAY) AND CURDATE();";
        $result = mysqli_query($conn,$query);

        while($row = mysqli_fetch_array($result)){
            $stat = $row['total'];
        }
        
        return $stat;
    }


?>