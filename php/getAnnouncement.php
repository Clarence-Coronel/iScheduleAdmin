<?php 
    require "connect.php";
    require "functions.php";
    
    $query = "SELECT `annID`, `annTitle`, `annDateTime`, `author` FROM `announcements` ORDER BY annDateTime DESC LIMIT 20";
    $result = mysqli_query($conn,$query);
	$count = mysqli_num_rows($result);

    class announcement {
        public $id;
        public $title;
        public $datePosted;
        public $timePosted;
        public $author;
    }

    $allAnnouncement = array();

    if($count > 0){

        while($row = mysqli_fetch_array($result)){
            $tempObj = new announcement();

            $tempObj->id = $row['annID'];
            $tempObj->title = htmlspecialchars_decode($row['annTitle']);

            $seperatedDateTime = seperateDateTime($row['annDateTime']);

            $tempObj->datePosted = dateConverter($seperatedDateTime[0]);

            $tempObj->timePosted = timeConverter($seperatedDateTime[1]);

            $tempObj->author = $row['author'];

            array_push($allAnnouncement, $tempObj);

            // echo $row['annTitle'];
        }

        echo json_encode($allAnnouncement);
    }
    else{
        echo 0;
    }
?>