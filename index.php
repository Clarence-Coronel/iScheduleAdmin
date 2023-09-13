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

    <!-- AOS -->
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
    <script defer src="https://unpkg.com/aos@next/dist/aos.js"></script>

    <!-- BOOTSTRAP -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
    
    <!-- GOOGLE API -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
    
    <link rel="stylesheet" href="./css/main.css">

    <script defer src="./js/calendarGenerator.js"></script>
    <script defer src="./js/index.js"></script>
    <script defer src="./js/htmlContent.js"></script>
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
                <div class="greeting" data-click="doNothing">
                    <span class="welcome accBtn" data-click="doNothing">Welcome,&nbsp</span>
                    <span class="account-name accBtn"data-click="doNothing">Juan Reyes Dela Cruz</span>
                </div>
                <div class="role accBtn" data-click="doNothing">Super Admin</div>
                <div class="account-setting">
                    <button class="account-setting__content account-setting__link--myAcc" onclick="generateAccountSettings()">
                        <span class="material-icons-outlined ico-acc">manage_accounts</span>
                        Account Settings
                    </button>
                    <button class="account-setting__content account-setting__btn--logout" style="color:red;" onclick="confirmSignOut()">
                        <span class="material-icons-outlined ico-acc" style="color:red;">logout</span>
                        Sign Out
                    </button> 
                </div>
            </div>
        </div>
    </header>
    <div class="nav-links" data-click="doNothing">
        <div class="nav-item-wrapper">
            <div class="nav-links__item nav-links__title" data-click="doNothing">
                <h1 data-click="doNothing"><span class="material-icons-outlined ico-admin"data-click="doNothing">admin_panel_settings</span>iSchedule <br> Admin Panel</h1>
            </div>
            <button id="0" class="nav-links__item" onclick="generateDashboard();">
                <span class="material-icons-outlined ico-nav">dashboard</span>
                Dashboard
            </button>
            <button id="1" class="nav-links__item" onclick="generateSchedule();">
                <span class="material-icons-outlined ico-nav">calendar_month</span>
                Schedule An Appointment
            </button>
            <button id="2" class="nav-links__item" onclick="generateViewSchedule();">
                <span class="material-icons-outlined ico-nav">book</span>
                View Appointments
            </button>
            <button id="3" class="nav-links__item" onclick="generateRequest();">
                <span class="material-icons-outlined ico-nav">pending_actions</span>
                Follow-Up Requests
            </button>
            <!-- IN HERE ASIDE SA PEDE IEDIT YUNG SCHEDULE PER DEPARTMENT PEDE RIN IBLOCK OR ISARADO ALL INCOMING APPOINTMENTS -->
            <button id="4" class="nav-links__item" onclick="generateScheduling()">
                <span class="material-icons-outlined ico-nav">edit_calendar</span>
                Edit Department Schedules
            </button>
            <div id="5" class="nav-links__item manage-admins" data-click="doNothing" onclick="showManageAdmins();">
                <button class="btn-content" id="btn--manage-admins" data-click="doNothing">
                    <span class="material-icons-outlined ico-nav" data-click="doNothing">groups</span>
                    Manage Admins
                    <span class="material-icons-outlined ico-nav change" data-click="doNothing">chevron_right</span>
                </button>
                <div class="manage-admins__sub-container" style="display: none;">
                    <button class="btn-content manage-admins__sub" onclick="generateAdminLogs();">
                        <span class="material-icons-outlined ico-nav--sub">feed</span>
                        Admin Logs
                    </button>
                    <button class="btn-content manage-admins__sub" onclick="generateAdminList();">
                        <span class="material-icons-outlined ico-nav--sub">format_list_bulleted</span>
                        Admin List
                    </button>
                    <button class="btn-content manage-admins__sub"  onclick="generateCreateAcc();">
                        <span class="material-icons-outlined ico-nav--sub">person_add_alt</span>
                        Create New Admin
                    </button>
                    <!-- <button class="btn-content manage-admins__sub" onclick="generateDisableAcc()">
                        <span class="material-icons-outlined ico-nav--sub">person_remove_alt_1</span>
                        Remove Admin
                    </button> -->
                </div>
            </div>
            <button id="6" class="nav-links__item" onclick="generateWebsiteStatus()">
                <span class="material-icons-outlined ico-nav">medical_services</span>
                Manage Website Status
            </button>
            <button  id="7" class="nav-links__item" onclick="generatePostAnnouncement()">
                <span class="material-icons-outlined ico-nav">campaign</span>
                Post An Announcement
            </button>
            <!-- dito pede mag perma delete ng schedules logs admins data whatever -->
            <button id="8" class="nav-links__item" onclick="generateManageData()">
                <span class="material-icons-outlined ico-nav">storage</span>
                Manage Data
            </button>
            <button id="9" class="nav-links__item" onclick="generateBlockDates()">
                <span class="material-icons-outlined ico-nav">block</span>
                Block Dates
            </button>
            <button id="10" class="nav-links__item" onclick="generateFeedback()">
                <span class="material-icons-outlined ico-nav">chat</span>
                Feedback
            </button>
            <button id="11" class="nav-links__item" onclick="generateEditTutorial()">
                <span class="material-icons-outlined ico-nav">videocam</span>
                Manage Video Tutorial
            </button>
        </div>
    </div>
    <main>
        <!-- Gawin dito sa HTML yung pages then icut then paste the innerHtml -->
        <!-- Yung overflow:auto sa section natin ipasok was sa main -->
        
    </main>
    <button type="button" class="btn btn-primary modal-launcher" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style="display:none">
        Launch static backdrop modal
    </button>
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