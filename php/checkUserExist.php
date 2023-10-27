<?php
    require 'connect.php';

    $username = "";

    foreach($_POST as $temp){
        $username = htmlspecialchars($temp);
    }

    if(isset($username)){
        $query = "SELECT phone from admins WHERE username='$username'";
        $result = mysqli_query($conn,$query);
        $count = mysqli_num_rows($result);
        $row = mysqli_fetch_array($result);

        if($count == 1){     
            if($row['phone'] == ""){
                echo 1;
            }
            else{
                echo $row['phone'];  
            }                    
        }
        else{
            echo 0;
        }
    }
?>