let headerBtn = document.querySelectorAll('.header-btn');
let navLinks = document.querySelector('.nav-links');
let accountSetting = document.querySelector('.account-setting');
let accountBtn = document.querySelectorAll('.accBtn');
let screenDarken = document.querySelector('.darken-screen');
let navLinkItem = document.querySelectorAll('.nav-links__item');
let desktopMode = false;
let contentIsOpen = false;
let formErrorMessage = '';
let formState = 0;
let quickViewIsActive = true;
let generatedUsername = '';
let newInsertedPhone = "";
let isResendAvail = false;
let currentWebStatus = null;

// If want natin ireset auto increment
// ALTER TABLE tableName AUTO_INCREMENT = 1

// AOS Initialization
AOS.init();
initial();

// DAPAT NAKA BCRYPT DIN YUNG OTP(LAHAT) AND CHAKA NATIN ICOMPARE SA DATABASE
const fakeOTP = '12345';

// DI KASAMA YUNG USERNAME KASI SA BACKEND NATIN SIYA IGENERATE FIRSTNAME-LASTNAME#kung pangilan siya ex.clarence-coronel2
const newAdmin = {
    'firstName': '',
    'middleName': '',
    'lastName': '',
    'phone': '',
    'password': '',
    'adminType': '',
}

// if(window.innerWidth > window.innerHeight){
//     alert('pasok');
//     document.querySelector('.nav-links').style.minHeight = "500px";
// }

applyAdminInfo();

setInterval(checkSession, 30000);
setInterval(checkAdminPrivChange, 30000);

function checkSession(){
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                if(xhr.responseText == 0){
                    alert('Your session has ended. Please login again to continue.');
                    window.location.replace("./page/login.php");
                }
            }
        }
    }

    xhr.open('GET', './php/testSession.php', true);
    xhr.send();
}

function initial(){

    changeAccess();

    headerBtn.forEach((item)=>{
        item.addEventListener('click', ()=>{
            navLinks.style.left = "0";
            screenDarken.style.display = 'block';
        });
    });
    
    accountBtn.forEach((item)=>{
        item.addEventListener('click', ()=>{
            accountSetting.style.display = 'flex';
        });
    });
    
    window.addEventListener('click', (e)=>{
        // console.log(e.target.getAttribute('data-click'));

        if(e.target.getAttribute('data-click') != 'doNothing'){
            
            navLinks.style.left = "-300px"
            screenDarken.style.display = 'none';
            accountSetting.style.display = 'none';
            document.querySelector('.manage-admins__sub-container').style.display = 'none';

            if(document.querySelector('.manage-admins__sub-container').style.display == 'none'){
                let newIco = document.querySelector('.change').innerHTML ='chevron_right';
                document.querySelector('.change').innerHTML = newIco;
            }

        }
    });
}

function determineDeviceDB(){
    let deptStatitics = document.querySelector('.dashboard__all-patients');
    
    if(window.innerWidth < window.innerHeight) {
        // mobile
        deptStatitics.removeAttribute('data-aos');
        deptStatitics.removeAttribute('data-aos-duration');
    }
    else{
        // desktop

        try {
            deptStatitics.removeAttribute('data-aos');
            deptStatitics.removeAttribute('data-aos-duration');
        } catch (error) {
            
        }
        

        deptStatitics.setAttribute('data-aos', 'fade-left');
        deptStatitics.setAttribute('data-aos-duration', '500');
    }
}

function applyAdminInfo(){
    let accName = document.querySelector('.account-name');
    let role = document.querySelector('.role');
    let adminType = signedInAdmin.adminType;

    accName.innerText = `${capitalFirstLetter(signedInAdmin.firstName)} ${capitalFirstLetter(signedInAdmin.middleName)} ${capitalFirstLetter(signedInAdmin.lastName)}`;

    role.innerText = capitalFirstLetter(adminType);
}

function createAccInputBorderStyle(){
    let inputContainer = document.querySelectorAll('.input-container');
    inputContainer.forEach((item)=>{
            item.querySelector('input').addEventListener('focusin',()=>{
                
                item.style.borderColor = '#4e73df'; //primary-color
            })
        
            item.querySelector('input').addEventListener('focusout',()=>{
                if(item.querySelector('input').value == ""){
                    item.style.borderColor = 'rgb(80, 78, 78)'; //fontbase-color
                }
            })   
    });
}

function generateAdminTypeModal(val){
    resetModal();

    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');
    let modalPositive = document.querySelector('.positive');
    let modalNegative = document.querySelector('.negative');
    let close = document.querySelector('.btn-close');
    let modalHeader = document.querySelector('.modal-header');
    let modalFooter = document.querySelector('.modal-footer');
    
    modalHeader.style.display = 'flex';
    modalFooter.style.display = 'flex';

    modalNegative.innerText = 'Close';
    
    modalPositive.style.display = 'none';
    close.style.display = 'none';
    modalTitle.style.color = 'rgb(80, 78, 78)';

    if(val == 0){
        modalTitle.innerHTML = 'Admin I Capabilities'
        modalBody.innerHTML = 
        `
            *View Appointments
        `
    }
    else if(val == 1){
        modalTitle.innerHTML = 'Admin II Capabilities'
        modalBody.innerHTML = 
        `   
            *Schedule An Appointment <br>
            *View Appointments  <br>
            *Follow-Up Requests  <br>
            *Post An Announcement  <br>
            *Feedback  <br>
        `
    }
    else if(val == 2){
        modalTitle.innerHTML = 'Super Admin Capabilities'
        modalBody.innerHTML = 
        `   
            *Dashboard <br>
            *Schedule An Appointment <br>
            *View Appointments  <br>
            *Follow-Up Requests  <br>
            *Edit Department Schedules  <br>
            *Manage Admins <br>
            *Manage Website Status <br>
            *Post An Announcement  <br>
            *Manage Data  <br>
            *Block Dates <br>
            *Feedback <br>
        `
    }

    modalLauncher();

}

function generateErrorModal(){
    resetModal();

    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');
    let modalPositive = document.querySelector('.positive');
    let modalNegative = document.querySelector('.negative');
    let close = document.querySelector('.btn-close');

    let modalHeader = document.querySelector('.modal-header');
    let modalFooter = document.querySelector('.modal-footer');

    modalHeader.style.display = 'flex';
    modalFooter.style.display = 'flex';

    modalPositive.style.display = 'none';
    modalTitle.innerText = 'Invalid Input';
    modalTitle.style.color = 'red';
    modalNegative.innerText = 'Close';

    modalBody.innerHTML = formErrorMessage;

    modalLauncher();
}

function modalLauncher(){
    // let positive = document.querySelector('.positive');

    // positive.removeAttribute('onclick');
    let modalLauncher = document.querySelector('.modal-launcher');
    modalLauncher.click();
}

function showManageAdmins(){
    const manageAdmin = document.querySelector('.manage-admins__sub-container');   

    let newDisplay = manageAdmin.style.display == 'none' ? 'block' : 'none';
    changeArrow()

    manageAdmin.style.display = newDisplay;

    // if(!contentIsOpen) manageAdmin.style.display = newDisplay;

    // contentIsOpen = false;
}

function changeArrow(){
    let newIco = document.querySelector('.change').innerHTML == 'chevron_right' ? 'chevron_left' : 'chevron_right';
    document.querySelector('.change').innerHTML = newIco;
}

function showTableCell(){
    let tableRow = document.querySelectorAll('tr');
    let tableData = document.querySelectorAll('td');

    tableRow.forEach((item)=>{
        item.addEventListener('click', ()=>{
            tableData.forEach((item)=>{
                item.classList.remove('selected');

                try {
                    item.querySelector('.editBtn').style.color = 'rgb(80, 78, 78)';
                } catch (error) {
                    
                }
            });

            item.querySelectorAll('td').forEach((item2)=>{
                item2.classList.add('selected');

                try {
                    item2.querySelector('.editBtn').style.color = 'white';
                    // item2.querySelector('.ico-edit').style.color = 'white';
                } catch (error) {
                    
                }
            });
        })
    })
}

function editType(data){
    let username = data.split("_")[0];
    let type = data.split("_")[1];

    resetModal();
    
    let body = document.querySelector(".modal-body");
    let title = document.querySelector('.modal-title');
    let headerClose = document.querySelector('.btn-close');
    let positive = document.querySelector('.positive');
    let negative = document.querySelector('.negative');

    body.innerHTML = `
    <div class="radio-container">
        <div class="radiobtn-container">
            <input type="radio" id="adminI" name="adminType" value="adminI" required>
            <label for="adminI">Admin I</label>
        </div>
        <div class="radiobtn-container">
            <input type="radio" id="adminII" name="adminType" value="adminII" required>
            <label for="adminII">Admin II</label>
        </div>
        <div class="radiobtn-container">
            <input type="radio" id="superAdmin" name="adminType" value="superAdmin" required>
            <label for="superAdmin">Super Admin</label>
        </div>
    </div>
    `

    if(type == "Admin I") document.querySelector("#adminI").checked = true;
    else if(type == "Admin II") document.querySelector("#adminII").checked = true;
    else if(type == "Super Admin") document.querySelector("#superAdmin").checked = true;

    title.innerText = 'Edit admin type'
    positive.innerText = 'Apply';
    negative.innerText = 'Cancel';
    
    positive.setAttribute('onclick', `applyNewType("${username}", "${type}")`);
    modalLauncher();
}

function applyNewType(username, currentType){

    let selected = null;

    if(document.querySelector("#adminI").checked){
        selected = "Admin I"
    }
    else if(document.querySelector("#adminII").checked){
        selected = "Admin II"
    }
    else if(document.querySelector("#superAdmin").checked){
        selected = "Super Admin"
    }

    if(currentType != selected){
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    if(xhr.responseText == 1){
                        setTimeout(()=>{
                            showResModal("Admin type has been changed");
                            generateAdminList();
                            showTableCell();
                        }, 500)
                    }
                }
            }
        }

        xhr.open("POST", "./php/changeAdminType.php", false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(`username=${username}&newType=${selected}`);

    }
}

function removeAdmin(element){
    alert("labas modal");
    alert(element.getAttribute('data-username'));
}

function createAccountValidator(){
    // 
    // FIRST NAME **************************
    // 
    newAdmin["firstName"] = document.querySelector('#firstName').value.trim().toLowerCase();
    // Check if firstName is Empty
    if(newAdmin['firstName'] == ""){
        errorHandler('00');
        return false;
    } 
    // Check if may numero or special character si name
    if(!isLettersOnly(newAdmin['firstName'])){
        errorHandler('01');
        return false;
    } 
    // Check if more than 30 characters si name or 1 character lang
    if((newAdmin['firstName']).length > 30 || newAdmin['firstName'].length == 1){
        errorHandler('02');
        return false;
    }

    // 
    // MIDDLE NAME **************************
    // 
    newAdmin["middleName"] = document.querySelector('#middleName').value.trim().toLowerCase();
    // Check if middleName is Empty
    if(newAdmin['middleName'] == ""){
        errorHandler('10');
        return false;
    } 
    // Check if may numero or special character si middleName
    if(!isLettersOnly(newAdmin['middleName'])){
        errorHandler('11');
        return false;
    } 
    // Check if more than 30 characters si middle name
    if((newAdmin['middleName']).length > 30){
        errorHandler('12');
        return false;
    }
    // Check if 1 character lang
    if((newAdmin['middleName']).length == 1){
        errorHandler('13');
        return false;
    }

    // 
    // LAST NAME **************************
    // 
    newAdmin["lastName"] = document.querySelector('#lastName').value.trim().toLowerCase();
    // Check if lastName is Empty
    if(newAdmin['lastName'] == ""){
        errorHandler('20');
        return false;
    } 
    // Check if may numero or special character si lastName
    if(!isLettersOnly(newAdmin['lastName'])){
        errorHandler('21');
        return false;
    } 
    // Check if more than 30 characters si lastName
    if((newAdmin['lastName']).length > 30 || (newAdmin['lastName']).length == 1){
        errorHandler('22');
        return false;
    }

    // 
    // PHONE NUMBER **************************
    // 
    newAdmin['phone'] = document.querySelector('#phone').value.replaceAll(' ', '').trim();
    if(newAdmin["phone"] == ""){
        errorHandler('30');
        return false;
    }
    else if(newAdmin["phone"].length != 11){
        errorHandler('31');
        return false;
    }
    else if(isNaN(newAdmin["phone"])){
        errorHandler('32');
        return false;
    }
    else if((newAdmin["phone"]).slice(0, 2) != '09'){
        errorHandler('33');
        return false;
    }

    // Inserts spaces to phone num
    newAdmin['phone'] = properPhoneNum(newAdmin['phone']);
    
    if(document.querySelector('#password').value == ''){
        errorHandler('40')
        return false;
    }
    else if(document.querySelector('#confirmPassword').value == ''){
        errorHandler('41')
        return false;
    }

    if(document.querySelector('#password').value === document.querySelector('#confirmPassword').value){
        newAdmin['password'] = document.querySelector('#confirmPassword').value;

        if(newAdmin['password'].length < 8){
            // too short
            errorHandler('42');
            return false;
        }
        else if(newAdmin['password'].length > 64){
            // too long
            errorHandler('43');
            return false;
        }
        else if(!containsLetterNumSpeChar(newAdmin['password'])){
            // does not contain lower and upper case, num, special char which is all required for security
            errorHandler('44');
            return false;
        }
    }
    else{
        errorHandler('45');
        return false;
    }


    if(document.querySelector('#adminI').checked){
        newAdmin['adminType'] = 'admin i';
    }
    else if(document.querySelector('#adminII').checked){
        newAdmin['adminType'] = 'admin ii';
    }
    else if(document.querySelector('#superAdmin').checked){
        newAdmin['adminType'] = 'super admin';
    }
    else{
        errorHandler('50');
        return false;
    }
    
    console.table(newAdmin);
    openModalOTP();
}

function errorHandler(code){
    if(code == '00') {
        formErrorMessage = 'First name cannot be empty.';
    }
    else if (code == '01') {
        formErrorMessage = 'First name can\'t have numbers or special characters.';
    }
    else if (code == '02'){
        formErrorMessage = 'First name can\'t only contain a letter or more than 30 letters.';
    }
    // 
    // MIDDLE NAME **************************
    // 
    else if(code == '10'){
        formErrorMessage = 'Middle name cannot be empty.';
    }
    else if(code == '11'){
        formErrorMessage = 'Middle name can\'t have numbers or special characters.';
    }
    else if(code == '12'){
        formErrorMessage = 'Middle name can\'t contain more than 30 letters.';
    }
    else if(code == '13'){
        formErrorMessage = 'Middle name is cannot contain middle initial.';
    }
    // 
    // LAST NAME **************************
    // 
    else if(code == '20') {
        formErrorMessage = 'Last name cannot be empty.';
    }
    else if(code == '21') {
        formErrorMessage = 'Last name can\'t have numbers or special characters.';
    }
    else if(code == '22'){
        formErrorMessage = 'Last name can\'t only contain a letter or more than 30 letters.';
    }
    // 
    // PHONE **************************
    // 
    else if(code == '30'){
        formErrorMessage = 'Phone number cannot be empty.';
    }
    else if(code == '31'){
        formErrorMessage = 'Phone number requires 11 digits. Example: 09XX XXX XXXX.';
    }
    else if(code == '32'){
        formErrorMessage = 'Phone number cannot contain letter or special character.';
    }
    else if(code == '33'){
        formErrorMessage = 'Phone number is required to start with "09". Example: 09XX XXX XXXX.';
    }
    // 
    // PASSWORD **************************
    // 
    else if(code == '40'){
        formErrorMessage = 'Password cannot be empty.';
    }
    else if(code == '41'){
        formErrorMessage = 'Confirm password cannot be empty.';
    }
    else if(code == '42'){
        formErrorMessage = 'Password must be at least 8 characters.';
    }
    else if(code == '43'){
        formErrorMessage = 'Password must be equal or less than 64 characters.';
    }
    else if(code == '44'){
        formErrorMessage = 'Password must contain an upper & lower case letter, a number, and a special character.';
    }
    else if(code == '45'){
        formErrorMessage = 'Password do not match.';
    }
    // 
    // LEVEL **************************
    // 
    else if(code == '50'){
        formErrorMessage = 'No admin type is selected.';
    }

    generateErrorModal();

}

function createAdminSuccess(){
    newAdminSuccessConfirmationModal();

    main.innerHTML = createAccount;

    newAdmin.firstName = '';
    newAdmin.middleName = '';
    newAdmin.lastName = '';
    newAdmin.phone = '';
    newAdmin.password = '';
    newAdmin.adminType = '';
}

function newAdminSuccessConfirmationModal(){
    resetModal();

    let title = document.querySelector('.modal-title');
    let body = document.querySelector('.modal-body');
    let positive = document.querySelector('.positive');
    let negative = document.querySelector('.negative');

    title.innerText = 'Success';
    positive.style.display = 'none';
    negative.innerText = 'Close';
    console.log('customized display');

    let html = `
        <span class="newAdmin-username">Admin Username: <span class="username-highlight">${generatedUsername}</span></span>
    `
    body.innerHTML = html;
}

function filterPhoneInput(id){
    let element = document.getElementById(id);
    let newVal = "";

    for(i =0; i< element.value.length; i++){

        if(!isNaN(element.value[i])){
            newVal+= element.value[i];
        }
    };
    element.value = newVal;
}

function properPhoneNum(num){
    // Adds space to phone num
    let proper ='';
    for(i = 0; i < num.length; i++){
        proper +=num[i];
        if(i == 3 || i == 6) proper+=' ';
    }
    return proper;
}

function isLettersOnly(str) {
	return /^[A-Za-z ]*$/.test(str);
}

function containsLetterNumSpeChar(pass){

    let checkSpeChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~ ]/.test(pass);
    let checkUpper = /[A-Z]/.test(pass);
    let checkLower = /[a-z]/.test(pass);
    let checkNum = /[0-9]/.test(pass);

    console.log(checkSpeChar);
    console.log(checkUpper);
    console.log(checkLower);
    console.log(checkNum);

    return checkSpeChar && checkUpper && checkLower && checkNum;
}

function onlyLettersAndNumbers(str) {
    return /^[A-Za-z0-9]*$/.test(str);
}

// gets the value of given sa id param and then ilimit siya gamit yung max
function inputLimiter(id, max){
    let element = document.getElementById(id);
    if (element.value.length > max){
        element.value = element.value.slice(0, -1);
        // alert('test');
    }

    // if want natin numbers lang meron pede isama yung asa baba
    // element.value = element.value.replace(/\D+/g, '');
}

// cuts content if after blur
function inputLimiterBlur(id, max){
    let element = document.getElementById(id);
    let newVal = "";
    if(element.value.length > max){
        for(i=0; i < max; i++){
            newVal += element.value[i];
        }
        element.value = newVal;
    }
}

function inputLimiterNum(id, max){
    let element = document.getElementById(id);
    if (element.value.length > max){
        element.value = element.value.slice(0, -1);
        // alert('test');
    }

    // if want natin numbers lang meron pede isama yung asa baba
    element.value = element.value.replace(/\D+/g, '');
}

function statusMsgCounter(inputFieldId, counterId, max){
    let textArea = document.getElementById(inputFieldId);
    let statusMsgCtr = document.getElementById(counterId);
    let remainingChar = max - textArea.value.length;

    if(remainingChar <= 10){
        statusMsgCtr.style.color = 'red';
    }
    else{
        statusMsgCtr.style.color = 'unset';
    }

    statusMsgCtr.innerHTML = `${remainingChar}`;
}

function seePassword(fieldID, iconID){
    field = document.getElementById(fieldID);
    icon = document.getElementById(iconID);

    icon.innerHTML = icon.innerHTML == 'visibility_off' ? 'visibility' : 'visibility_off';
    
    field.setAttribute('type', icon.innerHTML == 'visibility_off' ? 'password' : 'text');
    
}

function changeBorderFocus(id){
    let field = document.getElementById(id);

    try {
        field.parentElement.style.borderColor = '#4e73df';
    } catch (error) {
        
    }
}

function changeBorderBlur(id){
    let field = document.getElementById(id);
    if(field.value == "") field.parentElement.style.borderColor = 'rgb(80, 78, 78)';
}

// yung formState na variable is if magclick sa new generatePage dapat ma reset sa 0
function nextForm(){
    const formParts = document.querySelectorAll('.schedule__form');

    if(formState < 2){
        formState++;
        
        formParts.forEach((form)=>{
            form.style.display = 'none';
        });

        if(formState == 1){
            formParts[formState].style.display = 'flex';

            try {
                document.querySelector('.followup-container').style.display = 'flex';
            } catch (error) {
                
            }
            
        }
        else if(formState == 2){
            formParts[formState].style.display = 'flex';
            document.querySelector('.followup-container').style.display = 'none';
        }
    }
}

function backForm(){
    const formParts = document.querySelectorAll('.schedule__form');

    if(formState > 0){
        formState--;

        formParts.forEach((form)=>{
            form.style.display = 'none';
        });

        if(formState == 0){
            formParts[formState].style.display = 'grid';
            document.querySelector('.followup-container').style.display = 'none';
        }
        else if(formState == 1){
            formParts[formState].style.display = 'flex';
            document.querySelector('.followup-container').style.display = 'flex';
        }
    }
}

function confirmSignOut(){
    confirmModal("Signing out...", "Are you sure?", "signOut()");
}

function viewRequestApprove(id){
    resetModal();

    let requestTarget = document.getElementById(id);
    let appID = requestTarget.getAttribute('data-appID');
    
    let title = document.querySelector('.modal-title');
    let body = document.querySelector('.modal-body');
    let positive = document.querySelector('.positive');
    let negative = document.querySelector('.negative');

    let modalHeader = document.querySelector('.modal-header');
    let modalFooter = document.querySelector('.modal-footer');
    
    modalHeader.style.display = 'flex';
    modalFooter.style.display = 'flex';

    let html = `
        <div class="view-container">
            <div class="viewinput-container">
                <div class="date-container">
                    <input type="text" name="day" id="" placeholder="DD">
                    <input type="text" name="month" id="" placeholder="MM">
                    <input type="text" name="year" id="" placeholder="YYYY">
                </div>
            </div>
            <span>4 Buffer Slot Remaining</span>
        </div>
    `;

    title.innerHTML = 'Schedule Appointment On';
    positive.innerText = 'Schedule';
    negative.innerText = 'Cancel';
    body.innerHTML = html;

    modalLauncher();
}

function viewRequestReject(id){
    resetModal();

    let requestTarget = document.getElementById(id);
    let appID = requestTarget.getAttribute('data-appID');
    
    let title = document.querySelector('.modal-title');
    let body = document.querySelector('.modal-body');
    let positive = document.querySelector('.positive');
    let negative = document.querySelector('.negative');

    title.innerText = 'Rejecting Appointment...';
    body.innerText = 'Are you sure?';
    positive.innerText = 'Confirm';
    negative.innerText = 'Cancel';

    // positive.setAttribute('onclick', 'alert("test")');
    // positive.removeAttribute('onclick');

    modalLauncher();
}

function signOut(){
    const positive = document.querySelector('.positive');
    positive.removeAttribute('onclick');

    window.location.href='./php/processSignout.php';
}

function viewScheduleNav(id){
    const quickViewBtn = document.querySelector('.btn--quick-view');
    const filterBtn = document.querySelector('.btn--filter');
    const field = document.querySelector('.view-schedule__field')

    if(id == 'filterBtn'){
        quickViewIsActive = false;
        quickViewBtn.classList.remove('view-schedule__selected');
        filterBtn.classList.add('view-schedule__selected');
        field.innerHTML = filter;
    }
    else if(id == 'quickViewBtn'){
        quickViewIsActive = true;
        quickViewBtn.classList.add('view-schedule__selected');
        filterBtn.classList.remove('view-schedule__selected');
        field.innerHTML = quickView;
    }
}

function insertAccInfo(){
    const username = document.querySelector('#accountUsername');
    const name = document.querySelector('#accountFullName');
    const phone = document.querySelector('#accountPhone');

    username.innerText = signedInAdmin.username;
    name.innerText = `${capitalFirstLetter(signedInAdmin.firstName)} ${capitalFirstLetter(signedInAdmin.middleName)} ${capitalFirstLetter(signedInAdmin.lastName)}`;
    phone.innerText = signedInAdmin.phone;
}

function openModalOTP(){
    resetModal();

    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');
    let modalCloseBtn = document.querySelector('.btn-close');
    let negativeBtn = document.querySelector('.negative');
    let positiveBtn = document.querySelector('.positive');
    let modal = document.querySelector('.modal-dialog');
    let modalItself = document.querySelector('.modal');
    let modalHeader = document.querySelector('.modal-header');
    let modalFooter = document.querySelector('.modal-footer');
    
    modalHeader.style.display = 'none';
    modalFooter.style.display = 'none';
    modalTitle.style.color = 'unset';


    let htmlCode = `
    <div class="OTP-container">
        <div class="textInfo-container">
            <span class="mainText">Input One-Time Password</span>
            <span class="subText">One-Time Password has been sent to <span class="phoneDisplay">09XX XXX XXXX</span></span>
        </div>
        <div class="OTP-body">
            <div class="OTP-field">
                <input type="text" name="OTP" id="OTP" oninput="inputLimiterNum(this.id, 5)" onblur="inputLimiterNum(this.id, 5)" oninput="inputLimiter(this.id, 5)" onblur="inputLimiterBlur(this.id, 5)">
                <button class="resend-btn">Re-Send</button>
            </div>
            <div class="error-msg"></div>
        </div>
        <button class="OTP-btn">Submit</button>
    </div>
    `
    modalBody.innerHTML = htmlCode;
    document.querySelector('.phoneDisplay').innerHTML = newAdmin['phone'];
    document.querySelector('.OTP-btn').addEventListener('click', ()=>{
        checkOTP();
    });
    modalLauncher();
    resetCD();

    document.querySelector('.resend-btn').addEventListener('click', ()=>{
        if(isResendAvail){
            resendOTP();
            resetCD();
            isResendAvail = false;
        } 
    });
}

function sendOTP(){
    // magsend otp

    openModalOTP();
}

function resendOTP(){
    // di na magopen panibago modal kaya nakahiwalay tong function na to
}

function resetCD(){
    let time = 30;
    let resend = document.querySelector('.resend-btn');
    resend.classList.add('cd');
    resend.innerHTML = time + 's';

    let timer = setInterval(()=>{
        time--;
        resend.innerHTML = time + 's';
        
        if(time == 0){
            time = 30;
            clearInterval(timer);
            resend.innerHTML = 'Re-send';
            isResendAvail = true;
            resend.classList.remove('cd');
        }
    },1000);
}

function checkOTP(){
    let OTPField = document.querySelector('#OTP').value;
    let close = document.querySelector('.negative');

    let error = document.querySelector('.error-msg');

    // Kunin yung OTP sa database pero sa ngayon konwari na get na tapos yun yung fakeOTP

    // Check if magkamuka input
    if(OTPField == fakeOTP){

        const jsonString = JSON.stringify(newAdmin);
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    if(xhr.responseText != 0){
                        generatedUsername = xhr.responseText;
                        createAdminSuccess();
                        isResendAvail = true;
                    }
                }
            }
        }

        xhr.open("POST", "./php/createNewAdmin.php");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(jsonString);
        return;
    }
    // If Tama
    // 

    // Pag mali input ni user ere labas
    // second time na mali mag shake si error msg
    if(error.innerHTML != ""){
        error.classList.add('error-animate');
        setTimeout(()=>{
            error.classList.remove('error-animate');
        },500);
    }
    error.innerHTML = 'Invalid OTP';
}

// Editing phone #
function openModalOTP_Edit(){
    resetModal();

    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');
    let modalCloseBtn = document.querySelector('.btn-close');
    let negativeBtn = document.querySelector('.negative');
    let positiveBtn = document.querySelector('.positive');
    let modal = document.querySelector('.modal-dialog');
    let modalItself = document.querySelector('.modal');
    let modalHeader = document.querySelector('.modal-header');
    let modalFooter = document.querySelector('.modal-footer');
    
    modalHeader.style.display = 'none';
    modalFooter.style.display = 'none';
    modalTitle.style.color = 'unset';


    let htmlCode = `
    <div class="OTP-container">
        <div class="textInfo-container">
            <span class="mainText">Input One-Time Password</span>
            <span class="subText">One-Time Password has been sent to <span class="phoneDisplay">09XX XXX XXXX</span></span>
        </div>
        <div class="OTP-body">
            <div class="OTP-field">
                <input type="text" name="OTP" id="OTP" oninput="inputLimiterNum(this.id, 5)" onblur="inputLimiterNum(this.id, 5)" oninput="inputLimiter(this.id, 5)" onblur="inputLimiterBlur(this.id, 5)">
                <button class="resend-btn">Re-Send</button>
            </div>
            <div class="error-msg"></div>
        </div>
        <button class="OTP-btn">Submit</button>
    </div>
    `
    modalBody.innerHTML = htmlCode;
    document.querySelector('.phoneDisplay').innerHTML = newInsertedPhone;
    document.querySelector('.OTP-btn').addEventListener('click', ()=>{
        checkOTP_Edit();
    });
    modalLauncher();
    resetCD();

    document.querySelector('.resend-btn').addEventListener('click', ()=>{
        if(isResendAvail){
            resendOTP_Edit();
            resetCD();
            isResendAvail = false;
        } 
    });
}

function sendOTP_Edit(){
    // magsend otp

    openModalOTP();
}

function resendOTP_Edit(){
    // di na magopen panibago modal kaya nakahiwalay tong function na to
}

function checkOTP_Edit(){
    let OTPField = document.querySelector('#OTP').value;
    let close = document.querySelector('.negative');

    let error = document.querySelector('.error-msg');

    

    // Kunin yung OTP sa database pero sa ngayon konwari na get na tapos yun yung fakeOTP

    // Check if magkamuka input
    if(OTPField == fakeOTP){
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    if(xhr.responseText == 1){
                         showResModal('Phone has been updated', true);
                         signedInAdmin.phone = newInsertedPhone;
                         generateAccountSettings();
                         insertAccInfo();
                    }
                    else{
                        showResModal('Something went wrong',"Failed", true);
                    }
                }
            }
        }

        xhr.open("POST", "./php/changePhone.php");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("newPhone="+newInsertedPhone);
        return;
    }
    // If Tama
    // 

    // Pag mali input ni user ere labas
    // second time na mali mag shake si error msg
    if(error.innerHTML != ""){
        error.classList.add('error-animate');
        setTimeout(()=>{
            error.classList.remove('error-animate');
        },500);
    }
    error.innerHTML = 'Invalid OTP';
}

function showResModal(str = '', currentModalisUp = false, type = 'Success'){
    resetModal();
    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');
    let modalCloseBtn = document.querySelector('.btn-close');
    let negativeBtn = document.querySelector('.negative');
    let positiveBtn = document.querySelector('.positive');
    let modal = document.querySelector('.modal-dialog');
    let modalItself = document.querySelector('.modal');
    let modalHeader = document.querySelector('.modal-header');
    let modalFooter = document.querySelector('.modal-footer');


    modalTitle.innerText = type;
    positiveBtn.style.display = 'none';
    negativeBtn.innerText = 'Close';
    modalBody.innerText = str;

    if(type == 'Success'){
        modalTitle.style.color = 'rgb(10, 204, 10)';
    }
    else{
        modalTitle.style.color = 'red';
    }

    if(!currentModalisUp){
        modalLauncher();
    }
}

function resetModal(){
    let header = document.querySelector('.modal-header');
    let footer = document.querySelector('.modal-footer');
    let title = document.querySelector('.modal-title');
    let headerClose = document.querySelector('.btn-close');
    let positive = document.querySelector('.positive');
    let negative = document.querySelector('.negative');

    header.style.display = 'flex';
    footer.style.display = 'flex';
    title.innerText = 'Modal Title';
    title.style.color = 'unset';
    headerClose.style.display = 'block'
    positive.style.display = 'block';
    negative.style.display = 'block';
    positive.innerText = 'Understood';
    negative.innerText = 'Cancel';
    positive.removeAttribute('onclick');
}

function capitalFirstLetter(str, isFullName = true){
    str = str.split(' ');
    let newStr = [];

    str.forEach((item)=>{
        newStr.push(item.charAt(0).toUpperCase() + item.substring(1));
    });

    return newStr.join(' ');
    
}

function applyNewPhone(){
    const newPhone = properPhoneNum(document.querySelector('#newPhone').value.replaceAll(' ', '').trim());
    const pass = document.querySelector('#confirmation').value;

    if(newPhone == "" || pass == ""){
        showError("Please fill in both fields");
        return;
    }
    else if(newPhone.slice(0, 2) != '09'){
        showError("Phone # must start with 09");
        return;
    }
    else if(newPhone.length != 13){
        showError("Invalid phone #");
        return;
    }
    else{
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    if(xhr.responseText == 1){
                        newInsertedPhone = newPhone
                        openModalOTP_Edit();
                    }
                    else{
                        showError("Password is incorrect");
                    }
                }
            }
        }

        xhr.open("POST", "./php/testPassword.php");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(`password=${pass}`);
    }
}

// Exclusive use for editPhone and editPass
function showError(str = ""){
    let msg = document.querySelector('.msg');

    if(msg.innerText != ""){
        msg.classList.add('error-animate');
        setTimeout(()=>{
            msg.classList.remove('error-animate');
        },500);
    } 
    msg.innerText = str;
}

function applyNewPass(){
    const currentPass = document.querySelector('#currentPassword').value;
    const newPass = document.querySelector('#newPassword').value;
    const confirmNewPass = document.querySelector('#confirmNewPassword').value;

    if(currentPass == "" || newPass == "" || confirmNewPass == ""){
        showError("Please fill in all fields");
        return;
    }
    else if(newPass != confirmNewPass){
        showError("Password do not match");
        return;
    }
    else if(newPass > 64){
        showError("Password must be equal or less than 64 characters");
        return;
    }
    else if(newPass < 8){
        showError("Password must at least be 8 characters");
        return;
    }
    else if(!containsLetterNumSpeChar(newPass)){
        showError("Password must contain an upper & lower case letter, a number, and a special character");
        return;
    }
    
        const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function (){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                if(xhr.responseText == 1){
                    // makarating dito if tama lahat ng input
                    const xhr2 = new XMLHttpRequest();

                    xhr2.onreadystatechange = function (){
                        if(xhr2.readyState == 4){
                            if(xhr2.status == 200){
                                if(xhr2.responseText == 1){
                                    showResModal('Password has been updated');
                                    generateAccountSettings();
                                }
                                else{
                                    showResModal('Something went wrong', 'Failed');
                                }
                            }
                        }
                    }

                    xhr2.open("POST", "./php/changePassword.php");
                    xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    xhr2.send("pass="+ newPass);
                }
                else if(xhr.responseText == 0){
                    showError("Current password is incorrect");
                    return;
                }
            }
        }
    }

    xhr.open("POST", "./php/testPassword.php");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("pass="+ currentPass);

}

function changeAccess(){
    const nav = document.querySelector('.nav-item-wrapper');

    const navBtns = [
        `
        <button class="nav-links__item" onclick="generateDashboard();">
            <span class="material-icons-outlined ico-nav">dashboard</span>
            Dashboard
        </button>
        `,
        `
        <button class="nav-links__item" onclick="generateSchedule();">
            <span class="material-icons-outlined ico-nav">calendar_month</span>
            Schedule An Appointment
        </button>
        `,
        `
        <button class="nav-links__item" onclick="generateViewSchedule();">
            <span class="material-icons-outlined ico-nav">book</span>
            View Appointments
        </button>
        `,
        `
        <button class="nav-links__item" onclick="generateRequest();">
            <span class="material-icons-outlined ico-nav">pending_actions</span>
            Follow-Up Requests
        </button>
        `,
        `
        <button class="nav-links__item" onclick="generateScheduling()">
            <span class="material-icons-outlined ico-nav">edit_calendar</span>
            Edit Department Schedules
        </button>
        `,
        `
        <div class="nav-links__item manage-admins" data-click="doNothing" onclick="showManageAdmins();">
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
        `,
        `
        <button class="nav-links__item" onclick="generateWebsiteStatus()">
            <span class="material-icons-outlined ico-nav">medical_services</span>
            Manage Website Status
        </button>
        `,
        `
        <button class="nav-links__item" onclick="generatePostAnnouncement()">
            <span class="material-icons-outlined ico-nav">campaign</span>
            Post An Announcement
        </button>
        `,
        `
        <button class="nav-links__item" onclick="generateManageData()">
            <span class="material-icons-outlined ico-nav">storage</span>
            Manage Data
        </button>
        `,
        `
        <button class="nav-links__item" onclick="generateBlockDates()">
            <span class="material-icons-outlined ico-nav">block</span>
            Block Dates
        </button>
        `,
        `
        <button class="nav-links__item" onclick="generateFeedback()">
            <span class="material-icons-outlined ico-nav">chat</span>
            Feedback
        </button>
        `,
        `
        <button class="nav-links__item" onclick="generateEditTutorial()">
            <span class="material-icons-outlined ico-nav">videocam</span>
            Manage Video Tutorial
        </button>
        `
        ]

    const adminI = [2];
    const adminII = [1, 2, 3, 7, 10];
    const adminS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    if(signedInAdmin.adminType == 'admin i'){
        adminI.forEach(item=>{
            nav.innerHTML += navBtns[item];
        });
    }
    else if(signedInAdmin.adminType == 'admin ii'){
        adminII.forEach(item=>{
            nav.innerHTML += navBtns[item];
        });
    }
    else if(signedInAdmin.adminType == 'super admin'){
        adminS.forEach(item=>{
            nav.innerHTML += navBtns[item];
        });
    }

    if(signedInAdmin.adminType == 'admin i'){
        generateViewSchedule();
    }
    else if(signedInAdmin.adminType == 'admin ii'){
        generateSchedule();
    }
    else if(signedInAdmin.adminType == 'super admin'){
        // generateDashboard();
        // commented for testing
    }
}

// For added security
function checkPrivilege(type){
    allowAccess = false;
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                if(xhr.response == type){
                    allowAccess = true;
                }
            }
        }
    }

    xhr.open('GET', './php/getAdminPrivilege.php', false);
    xhr.send();

    return allowAccess;
}

function insertAnnouncement(){
    const submitBtn = document.querySelector('#announcementSubmit');

    submitBtn.addEventListener('click', ()=>{
        const title = document.querySelector('#announcementTitle').value;
        const body = document.querySelector('#announcementBody').value;

        if(title == "" || body == ""){
            showError("Fill in all fields");
            return;
        }

        let ann = {
            title: title,
            body: body
        }

        const jsonString = JSON.stringify(ann);

        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    if(xhr.responseText == 1){
                        showResModal("Announcement has been posted");
                        generatePostAnnouncement();
                    }
                    else{
                        showResModal("Something went wrong.", "Failed");
                    }
                }
            }
        }

        xhr.open("POST", "./php/postAnnouncement.php");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(jsonString);
    })
}

function getFeedback(sortBy = 1){
    const feedbackTable = document.querySelector('.feedback__table tbody');
    feedbackTable.innerHTML = "";

    const xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                if(xhr.responseText != 0){
                    let arrayOfObjects = JSON.parse(xhr.responseText);
                    arrayOfObjects.forEach(item=>{
                        let rowTemplate =
                        `
                        <tr>
                            <td>${item.rate}</td>
                            <td>${item.content}</td>
                            <td title="YYYY-MM-DD">${convertRetrievedDate(item.dateSubmitted)}</td>
                        </tr>
                        `;
    
                        feedbackTable.innerHTML += rowTemplate;
                        
                    });
                }
            }
        }
    }

    xhr.open("POST", "./php/getFeedback.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`sortBy=`+sortBy);
    showTableCell();
}

function confirmModal(title, content, posBtnFunction){
    resetModal();

    const modalTitle = document.querySelector('.modal-title');
    const modalBody = document.querySelector('.modal-body');
    const positive = document.querySelector('.positive');
    const negative = document.querySelector('.negative');

    modalTitle.innerText = title;
    modalBody.innerText = content
    positive.innerText = 'Confirm';
    negative.innerText = 'Cancel';
    positive.setAttribute("onclick", `${posBtnFunction}`);
    modalLauncher();
}

function confirmPhoneTutorial(){
    if(document.querySelector("#mobile").value == ""){
        showError("Please fill in the mobile phone field");
        return;
    }
    confirmModal("Applying...", "Are you sure you want to use this video for mobile phone view?", "applyPhoneTutorial()");
}

function confirmDesktopTutorial(){
    if(document.querySelector("#desktop").value == ""){
        showError("Please fill in the desktop field");
        return;
    }
    confirmModal("Applying...", "Are you sure you want to use this video for desktop view?", "applyDesktopTutorial()");
}

function applyPhoneTutorial(){
    const mobileInput = document.querySelector("#mobile").value;
    
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                if(xhr.responseText == 1){
                    setTimeout(()=>{
                        showResModal("New video tutorial applied");
                    }, 500);
                }
                else{
                    alert("Something went wrong...");
                }
            }
        }
    }

    xhr.open("POST", "./php/changeVid.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send('type=mobile&link=' + mobileInput);
}

function applyDesktopTutorial(){
    const desktopInput = document.querySelector("#desktop").value;
    
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                if(xhr.responseText == 1){
                    setTimeout(()=>{
                        showResModal("New video tutorial applied");
                    }, 500);
                    generateEditTutorial();
                }
                else{
                    alert("Something went wrong...");
                }
            }
        }
    }

    xhr.open("POST", "./php/changeVid.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send('type=desktop&link=' + desktopInput);
}

function checkBlockDate(){
    const month = document.querySelector("#block-month").value;
    const day = document.querySelector("#block-day").value;
    const year = document.querySelector("#block-year").value;
    const name = document.querySelector("#blockDateName").value;
    const repeats = document.querySelector("#flexSwitchCheckDefault").checked;
    const tempDate = `${year}-${month}-${day}`;

    const tempObj = new Date();
    const tempObj2 = new Date(tempDate);

    if(month == "" || day == "" || year == "" || name == ""){
        showError("Fill in all fields");
        return;
    }
    else if(parseInt(month) <= 0 || parseInt(month) > 12){
        showError("Input between 1 - 12 in month field");
        return;
    }
    else if(parseInt(day) <= 0 || parseInt(day) > 31){
        showError("Input between 1 - 31 in date field");
        return;
    }
    else if(!isDateValid(tempDate)){
        showError("Input a valid date");
        return;
    }
    else if(tempObj >= tempObj2){
        showError("Input am upcoming date");
        return;
    }
    else if(!onlyLettersAndNumbers(name)){
        showError("Name can only contain letters and numbers");
        return;
    }
    else if(checkDateExist(tempDate)){
        showError("Date already exist");
        return;
    }
    
    const toSend = {
        dateName: name,
        date: tempDate,
        isYearly: repeats
    }
    const jsonString = JSON.stringify(toSend);
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                if(this.responseText == 1){
                    insertBlockDate();
                    showTableCell();
                    showResModal("Date has been blocked");
                    document.querySelector("#block-month").value = "";
                    document.querySelector("#block-day").value = "";
                    document.querySelector("#block-year").value = "";
                    document.querySelector("#blockDateName").value = "";
                    document.querySelector("#flexSwitchCheckDefault").checked = false;
                    showError("");
                }else{
                    alert("Something went wrong...")
                }
            }
        }
    }

    xhr.open("OPEN", "./php/postBlockDate.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(jsonString);
}

function checkDateExist(date){
    let result = null;

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                if(xhr.responseText == 1){
                    result = true;
                }
                else{
                    result = false;
                }
            }
        }
    }

    xhr.open("POST", "./php/checkDateExist.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("date="+date);

    return result;
}

function isDateValid(dateString) {
    // Try to create a Date object with the provided date string
    const date = new Date(dateString);
    
    // Check if the created Date object is not "Invalid Date"
    // and the year, month, and day match the input values
    if (
      date.toString() !== "Invalid Date" &&
      date.getFullYear() === parseInt(dateString.split('-')[0], 10) &&
      date.getMonth() === parseInt(dateString.split('-')[1], 10) - 1 && // Month is 0-based
      date.getDate() === parseInt(dateString.split('-')[2], 10)
    ){
      return true; // Valid date
    } else {
      return false; // Invalid date
    }
}

function insertBlockDate(){
    const table = document.querySelector(".date-table tbody");
    table.innerHTML = "";

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                try {
                    let arrayOfObjects = JSON.parse(xhr.responseText);

                    arrayOfObjects.forEach((item)=>{
                        let id = item.id;
                        let date = convertRetrievedDate(item.date);
                        let dateName = item.dateName;
                        let isYearly = null;

                        if(item.isYearly == 1){
                            isYearly = true;
                        }
                        else{
                            isYearly = false;
                        }

                        

                        const template = 
                        `
                        <tr>
                            <td>${date}</td>
                            <td>${dateName}</td>
                            <td>${isYearly}</td>
                            <td><button class="removeDate" id="blockDate-${id}" data-name="${dateName}" onclick="confirmBlockDateRemove(this.id)">Delete</button></td>
                        </tr>
                        `;

                        table.innerHTML += template;
                    })
                } catch (error) {
                    
                }
                
            }
        }
    }


    xhr.open("GET", "./php/getBlockDate.php", false);
    xhr.send();
}

function confirmBlockDateRemove(id){
    let dateName = document.querySelector(`#${id}`).getAttribute("data-name");
    let dateID = id.split("-")[1];
    confirmModal("Deleting...", `Are you sure you want to remove ${dateName}?`, `removeBlockDate(${dateID}, "${dateName}")`);
}

function removeBlockDate(id, dateName){
    // let dateID = id.split('-');
    // console.table(dateID);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                if(this.responseText == 1){
                    setTimeout(()=>{
                        showResModal("Blocked date has been removed")
                    }, 500);
                    insertBlockDate();
                    showTableCell();
                    
                }
                else{
                    // FAILED
                }
            }
        }
    }

    xhr.open("POST", "./php/deleteBlockDate.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`id=${id}&${dateName}`);
}

function convertRetrievedDate(date){
    let arrDate = date.split('-');
    let convertedDate = "";

    arrDate[1] = parseInt(arrDate[1]);

    switch(arrDate[1]){
        case 1:
            convertedDate += "January ";
            break;
        case 2:
            convertedDate += "February ";
            break;
        case 3:
            convertedDate += "March ";
            break;
        case 4:
            convertedDate += "April ";
            break;
        case 5:
            convertedDate += "May ";
            break;
        case 6:
            convertedDate += "June ";
            break;
        case 7:
            convertedDate += "July ";
            break;
        case 8:
            convertedDate += "August ";
            break;
        case 9:
            convertedDate += "September ";
            break;
        case 10:
            convertedDate += "October ";
            break;
        case 11:
            convertedDate += "November ";
            break;
        case 12:
            convertedDate += "December ";
    }

    convertedDate += `${arrDate[2]}, `;
    convertedDate += `${arrDate[0]}`;

    return convertedDate;
}

function insertPostedAnn(){
    const table = document.querySelector(".ann-table tbody");
    table.innerHTML = "";
    
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                
                try {
                    let arrayOfObjects = JSON.parse(xhr.responseText);
                    
                    arrayOfObjects.forEach((item)=>{
                        let id = item.id;
                        let title = item.title;
                        let body = item.body;
                        let datePosted = item.datePosted;
                        let timePosted = item.timePosted;
                        let author = item.author;

                        

                        const template = 
                        `
                        <tr>
                            <td>${title}</td>
                            <td>${datePosted}</td>
                            <td>${timePosted}</td>
                            <td>${author}</td>
                            <td><button id="ann-${id}" data-title="${title}" onclick="confirmAnnRemove(this.id)">Delete</button></td>
                        </tr>
                        `;

                        table.innerHTML += template;
                    })
                } catch (error) {
                    
                }
                
            }
        }
    }


    xhr.open("GET", "./php/getAnnouncement.php", false);
    xhr.send();
}

function confirmAnnRemove(id){
    let annTitle = document.querySelector(`#${id}`).getAttribute("data-title");
    let dateID = id.split("-")[1];
    confirmModal("Deleting...", `Are you sure you want to remove ${annTitle}?`, `removeAnn(${dateID}, "${annTitle}")`);
}

function removeAnn(id, title){
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                if(this.responseText == 1){
                    setTimeout(()=>{
                        showResModal("Announcement has been removed")
                    }, 500);
                    insertPostedAnn();
                    showTableCell();
                }
                else{
                    // FAILED
                }
            }
        }
    }

    xhr.open("POST", "./php/deletePostedAnn.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`id=${id}&${title}`);
}

function insertAdmin(isInitial = true){
    const table = document.querySelector(".admin-table tbody");
    
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                
                try {
                    table.innerHTML = "";
                    let arrayOfObjects = JSON.parse(xhr.responseText);
                    
                    arrayOfObjects.forEach((item)=>{
                        let username = item.username;
                        let adminType = item.adminType;
                        let firstName = item.firstName;
                        let middleName = item.middleName;
                        let lastName = item.lastName;
                        let phone = item.phone;

                        if(adminType == 'admin i') adminType = "Admin I";
                        else if(adminType == 'admin ii') adminType = "Admin II";
                        else if(adminType == 'super admin') adminType = "Super Admin";

                        const template = 
                        `
                        <tr>
                            <td>${capitalFirstLetter(lastName)}, ${capitalFirstLetter(firstName)} ${capitalFirstLetter(middleName)}</td>
                            <td>${username}</td>
                            <td>${phone}</td>
                            <td><button class="editBtn" id="${username}_${adminType}" onclick="editType(this.id)">${adminType}<span class="ico-list ico-edit">(edit)</span></button></td>
                            <td><button class="removeAdmin" onclick="confirmAdminRemove(this.id)" id="${username}">delete</button></td>
                        </tr>
                        `;

                        table.innerHTML += template;
                    })

                    showTableCell();
                } catch (error) {
                    
                }
                
            }
        }
    }

    if(isInitial){
        xhr.open("GET", "./php/getAdmin.php", true);
        xhr.send();
    }
    else{
        let input = document.querySelector("#adminSearch").value;

        if(input == "") return;

        xhr.open("POST", "./php/searchAdmin.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("input="+input);
    }
}

function resetAdminTable(input, table){
    input = input.trim();
    if(input == "" && table == 'admin'){
        insertAdmin();
    }
    else if(input == "" && table == 'adminlog'){
        insertAdminLogs();
    }
}

function checkAdminPrivChange(){
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                if(xhr.responseText == 1){
                    alert('Your admin privilege has been changed. Login again to continue.');
                }

            }
        }
    }

    xhr.open("GET", "./php/checkAdminPrivChange.php", true);
    xhr.send();
}

function confirmAdminRemove(username){
    confirmModal("Deleting...", `Are you sure you want to remove ${username}?`, `removeAdmin("${username}")`);
}

function removeAdmin(username){

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                if(xhr.responseText == 1){
                    setTimeout(()=>{
                        showResModal("Admin has been removed")
                    },500)
                    generateAdminList();
                    showTableCell();
                }
            }
        }
    }
    
    xhr.open("POST", "./php/deleteAdmin.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("username="+username);
}

function insertAdminLogs(isInitial = true){
    const table = document.querySelector(".logs-table tbody");
    
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){

                try {
                    let arrayOfObjects = JSON.parse(xhr.responseText);
                    table.innerHTML = "";

                    arrayOfObjects.forEach((item)=>{
                        let username = item.username;
                        let activity = item.activity;
                        let adminType = item.adminType
                        let logDate = item.logDate;
                        let logTime = item.logTime;
                        
                        if(adminType == 'admin i') adminType = "Admin I";
                        else if(adminType == 'admin ii') adminType = "Admin II";
                        else if(adminType == 'super admin') adminType = "Super Admin";

                        const template = 
                        `
                        <tr>
                            <td>${username}</td>
                            <td>${activity}</td>
                            <td>${adminType}</td>
                            <td>${logDate}</td>
                            <td>${logTime}</td>
                        </tr>
                        `;

                        table.innerHTML += template;
                    })

                    showTableCell();
                } catch (error) {
                    
                }
                
            }
        }
    }

    if(isInitial){
        xhr.open("GET", "./php/getAdminLogs.php", true);
        xhr.send();
    }
    else{
        let input = document.querySelector("#adminSearch").value;

        if(input == "") return;

        xhr.open("POST", "./php/searchAdminLogs.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("input="+input);
    }
}

function applyLogFilter(){
    const month = document.querySelector('#logMonth').value;
    const day = document.querySelector('#logDay').value;
    const year = document.querySelector('#logYear').value;
    const activity = document.querySelector('#logActivity').value;
    const adminType = document.querySelector('#logAdminType').value;
    const sortBy = document.querySelector('#logSortBy').value;
    let fullDate = `${year}-${month}-${day}`;
    const table = document.querySelector(".logs-table tbody");

    if(month != "" || day != "" || year != ""){
        if(month == "" || day == "" || year == ""){
            showError("Date is incomplete");
            return;
        }
        else if(!isDateValid(fullDate)){
            showError("Invalid Date")
            return;
        }
    }
    else{
        fullDate = "";
    }

    let obj = {
        date: fullDate,
        activity: activity,
        adminType: adminType,
        sortBy: sortBy
    }

    if(fulldate == "" && activity == "" && adminType == "" && sortBy == ""){
        return;
    }

    let toSend = JSON.stringify(obj);

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
               try {
                console.log(xhr.responseText)
                    
                    let arrayOfObjects = JSON.parse(xhr.responseText);
                    table.innerHTML = "";

                    arrayOfObjects.forEach((item)=>{
                        let username = item.username;
                        let activity = item.activity;
                        let adminType = item.adminType
                        let logDate = item.logDate;
                        let logTime = item.logTime;
                        
                        if(adminType == 'admin i') adminType = "Admin I";
                        else if(adminType == 'admin ii') adminType = "Admin II";
                        else if(adminType == 'super admin') adminType = "Super Admin";

                        const template = 
                        `
                        <tr>
                            <td>${username}</td>
                            <td>${activity}</td>
                            <td>${adminType}</td>
                            <td>${logDate}</td>
                            <td>${logTime}</td>
                        </tr>
                        `;

                        table.innerHTML += template;
                    })

                    showTableCell();
                } catch (error) {
                    
                }
            }
        }
    }

    xhr.open("OPEN", "./php/filterAdminLog.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(toSend);
}

function insertWebsiteStatus(){
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(this.readyState ==4){
            if(this.status == 200){
                let obj = JSON.parse(xhr.responseText);
                currentWebStatus = obj.status;

                let ico = document.querySelector('.ico-live');
                let header = document.querySelector('.status__header');
                let displayMsg = document.querySelector('.status__msg');
                let statusName = document.querySelector('.status-name');
                let statusOp = document.querySelectorAll('.status-option');

                
                if(obj.status == 1){
                    // Naka Up
                    ico.innerText = 'check_circle_outline';
                    header.style.color = 'rgb(10, 204, 10)';
                    ico.style.color = 'rgb(10, 204, 10)';
                    displayMsg.innerHTML += 'Not Applicable';
                    statusOp[0].setAttribute("selected", "selected");
                    document.querySelector('#statusMsg').setAttribute("disabled", "disabled");
                    statusName.innerText = "Website is Up";
                }
                else if(obj.status == 2){
                    // Naka down website
                    ico.innerText = 'highlight_off';
                    header.style.color = 'red';
                    ico.style.color = 'red';
                    displayMsg.innerHTML += obj.message;
                    statusOp[1].setAttribute("selected", "selected");
                    statusName.innerText = "Website is Down";
                }
                else if(obj.status == 3){
                    // Naka down lang yung scheduling
                    ico.innerText = 'block';
                    header.style.color = 'orange';
                    ico.style.color = 'orange';
                    displayMsg.innerHTML += obj.message;
                    statusOp[2].setAttribute("selected", "selected");
                    statusName.innerText = "Scheduling is Down";
                }
            }
        }
    }

    xhr.open("GET", "./php/getCurrentWebStatus.php", false);
    xhr.send();
}

function confirmStatusChange(){
    let select = document.querySelector('.selectStatus').value;
    let warning = null;

    if(select == 1) warning = "Patients will be able to access the website and schedule appointments. ";
    else if(select == 2) warning = "Patients will not be able to access website and schedule appointments. ";
    else if(select == 3) warning = "Patients will be able to access the website but not schedule appointments. ";

    if(select == 2 || select == 3){
        if(document.querySelector('#statusMsg').value == "") {
            showError("Fill in message");
            return;
        }
    }
    confirmModal("Applying...", warning + "Are you sure?", "applyNewWebStatus()");
    showError("");
}

function closeMsg(){
    let select = document.querySelector('.selectStatus').value;

    if(select == 1){
        document.getElementById('statusMsg').setAttribute("disabled", "disabled");
        document.getElementById('statusMsg').value = '';
    }
    else{
        document.getElementById('statusMsg').removeAttribute("disabled");
    }
}

function applyNewWebStatus(){
    let select = document.querySelector('.selectStatus').value;
    let msg = document.querySelector('#statusMsg').value;

    const xhr = new XMLHttpRequest();

    const obj = {
        newStatus: select,
        currentStatus: currentWebStatus,
        message: msg,
    }

    const toSend = JSON.stringify(obj);

    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                if(this.responseText == 1){
                    setTimeout(()=>{
                        showResModal("Website status has been updated");
                    }, 500)
                    generateWebsiteStatus();
                }
            }
        }
    }

    xhr.open("POST", "./php/changeWebsiteStatus.php", false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(toSend)
}

function generateDeptSched(dept){
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status = 200){
                try {
                    
                    let monContainer = document.querySelector('#monday .timeslot-container');
                    let tueContainer = document.querySelector('#tuesday .timeslot-container');
                    let wedContainer = document.querySelector('#wednesday .timeslot-container');
                    let thuContainer = document.querySelector('#thursday .timeslot-container');
                    let friContainer = document.querySelector('#friday .timeslot-container');
                    let satContainer = document.querySelector('#saturday .timeslot-container');

                    monContainer.innerHTML = "";
                    tueContainer.innerHTML = "";
                    wedContainer.innerHTML = "";
                    thuContainer.innerHTML = "";
                    friContainer.innerHTML = "";
                    satContainer.innerHTML = "";

                    const arrayOfObjects = JSON.parse(xhr.responseText);

                    const mon = [];
                    const tue = [];
                    const wed = [];
                    const thu = [];
                    const fri = [];
                    const sat = [];

                    arrayOfObjects.forEach(item=>{
                        const id = item.scheduleID;
                        const day = item.day;
                        const startTime = item.startTime;
                        const stopTime = item.stopTime;
                        const max = item.max;
                        let isBuffer = item.isBuffer;
                        let clss;

                        if(isBuffer == 1) isBuffer = true;
                        else if(isBuffer == 0) isBuffer = false;

                        if(isBuffer) clss = 'buffer';
                        else clss = 'nope';
                        
                        let blockTemplate = 
                        `
                        <div class="block ${clss}">
                            <div class="timeslot">
                                <div class="time">${startTime} - ${stopTime}</div>
                                <div class="max">${max}</div>
                            </div>
                            <div class="button-container">
                                <button data-sched_id="${id}" data-start="${startTime}" data-stop="${stopTime}" data-max="${max}" onclick="editSched(this.dataset.sched_id, this.dataset.start, this.dataset.stop, this.dataset.max)">Edit</button>
                                <button data-sched_id="${id}" data-start="${startTime}" data-stop="${stopTime}" data-max="${max}"  onclick="deleteSched(this.dataset.sched_id, this.dataset.start, this.dataset.stop, this.dataset.max)">Delete</button>
                            </div>
                        </div>
                        `;

                        if(day == 'mon'){
                            if(isBuffer) mon.unshift(blockTemplate);
                            else{
                                mon.push(blockTemplate);
                                mon.push(`
                                <div class="block add">
                                    <button class="add-btn" data-day="mon" onclick="addSched(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
                                </div>`);
                            }
                        }
                        else if(day == 'tue'){
                            if(isBuffer) tue.unshift(blockTemplate);
                            else{
                                tue.push(blockTemplate);
                                tue.push(`
                                <div class="block add">
                                    <button class="add-btn" data-day="tue" onclick="addSched(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
                                </div>`);
                            }
                        }
                        else if(day == 'wed'){
                            if(isBuffer) wed.unshift(blockTemplate);
                            else{
                                wed.push(blockTemplate);
                                wed.push(`
                                <div class="block add">
                                    <button class="add-btn" data-day="wed" onclick="addSched(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
                                </div>`);
                            }
                        }
                        else if(day == 'thu'){
                            if(isBuffer) thu.unshift(blockTemplate);
                            else{
                                thu.push(blockTemplate);
                                thu.push(`
                                <div class="block add">
                                    <button class="add-btn" data-day="thu" onclick="addSched(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
                                </div>`);
                            }
                        }
                        else if(day == 'fri'){
                            if(isBuffer) fri.unshift(blockTemplate);
                            else{
                                fri.push(blockTemplate);
                                fri.push(`
                                <div class="block add">
                                    <button class="add-btn" data-day="fri" onclick="addSched(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
                                </div>`);
                            }
                        }
                        else if(day == 'sat'){
                            if(isBuffer) sat.unshift(blockTemplate);
                            else{
                                sat.push(blockTemplate);
                                sat.push(`
                                <div class="block add">
                                    <button class="add-btn" data-day="sat" onclick="addSched(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
                                </div>`);
                            }
                        }
                    })
                    mon.forEach(item=>{
                        monContainer.innerHTML += item; 
                    });
                    tue.forEach(item=>{
                        tueContainer.innerHTML += item;
                    });
                    wed.forEach(item=>{
                        wedContainer.innerHTML += item;
                    });
                    thu.forEach(item=>{
                        thuContainer.innerHTML += item;
                    });
                    fri.forEach(item=>{
                        friContainer.innerHTML += item;
                    });
                    sat.forEach(item=>{
                        satContainer.innerHTML += item;
                    });
                } catch (error) {
                    
                }
            }
        }
    };

    xhr.open("POST", "./php/getDepartmentSched.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("id="+dept);
}

function editSched(schedID, start, stop, max){
    resetModal();

    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');
    let modalPositive = document.querySelector('.positive');
    let modalNegative = document.querySelector('.negative');
    let close = document.querySelector('.btn-close');
    let modalHeader = document.querySelector('.modal-header');
    let modalFooter = document.querySelector('.modal-footer');

    modalTitle.innerText = 'Editing...';
    modalBody.innerHTML = `
    <div class="editSched-container">
        <div class="time-container">
            <div class="editTime-container start">
                <select class="form-select" aria-label="Default select example" id="start-hour">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>
                <span>:</span>
                <select class="form-select" aria-label="Default select example" id="start-minuteA">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <select class="form-select" aria-label="Default select example" id="start-minuteB">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>
                <span>&nbsp;</span>
                <select class="form-select" aria-label="Default select example" id="start-period">
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                </select>
            </div>
            <span class="divider">-</span>
            <div class="editTime-container stop">
                <select class="form-select" aria-label="Default select example" id="stop-hour">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>
                <span>:</span>
                <select class="form-select" aria-label="Default select example" id="stop-minuteA">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <select class="form-select" aria-label="Default select example" id="stop-minuteB">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2"">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>
                <span>&nbsp;</span>
                <select class="form-select" aria-label="Default select example" id="stop-period">
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                </select>
            </div>
        </div>
        <div class="max-container">
            <label for="maxSlot">Slot: </label>
            <input type="text" value="${max}" id="maxSlot">
        </div>
    </div>
    `;

    modalPositive.innerText = 'Apply'
    modalPositive.setAttribute("onclick", "applyEditSched(schedID)")
    modalLauncher();

    startVal = splitTime(start);

    document.querySelector(`#start-hour option[value="${startVal[0]}"]`).setAttribute('selected', 'selected');
    document.querySelector(`#start-minuteA option[value="${startVal[1]}"]`).setAttribute('selected', 'selected');
    document.querySelector(`#start-minuteB option[value="${startVal[2]}"]`).setAttribute('selected', 'selected');
    document.querySelector(`#start-period option[value="${startVal[3]}"]`).setAttribute('selected', 'selected');

    stopVal = splitTime(stop);

    document.querySelector(`#stop-hour option[value="${stopVal[0]}"]`).setAttribute('selected', 'selected');
    document.querySelector(`#stop-minuteA option[value="${stopVal[1]}"]`).setAttribute('selected', 'selected');
    document.querySelector(`#stop-minuteB option[value="${stopVal[2]}"]`).setAttribute('selected', 'selected');
    document.querySelector(`#stop-period option[value="${stopVal[3]}"]`).setAttribute('selected', 'selected');
    

}

function deleteSched(schedID){
    alert("Confirm Delete " + schedID);
}

function addSched(day){
    alert("Add Details " + day);
}

function applyEditSched(){
}

function splitTime(time){

    let rawTime = time.split(' ')[0];
    let period = time.split(' ')[1];

    if(rawTime[0] == '0'){
        rawTime = rawTime.substring(1);
    }

    let hour = rawTime.split(':')[0];
    let minuteA = rawTime.split(':')[1][0];
    let minuteB = rawTime.split(':')[1][1];

    return [parseInt(hour), parseInt(minuteA), parseInt(minuteB), period];
}