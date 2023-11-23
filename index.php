<?php
    session_start();

    if(!isset($_SESSION['authenticated'])){
        header("Location: ./page/login.php");
    }
    else{
        echo "
            <script> 
                const signedInAdmin = {
                    username: '" . $_SESSION['username'] ."',
                    adminType: '" . $_SESSION['adminType'] ."',
                    phone: '" . $_SESSION['phone'] ."',
                    firstName: '" . $_SESSION['firstName'] ."',
                    middleName: '" . $_SESSION['middleName'] ."',
                    lastName: '" . $_SESSION['lastName'] ."',
                }
            </script>
        ";
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="icon" type="image/x-icon" href="./imgs/mediclogo.png">
    
    <!-- AOS -->
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
    <script defer src="https://unpkg.com/aos@next/dist/aos.js"></script>

    <!-- BOOTSTRAP -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
    
    <!-- GOOGLE API -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <link rel="stylesheet" href="./css/main.css">

    <script type="module" src="./js/deleteImg.js"></script>
    <script defer src="./js/barangaySelector.js"></script> 
    <script defer src="./js/htmlContent.js"></script>
    <script defer src="./js/index.js"></script>
    <script defer src="./js/calendarGenerator.js"></script>
    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.3.0/exceljs.min.js"></script>
    <title>iSchedule Admin</title>
</head>
<body>
    <div class="darken-screen"></div>
    <header>
        <div class="wrapper">
            <div class="header__left">
                <button class="header-btn" data-click="doNothing">
                    <div class="header-btn burger-ico" data-click="doNothing"></div>
                </button>
            </div>
            <div class="header__right">
                <div class="greeting">
                    <span class="welcome accBtn" data-click="doNothingAcc">Welcome,&nbsp</span>
                    <span class="account-name accBtn"data-click="doNothingAcc">Juan Reyes Dela Cruz</span>
                </div>
                <div class="role accBtn" data-click="doNothingAcc">Super Admin</div>
                <div class="account-setting">
                    <button class="account-setting__content account-setting__link--myAcc" onclick="generateAccountSettings()">
                        <span class="material-icons-outlined ico-acc">manage_accounts</span>
                        Account Settings
                    </button>
                    <button class="account-setting__content account-setting__btn--logout" onclick="confirmSignOut()">
                        <span class="material-icons-outlined ico-acc">logout</span>
                        Sign Out
                    </button> 
                </div>
            </div>
        </div>
    </header>
    <div class="nav-links" data-click="doNothing">
        <div class="nav-item-wrapper" data-click="doNothing">
            <div class="nav-links__item nav-links__title" data-click="doNothing">
                <h1 data-click="doNothing">
                    <span class="material-icons ico-admin"data-click="doNothing">admin_panel_settings</span>
                    <div class="txt-container">
                        <span class="main-txt">iSchedule</span>
                        <span class="sub-txt">Admin Panel</span> 
                    </div>
                </h1>
            </div>
            <div class="btns-container">
                
            </div>
        </div>
    </div>
    <main>
        <!-- Gawin dito sa HTML yung pages then icut then paste the innerHtml -->
        <!-- Yung overflow:auto sa section natin ipasok was sa main -->

        <!-- GUMAMIT KA OFFSET SA MYSQL IF WANT MO KONWARI SA ISANG TABLE 20ROWS LANG TAS MAY NEXT TAS GENERATE ANOTHER 20 ROWS -->
        <div class="page-header">Home / View Appointments</div>
        <section class="view-schedule">
            <div class="view-schedule__content" data-aos="fade-right" data-aos-duration="500">
                <div class="view-schedule__header">
                    <div class="filter-holder">
                        <label for="dept">Department</label>
                        <select class="form-select" aria-label="Default select example"  id="dept"">
                            <option value="0" selected>All</option>
                            <option value="1">ENT</option>
                            <option value="2">Hematology</option>
                            <option value="3">Internal Medicine</option>
                            <option value="4">Internal Medicine Clearance</option>
                            <option value="5">Nephrology</option>
                            <option value="6">Neurology</option>
                            <option value="7">OB GYNE New</option>
                            <option value="8">OB GYNE Old</option>
                            <option value="9">OB GYNE ROS</option>
                            <option value="10">Oncology</option>
                            <option value="11">Pediatric Cardiology</option>
                            <option value="12">Pediatric Clearance</option>
                            <option value="13">Pediatric General</option>
                            <option value="14">Psychiatry New</option>
                            <option value="15">Psychiatry Old</option>
                            <option value="16">Surgery</option>
                            <option value="17">Surgery ROS</option>
                        </select>
                    </div>
                    <div class="filter-holder">
                        <label for="">Appointment Date From</label>
                        <input type="date" name="" id="">
                    </div>
                    <div class="filter-holder">
                        <label for="">Appointment Date To</label>
                        <input type="date" name="" id="">
                    </div>
                    <div class="filter-holder">
                        <label for="dept">Time Slot</label>
                        <select class="form-select" aria-label="Default select example" >
                            <option value="" selected>-</option>
                            <!-- <option value="all" selected>All</option> -->
                            <option value="0">9:20 AM - 10:20 AM</option>
                            <option value="0">9:20 AM - 10:20 AM</option>
                        </select>
                    </div>
                    <div class="filter-holder">
                        <label for="dept">Sex</label>
                        <select class="form-select" aria-label="Default select example" >
                            <option value="all" selected>All</option>
                            <option value="m">Male</option>
                            <option value="f">Female</option>
                        </select>
                    </div>
                    <div class="filter-holder">
                        <label for="dept">Province</label>
                        <select class="form-select" aria-label="Default select example" >
                            <option value="all" selected>All</option>
                            <option value="m">Bulacan</option>
                            <option value="f">Outside Bulacan</option>
                        </select>
                    </div>
                    <div class="filter-holder">
                        <label for="dept">Municipality</label>
                        <select class="form-select" aria-label="Default select example" >
                            <option value="all" selected>All</option>
                            <option value="m">Angat</option>
                            <option value="f">Plaridel</option>
                            <option value="m">Baliuag</option>
                            <option value="f">San Jose del Monte</option>
                        </select>
                    </div>
                    <div class="filter-holder">
                        <label for="dept">Barangay</label>
                        <select class="form-select" aria-label="Default select example" >
                            <option value="all">All</option>
                            <option value="m">Banga I</option>
                            <option value="f">Banga II</option>
                        </select>
                    </div>
                    <div class="filter-holder">
                        <label for="dept">Patient Type</label>
                        <select class="form-select" aria-label="Default select example" >
                            <option value="all" selected>All</option>
                            <option value="old">Old</option>
                            <option value="new">New</option>
                        </select>
                    </div>
                    <div class="filter-holder">
                        <label for="">Case #</label>
                        <input type="text" id="caseNo">
                    </div>
                    <div class="filter-holder">
                        <label for="dept">Visit Type</label>
                        <select class="form-select" aria-label="Default select example" >
                            <option value="all" selected>All</option>
                            <option value="">Initial Visit</option>
                            <option value="">Follow-Up Visit</option>
                        </select>
                    </div>
                    <div class="filter-holder">
                        <label for="dept">Scheduled Through</label>
                        <select class="form-select" aria-label="Default select example" >
                            <option value="all" selected>All</option>
                            <option value="">Patient Website</option>
                            <option value="">Admin Website</option>
                        </select>
                    </div>
                    <div class="filter-holder">
                        <label for="dept">Status</label>
                        <select class="form-select" aria-label="Default select example" >
                            <option value="all" selected>All</option>
                            <option value="new">Cancelled</option>
                            <option value="old">Completed</option>
                            <option value="new">Missed</option>
                            <option value="old">Pending</option>
                            <option value="new">Rejected</option>
                            <option value="old">Scheduled</option>
                        </select>
                    </div>
                    <div class="filter-holder">
                        <label for="dept">Last Name</label>
                        <input type="text">
                    </div>
                    <div class="filter-holder">
                        <label for="dept">First Name</label>
                        <input type="text">
                    </div>
                    <div class="filter-holder">
                        <label for="dept">Middle Name</label>
                        <input type="text">
                    </div>
                    <div class="filter-holder">
                        <label for="">Submitted Date From</label>
                        <input type="date" name="" id="">
                    </div>
                    <div class="filter-holder">
                        <label for="">Submitted Date To</label>
                        <input type="date" name="" id="">
                    </div>
                </div>             
                <div class="view-schedule__table">
                    <div class="table-container">
                        <table class="schedule-table" id="schedule-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Full Name</th>
                                    <th>Reference #</th>
                                    <th>Department</th>
                                    <th>Consultation</th>
                                    <th>Appointment Date</th>
                                    <th>Slot</th>
                                    <th>Status</th>
                                    <th>Scheduled Through</th>
                                    <th>Sex</th>
                                    <th>Birthdate</th>
                                    <th>Phone #</th>
                                    <th>Address</th>
                                    <th>Patient Type</th>
                                    <th>Case #</th>
                                    <th>Submitted On</th>
                                    <th>Reason Cancelled</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td colspan="15" class="empty">No Department Selected</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="cmds-container">
                    <button type="button" class="export" data-table="schedule-table">Export Table</button>
                    <div class="table-nav">
                        <button id="prevButton"><< Previous</button>
                        <span id="pageNum">1</span>
                        <button id="nextButton">Next >></button>
                    </div>
                </div>
            </div>
        </section>
    </main>
    <button type="button" class="btn btn-primary modal-launcher" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style="display:none">
        Launch static backdrop modal
    </button>
    <input type="text" id="linkToDelete" style="display: none;" value="">
    <button id="deleteImg-btn" style="display: none;"></button>
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> 
            </div>
            <div class="modal-body">
            ...
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary negative" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary positive" data-bs-dismiss="modal">Understood</button>
            </div>
        </div>
        </div>
    </div>
</body>
</html>