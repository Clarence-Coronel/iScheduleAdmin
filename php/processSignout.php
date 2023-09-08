<?php

    session_start();
    session_unset();
    session_destroy();
    header('Location: ../page/login.php'); // Redirect to login after logout
    exit;

?>