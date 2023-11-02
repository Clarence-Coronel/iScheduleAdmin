<?php
    require __DIR__ . './../twilio-php-main/src/Twilio/autoload.php';
    use Twilio\Rest\Client;

    function seperateDateTime($datetime){
        $delimiter = ' ';
        return $seperated = explode($delimiter, $datetime);
    }

    function dateConverter($date){
        $delimiter = '-';
        $seperated = explode($delimiter, $date);

        $monthNames = array("January", "February", "March","April", "May", "June","July", "August", "September","October", "November", "December"); 

        $year = $seperated[0];
        $month = $seperated[1]-1;
        $day = $seperated[2];

        return "{$monthNames[$month]} {$day}, {$year}";
    }

    function timeConverter($time){
        $delimiter = ':';
        $seperated = explode($delimiter, $time);

        if((int)$seperated[0] >= 12){
            if((int)$seperated[0] > 12){
                $seperated[0] = (int)$seperated[0] - 12;
            }
            
            return ltrim("{$seperated[0]}:{$seperated[1]} PM", "0");
        }
        else{
            if((int)$seperated[0] == 0){
                $seperated[0] = 1;
            }
            return ltrim("{$seperated[0]}:{$seperated[1]} AM", "0");
        }  
    }

    function sanitizePhoneNumber($phone) {
        // Remove spaces
        $phone = str_replace(' ', '', $phone);
    
        // Replace leading "0" with "+63"
        if (substr($phone, 0, 1) === '0') {
            $phone = '+63' . substr($phone, 1);
        }
    
        return $phone;
    }

    function sendSMS($phone, $msg){

        $properPhone = sanitizePhoneNumber($phone);
        // Your Account SID and Auth Token from twilio.com/console
        // To set up environmental variables, see http://twil.io/secure
        $account_sid = 'AC58b1ba1d4370b882b85c87cc51438d65';
        
        $auth_token = "ae71e169f43ff4c42cf699ef804cce87";
        // In production, these should be environment variables. E.g.:
        // $auth_token = $_ENV["TWILIO_AUTH_TOKEN"]
    
        // A Twilio number you own with SMS capabilities
        $twilio_number = "+12293634847";
    
        $client = new Client($account_sid, $auth_token);
        $client->messages->create(
            // Where to send a text message (your cell phone?)
            $properPhone,
            array(
                'from' => $twilio_number,
                'body' => $msg
            )
        );
    }
?>