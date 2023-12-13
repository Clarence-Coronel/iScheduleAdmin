<?php
    require "connect.php";
    $query = "";  
    
    $sortBy = null;
    $sortState = null;

    foreach($_POST as $temp){
        if(!isset($sortBy)){
            $sortBy = $temp;
        }
        else{
            $sortState = $temp;
        }
    }

    $query = "SELECT * FROM `feedbacks` ";

    if($sortBy != null && $sortState != null){
        if($sortBy == "rating" && $sortState == "1"){
            $query .= "ORDER BY rate ASC ";
        }
        else if($sortBy == "rating" && $sortState == "2"){
            $query .= "ORDER BY rate DESC ";
        }

        if($sortBy == "feedback" && $sortState == "1"){
            $query .= "ORDER BY feedbackContent ASC ";
        }
        else if($sortBy == "feedback" && $sortState == "2"){
            $query .= "ORDER BY feedbackContent DESC ";
        }

        if($sortBy == "submitDate" && $sortState == "1"){
            $query .= "ORDER BY dateTimeSubmitted ASC ";
        }
        else if($sortBy == "submitDate" && $sortState == "2"){
            $query .= "ORDER BY dateTimeSubmitted DESC ";
        }
    }

    // echo $query;

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