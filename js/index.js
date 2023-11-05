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
let eventListenerAdded = false;
let posting = false;
let processingCal = false;

// If want natin ireset auto increment
// ALTER TABLE tableName AUTO_INCREMENT = 1

// AOS Initialization
AOS.init();
initial();

// DAPAT NAKA BCRYPT DIN YUNG OTP(LAHAT) AND CHAKA NATIN ICOMPARE SA DATABASE
const fakeOTP = '12345';
let OTP = "";

// DI KASAMA YUNG USERNAME KASI SA BACKEND NATIN SIYA IGENERATE FIRSTNAME-LASTNAME#kung pangilan siya ex.clarence-coronel2
const newAdmin = {
    'firstName': '',
    'middleName': '',
    'lastName': '',
    'phone': '',
    'password': '',
    'adminType': '',
}

const patient = {
    'department': '',
    'scheduleDate': '',
    'timeSlot': '',
    'firstName': '',
    'middleName': '',
    'lastName': '',
    'sex': '',
    'dateOfBirth': '',
    'phone': '',
    'barangay': '',
    'municipality': '',
    'province': '',
    'typeOfPatient': '',
    'caseNo': '',
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

    xhr.open("POST", './php/testSession.php', true);
    xhr.send();
}

function initial(){

    changeAccess();

    headerBtn.forEach((item)=>{
        item.addEventListener('click', ()=>{
            navLinks.style.left = "0";
            screenDarken.style.display = 'block';
            navLinks.style.transitionDuration = '500ms';
        });
    });
    
    accountBtn.forEach((item)=>{
        item.addEventListener('click', ()=>{
            accountSetting.style.display = 'flex';
        });
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
                
                item.style.borderColor = '#0577fa'; //primary-color
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

    if(!contentIsOpen) manageAdmin.style.display = newDisplay;

    contentIsOpen = false;
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

                // try {
                //     item.querySelector('.editBtn').style.color = 'rgb(80, 78, 78)';
                // } catch (error) {
                    
                // }
            });

            item.querySelectorAll('td').forEach((item2)=>{
                item2.classList.add('selected');

                // try {
                //     item2.querySelector('.editBtn').style.color = 'white';
                //     // item2.querySelector('.ico-edit').style.color = 'white';
                // } catch (error) {
                    
                // }
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
    // if(newAdmin['middleName'] == ""){
    //     errorHandler('10');
    //     return false;
    // } 
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
    if(newAdmin['middleName'] == ""){
        newAdmin['middleName'] = null;
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
    // newAdmin['phone'] = document.querySelector('#phone').value.replaceAll(' ', '').trim();
    // if(newAdmin["phone"] == ""){
    //     errorHandler('30');
    //     return false;
    // }
    // else if(newAdmin["phone"].length != 11){
    //     errorHandler('31');
    //     return false;
    // }
    // else if(isNaN(newAdmin["phone"])){
    //     errorHandler('32');
    //     return false;
    // }
    // else if((newAdmin["phone"]).slice(0, 2) != '09'){
    //     errorHandler('33');
    //     return false;
    // }

    // // Inserts spaces to phone num
    // newAdmin['phone'] = properPhoneNum(newAdmin['phone']);
    
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

    postNewAcc();
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

    // 
    // SCHEDULE
    // 
    // 

    // 
    // DEPT *************************
    // 
    else if(code == "60"){
        formErrorMessage = 'Department cannot be empty.';
    }
    // 
    // First Name ********************
    // 
    else if(code == '70'){
        formErrorMessage = 'First name cannot be empty.';
    }
    else if(code == '71'){
        formErrorMessage = 'First name can only contain letters.';
    }
    else if(code == '72'){
        formErrorMessage = 'First name can\'t only contain a letter or more than 30 letters.';
    }
    // 
    // Middle Name *****************************
    // 
    else if(code == '80'){
        formErrorMessage = 'Middle name cannot be empty.';
    }
    else if(code == '81'){
        formErrorMessage = 'Middle name can only contain letters.';
    }
    else if(code == '82'){
        formErrorMessage = 'Middle name can\'t only contain a letter or more than 30 letters.';
    }
    // 
    // Last Name *****************************
    // 
    else if(code == '90'){
        formErrorMessage = 'Last name cannot be empty.';
    }
    else if(code == '91'){
        formErrorMessage = 'Last name can only contain letters.';
    }
    else if(code == '92'){
        formErrorMessage = 'Last name can\'t only contain a letter or more than 30 letters.';
    }
    // 
    // SEX *****************************
    // 
    else if(code == '100'){
        formErrorMessage = 'Sex cannot be empty.';
    }
    // 
    // BIRTHDATE *****************************
    // 
    else if(code == '110'){
        formErrorMessage = 'Birthdate cannot be empty.';
    }
    else if(code == '111'){
        formErrorMessage = 'Birthdate is incomplete.';
    }
    else if(code == '112'){
        formErrorMessage = 'Birthdate is invalid.';
    }
    else if(code == '113'){
        formErrorMessage = 'Birthdate cannot be an upcoming date.';
    }
    // 
    // PHONE *****************************
    // 
    else if(code == '120'){
        formErrorMessage = 'Phone # cannot be empty.';
    }
    else if(code == '121'){
        formErrorMessage = 'Phone # must be contain 11 digits.';
    }
    else if(code == '122'){
        formErrorMessage = 'Phone # must start with "09".';
    }
    // 
    // MUNICIPALITY & BARANGAY *****************************
    // 
    else if(code == '130'){
        formErrorMessage = 'Municipality cannot be empty.';
    }
    else if(code == '131'){
        formErrorMessage = 'Barangay cannot be empty.';
    }
    // 
    // PROVINCE-OTHER *****************************
    // 
    else if(code == '140'){
        formErrorMessage = 'Province cannot be empty.';
    }
    else if(code == '141'){
        formErrorMessage = 'Province cannot have more than 30 letters.';
    }
    else if(code == '142'){
        formErrorMessage = 'Province cannot contain special characters.';
    }
    // 
    // MUNICIPALITY-OTHER *****************************
    // 
    else if(code == '143'){
        formErrorMessage = 'Municipality cannot be empty.';
    }
    else if(code == '144'){
        formErrorMessage = 'Municipality cannot have more than 30 letters.';
    }
    else if(code == '145'){
        formErrorMessage = 'Municipality cannot contain special characters.';
    }
    // 
    // BARANGAY-OTHER *****************************
    // 
    else if(code == '146'){
        formErrorMessage = 'Barangay cannot be empty.';
    }
    else if(code == '147'){
        formErrorMessage = 'Barangay cannot have more than 30 letters.';
    }
    else if(code == '148'){
        formErrorMessage = 'Barangay cannot contain special characters.';
    }
    // 
    // PATIENT TYPE *****************************
    // 
    else if(code == '150'){
        formErrorMessage = 'Patient type cannot be empty.';
    }
    // 
    // SCHEDULE DATE *****************************
    // 
    else if(code == '160'){
        formErrorMessage = 'Choose a date for the appointment.';
    }
    // 
    // TIME SLOT *****************************
    // 
    else if(code == '170'){
        formErrorMessage = 'Choose a slot for the appointment';
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
    title.style.color = 'rgb(10, 204, 10)';
    positive.style.display = 'none';
    negative.innerText = 'Close';

    let html = `
        <span class="newAdmin-username">Admin Username: <span class="username-highlight">${generatedUsername}</span></span>
    `
    body.innerHTML = html;

    modalLauncher();
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

    return checkSpeChar && checkUpper && checkLower && checkNum;
}

function onlyLettersAndNumbers(str) {
    return /^[A-Za-z0-9 ]*$/.test(str);
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
        field.parentElement.style.borderColor = '#0577fa';
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

    if(formState <= 2){
        formState++;
        
        // formParts.forEach((form)=>{
        //     form.style.display = 'none';
        // });

        if(formState == 1){
            if(checkFormA()){
                generateSched();
                const calendarPrev = document.querySelector('#calendar__prev');
                const calendarNext = document.querySelector('#calendar__next');

                formParts[formState-1].style.display = 'none';
                formParts[formState].style.display = 'flex';
                calendarNext.addEventListener('click', nextMonthBtn);
                calendarPrev.addEventListener('click', prevMonthBtn);
            }
            else{
                formState--;
                return;
            }
        }
        else if(formState == 2){
            if(checkFormB()){
                formParts[formState-1].style.display = 'none';
                formParts[formState].style.display = 'flex';
                grabPatient();
            }
            else{
                formState--;
                return;
            }
        }
        else{
            postAppointment();
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
            // document.querySelector('.followup-container').style.display = 'none';
        }
        else if(formState == 1){
            formParts[formState].style.display = 'flex';
            // document.querySelector('.followup-container').style.display = 'flex';
        }
    }
}

function checkFormA(){
    let dept = document.querySelector('#dept').value;
    if(dept == ""){
        errorHandler('60');
        return false;
    }
    // patient.department = dept;

    // FIRST NAME
    let firstName  = document.querySelector("#firstName").value.trim();
    if(firstName == ""){
        errorHandler("70");
        return false;
    }
    if (!isLettersOnly(firstName)){
        errorHandler("71");
        return false;
    }
    if((firstName).length > 30 || firstName.length == 1){
        errorHandler('72');
        return false;
    }
    patient.firstName = firstName;
    // MIDDLE NAME
    let middleName  = document.querySelector("#middleName").value.trim();
    // if(middleName == ""){
    //     errorHandler("80");
    //     return false;
    // }
    if (!isLettersOnly(middleName)){
        errorHandler("81");
        return false;
    }
    if(middleName.length > 30 || middleName.length == 1){
        errorHandler('82');
        return false;
    }
    if(middleName == ""){
        middleName = null;
    }

    patient.middleName = middleName;
    // LAST NAME
    let lastName  = document.querySelector("#lastName").value.trim();
    if(lastName == ""){
        errorHandler("90");
        return false;
    }
    if (!isLettersOnly(lastName)){
        errorHandler("91");
        return false;
    }
    if(lastName.length > 30 || lastName.length == 1){
        errorHandler('92');
        return false;
    }

    patient.lastName = lastName;
    // SEX
    let sex = document.querySelector("#sex").value;
    if(sex == ""){
        errorHandler("100");
        return false;
    }
    patient.sex = sex;
    // BIRTHDATE
    let month = document.querySelector("#month").value;
    let day = document.querySelector("#day").value;
    let year = document.querySelector("#year").value;
    let birthdate = `${year}-${month}-${day}`;
    let tempToday = new Date();
    let tempBirth = new Date(birthdate);

    if(month == "" && day == "" && year == ""){
        errorHandler("110");
        return false;
    }
    if(month == "" || day == "" || year == ""){
        errorHandler("111");
        return false;
    }
    if(!isDateValid(birthdate)){
        errorHandler("112");
        return false;
    }
    if(tempBirth.getTime() > tempToday.getTime()){
        errorHandler("113");
        return false;
    }
    patient.dateOfBirth = birthdate;
    // PHONE
    let phone = document.querySelector('#phone').value.replaceAll(' ', '').trim();
    if(phone == ""){
        errorHandler("120");
        return false;
    }
    if(phone.length != 11){
        errorHandler("121");
        return false;
    }
    else if(phone.slice(0, 2) != '09'){
        errorHandler('122');
        return false;
    }
    patient.phone = properPhoneNum(phone);

    if(document.querySelector('#municipality').value != 'other'){
        // 
        // MUNICIPALITY **************************
        // 
        patient.municipality = document.querySelector('#municipality').value;
        if(patient.municipality == ""){
            errorHandler('130');
            return false;
        }
        // 
        // BARANGAY **************************
        // 
        patient.barangay = document.querySelector('#barangay').value;
        if(patient.barangay == ""){
            errorHandler('131');
            return false;
        }
        // 
        // PROVINCE **************************
        // 
        patient.province = 'bulacan';
    }
    else{
        patient.province = "";
        patient.municipality = "";
        patient.barangay = "";
        // 
        // PROVINCE(OTHER) **************************
        // 
        let provinceOther = document.querySelector('#provinceOther').value.trim().toLowerCase();
        if(provinceOther == ''){
            errorHandler('140');
            return false;
        }
        else if(provinceOther.length > 30){
            errorHandler('141');
            return false;
        }
        else if(!isLettersNumsOnly(provinceOther)){
            errorHandler('142');
            return false;
        }
        patient.province = provinceOther;
        // 
        // MUNICIPALITY(OTHER) **************************
        // 
        let municipalityOther = document.querySelector('#municipalityOther').value.trim().toLowerCase();
        if(municipalityOther == ''){
            errorHandler('143');
            return false;
        }
        else if(municipalityOther.length > 30){
            errorHandler('144');
            return false;
        }
        else if(!isLettersNumsOnly(municipalityOther)){
            errorHandler('145');
            return false;
        }
        patient.municipality = municipalityOther;
        // 
        // BARANGAY(OTHER) **************************
        // 
        let barangayOther = document.querySelector('#barangayOther').value.trim().toLowerCase();
        if(barangayOther == ''){
            errorHandler('146');
            return false;
        }
        else if(barangayOther.length > 30){
            errorHandler('147');
            return false;
        }
        else if(!isLettersNumsOnly(barangayOther)){
            errorHandler('148');
            return false;
        }
        patient.barangay = barangayOther;
    }
    // PATIENT TYPE
    let type = document.querySelector('#patientType').value;
    if(type == ""){
        errorHandler('150');
        return false;
    }
    patient.typeOfPatient = type;

    patient.caseNo = document.querySelector('#caseNo').value;

    return true;
}

function checkFormB(){
    let date = document.querySelector('#scheduleDate').value;
    let timeSlot = document.querySelector('#timeSlot').value;

    if(date == ""){
        errorHandler("160");
        return false;
    }
    if(timeSlot == ""){
        errorHandler("170");
        return false;
    }

    patient.scheduleDate = htmlDateUnconvert(date);
    patient.timeSlot = timeSlot;
    return true;
}

function grabPatient(){
    let reviewFields = document.querySelectorAll('.schedule__review-field');
    reviewFields.forEach((item, index)=>{
        switch(index){
            case 0:
                item.querySelector('.schedule__field-content').innerHTML = `${htmlDateConverter(patient.scheduleDate)} (${selectedSlot})`;
                break;
            case 1:
                const dept = ['ENT', 'Hematology', 'Internal Medicine', 'Internal Medicine Clearance', 'Nephrology', 'Neurology', 'OB GYNE New', 'OB GYNE Old', 'OB GYNE ROS', 'Oncology', 'Pediatric Cardiology', 'Pediatric Clearance', 'Pediatric General', 'Psychiatry New', 'Psychiatry Old', 'Surgery', 'Surgery ROS'];
                // Turn string to proper form then removed comma from function
                let deptName = dept[patient['department']-1];
                // let removedCommaDept = "";

                // for(i = 0; i < dept.length; i++){
                //     if(dept[i] != ',') removedCommaDept += dept[i];
                // }

                item.querySelector('.schedule__field-content').innerHTML = deptName;
                break;
            case 2:
                // Turn string to proper form then removed comma from function
                let fullName = capitalFirstLetter(`${patient['firstName']} ${patient['middleName']} ${patient['lastName']}`)

                item.querySelector('.schedule__field-content').innerHTML = fullName;
                break;
            case 3:
                if(patient.sex == 'm'){
                    item.querySelector('.schedule__field-content').innerHTML = "Male";
                }
                else{
                    item.querySelector('.schedule__field-content').innerHTML = "Female";
                }
                break;
            case 4:
                // inserts converted value to birthdateDisplay which is Month date, year
                item.querySelector('.schedule__field-content').innerHTML = htmlDateConverter(patient.dateOfBirth);
                break;   
            case 5:
                item.querySelector('.schedule__field-content').innerHTML = patient.phone;
                break; 
            case 6:
                // Turn string to proper form
                let tempAddress = capitalFirstLetter(`${patient.barangay}, ${patient.municipality}, ${patient.province}`)
                item.querySelector('.schedule__field-content').innerHTML = tempAddress;
                break;
            case 7:
                if(patient['typeOfPatient'] == 'old') item.querySelector('.schedule__field-content').innerHTML = 'Dating Pasyente';
                else item.querySelector('.schedule__field-content').innerHTML = 'Bagong Pasyente';
                break;
            case 8:
                item.querySelector('.schedule__field-content').innerHTML = patient['caseNo'];
                break;
        }
    });
}

function filterCaseNo(id){
    let element = document.getElementById(id);
    let newVal = "";

    for(i =0; i< element.value.length; i++){

        if(!isNaN(element.value[i]) || element.value[i] == '-'){
            newVal+= element.value[i];
        }
    };
    element.value = newVal.replaceAll(" ", "").trim();
}

function isLettersOnly(str) {
	return /^[A-Za-z ]*$/.test(str);
}

function isLettersNumsOnly(str) {
	return /^[A-Za-z 0-9]*$/.test(str);
}

function confirmSignOut(){
    confirmModal("Signing out...", "Are you sure?", "signOut()");
}

function viewRequestApprove(appID, deptID){
    resetModal();

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
                    <input type="text" name="month" id="schedMonth" placeholder="MM" oninput="inputLimiterNum(this.id, 2); generateTimeSlotBuffer(${deptID})" onblur="inputLimiterBlur(this.id, 2)">
                    <input type="text" name="day" id="schedDay" placeholder="DD" oninput="inputLimiterNum(this.id, 2); generateTimeSlotBuffer(${deptID})" onblur="inputLimiterBlur(this.id, 2)">
                    <input type="text" name="year" id="schedYear" placeholder="YYYY" oninput="inputLimiterNum(this.id, 4); generateTimeSlotBuffer(${deptID})" onblur="inputLimiterBlur(this.id, 4)">
                </div>
            </div>
            <select class="form-select" aria-label="Default select example" onchange="" id="timeSelect" disabled>
                <option value="" selected hidden disabled>Choose Time Slot</option>
            </select>
            <div class="error-container">
                <span class="msg"></span>
            </div>
        </div>
    `;

    title.innerHTML = 'Schedule Appointment On';
    positive.innerText = 'Schedule';
    negative.innerText = 'Cancel';
    body.innerHTML = html;

    positive.setAttribute("onclick", `applyApproveReq(${appID})`);
    positive.removeAttribute("data-bs-dismiss");
    modalLauncher();
}

function generateTimeSlotBuffer(deptID){
    let month = document.querySelector("#schedMonth").value;
    let day = document.querySelector("#schedDay").value;
    let year = document.querySelector("#schedYear").value;
    let select = document.querySelector("#timeSelect");

    select.innerHTML = '';
    select.innerHTML += `<option value="" selected hidden disabled>Choose Time Slot</option>`;
    select.setAttribute("disabled", "disabled");
    if(month != "" && day != "" && year != "" && year.length == 4){
        if(!isDateValid(`${year}-${month}-${day}`)){
            showError("Invalid date");
            return;
        }
        else if(!isInFuture(`${year}-${month}-${day}`)){
            showError("Only future dates are valid");
            return;
        }
        else{
            let temp = new Date(`${year}-${month}-${day}`);
            let dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
            let dayName = dayNames[temp.getDay()];
            
            if(dayName == 'sun'){
                showError("There are no schedules in sunday");
                return;
            }else{
                showError("");
            }

            const xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function(){
                if(this.readyState == 4){
                    if(this.status == 200){
                        try {
                            const arrOfObj = JSON.parse(this.responseText);
                            
                            if(arrOfObj.length != 0){
                                select.innerHTML = '';
                                select.innerHTML += `<option value="" selected hidden disabled>Choose Time Slot</option>`;
                                arrOfObj.forEach(item=>{
                                    let template = '';
    
                                    if(item.openSlots <= 0){
                                        template = 
                                        `
                                        <option value="" disabled>${item.startTime} - ${item.stopTime} (Full)</option>
                                        `;
                                    }else{
                                        template = 
                                        `
                                        <option value="${item.schedID}_${item.max}">${item.startTime} - ${item.stopTime} (${item.openSlots} Slot/s)</option>
                                        `;
                                    }
    
                                    select.innerHTML += template;
                                })
                                select.removeAttribute("disabled");
                            }
                            else{
                                select.innerHTML = '';
                                select.innerHTML += `<option value="" selected hidden disabled>No Existing Schedule</option>`;
                            }
                            
                            
                            
                        } catch (error) {
                            // alert("Something went wrong...")
                        }
                         
                    }
                }
            }
            
            xhr.open("POST", "./php/getTimeSlot.php", false);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(`date=${year}-${month}-${day}&dept=${deptID}&day=${dayName}`);
        }
    }
}

function applyApproveReq(appID){
    if(posting){
        return;
    }

    posting = true;
    
    let month = document.querySelector("#schedMonth").value;
    let day = document.querySelector("#schedDay").value;
    let year = document.querySelector("#schedYear").value;
    let time = document.querySelector("#timeSelect").value.split("_")[0];
    let max = document.querySelector("#timeSelect").value.split("_")[1];

    if(month == "" || day == "" || year ==""){
        showError("Invalid date");
        posting = false;
        return;
    }
    else if(time == ""){
        showError("Select a time slot");
        posting = false;
        return;
    }
    else{
        document.querySelector('.positive').removeAttribute('onclick');
        document.querySelector('.positive').setAttribute('data-bs-dismiss', 'modal');
        document.querySelector('.positive').click();
    }

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                if(this.responseText != 0){
                    document.querySelector('#linkToDelete').value = this.responseText;
                    document.querySelector('#deleteImg-btn').click();
                    setTimeout(()=>{
                        showResModal("Request has been approved");
                        insertReq();
                    }, 500);
                }
                else if (this.responseText == 0){
                    setTimeout(()=>{
                        showResModal("Selected slot is now full", false, "Failed");
                    }, 500);
                }
            }
        }
    }
    
    xhr.open("POST", "./php/updateAppointment.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`appID=${appID}&schedDate=${year}-${month}-${day}&schedID=${time}&max=${max}`);
    posting = false;
}

function viewRequestReject(appID){
    resetModal();
    
    let title = document.querySelector('.modal-title');
    let body = document.querySelector('.modal-body');
    let positive = document.querySelector('.positive');
    let negative = document.querySelector('.negative');

    title.innerText = 'Rejecting Appointment...';
    body.innerText = 'Are you sure?';
    positive.innerText = 'Confirm';
    negative.innerText = 'Cancel';

    positive.setAttribute('onclick', `applyRequestReject(${appID})`);
    modalLauncher();
}

function applyRequestReject(appID){
    if (posting) return;
    posting = true;

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                if(this.responseText != 0){
                    document.querySelector('#linkToDelete').value = this.responseText;
                    document.querySelector('#deleteImg-btn').click();
                    console.log(document.querySelector('#linkToDelete').value);
                    setTimeout(()=>{
                        showResModal("Request has been rejected");
                        insertReq();
                    }, 500);
                }
                
            }
        }
    }
    
    xhr.open("POST", "./php/updateAppointment2.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`appID=${appID}`);
    posting = false;
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

        document.querySelector('.view-schedule__table tbody').innerHTML = 
        `
        <tr>
            <td colspan="16" class="empty">Empty</td>
        </tr>
        `;
        setupTablePagination('schedule-table', 'prevButton', 'nextButton', 10);
    }
    else if(id == 'quickViewBtn'){
        quickViewIsActive = true;
        quickViewBtn.classList.add('view-schedule__selected');
        filterBtn.classList.remove('view-schedule__selected');
        field.innerHTML = quickView;

        document.querySelector('.view-schedule__table tbody').innerHTML = 
        `
        <tr>
            <td colspan="16" class="empty">No Department Selected</td>
        </tr>
        `;
        setupTablePagination('schedule-table', 'prevButton', 'nextButton', 10);
    }
}

function insertAccInfo(){
    const username = document.querySelector('#accountUsername');
    const name = document.querySelector('#accountFullName');
    const phone = document.querySelector('#accountPhone');

    username.innerText = signedInAdmin.username;
    name.innerText = `${capitalFirstLetter(signedInAdmin.firstName)} ${capitalFirstLetter(signedInAdmin.middleName)} ${capitalFirstLetter(signedInAdmin.lastName)}`;
    
    if(signedInAdmin.phone != "") phone.innerText = signedInAdmin.phone;
    else phone.innerText = "Insert phone #"
}

// function openModalOTP(){
//     resetModal();

//     let modalTitle = document.querySelector('.modal-title');
//     let modalBody = document.querySelector('.modal-body');
//     let modalCloseBtn = document.querySelector('.btn-close');
//     let negativeBtn = document.querySelector('.negative');
//     let positiveBtn = document.querySelector('.positive');
//     let modal = document.querySelector('.modal-dialog');
//     let modalItself = document.querySelector('.modal');
//     let modalHeader = document.querySelector('.modal-header');
//     let modalFooter = document.querySelector('.modal-footer');
    
//     modalHeader.style.display = 'none';
//     modalFooter.style.display = 'none';
//     modalTitle.style.color = 'unset';


//     let htmlCode = `
//     <div class="OTP-container">
//         <div class="textInfo-container">
//             <span class="mainText">Input One-Time Password</span>
//             <span class="subText">One-Time Password has been sent to <span class="phoneDisplay">09XX XXX XXXX</span></span>
//         </div>
//         <div class="OTP-body">
//             <div class="OTP-field">
//                 <input type="text" name="OTP" id="OTP" oninput="inputLimiterNum(this.id, 5)" onblur="inputLimiterNum(this.id, 5)" oninput="inputLimiter(this.id, 5)" onblur="inputLimiterBlur(this.id, 5)">
//                 <button class="resend-btn">Re-Send</button>
//             </div>
//             <div class="error-msg"></div>
//         </div>
//         <button class="OTP-btn">Submit</button>
//     </div>
//     `
//     modalBody.innerHTML = htmlCode;
    
//     document.querySelector('.phoneDisplay').innerHTML = newAdmin['phone'];
//     document.querySelector('.OTP-btn').addEventListener('click', ()=>{
//         checkOTP();
//     });
//     modalLauncher();
//     resetCD();

//     document.querySelector('.resend-btn').addEventListener('click', ()=>{
//         if(isResendAvail){
//             resendOTP();
//             resetCD();
//             isResendAvail = false;
//         } 
//     });
// }

// function sendOTP(){
//     // magsend otp

//     openModalOTP();
// }

// function resendOTP(){
//     // di na magopen panibago modal kaya nakahiwalay tong function na to
// }

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

function postNewAcc(){
    if(posting){
        return;
    }

    posting = true;

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
    posting = false;
    return;
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
    let main = document.querySelector("main");

    modalHeader.style.display = 'none';
    modalFooter.style.display = 'none';
    modalTitle.style.color = 'unset';


    let htmlCode = `
    <div class="editPhone-outer">
        <div class="editPhone-container">
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
        </div>
    </div>
    `
    main.innerHTML = htmlCode;
    document.querySelector('.phoneDisplay').innerHTML = newInsertedPhone;
    document.querySelector('.OTP-btn').addEventListener('click', ()=>{
        checkOTP_Edit();
    });
    // modalLauncher();
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
    // OTP = generateOTP();
    OTP = "12345";

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(this.status == 200){
                openModalOTP_Edit()
            }
            else{
                alert('Something went wrong...');
            }
        }
    }

    xhr.open("POST", "./php/sendOTP.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`phone=${newInsertedPhone}&otp=${OTP}`);
}

function resendOTP_Edit(){
    // OTP = generateOTP();
    OTP = "12345";
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(this.status == 200){
                
            }
            else{
                alert('Something went wrong...');
            }
        }
    }

    xhr.open("POST", "./php/sendOTP.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`phone=${newInsertedPhone}&otp=${OTP}`);
}

function checkOTP_Edit(){
    let OTPField = document.querySelector('#OTP').value;
    let close = document.querySelector('.negative');

    let error = document.querySelector('.error-msg');

    

    // Kunin yung OTP sa database pero sa ngayon konwari na get na tapos yun yung fakeOTP

    // Check if magkamuka input
    if(OTPField == OTP){
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    if(xhr.responseText == 1){
                         showResModal('Phone has been updated');
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

function capitalFirstLetter(str){
    str = str.split(' ');
    let newStr = [];

    str.forEach((item)=>{
        newStr.push(item.charAt(0).toUpperCase() + item.substring(1));
    });

    return newStr.join(' ');
}

function applyNewPhone(){
    
    if(signedInAdmin.phone == ""){
        applyNewPhoneEmpty();
        return;
    }

    if(posting) return;
    posting = true;

    const newPhone = properPhoneNum(document.querySelector('#newPhone').value.replaceAll(' ', '').trim());
    const pass = document.querySelector('#confirmation').value;

    if(newPhone == "" || pass == ""){
        showError("Please fill in both fields");
        posting = false;
        return;
    }
    else if(newPhone.slice(0, 2) != '09'){
        showError("Phone # must start with 09");
        posting = false;
        return;
    }
    else if(newPhone.length != 13){
        showError("Invalid phone #");
        posting = false;
        return;
    }
    else{
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    if(xhr.responseText == 1){
                        newInsertedPhone = newPhone
                        sendOTP_Edit();
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
    posting = false;
}

function applyNewPhoneEmpty(){

    if(posting) return;

    posting = true;

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
                        insertNewPhone();
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
    posting = false;
}

function insertNewPhone(){
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                if(xhr.responseText == 1){
                        showResModal('Phone has been updated');
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
    if(posting) return;
    posting = true;

    const currentPass = document.querySelector('#currentPassword').value;
    const newPass = document.querySelector('#newPassword').value;
    const confirmNewPass = document.querySelector('#confirmNewPassword').value;

    if(currentPass == "" || newPass == "" || confirmNewPass == ""){
        showError("Please fill in all fields");
        posting = false;
        return;
    }
    else if(newPass != confirmNewPass){
        showError("Password do not match");
        posting = false;
        return;
    }
    else if(newPass > 64){
        showError("Password must be equal or less than 64 characters");
        posting = false;
        return;
    }
    else if(newPass < 8){
        showError("Password must at least be 8 characters");
        posting = false;
        return;
    }
    else if(!containsLetterNumSpeChar(newPass)){
        showError("Password must contain an upper & lower case letter, a number, and a special character");
        posting = false;
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
    posting = false;
}

function changeAccess(){
    const nav = document.querySelector('.btns-container');

    const navBtns = [
        `
        <button id="1" class="nav-links__item" onclick="generateDashboard();">
            <span class="material-icons-outlined ico-nav">dashboard</span>
            Dashboard
        </button>
        `,
        `
        <button id="2" class="nav-links__item" onclick="generateSchedule();">
            <span class="material-icons-outlined ico-nav">calendar_month</span>
            Schedule An Appointment
        </button>
        `,
        `
        <button id="3" class="nav-links__item" onclick="generateViewSchedule();">
            <span class="material-icons-outlined ico-nav">book</span>
            View Appointments
        </button>
        `,
        `
        <button id="4" class="nav-links__item" onclick="generateRequest();">
            <span class="material-icons-outlined ico-nav">pending_actions</span>
            Follow-Up Requests
        </button>
        `,
        `
        <button id="5" class="nav-links__item" onclick="generateScheduling()">
            <span class="material-icons-outlined ico-nav">edit_calendar</span>
            Edit Department Schedules
        </button>
        `,
        `
        <div id="6" class="nav-links__item manage-admins" data-click="doNothing" onclick="showManageAdmins();">
            <button class="master-btn-content" id="btn--manage-admins" data-click="doNothing">
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
            </div>
        </div>
        `,
        `
        <button id="7" class="nav-links__item" onclick="generateWebsiteStatus()">
            <span class="material-icons-outlined ico-nav">medical_services</span>
            Manage Website Status
        </button>
        `,
        `
        <button id="8" class="nav-links__item" onclick="generatePostAnnouncement()">
            <span class="material-icons-outlined ico-nav">campaign</span>
            Post An Announcement
        </button>
        `,
        `
        <button id="9" class="nav-links__item" onclick="generateManageData()">
            <span class="material-icons-outlined ico-nav">storage</span>
            Manage Data
        </button>
        `,
        `
        <button id="10" class="nav-links__item" onclick="generateBlockDates()">
            <span class="material-icons-outlined ico-nav">block</span>
            Block Dates
        </button>
        `,
        `
        <button id="11" class="nav-links__item" onclick="generateFeedback()">
            <span class="material-icons-outlined ico-nav">chat</span>
            Feedback
        </button>
        `,
        `
        <button id="12" class="nav-links__item" onclick="generateEditTutorial()">
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
            window.addEventListener('click', (e)=>{
                if(e.target.getAttribute('data-click') != 'doNothing'){
        
                    navLinks.style.transitionDuration = 'unset';
                    navLinks.style.left = "-300px";
                    screenDarken.style.display = 'none';
                    // accountSetting.style.display = 'none';
        
                }

                if(e.target.getAttribute('data-click') != 'doNothingAcc'){
                    accountSetting.style.display = 'none';
                }
            });
        });
    }
    else if(signedInAdmin.adminType == 'admin ii'){
        adminII.forEach(item=>{
            nav.innerHTML += navBtns[item];
            window.addEventListener('click', (e)=>{
        
                if(e.target.getAttribute('data-click') != 'doNothing'){
        
                    navLinks.style.transitionDuration = 'unset';
                    navLinks.style.left = "-300px"
        
                    screenDarken.style.display = 'none';
                    // accountSetting.style.display = 'none';
        
                }

                if(e.target.getAttribute('data-click') != 'doNothingAcc'){
                    accountSetting.style.display = 'none';
                }
            });
        });
    }
    else if(signedInAdmin.adminType == 'super admin'){
        adminS.forEach(item=>{
            nav.innerHTML += navBtns[item];
            window.addEventListener('click', (e)=>{
        
                if(e.target.getAttribute('data-click') != 'doNothing'){
        
                    navLinks.style.transitionDuration = 'unset';
                    navLinks.style.left = "-300px"
        
                    screenDarken.style.display = 'none';
                    document.querySelector('.manage-admins__sub-container').style.display = 'none';
        
                    if(document.querySelector('.manage-admins__sub-container').style.display == 'none'){
                        let newIco = document.querySelector('.change').innerHTML ='chevron_right';
                        document.querySelector('.change').innerHTML = newIco;
                    }
        
                }

                if(e.target.getAttribute('data-click') != 'doNothingAcc'){
                    accountSetting.style.display = 'none';
                }
            });
        });
    }

    if(signedInAdmin.adminType == 'admin i'){
        generateViewSchedule();
    }
    else if(signedInAdmin.adminType == 'admin ii'){
        generateSchedule();
    }
    else if(signedInAdmin.adminType == 'super admin'){
        generateDashboard();
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

    xhr.open("POST", './php/getAdminPrivilege.php', false);
    xhr.send();

    return allowAccess;
}

function insertAnnouncement(){
    if(posting){
        return;
    }

    posting = true;
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
                        showResModal("Something went wrong", false, "Failed");
                    }
                    
                }
            }
        }

        xhr.open("POST", "./php/postAnnouncement.php");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(jsonString);
    })
    posting = false;
}

function getFeedback(sortBy = 1){
    const table = document.querySelector('.feedback__table tbody');


    const xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                if(xhr.responseText != 0){
                    try {
                        table.innerHTML = ""
                        let arrayOfObjects = JSON.parse(xhr.responseText);
                        arrayOfObjects.forEach(item=>{
                            let rowTemplate =
                            `
                            <tr class="table-row">
                                <td>${item.rate}</td>
                                <td>${item.content}</td>
                                <td class="always-visible">${convertRetrievedDate(item.dateSubmitted)}</td>
                            </tr>
                            `;
        
                            table.innerHTML += rowTemplate;
                            
                        });
                        showTableCell();
                    } catch (error) {
                        table.innerHTML = `
                        <tr>
                            <td colspan="3" class="empty">There is currently no feedback</td>
                        </tr>
                        `
                    }
                    
                }
            }
        }
        else{
            table.innerHTML = `
                <tr>
                    <td colspan="3" class="empty">Loading...</td>
                </tr>
            `
        }
        setupTablePagination('feedback-table', 'prevButton', 'nextButton', 10);
    }

    xhr.open("POST", "./php/getFeedback.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`sortBy=`+sortBy);
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
    if(posting){
        return;
    }

    posting = true;

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
    posting = false;
}

function applyDesktopTutorial(){
    if(posting){
        return;
    }

    posting = true;
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
    posting = false;
}

function checkBlockDate(){
    if(posting){
        return;
    }

    posting = true;

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
        posting = false;
        return;
    }
    else if(!isDateValid(tempDate)){
        showError("Input a valid date");
        posting = false;
        return;
    }
    else if(tempObj >= tempObj2){
        showError("Input an upcoming date");
        posting = false;
        return;
    }
    else if(!onlyLettersAndNumbers(name)){
        showError("Name can only contain letters and numbers");
        posting = false;
        return;
    }
    else if(checkDateExist(tempDate)){
        showError("Date already exist");
        posting = false;
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

    xhr.open("POST", "./php/postBlockDate.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(jsonString);
    posting = false;
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

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                try {
                    table.innerHTML = "";
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
                        <tr class="table-row">
                            <td>${date}</td>
                            <td>${dateName}</td>
                            <td>${isYearly}</td>
                            <td><button class="removeBtn" id="blockDate-${id}" data-name="${dateName}" onclick="confirmBlockDateRemove(this.id)">Delete</button></td>
                        </tr>
                        `;

                        table.innerHTML += template;
                    })
                    showTableCell();
                } catch (error) {
                    table.innerHTML = `
                    <tr>
                        <td colspan="4" class="empty">There is currently no blocked date</td>
                    </tr>
                    `
                }
            }
        }
        else{
            table.innerHTML = `
            <tr>
                <td colspan="4" class="empty">Loading...</td>
            </tr>
            `
        }
        setupTablePagination('date-table', 'prevButton', 'nextButton', 10);
    }

    xhr.open("POST", "./php/getBlockDate.php", false);
    xhr.send();
}

function confirmBlockDateRemove(id){
    let dateName = document.querySelector(`#${id}`).getAttribute("data-name");
    let dateID = id.split("-")[1];
    confirmModal("Deleting...", `Are you sure you want to remove ${dateName}?`, `removeBlockDate(${dateID}, "${dateName}")`);
}

function removeBlockDate(id, dateName){
    // let dateID = id.split('-');
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
    
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                
                try {
                    table.innerHTML = "";
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
                        <tr class="table-row">
                            <td class="always-visible">${title}</td>
                            <td>${datePosted}</td>
                            <td>${timePosted}</td>
                            <td>${author}</td>
                            <td><button class="removeBtn" id="ann-${id}" data-title="${title}" onclick="confirmAnnRemove(this.id)">Delete</button></td>
                        </tr>
                        `;

                        table.innerHTML += template;
                    })
                } catch (error) {
                    table.innerHTML = 
                    `
                    <tr>
                        <td colspan="5" class="empty">There is currently no announcement</td>
                    </tr>
                    `;
                }               
            }
        }
        else{
            table.innerHTML = 
            `
            <tr>
                <td colspan="5" class="empty">Loading...</td>
            </tr>
            `;
        }
        setupTablePagination('ann-table', 'prevButton', 'nextButton', 10); 
    }


    xhr.open("POST", "./php/getAnnouncement.php", false);
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
                        <tr class="table-row">
                            <td class="always-visible">${capitalFirstLetter(lastName)}, ${capitalFirstLetter(firstName)} ${capitalFirstLetter(middleName)}</td>
                            <td class="always-visible">${username}</td>
                            <td>${phone}</td>
                            <td>${adminType}</td>
                            <td>
                                <button class="editBtn" id="${username}_${adminType}" onclick="editType(this.id)">Edit</button>
                                <button class="removeBtn" onclick="confirmAdminRemove(this.id)" id="${username}">Delete</button>
                            </td>
                        </tr>
                        `;

                        table.innerHTML += template;
                    })
                    showTableCell();
                } catch (error) {
                    if(isInitial){
                        table.innerHTML = 
                        `
                        <tr>
                            <td colspan="5" class="empty">There is currently no other admin</td>
                        </tr>
                        `;
                    }
                    else{
                        table.innerHTML = 
                        `
                        <tr>
                            <td colspan="5" class="empty">No result</td>
                        </tr>
                        `;
                    }
                }

                setupTablePagination('admin-table', 'prevButton', 'nextButton', 10);                
            }
        }
        else{
            table.innerHTML = 
            `
            <tr>
                <td colspan="5" class="empty">Loading Table...</td>
            </tr>
            `;
        }
    }

    if(isInitial){
        xhr.open("POST", "./php/getAdmin.php", true);
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

    xhr.open("POST", "./php/checkAdminPrivChange.php", true);
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
                        <tr class="table-row">
                            <td class="always-visible">${username}</td>
                            <td class="always-visible">${activity}</td>
                            <td>${adminType}</td>
                            <td>${logDate}</td>
                            <td>${logTime}</td>
                        </tr>
                        `;

                        table.innerHTML += template;
                    })
                    showTableCell();              
                } catch (error) {
                    if(isInitial){
                        table.innerHTML = 
                        `
                        <tr>
                            <td colspan="5" class="empty">There is currently no admin activitiy</td>
                        </tr>
                        `;
                    }
                    else{
                        table.innerHTML = 
                        `
                        <tr>
                            <td colspan="5" class="empty">No result</td>
                        </tr>
                        `;
                    }
                }
            }
        }
        else{
            table.innerHTML = 
            `
            <tr>
                <td colspan="5" class="empty">Loading Table...</td>
            </tr>
            `;
        }
        setupTablePagination('logs-table', 'prevButton', 'nextButton', 10);  
    }

    if(isInitial){
        xhr.open("POST", "./php/getAdminLogs.php", true);
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
        else if(year.length != 4){
            showError("Invalid Date")
            return;
        }
    }
    else{
        fullDate = "";
    }

    showError("");

    let obj = {
        date: fullDate,
        activity: activity,
        adminType: adminType,
        sortBy: sortBy
    }

    const toSend = JSON.stringify(obj);

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
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
                        <tr class="table-row">
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
                    table.innerHTML = 
                    `
                    <tr>
                        <td colspan="6" class="empty">No result</td>
                    </tr>
                    `;
                }
            }
        }
        else{
            table.innerHTML = 
            `
            <tr>
                <td colspan="5" class="empty">Loading Table...</td>
            </tr>
            `;
        }
        setupTablePagination('logs-table', 'prevButton', 'nextButton', 10);     
    }

    xhr.open("POST", "./php/filterAdminLog.php", true);
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

    xhr.open("POST", "./php/getCurrentWebStatus.php", false);
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
    if(posting){
        return;
    }

    posting = true;

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
                        generateWebsiteStatus();
                        posting = false;   
                    }, 500)               
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
                        const deptID = item.deptID;
                        const day = item.day;
                        const startTime = item.startTime;
                        const stopTime = item.stopTime;
                        const max = item.max;
                        let isBuffer = item.isBuffer;
                        let clss;

                        if(isBuffer == 1) isBuffer = true;
                        else if(isBuffer == 0) isBuffer = false;

                        if(isBuffer) clss = 'buffer';
                        else clss = '';
                        
                        let blockTemplate = 
                        `
                        <div class="block ${clss}">
                            <div class="timeslot">
                                <div class="time">${startTime} - ${stopTime}</div>
                                <div class="max">${max}</div>
                            </div>
                            <div class="button-container">
                                <button data-sched_id="${id}" data-start="${startTime}" data-stop="${stopTime}" data-max="${max}" data-dept="${deptID}" data-day="${day}" onclick="editSched(this.dataset.sched_id, this.dataset.start, this.dataset.stop, this.dataset.max, this.dataset.dept, this.dataset.day)">Edit</button>
                                <button data-sched_id="${id}" data-dept="${deptID}" data-day="${day}" onclick="deleteSched(this.dataset.sched_id, this.dataset.dept, this.dataset.day)">Delete</button>
                            </div>
                        </div>
                        `;

                        if(day == 'mon'){
                            mon.push(blockTemplate);
                        }
                        else if(day == 'tue'){
                            tue.push(blockTemplate);
                        }
                        else if(day == 'wed'){
                            wed.push(blockTemplate);
                        }
                        else if(day == 'thu'){
                            thu.push(blockTemplate);
                        }
                        else if(day == 'fri'){
                            fri.push(blockTemplate);
                        }
                        else if(day == 'sat'){
                            sat.push(blockTemplate);
                        }
                    })

                    mon.push(`
                    <div class="block add">
                        <button class="add-btn" data-day="mon" onclick="addSched(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
                    </div>`);

                    tue.push(`
                    <div class="block add">
                        <button class="add-btn" data-day="tue" onclick="addSched(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
                    </div>`);

                    wed.push(`
                    <div class="block add">
                        <button class="add-btn" data-day="wed" onclick="addSched(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
                    </div>`);

                    thu.push(`
                    <div class="block add">
                        <button class="add-btn" data-day="thu" onclick="addSched(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
                    </div>`);

                    fri.push(`
                    <div class="block add">
                        <button class="add-btn" data-day="fri" onclick="addSched(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
                    </div>`);

                    sat.push(`
                    <div class="block add">
                        <button class="add-btn" data-day="sat" onclick="addSched(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
                    </div>`);

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
                    let monContainer = document.querySelector('#monday .timeslot-container');
                    let tueContainer = document.querySelector('#tuesday .timeslot-container');
                    let wedContainer = document.querySelector('#wednesday .timeslot-container');
                    let thuContainer = document.querySelector('#thursday .timeslot-container');
                    let friContainer = document.querySelector('#friday .timeslot-container');
                    let satContainer = document.querySelector('#saturday .timeslot-container');

                    const mon = [];
                    const tue = [];
                    const wed = [];
                    const thu = [];
                    const fri = [];
                    const sat = [];

                    mon.push(`
                    <div class="block add">
                        <button class="add-btn" data-day="mon" onclick="addSched(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
                    </div>`);

                    tue.push(`
                    <div class="block add">
                        <button class="add-btn" data-day="tue" onclick="addSched(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
                    </div>`);

                    wed.push(`
                    <div class="block add">
                        <button class="add-btn" data-day="wed" onclick="addSched(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
                    </div>`);

                    thu.push(`
                    <div class="block add">
                        <button class="add-btn" data-day="thu" onclick="addSched(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
                    </div>`);

                    fri.push(`
                    <div class="block add">
                        <button class="add-btn" data-day="fri" onclick="addSched(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
                    </div>`);

                    sat.push(`
                    <div class="block add">
                        <button class="add-btn" data-day="sat" onclick="addSched(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
                    </div>`);

                    mon.forEach((item)=>{
                        monContainer.innerHTML += item;
                    })
                    tue.forEach((item)=>{
                        tueContainer.innerHTML += item;
                    })
                    wed.forEach((item)=>{
                        wedContainer.innerHTML += item;
                    })
                    thu.forEach((item)=>{
                        thuContainer.innerHTML += item;
                    })
                    fri.forEach((item)=>{
                        friContainer.innerHTML += item;
                    })
                    sat.forEach((item)=>{
                        satContainer.innerHTML += item;
                    })
                }
            }
        }
    };

    xhr.open("POST", "./php/getDepartmentSched.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("id="+dept);
}

function editSched(schedID, start, stop, max, deptID, day){
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
                <input onclick="this.select()" type="text" class="timepart time-hourA" id="startHourA" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '01'); checkHourB('start')">
                <input onclick="this.select()" type="text" class="timepart time-hourB" id="startHourB" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '0123456789'); checkHourA('start');">
                <span>:</span>
                <input onclick="this.select()" type="text" class="timepart time-minA" id="startMinuteA" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '01345');">
                <input onclick="this.select()" type="text" class="timepart time-minB" id="startMinuteB" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '0123456789');">
                <input type="text" class="timepart time-minB" id="startPeriod" value="AM" readonly>
            </div>
            <span class="divider">-</span>
            <div class="editTime-container stop">
                <input onclick="this.select()" type="text" class="timepart time-hourA" id="stopHourA" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '01'); checkHourB('stop')">
                <input onclick="this.select()" type="text" class="timepart time-hourB" id="stopHourB" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '0123456789'); checkHourA('stop');">
                <span>:</span>
                <input onclick="this.select()" type="text" class="timepart time-minA" id="stopMinuteA" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '01345');">
                <input onclick="this.select()" type="text" class="timepart time-minB" id="stopMinuteB" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '0123456789');">
                <input type="text" class="timepart time-minB" id="stopPeriod" value="AM" readonly>
            </div>
        </div>
        <div class="max-container">
            <div class="slot-wrapper">
                <label for="maxSlot">Slot: </label>
                <input type="text" placeholder="0" value="${max}" id="maxSlot" oninput="filterPhoneInput(this.id); inputLimiter(this.id,2)" onblur="inputLimiterBlur(this.id, 2)">   
            </div>
        </div>
        <div class="error-container">
            <span class="msg"></span>
        </div>
    </div>
    `;

    modalPositive.innerText = 'Apply';
    modalPositive.setAttribute("onclick", `applyEditSched(${schedID}, ${deptID}, "${day}")`);
    modalPositive.removeAttribute('data-bs-dismiss');
    modalLauncher();


    startVal = splitTime(start);

    document.querySelector('#startHourA').value = startVal[0];
    document.querySelector('#startHourB').value = startVal[1];
    document.querySelector('#startMinuteA').value = startVal[2];
    document.querySelector('#startMinuteB').value = startVal[3];
    document.querySelector('#startPeriod').value = startVal[4];


    startVal = splitTime(stop);

    document.querySelector('#stopHourA').value = startVal[0];
    document.querySelector('#stopHourB').value = startVal[1];
    document.querySelector('#stopMinuteA').value = startVal[2];
    document.querySelector('#stopMinuteB').value = startVal[3];
    document.querySelector('#stopPeriod').value = startVal[4];

    document.querySelector('#startPeriod').setAttribute('onclick', 'periodToggle(this.id, this.value)')
    document.querySelector('#stopPeriod').setAttribute('onclick', 'periodToggle(this.id, this.value)')
    
}

function periodToggle(id, val){
    if (val == "AM") document.getElementById(id).value = "PM";
    else document.getElementById(id).value = "AM";

}

function deleteSched(schedID, deptID, day){
    confirmModal("Deleting...", "Are you sure?", `applyDeleteSched("${schedID}", "${deptID}", "${day}")`)

}

function addSched(day){

    resetModal();

    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');
    let modalPositive = document.querySelector('.positive');
    let modalNegative = document.querySelector('.negative');
    let close = document.querySelector('.btn-close');
    let modalHeader = document.querySelector('.modal-header');
    let modalFooter = document.querySelector('.modal-footer');

    modalTitle.innerText = 'Creating...';
    modalBody.innerHTML = `
    <div class="editSched-container"> 
        <div class="time-container">
            <div class="editTime-container start">
                <input onclick="this.select()" type="text" class="timepart time-hourA" id="startHourA" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '01'); checkHourB('start')">
                <input onclick="this.select()" type="text" class="timepart time-hourB" id="startHourB" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '0123456789'); checkHourA('start');">
                <span>:</span>
                <input onclick="this.select()" type="text" class="timepart time-minA" id="startMinuteA" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '01345');">
                <input onclick="this.select()" type="text" class="timepart time-minB" id="startMinuteB" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '0123456789');">
                <input type="text" class="timepart time-minB" id="startPeriod" value="AM" readonly>
            </div>
            <span class="divider">-</span>
            <div class="editTime-container stop">
                <input onclick="this.select()" type="text" class="timepart time-hourA" id="stopHourA" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '01'); checkHourB('stop')">
                <input onclick="this.select()" type="text" class="timepart time-hourB" id="stopHourB" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '0123456789'); checkHourA('stop');">
                <span>:</span>
                <input onclick="this.select()"  type="text" class="timepart time-minA" id="stopMinuteA" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '01345');">
                <input onclick="this.select()" type="text" class="timepart time-minB" id="stopMinuteB" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '0123456789');">
                <input type="text" class="timepart time-minB" id="stopPeriod" value="AM" readonly>
            </div>
        </div>
        <div class="max-container alt">
            <div class="slot-wrapper">
                <label for="maxSlot">Slot: </label>
                <input type="text" placeholder="0" value="" id="maxSlot" oninput="filterPhoneInput(this.id); inputLimiter(this.id,2)" onblur="inputLimiterBlur(this.id, 2)">
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input add-sched" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                <label class="form-check-label" for="flexSwitchCheckDefault">Buffer</label>
            </div>
        </div>
        <div class="error-container">
            <span class="msg"></span>
        </div>
    </div>
    `;

    modalPositive.innerText = 'Create';
    modalPositive.setAttribute("onclick", `applyAddSched("${day}")`);
    modalPositive.removeAttribute('data-bs-dismiss');
    modalLauncher();


    document.querySelector('#startHourA').value = 0;
    document.querySelector('#startHourB').value = 0;
    document.querySelector('#startMinuteA').value = 0;
    document.querySelector('#startMinuteB').value = 0;
    document.querySelector('#startPeriod').value = 'AM';

    document.querySelector('#stopHourA').value = 0;
    document.querySelector('#stopHourB').value = 0;
    document.querySelector('#stopMinuteA').value = 0;
    document.querySelector('#stopMinuteB').value = 0;
    document.querySelector('#stopPeriod').value = 'AM'

    document.querySelector('#startPeriod').setAttribute('onclick', 'periodToggle(this.id, this.value)')
    document.querySelector('#stopPeriod').setAttribute('onclick', 'periodToggle(this.id, this.value)')
}

function applyEditSched(id, deptID, day){
    if(posting){
        return;
    }

    posting = true;

    let maxSlot = document.querySelector("#maxSlot").value;

    let startHourA = document.querySelector(`#startHourA`).value;
    let startHourB = document.querySelector(`#startHourB`).value;
    let startMinuteA = document.querySelector(`#startMinuteA`).value;
    let startMinuteB = document.querySelector(`#startMinuteB`).value;
    let startPeriod = document.querySelector(`#startPeriod`).value;

    let stopHourA = document.querySelector(`#stopHourA`).value;
    let stopHourB = document.querySelector(`#stopHourB`).value;
    let stopMinuteA = document.querySelector(`#stopMinuteA`).value;
    let stopMinuteB = document.querySelector(`#stopMinuteB`).value;
    let stopPeriod = document.querySelector(`#stopPeriod`).value;

    const startTime = convertToMilitaryTime(`${startHourA}${startHourB}:${startMinuteA}${startMinuteB} ${startPeriod}`);
    const stopTime = convertToMilitaryTime(`${stopHourA}${stopHourB}:${stopMinuteA}${stopMinuteB} ${stopPeriod}`);

    if(startHourA == "0" && startHourB == "0" && startMinuteA == "0" && startMinuteB == "0"){
        showError("Starting time cannot be empty");
        return;
    }
    else if(startHourA == "" && startHourB == "" && startMinuteA == "" && startMinuteB == ""){
        showError("Starting time cannot be empty");
        return;
    }
    else if(startHourA == "" || startHourB == "" || startMinuteA == "" || startMinuteB == ""){
        showError("Invalid starting time");
        return;
    }
    else if(startHourA == "0" && startHourB == "0"){
        showError("Invalid starting time");
        return;
    }
    else if(stopHourA == "0" && stopHourB == "0" && stopMinuteA == "0" && stopMinuteB == "0"){
        showError("Closing time cannot be empty");
        return;
    }
    else if(stopHourA == "" && stopHourB == "" && stopMinuteA == "" && stopMinuteB == ""){
        showError("Closing time cannot be empty");
        return;
    }
    else if(stopHourA == "" || stopHourB == "" || stopMinuteA == "" || stopMinuteB == ""){
        showError("Invalid closing time");
        return;
    }
    else if(stopHourA == "0" && stopHourB == "0"){
        showError("Invalid closing time");
        return;
    }
    else if(startTime >= stopTime){
        showError("Starting time cannot be later than closing time");
        return;
    }
    else if(maxSlot == '' || maxSlot == '0'){
        showError("Slot cannot be empty");
        return;
    }
    else{
        document.querySelector('.positive').setAttribute('data-bs-dismiss', 'modal');
        document.querySelector('.negative').click();
    }

    const xhr = new XMLHttpRequest();
    const dept = ['ENT', 'Hematology', 'Internal Medicine', 'Internal Medicine Clearance', 'Nephrology', 'Neurology', 'OB GYNE New', 'OB GYNE Old', 'OB GYNE ROS', 'Oncology', 'Pediatric Cardiology', 'Pediatric Clearance', 'Pediatric General', 'Psychiatry New', 'Psychiatry Old', 'Surgery', 'Surgery ROS'];
    
    if(day == 'mon') day = 'monday';
    else if(day == 'tue') day = 'tuesday';
    else if(day == 'wed') day = 'wednesday';
    else if(day == 'thu') day = 'thursday';
    else if(day == 'fri') day = 'friday';
    else if(day == 'sat') day = 'saturday';

    const obj = {
        schedID: id,
        department:dept[deptID-1],
        day: day,
        startTime: startTime,
        stopTime: stopTime,
        max: maxSlot,
    }

    const toSend = JSON.stringify(obj);

    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status){
                if(this.responseText == 1){
                    setTimeout(()=>{
                        showResModal("Slot has been updated");
                        generateDeptSched(document.querySelector('#deptSelect').value);
                        
                    }, 500)
                }
            }
        }
    }

    xhr.open('POST', './php/changeDeptSched.php', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(toSend);
    posting = false;
}

function applyDeleteSched(schedID, deptID, day){

    if(posting){
        return;
    }

    posting = true;

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                if(this.responseText == 1){
                    setTimeout(()=>{
                        showResModal("Slot has been deleted")
                        generateDeptSched(document.querySelector('#deptSelect').value);
                    }, 500)
                    
                }
            }
        }
    }

    const dept = ['ENT', 'Hematology', 'Internal Medicine', 'Internal Medicine Clearance', 'Nephrology', 'Neurology', 'OB GYNE New', 'OB GYNE Old', 'OB GYNE ROS', 'Oncology', 'Pediatric Cardiology', 'Pediatric Clearance', 'Pediatric General', 'Psychiatry New', 'Psychiatry Old', 'Surgery', 'Surgery ROS'];
    
    if(day == 'mon') day = 'monday';
    else if(day == 'tue') day = 'tuesday';
    else if(day == 'wed') day = 'wednesday';
    else if(day == 'thu') day = 'thursday';
    else if(day == 'fri') day = 'friday';
    else if(day == 'sat') day = 'saturday';

    deptID = dept[deptID-1];

    xhr.open("POST", "./php/deleteSched.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`id=${schedID}&dept=${deptID}&day=${day}`);
    posting = false;
}

function applyAddSched(day){
    if(posting){
        return;
    }

    posting = true;

    const deptVal = document.querySelector("#deptSelect").value;

    // Start
    const startHourA = document.querySelector(`#startHourA`).value;
    const startHourB = document.querySelector(`#startHourB`).value;
    const startMinuteA = document.querySelector(`#startMinuteA`).value;
    const startMinuteB = document.querySelector(`#startMinuteB`).value;
    const startPeriod = document.querySelector(`#startPeriod`).value;

    // Stop
    const stopHourA = document.querySelector(`#stopHourA`).value;
    const stopHourB = document.querySelector(`#stopHourB`).value;
    const stopMinuteA = document.querySelector(`#stopMinuteA`).value;
    const stopMinuteB = document.querySelector(`#stopMinuteB`).value;
    const stopPeriod = document.querySelector(`#stopPeriod`).value;

    const maxSlot = document.querySelector('#maxSlot').value;

    let isBuffer = document.querySelector('.add-sched').checked;

    if(isBuffer) isBuffer = 1;
    else isBuffer = 0;

    const startTime =  convertToMilitaryTime(`${startHourA}${startHourB}:${startMinuteA}${startMinuteB} ${startPeriod}`);
    const stopTime = convertToMilitaryTime(`${stopHourA}${stopHourB}:${stopMinuteA}${stopMinuteB} ${stopPeriod}`);

    if(startHourA == "0" && startHourB == "0" && startMinuteA == "0" && startMinuteB == "0"){
        showError("Starting time cannot be empty");
        posting = false;
        return;
    }
    else if(startHourA == "" && startHourB == "" && startMinuteA == "" && startMinuteB == ""){
        showError("Starting time cannot be empty");
        posting = false;
        return;
    }
    else if(startHourA == "" || startHourB == "" || startMinuteA == "" || startMinuteB == ""){
        showError("Invalid starting time");
        posting = false;
        return;
    }
    else if(startHourA == "0" && startHourB == "0"){
        showError("Invalid starting time");
        posting = false;
        return;
    }
    else if(stopHourA == "0" && stopHourB == "0" && stopMinuteA == "0" && stopMinuteB == "0"){
        showError("Closing time cannot be empty");
        posting = false;
        return;
    }
    else if(stopHourA == "" && stopHourB == "" && stopMinuteA == "" && stopMinuteB == ""){
        showError("Closing time cannot be empty");
        posting = false;
        return;
    }
    else if(stopHourA == "" || stopHourB == "" || stopMinuteA == "" || stopMinuteB == ""){
        showError("Invalid closing time");
        posting = false;
        return;
    }
    else if(stopHourA == "0" && stopHourB == "0"){
        showError("Invalid closing time");
        posting = false;
        return;
    }
    else if(startTime >= stopTime){
        showError("Starting time cannot be later than closing time");
        posting = false;
        return;
    }
    else if(maxSlot == '' || maxSlot == '0'){
        showError("Slot cannot be empty");
        posting = false;
        return;
    }
    else{
        document.querySelector('.positive').setAttribute('data-bs-dismiss', 'modal');
        document.querySelector('.negative').click();
    }

    const dept = ['ENT', 'Hematology', 'Internal Medicine', 'Internal Medicine Clearance', 'Nephrology', 'Neurology', 'OB GYNE New', 'OB GYNE Old', 'OB GYNE ROS', 'Oncology', 'Pediatric Cardiology', 'Pediatric Clearance', 'Pediatric General', 'Psychiatry New', 'Psychiatry Old', 'Surgery', 'Surgery ROS'];
    let dayName = "";

    if(day == 'mon') dayName = 'monday';
    else if(day == 'tue') dayName = 'tuesday';
    else if(day == 'wed') dayName = 'wednesday';
    else if(day == 'thu') dayName = 'thursday';
    else if(day == 'fri') dayName = 'friday';
    else if(day == 'sat') dayName = 'saturday';

    deptName = dept[deptVal-1];

    const obj = {
        deptID: deptVal,
        day: day,
        startTime: startTime,
        stopTime: stopTime,
        max: maxSlot,
        isBuffer: isBuffer,
        dayName: dayName,
        deptName: deptName,
    };

    const toSend = JSON.stringify(obj);

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                if(this.responseText == 1){
                    posting = false;
                    setTimeout(()=>{
                        showResModal("New slot has been added");
                        generateDeptSched(document.querySelector('#deptSelect').value);
                    }, 500)
                    
                }
            }
        }
    }

    xhr.open("POST","./php/postDeptSched.php", false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(toSend);
}

function splitTime(time){
    let rawTime = time.split(' ')[0];
    let period = time.split(' ')[1];

    if(rawTime[0] == '0'){
        rawTime = rawTime.substring(1);
    }

    let hourA = null;
    let hourB = null;

    if(rawTime.split(':')[0].length == 2){
        hourA = rawTime.split(':')[0][0];
        hourB = rawTime.split(':')[0][1];
    }
    else{
        hourA = 0;
        hourB = rawTime.split(':')[0];
    }

    let minuteA = rawTime.split(':')[1][0];
    let minuteB = rawTime.split(':')[1][1];

    return [parseInt(hourA), parseInt(hourB), parseInt(minuteA), parseInt(minuteB), period];
}

function convertToMilitaryTime(time){
    let rawTime = time.split(' ')[0];
    let period = time.split(' ')[1];

    let hour = parseInt(rawTime.split(':')[0]);
    let minute = rawTime.split(':')[1];

    if(period == 'PM'){
        if(hour != 12){
            hour += 12;
        }
    }
    else if(period == 'AM'){
        if(hour == 12){
            hour = 0;
        }
    }

    if(hour.toString().length == 1){
        hour = '0'+hour;
    }

    return `${hour}:${minute}`;
}

function generateSched(){
    // console.log("Patient Val: "+patient.department)
    // console.log("Select Val: "+document.querySelector('#dept').value)
    if(patient.department != document.querySelector('#dept').value){
        patient['department'] = document.querySelector('#dept').value;
        InitialSetup(true);
    }
}

function htmlDateConverter(str){
    str = str.split('-');
    tempYear = str[0];
    tempMonth = str[1];
    tempDate = str[2]
    
    return `${months[tempMonth-1]} ${tempDate}, ${tempYear}`;
}

function htmlDateUnconvert(str){
    try {
        str = str.replaceAll(',', '').split(' ');
        tempMonth = '';
    
        months.forEach((item, index)=>{
            if(item == str[0]){
                tempMonth = index+1;
                tempMonth = tempMonth.toString();
                if(tempMonth.length == 1) tempMonth = '0' + tempMonth;
            }
        });
    
        str[1] = str[1].toString();
        str[2] = str[2].toString();
        
        if(str[1].length == 1) str[1] = '0'+str[1];
        
        return str[2] + '-' + tempMonth + '-' + str[1];
    } catch (error) {
        
    }
}

function postAppointment(){
    if(posting){
        return;
    }

    posting = true;

    const xhr = new XMLHttpRequest();

    const toSend = JSON.stringify(patient);

    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                if(this.responseText == 1){
                    // SUCCESS
                    patient.department = null;
                    patient.scheduleDate = null;
                    patient.timeSlot = null;
                    patient.firstName = null;
                    patient.middleName = null;
                    patient.lastName = null;
                    patient.sex = null;
                    patient.dateOfBirth = null;
                    patient.phone = null;
                    patient.barangay = null;
                    patient.municipality = null;
                    patient.province = null;
                    patient.typeOfPatient = null;
                    patient.caseNo = null;
                    showResModal("Appointment is scheduled");
                    generateSchedule();
                }
                else if (this.responseText == 0){
                    formState = 0;
                    const formParts = document.querySelectorAll('.schedule__form');
                    formParts.forEach((form)=>{
                         form.style.display = 'none';
                    });
                    document.querySelector('.schedule__next').click();
                    InitialSetup(true);
                    showResModal("The selected appointment schedule is full. Choose another schedule.", false, 'Failed');
                }
                
            }
        }
    }

    xhr.open("POST", "./php/postAppointment.php", false);
    xhr.setRequestHeader("Content-Type", "applicaition/json");
    xhr.send(toSend);
    posting = false;
}

function limitNumbers(id, str){
    let input = document.getElementById(id);
    let newStr = "";

    for(i = 0; i < input.value.length; i++){
        for(j = 0; j < str.length; j++){
            if(input.value[i] == str[j]){
                newStr += input.value[i];
            }
        }
    }

    input.value = newStr;
}

function checkHourA(str){
    let hourA = document.querySelector(`#${str}HourA`);
    let hourB = document.querySelector(`#${str}HourB`);

    if(hourB.value == '3' || hourB.value == '4' || hourB.value == '5' || hourB.value == '6' || hourB.value == '7' || hourB.value == '8' || hourB.value == '9'){
        hourA.value = '0';
    }
}

function checkHourB(str){
    let hourA = document.querySelector(`#${str}HourA`);
    let hourB = document.querySelector(`#${str}HourB`);

    if(hourA.value == 1){
        if(hourB.value != '0' && hourB.value != '1' && hourB.value != '2'){
            hourB.value = '0';
        }
    }

}

function exportTableToExcel(table, fileName, excludeColumns = []) {
    var workbook = new ExcelJS.Workbook();
    var worksheet = workbook.addWorksheet('Sheet 1', { properties: { defaultColWidth: 20 } });

    Array.from(table.rows).forEach(function(row) {
        var excelRow = worksheet.addRow([]);
        Array.from(row.cells).forEach(function(cell, index) {
            if (!excludeColumns.includes(index)) {
                var cellValue = cell.textContent.trim();
                var cell = excelRow.getCell(index + 1);
                cell.value = cellValue;
                cell.alignment = { wrapText: true, horizontal: 'left', vertical: 'middle' };
            }
        });
    });

    // Apply background color to header cells
    var headerRow = worksheet.getRow(1); // Assuming the first row is the header row
    headerRow.eachCell(function(cell) {
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '504e4e' } // rgb(67, 67, 67)
        };
        cell.font = { color: { argb: 'FFFFFF' } }; // White text color
    });

    workbook.xlsx.writeBuffer().then(function(buffer) {
        var blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    });
}

function isInFuture(date){
    let present = new Date();
    let input = new Date(date);

    if(present < input){
        return true;
    }
    else{
        return false;
    }
}

function setupTablePagination(tableId, prevButtonId, nextButtonId, rowsPerPage) {
    const table = document.getElementById(tableId);
    let prevButton = document.getElementById(prevButtonId);
    let nextButton = document.getElementById(nextButtonId);
    let currentPage = 1;
    let pageNum = document.querySelector("#pageNum");
    pageNum.innerHTML = currentPage;
    const tableRows = table.querySelectorAll('.table-row');
    const totalPages = Math.ceil(tableRows.length / rowsPerPage);
    

    function showRows(page) {
        const startIndex = (page - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;

        tableRows.forEach((row, index) => {
            if (index >= startIndex && index < endIndex) {
                row.style.display = 'table-row';
            } else {
                row.style.display = 'none';
            }
        });
    }

    function nextTable(){
        if (currentPage < totalPages) {
            currentPage++;
            pageNum.innerText = currentPage;
            showRows(currentPage);
        }
        else{
            pageNum.classList.add('error-animate');
            pageNum.style.color = 'red';
            setTimeout(()=>{
                pageNum.classList.remove('error-animate');
                pageNum.style.color = 'rgb(80, 78, 78)';
            },500)
        }
    }

    function prevTable(){
        if (currentPage > 1) {
            currentPage--;
            pageNum.innerText = currentPage;
            showRows(currentPage);
        }
        else{
            pageNum.classList.add('error-animate');
            pageNum.style.color = 'red';
            setTimeout(()=>{
                pageNum.classList.remove('error-animate');
                pageNum.style.color = 'rgb(80, 78, 78)';
            },500)
        }
    }

    
    if(totalPages <= 1){
        
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
        pageNum.style.display = 'none';
    }else{
        prevButton.style.display = 'unset';
        nextButton.style.display = 'unset';
        pageNum.style.display = 'flex';
    }
   
    showRows(currentPage);

    nextButton = removeAllEventListeners(nextButton);
    prevButton = removeAllEventListeners(prevButton);

    nextButton.addEventListener('click', nextTable);
    prevButton.addEventListener('click', prevTable);
    
}

function removeAllEventListeners(element) {
    const clone = element.cloneNode(true);
    element.parentNode.replaceChild(clone, element);
    return clone;
  }

function insertReq(){
    let table = document.querySelector('.request-table tbody');
    let xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                try {
                    table.innerHTML = "";
                    const arrOfObj = JSON.parse(this.responseText);
                    arrOfObj.forEach(item=>{
                        const dept = ['ENT', 'Hematology', 'Internal Medicine', 'Internal Medicine Clearance', 'Nephrology', 'Neurology', 'OB GYNE New', 'OB GYNE Old', 'OB GYNE ROS', 'Oncology', 'Pediatric Cardiology', 'Pediatric Clearance', 'Pediatric General', 'Psychiatry New', 'Psychiatry Old', 'Surgery', 'Surgery ROS'];
    
                        let deptName = dept[item.deptID-1];
                        let template = 
                        `
                        <tr class="table-row">
                            <td>
                                <button data-appID="${item.appID}" data-deptID="${item.deptID}" onclick="viewRequestApprove(this.dataset.appid, this.dataset.deptid)"><span class="material-icons-outlined">done</span></button>
                            </td>
                            <td>
                                <button data-appID="${item.appID}" data-deptID="${item.deptID}" onclick="viewRequestReject(this.dataset.appid)"><span class="material-icons-outlined">close</span></button>
                            </td>
                            <td class="always-visible">${capitalFirstLetter(item.lastName)}, ${capitalFirstLetter(item.firstName)} ${capitalFirstLetter(item.middleName)}</td>
                            <td>${deptName}</td>
                            <td>${item.phone}</td>
                            <td><a href="${item.imgLink}" target="_blank" class="viewBtn">View Image</a></td>
                        </tr>
                        `;
                        
                        table.innerHTML += template;
                    });
                    showTableCell();
                } catch (error) {
                    table.innerHTML = 
                    `
                    <tr>
                        <td colspan="6" class="empty">No Pending Follow-Up Request</td>
                    </tr>
                    `;
                }
            }
        }
        else{
            table.innerHTML = 
            `
            <tr>
                <td colspan="6" class="empty">Loading...</td>
            </tr>
            `;
        }
        setupTablePagination('request-table', 'prevButton', 'nextButton', 10);
    };

    xhr.open("POST", "./php/getReq.php", false);
    xhr.send();
}

function insertAppBtn(query){
    let dept = document.querySelector("#deptSelect").value;
    let table = document.querySelector('.schedule-table tbody');
    let quickBtns = document.querySelectorAll('.view-schedule__btn');
    let xhr = new XMLHttpRequest();
    
    quickBtns.forEach(btn=>{
        btn.classList.remove('view-disabled');
        btn.removeAttribute("disabled");
    })
    
    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                try {
                    table.innerHTML = "";
                    const arrOfObj = JSON.parse(this.responseText);

                    arrOfObj.forEach(item=>{
                        const dept = ['ENT', 'Hematology', 'Internal Medicine', 'Internal Medicine Clearance', 'Nephrology', 'Neurology', 'OB GYNE New', 'OB GYNE Old', 'OB GYNE ROS', 'Oncology', 'Pediatric Cardiology', 'Pediatric Clearance', 'Pediatric General', 'Psychiatry New', 'Psychiatry Old', 'Surgery', 'Surgery ROS'];
                        let deptName = dept[item.departmentID-1];
                        let sex = item.sex == 'm' ? 'Male' : 'Female';
                        let time = "";
                        if(item.startTime != "" && item.stopTime != "") time = `${item.startTime} - ${item.stopTime}`;
                        if (item.cancelReason == null) item.cancelReason = "";

                        let template = 
                        `
                        <tr class="table-row">
                            <td>${item.appointmentID}</td>
                            <td class="always-visible">${capitalFirstLetter(item.lastName)}, ${capitalFirstLetter(item.firstName)} ${capitalFirstLetter(item.middleName)}</td>
                            <td>${deptName}</td>
                            <td>${item.appointmentDate}</td>
                            <td>${time}</td>
                            <td class="${item.appointmentStatus}" id="status_${item.appointmentID}">${capitalFirstLetter(item.appointmentStatus)}</td>
                            <td>${capitalFirstLetter(item.appointmentType)}</td>
                            <td>${sex}</td>
                            <td>${item.birthdate}</td>
                            <td>${item.phone}</td>
                            <td>${capitalFirstLetter(item.barangay)}, ${capitalFirstLetter(item.municipality)}, ${capitalFirstLetter(item.province)}</td>
                            <td>${capitalFirstLetter(item.patientType)}</td>
                            <td>${item.caseNo}</td>
                            <td>${item.dateSubmitted}</td>
                            <td>${item.cancelReason}</td>
                            <td><button class="editBtn ${item.appointmentStatus != 'active' ? 'edit-disabled' : ''}" ${item.appointmentStatus != 'active' ? 'disabled="disabled"' : ""} data-appid="${item.appointmentID}" data-status="${item.appointmentStatus}" onclick="editStatus(this.dataset.appid, this.dataset.status)" >Edit</button></td>
                        </tr>
                        `;
                        
                        table.innerHTML += template;
                    });
                    showTableCell();
                } catch (error) {
                    if(query == 'today'){
                        table.innerHTML = 
                        `
                        <tr>
                            <td colspan="16" class="empty">No Appointments Today</td>
                        </tr>
                        `;
                    }
                    else if(query == 'completed'){
                        table.innerHTML = 
                        `
                        <tr>
                            <td colspan="16" class="empty">No Recent Completed Appointments</td>
                        </tr>
                        `;
                    }
                    else if(query == 'cancelled'){
                        table.innerHTML = 
                        `
                        <tr>
                        <td colspan="16" class="empty">No Recent Cancelled Appointments</td>
                        </tr>
                        `;
                    }

                }
            }
        }
        else{
            table.innerHTML = 
            `
            <tr>
                <td colspan="16" class="empty">Loading...</td>
            </tr>
            `;
        }
        setupTablePagination('schedule-table', 'prevButton', 'nextButton', 10);
    };

    xhr.open("POST", "./php/getApp.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`deptID=${dept}&query=${query}`);

}

function editStatus(ID, status){
    resetModal();

    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');
    let modalPositive = document.querySelector('.positive');
    let modalNegative = document.querySelector('.negative');
    let close = document.querySelector('.btn-close');
    let modalHeader = document.querySelector('.modal-header');
    let modalFooter = document.querySelector('.modal-footer');

    modalTitle.innerText = "Changing Status..."
    modalBody.innerHTML = `
        <select class="form-select" aria-label="Default select example" id="newStatus">
            <option value="" selected hidden disabled>Select Status</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
        </select>
        <div class="change-warning">This cannot be undone.</div>
        <div class="error-container">
            <span class="msg"></span>
        </div>
    `;

    modalNegative.innerText = "Cancel";
    modalPositive.innerText = "Apply";
    modalPositive.setAttribute("onclick", `applyEditStatus("${ID}", "${status}")`)
    modalPositive.removeAttribute("data-bs-dismiss");

    modalLauncher();
}

function applyEditStatus(ID, status){
    if(posting) return;
    posting = true;

    let newStatus = document.querySelector("#newStatus").value;

    if(newStatus == ""){
        showError("Select a new status");
        posting = false;
        return;
    }
    else{
        document.querySelector('.positive').setAttribute("data-bs-dismiss", "modal");
        document.querySelector('.positive').click();
    }

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                if(this.responseText == 1){
                    showResModal("Status has been changed");
                    document.querySelector(`#status_${ID}`).classList.remove(status);
                    document.querySelector(`#status_${ID}`).innerText = capitalFirstLetter(newStatus);
                    document.querySelector(`#status_${ID}`).classList.add(newStatus);
                    document.querySelector('button[data-appid="'+ ID +'"]').setAttribute('disabled', 'disabled');
                    document.querySelector('button[data-appid="'+ ID +'"]').classList.add('view-disabled');
                    showResModal("Status has been changed")
                }
                else{
                    showResModal("Something went wrong...", false, "Failed");
                }
                
            }
        }
    }

    xhr.open("POST", "./php/changeStatus.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`id=${ID}&newStatus=${newStatus}`);
    posting = false;

}

function generateSlots(){
    let dept = document.querySelector('#dept').value;

    let month = document.querySelector('#appMonth').value;
    let day = document.querySelector('#appDay').value;
    let year = document.querySelector('#appYear').value;

    let date = `${year}-${month}-${day}`;
    let dayOfWeek = null;

    const timeSlot = document.querySelector('#timeSlot');

    if(dept != "" && isDateValid(date) && year.length == 4){

        let tempDate = new Date(date);

        const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        dayOfWeek =  daysOfWeek[tempDate.getDay()];

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(this.readyState == 4){
                if(this.status == 200){
                    try {
                        let arrOfObj = JSON.parse(this.responseText);
                        timeSlot.innerHTML = "";
                        timeSlot.innerHTML += `<option value="" selected hidden disabled>Time Slot</option>`;

                        if(arrOfObj.length != 0){
                            timeSlot.removeAttribute("disabled");
                        }else{
                            let template = `
                            <option value="">No Time Slot</option>
                            `;

                            timeSlot.innerHTML += template;
                        }
                        

                        arrOfObj.forEach(item => {
                            let template = `
                            <option value="${item.scheduleID}">${item.startTime} - ${item.stopTime}</option>
                            `;

                            timeSlot.innerHTML += template;
                        })
                    } catch (error) {
                    }
                }
            }
        }
        

        xhr.open("POST", "./php/getTimeSlotApp.php", false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.send(`dept=${dept}&day=${dayOfWeek}`);
    }
    else{
        timeSlot.innerHTML = "";
        timeSlot.innerHTML += `<option value="" selected hidden disabled>Time Slot</option>`;
        timeSlot.setAttribute("disabled", "disabled");
    }


}

function searchAppointment(){
    let input = document.querySelector("#appointmentSearch").value.trim();
    let table = document.querySelector('.schedule-table tbody');

    if(input != ""){
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function(){
            if(this.readyState == 4){
                if(this.status == 200){
                    try {
                        table.innerHTML = "";
                        const arrOfObj = JSON.parse(this.responseText);
    
                        arrOfObj.forEach(item=>{
                            const dept = ['ENT', 'Hematology', 'Internal Medicine', 'Internal Medicine Clearance', 'Nephrology', 'Neurology', 'OB GYNE New', 'OB GYNE Old', 'OB GYNE ROS', 'Oncology', 'Pediatric Cardiology', 'Pediatric Clearance', 'Pediatric General', 'Psychiatry New', 'Psychiatry Old', 'Surgery', 'Surgery ROS'];
                            let deptName = dept[item.departmentID-1];
                            let sex = item.sex == 'm' ? 'Male' : 'Female';
                            let time = "";
                            if(item.startTime != "" && item.stopTime != "") time = `${item.startTime} - ${item.stopTime}`;
                            if (item.cancelReason == null) item.cancelReason = "";
    
                            let template = 
                            `
                            <tr class="table-row">
                                <td>${item.appointmentID}</td>
                                <td class="always-visible">${capitalFirstLetter(item.lastName)}, ${capitalFirstLetter(item.firstName)} ${capitalFirstLetter(item.middleName)}</td>
                                <td>${deptName}</td>
                                <td>${item.appointmentDate}</td>
                                <td>${time}</td>
                                <td class="${item.appointmentStatus}" id="status_${item.appointmentID}">${capitalFirstLetter(item.appointmentStatus)}</td>
                                <td>${capitalFirstLetter(item.appointmentType)}</td>
                                <td>${sex}</td>
                                <td>${item.birthdate}</td>
                                <td>${item.phone}</td>
                                <td>${capitalFirstLetter(item.barangay)}, ${capitalFirstLetter(item.municipality)}, ${capitalFirstLetter(item.province)}</td>
                                <td>${capitalFirstLetter(item.patientType)}</td>
                                <td>${item.caseNo}</td>
                                <td>${item.dateSubmitted}</td>
                                <td>${item.cancelReason}</td>
                                <td><button class="editBtn ${item.appointmentStatus != 'active' ? 'edit-disabled' : ''}" ${item.appointmentStatus != 'active' ? 'disabled="disabled"' : ""} data-appid="${item.appointmentID}" data-status="${item.appointmentStatus}" onclick="editStatus(this.dataset.appid, this.dataset.status)" >Edit</button></td>
                            </tr>
                            `;
                            
                            table.innerHTML += template;
                        });
                        showTableCell();
                    } catch (error) {
                        table.innerHTML = 
                        `
                        <tr>
                            <td colspan="16" class="empty">No Result</td>
                        </tr>
                        `;
                        
                    }
                }
            }
            else{
                table.innerHTML = 
                `
                <tr>
                    <td colspan="16" class="empty">Loading...</td>
                </tr>
                `;
            }
            setupTablePagination('schedule-table', 'prevButton', 'nextButton', 10);
        };

        xhr.open("POST", "./php/searchApp.php", false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("search=" + input);
    }
}

function filterAppointment(){
    let dept = document.querySelector('#dept').value;

    let month = document.querySelector('#appMonth').value;
    let year = document.querySelector('#appYear').value;
    let day = document.querySelector('#appDay').value;
    let date = `${year}-${month}-${day}`;

    let timeSlotID = document.querySelector('#timeSlot').value;

    let sex = document.querySelector('#sex').value;
    
    let barangay = document.querySelector('#barangay').value;
    let municipality = document.querySelector('#municipality').value;
    let province = document.querySelector('#province').value;

    let patientType = document.querySelector('#patientType').value;

    let status = document.querySelector('#status').value;

    let sortBy = document.querySelector('#sortBy').value;

    if(month != "" || day != "" || year != ""){
        if(month == "" || day == "" || year == ""){
            showError("Date is incomplete");
            return;
        }
        else if(!isDateValid(date)){
            showError("Invalid Date")
            return;
        }
        else if(year.length != 4){
            showError("Invalid Date")
            return;
        }
    }
    else{
        date = "";
    }
    showError("");

    let obj = {
        dept: dept,
        appointmentDate: date,
        scheduleID: timeSlotID,
        sex: sex,
        barangay: barangay,
        municipality: municipality,
        province: province,
        patientType: patientType,
        status: status,
        sortBy: sortBy,
    }

    let toSend = JSON.stringify(obj);
    let table = document.querySelector('.schedule-table tbody');

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                try {
                    table.innerHTML = "";
                    const arrOfObj = JSON.parse(this.responseText);

                    arrOfObj.forEach(item=>{
                        const dept = ['ENT', 'Hematology', 'Internal Medicine', 'Internal Medicine Clearance', 'Nephrology', 'Neurology', 'OB GYNE New', 'OB GYNE Old', 'OB GYNE ROS', 'Oncology', 'Pediatric Cardiology', 'Pediatric Clearance', 'Pediatric General', 'Psychiatry New', 'Psychiatry Old', 'Surgery', 'Surgery ROS'];
                        let deptName = dept[item.departmentID-1];
                        let sex = item.sex == 'm' ? 'Male' : 'Female';
                        let time = "";
                        if(item.startTime != "" && item.stopTime != "") time = `${item.startTime} - ${item.stopTime}`;
                        if (item.cancelReason == null) item.cancelReason = "";

                        let template = 
                        `
                        <tr class="table-row">
                            <td>${item.appointmentID}</td>
                            <td class="always-visible">${capitalFirstLetter(item.lastName)}, ${capitalFirstLetter(item.firstName)} ${capitalFirstLetter(item.middleName)}</td>
                            <td>${deptName}</td>
                            <td>${item.appointmentDate}</td>
                            <td>${time}</td>
                            <td class="${item.appointmentStatus}" id="status_${item.appointmentID}">${capitalFirstLetter(item.appointmentStatus)}</td>
                            <td>${capitalFirstLetter(item.appointmentType)}</td>
                            <td>${sex}</td>
                            <td>${item.birthdate}</td>
                            <td>${item.phone}</td>
                            <td>${capitalFirstLetter(item.barangay)}, ${capitalFirstLetter(item.municipality)}, ${capitalFirstLetter(item.province)}</td>
                            <td>${capitalFirstLetter(item.patientType)}</td>
                            <td>${item.caseNo}</td>
                            <td>${item.dateSubmitted}</td>
                            <td>${item.cancelReason}</td>
                            <td><button class="editBtn ${item.appointmentStatus != 'active' ? 'edit-disabled' : ''}" ${item.appointmentStatus != 'active' ? 'disabled="disabled"' : ""} data-appid="${item.appointmentID}" data-status="${item.appointmentStatus}" onclick="editStatus(this.dataset.appid, this.dataset.status)" >Edit</button></td>
                        </tr>
                        `;
                        
                        table.innerHTML += template;
                    });
                    showTableCell();
                } catch (error) {
                    table.innerHTML = 
                    `
                    <tr>
                        <td colspan="16" class="empty">No Result</td>
                    </tr>
                    `;
                    
                }
            }
        }
        else{
            table.innerHTML = 
            `
            <tr>
                <td colspan="15" class="empty">Loading Table...</td>
            </tr>
            `;
        }
        setupTablePagination('schedule-table', 'prevButton', 'nextButton', 10);
    }

    xhr.open("POST", "./php/filterApp.php", false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(toSend);
}

function generateDeptStats(days){
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                try {
                    let arrOfObj = JSON.parse(this.responseText);
                    let deptBars = document.querySelectorAll('.dept');
                    let highest = 0;

                arrOfObj.forEach(item=>{
                    if(parseInt(item.count)> highest){
                        highest = item.count;
                    }
                })

                deptBars.forEach((item, index) =>{
                    let dept = index+1;
                    let count = null;

                    arrOfObj.forEach(item=>{
                        if(item.deptID == dept){
                            count = item.count;
                        }
                    })

                    if(count == null){
                        count = 0;
                    }
                    item.innerHTML = `${item.dataset.dept} (${count})`;
                    item.style.width = `${(count/highest)*95}%`;
                })
                } catch (error) {
                    
                }
            }
        }
    }

    xhr.open("POST", "./php/getDeptStats.php", true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("days=" + days);
}

function insertQuickStats(){
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                try {
                    let arrOfObj = JSON.parse(this.responseText);
                    let stats = document.querySelectorAll('.dashboard__block span');
                    
                    arrOfObj.forEach((item, index)=>{
                        stats[index].innerHTML = item.num;
                    });

                } catch (error) {
                    
                }
            }
        }
    };

    xhr.open("POST", "./php/getQuickStats.php", true);
    xhr.send();
}

function selectDeptStat(dept){
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                try {
                    let arr = JSON.parse(this.responseText);
                    let stats = document.querySelectorAll('.data span');

                    stats.forEach((item, index)=>{
                        let stat = arr[index].toFixed(2);

                        item.innerText = stat + '%';
                    })

                } catch (error) {
                    
                }
            }
        }
    }

    xhr.open("POST", "./php/getPerDeptStats.php", true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('dept='+ dept);
}

function deleteData(code){
    confirmModal("Are you sure?", "Data will be permanently deleted.", `applyDeleteData(${code})`);
}

function applyDeleteData(code){
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                if(this.responseText == 1){
                    setTimeout(()=>{
                        showResModal("Data has been permanently deleted");
                    }, 500)
                }
                else{
                    setTimeout(()=>{
                        showResModal("Process Unsuccessful", false, "Failed");
                    }, 500)
                }
            }
        }
    };

    xhr.open("POST", "./php/deleteData.php", false);
    xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
    xhr.send('code=' + code);
}

function generateOTP(){
    let OTP = "";

    for(i = 0; i < 5; i++){
        OTP += getRandomInt();
    }

    return OTP;
}

function getRandomInt() {
    return Math.floor(Math.random() * 9).toString();
}

function loading(){
    document.body.classList.add("loading-cursor");
}

function removeLoading(){
    document.body.classList.remove("loading-cursor");
}