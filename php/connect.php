<?php

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

?>