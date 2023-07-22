const main = document.querySelector('main');

let createAccount = `
<section class="add-admin">
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
            <input type="password" name="password" id="password" required onpaste="return false;" ondrop="return false;">
            <span class="material-icons-outlined ico-pass">visibility_off</span>
            <label for="password">Password</label>
        </div>
        <div class="input-container">
            <input type="password" name="confirm-password" id="confirmPassword" required onpaste="return false;" ondrop="return false;">
            <span class="material-icons-outlined ico-pass">visibility_off</span>
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

let blockDates = `
<section class="block-date">
            <div class="add-date" data-aos="fade-right" data-aos-duration="1000">
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
                        </tbody>
                    </table>
                </div>
                <div class="date-picker">
                    <input type="text" name="day" id="block-day" placeholder="DD">
                    <span>/</span>
                    <input type="text" name="month" id="block-month" placeholder="MM">
                    <span>/</span>
                    <input type="text" name="year" id="block-year" placeholder="YYYY">
                </div>
                <div class="other-info">
                    <input type="text" placeholder="Name">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                        <label class="form-check-label" for="flexSwitchCheckDefault">Repeat Every Year</label>
                    </div>
                </div>
                <button class="btn-submitblock" onclick="if(!document.querySelector('.form-check-input').checked){alert('nice')};">Add</button>
            </div>
</section>`

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
            <textarea name="text" id="statusMsg" cols="30" rows="2" onblur="inputLimiterBlur(this.id, 120); statusMsgCounter();" oninput="inputLimiter(this.id, 120); statusMsgCounter();"></textarea>
            <div class="textAreaCounter">120/120</div>
        </div>
        <button class="changeStatus" onclick="alert('give warning regarding new status, such as what will happen')">Apply</button>
    </div>
</div>
</section>`;

function generateCreateAcc(){
    main.innerHTML = createAccount;
    let iconPassword = document.querySelectorAll('.ico-pass');
    changeArrow();
    contentIsOpen = true;
    createAccInputBorderStyle();

    iconPassword.forEach((item)=>{
        item.addEventListener('click', ()=>{
            if(item.innerHTML == 'visibility_off'){
                iconPassword.forEach((item2)=>{
                    item2.innerHTML = 'visibility'
                })
                document.querySelector('#password').setAttribute('type', 'text');
                document.querySelector('#confirmPassword').setAttribute('type', 'text');
            }
            else{
                iconPassword.forEach((item)=>{
                    item.innerHTML = 'visibility_off'
                })
                document.querySelector('#password').setAttribute('type', 'password');
                document.querySelector('#confirmPassword').setAttribute('type', 'password');
            }
        })
    });


}

function generateAdminLogs(){
    contentIsOpen = true;
    main.innerHTML = adminLogs;
    showTableCell();
}

function generateAdminList(){
    contentIsOpen = true;
    main.innerHTML = adminList;
    showTableCell();
}

function generateBlockDates(){
    main.innerHTML = blockDates;
    showTableCell();
}

function generateDashboard(){
    main.innerHTML = "";
}

function generateWebsiteStatus(){
    main.innerHTML = websiteStatus;
}