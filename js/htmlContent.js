const main = document.querySelector('main');

//GAWING FORM YUNG MGA CONTAINER NG INPUT FIELDS?
let accountSettings = `
<section class="account-settings">
    <div class="account-settings__content"  data-aos="fade-right" data-aos-duration="500">
        <div class="custom-shape-divider-top-1689432371">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
                <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
                <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
            </svg>
        </div>
        <span class="material-icons-outlined ico-acc">manage_accounts</span>
        <!-- <div class="account-settings__input-container">
            <label for="">Account ID</label>
            <span type="text" id="accountID" class="account-field">1</span>
        </div> -->
        <div class="account-settings__input-container">
            <label for="">Username</label>
            <span type="text" id="accountUsername" class="account-field">juan-delacruz1</span>
        </div>
        <div class="account-settings__input-container">
            <label for="">Full Name</label>
            <span type="text" id="accountFullName" class="account-field">Juan Reyes Dela Cruz</span>
        </div>
        <div class="account-settings__input-container">
            <label for="">Phone Number</label>
            <div class="acc-edit-container" onclick="generateEditPhone()">
                <span class="accountPhone account-field"id="accountPhone" >0967 599 2312</span>
                <span class="account-settings__edit"><span class="material-icons-outlined ico--acc-edit">edit</span></span>
            </div>
        </div>
        <div class="account-settings__input-container">
            <label for="">Password</label>
            <div class="acc-edit-container" onclick="generateEditPassword()">
                <span class="accountPassword account-field" name="accountPassword" id="accountPassword">********</span>
                <span class="account-settings__edit"><span class="material-icons-outlined ico--acc-edit">edit</span></span>
            </div>
        </div>
    </div>
</section>`;

let editPhone = `
<section class="changeInfo">
    <div class="changeInfo__content" data-aos="fade-right" data-aos-duration="500">
        <div class="changeInfo__input-container">
            <input type="text" id="newPhone" oninput="filterPhoneInput(this.id)" required onfocus="changeBorderFocus(this.id)" onblur="changeBorderBlur(this.id)">
            <label for="newPhone">New Phone #</label>
        </div>
        <div class="changeInfo__input-container">
            <input type="password" id="confirmation" onpaste="return false;" ondrop="return false;" required oninput="inputLimiter(this.id, 64)" onfocus="changeBorderFocus(this.id)" onblur="changeBorderBlur(this.id);inputLimiterBlur(this.id, 64)">
            <label for="confirmation">Password</label>
            <span class="material-icons-outlined ico-see" id="passwordIco" onclick="seePassword('confirmation', this.id)">visibility_off</span>
        </div>
        <div class="error-container">
            <span class="msg"></span>
        </div>
        <div class="changeInfo__btn-container">
            <button class="changeInfo__back" onclick="generateAccountSettings()">Back</button>
            <button class="changeInfo__submit" onclick="applyNewPhone()">Update</button>
        </div>
    </div>
</section>`;

let editPassword = `
<section class="changeInfo" id="changePassword">
    <div class="changeInfo__content" data-aos="fade-right" data-aos-duration="500">
        <div class="changeInfo__input-container">
            <input type="password" id="currentPassword" onpaste="return false;" ondrop="return false;" required oninput="inputLimiter(this.id, 64)" onfocus="changeBorderFocus(this.id)" onblur="changeBorderBlur(this.id); inputLimiterBlur(this.id, 64)">
            <label for="currentPassword">Current Password</label>
            <span class="material-icons-outlined ico-see" id="currentPasswordIco" onclick="seePassword('currentPassword', this.id); seePassword('newPassword', 'newPasswordIco'); seePassword('confirmNewPassword', 'confirNewPasswordIco');">visibility_off</span>
        </div>
        <div class="changeInfo__input-container">
            <input type="password" id="newPassword" onpaste="return false;" ondrop="return false;" required oninput="inputLimiter(this.id, 64)" onfocus="changeBorderFocus(this.id)" onblur="changeBorderBlur(this.id); inputLimiterBlur(this.id, 64)">
            <label for="newPassword">New Password</label>
            <span class="material-icons-outlined ico-see" id="newPasswordIco" onclick="seePassword('newPassword', this.id); seePassword('currentPassword', 'currentPasswordIco'); seePassword('confirmNewPassword', 'confirNewPasswordIco');">visibility_off</span>
        </div>
        <div class="changeInfo__input-container">
            <input type="password" id="confirmNewPassword" onpaste="return false;" ondrop="return false;" required oninput="inputLimiter(this.id, 64)" onfocus="changeBorderFocus(this.id)" onblur="changeBorderBlur(this.id); inputLimiterBlur(this.id, 64)">
            <label for="confirmNewPassword">Confirm New Password</label>
            <span class="material-icons-outlined ico-see" id="confirNewPasswordIco" onclick="seePassword('confirmNewPassword', this.id); seePassword('newPassword', 'newPasswordIco'); seePassword('currentPassword', 'currentPasswordIco');">visibility_off</span>
        </div>
        <div class="error-container">
            <span class="msg"></span>
        </div>
        <div class="changeInfo__btn-container">
            <button class="changeInfo__back" onclick="generateAccountSettings()">Back</button>
            <button class="changeInfo__submit" onclick="applyNewPass()">Update</button>
        </div>
    </div>
</section>`;

let dashboard = `
<section class="dashboard">
    <div class="dashboard__left">
        <div class="dashboard__per-dept" data-aos="fade-right" data-aos-duration="500">
            <select class="form-select" aria-label="Default select example">
                <option value="" selected hidden disabled>Select a Department</option>
                <option value="">ENT</option>
                <option value="">Hematology</option>
                <option value="">Internal Medicine</option>
                <option value="">Internal Medicine Clearance</option>
                <option value="">Nephrology</option>
                <option value="">Neurology</option>
                <option value="">OB GYNE New</option>
                <option value="">OB GYNE Old</option>
                <option value="">OB GYNE ROS</option>
                <option value="">Oncology</option>
                <option value="">Pediatric Cardiology</option>
                <option value="">Pediatric Clearance</option>
                <option value="">Pediatric General</option>
                <option value="">Psychiatry New</option>
                <option value="">Psychiatry Old</option>
                <option value="">Surgery</option>
                <option value="">Surgery ROS</option>
            </select>

            <div class="data-wrapper">
                <span class="data" title="Testing Tooltip...">Appointment Rate: 22%</span>
                <span class="data" title="Testing Tooltip...">Appointment Rate: 22%</span>
                <span class="data" title="Testing Tooltip...">Appointment Rate: 22%</span>
                <span class="data" title="Testing Tooltip...">Appointment Rate: 22%</span>
                <span class="data" title="Testing Tooltip...">Appointment Rate: 22%</span>
                <span class="data" title="Testing Tooltip...">Appointment Rate: 22%</span>
                <span class="data" title="Testing Tooltip...">Appointment Rate: 22%</span>
                <span class="data" title="Testing Tooltip...">Appointment Rate: 22%</span>
            </div>
        </div>
        <div class="dashboard__stats" data-aos="fade-right" data-aos-duration="500">
            <div class="dashboard__block" title="Recent appointments from the last 30 days.">Recent Appointments<span>1134</span></div>
            <div class="dashboard__block" title="Recent complete appointments from the last 30 days.">Recent Completed Appointments<span> 1112</span></div>
            <div class="dashboard__block" title="Recent cancelled appointments from the last 30 days.">Recent Cancelled Appointments<span> 22</span></div>
            <div class="dashboard__block" title="Recent website rating from the last 30 days.">Recent Website Rating<span>2123</span></div>
            <div class="dashboard__block" title="Recent admin activities from the last 30 days.">Recent Admin Activities<span> 752</span></div>
            <div class="dashboard__block" title="Recent website visits from the last 30 days.">Recent Website Visits<span> 1421</span></div>
        </div>
    </div>
    <div class="dashboard__right">
        <div class="dashboard__all-patients" data-aos="fade-left" data-aos-duration="500" data-aos-anchor=".dashboard">
            <div class="dashboard__header">
                <span class="title">Distribution Of Appointments By</span>
                <select class="form-select" aria-label="Default select example">
                    <option value="">Week</option>
                    <option value="" selected>Month</option>
                    <option value="">Year</option>
                </select>
            </div>
            <div class="dept-bargraph">
                <div class="dept">ENT (58)</div>
                <div class="dept">Hematology (10)</div>
                <div class="dept">Internal Medicine (32)</div>
                <div class="dept">Internal Medicine Clearance (11)</div>
                <div class="dept">Nephrology (11)</div>
                <div class="dept">Neurology (23)</div>
                <div class="dept">OB GYNE New (11)</div>
                <div class="dept">OB GYNE Old (10)</div>
                <div class="dept">OB GYNE ROS (3)</div>
                <div class="dept">Oncology (35)</div>
                <div class="dept">Pediatric Cardiology (41)</div>
                <div class="dept">Pediatric Clearance (34)</div>
                <div class="dept">Pediatric General (11)</div>
                <div class="dept">Psychiatry New (44)</div>
                <div class="dept">Psychiatry Old (43)</div>
                <div class="dept">Surgery (32)</div>
                <div class="dept">Surgery ROS (12)</div>
            </div>
        </div>
    </div>
</section>`;

let schedule = `
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
        </div>
    </div>
    <div class="schedule__button-container">
        <button class="schedule__btn schedule__back" onclick="backForm();">Back</button>
        <button class="schedule__btn schedule__next" onclick="nextForm();">Next</button>
    </div>
</section>
`;

// Pag inedit yung status tas pinili yung cancel sa modal kailangan hingin din natin reason then automatic siya malalagay rin
// Pag active lang kailangan pede iedit yung other status bawal na
let viewSchedule = `
<section class="view-schedule">
    <div class="view-schedule__content" data-aos="fade-right" data-aos-duration="500">
        <div class="view-schedule__header">
            <div class="view-schedule__nav">
                <div class="btn--quick-view view-schedule__selected" onclick="viewScheduleNav(this.id)" id="quickViewBtn">Quick View</div>
                <div class="btn--filter" onclick="viewScheduleNav(this.id)" id="filterBtn">Filter</div>
            </div>
            <div class="view-schedule__field">
                
            </div>
        </div>
        <span>Click the row to highlight/see more.</span>
        <div class="view-schedule__table">
            <div class="table-container">
                <table class="schedule-table">
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Department</th>
                            <th>Appointment<br>Date</th>
                            <th>Slot</th>
                            <th>Status</th>
                            <th>Sex</th>
                            <th>Birthdate</th>
                            <th>Phone #</th>
                            <th>Address</th>
                            <th>Patient<br>Type</th>
                            <th>Case #</th>
                            <th>Submitted On</th>
                            <th>Reason<br>Cancelled</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Cruz, John Test</td>
                            <td>Oncology</td>
                            <td title="YYYY-MM-DD">2023-08-25</td>
                            <td>1:00 PM - 2:00PM</td>
                            <td class="cancelled">Cancelled</td>
                            <td>Male</td>
                            <td title="YYYY-MM-DD">2001-10-21</td>
                            <td>0942 423 4277</td>
                            <td>Banga II, Plaridel, Bulacan</td>
                            <td>New Patient</td>
                            <td>123456</td>
                            <td title="YYYY-MM-DD">2023-06-27</td>
                            <td>TrabahoTrabahoTrabahoTrabahoTrabahoTrabahoTrabahoTrabahoTrabahoTrabahoTrabahoTrabaho</td>
                            <td><button class="editBtn" onclick="alert('Change status')" data-id="12">Edit</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>`;

let quickView = `
<div class="quick-view-container">
    <select class="form-select" aria-label="Default select example">
        <option value="" selected hidden disabled>Select a Department</option>
        <option value="">ENT</option>
        <option value="">Hematology</option>
        <option value="">Internal Medicine</option>
        <option value="">Internal Medicine Clearance</option>
        <option value="">Nephrology</option>
        <option value="">Neurology</option>
        <option value="">OB GYNE New</option>
        <option value="">OB GYNE Old</option>
        <option value="">OB GYNE ROS</option>
        <option value="">Oncology</option>
        <option value="">Pediatric Cardiology</option>
        <option value="">Pediatric Clearance</option>
        <option value="">Pediatric General</option>
        <option value="">Psychiatry New</option>
        <option value="">Psychiatry Old</option>
        <option value="">Surgery</option>
        <option value="">Surgery ROS</option>
    </select>
    <div class="view-schedule__btn-group">
        <button>View Today's Appointments</button>
        <button>View All Active Appointments</button>
        <button>View All Completed Appointments</button>
        <button>View All Cancelled Appointments</button>   
    </div>
</div>`;

let filter = `
<div class="filter-container">
    <div class="search-container">
        <input type="text" placeholder="Search" id="adminSearch" onblur="inputLimiterBlur(this.id, 60)" oninput="inputLimiter(this.id, 60)">
        <button><span class="material-icons-outlined ico-search">search</span></button>
    </div>
    <h2>Filter</h2>
    <div class="filter-fields">
        <select class="form-select" aria-label="Default select example">
            <option value="" selected hidden disabled>Select a Department</option>
            <option value="">ENT</option>
            <option value="">Hematology</option>
            <option value="">Internal Medicine</option>
            <option value="">Internal Medicine Clearance</option>
            <option value="">Nephrology</option>
            <option value="">Neurology</option>
            <option value="">OB GYNE New</option>
            <option value="">OB GYNE Old</option>
            <option value="">OB GYNE ROS</option>
            <option value="">Oncology</option>
            <option value="">Pediatric Cardiology</option>
            <option value="">Pediatric Clearance</option>
            <option value="">Pediatric General</option>
            <option value="">Psychiatry New</option>
            <option value="">Psychiatry Old</option>
            <option value="">Surgery</option>
            <option value="">Surgery ROS</option>
        </select>
        <input type="date" name="" id="" placeholder="Date">
        <select class="form-select" aria-label="Default select example">
            <option value="" selected hidden disabled>Time Slot</option>
            <option value="">8:00 AM - 9:00 AM</option>
            <option value="">8:00 AM - 9:00 AM</option>
            <option value="">8:00 AM - 9:00 AM</option>
        </select>
        <select class="form-select" aria-label="Default select example">
            <option value="" selected hidden disabled>Sex</option>
            <option value="">Male</option>
            <option value="">Female</option>
        </select>
        <!-- <div class="filter-fields__address"> -->
        <input type="text" name="barangay" id="barangay" placeholder="Barangay">
        <input type="text" name="municipality" id="municipality" placeholder="Municipality">
        <input type="text" name="province" id="province" placeholder="Province">
        <!-- </div> -->
        <select class="form-select" aria-label="Default select example">
            <option value="" selected hidden disabled>Sort By</option>
            <option value="">Name (A-Z)</option>
            <option value="">etc</option>
        </select>
        <select class="form-select" aria-label="Default select example">
            <option value="" selected hidden disabled>Patient Type</option>
            <option value="">New Patient</option>
            <option value="">Old Patient</option>
        </select>
        <select class="form-select" aria-label="Default select example">
            <option value="" selected hidden disabled>Status</option>
            <option value="">Active</option>
            <option value="">Completed</option>
            <option value="">Cancelled</option>
        </select>
    </div>
    <button type="button">Apply</button>
</div>`;

let request = `
<section class="request">
            <div class="request-content" data-aos="fade-right" data-aos-duration="500">
                <div class="request__table">
                    <span>Click the row to highlight/see more.</span>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>&nbsp;</th>
                                    <th>&nbsp;</th>
                                    <th>Full Name</th>
                                    <th>Department</th>
                                    <th>Scheduled Follow-Up Date</th>
                                    <th>Phone #</th>
                                    <th>Follow-Up Slip</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <button data-appID="1" id="1" onclick="viewRequestApprove(this.id)"><span class="material-icons-outlined">done</span></button>
                                    </td>
                                    <td>
                                        <button data-appID="1" id="1" onclick="viewRequestReject(this.id)"><span class="material-icons-outlined">close</span></button>
                                    </td>
                                    <td>Coronel, Clarence Reyes</td>
                                    <td>Oncology</td>
                                    <td>2023-12-30</td>
                                    <td>09XX XXX XXXX</td>
                                    <td><a href="https://i.pinimg.com/736x/2f/49/a6/2f49a6565c3fef9db078f6543dcc4a97--vendor-events--party.jpg" target="_blank" class="viewBtn">View Image</a></td>
                                    <!-- <td><button class="request-view--btn" id="viewBtn" data-appID="2" onclick="viewRequest(this.id)" >View</button></td> -->
                                </tr>
                                <tr>
                                    <td>
                                        <button data-appID="2" id="2" onclick="viewRequestApprove(this.id)"><span class="material-icons-outlined">done</span></button>
                                    </td>
                                    <td>
                                        <button data-appID="2" id="2" onclick="viewRequestReject(this.id)"><span class="material-icons-outlined">close</span></button>
                                    </td>
                                    <td>Coronel, Clarence Reyes</td>
                                    <td>Oncology</td>
                                    <td>2023-12-30</td>
                                    <td>09XX XXX XXXX</td>
                                    <td><a href="https://i.pinimg.com/736x/2f/49/a6/2f49a6565c3fef9db078f6543dcc4a97--vendor-events--party.jpg" target="_blank" class="viewBtn">View Image</a></td>
                                    <!-- <td><button class="request-view--btn" id="viewBtn" data-appID="2" onclick="viewRequest(this.id)" >View</button></td> -->
                                </tr>
                                <tr>
                                    <td>
                                        <button data-appID="3" id="3" onclick="viewRequestApprove(this.id)"><span class="material-icons-outlined">done</span></button>
                                    </td>
                                    <td>
                                        <button data-appID="3" id="3" onclick="viewRequestReject(this.id)"><span class="material-icons-outlined">close</span></button>
                                    </td>
                                    <td>Coronel, Clarence Reyes</td>
                                    <td>Oncology</td>
                                    <td>2023-12-30</td>
                                    <td>09XX XXX XXXX</td>
                                    <td><a href="https://i.pinimg.com/736x/2f/49/a6/2f49a6565c3fef9db078f6543dcc4a97--vendor-events--party.jpg" target="_blank" class="viewBtn">View Image</a></td>
                                    <!-- <td><button class="request-view--btn" id="viewBtn" data-appID="2" onclick="viewRequest(this.id)" >View</button></td> -->
                                </tr>
                                <tr>
                                    <td>
                                        <button data-appID="3" id="3" onclick="viewRequestApprove(this.id)"><span class="material-icons-outlined">done</span></button>
                                    </td>
                                    <td>
                                        <button data-appID="3" id="3" onclick="viewRequestReject(this.id)"><span class="material-icons-outlined">close</span></button>
                                    </td>
                                    <td>Coronel, Clarence Reyes</td>
                                    <td>Oncology</td>
                                    <td>2023-12-30</td>
                                    <td>09XX XXX XXXX</td>
                                    <td><a href="https://i.pinimg.com/736x/2f/49/a6/2f49a6565c3fef9db078f6543dcc4a97--vendor-events--party.jpg" target="_blank" class="viewBtn">View Image</a></td>
                                    <!-- <td><button class="request-view--btn" id="viewBtn" data-appID="2" onclick="viewRequest(this.id)" >View</button></td> -->
                                </tr>
                                <tr>
                                    <td>
                                        <button data-appID="3" id="3" onclick="viewRequestApprove(this.id)"><span class="material-icons-outlined">done</span></button>
                                    </td>
                                    <td>
                                        <button data-appID="3" id="3" onclick="viewRequestReject(this.id)"><span class="material-icons-outlined">close</span></button>
                                    </td>
                                    <td>Coronel, Clarence Reyes</td>
                                    <td>Oncology</td>
                                    <td>2023-12-30</td>
                                    <td>09XX XXX XXXX</td>
                                    <td><a href="https://i.pinimg.com/736x/2f/49/a6/2f49a6565c3fef9db078f6543dcc4a97--vendor-events--party.jpg" target="_blank" class="viewBtn">View Image</a></td>
                                    <!-- <td><button class="request-view--btn" id="viewBtn" data-appID="2" onclick="viewRequest(this.id)" >View</button></td> -->
                                </tr>
                                <tr>
                                    <td>
                                        <button data-appID="3" id="3" onclick="viewRequestApprove(this.id)"><span class="material-icons-outlined">done</span></button>
                                    </td>
                                    <td>
                                        <button data-appID="3" id="3" onclick="viewRequestReject(this.id)"><span class="material-icons-outlined">close</span></button>
                                    </td>
                                    <td>Coronel, Clarence Reyes</td>
                                    <td>Oncology</td>
                                    <td>2023-12-30</td>
                                    <td>09XX XXX XXXX</td>
                                    <td><a href="https://i.pinimg.com/736x/2f/49/a6/2f49a6565c3fef9db078f6543dcc4a97--vendor-events--party.jpg" target="_blank" class="viewBtn">View Image</a></td>
                                    <!-- <td><button class="request-view--btn" id="viewBtn" data-appID="2" onclick="viewRequest(this.id)" >View</button></td> -->
                                </tr>
                                <tr>
                                    <td>
                                        <button data-appID="3" id="3" onclick="viewRequestApprove(this.id)"><span class="material-icons-outlined">done</span></button>
                                    </td>
                                    <td>
                                        <button data-appID="3" id="3" onclick="viewRequestReject(this.id)"><span class="material-icons-outlined">close</span></button>
                                    </td>
                                    <td>Coronel, Clarence Reyes</td>
                                    <td>Oncology</td>
                                    <td>2023-12-30</td>
                                    <td>09XX XXX XXXX</td>
                                    <td><a href="https://i.pinimg.com/736x/2f/49/a6/2f49a6565c3fef9db078f6543dcc4a97--vendor-events--party.jpg" target="_blank" class="viewBtn">View Image</a></td>
                                    <!-- <td><button class="request-view--btn" id="viewBtn" data-appID="2" onclick="viewRequest(this.id)" >View</button></td> -->
                                </tr>
                                <tr>
                                    <td>
                                        <button data-appID="3" id="3" onclick="viewRequestApprove(this.id)"><span class="material-icons-outlined">done</span></button>
                                    </td>
                                    <td>
                                        <button data-appID="3" id="3" onclick="viewRequestReject(this.id)"><span class="material-icons-outlined">close</span></button>
                                    </td>
                                    <td>Coronel, Clarence Reyes</td>
                                    <td>Oncology</td>
                                    <td>2023-12-30</td>
                                    <td>09XX XXX XXXX</td>
                                    <td><a href="https://i.pinimg.com/736x/2f/49/a6/2f49a6565c3fef9db078f6543dcc4a97--vendor-events--party.jpg" target="_blank" class="viewBtn">View Image</a></td>
                                    <!-- <td><button class="request-view--btn" id="viewBtn" data-appID="2" onclick="viewRequest(this.id)" >View</button></td> -->
                                </tr>
                                <tr>
                                    <td>
                                        <button data-appID="3" id="3" onclick="viewRequestApprove(this.id)"><span class="material-icons-outlined">done</span></button>
                                    </td>
                                    <td>
                                        <button data-appID="3" id="3" onclick="viewRequestReject(this.id)"><span class="material-icons-outlined">close</span></button>
                                    </td>
                                    <td>Coronel, Clarence Rey21321wsdwdwedrqes</td>
                                    <td>Oncology</td>
                                    <td>2023-12-30</td>
                                    <td>09XX XXX XXXX</td>
                                    <td><a href="https://i.pinimg.com/736x/2f/49/a6/2f49a6565c3fef9db078f6543dcc4a97--vendor-events--party.jpg" target="_blank" class="viewBtn">View Image</a></td>
                                    <!-- <td><button class="request-view--btn" id="viewBtn" data-appID="2" onclick="viewRequest(this.id)" >View</button></td> -->
                                </tr>
                                <tr>
                                    <td>
                                        <button data-appID="3" id="3" onclick="viewRequestApprove(this.id)"><span class="material-icons-outlined">done</span></button>
                                    </td>
                                    <td>
                                        <button data-appID="3" id="3" onclick="viewRequestReject(this.id)"><span class="material-icons-outlined">close</span></button>
                                    </td>
                                    <td>Coronel, Clarence Reyes</td>
                                    <td>Oncology</td>
                                    <td>2023-12-30</td>
                                    <td>09XX XXX XXXX</td>
                                    <td><a href="https://i.pinimg.com/736x/2f/49/a6/2f49a6565c3fef9db078f6543dcc4a97--vendor-events--party.jpg" target="_blank" class="viewBtn">View Image</a></td>
                                    <!-- <td><button class="request-view--btn" id="viewBtn" data-appID="2" onclick="viewRequest(this.id)" >View</button></td> -->
                                </tr>
                                <tr>
                                    <td>
                                        <button data-appID="3" id="3" onclick="viewRequestApprove(this.id)"><span class="material-icons-outlined">done</span></button>
                                    </td>
                                    <td>
                                        <button data-appID="3" id="3" onclick="viewRequestReject(this.id)"><span class="material-icons-outlined">close</span></button>
                                    </td>
                                    <td>Coronel, Clarence Reyes</td>
                                    <td>Oncology</td>
                                    <td>2023-12-30</td>
                                    <td>09XX XXX XXXX</td>
                                    <td><a href="https://i.pinimg.com/736x/2f/49/a6/2f49a6565c3fef9db078f6543dcc4a97--vendor-events--party.jpg" target="_blank" class="viewBtn">View Image</a></td>
                                    <!-- <td><button class="request-view--btn" id="viewBtn" data-appID="2" onclick="viewRequest(this.id)" >View</button></td> -->
                                </tr>
                                <tr>
                                    <td>
                                        <button data-appID="3" id="3" onclick="viewRequestApprove(this.id)"><span class="material-icons-outlined">done</span></button>
                                    </td>
                                    <td>
                                        <button data-appID="3" id="3" onclick="viewRequestReject(this.id)"><span class="material-icons-outlined">close</span></button>
                                    </td>
                                    <td>Coronel, Clarence Reyes</td>
                                    <td>Oncology</td>
                                    <td>2023-12-30</td>
                                    <td>09XX XXX XXXX</td>
                                    <td><a href="https://i.pinimg.com/736x/2f/49/a6/2f49a6565c3fef9db078f6543dcc4a97--vendor-events--party.jpg" target="_blank" class="viewBtn">View Image</a></td>
                                    <!-- <td><button class="request-view--btn" id="viewBtn" data-appID="2" onclick="viewRequest(this.id)" >View</button></td> -->
                                </tr>
                                <tr>
                                    <td>
                                        <button data-appID="3" id="3" onclick="viewRequestApprove(this.id)"><span class="material-icons-outlined">done</span></button>
                                    </td>
                                    <td>
                                        <button data-appID="3" id="3" onclick="viewRequestReject(this.id)"><span class="material-icons-outlined">close</span></button>
                                    </td>
                                    <td>Coronel, Clarence Reyes</td>
                                    <td>Oncology</td>
                                    <td>2023-12-30</td>
                                    <td>09XX XXX XXXX</td>
                                    <td><a href="https://i.pinimg.com/736x/2f/49/a6/2f49a6565c3fef9db078f6543dcc4a97--vendor-events--party.jpg" target="_blank" class="viewBtn">View Image</a></td>
                                    <!-- <td><button class="request-view--btn" id="viewBtn" data-appID="2" onclick="viewRequest(this.id)" >View</button></td> -->
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
`;

let scheduling = `
<section class="scheduling">
            <div class="scheduling-content" data-aos="fade-right" data-aos-duration="500">
                <div class="scheduling__dept-picker">
                    <select class="form-select" aria-label="Default select example" onchange="generateDeptSched(this.value)" id="deptSelect">
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
                <div class="week-container">
                    <div id="monday" class="day">
                        <div class="day-header">Mon</div>
                        <div class="timeslot-container">
                        </div>
                    </div>
                    <div id="tuesday" class="day">
                        <div class="day-header">Tue</div>
                        <div class="timeslot-container">
                        </div>
                    </div>
                    <div id="wednesday" class="day">
                        <div class="day-header">Wed</div>
                        <div class="timeslot-container">
                        </div> 
                    </div>
                    <div id="thursday" class="day">
                        <div class="day-header">Thu</div>
                        <div class="timeslot-container">
                        </div>
                    </div>
                    <div id="friday" class="day">
                        <div class="day-header">Fri</div>
                        <div class="timeslot-container">
                        </div>
                    </div>
                    <div id="saturday" class="day">
                        <div class="day-header">Sat</div>
                        <div class="timeslot-container">
                        </div>
                    </div>
                </div>
            </div>
        </section>
`;

// By default yung content ni table is yung today lang
let adminLogs = `
    <section class="admin-logs">
            <div class="admin-logs-wrapper" data-aos="fade-right" data-aos-duration="500">
                <div class="admin-logs__body">
                    <div class="search-container">
                        <input type="text" placeholder="Search" id="adminSearch" onblur="inputLimiterBlur(this.id, 60)" oninput="inputLimiter(this.id, 60); resetAdminTable(this.value, 'adminlog');">
                        <button onclick="insertAdminLogs(false)"><span class="material-icons-outlined ico-search">search</span></button>
                    </div>
                    <h2>Filter</h2>
                    <div class="admin-logs__filters">
                        <div class="date-picker">
                            <input type="text" name="month" id="logMonth" placeholder="MM" oninput="inputLimiterNum(this.id, 2)" onblur="inputLimiterBlur(this.id, 2)">
                            <span>/</span>
                            <input type="text" name="day" id="logDay" placeholder="DD" oninput="inputLimiterNum(this.id, 2)" onblur="inputLimiterBlur(this.id, 2)">
                            <span>/</span>
                            <input type="text" name="year" id="logYear" placeholder="YYYY" oninput="inputLimiterNum(this.id, 4)" onblur="inputLimiterBlur(this.id, 4)">
                        </div>
                        <select id="logActivity" class="form-select" aria-label="Default select example">
                            <option hidden selected disabled value="">Activity ayusin a-z</option>
                            <option value="Changed Password">Changed Password</option>
                            <option value="Changed Phone">Changed Phone</option>
                            <option value="Changed Mobile Video Tutorial">Changed Mobile Video Tutorial</option>
                            <option value="Changed Desktop Video Tutorial">Changed Desktop Video Tutorial</option>
                            <option value="Changed admin type of">Changed an admin's type</option>
                            <option value="Created a new admin">Created a New Admin</option>
                            <option value="Changed website status">Changed website status</option>
                            <option value="Removed an admin">Removed an Admin</option>
                            <option value="Blocked a new date">Blocked a date</option>
                            <option value="Removed a blocked date">Unblocked a date</option>
                            <option value="Posted an announcement">Posted an Announcement</option>
                            <option value="Removed an announcement">Removed an Announcement</option>
                            <option value="Inserted a new slot in ">Inserted a new slot in a department</option>
                            <option value="Changed a slot in ">Changed a slot in a department</option>
                            <option value="Removed a slot in ">Removed a slot in a department</option>
                        </select>
                        <select id="logAdminType" class="form-select" aria-label="Default select example">
                            <option hidden selected disabled value="">Admin Type</option>
                            <option value="admin i">Admin I</option>
                            <option value="admin ii">Admin II</option>
                            <option value="super admin">Admin Super</option>
                        </select>
                        <select id="logSortBy" class="form-select" aria-label="Default select example">
                            <option hidden selected disabled value="">Sort By</option>
                            <option value="0">Username (A-Z)</option>
                            <option value="1">Username (Z-A)</option>
                            <option value="2">Activity</option>
                            <option value="3">Admin Type</option>
                            <option value="4">Latest - Oldest</option>
                            <option value="5">Oldest - Latest</option>
                        </select>
                    </div>
                    <div class="error-container">
                        <span class="msg"></span>
                    </div>
                    <button class="apply-logfilter" onclick="applyLogFilter()">Apply</button>
                </div>
                <span>Click the row to highlight/see more.</span>
                <div class="table-container">
                    <table class="logs-table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Activity</th>
                                <th>Admin Type</th>
                                <th>Date</th>
                                <th >Time</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
`;

let adminList = `
<section class="admin-list">
    <div class="admin-list-wrapper" data-aos="fade-right" data-aos-duration="500">
    <div class="admin-table__body">
        <div class="search-container">
            <input type="text" placeholder="Search" id="adminSearch" onblur="inputLimiterBlur(this.id, 60)" oninput="inputLimiter(this.id, 60); resetAdminTable(this.value, 'admin');">
            <button onclick="insertAdmin(false)"><span class="material-icons-outlined ico-search">search</span></button>
        </div>
    </div>
    <span>Click the row to highlight/see more.</span>
    <div class="table-container">
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Phone #</th>
                    <th>Admin Type</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
</section>`;

// mag popup modal hinihingi otp from sa tintype. so bali yung superadmin acc need pero yung actual gamit ng acc mag regis
let createAccount = `
<section class="add-admin">
    <div class="form-container"  data-aos="fade-right" data-aos-duration="500">
        <form class="form" autocomplete="off">
            <div class="custom-shape-divider-top-1689432371">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
                </svg>
            </div>
            <h2>
                <span class="material-icons-outlined ico-nav">person_add_alt</span>
                Admin Information
            </h2>
            <div class="input-container">
                <input type="text" name="firstName" id="firstName" required>
                <label for="firstName">First Name</label>
            </div>
            <div class="input-container">
                <input type="text" name="middleName" id="middleName" required>
                <label for="middleName">Middle Name</label>
            </div>
            <div class="input-container">
                <input type="text" name="lastName" id="lastName" required>
                <label for="lastName">Last Name</label>
            </div>
            <div class="input-container">
                <input type="text" name="phone" id="phone" required oninput="filterPhoneInput(this.id)">
                <label for="phone">Phone #</label>
            </div>
            <div class="input-container">
                <input type="password" name="password" id="password" required onpaste="return false;" ondrop="return false;" >
                <span class="material-icons-outlined ico-pass" id="passwordLabel" onclick="seePassword('password', this.id); seePassword('confirmPassword', 'confirmPasswordLabel')">visibility_off</span>
                <label for="password">Password</label>
            </div>
            <div class="input-container">
                <input type="password" name="confirm-password" id="confirmPassword" required onpaste="return false;" ondrop="return false;">
                <span class="material-icons-outlined ico-pass" id="confirmPasswordLabel" onclick="seePassword('confirmPassword', this.id); seePassword('password', 'passwordLabel')">visibility_off</span>
                <label for="confirmPassword">Confirm Password</label>
            </div>
            <div class="radio-container">
                <div class="radiobtn-container">
                    <input type="radio" id="adminI" name="adminType" value="adminI" required onclick="generateAdminTypeModal(0)">
                    <label for="adminI">Admin I</label>
                </div>
                <div class="radiobtn-container">
                    <input type="radio" id="adminII" name="adminType" value="adminII" required onclick="generateAdminTypeModal(1)">
                    <label for="adminII">Admin II</label>
                </div>
                <div class="radiobtn-container">
                    <input type="radio" id="superAdmin" name="adminType" value="superAdmin" required onclick="generateAdminTypeModal(2)">
                    <label for="superAdmin">Super Admin</label>
                </div>
            </div>
            <button type="button" class="btn--addAdmin" onclick="createAccountValidator()">Create</button>
            </div>
        </form>
    </div>
</section>`;

let websiteStatus = `
<section class="website-status">
    <div class="website-status__wrapper" data-aos="fade-right" data-aos-duration="500">
        <div class="status">
            <div class="status__header">
                <!-- highlight_off = kapag down website -->
                <!-- block =kapag down scheduling -->
                <span class="material-icons-outlined ico-status ico-live"></span>
                <span class="status-name">Website Is Up</span>
                <!-- Possible Values
                    *Website Is Up
                    *Website Is Down
                    *Scheduling Is Down
                -->
            </div>
            <div class="status__msg">
                <span class="msg-label">Message:</span>
                <!-- Applicable lang if either Website is Down or Online Scheduling is down -->
            </div>
        </div>
        <div class="change-status">
            <!-- <h3>Change Status</h3> -->
            <select class="form-select selectStatus" aria-label="Default select example" onchange="closeMsg()">
                <option class="status-option" value="1">Website is Up</option>
                <option class="status-option" value="2">Website is Down</option>
                <option class="status-option" value="3">Scheduling is Down</option>
            </select>
            <!-- Naka enable lang to if either website is down or scheduling is down hindi kapag completely up si website -->
            <div class="msg-container">
                <label for="msg">Message:</label>
                <textarea name="text" id="statusMsg" cols="30" rows="2" onblur="inputLimiterBlur(this.id, 240); statusMsgCounter(this.id, 'textAreaCounter', 240);" oninput="inputLimiter(this.id, 240); statusMsgCounter(this.id, 'textAreaCounter', 240);"></textarea>
                <div id="textAreaCounter">240</div>
            </div>
            <div class="error-container">
                <span class="msg"></span>
            </div>
            <button class="changeStatus" onclick="confirmStatusChange()">Apply</button>
        </div>
    </div>
</section>`;

let postAnnouncement = `
<section class="postAnnouncement">
    <div class="postAnnouncement__content" data-aos="fade-right" data-aos-duration="500">
        <div class="announcement__input-container">
            <label for="announcementTitle">Announcement Title:</label>
            <input type="text" name="announcementTitle" id="announcementTitle" onblur="inputLimiterBlur(this.id, 120);" oninput="inputLimiter(this.id, 120)">
        </div>
        <div class="announcement__input-container">
            <label for="announcementBody">Announcement Body:</label>
            <textarea cols="30" rows="10" name="announcementBody" id="announcementBody" onblur="inputLimiterBlur(this.id, 1000); statusMsgCounter(this.id, 'announcementBody__counter', 1000);" oninput="inputLimiter(this.id, 1000); statusMsgCounter(this.id, 'announcementBody__counter', 1000);"></textarea>
            <div id="announcementBody__counter">1000</div>
        </div>
        <div class="error-container">
            <span class="msg"></span>
        </div>
        <button id="announcementSubmit"">Post</button>
        <button id="announcementSee" onclick="generateSeePostedAnn()">See posted announcements</button>
    </div>
</section>`;

let seePostedAnn =`
<section class="seeAnnouncements">
    <div class="seeAnnouncements__content" data-aos="fade-right" data-aos-duration="500">
        <span>Click the row to highlight/see more.</span>
        <div class="table-container">
            <table class="ann-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date Posted</th>
                        <th>Time Posted</th>
                        <th>Author</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</section>
`;
// Add modal when delete is pressed confirming the action and then another modal to obtain OTP  from super admin's number  for additional security
let manageData = `
<section class="manage-data">
    <div class="manage-date__content" data-aos="fade-right" data-aos-duration="500">
        <div class="field">
            <span class="field__name">Archived Admin Logs</span>
            <p class="field__desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam quidem mollitia numquam pariatur autem.</p>
            <button class="field__delete-btn">Delete</button>
        </div>
        <div class="field">
            <span class="field__name">Archived Appointments</span>
            <p class="field__desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam quidem mollitia numquam pariatur autem.</p>
            <button class="field__delete-btn">Delete</button>
        </div>
        <div class="field">
            <span class="field__name">Active Appointments</span>
            <p class="field__desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam quidem mollitia numquam pariatur autem.</p>
            <button class="field__delete-btn">Delete</button>
        </div>
    </div>
</section>`;

// PAG PININDOT YUNG REPEAT EVERY YEAR MADISABLE YUNG YEAR FIELD
let blockDates = `
<section class="block-date">
            <div class="add-date" data-aos="fade-right" data-aos-duration="500">
                <span>Click the row to highlight/see more.</span>
                <div class="table-container">
                    <table class="date-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Repeats</th>
                                <th>&nbsp</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="date-picker">
                    <input type="text" name="month" id="block-month" placeholder="MM" oninput="inputLimiterNum(this.id, 2)" onblur="inputLimiterBlur(this.id, 2)">
                    <span>/</span>
                    <input type="text" name="day" id="block-day" placeholder="DD" oninput="inputLimiterNum(this.id, 2)" onblur="inputLimiterBlur(this.id, 2)">
                    <span>/</span>
                    <input type="text" name="year" id="block-year" placeholder="YYYY" oninput="inputLimiterNum(this.id, 4)" onblur="inputLimiterBlur(this.id, 4)">
                </div>
                <div class="other-info">
                    <input type="text" placeholder="Name" id="blockDateName" onblur="inputLimiterBlur(this.id, 30)" oninput="inputLimiter(this.id, 30)">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                        <label class="form-check-label" for="flexSwitchCheckDefault">Repeat Every Year</label>
                    </div>
                </div>
                <div class="error-container">
                    <span class="msg"></span>
                </div>
                <button class="btn-submitblock" onclick="checkBlockDate();">Add</button>
            </div>
</section>`;

let feedback = `
<section class="feedback">
            <div class="feedback-content" data-aos="fade-right" data-aos-duration="500">
                <select class="form-select" aria-label="Default select example" onchange="getFeedback(this.value)">
                    <option value="" selected hidden disabled>Sort By</option>
                    <option value="0">Oldest to Latest</option>
                    <option value="1">Latest to Oldest</option>
                    <option value="2">Lowest Rating to Highest Rating</option>
                    <option value="3">Highest Rating to Lowest Rating</option>
                </select>
                <div class="feedback__table">
                    <span>Click the row to highlight/see more.</span>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Rating</th>
                                    <th>Feedback</th>
                                    <th>Date Submitted</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
`;

let editTutorial = `
<section class="edit-tutorial">
            <div class="edit-tutorial-content" data-aos="fade-right" data-aos-duration="500"z>
                <div class="edit-tutorial__instruction">
                    <span class="edit-tutorial__header">How to get embedded youtube link</span>
                    <ol>
                        <li>Video must be set to either public/unlisted and in landscape</li>
                        <li>Go to the video and click "share"</li>
                        <li>Choose "Embed" option</li>
                        <li>Find the src, example: src="<span>https://www.youtube.com/embed/a3ICNMQW7Ok?si=IWnYUlj7YutcHo1O</span>"</li>
                        <li>Copy the link inside the src of the video you want to use and paste it to either phone or desktop field</li>
                    </ol>
                </div>
                <div class="embed-input">
                    <!-- <div class="tutorial__video-container">
                        <iframe loading="lazy" width="100%" height="100%" src="https://www.youtube.com/embed/lhUXVfEQiRM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div> -->
                    <label for="mobile">Mobile Phone</label>
                    <div class="edit__input-container">
                        <input type="text" name="" id="mobile">
                        <button class="edit-tutorial--btn" onclick="confirmPhoneTutorial()">Apply</button>
                    </div>
                </div>
                <div class="embed-input">
                    <label for="desktop">Desktop</label>
                    <div class="edit__input-container">
                        <input type="text" name="" id="desktop">
                        <button class="edit-tutorial--btn" onclick="confirmDesktopTutorial()">Apply</button>
                    </div>
                </div>
                <div class="error-container">
                    <span class="msg"></span>
                </div>
            </div>
        </section>
`;

// Ipakita autogenerated na username after success OTP ex clarence-coronel12; or possible wala nang otp sa pag gawa ng acc tingnan natin
// Auto generate dashboard assuming si super admin nag login lagyan pa logic to kung ano una page depende sa nag login
// generateDashboard();


// PAGE GENERATORS

function generateAccountSettings(){
    main.innerHTML = accountSettings;
    insertAccInfo();
}

function generateEditPhone(){
    main.innerHTML = editPhone;
}

function generateEditPassword(){
    main.innerHTML = editPassword;
}

function generateDashboard(){
    if(checkPrivilege('super admin')){
        main.innerHTML = dashboard;
        determineDeviceDB();
    }
}
function generateSchedule(){
    if(checkPrivilege('admin ii') || checkPrivilege('super admin')){
        main.innerHTML = schedule;
        // const municipality = document.querySelector('#municipality');
        // const barangay = document.querySelector('#barangay');
        generateMunicipalities();
        monthContainer = document.querySelector('.calendar__month');
        formState = 0;
    }   
}
function generateViewSchedule(){
    if(checkPrivilege('admin i') || checkPrivilege('admin ii') || checkPrivilege('super admin')){
        main.innerHTML = viewSchedule;
        document.querySelector('.view-schedule__field').innerHTML = quickView;
        showTableCell();
    }
}

function generateRequest(){
    if(checkPrivilege('admin ii') || checkPrivilege('super admin')){
        main.innerHTML = request;
        showTableCell();
    }
}

function generateScheduling(){
    if(checkPrivilege('super admin')){
        main.innerHTML = scheduling;
    }
}

function generateAdminLogs(){
    // contentIsOpen = true;
    if(checkPrivilege('super admin')){
        main.innerHTML = adminLogs;
        insertAdminLogs();
    }
}

function generateAdminList(){
    // contentIsOpen = true;
    if(checkPrivilege('super admin')){
        main.innerHTML = adminList;
        insertAdmin();
    }
}

function generateCreateAcc(){
    if(checkPrivilege('super admin')){
        main.innerHTML = createAccount;
        let iconPassword = document.querySelectorAll('.ico-pass');
        changeArrow();
        // contentIsOpen = true;
        createAccInputBorderStyle();
    
        // iconPassword.forEach((item)=>{
        //     item.addEventListener('click', ()=>{
        //         if(item.innerHTML == 'visibility_off'){
        //             iconPassword.forEach((item2)=>{
        //                 item2.innerHTML = 'visibility'
        //             })
        //             document.querySelector('#password').setAttribute('type', 'text');
        //             document.querySelector('#confirmPassword').setAttribute('type', 'text');
        //         }
        //         else{
        //             iconPassword.forEach((item)=>{
        //                 item.innerHTML = 'visibility_off'
        //             })
        //             document.querySelector('#password').setAttribute('type', 'password');
        //             document.querySelector('#confirmPassword').setAttribute('type', 'password');
        //         }
        //     })
        // });
    }
}

function generateWebsiteStatus(){
    if(checkPrivilege('super admin')){
        main.innerHTML = websiteStatus;
        insertWebsiteStatus();
    }
}

function generatePostAnnouncement(){
    if(checkPrivilege('admin ii') || checkPrivilege('super admin')){
        main.innerHTML = postAnnouncement;
        insertAnnouncement();
    }
}

function generateSeePostedAnn(){
    if(checkPrivilege('admin ii') || checkPrivilege('super admin')){
        main.innerHTML = seePostedAnn;
        insertPostedAnn();
        showTableCell();
    }
}

function generateManageData(){
    if(checkPrivilege('super admin')){
        main.innerHTML = manageData;
    }
}

function generateBlockDates(){
    if(checkPrivilege('super admin')){
        main.innerHTML = blockDates;
        insertBlockDate();
        showTableCell();
    }
}

function generateFeedback(){
    if(checkPrivilege('admin ii') || checkPrivilege('super admin')){
        main.innerHTML = feedback;
        getFeedback();
    }
}

function generateEditTutorial(){
    if(checkPrivilege('super admin')){
        main.innerHTML = editTutorial;
    }
}