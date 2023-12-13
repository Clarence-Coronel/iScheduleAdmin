<?php
    require "connect.php";

    $sortBy = null;
    $sortState = null;

    foreach($_POST as $temp){
        if(!isset($sortBy)){
            $sortBy = $temp;
        }else{
            $sortState = $temp;
        }
    }

    $query = "SELECT * FROM block_dates WHERE (`blockDate` >= NOW() AND `isYearly` = 0) OR (`isYearly` = true) ";

    if($sortBy != null && $sortState != null){
        if($sortBy == '"date"' && $sortState == '"1"'){
            $query .= "ORDER BY blockDate ASC ";
        }
        else if($sortBy == '"date"' && $sortState == '"2"'){
            $query .= "ORDER BY blockDate DESC ";
        }    
        
        if($sortBy == '"name"' && $sortState == '"1"'){
            $query .= "ORDER BY blockName ASC ";
        }
        else if($sortBy == '"name"' && $sortState == '"2"'){
            $query .= "ORDER BY blockName DESC ";
        }

        if($sortBy == '"repeats"' && $sortState == '"1"'){
            $query .= "ORDER BY isYearly ASC ";
        }
        else if($sortBy == '"repeats"' && $sortState == '"2"'){
            $query .= "ORDER BY isYearly DESC ";
        }
    }

    $result = mysqli_query($conn,$query);
	$count = mysqli_num_rows($result);

    class blockdate {
        public $id;
        public $date;
        public $dateName;
        public $isYearly;
    }

    $allBlockdate = array();

    if($count > 0){
        while($row = mysqli_fetch_array($result)){
            $tempObj = new blockdate();
            
            $tempObj->id = $row['blockID'];
            $tempObj->date = $row['blockDate'];
            $tempObj->dateName = $row['blockName'];
            $tempObj->isYearly = $row['isYearly'];
    
            array_push($allBlockdate, $tempObj); 
        }
        echo json_encode($allBlockdate);
    }
    else{
        echo 0;
    }

?>