<?php
    // Set session cookie attributes
    session_set_cookie_params([
        'lifetime' => 0,  // Session expires when the browser is closed
        'path' => '/',
        'domain' => '',
        'secure' => true,  // Only send cookies over HTTPS
        'httponly' => true,  // Prevent JavaScript access to the cookie
        'samesite' => 'Strict',  // Improve CSRF protection
    ]);

    session_start();

    require 'connect.php';

   

    $arr = array();

    foreach($_POST as $input){
        array_push($arr, $input);
    }

    $query = "SELECT password FROM `admins` WHERE username='$arr[0]'";
    $result = mysqli_query($conn,$query);
	$count = mysqli_num_rows($result);

    // sa pag register lang ng password chaka ihash otherwise dont
    // $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    if($count > 0){
        while($row = mysqli_fetch_array($result)){

            $encrypted_password = $row['password'];

            if (password_verify($arr[1], $encrypted_password)) {
                echo 'success';
            }
            else{
                echo 'fail';
            }

            // echo $hashedPassword;
        }
    }else{
        echo 'wrong';
    }
?>