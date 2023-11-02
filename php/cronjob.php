<?php
    clearConfirmApps();
    markMissedApps();

    function clearConfirmApps(){
        require "connect.php";
        $query = "DELETE FROM `confirmed_appointments` WHERE 1;";

        mysqli_query($conn, $query);
    }

    function markMissedApps(){
        require "connect.php";
        $query = "UPDATE `appointments` SET `appointmentStatus`='missed' WHERE DATE(appointmentDate) = DATE(CURDATE() - INTERVAL 1 DAY) AND `appointmentStatus` = 'active';";

        mysqli_query($conn, $query);
    }

?>