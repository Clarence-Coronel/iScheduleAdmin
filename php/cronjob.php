<?php
    
    clearConfirmApps();
    markMissedApps();
    sendSMSApps();

    function clearConfirmApps(){
        require "connect.php";
        $query = "DELETE FROM `confirmed_appointments` WHERE 1;";

        if(mysqli_query($conn, $query)){
            return true;
        }
        else{
            return false;
        }
    }

    function markMissedApps(){
        require "connect.php";
        $query = "UPDATE `appointments` SET `appointmentStatus`='missed' WHERE DATE(appointmentDate) = DATE(CURDATE() - INTERVAL 1 DAY) AND `appointmentStatus` = 'active';";

        if(mysqli_query($conn, $query)){
            return true;
        }
        else{
            return false;
        }
    }

    function sendSMSApps(){
        
    }

?>