<?php
    // Set session cookie attributes
    session_set_cookie_params([
        'lifetime' => 1,  // Session expires when the browser is closed
        'path' => '/',
        'domain' => '',
        'secure' => true,  // Only send cookies over HTTPS
        'httponly' => true,  // Prevent JavaScript access to the cookie
        'samesite' => 'Strict',  // Improve CSRF protection
    ]);
    ini_set('session.gc_maxlifetime', 86400);
    session_set_cookie_params(86400);
    
    

    require 'connect.php';

    $arr = array();

    foreach($_POST as $input){
        array_push($arr, $input);
    }

    $convertedUsername = htmlspecialchars($arr[0]);

    $query = "SELECT * FROM `admins` WHERE username='$convertedUsername'";
    $result = mysqli_query($conn,$query);
	$count = mysqli_num_rows($result);

    // sa pag register lang ng password chaka ihash otherwise dont
    // $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    if($count == 1){
        while($row = mysqli_fetch_array($result)){

            $encrypted_password = $row['password'];

            if (password_verify($arr[1], $encrypted_password)) {
                
                //Di gumagana

                // server should keep session data for AT LEAST 18 hours
                // ini_set('session.gc_maxlifetime', 64800);

                // each client should remember their session id for EXACTLY 18 hours
                // session_set_cookie_params(64800);
                session_start();
                
                $_SESSION['authenticated'] = true;
                $_SESSION['username'] = $row['username'];
                $_SESSION['firstName'] = $row['firstName'];
                $_SESSION['middleName'] = $row['middleName'];
                $_SESSION['lastName'] = $row['lastName'];
                $_SESSION['adminType'] = $row['adminType'];
                $_SESSION['phone'] = $row['phone'];
                
                session_regenerate_id(true);

                echo 1;
                exit;
            }
            else{
                echo 0;
            }
        }
    }
    else{
        // dito bagsak if mali username pero di na need sabihin siguro
        echo 0;
    }
?>