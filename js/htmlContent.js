const main = document.querySelector('main');

//GAWING FORM YUNG MGA CONTAINER NG INPUT FIELDS?

let accountSettings = `<section class="account-settings">
<div class="account-settings__content"  data-aos="fade-right" data-aos-duration="1000">
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

let editPhone = `<section class="editPhone">
<div class="editPhone__content" data-aos="fade-right" data-aos-duration="1000">
    <div class="editPhone__input-container">
        <label for="">New Phone #</label>
        <input type="text" id="newPhone" oninput="filterPhoneInput(this.id)">
    </div>
    <div class="editPhone__input-container">
        <label for="">Password</label>
        <div class="password-container">
            <input type="password" id="confirmation" onpaste="return false;" ondrop="return false;">
            <span class="material-icons-outlined ico-see" id="passwordIco" onclick="seePassword('confirmation', this.id)">visibility_off</span>
        </div>
    </div>
    <button class="editPhone__submit" onclick="alert('labas modal na kunin OTP from new phone')">Update</button>
</div>
</section>`;

let editPassword = `<section class="edit-password">
<div class="edit-password__content" data-aos="fade-right" data-aos-duration="1000">
    <div class="edit-password__input-container">
        <label for="">Current Password</label>
        <div class="password-container">
            <input type="password" name="currentPassword" id="currentPassword">
            <span class="material-icons-outlined ico-see" id="currentPasswordLabel" onclick="seePassword('currentPassword', this.id)">visibility_off</span>
        </div>
    </div>
    <div class="edit-password__input-container">
        <label for="">New Password</label>
        <div class="password-container">
            <input type="password" name="newPassword" id="newPassword">
            <span class="material-icons-outlined ico-see" id="newPasswordLabel" onclick="seePassword('newPassword', this.id)">visibility_off</span>
        </div>
    </div>
    <div class="edit-password__input-container">
        <label for="">Confirm New Password</label>
        <div class="password-container">
            <input type="password" name="confirmNewPassword" id="confirmNewPassword">
            <span class="material-icons-outlined ico-see" id="confirmNewPasswordLabel" onclick="seePassword('confirmNewPassword', this.id)">visibility_off</span>
        </div>
    </div>

    <button class="edit-password__submit" onclick="alert('labas modal password is sucessfully changed')">Apply</button>
</div>
</section>`;

let dashboard = `<section class="dashboard">
<div class="dashboard__left">
    <div class="dashboard__per-dept" data-aos="fade-down" data-aos-duration="1000">
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
    <div class="dashboard__stats" data-aos="fade-up" data-aos-duration="1000">
        <div class="dashboard__block" title="Recent appointments from the last 30 days.">Recent Appointments<span>1134</span></div>
        <div class="dashboard__block" title="Recent appointments obtained from the website.">Recent Appointments from Website<span> 1112</span></div>
        <div class="dashboard__block" title="Recent appointments obtained from others.">Recent Appointments from Others<span> 22</span></div>
        <div class="dashboard__block" title="Overall amount of appointments.">Total Appointments<span>2123</span></div>
        <div class="dashboard__block" title="Recent admin activities from the last 30 days.">Recent Admin Activities<span> 752</span></div>
        <div class="dashboard__block" title="Recent website visits from the last 30 days.">Recent Website Visits<span> 1421</span></div>
    </div>
</div>
<div class="dashboard__right">
    <div class="dashboard__all-patients" data-aos="fade-left" data-aos-duration="1000">
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

// By default yung content ni table is yung today lang
let adminLogs = `<section class="admin-logs">
<div class="admin-logs-wrapper" data-aos="fade-right" data-aos-duration="1000">
    <div class="admin-logs__body">
        <h2>Filter</h2>
        <div class="admin-logs__filters">
            <input type="date" name="" id="">
            <select class="form-select" aria-label="Default select example">
                <option hidden selected disabled>Activity</option>
                <option value="">test</option>
                <option value="">test</option>
                <option value="">test</option>
            </select>
            <select class="form-select" aria-label="Default select example">
                <option hidden selected disabled>Admin Type</option>
                <option value="">test</option>
                <option value="">test</option>
                <option value="">test</option>
            </select>
            <select class="form-select" aria-label="Default select example">
                <option hidden selected disabled>Sort By</option>
                <option value="">test</option>
                <option value="">test</option>
                <option value="">test</option>
            </select>
            <div class="search-container">
                <input type="text" placeholder="Search" id="adminLogsSearch" onblur="inputLimiterBlur(this.id, 60)" oninput="inputLimiter(this.id, 60)">
            </div>
            <button>Apply</button>
        </div>
    </div>
    <span>Click the row to highlight/see more.</span>
    <div class="table-container">
        <table class="logs-table">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Activity</th>
                    <th>Date</th>
                    <th >Time</th>
                    <th>Admin Type</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>clarence-coronelclarence-coronelclarence-coronel</td>
                    <td>View Schedule view1 view2 view3 view4 view5 view6 view7 view8 view9 view10</td>
                    <td>21 July 2023</td>
                    <td>13:00</td>
                    <td>Admin II</td>
                </tr>
                <tr>
                    <td>clarence-coronel</td>
                    <td>View Schedule</td>
                    <td>21 July 2023</td>
                    <td>13:00</td>
                    <td>Admin II</td>
                </tr>
                <tr>
                    <td>clarence-coronel</td>
                    <td>View Schedule</td>
                    <td>21 July 2023</td>
                    <td>13:00</td>
                    <td>Admin II</td>
                </tr>
                <tr>
                    <td>clarence-coronel</td>
                    <td>View Schedule</td>
                    <td>21 July 2023</td>
                    <td>13:00</td>
                    <td>Admin II</td>
                </tr>
                <tr>
                    <td>clarence-coronel</td>
                    <td>View Schedule</td>
                    <td>21 July 2023</td>
                    <td>13:00</td>
                    <td>Admin II</td>
                </tr>
                <tr>
                    <td>clarence-coronel</td>
                    <td>View Schedule</td>
                    <td>21 July 2023</td>
                    <td>13:00</td>
                    <td>Admin II</td>
                </tr>
                <tr>
                    <td>clarence-coronel</td>
                    <td>View Schedule</td>
                    <td>21 July 2023</td>
                    <td>13:00</td>
                    <td>Admin II</td>
                </tr>
                <tr>
                    <td>clarence-coronel</td>
                    <td>View Schedule</td>
                    <td>21 July 2023</td>
                    <td>13:00</td>
                    <td>Admin II</td>
                </tr>
                <tr>
                    <td>clarence-coronel</td>
                    <td>View Schedule</td>
                    <td>21 July 2023</td>
                    <td>13:00</td>
                    <td>Admin II</td>
                </tr>
                <tr>
                    <td>clarence-coronel</td>
                    <td>View Schedule</td>
                    <td>21 July 2023</td>
                    <td>13:00</td>
                    <td>Admin II</td>
                </tr>
                <tr>
                    <td>clarence-coronel</td>
                    <td>View Schedule</td>
                    <td>21 July 2023</td>
                    <td>13:00</td>
                    <td>Admin II</td>
                </tr>
                <tr>
                    <td>clarence-coronel</td>
                    <td>View Schedule</td>
                    <td>21 July 2023</td>
                    <td>13:00</td>
                    <td>Admin II</td>
                </tr>
                <tr>
                    <td>clarence-coronel</td>
                    <td>View Schedule</td>
                    <td>21 July 2023</td>
                    <td>13:00</td>
                    <td>Admin II</td>
                </tr>
                <tr>
                    <td>clarence-coronel</td>
                    <td>View Schedule</td>
                    <td>21 July 2023</td>
                    <td>13:00</td>
                    <td>Admin II</td>
                </tr>
                <tr>
                    <td>clarence-coronel</td>
                    <td>View Schedule</td>
                    <td>21 July 2023</td>
                    <td>13:00</td>
                    <td>Admin II</td>
                </tr>
                <tr>
                    <td>clarence-coronel</td>
                    <td>View Schedule</td>
                    <td>21 July 2023</td>
                    <td>13:00</td>
                    <td>Admin II</td>
                </tr>
                <tr>
                    <td>clarence-coronel</td>
                    <td>View Schedule</td>
                    <td>21 July 2023</td>
                    <td>13:00</td>
                    <td>Admin II</td>
                </tr>
                <tr>
                    <td>clarence-coronel</td>
                    <td>View Schedule</td>
                    <td>21 July 2023</td>
                    <td>13:00</td>
                    <td>Admin II</td>
                </tr>
                <tr>
                    <td>clarence-coronel</td>
                    <td>View Schedule</td>
                    <td>21 July 2023</td>
                    <td>13:00</td>
                    <td>Admin II</td>
                </tr>
                <tr>
                    <td>clarence-coronel</td>
                    <td>View Schedule</td>
                    <td>21 July 2023</td>
                    <td>13:00</td>
                    <td>Admin II</td>
                </tr>
                <tr>
                    <td>clarence-coronel</td>
                    <td>View Schedule</td>
                    <td>21 July 2023</td>
                    <td>13:00</td>
                    <td>Admin II</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</section>`;

let adminList = `<section class="admin-list">
<div class="admin-list-wrapper" data-aos="fade-right" data-aos-duration="1000">
<div class="admin-table__body">
    <div class="search-container">
        <input type="text" placeholder="Search" id="adminSearch" onblur="inputLimiterBlur(this.id, 60)" oninput="inputLimiter(this.id, 60)">
        <button><span class="material-icons-outlined ico-search">search</span></button>
    </div>
</div>
<span>Click the row to highlight/see more.</span>
<div class="table-container">
    <table class="admin-table">
        <thead>
            <tr>
                <th>Username</th>
                <th>Full Name</th>
                <th>Phone #</th>
                <th>Admin Type</th>
                <th>&nbsp;</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>clarence-coronel2l</td>
                <td>Coronel, Clarence Reyes</td>
                <td>0987 788 5644</td>
                <td><button class="editLevel" onclick="editLevel(this)" data-username="clarence-coronel1">Admin I<span class="ico-list ico-edit">(edit)</span></button></td>
                <td><button class="removeAdmin" onclick="removeAdmin(this)" data-username="clarence-coronel1">delete</button></td>
            </tr>
            <tr>
                <td>clarence-coronel2l</td>
                <td>Coronel, Clarence Reyes</td>
                <td>0987 788 5644</td>
                <td><button class="editLevel" onclick="editLevel(this)" data-username="clarence-coronel1">Admin I<span class="ico-list ico-edit">(edit)</span></button></td>
                <td><button class="removeAdmin" onclick="removeAdmin(this)" data-username="clarence-coronel1">delete</button></td>
            </tr>
            <tr>
                <td>clarence-coronel2l</td>
                <td>Coronel, Clarence Reyes</td>
                <td>0987 788 5644</td>
                <td><button class="editLevel" onclick="editLevel(this)" data-username="clarence-coronel1">Admin II<span class="ico-list ico-edit">(edit)</span></button></td>
                <td><button class="removeAdmin" onclick="removeAdmin(this)" data-username="clarence-coronel1">delete</button></td>
            </tr>
            <tr>
                <td>clarence-coronel2l</td>
                <td>Coronel, Clarence Reyes</td>
                <td>0987 788 5644</td>
                <td><button class="editLevel" onclick="editLevel(this)" data-username="clarence-coronel1">Admin I <span class="ico-list ico-edit">(edit)</span></button></td>
                <td><button class="removeAdmin" onclick="removeAdmin(this)" data-username="clarence-coronel1">delete</button></td>
            </tr>
            <tr>
                <td>clarence-coronel2l</td>
                <td>Coronel, Clarence Reyes</td>
                <td>0987 788 5644</td>
                <td><button class="editLevel" onclick="editLevel(this)" data-username="clarence-coronel1">Super Admin<span class="ico-list ico-edit">(edit)</span></button></td>
                <td><button class="removeAdmin" onclick="removeAdmin(this)" data-username="clarence-coronel1">delete</button></td>
            </tr>
        </tbody>
    </table>
</div>
</section>`;

// mag popup modal hinihingi otp from sa tintype. so bali yung superadmin acc need pero yung actual gamit ng acc mag regis
let createAccount = `<section class="add-admin">
<div class="form-container"  data-aos="fade-right" data-aos-duration="1000">
    <form class="form" autocomplete="off" onsubmit="return createAccountValidator()">
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
            <span class="material-icons-outlined ico-pass" id="passwordLabel" onclick="seePassword('password', this.id)">visibility_off</span>
            <label for="password">Password</label>
        </div>
        <div class="input-container">
            <input type="password" name="confirm-password" id="confirmPassword" required onpaste="return false;" ondrop="return false;">
            <span class="material-icons-outlined ico-pass" id="confirmPasswordLabel" onclick="seePassword('confirmPassword', this.id)">visibility_off</span>
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
        <button class="btn--addAdmin" formnovalidate>Create</button>
        </div>
    </form>
</div>
</section>`;

let websiteStatus = `<section class="website-status">
<div class="website-status__wrapper" data-aos="fade-right" data-aos-duration="1000">
    <div class="status">
        <div class="status__header">
            <!-- highlight_off = kapag down website -->
            <!-- block =kapag down scheduling -->
            <span class="material-icons-outlined ico-status ico-live">check_circle_outline</span>
            Website is Up
            <!-- Possible Values
                *Website Is Up
                *Website Is Down
                *Scheduling Is Down
            -->
        </div>
        <div class="status__msg">
            <span class="msg-label">Message:</span> loresmloresmloresmloresmloresmloresmloresmloresmloresmloresmloresmloresmloresm loresmloresmloresmloresmloresm loresmloresmloresmloresmloresmloresm loresmloresmloresmloresmloresm
            <!-- Applicable lang if either Website is Down or Online Scheduling is down -->
        </div>
    </div>
    <div class="change-status">
        <!-- <h3>Change Status</h3> -->
        <select class="form-select" aria-label="Default select example">
            <option value="up">Website is Up</option>
            <option value="down">Website is Down</option>
            <option value="scheduledown">Scheduling is Down</option>
        </select>
        <!-- Naka enable lang to if either website is down or scheduling is down hindi kapag completely up si website -->
        <div class="msg-container">
            <label for="msg">Message:</label>
            <textarea name="text" id="statusMsg" cols="30" rows="2" onblur="inputLimiterBlur(this.id, 120); statusMsgCounter(this.id, 'textAreaCounter', 120);" oninput="inputLimiter(this.id, 120); statusMsgCounter(this.id, 'textAreaCounter', 120);"></textarea>
            <div id="textAreaCounter">120</div>
        </div>
        <button class="changeStatus" onclick="alert('give warning regarding new status, such as what will happen')">Apply</button>
    </div>
</div>
</section>`;

let postAnnouncement = `<section class="postAnnouncement">
<div class="postAnnouncement__content" data-aos="fade-right" data-aos-duration="1000">
    <div class="announcement__input-container">
        <label for="announcementTitle">Announcement Title:</label>
        <input type="text" name="announcementTitle" id="announcementTitle" onblur="inputLimiterBlur(this.id, 30);" oninput="inputLimiter(this.id, 30)">
    </div>
    <div class="announcement__input-container">
        <label for="announcementBody">Announcement Body:</label>
        <textarea cols="30" rows="10" name="announcementBody" id="announcementBody" onblur="inputLimiterBlur(this.id, 1000); statusMsgCounter(this.id, 'announcementBody__counter', 1000);" oninput="inputLimiter(this.id, 1000); statusMsgCounter(this.id, 'announcementBody__counter', 1000);"></textarea>
        <div id="announcementBody__counter">1000</div>
    </div>
    <button id="announcementSubmit">Post</button>
</div>
</section>`;

// Add modal when delete is pressed confirming the action and then another modal to obtain OTP  from super admin's number  for additional security
let manageData = `<section class="manage-data">
<div class="manage-date__content" data-aos="fade-right" data-aos-duration="1000">
    <div class="field">
        <span class="field__name">Admin Logs</span>
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
            <div class="add-date" data-aos="fade-right" data-aos-duration="1000">
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
                            <tr>
                                <td>25 December 2023</td>
                                <td>Christmas</td>
                                <td>Yes</td>
                                <td><button class="removeDate" data-date="2023-12-25">delete</button></td>
                            </tr>
                            <tr>
                                <td>25 December 2023</td>
                                <td>Christmas</td>
                                <td>Yes</td>
                                <td><button class="removeDate" data-date="2023-12-25">delete</button></td>
                            </tr>
                            <tr>
                                <td>25 December 2023</td>
                                <td>Christmas</td>
                                <td>Yes</td>
                                <td><button class="removeDate" data-date="2023-12-25">delete</button></td>
                            </tr>
                            <tr>
                                <td>25 December 2023</td>
                                <td>Christmas</td>
                                <td>Yes</td>
                                <td><button class="removeDate" data-date="2023-12-25">delete</button></td>
                            </tr>
                            <tr>
                                <td>25 December 2023</td>
                                <td>Christmas</td>
                                <td>Yes</td>
                                <td><button class="removeDate" data-date="2023-12-25">delete</button></td>
                            </tr>
                            <tr>
                                <td>25 December 2023</td>
                                <td>Christmas</td>
                                <td>Yes</td>
                                <td><button class="removeDate" data-date="2023-12-25">delete</button></td>
                            </tr>
                            <tr>
                            <td>25 December 2023</td>
                            <td>Christmas</td>
                            <td>Yes</td>
                            <td><button class="removeDate" data-date="2023-12-25">delete</button></td>
                        </tr>
                        <tr>
                            <td>25 December 2023</td>
                            <td>Christmas</td>
                            <td>Yes</td>
                            <td><button class="removeDate" data-date="2023-12-25">delete</button></td>
                        </tr>
                        <tr>
                            <td>25 December 2023</td>
                            <td>Christmas</td>
                            <td>Yes</td>
                            <td><button class="removeDate" data-date="2023-12-25">delete</button></td>
                        </tr>
                        <tr>
                            <td>25 December 2023</td>
                            <td>Christmas</td>
                            <td>Yes</td>
                            <td><button class="removeDate" data-date="2023-12-25">delete</button></td>
                        </tr>
                        <tr>
                            <td>25 December 2023</td>
                            <td>Christmas</td>
                            <td>Yes</td>
                            <td><button class="removeDate" data-date="2023-12-25">delete</button></td>
                        </tr>
                        <tr>
                            <td>25 December 2023</td>
                            <td>Christmas</td>
                            <td>Yes</td>
                            <td><button class="removeDate" data-date="2023-12-25">delete</button></td>
                        </tr>
                        <tr>
                        <td>25 December 2023</td>
                        <td>Christmas</td>
                        <td>Yes</td>
                        <td><button class="removeDate" data-date="2023-12-25">delete</button></td>
                        </tr>
                        <tr>
                            <td>25 December 2023</td>
                            <td>Christmas</td>
                            <td>Yes</td>
                            <td><button class="removeDate" data-date="2023-12-25">delete</button></td>
                        </tr>
                        <tr>
                            <td>25 December 2023</td>
                            <td>Christmas</td>
                            <td>Yes</td>
                            <td><button class="removeDate" data-date="2023-12-25">delete</button></td>
                        </tr>
                        <tr>
                            <td>25 December 2023</td>
                            <td>Christmas</td>
                            <td>Yes</td>
                            <td><button class="removeDate" data-date="2023-12-25">delete</button></td>
                        </tr>
                        <tr>
                            <td>25 December 2023</td>
                            <td>Christmas</td>
                            <td>Yes</td>
                            <td><button class="removeDate" data-date="2023-12-25">delete</button></td>
                        </tr>
                        <tr>
                            <td>25 December 2023</td>
                            <td>Christmas</td>
                            <td>Yes</td>
                            <td><button class="removeDate" data-date="2023-12-25">delete</button></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="date-picker">
                    <input type="text" name="day" id="block-day" placeholder="DD" oninput="inputLimiterNum(this.id, 2)" onblur="inputLimiterBlur(this.id, 2)">
                    <span>/</span>
                    <input type="text" name="month" id="block-month" placeholder="MM" oninput="inputLimiterNum(this.id, 2)" onblur="inputLimiterBlur(this.id, 2)">
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
                <button class="btn-submitblock" onclick="if(!document.querySelector('.form-check-input').checked){alert('nice')};">Add</button>
            </div>
</section>`


// Ipakita autogenerated na username after success OTP ex clarence-coronel12
// Auto generate dashboard assuming si super admin nag login lagyan pa logic to kung ano una page depende sa nag login
// generateDashboard();


// PAGE GENERATORS

function generateAccountSettings(){
    main.innerHTML = accountSettings;
}

function generateEditPhone(){
    main.innerHTML = editPhone;
}

function generateEditPassword(){
    main.innerHTML = editPassword;
}

function generateDashboard(){
    main.innerHTML = dashboard;
}

function generateAdminLogs(){
    // contentIsOpen = true;
    main.innerHTML = adminLogs;
    showTableCell();
}

function generateAdminList(){
    // contentIsOpen = true;
    main.innerHTML = adminList;
    showTableCell();
}

function generateCreateAcc(){
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

function generateWebsiteStatus(){
    main.innerHTML = websiteStatus;
}

function generatePostAnnouncement(){
    main.innerHTML = postAnnouncement;
}

function generateManageData(){
    main.innerHTML = manageData;
}

function generateBlockDates(){
    main.innerHTML = blockDates;
    showTableCell();
}