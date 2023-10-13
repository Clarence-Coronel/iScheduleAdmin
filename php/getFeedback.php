<?php
    require "connect.php";
    $query = "";
    $sortBy = null;
    
    foreach($_POST as $temp){
        $sortBy = $temp;
    }

    if($sortBy == 0){
        $query = "SELECT * FROM `feedbacks` ORDER BY dateTimeSubmitted ASC LIMIT 200";
    }
    elseif($sortBy == 1){
        $query = "SELECT * FROM `feedbacks` ORDER BY dateTimeSubmitted DESC LIMIT 200";
    }
    elseif($sortBy == 2){
        $query = "SELECT * FROM `feedbacks` ORDER BY rate ASC LIMIT 200";
    }
    elseif($sortBy == 3){
        $query = "SELECT * FROM `feedbacks` ORDER BY rate DESC LIMIT 200";
    }

    $result = mysqli_query($conn,$query);
	$count = mysqli_num_rows($result);

    class feedback {
        public $rate;
        public $content;
        public $dateSubmitted;
    }

    $allFeedback = array();

    if($count > 0){
        while($row = mysqli_fetch_array($result)){
            $tempObj = new feedback();
            
            $tempObj->rate = $row['rate'];
            $tempObj->content = $row['feedbackContent'];
            $tempArr = explode(' ', $row['dateTimeSubmitted']);
            $tempObj->dateSubmitted = $tempArr[0];
    
            array_push($allFeedback, $tempObj); 
        }

        echo json_encode($allFeedback);
    }
    else{
        echo 0;
    }

?>