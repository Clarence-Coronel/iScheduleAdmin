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
    <script defer src="./js/htmlContent.js"></script>
    <script defer src="./js/index.js"></script>
    <script defer src="./js/barangaySelector.js"></script>
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
        </div>
    </div>
    <main>
        <!-- Gawin dito sa HTML yung pages then icut then paste the innerHtml -->
        <!-- Yung overflow:auto sa section natin ipasok was sa main -->
        <section class="schedule" data-aos="fade-right" data-aos-duration="500">
            <div class="schedule__content">
                <div class="schedule__form schedule__partA">
                    <div class="schedule__input-container">
                        <label for="">Department</label>
                        <select class="form-select" aria-label="Default select example"  id="dept" onchange="generateSched()">
                                <option value="" selected hidden disabled>Select a Department</option>
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
                    <div class="schedule__input-container">
                        <label for="">Full Name</label>
                        <div class="name-container">
                            <input type="text" name="firstName" id="firstName" placeholder="First Name">
                            <input type="text" name="middleName" id="middleName" placeholder="Middle Name">
                            <input type="text" name="lastName" id="lastName" placeholder="Last Name">
                        </div>
                    </div>
                    <div class="schedule__input-container">
                        <label for="">Sex</label>
                        <select class="form-select" aria-label="Default select example" id="sex">
                            <option selected disabled hidden></option>
                            <option value="m">Male</option>
                            <option value="f">Female</option>
                        </select>
                    </div>
                    <div class="schedule__input-container">
                        <label for="">Birthdate</label>
                        <div class="birth-container">
                            <input type="text" name="" id="month" placeholder="MM" oninput="inputLimiterNum(this.id, 2)" onblur="inputLimiterBlur(this.id, 2)">
                            <span>/</span>
                            <input type="text" name="" id="day" placeholder="DD" oninput="inputLimiterNum(this.id, 2)" onblur="inputLimiterBlur(this.id, 2)">
                            <span>/</span>
                            <input type="text" name="" id="year" placeholder="YYYY" oninput="inputLimiterNum(this.id, 4)" onblur="inputLimiterBlur(this.id, 4)">
                        </div>
                    </div>

                    <div class="schedule__input-container">
                        <label for="">Phone #</label>
                        <input type="text" name="phone" id="phone" placeholder="09XX XXX XXXX" oninput="filterPhoneInput(this.id)">
                    </div>

                    <div class="schedule__input-container">
                        <label for="">Municipality</label>
                        <select class="form-select" aria-label="Default select example" id="municipality" onchange="getBarangayList(this.value)">
                                <option disabled="disabled" selected="selected" hidden="hidden"></option>
                        </select>
                    </div>

                    <div class="schedule__input-container">
                        <label for="">Barangay</label>
                        <select class="form-select" aria-label="Default select example" id="barangay" disabled="disabled">
                            <option selected disabled hidden></option>
                        </select>
                    </div>

                    <div class="schedule__input-container other-container" style="display: none;">
                        <label for="">Location</label>
                    </div>
                    
                    <div class="schedule__input-container">
                        <label for="">Patient Type</label>
                        <select class="form-select" aria-label="Default select example" id="patientType">
                            <option selected disabled hidden></option>
                            <option value="old">Old Patient</option>
                            <option value="new">New Patient</option>
                        </select>
                    </div>
                    
                    <div class="schedule__input-container">
                        <label for="">Case #</label>
                        <input type="text" name="caseNo" id="caseNo" oninput="filterCaseNo(this.id)">
                    </div>

                </div>
                <div class="schedule__form schedule__partB" style="display: none;">
                    <div class="form-part third">                                
                        <input type="text" name="scheduleDate" id="scheduleDate" style="display: none;">
                        <input type="text" name="timeSlot" id="timeSlot" style="display: none;">
                        <div class="calendar-container">
                            <div class="calendar__header">
                                <div class="calendar__btn" id="calendar__prev"><img draggable="false" class="calendar__arrow" src="./imgs/arrow-back.png" alt="" srcset=""></div>
                                <div class="calendar__month"></div>
                                <div class="calendar__btn" id="calendar__next"><img draggable="false" class="calendar__arrow" src="./imgs/arrow-forward.png" alt="" srcset=""></div>
                            </div>
                            <div class="calendar-row zeroRow">
                                <div class="box day">Sun</div>
                                <div class="box day">Mon</div>
                                <div class="box day">Tue</div>
                                <div class="box day">Wed</div>
                                <div class="box day">Thu</div>
                                <div class="box day">Fri</div>
                                <div class="box day">Sat</div>
                            </div>
                            <div class="calendar-row firstRow date-content">
                            </div>
                            <div class="calendar-row secondRow date-content">
                            </div>
                            <div class="calendar-row thirdRow date-content">
                            </div>
                            <div class="calendar-row fourthRow date-content">
                            </div>
                            <div class="calendar-row fifthRow date-content">
                            </div>
                            <div class="calendar-row sixthRow date-content">
                            </div>
                            <div class="calendar__color-indicator">
                                <div class="calendar__desc">
                                    <div class="green"></div>
                                    <div class="calendar__color-green">Slots Open</div>
                                </div>
                                <div class="calendar__desc">
                                    <div class="red"></div>
                                    <div class="calendar__color-red">Slots Full</div>
                                </div>
                                <div class="calendar__desc">
                                    <div class="gray"></div>
                                    <div class="calendar__color-gray">Closed</div>
                                </div>
                            </div>
                        </div>
                        <div class="calendar__info">
                            <div class="slot-container">
                                <div class="calendar__instruction">Pumili ng Petsa</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="schedule__form schedule__partC" style="display: none;">
                    <div class="schedule__review-field">
                        <span class="schedule__field-name">Schedule</span>
                        <span class="schedule__field-content">August 17, 2023 (1:00 PM - 2:00 PM)</span>
                    </div>
                    <div class="schedule__review-field">
                        <span class="schedule__field-name">Department</span>
                        <span class="schedule__field-content">ENT</span>
                    </div>
                    <div class="schedule__review-field">
                        <span class="schedule__field-name">Full Name</span>
                        <span class="schedule__field-content">Pedro Santos Valiente</span>
                    </div>
                    <div class="schedule__review-field">
                        <span class="schedule__field-name">Sex</span>
                        <span class="schedule__field-content">Male</span>
                    </div>
                    <div class="schedule__review-field">
                        <span class="schedule__field-name">Birthdate</span>
                        <span class="schedule__field-content">January 12, 2000</span>
                    </div>
                    <div class="schedule__review-field">
                        <span class="schedule__field-name">Phone #</span>
                        <span class="schedule__field-content">0957 588 7844</span>
                    </div>
                    <div class="schedule__review-field">
                        <span class="schedule__field-name">Address</span>
                        <span class="schedule__field-content">Banga I, Plaridel, Bulacan</span>
                    </div>
                    <div class="schedule__review-field">
                        <span class="schedule__field-name">Patient Type</span>
                        <span class="schedule__field-content">New Patient</span>
                    </div>
                    <div class="schedule__review-field">
                        <span class="schedule__field-name">Case #</span>
                        <span class="schedule__field-content"></span>
                    </div>
                    <div class="schedule__review-field">
                        <span class="schedule__field-name">Appointment Type</span>
                        <span class="schedule__field-content">Facebook</span>
                    </div>
                </div>
            </div>
            <div class="schedule__button-container">
                <button class="schedule__btn schedule__back" onclick="backForm();">Back</button>
                <button class="schedule__btn schedule__next" onclick="nextForm();">Next</button>
            </div>
        </section>
        <!-- GUMAMIT KA OFFSET SA MYSQL IF WANT MO KONWARI SA ISANG TABLE 20ROWS LANG TAS MAY NEXT TAS GENERATE ANOTHER 20 ROWS -->
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