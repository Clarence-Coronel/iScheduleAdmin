<?php
session_start();

 if(isset($_SESSION['authenticated'])){
    echo 1;
 }
 else{
    echo 0;
 }
?>