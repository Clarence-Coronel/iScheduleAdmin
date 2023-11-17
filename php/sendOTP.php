<?php
    require 'functions.php';

    $phone = null;
    $OTP = null;

    foreach($_POST as $temp){
        if(!isset($phone)){
            $phone = $temp;
        }
        else{
            $OTP = $temp;
        }
    }

    $msg = "iSchedule: Ang iyong One-Time Password (OTP) ay $OTP. ";

    // sendSMS($phone, $msg);
?>