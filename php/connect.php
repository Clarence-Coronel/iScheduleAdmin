<?php
    if ($_SERVER['REQUEST_METHOD']  != 'POST'){
        header("HTTP/1.0 403 Forbidden");
        echo "Access Denied.";
        exit;
    }
    // $server_name="localhost";
    // $username="u232670259_root";
    // $password="@BX|^PMLy9";
    // $database_name="u232670259_ischedule";

    $server_name="localhost";
    $username="root";
    $password="";
    $database_name="ischedule";

    $conn=mysqli_connect($server_name,$username,$password,$database_name);
    
    //now check the connection
    if(!$conn)
    {
        die("Connection Failed:" . mysqli_connect_error());
    }    
    else{
        $timezone = '+08:00';
        $changeTimezone = "SET time_zone = '$timezone'";
        mysqli_query($conn, $changeTimezone);
    }

?>