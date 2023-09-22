<?php
    require "connect.php";


    $query = "SELECT * FROM block_dates ORDER BY blockDate ASC;";
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