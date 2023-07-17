let createAccount = `
<section class="add-admin">
<div class="form-container"  data-aos="flip-right" data-aos-duration="1000" data-aos-delay="300">
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
            <input type="text" name="phone" id="phone" required>
            <label for="phone">Phone</label>
        </div>
        <div class="input-container">
            <input type="password" name="password" id="password" required>
            <span class="material-icons-outlined ico-pass">visibility_off</span>
            <label for="password">Password</label>
        </div>
        <div class="input-container">
            <input type="password" name="confirm-password" id="confirmPassword" required>
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
        <button class="btn--addAdmin">Create</button>
        </div>
    </form>
</div>
</section>`;

let adminLogs = `<section class="admin-logs">
<div class="admin-logs__body">
    <h2>Filter By</h2>
    <div class="admin-logs__filters">
        <input type="date" name="" id="">
        <select name="" id="">
            <option hidden selected disabled>Activity</option>
            <option value="">test</option>
            <option value="">test</option>
            <option value="">test</option>
        </select>
        <select name="" id="">
            <option hidden selected disabled>Admin Level</option>
            <option value="">test</option>
            <option value="">test</option>
            <option value="">test</option>
        </select>
        <select name="" id="">
            <option hidden selected disabled>Sort By</option>
            <option value="">test</option>
            <option value="">test</option>
            <option value="">test</option>
        </select>
        <input type="text" name="" id="" placeholder="Name">
        <button>Apply</button>
    </div>
</div>

<div class="table-container">
    <table class="logs-table">
        <thead>
            <tr>
                <th>Username</th>
                <th>Activity</th>
                <th>Date</th>
                <th >Time</th>
                <th>Admin Level</th>
            </tr>
        </thead>
        <tbody>
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
</section>`;
