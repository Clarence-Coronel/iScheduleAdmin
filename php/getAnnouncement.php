<?php 
    require "connect.php";
    require "functions.php";

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
    
    $query = "SELECT `annID`, `annTitle`, `annDateTime`, `author` FROM `announcements` ";

    if($sortBy != null && $sortState != null){
        if($sortBy == "title" && $sortState == "1"){
            $query .= "ORDER BY annTitle ASC ";
        }
        else if($sortBy == "title" && $sortState == "2"){
            $query .= "ORDER BY annTitle DESC ";
        }

        if($sortBy == "dateTime" && $sortState == "1"){
            $query .= "ORDER BY annDateTime ASC ";
        }
        else if($sortBy == "dateTime" && $sortState == "2"){
            $query .= "ORDER BY annDateTime DESC ";
        }

        if($sortBy == "author" && $sortState == "1"){
            $query .= "ORDER BY author ASC ";
        }
        else if($sortBy == "author" && $sortState == "2"){
            $query .= "ORDER BY author DESC ";
        }
    }

    $query .= "LIMIT 20 ";

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