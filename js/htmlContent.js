const main = document.querySelector('main');

//GAWING FORM YUNG MGA CONTAINER NG INPUT FIELDS?
let accountSettings = `
<div class="page-header">Home / Account Settings</div>
<section class="account-settings">
    <div class="account-settings__content"  data-aos="fade-right" data-aos-duration="500">
        <div class="topcloud">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
                <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
                <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
            </svg>
        </div>
        <span class="material-icons-outlined ico-acc">manage_accounts</span>
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
<div class="page-header">Home / Account Settings / Edit Phone</div>
<section class="changeInfo">
    <div class="changeInfo__content" data-aos="fade-right" data-aos-duration="500">
        <div class="topcloud">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
                <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
                <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
            </svg>
        </div>
        <span class="material-icons-outlined ico-acc">phone</span>
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
<div class="page-header">Home / Account Settings / Edit Password</div>
<section class="changeInfo" id="changePassword">
    <div class="changeInfo__content" data-aos="fade-right" data-aos-duration="500">
        <div class="topcloud">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
                <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
                <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
            </svg>
        </div>
        <span class="material-icons-outlined ico-acc">lock</span>
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
<div class="page-header">Home / Dashboard</div>
<section class="dashboard">
    <div class="dashboard__right">
        <div class="controls" data-aos="fade-right" data-aos-duration="500">
            <div class="range-container">
                <select title="Range" class="form-select" id="dashboardDays" aria-label="Default select example" onchange="generateDeptStats(this.value); insertQuickStats(this.value); checkSelectedDepartment();">
                    <option value="7">Last 7 Days</option>
                    <option value="30" selected>Last 30 Days</option>
                    <option value="365">Last 365 Days</option>
                </select>
            </div>
        </div>
        <div class="dashboard__all-patients" data-aos="fade-right" data-aos-duration="500">
            <div class="dashboard__header">
                <span>Appointment Distribution Per Department</span> <br>
                <span>Click a Department to View Statistics</span>
            </div>
            <div class="dept-bargraph">
                <div class="dept" data-dept="ENT" data-deptID="1" title="Click to view statistics.">Loading...</div>
                <div class="dept" data-dept="Hematology" data-deptID="2" title="Click to view statistics.">Loading...</div>
                <div class="dept" data-dept="Internal Medicine" data-deptID="3" title="Click to view statistics.">Loading...</div>
                <div class="dept" data-dept="Internal Medicine Clearance" data-deptID="4" title="Click to view statistics.">Loading...</div>
                <div class="dept" data-dept="Nephrology" data-deptID="5" title="Click to view statistics.">Loading...</div>
                <div class="dept" data-dept="Neurology" data-deptID="6" title="Click to view statistics.">Loading...</div>
                <div class="dept" data-dept="OB GYNE New" data-deptID="7" title="Click to view statistics.">Loading...</div>
                <div class="dept" data-dept="OB GYNE Old" data-deptID="8" title="Click to view statistics.">Loading...</div>
                <div class="dept" data-dept="OB GYNE ROS" data-deptID="9" title="Click to view statistics.">Loading...</div>
                <div class="dept" data-dept="Oncology" data-deptID="10" title="Click to view statistics.">Loading...</div>
                <div class="dept" data-dept="Pediatric Cardiology" data-deptID="11" title="Click to view statistics.">Loading...</div>
                <div class="dept" data-dept="Pediatric Clearance" data-deptID="12" title="Click to view statistics.">Loading...</div>
                <div class="dept" data-dept="Pediatric General" data-deptID="13" title="Click to view statistics.">Loading...</div>
                <div class="dept" data-dept="Psychiatry New" data-deptID="14" title="Click to view statistics.">Loading...</div>
                <div class="dept" data-dept="Psychiatry Old" data-deptID="15" title="Click to view statistics.">Loading...</div>
                <div class="dept" data-dept="Surgery" data-deptID="16" title="Click to view statistics.">Loading...</div>
                <div class="dept" data-dept="Surgery ROS" data-deptID="17" title="Click to view statistics.">Loading...</div>
            </div>
        </div>
    </div>
    <div class="dashboard__left">
    <div class="dashboard__per-dept" data-aos="fade-left" data-aos-duration="500" data-aos-anchor=".dashboard">
        <div class="per-dept-header" title="Statistics related to the selected department."><span>-</span> Department Statistics</div>
        <div class="data-wrapper">
            <div class="data" title="Appointment percentage relative to other departments.">Appointments &nbsp;<span>-</span></div>
            <div class="data" title="Completed appointments percentage.">Completed Appointments&nbsp;<span>-</span></div>
            <div class="data" title="Patient no-show percentage.">Missed Appointments&nbsp;<span>-</span></div>
            <div class="data" title="Cancel percentage.">Cancelled Appointments &nbsp;<span>-</span></div>
            <div class="data" title="Total male patients.">Males &nbsp;<span>-</span></div>
            <div class="data" title="Total female patients.">Females &nbsp;<span>-</span></div>
            <div class="data" title="Age 0-2">Infants and Toddlers &nbsp;<span>-</span></div>
            <div class="data" title="Age 3-12">Children &nbsp;<span>-</span></div>
            <div class="data" title="Age 13-18">Adolescents &nbsp;<span>-</span></div>
            <div class="data" title="Age 19-25">Young Adults &nbsp;<span>-</span></div>
            <div class="data" title="Age 26-59">Adults &nbsp;<span>-</span></div>
            <div class="data" title="Age 60+">Seniors &nbsp;<span>-</span></div>
        </div>
    </div>
    <div class="dashboard__stats" data-aos="fade-left" data-aos-duration="500" data-aos-anchor=".dashboard">
        <div class="dashboard__block" title="Appointments across all departments.">Total Appointments<span>-</span></div>
        <div class="dashboard__block" title="Complete appointments across all departments.">Total Completed Appointments<span>-</span></div>
        <div class="dashboard__block" title="Cancelled appointments across all departments.">Total Cancelled Appointments<span>-</span></div>
        <div class="dashboard__block" title="Missed appointments across all departments.">Total Missed Appointments<span>-</span></div>
        <div class="dashboard__block" title="Average website rating.">Website Average Rating<span>-</span></div>
        <div class="dashboard__block" title="Admin activities.">Total Admin Activities<span>-</span></div>
    </div>
</div>
</section>`;

let schedule = `
<div class="page-header">Home / Schedule An Appointment</div>
<section class="schedule" data-aos="fade-right" data-aos-duration="500">
    <div class="schedule__content">
        <div class="schedule__form schedule__partA">
            <div class="schedule__input-container">
                <label for=""><span class="asterisk">* </span>Department</label>
                <select class="form-select" aria-label="Default select example"  id="dept"">
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
                <label for=""><span class="asterisk">* </span>Full Name</label>
                <div class="name-container">
                    <input type="text" name="firstName" id="firstName" placeholder="First">
                    <input type="text" name="middleName" id="middleName" placeholder="Middle">
                    <input type="text" name="lastName" id="lastName" placeholder="Last">
                </div>
            </div>
            <div class="schedule__input-container">
                <label for=""><span class="asterisk">* </span>Birthdate</label>
                <div class="birth-container">
                    <input type="text" name="" id="month" placeholder="MM" oninput="inputLimiterNum(this.id, 2)" onblur="inputLimiterBlur(this.id, 2)">
                    <input type="text" name="" id="day" placeholder="DD" oninput="inputLimiterNum(this.id, 2)" onblur="inputLimiterBlur(this.id, 2)">
                    <input type="text" name="" id="year" placeholder="YYYY" oninput="inputLimiterNum(this.id, 4)" onblur="inputLimiterBlur(this.id, 4)">
                </div>
            </div>

            <div class="schedule__input-container">
                <label for=""><span class="asterisk">* </span>Phone #</label>
                <input type="text" name="phone" id="phone" placeholder="09XX XXX XXXX" oninput="filterPhoneInput(this.id)">
            </div>

            <div class="schedule__input-container">
                <label for=""><span class="asterisk">* </span>Municipality</label>
                <select class="form-select" aria-label="Default select example" id="municipality" onchange="getBarangayList(this.value)">
                        <option disabled="disabled" selected="selected" hidden="hidden"></option>
                </select>
            </div>

            <div class="schedule__input-container">
                <label for=""><span class="asterisk">* </span>Barangay</label>
                <select class="form-select" aria-label="Default select example" id="barangay" disabled="disabled">
                    <option selected disabled hidden></option>
                </select>
            </div>

            <div class="schedule__input-container other-container" style="display: none;">
                <label for=""><span class="asterisk">* </span>Location</label>
            </div>
            
            <div class="schedule__input-container">
                <label for="">Case #</label>
                <input type="text" name="caseNo" id="caseNo" oninput="filterCaseNo(this.id)">
            </div>

            <div class="schedule__input-container">
                <label for=""><span class="asterisk">* </span>Symptoms</label>
                <input type="text" name="consultation" id="consultation">
            </div>

            <div class="schedule__input-container">
                <label for=""><span class="asterisk">* </span>Sex</label>
                <div class="radio-group">
                    <label class="radio-container sex">
                        <input class="input-radio" type="radio" name="sex" value="male">
                        <span>Male</span>
                    </label>
                    <label class="radio-container sex">
                        <input class="input-radio" type="radio" name="sex" value="female">
                        <span>Female</span>
                    </label>
                </div>
            </div>

            <div class="schedule__input-container">
                <label for=""><span class="asterisk">* </span>Patient Type</label>
                <div class="radio-group">
                    <label class="radio-container type">
                        <input class="input-radio" type="radio" name="patientType" value="old" onclick="addFollowUpBtn();">
                        <span>Old</span>
                    </label>
                    <label class="radio-container type">
                        <input class="input-radio" type="radio" name="patientType" value="new" onclick="removeFollowUpBtn();">
                        <span>New</span>
                    </label>
                </div>
            </div>

            <div class="schedule__input-container">
                <label for="isFollowUp"><span class="asterisk">*</span> Visit Type / Klase ng Pagdalaw</label>
                <div class="radio-group">
                    <label class="radio-container visit">
                        <input class="input-radio" onclick="revertRadio()" type="radio" name="isFollowUp" value="false">
                        <span>Initial Visit</span>
                    </label>
                    <label class="radio-container visit">
                        <input class="input-radio" onclick="revertRadio()" type="radio" name="isFollowUp" value="true">
                        <span>Follow-Up Visit</span>
                    </label>
                </div>
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
                <span class="schedule__field-name">Visit Type</span>
                <span class="schedule__field-content">Initial Visit</span>
            </div>
            <div class="schedule__review-field">
                <span class="schedule__field-name">Case #</span>
                <span class="schedule__field-content"></span>
            </div>
            <div class="schedule__review-field">
                <span class="schedule__field-name">Symptoms</span>
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
let viewSchedule = `<div class="page-header">Home / View Appointments</div>
<section class="view-schedule">
    <div class="view-schedule__content" data-aos="fade-right" data-aos-duration="500">
        <div class="view-schedule__header">
            <div class="filter-holder">
                <label for="dept">Department</label>
                <select class="form-select" aria-label="Default select example"  id="dept" onchange="getSchedTimeslots(); viewAppointments();">
                    <option value="all" selected>All</option>
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
                <input type="date" name="" id="appStartDate" oninput="getSchedTimeslots(); viewAppointments();">
            </div>
            <div class="filter-holder">
                <label for="">Appointment Date To</label>
                <input type="date" name="" id="appEndDate" oninput="getSchedTimeslots(); viewAppointments();">
            </div>
            <div class="filter-holder">
                <label for="dept">
                    Time Slot
                    <div class="showInactive">
                        <input id="inactiveCB" type="checkbox" onchange="showInactiveTS()">
                        <label for="inactiveCB" >Show Inactive</label>
                    </div>
                </label>
                <select class="form-select" id="timeslot" aria-label="Default select example" onchange="viewAppointments();">
                    <option value="all" selected>All</option>
                    <option value="0">9:20 AM - 10:20 AM</option>
                    <option value="0">9:20 AM - 10:20 AM</option>
                </select>
            </div>
            <div class="filter-holder">
                <label for="dept">Sex</label>
                <select class="form-select" id="sex" aria-label="Default select example" onchange="viewAppointments();">
                    <option value="all" selected>All</option>
                    <option value="m">Male</option>
                    <option value="f">Female</option>
                </select>
            </div>
            <div class="filter-holder">
                <label for="dept">Province</label>
                <select class="form-select" id="province" aria-label="Default select example" onchange="insertMunicipality();">
                    <option value="all" selected>All</option>
                    <option value="bulacan">Bulacan</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div class="filter-holder">
                <label for="dept">Municipality</label>
                <select class="form-select" id="municipality" aria-label="Default select example" onchange="viewAppointments(); insertBarangay();">
                    <option value="all" selected>All</option>
                </select>
            </div>
            <div class="filter-holder">
                <label for="dept">Barangay</label>
                <select class="form-select" id="barangay" aria-label="Default select example" onchange="viewAppointments();">
                    <option value="all">All</option>
                </select>
            </div>
            <div class="filter-holder">
                <label for="dept">Patient Type</label>
                <select class="form-select" id="patientType" aria-label="Default select example" onchange="viewAppointments();">
                    <option value="all" selected>All</option>
                    <option value="old">Old</option>
                    <option value="new">New</option>
                </select>
            </div>
            <div class="filter-holder">
                <label for="">Case #</label>
                <input type="text" id="caseNo" id="caseNo" oninput="filterCaseNo(this.id); viewAppointments();">
            </div>
            <div class="filter-holder">
                <label for="dept">Visit Type</label>
                <select class="form-select" id="visitType" aria-label="Default select example" onchange="viewAppointments();">
                    <option value="all" selected>All</option>
                    <option value="0">Initial Visit</option>
                    <option value="1">Follow-Up Visit</option>
                </select>
            </div>
            <div class="filter-holder">
                <label for="dept">Scheduled Through</label>
                <select class="form-select" id="scheduledThrough" aria-label="Default select example" onchange="viewAppointments();">
                    <option value="all" selected>All</option>
                    <option value="patient website">Patient Website</option>
                    <option value="admin website">Admin Website</option>
                </select>
            </div>
            <div class="filter-holder">
                <label for="dept">Status</label>
                <select class="form-select" id="status" aria-label="Default select example" onchange="viewAppointments();">
                    <option value="all" selected>All</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                    <option value="missed">Missed</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                    <option value="scheduled">Scheduled</option>
                </select>
            </div>
            <div class="filter-holder">
                <label for="dept">Last Name</label>
                <input type="text" id="lastName" oninput="viewAppointments();">
            </div>
            <div class="filter-holder">
                <label for="dept">First Name</label>
                <input type="text" id="firstName" oninput="viewAppointments();">
            </div>
            <div class="filter-holder">
                <label for="dept">Middle Name</label>
                <input type="text" id="middleName" oninput="viewAppointments();">
            </div>
            <div class="filter-holder">
                <label for="">Submitted Date From</label>
                <input type="date" name="" id="subStartDate" oninput="viewAppointments();">
            </div>
            <div class="filter-holder">
                <label for="">Submitted Date To</label>
                <input type="date" name="" id="subEndDate" oninput="viewAppointments();">
            </div>
        </div>  
        <div class="error-container">
            <span class="msg"></span>
        </div>           
        <div class="view-schedule__table">
            <div class="table-container">
                <table class="schedule-table" id="schedule-table">
                    <thead>
                        <tr>
                            <th title="Click to sort by this column." onclick="appointmentSort(this.dataset.sortby, this.dataset.sortstate, 'viewApp');" data-sortState="0" data-sortby="id">ID</th>
                            <th title="Click to sort by this column." onclick="appointmentSort(this.dataset.sortby, this.dataset.sortstate, 'viewApp');" data-sortState="0" data-sortby="name">Full Name</th>
                            <th title="Click to sort by this column." onclick="appointmentSort(this.dataset.sortby, this.dataset.sortstate, 'viewApp');" data-sortState="0" data-sortby="refNo">Reference #</th>
                            <th title="Click to sort by this column." onclick="appointmentSort(this.dataset.sortby, this.dataset.sortstate, 'viewApp');" data-sortState="0" data-sortby="dept">Department</th>
                            <th title="Click to sort by this column." onclick="appointmentSort(this.dataset.sortby, this.dataset.sortstate, 'viewApp');" data-sortState="0" data-sortby="consultation">Consultation</th>
                            <th title="Click to sort by this column." onclick="appointmentSort(this.dataset.sortby, this.dataset.sortstate, 'viewApp');" data-sortState="0" data-sortby="appDate">Appointment Date</th>
                            <th title="Click to sort by this column." onclick="appointmentSort(this.dataset.sortby, this.dataset.sortstate, 'viewApp');" data-sortState="0" data-sortby="slot">Slot</th>
                            <th title="Click to sort by this column." onclick="appointmentSort(this.dataset.sortby, this.dataset.sortstate, 'viewApp');" data-sortState="0" data-sortby="status">Status</th>
                            <th title="Click to sort by this column." onclick="appointmentSort(this.dataset.sortby, this.dataset.sortstate, 'viewApp');" data-sortState="0" data-sortby="schedVia">Scheduled Through</th>
                            <th title="Click to sort by this column." onclick="appointmentSort(this.dataset.sortby, this.dataset.sortstate, 'viewApp');" data-sortState="0" data-sortby="sex">Sex</th>
                            <th title="Click to sort by this column." onclick="appointmentSort(this.dataset.sortby, this.dataset.sortstate, 'viewApp');" data-sortState="0" data-sortby="birthdate">Birthdate</th>
                            <th title="Click to sort by this column." onclick="appointmentSort(this.dataset.sortby, this.dataset.sortstate, 'viewApp');" data-sortState="0" data-sortby="phoneNo">Phone #</th>
                            <th title="Click to sort by this column." onclick="appointmentSort(this.dataset.sortby, this.dataset.sortstate, 'viewApp');" data-sortState="0" data-sortby="address">Address</th>
                            <th title="Click to sort by this column." onclick="appointmentSort(this.dataset.sortby, this.dataset.sortstate, 'viewApp');" data-sortState="0" data-sortby="patientType">Patient Type</th>
                            <th title="Click to sort by this column." onclick="appointmentSort(this.dataset.sortby, this.dataset.sortstate, 'viewApp');" data-sortState="0" data-sortby="caseNo">Case #</th>
                            <th title="Click to sort by this column." onclick="appointmentSort(this.dataset.sortby, this.dataset.sortstate, 'viewApp');" data-sortState="0" data-sortby="dateSubmitted">Submitted On</th>
                            <th title="Click to sort by this column." onclick="appointmentSort(this.dataset.sortby, this.dataset.sortstate, 'viewApp');" data-sortState="0" data-sortby="reasonCancelled">Reason Cancelled</th>
                            <th class="action-column">Action</th>
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
`;

let quickView = `
<div class="quick-view-container">
    <select class="form-select" onchange="insertAppBtn('today')" aria-label="Default select example" id="deptSelect">
        <option value="" selected hidden disabled>Department</option>
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
    <div class="view-schedule__btn-group">
        <button class="view-schedule__btn view-disabled" disabled="disabled" onclick="insertAppBtn('today')">View Today's Appointments</button>
        <button class="view-schedule__btn view-disabled" disabled="disabled" title="Last 30 days" onclick="insertAppBtn('completed')">View Recent Completed Appointments</button>
        <button class="view-schedule__btn view-disabled" disabled="disabled" title="Last 30 days" onclick="insertAppBtn('cancelled')">View Recent Cancelled Appointments</button>   
    </div>
</div>`;

let filter = `
<div class="filter-container">
    <div class="search-container">
        <input type="text" placeholder="Search" id="appointmentSearch" onblur="inputLimiterBlur(this.id, 60)" oninput="inputLimiter(this.id, 60)">
        <button onclick="searchAppointment()"><span class="material-icons-outlined ico-search">search</span></button>
    </div>
    <h2>Filter</h2>
    <div class="filter-fields">
        <select class="form-select" id="dept" aria-label="Default select example" onchange="generateSlots()">
            <option value="" selected hidden disabled>Department</option>
            <option value="">None</option>
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
        <div class="date-picker" title="Appointment Date">
            <input oninput="generateSlots()" type="text" name="month" id="appMonth" placeholder="MM" oninput="inputLimiterNum(this.id, 2)" onblur="inputLimiterBlur(this.id, 2)">
            <span>/</span>
            <input oninput="generateSlots()" type="text" name="day" id="appDay" placeholder="DD" oninput="inputLimiterNum(this.id, 2)" onblur="inputLimiterBlur(this.id, 2)">
            <span>/</span>
            <input oninput="generateSlots()" type="text" name="year" id="appYear" placeholder="YYYY" oninput="inputLimiterNum(this.id, 4)" onblur="inputLimiterBlur(this.id, 4)">
        </div>
        <select disabled="disabled" id="timeSlot" class="form-select" aria-label="Default select example">
            <option value="" selected hidden disabled>Time Slot</option>
        </select>
        <select class="form-select" id="sex" aria-label="Default select example">
            <option value="" selected hidden disabled>Sex</option>
            <option value="">None</option>
            <option value="m">Male</option>
            <option value="f">Female</option>
        </select>
        <input type="text" name="barangay" id="barangay" placeholder="Barangay" oninput="inputLimiter(this.id, 60)" onblur="inputLimiterBlur(this.id, 60)">
        <input type="text" name="municipality" id="municipality" placeholder="Municipality" oninput="inputLimiter(this.id, 60) onblur="inputLimiterBlur(this.id, 60)">
        <input type="text" name="province" id="province" placeholder="Province" oninput="inputLimiter(this.id, 60) onblur="inputLimiterBlur(this.id, 60)">
        <select class="form-select" id="patientType" aria-label="Default select example">
            <option value="" selected hidden disabled>Patient Type</option>
            <option value="">None</option>
            <option value="new">New</option>
            <option value="old">Old</option>
        </select>
        <select class="form-select" id="status" aria-label="Default select example">
            <option value="" selected hidden disabled>Status</option>
            <option value="">None</option>
            <option value="scheduled">Scheduled</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
            <option value="missed">Missed</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
        </select>
        <select class="form-select" id="sortBy" aria-label="Default select example">
            <option value="" selected hidden disabled>Sort By</option>
            <option value="0">Name (A-Z)</option>
            <option value="1">Name (Z-A)</option>
            <option value="2">Appointment Date (Latest-Oldest)</option>
            <option value="3">Appointment Date (Oldest-Latest)</option>
            <option value="4">Date Submitted (Latest-Oldest)</option>
            <option value="5">Date Submitted (Oldest-Latest)</option>
        </select>
    </div>
    <div class="error-container">
        <span class="msg"></span>
    </div>
    <button type="button" onclick="filterAppointment()">Apply</button>
</div>`;

let request = `
<div class="page-header">Home / Follow-Up Request</div>
<section class="request">
            <div class="request-content" data-aos="fade-right" data-aos-duration="500">
                <div class="request__table">
                    <div class="table-container">
                        <table class="request-table" id="request-table">
                            <thead>
                                <tr>
                                    <th>Action</th>
                                    <th title="Click to sort by this column." onclick="requestSort(this.dataset.sortby, this.dataset.sortstate);" data-sortState="0" data-sortby="name">Full Name</th>
                                    <th title="Click to sort by this column." onclick="requestSort(this.dataset.sortby, this.dataset.sortstate);" data-sortState="0" data-sortby="dept">Department</th>
                                    <th title="Click to sort by this column." onclick="requestSort(this.dataset.sortby, this.dataset.sortstate);" data-sortState="0" data-sortby="phoneNo">Phone #</th>
                                    <th title="Click to sort by this column." onclick="requestSort(this.dataset.sortby, this.dataset.sortstate);" data-sortState="0" data-sortby="dateSubmitted">Date Submitted</th>
                                    <th>Follow-Up Slip</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="cmds-container">
                    <div class="table-nav">
                        <button id="prevButton"><< Previous</button>
                        <span id="pageNum">1</span>
                        <button id="nextButton">Next >></button>
                    </div>
                </div>
            </div>
        </section>
`;
                        // generateDeptSched(this.value);
let scheduling = `
<div class="page-header">Home / Department Schedules</div>
<section class="scheduling">
            <div class="scheduling-content" data-aos="fade-right" data-aos-duration="500">
                <div class="scheduling-header">
                    <div class="scheduling-input-container">
                        <label for="deptSelect">Department</label>
                        <select class="form-select" aria-label="Default select example" onchange="deptChange(this.value);" id="deptSelect">
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
                    <div class="scheduling-input-container">
                        <label for="scheduleSet">
                            Schedule 
                            <div class="checkbox-container">
                                <label for="showPrevious">Show Previous</label>
                                <input type="checkbox" disabled="disabled" id="showPrevious" name="showPrevious" onchange="showPreviousToggle();">
                            </div>
                        </label>
                        <select class="form-select select-disabled" disabled="disabled" aria-label="Default select example" onchange="markMissedDay('view'); showSched(this.value);" id="scheduleSet">
                            <option value="" selected hidden disabled>-</option>
                        </select>
                    </div>
                    <div class="scheduling-btns-container">
                        <button title="Add schedule." id="scheduleAdd" onclick="addMode()" disabled="disabled">
                            <span class="material-icons-outlined scheduling-btns-ico scheduling-btns-add scheduling-btn-disabled">
                                add
                            </span>
                        </button>
                        <button title="Edit schedule." id="scheduleEdit" onclick="editMode()" disabled="disabled">
                            <span class="material-icons-outlined scheduling-btns-ico scheduling-btns-edit scheduling-btn-disabled">
                                edit
                            </span>
                        </button>
                        <button title="Delete schedule." id="scheduleDlt" onclick="deleteSchedule()" disabled="disabled">
                            <span class="material-icons-outlined scheduling-btns-ico scheduling-btns-dlt scheduling-btn-disabled">
                                delete
                            </span>
                        </button>

                        <div class="state-container" style="display:none">
                            <button id="schedulingSave">Save</button>
                            <button id="cancel" onclick="cancel()">Cancel</button>
                        </div>
                    </div>
                </div>

                <div class="edit-inputs-container" id="addContainer" style="display:none">
                    <div class="scheduling-input-container">
                        <label for="addStart">Start Date</label>
                        <input oninput="markMissedDay('add')" type="date" id="addStart">
                    </div>
                    <div class="scheduling-input-container">
                        <label for="addEnd">End Date</label>
                        <input oninput="markMissedDay('add')" type="date" id="addEnd">
                    </div>
                </div>

                <div class="edit-inputs-container" id="editContainer" style="display:none">
                    <div class="scheduling-input-container">
                        <label for="editStart">Start Date</label>
                        <input oninput="markMissedDay('edit')" type="date" value="2023-01-01" id="editStart">
                    </div>
                    <div class="scheduling-input-container">
                        <label for="editEnd">End Date</label>
                        <input oninput="markMissedDay('edit')" type="date" value="2023-12-31" id="editEnd">
                    </div>
                </div>

                <div class="error-container">
                    <span class="msg"></span>
                </div>
                <div class="legend-container">
                    <div class="legend-label included">
                        <div class="box"></div>
                        <span>Included in date range</span>
                    </div>
                    <div class="legend-label excluded">
                        <div class="box"></div>
                        <span>Excluded in date range</span>
                    </div>
                </div>
                <div class="week-container">
                    <div id="monday" class="day">
                        <div class="day-header noday">Mon</div>
                        <div class="timeslot-container">
                        </div>
                    </div>
                    <div id="tuesday" class="day">
                        <div class="day-header noday">Tue</div>
                        <div class="timeslot-container">
                        </div>
                    </div>
                    <div id="wednesday" class="day">
                        <div class="day-header noday">Wed</div>
                        <div class="timeslot-container">
                        </div> 
                    </div>
                    <div id="thursday" class="day">
                        <div class="day-header noday">Thu</div>
                        <div class="timeslot-container">
                        </div>
                    </div>
                    <div id="friday" class="day">
                        <div class="day-header noday">Fri</div>
                        <div class="timeslot-container">
                        </div>
                    </div>
                    <div id="saturday" class="day">
                        <div class="day-header noday">Sat</div>
                        <div class="timeslot-container">
                        </div>
                    </div>
                </div>
            </div>
        </section>
`;

// By default yung content ni table is yung today lang
let adminLogs = `
    <div class="page-header">Home / Manage Admins / Admin Logs</div>
    <section class="admin-logs">
            <div class="admin-logs-wrapper" data-aos="fade-right" data-aos-duration="500">
                <div class="admin-logs__body">
                    <div class="admin-logs__filters">
                        <div class="filter-holder">
                            <label for="from">From</label>
                            <input type="date" name="" id="from" onchange='insertAdminLogs()'>
                        </div>
                        <div class="filter-holder">
                            <label for="">To</label>
                            <input type="date" name="" id="to" onchange='insertAdminLogs()'>
                        </div>
                        <div class="filter-holder">
                            <label for="activity">Activity</label>
                            <select class="form-select" aria-label="Default select example" id="activity" onchange='insertAdminLogs()'>
                                <option value="all" selected>All</option>
                                <option value="Approved">Approved a follow up request</option>
                                <option value="Blocked a new date">Blocked a date</option>
                                <option value="Changed a schedule in">Changed a department's schedule</option>
                                <option value="Changed a slot in ">Changed a slot in a department</option>
                                <option value="Changed admin type of">Changed an admin's type</option>
                                <option value="appointment status">Changed an appointment's status</option>
                                <option value="Changed Desktop Video Tutorial">Changed desktop video tutorial</option>
                                <option value="Changed Mobile Video Tutorial">Changed mobile video tutorial</option>
                                <option value="Changed Password">Changed password</option>
                                <option value="Changed Phone">Changed phone</option>
                                <option value="Changed the website status">Changed website status</option>
                                <option value="Created a new admin">Created a new admin</option>
                                <option value="Created a new schedule">Created a new schedule</option>
                                <option value="Posted an announcement">Posted an announcement</option>
                                <option value="Rejected">Rejected a follow up request</option>
                                <option value="Removed a slot in ">Removed a slot in a department</option>
                                <option value="Removed an admin">Removed an admin</option>
                                <option value="Removed an announcement">Removed an announcement</option>
                                <option value="Scheduled an appointment">Scheduled an appointment</option>
                                <option value="Removed a blocked date">Unblocked a date</option>
                                <option value="Viewed appointments">Viewed appointments</option> 
                            </select>
                        </div>
                        <div class="filter-holder">
                            <label for="adminType">Admin Type</label>
                            <select class="form-select" aria-label="Default select example" id="adminType" onchange='insertAdminLogs()'>
                                <option value="all">All</option>
                                <option value="admin i">Admin I</option>
                                <option value="admin ii ">Admin II</option>
                                <option value="super admin">Super Admin</option>
                            </select>
                        </div>
                        <div class="filter-holder">
                            <label for="username">Username</label>
                            <input type="text" oninput='insertAdminLogs()' id="username">
                        </div>
                    </div>
                    <div class="error-container">
                        <span class="msg"></span>
                    </div>
                </div>
                
                <div class="table-container">
                    <table class="logs-table" id="logs-table">
                        <thead>
                            <tr>
                                <th title="Click to sort by this column." onclick="adminLogsSort(this.dataset.sortby, this.dataset.sortstate);" data-sortState="0" data-sortby="username">Username</th>
                                <th title="Click to sort by this column." onclick="adminLogsSort(this.dataset.sortby, this.dataset.sortstate);" data-sortState="0" data-sortby="activity">Activity</th>
                                <th title="Click to sort by this column." onclick="adminLogsSort(this.dataset.sortby, this.dataset.sortstate);" data-sortState="0" data-sortby="adminType">Admin Type</th>
                                <th title="Click to sort by this column." onclick="adminLogsSort(this.dataset.sortby, this.dataset.sortstate);" data-sortState="0" data-sortby="dateTime">Date & Time</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="cmds-container">
                    <button type="button" class="export" data-table="logs-table">Export Table</button>
                    <div class="table-nav">
                        <button id="prevButton"><< Previous</button>
                        <span id="pageNum">1</span>
                        <button id="nextButton">Next >></button>
                    </div>
                </div>
            </div>
        </section>
`;

let adminList = `
<div class="page-header">Home / Manage Admins / Admin List</div>
<section class="admin-list">
    <div class="admin-list-wrapper" data-aos="fade-right" data-aos-duration="500">
    
    <div class="table-container">
        <table class="admin-table" id="admin-table">
            <thead>
                <tr>
                    <th title="Click to sort by this column." onclick="adminListSort(this.dataset.sortby, this.dataset.sortstate);" data-sortState="0" data-sortby="name">Full Name</th>
                    <th title="Click to sort by this column." onclick="adminListSort(this.dataset.sortby, this.dataset.sortstate);" data-sortState="0" data-sortby="username">Username</th>
                    <th title="Click to sort by this column." onclick="adminListSort(this.dataset.sortby, this.dataset.sortstate);" data-sortState="0" data-sortby="phoneNo">Phone #</th>
                    <th title="Click to sort by this column." onclick="adminListSort(this.dataset.sortby, this.dataset.sortstate);" data-sortState="0" data-sortby="adminType">Admin Type</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
    <div class="cmds-container">
        <button type="button" class="export" data-table="admin-table">Export Table</button>
        <div class="table-nav">
            <button id="prevButton"><< Previous</button>
            <span id="pageNum">1</span>
            <button id="nextButton">Next >></button>
        </div>
    </div>
</section>`;

// mag popup modal hinihingi otp from sa tintype. so bali yung superadmin acc need pero yung actual gamit ng acc mag regis
let createAccount = `
<div class="page-header">Home / Manage Admins / Create New Admin</div>
<section class="add-admin">
    <div class="form-container"  data-aos="fade-right" data-aos-duration="500">
        <form class="form" autocomplete="off">
            <div class="topcloud">
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
                <label for="middleName">Middle Name (Optional)</label>
            </div>
            <div class="input-container">
                <input type="text" name="lastName" id="lastName" required>
                <label for="lastName">Last Name</label>
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
<div class="page-header">Home / Manage Website Status</div>
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
                <textarea name="text" placeholder="" id="statusMsg" cols="30" rows="2" onblur="inputLimiterBlur(this.id, 240); statusMsgCounter(this.id, 'textAreaCounter', 240);" oninput="inputLimiter(this.id, 240); statusMsgCounter(this.id, 'textAreaCounter', 240);"></textarea>
                <div id="textAreaCounter">240</div>
            </div>
            <button class="changeStatus" onclick="confirmStatusChange()">Apply</button>
        </div>
    </div>
</section>`;

let postAnnouncement = `
<div class="page-header">Home / Post An Announcement</div>
<section class="postAnnouncement">
    <div class="postAnnouncement__content" data-aos="fade-right" data-aos-duration="500">
        <div class="announcement__input-container">
            <label for="announcementTitle">Header:</label>
            <input type="text" placeholder="" name="announcementTitle" id="announcementTitle" onblur="inputLimiterBlur(this.id, 120);" oninput="inputLimiter(this.id, 120)">
        </div>
        <div class="announcement__input-container">
            <label for="announcementBody">Body:</label>
            <textarea placeholder="Announcement content..." cols="30" rows="10" name="announcementBody" id="announcementBody" onblur="inputLimiterBlur(this.id, 1000); statusMsgCounter(this.id, 'announcementBody__counter', 1000);" oninput="inputLimiter(this.id, 1000); statusMsgCounter(this.id, 'announcementBody__counter', 1000);"></textarea>
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
<div class="page-header">Home / Post An Announcement / See Posted Announcements</div>
<section class="seeAnnouncements">
    <div class="seeAnnouncements__content" data-aos="fade-right" data-aos-duration="500">
        <h2>Users would only be able to see the latest 20 announcements.</h2>
        
        <div class="table-container">
            <table class="ann-table" id="ann-table">
                <thead>
                    <tr>
                        <th title="Click to sort by this column." onclick="postedAnnSort(this.dataset.sortby, this.dataset.sortstate);" data-sortState="0" data-sortby="title">Title</th>
                        <th title="Click to sort by this column." onclick="postedAnnSort(this.dataset.sortby, this.dataset.sortstate);" data-sortState="0" data-sortby="dateTime">Date & Time Posted</th>
                        <th title="Click to sort by this column." onclick="postedAnnSort(this.dataset.sortby, this.dataset.sortstate);" data-sortState="0" data-sortby="author">Author</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <div class="cmds-container">
            <div class="table-nav">
                <button id="prevButton"><< Previous</button>
                <span id="pageNum">1</span>
                <button id="nextButton">Next >></button>
            </div>
        </div>
    </div>
</section>
`;
// Add modal when delete is pressed confirming the action and then another modal to obtain OTP  from super admin's number  for additional security
let manageData = `
<div class="page-header">Home / Manage Data</div>
<section class="manage-data">
    <div class="manage-date__content" data-aos="fade-right" data-aos-duration="500">
        <div class="field">
            <span class="field__name">Admin Logs</span>
            <p class="field__desc">Permanently delete all existing admin logs from the database. This action is irreversible.</p>
            <button class="field__delete-btn" data-dltdata="0" onclick="deleteData(this.dataset.dltdata)">Delete</button>
        </div>
        <div class="field">
            <span class="field__name">Appointments</span>
            <p class="field__desc">Permanently delete all existing appointments from the database. This action is irreversible.</p>
            <button class="field__delete-btn" data-dltdata="1" onclick="deleteData(this.dataset.dltdata)">Delete</button>
        </div>
        <div class="field">
            <span class="field__name">Feedback</span>
            <p class="field__desc">Permanently delete all existing feedbacks from the database. This action is irreversible.</p>
            <button class="field__delete-btn" data-dltdata="2" onclick="deleteData(this.dataset.dltdata)">Delete</button>
        </div>
        <div class="field">
            <span class="field__name">Announcements</span>
            <p class="field__desc">Permanently delete all existing announcements from the database. This action is irreversible.</p>
            <button class="field__delete-btn" data-dltdata="3" onclick="deleteData(this.dataset.dltdata)">Delete</button>
        </div>
    </div>
</section>`;

// PAG PININDOT YUNG REPEAT EVERY YEAR MADISABLE YUNG YEAR FIELD
let blockDates = `
<div class="page-header">Home / Block Dates</div>
<section class="block-date">
            <div class="add-date" data-aos="fade-right" data-aos-duration="500">
                <div class="date-picker">
                    <input type="text" name="year" id="block-year" placeholder="YYYY" oninput="inputLimiterNum(this.id, 4)" onblur="inputLimiterBlur(this.id, 4)">

                    <input type="text" name="month" id="block-month" placeholder="MM" oninput="inputLimiterNum(this.id, 2)" onblur="inputLimiterBlur(this.id, 2)">
                    
                    <input type="text" name="day" id="block-day" placeholder="DD" oninput="inputLimiterNum(this.id, 2)" onblur="inputLimiterBlur(this.id, 2)">
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
                
                <div class="table-container">
                    <table class="date-table" id="date-table">
                        <thead>
                            <tr>
                                <th title="Click to sort by this column." onclick="blockSort(this.dataset.sortby, this.dataset.sortstate);" data-sortState="0" data-sortby="date">Date</th>
                                <th title="Click to sort by this column." onclick="blockSort(this.dataset.sortby, this.dataset.sortstate);" data-sortState="0" data-sortby="name">Name</th>
                                <th title="Click to sort by this column." onclick="blockSort(this.dataset.sortby, this.dataset.sortstate);" data-sortState="0" data-sortby="repeats">Repeats</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="cmds-container">
                    <div class="table-nav">
                        <button id="prevButton"><< Previous</button>
                        <span id="pageNum">1</span>
                        <button id="nextButton">Next >></button>
                    </div>
                </div>
            </div>
</section>`;

let feedback = `
<div class="page-header">Home / Feedback</div>
<section class="feedback">
            <div class="feedback-content" data-aos="fade-right" data-aos-duration="500">
                <div class="feedback__table">
                    <div class="table-container">
                        <table class="feedback-table" id="feedback-table">
                            <thead>
                                <tr>
                                    <th title="Click to sort by this column." onclick="feedbackSort(this.dataset.sortby, this.dataset.sortstate);" data-sortState="0" data-sortby="rating">Rating</th>
                                    <th title="Click to sort by this column." onclick="feedbackSort(this.dataset.sortby, this.dataset.sortstate);" data-sortState="0" data-sortby="feedback">Feedback</th>
                                    <th title="Click to sort by this column." onclick="feedbackSort(this.dataset.sortby, this.dataset.sortstate);" data-sortState="0" data-sortby="submitDate">Date Submitted</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <div class="cmds-container">
                        <button type="button" class="export" data-table="feedback-table">Export Table</button>
                        <div class="table-nav">
                            <button id="prevButton"><< Previous</button>
                            <span id="pageNum">1</span>
                            <button id="nextButton">Next >></button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
`;

let editTutorial = `
<div class="page-header">Home / Manage Video Tutorial</div>
<section class="edit-tutorial">
            <div class="edit-tutorial-content" data-aos="fade-right" data-aos-duration="500"z>
                <div class="edit-tutorial__instruction">
                    <span class="edit-tutorial__header">How to integrate YouTube video on iSchedule website</span>
                    <div class="edit-tutorial__step-container">
                        <span>1. Video must be set to either public/unlisted and in landscape</span>
                        <span>2. Go to the video and click "share"</span>
                        <span>3. Choose "Embed" option</span>
                        <span>4. Find the src, example: src="<span class="step-link">https://www.youtube.com/embed/a3ICNMQW7Ok?si=IWnYUlj7YutcHo1O</span>"</span>
                        <span>5. Copy the link inside the src of the video you want to use and paste it to either phone or desktop field</span>           
                    </div>
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
    highlightActive(0, true);
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
        let navLinks = document.querySelectorAll('.nav-links__item');
        highlightActive(1);
        generateDeptStats(30);
        insertQuickStats(30);

        document.querySelectorAll('.dept').forEach(item=>{
            item.addEventListener('click', deptClicked);
        })
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
        highlightActive(2);
    }   
}

function generateViewSchedule(){
    if(checkPrivilege('admin i') || checkPrivilege('admin ii') || checkPrivilege('super admin')){
        main.innerHTML = viewSchedule;
        setupViewApp();
        document.querySelector(".export").addEventListener('click', (e)=>{
            let tableClass = e.target.dataset.table;
            let table = document.querySelector(`.${tableClass}`);
            exportTableToExcel(table, "iSchedule_Appointments", [13]);
        });
        // insertApp();
        universalSort = null;
        universalSortStatus = null;
        highlightActive(3);
    }
}

function generateRequest(){
    if(checkPrivilege('admin ii') || checkPrivilege('super admin')){
        main.innerHTML = request;
        requestSort('dateSubmitted','1');
        highlightActive(4);
        universalSort = null;
        universalSortStatus = null;
    }
}

function generateScheduling(){
    if(checkPrivilege('super admin')){
        main.innerHTML = scheduling;
        highlightActive(5);
    }
}

function generateAdminLogs(){
    // contentIsOpen = true;
    if(checkPrivilege('super admin')){
        main.innerHTML = adminLogs;
        setupAdminLogs();
        adminLogsSort("dateTime", "1");
        document.querySelector(".export").addEventListener('click', (e)=>{
            let tableClass = e.target.dataset.table;
            let table = document.querySelector(`.${tableClass}`);
            exportTableToExcel(table, "iSchedule_AdminLogs", []);
        });
        highlightActiveManage(0);
        universalSort = null;
        universalSortStatus = null;
    }
}

function generateAdminList(){
    // contentIsOpen = true;
    if(checkPrivilege('super admin')){
        main.innerHTML = adminList;
        insertAdmin();
        document.querySelector(".export").addEventListener('click', (e)=>{
            let tableClass = e.target.dataset.table;
            let table = document.querySelector(`.${tableClass}`);
            exportTableToExcel(table, "iSchedule_AdminList", [4]);
        });
        universalSort = null;
        universalSortStatus = null;
        highlightActiveManage(1);
    }
}

function generateCreateAcc(){
    if(checkPrivilege('super admin')){
        main.innerHTML = createAccount;
        let iconPassword = document.querySelectorAll('.ico-pass');
        changeArrow();
        // contentIsOpen = true;
        createAccInputBorderStyle();
    
        highlightActiveManage(2);
    }
}

function generateWebsiteStatus(){
    if(checkPrivilege('super admin')){
        main.innerHTML = websiteStatus;
        insertWebsiteStatus();
        highlightActive(7);
    }
}

function generatePostAnnouncement(){
    if(checkPrivilege('admin ii') || checkPrivilege('super admin')){
        main.innerHTML = postAnnouncement;
        insertAnnouncement();
        highlightActive(8);
    }
}

function generateSeePostedAnn(){
    if(checkPrivilege('admin ii') || checkPrivilege('super admin')){
        main.innerHTML = seePostedAnn;
        postedAnnSort("dateTime", "1");
        universalSort = null;
        universalSortStatus = null;
    }
}

function generateManageData(){
    if(checkPrivilege('super admin')){
        main.innerHTML = manageData;
        highlightActive(9);
    }
}

function generateBlockDates(){
    if(checkPrivilege('super admin')){
        main.innerHTML = blockDates;
        insertBlockDate();
        showTableCell();
        highlightActive(10);
        universalSort = null;
        universalSortStatus = null;
    }
}

function generateFeedback(){
    if(checkPrivilege('admin ii') || checkPrivilege('super admin')){
        main.innerHTML = feedback;
        getFeedback();
        document.querySelector(".export").addEventListener('click', (e)=>{
            let tableClass = e.target.dataset.table;
            let table = document.querySelector(`.${tableClass}`);
            exportTableToExcel(table, "iSchedule_Feedback", []);
        });
        universalSort = null;
        universalSortStatus = null;
        highlightActive(11);
    }
}

function generateEditTutorial(){
    if(checkPrivilege('super admin')){
        main.innerHTML = editTutorial;
        highlightActive(12);
    }
}

function highlightActive(index, clear = false){
    if(!clear){
        let navLinks = document.querySelectorAll('.nav-links__item');

        navLinks.forEach(item=>{
            item.style.backgroundColor = 'unset';
            item.style.color = 'rgb(80, 78, 78)';
            try {
                item.querySelector('.ico-nav').style.color = 'rgb(189, 187, 187)';
                item.querySelector('.change').style.color = 'rgb(80, 78, 78)';
                item.querySelector('.master-btn-content').style.color = 'rgb(80, 78, 78)';
    
                let btns = document.querySelectorAll('.btn-content');
                btns.forEach(item=>{
                    item.style.backgroundColor = 'unset';
                    item.style.color = 'rgb(80, 78, 78)';
                    item.querySelector('.ico-nav--sub').style.color = 'rgb(189, 187, 187)';
                })
            } catch (error) {
                
            }  
        })

        document.getElementById(index).style.backgroundColor = '#ecf3fb';
        document.getElementById(index).style.color = '#0577fa';
        document.getElementById(index).querySelector('.ico-nav').style.color = '#0577fa';
    
    }
    else{
        let navLinks = document.querySelectorAll('.nav-links__item');

        navLinks.forEach(item=>{
            item.style.backgroundColor = 'unset';
            item.style.color = 'rgb(80, 78, 78)';
            try {
                item.querySelector('.ico-nav').style.color = 'rgb(189, 187, 187)';
                item.querySelector('.change').style.color = 'rgb(80, 78, 78)';
                item.querySelector('.master-btn-content').style.color = 'rgb(80, 78, 78)';

                let btns = document.querySelectorAll('.btn-content');
                btns.forEach(item=>{
                    item.style.backgroundColor = 'unset';
                    item.style.color = 'rgb(80, 78, 78)';
                    item.querySelector('.ico-nav--sub').style.color = 'rgb(189, 187, 187)';
                })
            } catch (error) {
                
            }  
        })
    }
}

function highlightActiveManage(index){
    let navLinks = document.querySelectorAll('.nav-links__item');

        navLinks.forEach(item=>{
            item.style.backgroundColor = 'unset';
            item.style.color = 'rgb(80, 78, 78)';
            try {
                item.querySelector('.ico-nav').style.color = 'rgb(189, 187, 187)';
            } catch (error) {
                
            }  
        })
    
    let btns = document.querySelectorAll('.btn-content');
    btns.forEach(item=>{
        item.style.backgroundColor = 'unset';
        item.style.color = 'rgb(80, 78, 78)';
        item.querySelector('.ico-nav--sub').style.color = 'rgb(189, 187, 187)';
    })

    navLinks[6].style.backgroundColor = '#ecf3fb';
    navLinks[6].querySelector('.change').style.color = '#0577fa';
    navLinks[6].querySelector('.master-btn-content').style.color = '#0577fa';
    navLinks[6].querySelector('.ico-nav').style.color = '#0577fa';

    btns[index].style.backgroundColor = '#ecf3fb';
    btns[index].style.color = '#0577fa';
    btns[index].querySelector('.ico-nav--sub').style.color = '#0577fa';
}
