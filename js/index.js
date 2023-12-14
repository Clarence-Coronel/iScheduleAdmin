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
let schedEdited = false;
let blockSchedEdit = [];
let universalSort = null;
let universalSortStatus = null;

const schedTempCol = [
    [],
    [],
    [],
    [],
    [],
    [],
];

const toAddSlots = [];

const toDeleteSlots = [];

const toEditSlots = [
];


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
    'consultation': '',
    'isFollowUp': '',
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
    let perDept = document.querySelector('.dashboard__per-dept');
    let stats = document.querySelector('.dashboard__stats');
    
    if(window.innerWidth < window.innerHeight) {
        // mobile
        perDept.removeAttribute('data-aos');
        perDept.removeAttribute('data-aos-duration');

        stats.removeAttribute('data-aos');
        stats.removeAttribute('data-aos-duration');

    }
    else{
        // desktop

        try {
            perDept.removeAttribute('data-aos');
            perDept.removeAttribute('data-aos-duration');

            stats.removeAttribute('data-aos');
            stats.removeAttribute('data-aos-duration');
        } catch (error) {
            
        }
        

        perDept.setAttribute('data-aos', 'fade-left');
        perDept.setAttribute('data-aos-duration', '500');

        stats.setAttribute('data-aos', 'fade-left');
        stats.setAttribute('data-aos-duration', '500');
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

        xhr.open("POST", "./php/changeAdminType.php", true);
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
        formErrorMessage = 'Phone # must contain 11 digits.';
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
        formErrorMessage = 'Province cannot have more than 30 characters.';
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
        formErrorMessage = 'Municipality cannot have more than 30 characters.';
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
        formErrorMessage = 'Barangay cannot have more than 30 characters.';
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
    // 
    // CONSULTATION *****************************
    // 
    else if(code == '180'){
        formErrorMessage = 'Symptoms cannot be empty.';
    }
    else if(code == '181'){
        formErrorMessage = 'Symptoms cannot have more than 200 characters.';
    }
    else if(code == '182'){
        formErrorMessage = 'Symptoms cannot contain special characters.';
    }

    // 
    // ISFOLLOWUP *****************************
    // 
    else if(code == '190'){
        formErrorMessage = 'Visit type cannot be empty.';
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

                calendarNext.setAttribute("onclick", "nextMonthBtn()");
                calendarPrev.setAttribute("onclick", "prevMonthBtn()");
                // calendarNext.addEventListener('click', nextMonthBtn);
                // calendarPrev.addEventListener('click', prevMonthBtn);
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
        middleName = "";
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

    patient.caseNo = document.querySelector('#caseNo').value;

    // SYMPTOMS
    patient["consultation"] = document.querySelector('#consultation').value.trim();
    if(patient["consultation"] == ''){
        errorHandler('180', document.querySelector('#consultation').id);
        return false;
    }
    else if(patient["consultation"].length > 200){
        errorHandler('181', document.querySelector('#consultation').id);
        return false;
    }
    else if(!isLettersNumsOnly(patient["consultation"])){
        errorHandler('182', document.querySelector('#consultation').id);
        return false;
    }

    // SEX
    const sex = document.getElementsByName('sex');
    sex.forEach(radio =>{
        if(radio.checked){
            patient["sex"] = radio.value;
        }
    })

    if(patient.sex == "") {
        errorHandler('100');
        return false;
    }
    // PATIENT TYPE
    const type = document.getElementsByName('patientType');
    type.forEach(radio =>{
        if(radio.checked){
            patient.typeOfPatient = radio.value;
        }
    })

    if(patient.typeOfPatient == "") {
        errorHandler('150');
        return false;
    }

    // ISFOLLOWUP
    const isFollowUp = document.getElementsByName('isFollowUp');
    isFollowUp.forEach(radio =>{
        if(radio.checked){
            patient.isFollowUp = radio.value == "true";
        }
    })

    if(patient.isFollowUp.toString() == "") {
        errorHandler('190');
        return false;
    }
    
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
                if(patient['isFollowUp']) item.querySelector('.schedule__field-content').innerHTML = 'Follow-Up Visit';
                else item.querySelector('.schedule__field-content').innerHTML = 'Initial Visit';
                break;
            case 9:
                item.querySelector('.schedule__field-content').innerHTML = patient['caseNo'];
                break;
            case 10:
                item.querySelector('.schedule__field-content').innerHTML = patient['consultation'];
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

    removeAllChildNodes(body);

    nextCounter = 0;
    date = new Date();
    oldMonth = "";
    currentMonth = date.getMonth();
    year = date.getFullYear();

    let html = `
    <div class="form-part third calReq">                                
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
    <div class="error-container">
        <span class="msg"></span>
    </div>
    `;

    const dept = ['ENT', 'Hematology', 'Internal Medicine', 'Internal Medicine Clearance', 'Nephrology', 'Neurology', 'OB GYNE New', 'OB GYNE Old', 'OB GYNE ROS', 'Oncology', 'Pediatric Cardiology', 'Pediatric Clearance', 'Pediatric General', 'Psychiatry New', 'Psychiatry Old', 'Surgery', 'Surgery ROS'];


    title.innerHTML = `${dept[deptID-1]} Department`;
    positive.innerText = 'Schedule';
    negative.innerText = 'Cancel';
    body.innerHTML = html;

    positive.setAttribute("onclick", `applyApproveReq(${appID})`);
    positive.removeAttribute("data-bs-dismiss");
    document.querySelector(".modal-dialog").classList.add("modal-xl");

    modalLauncher();
    const calendarPrev = document.querySelector('#calendar__prev');
    const calendarNext = document.querySelector('#calendar__next');

    calendarNext.setAttribute("onclick", `nextMonthBtn(${deptID})`);
    calendarPrev.setAttribute("onclick", `prevMonthBtn(${deptID})`);

    monthContainer = document.querySelector('.calendar__month');
    InitialSetup(true, deptID);
}

function generateCalendarDOM(){

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
                                    let isBuffer = "";

                                    if(item.isBuffer == '1'){
                                        isBuffer = " Buffer";
                                    }
    
                                    if(item.openSlots <= 0){
                                        template = 
                                        `
                                        <option value="" disabled>${item.startTime} - ${item.stopTime}(Full)</option>
                                        `;
                                    }else{
                                        template = 
                                        `
                                        <option value="${item.schedID}_${item.max}">${item.startTime} - ${item.stopTime} (${item.openSlots} Slot/s${isBuffer})</option>
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

    let scheduleDate = convertCompToPropDate(document.querySelector("#scheduleDate").value);
    let timeSlot = document.querySelector("#timeSlot").value;

    posting = true;
    
    // let month = document.querySelector("#schedMonth").value;
    // let day = document.querySelector("#schedDay").value;
    // let year = document.querySelector("#schedYear").value;
    
    // let time = document.querySelector("#timeSelect").value.split("_")[0];
    // let max = document.querySelector("#timeSelect").value.split("_")[1];

    if(scheduleDate == ""){
        showError("Select a date");
        posting = false;
        return;
    }
    else if(timeSlot == ""){
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
                console.log(this.responseText)
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
    xhr.send(`appID=${appID}&schedDate=${scheduleDate}&schedID=${timeSlot}`);
    posting = false;
}

function viewRequestReject(appID){
    resetModal();
    
    let title = document.querySelector('.modal-title');
    let body = document.querySelector('.modal-body');
    let positive = document.querySelector('.positive');
    let negative = document.querySelector('.negative');

    title.innerText = 'Rejecting Appointment...';
    // body.innerHTML = `
    // <div class="note-container">
    //     <input type="text" name="note" id="note" placeholder="Reason for rejecting request">
    //     <div class="error-container">
    //         <span class="msg"></span>
    //     </div>
    // </div>`;


    body.innerHTML = `
    <div class="note-container">
        <textarea name="text" cols="30" rows="3" name="note" id="note" placeholder="Reason for rejecting request"></textarea>
        <div class="error-container">
            <span class="msg"></span>
        </div>
    </div>`;

    positive.innerText = 'Confirm';
    negative.innerText = 'Cancel';

    positive.removeAttribute("data-bs-dismiss");

    positive.setAttribute('onclick', `applyRequestReject(${appID})`);
    modalLauncher();
}

function applyRequestReject(appID){
    if (posting) return;
    posting = true;

    let note = document.querySelector('#note').value;

    if(note.length == 0){
        showError("Reason for rejecting request cannot be empty");
        posting = false;
        return;
    }
    else if(note.length > 60){
        showError("Reason for rejecting request cannot exceed 60 characters");
        posting = false;
        return;
    }
    else if(!isLettersNumsOnly(note)){
        showError("Reason for rejecting request cannot contain special characters");
        posting = false;
        return;
    }

    showError("");
    document.querySelector('.positive').setAttribute("data-bs-dismiss", "modal");
    document.querySelector('.positive').click();
    
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
    xhr.send(`appID=${appID}&note=${note}`);
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
            <td colspan="17" class="empty">Empty</td>
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
            <td colspan="17" class="empty">No Department Selected</td>
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

    xhr.open("POST", "./php/createNewAdmin.php", true);
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
    OTP = generateOTP();
    console.log("OTP: " + OTP);

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
    OTP = generateOTP();
    console.log("OTP: " + OTP);

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(this.status != 200){
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

        xhr.open("POST", "./php/changePhone.php", true);
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
    document.querySelector(".modal-dialog").classList.remove("modal-xl");

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

    // processing(".changeInfo__submit");
    if(posting) return;
    posting = true;

    const newPhone = properPhoneNum(document.querySelector('#newPhone').value.replaceAll(' ', '').trim());
    const pass = document.querySelector('#confirmation').value;

    if(newPhone == "" || pass == ""){
        showError("Please fill in both fields");
        posting = false;
        return;
    }
    else if(newPhone == signedInAdmin.phone){
        showError("New phone # must differ from the previous one");
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

        xhr.open("POST", "./php/testPassword.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(`password=${pass}`);
        posting = false;
    }
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

        xhr.open("POST", "./php/testPassword.php", true);
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

    xhr.open("POST", "./php/changePhone.php", true);
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

function showErrorModal(str = ""){
    let msg = document.querySelector('.msg-modal');

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
    else if(currentPass == confirmNewPass){
        showError("New password must differ from the previous one");
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

                    xhr2.open("POST", "./php/changePassword.php", true);
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

    xhr.open("POST", "./php/testPassword.php", true);
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
            Department Schedules
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
            posting = false;
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
                    posting = false;
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

        xhr.open("POST", "./php/postAnnouncement.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(jsonString);
    })
}

function getFeedback(){
    const table = document.querySelector('.feedback__table tbody');


    const xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                console.log(this.responseText)
                if(xhr.responseText != 0){
                    table.innerHTML = ""
                    let arrayOfObjects = JSON.parse(xhr.responseText);
                    arrayOfObjects.forEach(item=>{

                        let tr = document.createElement("tr");
                        tr.classList.add('table-row');
                        tr.setAttribute("title", "Click to highlight/see more.");

                        let td = document.createElement("td");
                        td.innerText = item.rate;
                        tr.appendChild(td);

                        td = document.createElement("td");
                        td.innerText = item.content;
                        tr.appendChild(td);

                        td = document.createElement("td");
                        td.classList.add("always-visible");
                        td.innerText = convertRetrievedDate(item.dateSubmitted);
                        tr.appendChild(td);

                        table.appendChild(tr);
                    
                    });
                    showTableCell();       
                }
                else{
                    let tr = document.createElement("tr");
                    let td = document.createElement("td");
                    td.setAttribute("colspan", "3");
                    td.classList.add("empty");
                    td.innerText = "There is currently no feedback";

                    tr.appendChild(td);
                    table.appendChild(tr);
                }
            }
        }
        else{
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            td.setAttribute("colspan", "3");
            td.classList.add("empty");
            td.innerText = "Loading...";

            tr.appendChild(td);
            table.appendChild(tr);
        }
        setupTablePagination('feedback-table', 'prevButton', 'nextButton', 10);
    }

    xhr.open("POST", "./php/getFeedback.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`sortBy=${universalSort}&sortStatus=${universalSortStatus}`);
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
                    document.querySelector('#mobile').value = "";
                }
                else{
                    alert("Something went wrong...");
                }
                
            }
        }
    }

    xhr.open("POST", "./php/changeVid.php", true);
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
                    document.querySelector('#desktop').value = "";
                }
                else{
                    alert("Something went wrong...");
                }
                
            }
        }
    }

    xhr.open("POST", "./php/changeVid.php", true);
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
                console.log(this.responseText)
                try {
                    table.innerHTML = "";
                    let arrayOfObjects = JSON.parse(xhr.responseText);
                    arrayOfObjects.forEach((item)=>{
                        let id = item.id;
                        let date = convertRetrievedDate(item.date);
                        let dateName = item.dateName;
                        let isYearly = null;

                        if(item.isYearly == 1){
                            isYearly = "Yes";
                        }
                        else{
                            isYearly = "No";
                        }

                        let tr = document.createElement("tr");
                        tr.classList.add("table-row");
                        tr.setAttribute("title", "Click to highlight/see more.");

                        let td = document.createElement("td");
                        td.innerText = date;
                        tr.appendChild(td);

                        td = document.createElement("td");
                        td.innerText = dateName;
                        tr.appendChild(td);

                        td = document.createElement("td");
                        td.innerText = isYearly;
                        tr.appendChild(td);

                        td = document.createElement("td");
                        btn = document.createElement("button");
                        btn.classList.add("removeBtn");
                        btn.setAttribute("id",`blockDate-${id}`);
                        btn.setAttribute("data-name",`${dateName}`);
                        btn.setAttribute("onclick", "confirmBlockDateRemove(this.id)");
                        btn.innerText = 'Delete';
                        btn.setAttribute("title", "Unblock date.")
                        td.appendChild(btn);
                        tr.appendChild(td);

                        table.appendChild(tr);
                    })
                    showTableCell();
                } catch (error) {

                    let tr = document.createElement("tr");
                    let td = document.createElement("td");
                    td.setAttribute("colspan", "4");
                    td.classList.add("empty");
                    td.innerText = "There is currently no blocked date";
                    tr.appendChild(td);

                    table.appendChild(tr);
                }
            }
        }
        else{
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            td.setAttribute("colspan", "4");
            td.classList.add("empty");
            td.innerText = "Loading...";
            tr.appendChild(td);

            table.appendChild(tr);
        }
        setupTablePagination('date-table', 'prevButton', 'nextButton', 10);
    }

    xhr.open("POST", "./php/getBlockDate.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`sortBy="${universalSort}"&sortStatus="${universalSortStatus}"`);
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

    xhr.open("POST", "./php/deleteBlockDate.php", true);
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

                        const newRow = document.createElement('tr');
                        newRow.classList.add('table-row');
                        newRow.setAttribute('title', 'Click to highlight/see more.');

                        const titleCell = document.createElement('td');
                        titleCell.innerHTML = title;
                        newRow.appendChild(titleCell);

                        const dateCell = document.createElement('td');
                        dateCell.textContent = `${datePosted} - ${timePosted}`;
                        newRow.appendChild(dateCell);

                        const authorCell = document.createElement('td');
                        authorCell.textContent = author;
                        newRow.appendChild(authorCell);

                        const buttonCell = document.createElement('td');
                        const deleteButton = document.createElement('button');
                        deleteButton.classList.add('removeBtn');
                        deleteButton.setAttribute('id', `ann-${id}`);
                        deleteButton.setAttribute('data-title', title);
                        deleteButton.setAttribute("title", "Remove posted announcement.");
                        deleteButton.addEventListener('click', function() {
                            confirmAnnRemove(this.id);
                        });
                        deleteButton.textContent = 'Delete';
                        buttonCell.appendChild(deleteButton);
                        newRow.appendChild(buttonCell);

                        table.appendChild(newRow);
                    })
                } catch (error) {
                    let tr = document.createElement("tr");
                    let td = document.createElement("td");
                    td.setAttribute("colspan", "5");
                    td.classList.add("empty");
                    td.innerText = 'There is currently no announcement';
                    
                    tr.appendChild(td);
                    table.appendChild(tr);
                }               
            }
        }
        else{
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            td.setAttribute("colspan", "5");
            td.classList.add("empty");
            td.innerText = 'Loading...';
            
            tr.appendChild(td);
            table.appendChild(tr);
        }
        showTableCell();
        setupTablePagination('ann-table', 'prevButton', 'nextButton', 10); 
    }


    xhr.open("POST", "./php/getAnnouncement.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`sortBy=${universalSort}&sortStatus=${universalSortStatus}`);
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

    xhr.open("POST", "./php/deletePostedAnn.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`id=${id}&${title}`);
}

function insertAdmin(){
    const table = document.querySelector(".admin-table tbody");
    
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                console.log(this.responseText)
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


                        let tr = document.createElement("tr");
                        tr.classList.add("table-row");
                        tr.setAttribute('title', "Click to highlight/see more.");

                        let td = document.createElement('td');
                        td.classList.add("always-visible");
                        td.innerText = `${capitalFirstLetter(lastName)}, ${capitalFirstLetter(firstName)} ${capitalFirstLetter(middleName)}`;
                        tr.appendChild(td);

                        td = document.createElement("td");
                        td.classList.add("always-visible");
                        td.innerText = username;
                        tr.appendChild(td);
   
                        td = document.createElement("td");
                        td.innerText = phone;
                        tr.appendChild(td);

                        td = document.createElement("td");
                        td.innerText = adminType;
                        tr.appendChild(td);

                        td = document.createElement("td");

                        btn = document.createElement("button");
                        btn.classList.add("editBtn");
                        btn.setAttribute("id", `${username}_${adminType}`);
                        btn.setAttribute("onclick", "editType(this.id)");
                        btn.innerText = 'Edit Type';
                        btn.setAttribute("title", "Change admin type.");

                        td.appendChild(btn);

                        btn = document.createElement("button");
                        btn.classList.add("removeBtn");
                        btn.setAttribute("id", `${username}`);
                        btn.setAttribute("onclick", "confirmAdminRemove(this.id)");
                        btn.innerText = 'Delete';
                        btn.setAttribute("title", "Remove admin.");

                        td.appendChild(btn);
                        
                        tr.appendChild(td);

                        table.appendChild(tr);
                    })
                    showTableCell();
                } catch (error) {
                    let tr = document.createElement("tr");
                    let td = document.createElement("td");
                    td.setAttribute("colspan", "5");
                    td.classList.add("empty");
                    td.innerText = "No admins to show"

                    tr.appendChild(td);

                    table.appendChild(tr);
                    
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

    xhr.open("POST", "./php/getAdmin.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`sortBy=${universalSort}&sortState=${universalSortStatus}`);
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
    
    xhr.open("POST", "./php/deleteAdmin.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("username="+username);
}

function insertAdminLogs(isInitial = true){

    const from =  document.querySelector('#from').value;
    const to =  document.querySelector('#to').value;
    const activity =  document.querySelector('#activity').value;
    const adminType =  document.querySelector('#adminType').value;
    const username =  document.querySelector('#username').value;

    let fromDate = new Date(from);
    let toDate = new Date(to);

    if(fromDate>toDate){
        showError('Invalid date range');
        return;
    }
    if(username.length != 0 && username.length > 90){
        showError("Username cannot exceed 90 characters");
        return;
    }

    showError();
    // if(from != "" || to != ""){
    //     if(from == "" || to == ""){
    //         showError("Invalid date range")
    //         return;
    //     }
    // }

    const obj = {
        'from': from,
        'to': to,
        'activity': activity,
        'adminType': adminType,
        'username': username,
        sortBy: universalSort,
        sortState: universalSortStatus,
    }

    const toSend = JSON.stringify(obj);


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
    
                            // const template = 
                            // `
                            // <tr class="table-row" title="Click to highlight/see more.">
                            //     <td class="always-visible">${username}</td>
                            //     <td class="always-visible">${activity}</td>
                            //     <td>${adminType}</td>
                            //     <td>${logDate} - ${logTime}</td>
                            // </tr>
                            // `;

                            // Create a new table row
                            const tableRow = document.createElement('tr');
                            tableRow.classList.add('table-row');
                            tableRow.setAttribute('title', 'Click to highlight/see more.');

                            // Create and append table cells
                            const cell1 = document.createElement('td');
                            cell1.classList.add('always-visible');
                            cell1.textContent = username;
                            tableRow.appendChild(cell1);

                            const cell2 = document.createElement('td');
                            cell2.classList.add('always-visible');
                            cell2.textContent = activity;
                            tableRow.appendChild(cell2);

                            const cell3 = document.createElement('td');
                            cell3.textContent = adminType;
                            tableRow.appendChild(cell3);

                            const cell4 = document.createElement('td');
                            cell4.textContent = `${logDate} - ${logTime}`;
                            tableRow.appendChild(cell4);
    
                            table.appendChild(tableRow);
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

    xhr.open("POST", "./php/getAdminLogs.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(toSend);
}

// function applyLogFilter(){
//     const month = document.querySelector('#logMonth').value;
//     const day = document.querySelector('#logDay').value;
//     const year = document.querySelector('#logYear').value;
//     const activity = document.querySelector('#logActivity').value;
//     const adminType = document.querySelector('#logAdminType').value;
//     const sortBy = document.querySelector('#logSortBy').value;
//     let fullDate = `${year}-${month}-${day}`;
//     const table = document.querySelector(".logs-table tbody");

//     if(month != "" || day != "" || year != ""){
//         if(month == "" || day == "" || year == ""){
//             showError("Date is incomplete");
//             return;
//         }
//         else if(!isDateValid(fullDate)){
//             showError("Invalid Date")
//             return;
//         }
//         else if(year.length != 4){
//             showError("Invalid Date")
//             return;
//         }
//     }
//     else{
//         fullDate = "";
//     }

//     showError("");

//     let obj = {
//         date: fullDate,
//         activity: activity,
//         adminType: adminType,
//         sortBy: sortBy
//     }

//     const toSend = JSON.stringify(obj);

//     const xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function(){
//         if(this.readyState == 4){
//             if(this.status == 200){
//                try {
                    
//                     let arrayOfObjects = JSON.parse(xhr.responseText);
//                     table.innerHTML = "";

//                     arrayOfObjects.forEach((item)=>{
//                         let username = item.username;
//                         let activity = item.activity;
//                         let adminType = item.adminType
//                         let logDate = item.logDate;
//                         let logTime = item.logTime;
                        
//                         if(adminType == 'admin i') adminType = "Admin I";
//                         else if(adminType == 'admin ii') adminType = "Admin II";
//                         else if(adminType == 'super admin') adminType = "Super Admin";

//                         const template = 
//                         `
//                         <tr class="table-row" title="Click to highlight/see more.">
//                             <td>${username}</td>
//                             <td>${activity}</td>
//                             <td>${adminType}</td>
//                             <td>${logDate}</td>
//                             <td>${logTime}</td>
//                         </tr>
//                         `;

//                         table.innerHTML += template;
//                     })

//                     showTableCell();
//                 } catch (error) {
//                     table.innerHTML = 
//                     `
//                     <tr>
//                         <td colspan="6" class="empty">No result</td>
//                     </tr>
//                     `;
//                 }
//             }
//         }
//         else{
//             table.innerHTML = 
//             `
//             <tr>
//                 <td colspan="5" class="empty">Loading Table...</td>
//             </tr>
//             `;
//         }
//         setupTablePagination('logs-table', 'prevButton', 'nextButton', 10);     
//     }

//     xhr.open("POST", "./php/filterAdminLog.php", true);
//     xhr.setRequestHeader("Content-Type", "application/json");
//     xhr.send(toSend);
// }

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

    // if(select == 2 || select == 3){
    //     if(document.querySelector('#statusMsg').value == "") {
    //         showError("Fill in message");
    //         return;
    //     }
    // }
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

    xhr.open("POST", "./php/changeWebsiteStatus.php", true);
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

    xhr.open("POST", "./php/getDepartmentSched.php", true);
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
                <input onclick="this.select()" type="text" class="timepart time-minA" id="startMinuteA" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '012345');">
                <input onclick="this.select()" type="text" class="timepart time-minB" id="startMinuteB" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '0123456789');">
                <input type="text" class="timepart time-minB" id="startPeriod" value="AM" readonly>
            </div>
            <span class="divider">-</span>
            <div class="editTime-container stop">
                <input onclick="this.select()" type="text" class="timepart time-hourA" id="stopHourA" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '01'); checkHourB('stop')">
                <input onclick="this.select()" type="text" class="timepart time-hourB" id="stopHourB" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '0123456789'); checkHourA('stop');">
                <span>:</span>
                <input onclick="this.select()" type="text" class="timepart time-minA" id="stopMinuteA" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '012345');">
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
    modalPositive.setAttribute("onclick", `applyEditSched(${schedID})`);
    modalPositive.removeAttribute('data-bs-dismiss');
    modalLauncher();

    startVal = splitTime(convertTo12HourFormat(start));

    document.querySelector('#startHourA').value = startVal[0];
    document.querySelector('#startHourB').value = startVal[1];
    document.querySelector('#startMinuteA').value = startVal[2];
    document.querySelector('#startMinuteB').value = startVal[3];
    document.querySelector('#startPeriod').value = startVal[4];


    stopVal = splitTime(convertTo12HourFormat(stop));

    document.querySelector('#stopHourA').value = stopVal[0];
    document.querySelector('#stopHourB').value = stopVal[1];
    document.querySelector('#stopMinuteA').value = stopVal[2];
    document.querySelector('#stopMinuteB').value = stopVal[3];
    document.querySelector('#stopPeriod').value = stopVal[4];

    document.querySelector('#startPeriod').setAttribute('onclick', 'periodToggle(this.id, this.value)')
    document.querySelector('#stopPeriod').setAttribute('onclick', 'periodToggle(this.id, this.value)')
    
}

function editSchedTemp(schedID){
    resetModal();

    let src = document.querySelector(`.block[data-sched_id="${schedID}"]`)

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
                <input onclick="this.select()" type="text" class="timepart time-minA" id="startMinuteA" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '012345');">
                <input onclick="this.select()" type="text" class="timepart time-minB" id="startMinuteB" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '0123456789');">
                <input type="text" class="timepart time-minB" id="startPeriod" value="AM" readonly>
            </div>
            <span class="divider">-</span>
            <div class="editTime-container stop">
                <input onclick="this.select()" type="text" class="timepart time-hourA" id="stopHourA" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '01'); checkHourB('stop')">
                <input onclick="this.select()" type="text" class="timepart time-hourB" id="stopHourB" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '0123456789'); checkHourA('stop');">
                <span>:</span>
                <input onclick="this.select()" type="text" class="timepart time-minA" id="stopMinuteA" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '012345');">
                <input onclick="this.select()" type="text" class="timepart time-minB" id="stopMinuteB" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '0123456789');">
                <input type="text" class="timepart time-minB" id="stopPeriod" value="AM" readonly>
            </div>
        </div>
        <div class="max-container alt">
            <div class="slot-wrapper">
                <label for="maxSlot">Slot: </label>
                <input type="text" placeholder="0" value="${src.dataset.ini_max}" id="maxSlot" oninput="filterPhoneInput(this.id); inputLimiter(this.id,2)" onblur="inputLimiterBlur(this.id, 2)">   
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input add-sched" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                <label class="form-check-label" for="flexSwitchCheckDefault">Buffer</label>
            </div>
        </div>
        <div class="error-container">
            <span class="msg-modal"></span>
        </div>
    </div>
    `;

    if(src.dataset.ini_buffer) document.querySelector(".form-check-input").checked = true;
    else document.querySelector(".form-check-label").checked = false;

    modalPositive.innerText = 'Apply';

    modalPositive.setAttribute("onclick", `applyEditSched(${schedID})`);
    modalPositive.removeAttribute('data-bs-dismiss');
    modalLauncher();

    startVal = splitTime(convertTo12HourFormat(src.dataset.ini_start));

    document.querySelector('#startHourA').value = startVal[0];
    document.querySelector('#startHourB').value = startVal[1];
    document.querySelector('#startMinuteA').value = startVal[2];
    document.querySelector('#startMinuteB').value = startVal[3];
    document.querySelector('#startPeriod').value = startVal[4];


    stopVal = splitTime(convertTo12HourFormat(src.dataset.ini_stop));

    document.querySelector('#stopHourA').value = stopVal[0];
    document.querySelector('#stopHourB').value = stopVal[1];
    document.querySelector('#stopMinuteA').value = stopVal[2];
    document.querySelector('#stopMinuteB').value = stopVal[3];
    document.querySelector('#stopPeriod').value = stopVal[4];

    document.querySelector('#startPeriod').setAttribute('onclick', 'periodToggle(this.id, this.value)')
    document.querySelector('#stopPeriod').setAttribute('onclick', 'periodToggle(this.id, this.value)')
    
}

function periodToggle(id, val){
    if (val == "AM") document.getElementById(id).value = "PM";
    else document.getElementById(id).value = "AM";

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
                <input onclick="this.select()" type="text" class="timepart time-minA" id="startMinuteA" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '012345');">
                <input onclick="this.select()" type="text" class="timepart time-minB" id="startMinuteB" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '0123456789');">
                <input type="text" class="timepart time-minB" id="startPeriod" value="AM" readonly>
            </div>
            <span class="divider">-</span>
            <div class="editTime-container stop">
                <input onclick="this.select()" type="text" class="timepart time-hourA" id="stopHourA" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '01'); checkHourB('stop')">
                <input onclick="this.select()" type="text" class="timepart time-hourB" id="stopHourB" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '0123456789'); checkHourA('stop');">
                <span>:</span>
                <input onclick="this.select()"  type="text" class="timepart time-minA" id="stopMinuteA" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '012345');">
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
            <span class="msg-modal"></span>
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

function addSchedTemp(day){
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
                <input onclick="this.select()" type="text" class="timepart time-minA" id="startMinuteA" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '012345');">
                <input onclick="this.select()" type="text" class="timepart time-minB" id="startMinuteB" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '0123456789');">
                <input type="text" class="timepart time-minB" id="startPeriod" value="AM" readonly>
            </div>
            <span class="divider">-</span>
            <div class="editTime-container stop">
                <input onclick="this.select()" type="text" class="timepart time-hourA" id="stopHourA" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '01'); checkHourB('stop')">
                <input onclick="this.select()" type="text" class="timepart time-hourB" id="stopHourB" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '0123456789'); checkHourA('stop');">
                <span>:</span>
                <input onclick="this.select()"  type="text" class="timepart time-minA" id="stopMinuteA" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '012345');">
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
            <span class="msg-modal"></span>
        </div>
    </div>
    `;

    modalPositive.innerText = 'Create';
    modalPositive.setAttribute("onclick", `addTempTimeSlot("${day}")`);
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

function addTempTimeSlot(day){

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
        showErrorModal("Starting time cannot be empty");
        return;
    }
    else if(startHourA == "" && startHourB == "" && startMinuteA == "" && startMinuteB == ""){
        showErrorModal("Starting time cannot be empty");
        return;
    }
    else if(startHourA == "" || startHourB == "" || startMinuteA == "" || startMinuteB == ""){
        showErrorModal("Invalid starting time");
        return;
    }
    else if(startHourA == "0" && startHourB == "0"){
        showErrorModal("Invalid starting time");
        return;
    }
    else if(stopHourA == "0" && stopHourB == "0" && stopMinuteA == "0" && stopMinuteB == "0"){
        showErrorModal("Closing time cannot be empty");
        return;
    }
    else if(stopHourA == "" && stopHourB == "" && stopMinuteA == "" && stopMinuteB == ""){
        showErrorModal("Closing time cannot be empty");
        return;
    }
    else if(stopHourA == "" || stopHourB == "" || stopMinuteA == "" || stopMinuteB == ""){
        showErrorModal("Invalid closing time");
        return;
    }
    else if(stopHourA == "0" && stopHourB == "0"){
        showErrorModal("Invalid closing time");
        return;
    }
    else if(startTime >= stopTime){
        showErrorModal("Starting time cannot be later than closing time");
        return;
    }
    else if(maxSlot == '' || maxSlot == '0'){
        showErrorModal("Slot cannot be empty");
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
        tempActive: true,
        tempIndex: toAddSlots.length,
    };

    toAddSlots.push(obj);

    insertTempTimeslot(obj);
}

function insertTempTimeslot(timeslot){
    let container = null;

    if(timeslot.day == 'mon') container = document.querySelector('#monday .timeslot-container');
    else if(timeslot.day == 'tue') container = document.querySelector('#tuesday .timeslot-container');
    else if(timeslot.day == 'wed') container = document.querySelector('#wednesday .timeslot-container');  
    else if(timeslot.day == 'thu') container = document.querySelector('#thursday .timeslot-container');  
    else if(timeslot.day == 'fri') container = document.querySelector('#friday .timeslot-container');  
    else if(timeslot.day == 'sat') container = document.querySelector('#saturday .timeslot-container');  

    let clss = null;
    if(timeslot.isBuffer) clss = 'buffer';
    else clss = '';

    let template = 
    `
    <div class="timeslot">
        <div class="time">${convertTo12HourFormat(timeslot.startTime)} - ${convertTo12HourFormat(timeslot.stopTime)}</div>
        <div class="max">${timeslot.max}</div>
    </div>
    <div class="button-container">
        <button onclick="editTempTimeslot('${timeslot.tempIndex}')" title="Edit time slot.">
            <span class="material-icons-outlined edit-sched-btn">
                edit
            </span>
        </button>
        <button onclick="dltTempTimeslot('${timeslot.tempIndex}')" title="Remove time slot.">
            <span class="material-icons-outlined remove-sched-btn">
                close
            </span>
        </button>
    </div>`;

    let blockEl = document.createElement('div');
    blockEl.classList.add('block');
    if(timeslot.isBuffer) blockEl.classList.add('buffer');
    blockEl.setAttribute("data-temp_index", `${timeslot.tempIndex}`);

    blockEl.innerHTML = template;

    container.insertBefore(blockEl, container.querySelector(".add"));
    
    rearrangeTimeslots(timeslot.day);
}

function rearrangeTimeslots(day){
    let parent = null;
    let children = [];
    let addBtn = null;

    if(day == 'mon') parent = document.querySelector('#monday .timeslot-container');
    else if(day == 'tue') parent = document.querySelector('#tuesday .timeslot-container');
    else if(day == 'wed') parent = document.querySelector('#wednesday .timeslot-container');  
    else if(day == 'thu') parent = document.querySelector('#thursday .timeslot-container');  
    else if(day == 'fri') parent = document.querySelector('#friday .timeslot-container');  
    else if(day == 'sat') parent = document.querySelector('#saturday .timeslot-container');  

    Array.from(parent.children).forEach(function(child) {
        if(child.classList.contains('add')){
            addBtn = child;
        }
        else{
            children.push(child);
        }
        
        // You can perform operations on each child element here
    });

    children.sort(function(a, b) {
        var value1A = new Date("2023-12-01 " + convertToMilitaryTime(a.querySelector(".time").innerText.split(' - ')[0])).getTime();
        var value1B = new Date("2023-12-01 " + convertToMilitaryTime(b.querySelector(".time").innerText.split(' - ')[0])).getTime();

  
        // If the first values are equal, compare using the second values
        if (value1A == value1B) {
          var value2A = new Date("2023-12-01 " + convertToMilitaryTime(a.querySelector(".time").innerText.split(' - ')[1])).getTime();
          var value2B = new Date("2023-12-01 " + convertToMilitaryTime(b.querySelector(".time").innerText.split(' - ')[1])).getTime();

          return value2A < value2B ? -1 : 1;
        }
  
        return value1A < value1B ? -1 : 1;
    });

    removeAllChildNodes(parent);

    children.forEach(child=>{
        parent.appendChild(child);
    })

    parent.appendChild(addBtn);
}

function editTempTimeslot(index){
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
                <input onclick="this.select()" type="text" class="timepart time-minA" id="startMinuteA" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '012345');">
                <input onclick="this.select()" type="text" class="timepart time-minB" id="startMinuteB" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '0123456789');">
                <input type="text" class="timepart time-minB" id="startPeriod" value="AM" readonly>
            </div>
            <span class="divider">-</span>
            <div class="editTime-container stop">
                <input onclick="this.select()" type="text" class="timepart time-hourA" id="stopHourA" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '01'); checkHourB('stop')">
                <input onclick="this.select()" type="text" class="timepart time-hourB" id="stopHourB" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '0123456789'); checkHourA('stop');">
                <span>:</span>
                <input onclick="this.select()" type="text" class="timepart time-minA" id="stopMinuteA" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '012345');">
                <input onclick="this.select()" type="text" class="timepart time-minB" id="stopMinuteB" oninput="inputLimiterBlur(this.id, 1); limitNumbers(this.id, '0123456789');">
                <input type="text" class="timepart time-minB" id="stopPeriod" value="AM" readonly>
            </div>
        </div>
        <div class="max-container alt">
            <div class="slot-wrapper">
                <label for="maxSlot">Slot: </label>
                <input type="text" placeholder="0" value="${toAddSlots[index].max}" id="maxSlot" oninput="filterPhoneInput(this.id); inputLimiter(this.id,2)" onblur="inputLimiterBlur(this.id, 2)">   
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input add-sched" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                <label class="form-check-label" for="flexSwitchCheckDefault">Buffer</label>
            </div>
        </div>
        <div class="error-container">
            <span class="msg-modal"></span>
        </div>
    </div>
    `;

    if(toAddSlots[index].isBuffer) document.querySelector(".form-check-input").checked = true;
    else document.querySelector(".form-check-label").checked = false;

    modalPositive.innerText = 'Apply';

    modalPositive.setAttribute("onclick", `editTempUITS(${index})`);
    modalPositive.removeAttribute('data-bs-dismiss');
    modalLauncher();

    startVal = splitTime(convertTo12HourFormat(toAddSlots[index].startTime));

    document.querySelector('#startHourA').value = startVal[0];
    document.querySelector('#startHourB').value = startVal[1];
    document.querySelector('#startMinuteA').value = startVal[2];
    document.querySelector('#startMinuteB').value = startVal[3];
    document.querySelector('#startPeriod').value = startVal[4];


    stopVal = splitTime(convertTo12HourFormat(toAddSlots[index].stopTime));

    document.querySelector('#stopHourA').value = stopVal[0];
    document.querySelector('#stopHourB').value = stopVal[1];
    document.querySelector('#stopMinuteA').value = stopVal[2];
    document.querySelector('#stopMinuteB').value = stopVal[3];
    document.querySelector('#stopPeriod').value = stopVal[4];

    document.querySelector('#startPeriod').setAttribute('onclick', 'periodToggle(this.id, this.value)')
    document.querySelector('#stopPeriod').setAttribute('onclick', 'periodToggle(this.id, this.value)')
}

function editTempUITS(index){

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

    let isBuffer = document.querySelector("#flexSwitchCheckDefault").checked;

    const startTime = convertToMilitaryTime(`${startHourA}${startHourB}:${startMinuteA}${startMinuteB} ${startPeriod}`);
    const stopTime = convertToMilitaryTime(`${stopHourA}${stopHourB}:${stopMinuteA}${stopMinuteB} ${stopPeriod}`);

    if(startHourA == "0" && startHourB == "0" && startMinuteA == "0" && startMinuteB == "0"){
        showErrorModal("Starting time cannot be empty");
        return;
    }
    else if(startHourA == "" && startHourB == "" && startMinuteA == "" && startMinuteB == ""){
        showErrorModal("Starting time cannot be empty");
        return;
    }
    else if(startHourA == "" || startHourB == "" || startMinuteA == "" || startMinuteB == ""){
        showErrorModal("Invalid starting time");
        return;
    }
    else if(startHourA == "0" && startHourB == "0"){
        showErrorModal("Invalid starting time");
        return;
    }
    else if(stopHourA == "0" && stopHourB == "0" && stopMinuteA == "0" && stopMinuteB == "0"){
        showErrorModal("Closing time cannot be empty");
        return;
    }
    else if(stopHourA == "" && stopHourB == "" && stopMinuteA == "" && stopMinuteB == ""){
        showErrorModal("Closing time cannot be empty");
        return;
    }
    else if(stopHourA == "" || stopHourB == "" || stopMinuteA == "" || stopMinuteB == ""){
        showErrorModal("Invalid closing time");
        return;
    }
    else if(stopHourA == "0" && stopHourB == "0"){
        showErrorModal("Invalid closing time");
        return;
    }
    else if(startTime >= stopTime){
        showErrorModal("Starting time cannot be later than closing time");
        return;
    }
    else if(maxSlot == '' || maxSlot == '0'){
        showErrorModal("Slot cannot be empty");
        return;
    }
    else{

        showErrorModal();
        document.querySelector('.positive').setAttribute('data-bs-dismiss', 'modal');
        document.querySelector('.negative').click();         

        // let temp = {
        //     schedID: schedID,
        //     startTime: startTime,
        //     stopTime: stopTime,
        //     max: maxSlot,
        //     isBuffer: isBuffer,
        // };

        // const obj = {
        //     deptID: deptVal,
        //     day: day,
        //     startTime: startTime,
        //     stopTime: stopTime,
        //     max: maxSlot,
        //     isBuffer: isBuffer,
        //     tempActive: true,
        //     tempIndex: toAddSlots.length,
        // };

        toAddSlots[index].startTime = startTime;
        toAddSlots[index].stopTime = stopTime;
        toAddSlots[index].max = maxSlot;
        toAddSlots[index].isBuffer = isBuffer;


        let toChange = document.querySelector(`.block[data-temp_index="${index}"]`);

        toChange.querySelector(".time").innerText = `${convertTo12HourFormat(startTime)} - ${convertTo12HourFormat(stopTime)}`;
        toChange.querySelector(".max").innerText = `${maxSlot}`;

        if(isBuffer){
            toChange.classList.add("buffer");
        }
        else{
            toChange.classList.remove("buffer");
        }
        
    }
}

function dltTempTimeslot(index){
    toAddSlots.forEach(timeslot=>{
        if(timeslot.tempIndex == index){
            timeslot.tempActive = false;
        }
    });

    document.querySelector(`.block[data-temp_index="${index}"]`).remove();
}

function applyEditSched(schedID){
    
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

    let isBuffer = document.querySelector("#flexSwitchCheckDefault").checked;

    const startTime = convertToMilitaryTime(`${startHourA}${startHourB}:${startMinuteA}${startMinuteB} ${startPeriod}`);
    const stopTime = convertToMilitaryTime(`${stopHourA}${stopHourB}:${stopMinuteA}${stopMinuteB} ${stopPeriod}`);

    if(startHourA == "0" && startHourB == "0" && startMinuteA == "0" && startMinuteB == "0"){
        showErrorModal("Starting time cannot be empty");
        posting = false;
        return;
    }
    else if(startHourA == "" && startHourB == "" && startMinuteA == "" && startMinuteB == ""){
        showErrorModal("Starting time cannot be empty");
        posting = false;
        return;
    }
    else if(startHourA == "" || startHourB == "" || startMinuteA == "" || startMinuteB == ""){
        showErrorModal("Invalid starting time");
        posting = false;
        return;
    }
    else if(startHourA == "0" && startHourB == "0"){
        showErrorModal("Invalid starting time");
        posting = false;
        return;
    }
    else if(stopHourA == "0" && stopHourB == "0" && stopMinuteA == "0" && stopMinuteB == "0"){
        showErrorModal("Closing time cannot be empty");
        posting = false;
        return;
    }
    else if(stopHourA == "" && stopHourB == "" && stopMinuteA == "" && stopMinuteB == ""){
        showErrorModal("Closing time cannot be empty");
        posting = false;
        return;
    }
    else if(stopHourA == "" || stopHourB == "" || stopMinuteA == "" || stopMinuteB == ""){
        showErrorModal("Invalid closing time");
        posting = false;
        return;
    }
    else if(stopHourA == "0" && stopHourB == "0"){
        showErrorModal("Invalid closing time");
        posting = false;
        return;
    }
    else if(startTime >= stopTime){
        showErrorModal("Starting time cannot be later than closing time");
        posting = false;
        return;
    }
    else if(maxSlot == '' || maxSlot == '0'){
        showErrorModal("Slot cannot be empty");
        posting = false;
        return;
    }
    else{

        showErrorModal();
        document.querySelector('.positive').setAttribute('data-bs-dismiss', 'modal');
        document.querySelector('.negative').click();
        schedEdited = true;
                

        posting = false;

        // let duplicate = null;

        for(i =0; i<toEditSlots.length; i++){
            if(toEditSlots[i].schedID == schedID){
                toEditSlots.splice(i, 1);
                break;
            }
        }

        let temp = {
            schedID: schedID,
            startTime: startTime,
            stopTime: stopTime,
            max: maxSlot,
            isBuffer: isBuffer,
        };

        toEditSlots.push(temp);
        
        let toChange = document.querySelector(`.block[data-sched_id="${schedID}"]`);
        
        toChange.removeAttribute('data-ini_max');
        toChange.removeAttribute('data-ini_start');
        toChange.removeAttribute('data-ini_stop');
        toChange.removeAttribute('data-ini_buffer');

        toChange.setAttribute('data-ini_max', temp.max);
        toChange.setAttribute('data-ini_start', convertTo12HourFormat(temp.startTime));
        toChange.setAttribute('data-ini_stop', convertTo12HourFormat(temp.stopTime));
        toChange.setAttribute('data-ini_buffer', temp.isBuffer);
        

        toChange.querySelector(".time").innerText = `${convertTo12HourFormat(temp.startTime)} - ${convertTo12HourFormat(temp.stopTime)}`;
        toChange.querySelector(".max").innerText = `${temp.max}`;

        if(temp.isBuffer){
            toChange.classList.add("buffer");
        }
        else{
            toChange.classList.remove("buffer");
        }
        
    }

    // const xhr = new XMLHttpRequest();
    // const dept = ['ENT', 'Hematology', 'Internal Medicine', 'Internal Medicine Clearance', 'Nephrology', 'Neurology', 'OB GYNE New', 'OB GYNE Old', 'OB GYNE ROS', 'Oncology', 'Pediatric Cardiology', 'Pediatric Clearance', 'Pediatric General', 'Psychiatry New', 'Psychiatry Old', 'Surgery', 'Surgery ROS'];
    
    // if(day == 'mon') day = 'monday';
    // else if(day == 'tue') day = 'tuesday';
    // else if(day == 'wed') day = 'wednesday';
    // else if(day == 'thu') day = 'thursday';
    // else if(day == 'fri') day = 'friday';
    // else if(day == 'sat') day = 'saturday';

    // const obj = {
    //     schedID: schedId,
    //     department:dept[deptID-1],
    //     day: day,
    //     startTime: startTime,
    //     stopTime: stopTime,
    //     max: maxSlot,
    // }

    // const toSend = JSON.stringify(obj);

    // xhr.onreadystatechange = function(){
    //     if(this.readyState == 4){
    //         if(this.status){
    //             if(this.responseText == 1){
    //                 setTimeout(()=>{
    //                     showResModal("Slot has been updated");
    //                     generateDeptSched(document.querySelector('#deptSelect').value);
                        
    //                 }, 500)
    //             }
    //         }
    //     }
    // }

    // xhr.open('POST', './php/changeDeptSched.php', true);
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.send(toSend);
    // posting = false;
}

function applyDeleteSched(schedID){

    if(document.querySelectorAll(".day .block").length == 7){
        showError("Schedule requires a minimum of at least one (1) time slot");
    }
    else{
        let block = document.querySelector(`.block[data-sched_id="${schedID}"]`);
        toDeleteSlots.push(schedID);
        block.remove();
    }
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
        showErrorModal("Starting time cannot be empty");
        posting = false;
        return;
    }
    else if(startHourA == "" && startHourB == "" && startMinuteA == "" && startMinuteB == ""){
        showErrorModal("Starting time cannot be empty");
        posting = false;
        return;
    }
    else if(startHourA == "" || startHourB == "" || startMinuteA == "" || startMinuteB == ""){
        showErrorModal("Invalid starting time");
        posting = false;
        return;
    }
    else if(startHourA == "0" && startHourB == "0"){
        showErrorModal("Invalid starting time");
        posting = false;
        return;
    }
    else if(stopHourA == "0" && stopHourB == "0" && stopMinuteA == "0" && stopMinuteB == "0"){
        showErrorModal("Closing time cannot be empty");
        posting = false;
        return;
    }
    else if(stopHourA == "" && stopHourB == "" && stopMinuteA == "" && stopMinuteB == ""){
        showErrorModal("Closing time cannot be empty");
        posting = false;
        return;
    }
    else if(stopHourA == "" || stopHourB == "" || stopMinuteA == "" || stopMinuteB == ""){
        showErrorModal("Invalid closing time");
        posting = false;
        return;
    }
    else if(stopHourA == "0" && stopHourB == "0"){
        showErrorModal("Invalid closing time");
        posting = false;
        return;
    }
    else if(startTime >= stopTime){
        showErrorModal("Starting time cannot be later than closing time");
        posting = false;
        return;
    }
    else if(maxSlot == '' || maxSlot == '0'){
        showErrorModal("Slot cannot be empty");
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
    };

    if(day == 'mon'){
        schedTempCol[0].push(obj);
    }
    else if(day == 'tue'){
        schedTempCol[1].push(obj);
    }
    else if(day == 'wed'){
        schedTempCol[2].push(obj);
    }   
    else if(day == 'thu'){
        schedTempCol[3].push(obj);
    }   
    else if(day == 'fri'){
        schedTempCol[4].push(obj);
    }   
    else if(day == 'sat'){
        schedTempCol[5].push(obj);
    }   

    sortSchedTempCol();


    posting = false;

    updateSchedTable()
}

function updateSchedTable(){
    clearSlots();
    schedTempCol.forEach((day,index)=>{
        day.forEach((sched,index2)=>{
            if(index == 0){
                let container = document.querySelector('#monday .timeslot-container');

                let clss = null;
                if(sched.isBuffer) clss = 'buffer';
                else clss = '';

                let template = 
                `
                <div class="block ${clss}">
                    <div class="timeslot">
                        <div class="time">${convertTo12HourFormat(sched.startTime)} - ${convertTo12HourFormat(sched.stopTime)}</div>
                        <div class="max">${sched.max}</div>
                    </div>
                    <div class="button-container">
                        <button class="newDelete" data-tempid="${index}-${index2}" title="Remove." data-sched_id="" data-dept="${sched.deptID}" data-day="${sched.day}" onclick="removeTempSlot(this.dataset.tempid)">
                            <span class="material-icons-outlined remove-sched-btn">
                                close
                            </span>
                        </button>
                    </div>
                </div>`;

                container.innerHTML+= template;
            }
            else if(index == 1){
                let container = document.querySelector('#tuesday .timeslot-container');

                let clss = null;
                if(sched.isBuffer) clss = 'buffer';
                else clss = '';

                console.log(sched.startTime);
                console.log(sched.stopTime);

                let template = 
                `
                <div class="block ${clss}">
                    <div class="timeslot">
                        <div class="time">${convertTo12HourFormat(sched.startTime)} - ${convertTo12HourFormat(sched.stopTime)}</div>
                        <div class="max">${sched.max}</div>
                    </div>
                    <div class="button-container">
                        <button class="newDelete" data-tempid="${index}-${index2}" title="Remove." data-sched_id="" data-dept="${sched.deptID}" data-day="${sched.day}" onclick="removeTempSlot(this.dataset.tempid)">
                            <span class="material-icons-outlined remove-sched-btn">
                                close
                            </span>
                        </button>
                    </div>
                </div>`;

                container.innerHTML+= template;
            }
            else if(index == 2){
                let container = document.querySelector('#wednesday .timeslot-container');

                let clss = null;
                if(sched.isBuffer) clss = 'buffer';
                else clss = '';

                console.log(sched.startTime);
                console.log(sched.stopTime);

                let template = 
                `
                <div class="block ${clss}">
                    <div class="timeslot">
                        <div class="time">${convertTo12HourFormat(sched.startTime)} - ${convertTo12HourFormat(sched.stopTime)}</div>
                        <div class="max">${sched.max}</div>
                    </div>
                    <div class="button-container">
                        <button class="newDelete" data-tempid="${index}-${index2}" title="Remove." data-sched_id="" data-dept="${sched.deptID}" data-day="${sched.day}" onclick="removeTempSlot(this.dataset.tempid)">
                            <span class="material-icons-outlined remove-sched-btn">
                                close
                            </span>
                        </button>
                    </div>
                </div>`;

                container.innerHTML+= template;
            }
            else if(index == 3){
                let container = document.querySelector('#thursday .timeslot-container');

                let clss = null;
                if(sched.isBuffer) clss = 'buffer';
                else clss = '';

                console.log(sched.startTime);
                console.log(sched.stopTime);

                let template = 
                `
                <div class="block ${clss}">
                    <div class="timeslot">
                        <div class="time">${convertTo12HourFormat(sched.startTime)} - ${convertTo12HourFormat(sched.stopTime)}</div>
                        <div class="max">${sched.max}</div>
                    </div>
                    <div class="button-container">
                        <button class="newDelete" data-tempid="${index}-${index2}" title="Remove." data-sched_id="" data-dept="${sched.deptID}" data-day="${sched.day}" onclick="removeTempSlot(this.dataset.tempid)">
                            <span class="material-icons-outlined remove-sched-btn">
                                close
                            </span>
                        </button>
                    </div>
                </div>`;

                container.innerHTML+= template;
            }
            else if(index == 4){
                let container = document.querySelector('#friday .timeslot-container');

                let clss = null;
                if(sched.isBuffer) clss = 'buffer';
                else clss = '';

                console.log(sched.startTime);
                console.log(sched.stopTime);

                let template = 
                `
                <div class="block ${clss}">
                    <div class="timeslot">
                        <div class="time">${convertTo12HourFormat(sched.startTime)} - ${convertTo12HourFormat(sched.stopTime)}</div>
                        <div class="max">${sched.max}</div>
                    </div>
                    <div class="button-container">
                        <button class="newDelete" data-tempid="${index}-${index2}" title="Remove." data-sched_id="" data-dept="${sched.deptID}" data-day="${sched.day}" onclick="removeTempSlot(this.dataset.tempid)">
                            <span class="material-icons-outlined remove-sched-btn">
                                close
                            </span>
                        </button>
                    </div>
                </div>`;

                container.innerHTML+= template;
            }
            else if(index == 5){
                let container = document.querySelector('#saturday .timeslot-container');

                let clss = null;
                if(sched.isBuffer) clss = 'buffer';
                else clss = '';

                console.log(sched.startTime);
                console.log(sched.stopTime);

                let template = 
                `
                <div class="block ${clss}">
                    <div class="timeslot">
                        <div class="time">${convertTo12HourFormat(sched.startTime)} - ${convertTo12HourFormat(sched.stopTime)}</div>
                        <div class="max">${sched.max}</div>
                    </div>
                    <div class="button-container">
                        <button class="newDelete" data-tempid="${index}-${index2}" title="Remove." data-sched_id="" data-dept="${sched.deptID}" data-day="${sched.day}" onclick="removeTempSlot(this.dataset.tempid)">
                            <span class="material-icons-outlined remove-sched-btn">
                                close
                            </span>
                        </button>
                    </div>
                </div>`;

                container.innerHTML+= template;
            }
        })
    })
    createAddSchedBtn();
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
                    patient.consultation = null;
                    patient.isFollowUp = null;
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

    xhr.open("POST", "./php/postAppointment.php", true);
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

                        let tr = document.createElement("tr");
                        tr.classList.add('table-row');
                        tr.setAttribute("title", "Click to highlight/see more.");

                        let td1 = document.createElement("td");
                        let div = document.createElement("div");
                        div.classList.add("req__btn-container");

                        const btn1 = document.createElement('button');
                        btn1.classList.add('approve');
                        btn1.setAttribute("title", 'Approve Appointment');

                        let span1 = document.createElement("span");
                        span1.classList.add("material-icons-outlined");
                        span1.innerText = 'done';

                        btn1.appendChild(span1);
                        
                        btn1.dataset.appID = item.appID;
                        btn1.dataset.deptID = item.deptID;
                        
                        btn1.addEventListener('click', function() {
                            viewRequestApprove(this.dataset.appID, this.dataset.deptID);
                        });

                        const btn2 = document.createElement('button');
                        btn2.classList.add('reject');
                        btn2.setAttribute("title", 'Reject Appointment');

                        let span2 = document.createElement("span");
                        span2.classList.add("material-icons-outlined");
                        span2.innerText = 'close';

                        btn2.appendChild(span2);
                        
                        btn2.dataset.appID = item.appID;
                        btn2.dataset.deptID = item.deptID;
                        
                        btn2.addEventListener('click', function() {
                            viewRequestReject(this.dataset.appID, this.dataset.deptID);
                        });

                        div.appendChild(btn1);
                        div.appendChild(btn2);
                        td1.appendChild(div);

                        tr.appendChild(td1);

                        let td2 = document.createElement("td");
                        td2.classList.add("always-visible");
                        td2.innerText = `${capitalFirstLetter(item.lastName)}, ${capitalFirstLetter(item.firstName)} ${capitalFirstLetter(item.middleName)}`;
                        
                        tr.appendChild(td2);

                        let td3 = document.createElement("td");
                        td3.classList.add("always-visible");
                        td3.innerText = deptName;
                        
                        tr.appendChild(td3);

                        let td4 = document.createElement("td");
                        td4.innerText = item.phone;
                        
                        tr.appendChild(td4);

                        let td5 = document.createElement("td");
                        td5.classList.add("always-visible");
                        td5.innerText = item.dateSubmitted;
                        
                        tr.appendChild(td5);

                        let td6 = document.createElement("td");
                        let a = document.createElement("a");
                        a.setAttribute("href", `${item.imgLink}`);
                        a.setAttribute("target", "_blank");
                        a.classList.add("viewBtn");
                        a.innerText = "View Image";

                        td6.appendChild(a);

                        tr.appendChild(td6);

                        table.appendChild(tr);

                        // let template = 
                        // `
                        // <tr class="table-row" title="Click to highlight/see more.">
                        //     <td>
                        //         <div class="req__btn-container">
                        //             <button class="approve" title="Approve Appointment" data-appID="${item.appID}" data-deptID="${item.deptID}" onclick="viewRequestApprove(this.dataset.appid, this.dataset.deptid)"><span class="material-icons-outlined">done</span></button>
                        //             <button class="reject" title="Reject Appointment" data-appID="${item.appID}" data-deptID="${item.deptID}" onclick="viewRequestReject(this.dataset.appid)"><span class="material-icons-outlined">close</span></button>
                        //         </div>
                        //     </td>
                        //     <td class="always-visible">${capitalFirstLetter(item.lastName)}, ${capitalFirstLetter(item.firstName)} ${capitalFirstLetter(item.middleName)}</td>
                        //     <td>${deptName}</td>
                        //     <td>${item.phone}</td>
                        //     <td class="always-visible">${item.dateSubmitted}</td>
                        //     <td><a href="${item.imgLink}" target="_blank" class="viewBtn">View Image</a></td>
                        // </tr>
                        // `;
                        
                        // table.innerHTML += template;
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

    xhr.open("POST", "./php/getReq.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`sortBy=${universalSort}&sortState=${universalSortStatus}`);
}

// function insertAppBtn(query){
//     let dept = document.querySelector("#deptSelect").value;
//     let table = document.querySelector('.schedule-table tbody');
//     let quickBtns = document.querySelectorAll('.view-schedule__btn');
//     let xhr = new XMLHttpRequest();
    
//     quickBtns.forEach(btn=>{
//         btn.classList.remove('view-disabled');
//         btn.removeAttribute("disabled");
//     })
    
//     xhr.onreadystatechange = function(){
//         if(this.readyState == 4){
//             if(this.status == 200){
//                 try {
//                     table.innerHTML = "";
//                     const arrOfObj = JSON.parse(this.responseText);

//                     arrOfObj.forEach(item=>{
//                         const dept = ['ENT', 'Hematology', 'Internal Medicine', 'Internal Medicine Clearance', 'Nephrology', 'Neurology', 'OB GYNE New', 'OB GYNE Old', 'OB GYNE ROS', 'Oncology', 'Pediatric Cardiology', 'Pediatric Clearance', 'Pediatric General', 'Psychiatry New', 'Psychiatry Old', 'Surgery', 'Surgery ROS'];
//                         let deptName = dept[item.departmentID-1];
//                         let sex = item.sex == 'm' ? 'Male' : 'Female';
//                         let time = "";
//                         if(item.startTime != "" && item.stopTime != "") time = `${item.startTime} - ${item.stopTime}`;
//                         if (item.cancelReason == null) item.cancelReason = "";

//                         let template = 
//                         `
//                         <tr class="table-row" title="Click to highlight/see more.">
//                             <td>${item.appointmentID}</td>
//                             <td class="always-visible">${capitalFirstLetter(item.lastName)}, ${capitalFirstLetter(item.firstName)} ${capitalFirstLetter(item.middleName)}</td>
//                             <td class="always-visible">${generateCode(item.rawAppDate, item.departmentID, item.scheduleID, item.appointmentID)}</td>
//                             <td>${deptName}</td>
//                             <td>${item.consultation}</td>
//                             <td>${item.appointmentDate}</td>
//                             <td>${time}</td>
//                             <td class="${item.appointmentStatus}" id="status_${item.appointmentID}">${capitalFirstLetter(item.appointmentStatus)}</td>
//                             <td>${capitalFirstLetter(item.appointmentType)}</td>
//                             <td>${sex}</td>
//                             <td>${item.birthdate}</td>
//                             <td>${item.phone}</td>
//                             <td>${capitalFirstLetter(item.barangay)}, ${capitalFirstLetter(item.municipality)}, ${capitalFirstLetter(item.province)}</td>
//                             <td>${capitalFirstLetter(item.patientType)}</td>
//                             <td>${item.caseNo}</td>
//                             <td>${item.dateSubmitted}</td>
//                             <td>${item.cancelReason}</td>
//                             <td><button class="editBtn ${item.appointmentStatus != 'active' ? 'edit-disabled' : ''}" ${item.appointmentStatus != 'active' ? 'disabled="disabled"' : ""} data-appid="${item.appointmentID}" data-status="${item.appointmentStatus}" onclick="editStatus(this.dataset.appid, this.dataset.status)" >Edit</button></td>
//                         </tr>
//                         `;
                        
//                         table.innerHTML += template;
//                     });
//                     showTableCell();
//                 } catch (error) {
//                     if(query == 'today'){
//                         table.innerHTML = 
//                         `
//                         <tr>
//                             <td colspan="16" class="empty">No Appointments Today</td>
//                         </tr>
//                         `;
//                     }
//                     else if(query == 'completed'){
//                         table.innerHTML = 
//                         `
//                         <tr>
//                             <td colspan="16" class="empty">No Recent Completed Appointments</td>
//                         </tr>
//                         `;
//                     }
//                     else if(query == 'cancelled'){
//                         table.innerHTML = 
//                         `
//                         <tr>
//                         <td colspan="16" class="empty">No Recent Cancelled Appointments</td>
//                         </tr>
//                         `;
//                     }

//                 }
//             }
//         }
//         else{
//             table.innerHTML = 
//             `
//             <tr>
//                 <td colspan="16" class="empty">Loading...</td>
//             </tr>
//             `;
//         }
//         setupTablePagination('schedule-table', 'prevButton', 'nextButton', 10);
//     };

//     xhr.open("POST", "./php/getApp.php", true);
//     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//     xhr.send(`deptID=${dept}&query=${query}`);

// }

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
        <div class="changeStatusContainer">
            <select class="form-select" aria-label="Default select example" id="newStatus" onchange="cancelShow(this.value)">
                <option value="" selected hidden disabled>Select Status</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
            </select>
            <textarea placeholder="Cancel Reason..." cols="30" rows="5" name="cancelReason" id="cancelReason" onblur="inputLimiterBlur(this.id, 150);" oninput="inputLimiter(this.id, 150);"></textarea>
            <div class="change-warning">This cannot be undone.</div>
            <div class="error-container">
                <span class="msg-modal"></span>
            </div>
        </div>
    `;

    modalNegative.innerText = "Cancel";
    modalPositive.innerText = "Apply";
    modalPositive.setAttribute("onclick", `applyEditStatus("${ID}", "${status}")`)
    modalPositive.removeAttribute("data-bs-dismiss");

    modalLauncher();
}

function cancelShow(val){
    showErrorModal();
    if(val == 'cancelled'){
        document.querySelector("#cancelReason").style.display = "unset";
    }
    else{
        document.querySelector("#cancelReason").value = ""
        document.querySelector("#cancelReason").style.display = "none";
    }
}

function applyEditStatus(ID, status){
    if(posting) return;
    posting = true;

    let newStatus = document.querySelector("#newStatus").value;
    let cancelReason = document.querySelector("#cancelReason").value;

    if(newStatus == ""){
        showErrorModal("Select a new status");
        posting = false;
        return;
    }
    else if(newStatus == "cancelled" && cancelReason == ""){
        showErrorModal("Cancel reason cannot be empty");
        posting = false;
        return;
    }
    else{
        showErrorModal();
        document.querySelector('.positive').setAttribute("data-bs-dismiss", "modal");
        document.querySelector('.positive').click();
    }

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                if(this.responseText == 1){
                    setTimeout(()=>{
                        document.querySelector(`#status_${ID}`).classList.remove(status);
                        document.querySelector(`#status_${ID}`).innerText = capitalFirstLetter(newStatus);
                        document.querySelector(`#status_${ID}`).classList.add(newStatus);
                        document.querySelector('button[data-appid="'+ ID +'"]').setAttribute('disabled', 'disabled');
                        document.querySelector('button[data-appid="'+ ID +'"]').classList.add('view-disabled');

                        if(newStatus == "cancelled") document.querySelector(`#statusCancel_${ID}`).innerText = cancelReason;
                        showResModal("Status has been changed")
                    }, 500) 
                }
                else{
                    showResModal("Something went wrong...", false, "Failed");
                }
                
            }
        }
    }

    xhr.open("POST", "./php/changeStatus.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`id=${ID}&newStatus=${newStatus}&cancelReason=${cancelReason}`);
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
        

        xhr.open("POST", "./php/getTimeSlotApp.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.send(`dept=${dept}&day=${dayOfWeek}`);
    }
    else{
        timeSlot.innerHTML = "";
        timeSlot.innerHTML += `<option value="" selected hidden disabled>Time Slot</option>`;
        timeSlot.setAttribute("disabled", "disabled");
    }


}

// function searchAppointment(){
//     let input = document.querySelector("#appointmentSearch").value.trim();
//     let table = document.querySelector('.schedule-table tbody');

//     if(input != ""){
//         let xhr = new XMLHttpRequest();

//         xhr.onreadystatechange = function(){
//             if(this.readyState == 4){
//                 if(this.status == 200){
//                     try {
//                         table.innerHTML = "";
//                         const arrOfObj = JSON.parse(this.responseText);
    
//                         arrOfObj.forEach(item=>{
//                             const dept = ['ENT', 'Hematology', 'Internal Medicine', 'Internal Medicine Clearance', 'Nephrology', 'Neurology', 'OB GYNE New', 'OB GYNE Old', 'OB GYNE ROS', 'Oncology', 'Pediatric Cardiology', 'Pediatric Clearance', 'Pediatric General', 'Psychiatry New', 'Psychiatry Old', 'Surgery', 'Surgery ROS'];
//                             let deptName = dept[item.departmentID-1];
//                             let sex = item.sex == 'm' ? 'Male' : 'Female';
//                             let time = "";
//                             if(item.startTime != "" && item.stopTime != "") time = `${item.startTime} - ${item.stopTime}`;
//                             if (item.cancelReason == null) item.cancelReason = "";
    
//                             let template = 
//                             `
//                             <tr class="table-row" title="Click to highlight/see more.">
//                                 <td>${item.appointmentID}</td>
//                                 <td class="always-visible">${capitalFirstLetter(item.lastName)}, ${capitalFirstLetter(item.firstName)} ${capitalFirstLetter(item.middleName)}</td>
//                                 <td class="always-visible">${generateCode(item.rawAppDate, item.departmentID, item.scheduleID, item.appointmentID)}</td>
//                                 <td>${deptName}</td>
//                                 <td>${item.consultation}</td>
//                                 <td>${item.appointmentDate}</td>
//                                 <td>${time}</td>
//                                 <td class="${item.appointmentStatus}" id="status_${item.appointmentID}">${capitalFirstLetter(item.appointmentStatus)}</td>
//                                 <td>${capitalFirstLetter(item.appointmentType)}</td>
//                                 <td>${sex}</td>
//                                 <td>${item.birthdate}</td>
//                                 <td>${item.phone}</td>
//                                 <td>${capitalFirstLetter(item.barangay)}, ${capitalFirstLetter(item.municipality)}, ${capitalFirstLetter(item.province)}</td>
//                                 <td>${capitalFirstLetter(item.patientType)}</td>
//                                 <td>${item.caseNo}</td>
//                                 <td>${item.dateSubmitted}</td>
//                                 <td>${item.cancelReason}</td>
//                                 <td><button class="editBtn ${item.appointmentStatus != 'active' ? 'edit-disabled' : ''}" ${item.appointmentStatus != 'active' ? 'disabled="disabled"' : ""} data-appid="${item.appointmentID}" data-status="${item.appointmentStatus}" onclick="editStatus(this.dataset.appid, this.dataset.status)" >Edit</button></td>
//                             </tr>
//                             `;
                            
//                             table.innerHTML += template;
//                         });
//                         showTableCell();
//                     } catch (error) {
//                         table.innerHTML = 
//                         `
//                         <tr>
//                             <td colspan="16" class="empty">No Result</td>
//                         </tr>
//                         `;
                        
//                     }
//                 }
//             }
//             else{
//                 table.innerHTML = 
//                 `
//                 <tr>
//                     <td colspan="16" class="empty">Loading...</td>
//                 </tr>
//                 `;
//             }
//             setupTablePagination('schedule-table', 'prevButton', 'nextButton', 10);
//         };

//         xhr.open("POST", "./php/searchApp.php", true);
//         xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//         xhr.send("search=" + input);
//     }
// }

// function filterAppointment(){
//     let dept = document.querySelector('#dept').value;

//     let month = document.querySelector('#appMonth').value;
//     let year = document.querySelector('#appYear').value;
//     let day = document.querySelector('#appDay').value;
//     let date = `${year}-${month}-${day}`;

//     let timeSlotID = document.querySelector('#timeSlot').value;

//     let sex = document.querySelector('#sex').value;
    
//     let barangay = document.querySelector('#barangay').value;
//     let municipality = document.querySelector('#municipality').value;
//     let province = document.querySelector('#province').value;

//     let patientType = document.querySelector('#patientType').value;

//     let status = document.querySelector('#status').value;

//     let sortBy = document.querySelector('#sortBy').value;

//     if(month != "" || day != "" || year != ""){
//         if(month == "" || day == "" || year == ""){
//             showError("Date is incomplete");
//             return;
//         }
//         else if(!isDateValid(date)){
//             showError("Invalid Date")
//             return;
//         }
//         else if(year.length != 4){
//             showError("Invalid Date")
//             return;
//         }
//     }
//     else{
//         date = "";
//     }
//     showError("");

//     let obj = {
//         dept: dept,
//         appointmentDate: date,
//         scheduleID: timeSlotID,
//         sex: sex,
//         barangay: barangay,
//         municipality: municipality,
//         province: province,
//         patientType: patientType,
//         status: status,
//         sortBy: sortBy,
//     }

//     let toSend = JSON.stringify(obj);
//     let table = document.querySelector('.schedule-table tbody');

//     const xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function(){
//         if(this.readyState == 4){
//             if(this.status == 200){
//                 try {
//                     table.innerHTML = "";
//                     const arrOfObj = JSON.parse(this.responseText);

//                     arrOfObj.forEach(item=>{
//                         const dept = ['ENT', 'Hematology', 'Internal Medicine', 'Internal Medicine Clearance', 'Nephrology', 'Neurology', 'OB GYNE New', 'OB GYNE Old', 'OB GYNE ROS', 'Oncology', 'Pediatric Cardiology', 'Pediatric Clearance', 'Pediatric General', 'Psychiatry New', 'Psychiatry Old', 'Surgery', 'Surgery ROS'];
//                         let deptName = dept[item.departmentID-1];
//                         let sex = item.sex == 'm' ? 'Male' : 'Female';
//                         let time = "";
//                         if(item.startTime != "" && item.stopTime != "") time = `${item.startTime} - ${item.stopTime}`;
//                         if (item.cancelReason == null) item.cancelReason = "";

//                         let template = 
//                         `
//                         <tr class="table-row" title="Click to highlight/see more.">
//                             <td>${item.appointmentID}</td>
//                             <td class="always-visible">${capitalFirstLetter(item.lastName)}, ${capitalFirstLetter(item.firstName)} ${capitalFirstLetter(item.middleName)}</td>
//                             <td class="always-visible">${generateCode(item.rawAppDate, item.departmentID, item.scheduleID, item.appointmentID)}</td>
//                             <td>${deptName}</td>
//                             <td>${item.consultation}</td>
//                             <td>${item.appointmentDate}</td>
//                             <td>${time}</td>
//                             <td class="${item.appointmentStatus}" id="status_${item.appointmentID}">${capitalFirstLetter(item.appointmentStatus)}</td>
//                             <td>${capitalFirstLetter(item.appointmentType)}</td>
//                             <td>${sex}</td>
//                             <td>${item.birthdate}</td>
//                             <td>${item.phone}</td>
//                             <td>${capitalFirstLetter(item.barangay)}, ${capitalFirstLetter(item.municipality)}, ${capitalFirstLetter(item.province)}</td>
//                             <td>${capitalFirstLetter(item.patientType)}</td>
//                             <td>${item.caseNo}</td>
//                             <td>${item.dateSubmitted}</td>
//                             <td>${item.cancelReason}</td>
//                             <td><button class="editBtn ${item.appointmentStatus != 'active' ? 'edit-disabled' : ''}" ${item.appointmentStatus != 'active' ? 'disabled="disabled"' : ""} data-appid="${item.appointmentID}" data-status="${item.appointmentStatus}" onclick="editStatus(this.dataset.appid, this.dataset.status)" >Edit</button></td>
//                         </tr>
//                         `;
                        
//                         table.innerHTML += template;
//                     });
//                     showTableCell();
//                 } catch (error) {
//                     table.innerHTML = 
//                     `
//                     <tr>
//                         <td colspan="17" class="empty">No Result</td>
//                     </tr>
//                     `;
//                 }
//             }
//         }
//         else{
//             table.innerHTML = 
//             `
//             <tr>
//                 <td colspan="17" class="empty">Loading Table...</td>
//             </tr>
//             `;
//         }
//         setupTablePagination('schedule-table', 'prevButton', 'nextButton', 10);
//     }

//     xhr.open("POST", "./php/filterApp.php", true);
//     xhr.setRequestHeader("Content-Type", "application/json");
//     xhr.send(toSend);
// }

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
                    let deptBars = document.querySelectorAll('.dept');

                    deptBars.forEach((item, index) =>{
                        
                        item.style.width = "0%";
                        item.innerHTML = item.dataset.dept + "(0)";
                    })
                }
            }
        }
        else{
            let deptBars = document.querySelectorAll('.dept');

            deptBars.forEach((item, index) =>{
                let count = null;
                
                item.style.width = "0%";
                item.innerHTML = `Loading...`;
            })
        }
    }

    xhr.open("POST", "./php/getDeptStats.php", true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("days=" + days);
}

function insertQuickStats(days){
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                console.log(this.responseText)
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
        else{
            let stats = document.querySelectorAll('.dashboard__block span');

            stats.forEach(item=>{
                item.innerText = "Loading..."
            })

        }
    };

    xhr.open("POST", "./php/getQuickStats.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send('days=' + days);
}

function selectDeptStat(dept, days){
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                try {
                    let arr = JSON.parse(this.responseText);
                    let stats = document.querySelectorAll('.data span');

                    stats.forEach((item, index)=>{
                        let stat;

                        if(index < 4) {
                            stat = arr[index].toFixed(2);
                            item.innerText = stat + '%';
                        }
                        else{
                            stat = arr[index];
                            item.innerText = stat;
                        }
                        
                    })

                } catch (error) {
                    
                }
            }
            else{
                let stats = document.querySelectorAll('.data span');
                stats.forEach((item, index)=>{
                    item.innerText = "Loading...";
                })
            }
        }
    }

    xhr.open("POST", "./php/getPerDeptStats.php", true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('dept='+ dept + '&days=' + days);
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

    xhr.open("POST", "./php/deleteData.php", true);
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

function loading(el){
    el.classList.add("loading-cursor");
}

function removeLoading(el){
    el.classList.remove("loading-cursor");
}

function addDashEvery4Characters(input) {
    const output = [];
    for (let i = 0; i < input.length; i++) {
        output.push(input[i]);
        if ((i + 1) % 4 === 0 && i < input.length - 1) {
            output.push('-');
        }
    }
    return output.join('');
}

function generateCode(date, deptID, schedID, appID){

    date = date.toString();
    deptID = deptID.toString();
    schedID = schedID.toString();
    appID = appID.toString();

    if(date.length == 0 || deptID.length == 0 || schedID.length == 0 || appID.length == 0){
        return "Invalid";
    }

    date = date.replaceAll('-', '');

    return addDashEvery4Characters(`${date}${deptID}${schedID}${appID}`);
}

function processing(elClass){
    let el = document.querySelector(`${elClass}`);

    el.innerText = "Processing...";
    el.classList.add('processing');
}

function removeProcessing(elClass, text){
    let el = document.querySelector(`${elClass}`);

    el.innerText = text;
    el.classList.remove('processing');
}

function removeFollowUpBtn(){
    let old = document.querySelector('.visit:nth-child(1)');
    let _new = document.querySelector('.visit:nth-child(2)');

    old.querySelector('input').checked = true;

    _new.querySelector('input').checked = false;
    _new.style.display = "none";
}

function addFollowUpBtn(){
    let radio = document.querySelector('.visit:nth-child(2)');
    radio.style.display = "flex";
}

function deptClicked(){
    let header = document.querySelector('.per-dept-header span');

    header.innerText = this.dataset.dept;
    header.setAttribute('data-deptID', this.dataset.deptid)

    selectDeptStat(this.dataset.deptid, document.querySelector('#dashboardDays').value);
}

function checkSelectedDepartment(){
    let header = document.querySelector('.per-dept-header span');

    selectDeptStat(header.dataset.deptid, document.querySelector('#dashboardDays').value);
}

function addZeroDate(inputDate) {
    const parts = inputDate.split('-');
    const year = parts[0];
    const month = parts[1].padStart(2, '0'); // Ensures two-digit month
    const day = parts[2].padStart(2, '0');   // Ensures two-digit day
  
    return `${year}-${month}-${day}`;
  }

function addMode(){
    reset2DArray(schedTempCol);
    clearMarkMissed()
    clearSlots();

    document.querySelectorAll('.day-header').forEach(header=>{
        header.classList.add("noday");
    });

    let addContainer = document.querySelector('#addContainer');
    let scheduleSet = document.querySelector('#scheduleSet');

    document.querySelector('#addStart').value = "";
    document.querySelector('#addEnd').value = "";

    let tempObj = new Date();
    document.querySelector('#addStart').setAttribute("min", addZeroDate(`${tempObj.getFullYear()}-${tempObj.getMonth()+1}-${tempObj.getDate()}`));
    document.querySelector('#addEnd').setAttribute("min", addZeroDate(`${tempObj.getFullYear()}-${tempObj.getMonth()+1}-${tempObj.getDate()}`));

    scheduleSet.selectedIndex = '0';
    scheduleSet.setAttribute('disabled', 'disabled');
    document.querySelector("#showPrevious").setAttribute("disabled", "disabled");
    scheduleSet.classList.add('general-disabled');

    addContainer.style.display = 'flex';

    disableScheduleBtn(document.querySelector('#scheduleAdd'));
    disableScheduleBtn(document.querySelector('#scheduleEdit'));
    disableScheduleBtn(document.querySelector('#scheduleDlt'));

    disableSelect(document.querySelector("#deptSelect"));
    disableSelect(document.querySelector("#scheduleSet"));

    document.querySelector('.state-container').style.display="flex";
    // Add function that clears schedules inside week  
    createAddSchedBtn();

    let schedulingSave = document.querySelector('#schedulingSave');
    let schedulingCancel = document.querySelector('#cancel');

    schedulingSave.removeAttribute('onclick');
    schedulingSave.setAttribute('onclick', 'saveAdd()');

    schedulingCancel.removeAttribute('onclick');
    schedulingCancel.setAttribute('onclick', 'cancel()');

}

function saveAdd(){
    if(posting) return;

    posting = true;

    const addStart = document.querySelector('#addStart');
    const addEnd = document.querySelector('#addEnd');

    const startDateObj = new Date(addStart.value);
    const endDateObj = new Date(addEnd.value);

    if(addStart.value == "" && addEnd.value == "") {
        showError("Start & end date cannot be empty");
        posting = false;
        return;
    }
    else if(addStart.value == "" || addEnd.value == ""){
        if(addStart.value == ""){
            showError("Start date cannot be empty");
            posting = false;
            return;
        }
        else if(addEnd.value == ""){
            showError("End date cannot be empty");
            posting = false;
            return;
        }
    }
    else if(startDateObj > endDateObj){
        showError("Start date cannot be later than end date");
        posting = false;
        return;
    }
    else if (startDateObj == endDateObj){
        showError("Start date cannot be equal to end date");
        posting = false;
        return;
    }
    else if(document.querySelectorAll('.block').length == document.querySelectorAll('.add').length){
        showError("Schedule must contain a time slot");
        posting = false;
        return;
    }
    else{
        showError();

        const dept = ['ENT', 'Hematology', 'Internal Medicine', 'Internal Medicine Clearance', 'Nephrology', 'Neurology', 'OB GYNE New', 'OB GYNE Old', 'OB GYNE ROS', 'Oncology', 'Pediatric Cardiology', 'Pediatric Clearance', 'Pediatric General', 'Psychiatry New', 'Psychiatry Old', 'Surgery', 'Surgery ROS'];

        let meta = {
            dept: document.querySelector('#deptSelect').value,
            start: addStart.value,
            end: addEnd.value,
            deptName: dept[document.querySelector('#deptSelect').value-1],
        }
        
        let set = {
            meta: meta,
            sched: schedTempCol
        }

        
        const toSend = JSON.stringify(set);

        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function(){
            if(this.readyState == 4){
                if(this.status == 200){
                    if(this.responseText == 2){
                        showError("Schedule date range cannot overlap an existing active schedule")
                    }
                    else if (this.responseText == 1){
                        cancel();
                        deptChange(document.querySelector("#deptSelect").value);
                        showResModal("New schedule has been saved")
                    }
                    else{
                        alert("Something went wrong...")
                    }
                    removeLoading(document.querySelector('#schedulingSave'));
                    posting = false;
                }
            }
            else{
                loading(document.querySelector('#schedulingSave'));
            }
        }

        
        xhr.open("POST", "./php/postNewSet.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(toSend);

        // ICHECK DIN DAPAT IF YUNG START AND END DATE IS NAG OVERLAP SA EXISTING NA SCHEDULESETS
    }
}

function editMode(){
    let deptID = document.querySelector("#deptSelect").value;
    let setID = document.querySelector("#scheduleSet").value;
    let schedulingSave = document.querySelector("#schedulingSave");
    let schedulingCancel = document.querySelector("#cancel");

    // scheduleSet.selectedIndex = '0';

    document.querySelector('#editStart').value = "";
    document.querySelector('#editEnd').value = "";

    let tempObj = new Date();
    document.querySelector('#editStart').setAttribute("min", addZeroDate(`${tempObj.getFullYear()}-${tempObj.getMonth()+1}-${tempObj.getDate()}`));
    document.querySelector('#editEnd').setAttribute("min", addZeroDate(`${tempObj.getFullYear()}-${tempObj.getMonth()+1}-${tempObj.getDate()}`));


    document.querySelector('#editContainer').style.display = 'flex';
    document.querySelector('.state-container').style.display="flex";

    disableScheduleBtn(document.querySelector('#scheduleAdd'));
    disableScheduleBtn(document.querySelector('#scheduleEdit'));
    disableScheduleBtn(document.querySelector('#scheduleDlt'));
    disableSelect(document.querySelector("#deptSelect"));
    disableSelect(document.querySelector("#scheduleSet"));
    document.querySelector("#showPrevious").setAttribute("disabled", "disabled");


    clearSlots();

    schedulingSave.removeAttribute('onclick');
    schedulingSave.setAttribute('onclick', 'saveEdit();');


    schedulingCancel.removeAttribute('onclick');
    schedulingCancel.setAttribute('onclick', 'cancelEdit();');


    showSchedEdit(setID);
}

function saveEdit(){
    // DELETE MUNA

    let schedSetIndex = document.querySelector("#scheduleSet").selectedIndex;

    const dept = ['ENT', 'Hematology', 'Internal Medicine', 'Internal Medicine Clearance', 'Nephrology', 'Neurology', 'OB GYNE New', 'OB GYNE Old', 'OB GYNE ROS', 'Oncology', 'Pediatric Cardiology', 'Pediatric Clearance', 'Pediatric General', 'Psychiatry New', 'Psychiatry Old', 'Surgery', 'Surgery ROS'];

    let editStart = document.querySelector("#editStart");
    let editEnd = document.querySelector("#editEnd");


    const startDateObj = new Date(editStart.value);
    const endDateObj = new Date(editEnd.value);

    if(editStart.value == "" && editEnd.value == "") {
        showError("Start & end date cannot be empty");
        return;
    }
    else if(editStart.value == "" || editEnd.value == ""){
        if(editStart.value == ""){
            showError("Start date cannot be empty");
            return;
        }
        else if(editEnd.value == ""){
            showError("End date cannot be empty");
            return;
        }
    }
    else if(startDateObj > endDateObj){
        showError("Start date cannot be later than end date");
        return;
    }
    else if (startDateObj == endDateObj){
        showError("Start date cannot be equal to end date");
        return;
    }
    else if(document.querySelectorAll('.block').length == document.querySelectorAll('.add').length){
        showError("Schedule must contain a time slot");
        return;
    }

    showError();


    // idagdag dito yung if wala rin inedit at wala inadd na new slot
    if (toDeleteSlots.length == 0 && 
        editStart.dataset.initial == editStart.value &&
        editEnd.dataset.initial == editEnd.value &&
        !schedEdited && toAddSlots.length == 0
        ){

        cancelEdit();
        return;
    }  

    const obj = {
        deptName:dept[document.querySelector("#deptSelect").value-1],
        range: {
            deptID: document.querySelector("#deptSelect").value,
            setID: document.querySelector("#scheduleSet").value,
            start: editStart.value, 
            end: editEnd.value, 
            oldStart: editStart.dataset.initial, 
            oldEnd: editEnd.dataset.initial, 
        },
        edit: toEditSlots,
        delete: toDeleteSlots,
        add: toAddSlots,
    }

    const toSend = JSON.stringify(obj);

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                console.log(this.responseText)
                if(this.responseText == 1){
                    showResModal("Schedule has been saved");
                    cancelEdit();
                    deptChange(document.querySelector("#deptSelect").value, "editSaved", schedSetIndex);
                    
                }
                else if(this.responseText == 2){
                    showError("Schedule date range cannot overlap an existing active schedule");
                }else alert("Something went wrong...");

                toDeleteSlots.splice(0, toDeleteSlots.length);
                markMissedDay("edit");
            }
        }
    }

    xhr.open("POST", "./php/postEditSchedule.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(toSend);
    
}

function enableAdd(){
    let add = document.querySelector('#scheduleAdd');
    let addStart = document.querySelector('#addStart');
    let addEnd = document.querySelector('#addEnd');

    addStart.value = "";
    addEnd.value = "";

    removeDisabledSchedBtn(add);
}

function disableSelect(el){

    if(!el.hasAttribute("disabled")){
        el.setAttribute('disabled', 'disabled');
    }

    if(!el.classList.contains("select-disabled")){
        el.classList.add('select-disabled');
    }
}

function removeDisabledSelect(el){
    el.removeAttribute('disabled', 'disabled');
    el.classList.remove('select-disabled');
}

function disableScheduleBtn(button){

    if(!button.hasAttribute("disabled")){
        button.setAttribute('disabled', 'disabled');
    }
    
    if(!button.querySelector('span').classList.contains("scheduling-btn-disabled")){
        button.querySelector('span').classList.add('scheduling-btn-disabled');
    }
}

function removeDisabledSchedBtn(button){
    button.removeAttribute('disabled');
    button.querySelector('span').classList.remove('scheduling-btn-disabled');
}

function cancel(){
    showError();

    document.querySelector("#showPrevious").removeAttribute("disabled");
    removeDisabledSelect(document.querySelector('#deptSelect'));
    removeDisabledSelect(document.querySelector('#scheduleSet'));

    removeDisabledSchedBtn(document.querySelector('#scheduleAdd'));

    if(document.querySelector('#scheduleSet').value != ""){
        removeDisabledSchedBtn(document.querySelector('#scheduleEdit'));
        removeDisabledSchedBtn(document.querySelector('#scheduleDlt'));
    }

    document.querySelector('.state-container').style.display="none";
    document.querySelector('#addContainer').style.display="none";
    
    reset2DArray(schedTempCol);

    document.querySelectorAll('.timeslot-container').forEach(item=>{
        removeAllChildNodes(item);
    })

    document.querySelectorAll('.day-header').forEach(header=>{
        header.classList.add("noday");
    });
    
}

function cancelEdit(){
    showError();

    schedEdited = false;

    document.querySelector("#showPrevious").removeAttribute("disabled");
    removeDisabledSelect(document.querySelector('#deptSelect'));
    removeDisabledSelect(document.querySelector('#scheduleSet'));

    removeDisabledSchedBtn(document.querySelector('#scheduleAdd'));

    if(document.querySelector('#scheduleSet').value != ""){
        removeDisabledSchedBtn(document.querySelector('#scheduleEdit'));
        removeDisabledSchedBtn(document.querySelector('#scheduleDlt'));
    }

    document.querySelector('.state-container').style.display="none";
    document.querySelector('#editContainer').style.display="none";


    toAddSlots.splice(0, toAddSlots.length);
    toEditSlots.splice(0, toEditSlots.length);
    toDeleteSlots.splice(0, toDeleteSlots.length);

    showSched(document.querySelector("#scheduleSet").value);

    markMissedDay("view");
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function sortSchedTempCol(){
    schedTempCol.forEach(day=>{
        day.sort((a, b) => {
            // Convert the time strings to Date objects for proper comparison
            const timeA = new Date(`1970-01-01T${a.startTime}`);
            const timeB = new Date(`1970-01-01T${b.startTime}`);
            
            // Compare the Date objects
            return timeA - timeB;
        });
    })
}

function reset2DArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = [];
    }
}

function createAddSchedBtn(){
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

    days.forEach(item=>{
        // Create div element with classes
        var blockDiv = document.createElement('div');
        blockDiv.className = 'block add';

        // Create button element
        var addButton = document.createElement('button');
        addButton.className = 'add-btn';
        addButton.setAttribute('data-day', item);
        addButton.onclick = function () {
            addSched(this.dataset.day);
        };

        // Create span element for the icon
        var iconSpan = document.createElement('span');
        iconSpan.className = 'material-icons-outlined';
        iconSpan.textContent = 'add';

        // Append span to button
        addButton.appendChild(iconSpan);

        // Append button to div
        blockDiv.appendChild(addButton);

        if(item == 'mon'){
            document.querySelector("#monday .timeslot-container").append(blockDiv);
        }
        else if(item == 'tue'){
            document.querySelector("#tuesday .timeslot-container").append(blockDiv);
        }
        else if(item == 'wed'){
            document.querySelector("#wednesday .timeslot-container").append(blockDiv);
        }
        else if(item == 'thu'){
            document.querySelector("#thursday .timeslot-container").append(blockDiv);
        }
        else if(item == 'fri'){
            document.querySelector("#friday .timeslot-container").append(blockDiv);
        }
        else if(item == 'sat'){
            document.querySelector("#saturday .timeslot-container").append(blockDiv);
        }

        })
}

function clearSlots(){
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

    let timeSlotCon = document.querySelectorAll('.timeslot-container');
    timeSlotCon.forEach(item=>{
        removeAllChildNodes(item);
    })
}

function convertTo12HourFormat(militaryTime) {
    // Parse the military time string
    const [hours, minutes] = militaryTime.split(':');
    
    // Convert to 12-hour format
    let formattedHours = parseInt(hours, 10);
    const amPm = formattedHours >= 12 ? 'PM' : 'AM';

    // Adjust hours for 12-hour format
    formattedHours = formattedHours % 12 || 12;

    // Add leading zero to minutes if needed
    const formattedMinutes = minutes.padStart(2, '0');

    // Construct the 12-hour time string
    const twelveHourTime = `${formattedHours}:${formattedMinutes} ${amPm}`;

    return twelveHourTime;
}

function revertRadio(){
    document.querySelectorAll('.radio-group span').forEach(item=>{
        item.style.color = 'rgb(80, 78, 78)';
    })
}

function deptChange(deptID, mode = "", index = null){
    clearSlots();
    clearMarkMissed();

    document.querySelectorAll('.day-header').forEach(header=>{
        header.classList.add("noday");
    });
    
    let scheduleSet = document.querySelector('#scheduleSet');

    const xhr  = new XMLHttpRequest();
    
    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                removeAllChildNodes(scheduleSet);
                const obj = JSON.parse(this.responseText);

                let optionElement = document.createElement("option");

                optionElement.value = "";
                optionElement.text = "-";
                optionElement.selected = true;
                // optionElement.hidden = true;
                optionElement.disabled = true;

                scheduleSet.appendChild(optionElement);


                obj.forEach((item)=>{

                    let optionElement = document.createElement("option");
                    optionElement.value = item.setID;
                    optionElement.textContent = `${shortenDate(item.startDate)} - ${shortenDate(item.endDate)}`;

                    if(isDateInThePast(item.endDate)){
                        optionElement.className = "previous-schedule";
                        blockSchedEdit.push(item.setID);
                    }
                    
                    scheduleSet.appendChild(optionElement);
                })

                disableScheduleBtn(document.querySelector("#scheduleEdit"));
                disableScheduleBtn(document.querySelector("#scheduleDlt"));
                
                
                document.querySelector("#showPrevious").removeAttribute("disabled");
                removeDisabledSelect(scheduleSet);
                enableAdd();

                if(mode == 'editSaved'){
                    document.querySelector("#scheduleSet").selectedIndex = index;
                    showSched(document.querySelector("#scheduleSet").value);
                }
            }
        }
    }

    xhr.open("POST", "./php/getScheduleSet.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("deptID=" + deptID);
}

function isDateInThePast(dateString) {
    // Convert the input date string to a Date object
    var inputDate = new Date(dateString);
  
    // Get the current date without the time (start of the day)
    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
  
    // Compare the input date with the start of the current day
    return inputDate < currentDate;
}

function showPreviousToggle(){
    const hidden = document.querySelectorAll(".previous-schedule");

    if(document.getElementById("showPrevious").checked){
        hidden.forEach(el=>{
            el.style.display = 'unset';
        })
    }
    else{
        hidden.forEach(el=>{
            el.style.display = 'none';
        })
    }
}

function removeTempSlot(tempid){
    let dayIndex = tempid.split("-")[0];
    let schedIndex = tempid.split("-")[1];

    for(let day = 0; day < schedTempCol.length; day++){

        for(let sched = 0; sched < schedTempCol[day].length; sched++){
            if(day == dayIndex && sched == schedIndex){
                schedTempCol[day].splice(schedIndex, 1);
            }
        }
    }

    updateSchedTable();

    // console.table(schedTempCol[0]);
    // schedTempCol.forEach((day, index)=>{
    //     if(index == dayIndex){
    //         day.forEach((sched, innerIndex)=>{
    //             if(innerIndex == schedIndex){
    //                 day = day.splice(innerIndex, 1);
    //             }
    //         });
    //     }
    // });
}

function showSched(schedule){
    
    if(schedule == "") return;

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(this.status == 200){
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
                        else clss = '';
                        
                        let blockTemplate = 
                        `
                        <div class="block ${clss}">
                            <div class="timeslot viewMode">
                                <div class="time">${startTime} - ${stopTime}</div>
                                <div class="max">${max}</div>
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
    }

    xhr.open("POST", "./php/getScheduleTimeSlot.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("schedID="+schedule);

    removeDisabledSchedBtn(document.querySelector('#scheduleEdit'));
    removeDisabledSchedBtn(document.querySelector('#scheduleDlt'));

    if(blockSchedEdit.includes(document.querySelector("#scheduleSet").value)){
        disableScheduleBtn(document.querySelector('#scheduleEdit'));
    }

}

function showSchedEdit(schedule){
    
    if(schedule == "") return;

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(this.status == 200){
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
                        const id = item.schedID;
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
                        <div class="block ${clss}" data-sched_id="${id}" data-ini_max="${max}" data-ini_start="${startTime}" data-ini_stop="${stopTime}" data-ini_buffer="${isBuffer}">
                            <div class="timeslot">
                                <div class="time">${startTime} - ${stopTime}</div>
                                <div class="max">${max}</div>
                            </div>
                            <div class="button-container">
                                <button onclick="editSchedTemp('${id}')" title="Edit time slot.">
                                    <span class="material-icons-outlined edit-sched-btn">
                                        edit
                                    </span>
                                </button>
                                <button onclick="applyDeleteSched('${id}')" title="Remove time slot.">
                                    <span class="material-icons-outlined remove-sched-btn">
                                        close
                                    </span>
                                </button>
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
                    <div class="block add" title="Add time slot.">
                        <button class="add-btn" data-day="mon" onclick="addSchedTemp(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
                    </div>`);

                    tue.push(`
                    <div class="block add" title="Add time slot.">
                        <button class="add-btn" data-day="tue" onclick="addSchedTemp(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
                    </div>`);

                    wed.push(`
                    <div class="block add" title="Add time slot.">
                        <button class="add-btn" data-day="wed" onclick="addSchedTemp(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
                    </div>`);

                    thu.push(`
                    <div class="block add" title="Add time slot.">
                        <button class="add-btn" data-day="thu" onclick="addSchedTemp(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
                    </div>`);

                    fri.push(`
                    <div class="block add" title="Add time slot.">
                        <button class="add-btn" data-day="fri" onclick="addSchedTemp(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
                    </div>`);

                    sat.push(`
                    <div class="block add" title="Add time slot.">
                        <button class="add-btn" data-day="sat" onclick="addSchedTemp(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
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
                    // let monContainer = document.querySelector('#monday .timeslot-container');
                    // let tueContainer = document.querySelector('#tuesday .timeslot-container');
                    // let wedContainer = document.querySelector('#wednesday .timeslot-container');
                    // let thuContainer = document.querySelector('#thursday .timeslot-container');
                    // let friContainer = document.querySelector('#friday .timeslot-container');
                    // let satContainer = document.querySelector('#saturday .timeslot-container');

                    // const mon = [];
                    // const tue = [];
                    // const wed = [];
                    // const thu = [];
                    // const fri = [];
                    // const sat = [];

                    // mon.push(`
                    // <div class="block add">
                    //     <button class="add-btn" data-day="mon" onclick="addSched(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
                    // </div>`);

                    // tue.push(`
                    // <div class="block add">
                    //     <button class="add-btn" data-day="tue" onclick="addSched(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
                    // </div>`);

                    // wed.push(`
                    // <div class="block add">
                    //     <button class="add-btn" data-day="wed" onclick="addSched(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
                    // </div>`);

                    // thu.push(`
                    // <div class="block add">
                    //     <button class="add-btn" data-day="thu" onclick="addSched(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
                    // </div>`);

                    // fri.push(`
                    // <div class="block add">
                    //     <button class="add-btn" data-day="fri" onclick="addSched(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
                    // </div>`);

                    // sat.push(`
                    // <div class="block add">
                    //     <button class="add-btn" data-day="sat" onclick="addSched(this.dataset.day)"><span class="material-icons-outlined">add</span></button>
                    // </div>`);

                    // mon.forEach((item)=>{
                    //     monContainer.innerHTML += item;
                    // })
                    // tue.forEach((item)=>{
                    //     tueContainer.innerHTML += item;
                    // })
                    // wed.forEach((item)=>{
                    //     wedContainer.innerHTML += item;
                    // })
                    // thu.forEach((item)=>{
                    //     thuContainer.innerHTML += item;
                    // })
                    // fri.forEach((item)=>{
                    //     friContainer.innerHTML += item;
                    // })
                    // sat.forEach((item)=>{
                    //     satContainer.innerHTML += item;
                    // })
                }
            }
        }
    }

    xhr.open("POST", "./php/getScheduleTimeSlot.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("schedID="+schedule);


    const xhr2 = new XMLHttpRequest();

    xhr2.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                let range = JSON.parse(this.responseText);
                
                document.querySelector("#editStart").value = range[0];
                document.querySelector("#editEnd").value = range[1];

                document.querySelector("#editStart").setAttribute("data-initial", `${range[0]}`);
                document.querySelector("#editEnd").setAttribute("data-initial", `${range[1]}`);
            }
        }
    }

    xhr2.open("POST", "./php/getSetIDRange.php", true);
    xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr2.send("setID="+schedule);
    
}

function deleteSchedule(){
    confirmModal("Deleting Schedule...", "Are you sure?", "applyDeleteSchedule()");
}

function applyDeleteSchedule(){
    let scheduleSet = document.querySelector("#scheduleSet").value;

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(this.readyState ==4){
            if(this.status == 200){

                if(this.responseText == 1){
                    setTimeout(()=>{
                        showResModal("Schedule has been deleted.");
                        clearSlots();
                        
                        disableScheduleBtn(document.querySelector("#scheduleEdit"));
                        disableScheduleBtn(document.querySelector("#scheduleDlt"));

                        deptChange(document.querySelector("#deptSelect").value);
                    }, 500)
                }
                else{
                    alert("Something went wrong...");
                }
                
                
            }
        }
    }

    xhr.open("POST", "./php/deleteSchedule.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("setID="+scheduleSet);
}

function shortenDate(inputDate) {
    // Create a Date object from the input date string
    var dateObject = new Date(inputDate);

    // Ensure the input date is valid
    if (isNaN(dateObject.getTime())) {
        return "Invalid Date";
    }

    // Define months in short format
    var months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Extract day, month, and year
    var day = dateObject.getDate();
    var month = months[dateObject.getMonth()];
    var year = dateObject.getFullYear();

    // Construct the new date format
    var formattedDate = `${("0" + day).slice(-2)} ${month} ${year}`;

    return formattedDate;
}

function findMissingDays(startDate, endDate) {
    const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const missingDays = [];

    const start = new Date(startDate);
    const end = new Date(endDate);

    for (let current = start; current <= end; current.setDate(current.getDate() + 1)) {
        const currentDayOfWeek = daysOfWeek[current.getDay() - 1]; // Adjust for 0-based index
        if (!missingDays.includes(currentDayOfWeek)) {
            missingDays.push(currentDayOfWeek);
        }
    }

    const presentDays = missingDays.filter(day => daysOfWeek.includes(day));
    const result = daysOfWeek.filter(day => !presentDays.includes(day));

    return result;
}

function markMissedDay(mode){
    let start = null;
    let end = null;

    if(mode == 'add'){
        start = document.querySelector('#addStart').value;
        end = document.querySelector('#addEnd').value;
    }
    else if(mode == 'view'){
        range = convertDateRange(document.querySelector("#scheduleSet").options[document.querySelector("#scheduleSet").selectedIndex].innerText)
        start = range.startDate;
        end = range.endDate;
        
    }
    else if(mode == 'edit'){
        start = document.querySelector('#editStart').value;
        end = document.querySelector('#editEnd').value;
    }
    
    const missingDays = findMissingDays(start,end);
    const dayHeader = document.querySelectorAll(".day-header");

    dayHeader.forEach(day=>{
        if(day.classList.contains('noday')) day.classList.remove('noday');
    });

    missingDays.forEach(element => {
        if(element == 'mon') {
            document.querySelector("#monday .day-header").classList.add("noday");        }
        else if(element == 'tue') document.querySelector("#tuesday .day-header").classList.add("noday");
        else if(element == 'wed') document.querySelector("#wednesday .day-header").classList.add("noday");
        else if(element == 'thu') document.querySelector("#thursday .day-header").classList.add("noday");
        else if(element == 'fri') document.querySelector("#friday .day-header").classList.add("noday");
        else if(element == 'sat') document.querySelector("#saturday .day-header").classList.add("noday");
    });

    console.table(missingDays);
}

function clearMarkMissed(){
    const dayHeader = document.querySelectorAll(".day-header");

    dayHeader.forEach(day=>{
        if(day.classList.contains('noday')) day.classList.remove('noday');
    });
}

function convertDateRange(inputDateRange) {
    // Split the input into start and end date parts
    const dateParts = inputDateRange.split(' - ');

    // Convert each date part to the 'YYYY-MM-DD' format
    const startDate = convertToDateYYYYMMDD(dateParts[0]);
    const endDate = convertToDateYYYYMMDD(dateParts[1]);

    return { startDate, endDate };
}

function convertToDateYYYYMMDD(inputDate) {
    // Convert the input date to a JavaScript Date object
    const dateObject = new Date(inputDate);

    // Extract year, month, and day
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');

    // Format the date as 'YYYY-MM-DD'
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}

function getSchedTimeslots(){
    let appStartDate = document.querySelector("#appStartDate").value;
    let appEndDate = document.querySelector("#appEndDate").value;
    let dept = document.querySelector("#dept").value;

    let startObj = new Date(appStartDate);
    let endObj = new Date(appEndDate);

    if(appStartDate == "" && appEndDate == ""){
        removeAllChildNodes(document.querySelector("#timeslot"));

        let optionElement = document.createElement("option");

        optionElement.value = "all";

        optionElement.selected = true;

        let optionText = document.createTextNode("All");

        optionElement.appendChild(optionText);

        document.querySelector("#timeslot").appendChild(optionElement);    
        document.querySelector("#timeslot").setAttribute("disabled", "disabled");
        return;
    }
    else if(startObj > endObj){
        showError("Appointment date start cannot be later than end date");
        return;
    }
    else{
        showError();
    }

    document.querySelector("#timeslot").removeAttribute("disabled");


    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                const timeSlot = document.querySelector("#timeslot");
                removeAllChildNodes(timeSlot);

                // console.log(this.responseText)
                try {

                    let lengthOfInactive = 0;
                    let arrOfObj = JSON.parse(this.responseText);

                    // Add all timeslot option
                    let optionElement = document.createElement("option");
                    optionElement.value = "all";
                    optionElement.selected = true;
                    let optionText = document.createTextNode("All");
                    optionElement.appendChild(optionText);
                    timeSlot.appendChild(optionElement);      
                    
                    if(arrOfObj.length == 0){
                        removeAllChildNodes(timeSlot);
                        let optionElement = document.createElement("option");

                        optionElement.value = "";
                        optionElement.selected = true;
                        optionElement.setAttribute("hidden", "hidden");
    
                        let optionText = document.createTextNode("No time slot");
                        optionElement.appendChild(optionText);
    
                        timeSlot.appendChild(optionElement);
                        timeSlot.setAttribute("disabled", "disabled");

                        document.querySelector("#inactiveCB").setAttribute("disabled", "disabled");
                    }
                    else{
                        document.querySelector("#inactiveCB").removeAttribute("disabled");
                        timeSlot.removeAttribute("disabled");
                        if(dept != "all"){
                            arrOfObj.forEach(item => {
                                let option = document.createElement("option");
                                // Set attributes for the option element using the item properties
                                option.value = item.scheduleID;
                                option.textContent = `${item.day[0].toUpperCase()+ item.day.substring(1)} @ ${item.startTime} - ${item.stopTime} => ${shortenDate(item.startDate)} - ${shortenDate(item.endDate)}`;

                                if(item.slotActive == "0" || item.setActive == "0"){
                                   option.classList.add("inactive-slot-set");
                                   lengthOfInactive++;
                                }
                                else{
                                    option.classList.add("active-slot-set");
                                }
        
                                // Append the option element to the select element
                                timeSlot.appendChild(option);
                            })
                        }else{
                            arrOfObj.forEach(item => {
                                let option = document.createElement("option");
        
                                const dept = ['ENT', 'Hematology', 'Internal Medicine', 'Internal Medicine Clearance', 'Nephrology', 'Neurology', 'OB GYNE New', 'OB GYNE Old', 'OB GYNE ROS', 'Oncology', 'Pediatric Cardiology', 'Pediatric Clearance', 'Pediatric General', 'Psychiatry New', 'Psychiatry Old', 'Surgery', 'Surgery ROS'];
        
                                let deptName = dept[item.deptID-1];
                                // Set attributes for the option element using the item properties
                                option.value = item.scheduleID;
                                option.textContent = `${deptName} (${item.day[0].toUpperCase()+ item.day.substring(1)} @ ${item.startTime} - ${item.stopTime} => ${shortenDate(item.startDate)} - ${shortenDate(item.endDate)})`;
                                

                                if(item.slotActive == "0" || item.setActive == "0"){
                                    option.classList.add("inactive-slot-set");
                                    lengthOfInactive++;
                                 }
                                 else{
                                    option.classList.add("active-slot-set");
                                }
        
                                // Append the option element to the select element
                                timeSlot.appendChild(option);
                            })
                        }

                        if(arrOfObj.length == lengthOfInactive) {
                            timeSlot.setAttribute("disabled", "disabled");
                            timeSlot.innerHTML += `<option id="noactiveTS" value="" selected>No active time slot</option>`;
                        }
                    }
                                     
                } catch (error) {
                    removeAllChildNodes(timeSlot);
                    let optionElement = document.createElement("option");

                    optionElement.value = "";
                    optionElement.selected = true;
                    optionElement.setAttribute("hidden", "hidden");

                    let optionText = document.createTextNode("No time slot");
                    optionElement.appendChild(optionText);

                    timeSlot.appendChild(optionElement);
                    timeSlot.setAttribute("disabled", "disabled");

                    document.querySelector("#inactiveCB").setAttribute("disabled", "disabled");
                }
                showInactiveTS()
            }
        }
    }

    xhr.open("POST", "./php/getSchedTimeslots.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`appStart=${appStartDate}&appEnd=${appEndDate}&dept=${dept}`)
}

function setupViewApp(){
    let appStartDate = document.querySelector("#appStartDate");
    let appEndDate = document.querySelector("#appEndDate");

    const curDate = new Date();

    let year = curDate.getFullYear();
    let month = curDate.getMonth()+1;
    let date = curDate.getDate();

    if(month.toString().length == 1){
        month = "0" + month.toString();
    }

    if(date.toString().length == 1){
        date = "0" + date.toString();
    }

    appStartDate.value = `${year}-${month}-${date}`;
    appEndDate.value = `${year}-${month}-${date}`;

    getSchedTimeslots();
    insertMunicipality();
    insertBarangay();
    viewAppointments();
}

function showInactiveTS(){
    let showInactive = document.querySelector("#inactiveCB").checked;
    let inactives = document.querySelectorAll(".inactive-slot-set");
    let actives = document.querySelectorAll(".active-slot-set");

    if(showInactive){
        inactives.forEach(item=>{
            item.style.display = "unset";
        })

        if(inactives.length != 0 || actives.length == 0){
            document.querySelector("#timeslot").removeAttribute("disabled");
            document.querySelector("#noactiveTS").remove();
        }

    }
    else{
        inactives.forEach(item=>{
            item.style.display = "none";
        })

        if(actives.length == 0){
            document.querySelector("#timeslot").setAttribute("disabled", "disabled");
            document.querySelector("#timeslot").innerHTML += `<option id="noactiveTS" selected>No active time slot</option>`;
        }

    }
}

function viewAppointments(){
    const deptID = document.querySelector("#dept").value;
    const appDateFrom = document.querySelector("#appStartDate").value;
    const appDateTo = document.querySelector("#appEndDate").value;
    const timeslotID = document.querySelector("#timeslot").value;
    const sex = document.querySelector("#sex").value;
    const province = document.querySelector("#province").value;
    const municipality = document.querySelector("#municipality").value;
    const barangay = document.querySelector("#barangay").value;
    const patientType = document.querySelector("#patientType").value;
    const caseNo = document.querySelector("#caseNo").value;
    const visitType = document.querySelector("#visitType").value;
    const schedVia = document.querySelector("#scheduledThrough").value;
    const status = document.querySelector("#status").value;
    const lastName = document.querySelector("#lastName").value.toLowerCase().trim();
    const firstName = document.querySelector("#firstName").value.toLowerCase().trim();
    const middleName = document.querySelector("#middleName").value.toLowerCase().trim();
    const subDateFrom = document.querySelector("#subStartDate").value;
    const subDateTo = document.querySelector("#subEndDate").value;

    let appStartObj = new Date(appDateFrom);
    let appEndObj = new Date(appDateTo);

    let subStartObj = new Date(subDateFrom);
    let subEndObj = new Date(subDateTo);

    if(appStartObj > appEndObj){
        showError("Appointment date start cannot be later than end date");
        return;
    }
    if (!isLettersOnly(lastName)){
        showError("Last name can only contain letters");
        return false;
    }
    if (!isLettersOnly(firstName)){
        showError("First name can only contain letters");
        return false;
    }
    if (!isLettersOnly(middleName)){
        showError("Middle name can only contain letters");
        return false;
    }
    if(subStartObj > subEndObj){
        showError("Submitted date start cannot be later than end date");
        return;
    }
    showError();

    const filter = {
        deptID: deptID,
        appDateFrom: appDateFrom,
        appDateTo: appDateTo,
        timeslotID: timeslotID,
        sex: sex,
        province: province,
        municipality: municipality,
        barangay: barangay,
        patientType: patientType,
        caseNo: caseNo,
        visitType: visitType,
        schedVia: schedVia,
        status: status,
        lastName: lastName,
        firstName: firstName,
        middleName: middleName,
        subDateFrom: subDateFrom,
        subDateTo: subDateTo,
        sortBy: universalSort,
        sortState: universalSortStatus,
    };

    console.table(filter);

    const toSend = JSON.stringify(filter);

    const xhr = new XMLHttpRequest();
    
    // xhr.onreadystatechange = function(){
    //     if(this.readyState == 4){
    //         if(this.status == 200){
    //             try {
    //                 console.log(this.responseText)
    //                 // const obj = JSON.parse(this.responseText);

    //                 obj.forEach(app=>{



    //                 });

    //             } catch (error) {
                    
    //             }
    //         }
    //     }
    // }
    let table = document.querySelector('.schedule-table tbody');
    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                console.log(this.responseText)
                try {
                    // console.log(this.responseText)
                    removeAllChildNodes(table);
                    const arrOfObj = JSON.parse(this.responseText);

                    arrOfObj.forEach(item=>{
                        const dept = ['ENT', 'Hematology', 'Internal Medicine', 'Internal Medicine Clearance', 'Nephrology', 'Neurology', 'OB GYNE New', 'OB GYNE Old', 'OB GYNE ROS', 'Oncology', 'Pediatric Cardiology', 'Pediatric Clearance', 'Pediatric General', 'Psychiatry New', 'Psychiatry Old', 'Surgery', 'Surgery ROS'];
                        let deptName = dept[item.departmentID-1];
                        let sex = item.sex == 'm' ? 'Male' : 'Female';
                        let time = "";
                        if(item.startTime != "" && item.stopTime != "") time = `${item.startTime} - ${item.stopTime}`;
                        if (item.cancelReason == null) item.cancelReason = "";

                        // row
                        let tr = document.createElement("tr");
                        tr.classList.add("table-row");
                        tr.setAttribute("title", "Click to highlight/see more.");

                        // td/s

                        // appID
                        let td1 = document.createElement("td");
                        td1.innerText = item.appointmentID;
                        tr.appendChild(td1);

                        // name
                        let td2 = document.createElement("td");
                        td2.classList.add("always-visible");
                        td2.innerText = `${capitalFirstLetter(item.lastName)}, ${capitalFirstLetter(item.firstName)} ${capitalFirstLetter(item.middleName)}`;
                        tr.appendChild(td2);

                        // reference
                        let td3 = document.createElement("td");
                        td3.classList.add("always-visible");
                        td3.innerText = `${generateCode(item.rawAppDate, item.departmentID, item.scheduleID, item.appointmentID)}`;
                        tr.appendChild(td3);

                        // deptName
                        let td4 = document.createElement("td");
                        td4.classList.add("always-visible");
                        td4.innerText = deptName;
                        tr.appendChild(td4);

                        // consultation
                        let td5 = document.createElement("td");
                        td5.innerText = item.consultation;
                        tr.appendChild(td5);

                        // appDate
                        let td6 = document.createElement("td");
                        td6.classList.add("always-visible");
                        td6.innerText = item.appointmentDate;
                        tr.appendChild(td6);

                        // time
                        let td7 = document.createElement("td");
                        td7.innerText = time;
                        tr.appendChild(td7);

                        // status
                        let td8 = document.createElement("td");
                        td8.classList.add(`${item.appointmentStatus}`);
                        td8.setAttribute("id", `status_${item.appointmentID}`);
                        td8.innerText = capitalFirstLetter(item.appointmentStatus);
                        tr.appendChild(td8);

                        // schedVia
                        let td9 = document.createElement("td");
                        td9.innerText = capitalFirstLetter(item.appointmentType);
                        tr.appendChild(td9);

                        // sex
                        let td10 = document.createElement("td");
                        td10.innerText = sex;
                        tr.appendChild(td10);

                        // birthdate
                        let td11 = document.createElement("td");
                        td11.innerText = item.birthdate;
                        tr.appendChild(td11);

                        // phone
                        let td12 = document.createElement("td");
                        td12.innerText = item.phone;
                        tr.appendChild(td12);

                        // address
                        let td13 = document.createElement("td");
                        td13.classList.add("always-visible");
                        td13.innerText = `${capitalFirstLetter(item.barangay)}, ${capitalFirstLetter(item.municipality)}, ${capitalFirstLetter(item.province)}`;
                        tr.appendChild(td13);

                        // patient type
                        let td14 = document.createElement("td");
                        td14.innerText = capitalFirstLetter(item.patientType);
                        tr.appendChild(td14);

                        // case no
                        let td15 = document.createElement("td");
                        td15.innerText = item.caseNo;
                        tr.appendChild(td15);

                        // date submitted
                        let td19 = document.createElement("td");
                        td19.classList.add("always-visible");
                        td19.innerText = item.dateSubmitted;
                        tr.appendChild(td19);

                        // cancel reason
                        let td16 = document.createElement("td");
                        td16.setAttribute("id", `statusCancel_${item.appointmentID}`);
                        td16.innerText = item.cancelReason;
                        tr.appendChild(td16);

                        // edit
                        let td17 = document.createElement("td");

                        let editBtn = document.createElement('button');

                        editBtn.title = 'Change appointment status.';
                        editBtn.className = `editBtn ${item.appointmentStatus != 'scheduled' ? 'edit-disabled' : ''}`;
                        editBtn.setAttribute('data-appid', item.appointmentID);
                        editBtn.setAttribute('data-status', item.appointmentStatus);
                        editBtn.textContent = 'Edit Status';

                        editBtn.onclick = function() {
                            editStatus(this.dataset.appid, this.dataset.status);
                        };

                        if (item.appointmentStatus != 'scheduled') {
                            editBtn.disabled = true;
                        }

                        td17.append(editBtn)
                        tr.appendChild(td17);
                        table.appendChild(tr);
                    });
                    showTableCell();
                } catch (error) {
                    let tr = document.createElement("tr");
                    let td = document.createElement("td");
                    td.setAttribute("colspan", "18");
                    td.classList.add("empty");
                    td.innerText = 'No Result.';

                    tr.appendChild(td);
                    table.appendChild(tr);
                    // table.innerHTML = 
                    // `
                    // <tr>
                    //     <td colspan="18" class="empty">No result.</td>
                    // </tr>
                    // `;
                }
            }
        }
        else{

            let tr = document.createElement("tr");
                    let td = document.createElement("td");
                    td.setAttribute("colspan", "18");
                    td.classList.add("empty");
                    td.innerText = 'Loading...';

                    tr.appendChild(td);
                    table.appendChild(tr);
            // table.innerHTML = 
            // `
            // <tr>
            //     <td colspan="18" class="empty">Loading...</td>
            // </tr>
            // `;
        }
        setupTablePagination('schedule-table', 'prevButton', 'nextButton', 10);
    };

    xhr.open("POST", "./php/getFilterApps.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(toSend);
}

// function resetTHead(){
//     const headers = document.querySelectorAll("th[data-sortState]");

//     headers.forEach(el=>{
//         el.setAttribute('data-sortState', '0');
//     })

// }

function insertMunicipality(){
    let provinceSelect = document.querySelector("#province").value;
    let municipalitySelect = document.querySelector("#municipality");
    let barangaySelect = document.querySelector("#barangay");

    removeAllChildNodes(municipalitySelect);

    const newMunicipality = document.createElement('option');
    newMunicipality.innerText = 'All';
    
    newMunicipality.value = 'all';

    newMunicipality.setAttribute("selected", "selected");

    municipalitySelect.appendChild(newMunicipality);

    const municipalityList = ['angat', 'balagtas', 'baliwag', 'bocaue', 'bulakan', 'bustos', 'calumpit', 'doña remedios trinidad', 'guiguinto', 'hagonoy', 'malolos', 'marilao', 
    'meycauayan', 'norzagaray', 'obando', 'pandi', 'paombong', 'plaridel', 'pulilan', 'san ildefonso', 'san jose del monte', 'san miguel', 'san rafael', 'santa maria'];

    municipalityList.forEach((item)=>{
        processedItem = item.substring(0, 1).toUpperCase() + item.substring(1);
    
        for(i = 0; i < item.length; i++){
            if(processedItem[i] == ' '){
                let splitStr = processedItem.toLowerCase().split(' ');
                for (j = 0; j < splitStr.length; j++) {
                    // You do not need to check if i is larger than splitStr length, as your for does that for you
                    // Assign it back to the array
                    splitStr[j] = splitStr[j].charAt(0).toUpperCase() + splitStr[j].substring(1);     
                }
    
                processedItem = splitStr.join(' ');
                break;
            }
        };
    
        const newMunicipality = document.createElement('option');
        newMunicipality.innerText = processedItem;
        newMunicipality.setAttribute('value', item);
    
    
        municipalitySelect.appendChild(newMunicipality);
    });

    barangaySelect.removeAttribute("disabled");
    municipalitySelect.removeAttribute("disabled");

    if(provinceSelect == "all"){
        removeAllChildNodes(municipalitySelect);
        removeAllChildNodes(barangaySelect);

        const newMunicipality = document.createElement('option');
        newMunicipality.innerText = "All";
        newMunicipality.setAttribute('value', 'all');

        const newBarangay = document.createElement('option');
        newBarangay.innerText = "All";
        newBarangay.setAttribute('value', 'all');

        municipalitySelect.appendChild(newMunicipality);
        barangaySelect.appendChild(newBarangay);

        // barangaySelect.setAttribute("disabled", "disabled");
        // municipalitySelect.setAttribute("disabled", "disabled");
    }
    else if(provinceSelect == "other"){
        removeAllChildNodes(municipalitySelect);
        removeAllChildNodes(barangaySelect);

        const newMunicipality = document.createElement('option');
        newMunicipality.innerText = "Other";
        newMunicipality.setAttribute('value', 'other');

        const newBarangay = document.createElement('option');
        newBarangay.innerText = "Other";
        newBarangay.setAttribute('value', 'other');

        municipalitySelect.appendChild(newMunicipality);
        barangaySelect.appendChild(newBarangay);

        // barangaySelect.setAttribute("disabled", "disabled");
        // municipalitySelect.setAttribute("disabled", "disabled");
    }
    else{
        removeAllChildNodes(barangaySelect);

        const newBarangay = document.createElement('option');
        newBarangay.innerText = "All";
        newBarangay.setAttribute('value', 'all');

        barangaySelect.appendChild(newBarangay);

        // barangaySelect.removeAttribute("disabled");
        // municipalitySelect.removeAttribute("disabled");
    }

    viewAppointments()
}

function insertBarangay(){
    let provinceSelect = document.querySelector("#province").value;
    let municipalitySelect = document.querySelector("#municipality").value;
    let barangaySelect = document.querySelector("#barangay");

    const barangaylist = {
        'angat': [
          'banaban', 'baybay', 'binagbag', 'donacion', 'encanto', 'laog', 'marungko',
          'niugan', 'paltok', 'pulong yantok', 'san roque', 'santa cruz', 'santa lucia',
          'santo cristo', 'sulucan', 'taboc'
        ],
        'balagtas': [
          'borol 1st', 'borol 2nd', 'dalig', 'longos', 'panginay', 'pulong gubat',
          'san juan', 'santol', 'wawa'
        ],
        'baliwag': [
          'bagong nayon', 'barangca', 'calantipay', 'catulinan', 'concepcion',
          'hinukay', 'makinabang', 'matangtubig', 'pagala', 'paitan', 'piel',
          'pinagbarilan', 'poblacion', 'sabang', 'san jose', 'san roque',
          'santa barbara', 'santo cristo', 'santo niño', 'subic', 'sulivan',
          'tangos', 'tarcan', 'tiaong', 'tibag', 'tilapayong', 'virgen delas flores'
        ],
        'bocaue': [
          'antipona', 'bagumbayan', 'bambang', 'batia', 'biñang 1st', 'biñang 2nd',
          'bolacan', 'bundukan', 'bunlo', 'caingin', 'duhat', 'igulot', 'lolomboy',
          'poblacion', 'sulucan', 'taal', 'tambobong', 'turo', 'wakas'
        ],
        'bulakan': [
          'bagumbayan', 'balubad', 'bambang', 'matungao', 'maysantol', 'perez',
          'pitpitan', 'san francisco', 'san jose', 'san nicolas', 'santa ana',
          'santa ines', 'taliptip', 'tibig'
        ],
        'bustos': [
          'bonga mayor', 'bonga menor', 'buisan', 'camachilihan', 'cambaog',
          'catacte', 'liciada', 'malamig', 'malawak', 'poblacion',
          'san pedro', 'talampas', 'tanawan', 'tibagan'
        ],
        'calumpit': [
          'balite', 'balungao', 'buguion', 'bulusan', 'calizon',
          'calumpang', 'caniogan', 'corazon', 'frances', 'gatbuca',
          'gugo', 'iba este', 'iba o este', 'longos', 'meysulao',
          'meyto', 'palimbang', 'panducot', 'pio cruzcosa', 'poblacion',
          'pungo', 'san jose', 'san marcos', 'san miguel', 'santa lucia',
          'santo niño', 'sapang bayan', 'sergio bayan', 'sucol'
        ],
        'doña remedios trinidad': [
          'bayabas', 'camachile', 'camachin', 'kabayunan', 'kalawakan',
          'pulong sampalok', 'sapang bulak', 'talbak'
        ],
        'guiguinto': [
          'cutcut', 'daungan', 'ilang-ilang', 'malis', 'panginay',
          'poblacion', 'pritil', 'pulong gubat', 'santa cruz', 'santa rita',
          'tabang', 'tabe', 'tiaong', 'tuktukan'
        ],
        'hagonoy': [
          'abulalas', 'carillo', 'iba', 'iba-ibayo', 'mercado',
          'palapat', 'pugad', 'sagrada familia', 'san agustin', 'san isidro',
          'san jose', 'san juan', 'san miguel', 'san nicolas', 'san pablo',
          'san pascual', 'san pedro', 'san roque', 'san sebastian', 'santa cruz',
          'santa elena', 'santa monica', 'santo niño', 'santo rosario', 'tampok',
          'tibaguin'
        ],
        'malolos': [
          'anilao', 'atlag', 'babatnin', 'bagna', 'bagong bayan',
          'balayong', 'balite', 'bangkal', 'barihan', 'bulihan',
          'bungahan', 'caingin', 'calero', 'caliligawan', 'canalate',
          'caniogan', 'catmon', 'cofradia', 'dakila', 'guinhawa',
          'ligas', 'liyang', 'longos', 'look 1st', 'look 2nd',
          'lugam', 'mabolo', 'mambog', 'masile', 'matimbo',
          'mojon', 'namayan', 'niugan', 'pamarawan', 'panasahan',
          'pinagbakahan', 'san agustin', 'san gabriel', 'san juan', 'san pablo',
          'san vicente', 'santiago', 'santisima trinidad', 'santo cristo', 'santo niño',
          'santo rosario', 'santol', 'sumapang bata', 'sumapang matanda', 'taal',
          'tikay'
        ],
        'marilao': [
          'abangan norte', 'abangan sur', 'ibayo', 'lambakin', 'lias',
          'loma de gato', 'nagbalon', 'patubig', 'poblacion I', 'poblacion II',
          'prenza I', 'prenza II', 'santa rosa I', 'santa rosa II', 'saog',
          'tabing ilog'
        ],
        'meycauayan': [
          'bagbaguin', 'bahay pare', 'bancal', 'banga', 'bayugo',
          'caingin', 'calvario', 'camalig', 'hulo', 'iba',
          'langka', 'lawa', 'libtong', 'liputan', 'longos',
          'malhacan', 'pajo', 'pandayan', 'pantoc', 'perez',
          'poblacion', 'saint francis', 'saluysoy', 'tugatog', 'ubihan',
          'zamora'
        ],
        'norzagaray': [
          'bangkal', 'baraka', 'bigte', 'bitungol', 'friendship village resources',
          'matictic', 'minuyan', 'partida', 'pinagtulayan', 'poblacion',
          'san lorenzo', 'san mateo', 'tigbe'
        ],
        'obando': [
          'binuangan', 'catanghalan', 'hulo', 'lawa', 'paco',
          'pag-asa', 'paliwas', 'panghulo', 'salambao', 'san pascual',
          'tawiran'
        ],
        'pandi': [
          'bagbaguin', 'bagong barrio', 'baka-bakahan', 'bunsuran I', 'bunsuran II', 'bunsuran III',
          'cacarong bata', 'cacarong matanda', 'cupang', 'malibong bata', 'malibong matanda',
          'manatal', 'mapulang lupa', 'masagana', 'masuso', 'pinagkuartelan', 'poblacion',
          'real de cacarong', 'san roque', 'santo niño', 'siling bata', 'siling matanda'
        ],
        'paombong': [
          'binakod', 'kapitangan', 'malumot', 'masukol', 'pinalagdan', 'poblacion', 'san isidro I',
          'san isidro II', 'san jose', 'san roque', 'san vicente', 'santa cruz', 'santo niño', 'santo rosario'
        ],
        'plaridel': [
          'agnaya', 'bagong silang', 'banga I', 'banga II', 'bintog', 'bulihan', 'culianin',
          'dampol', 'lagundi', 'lalangan', 'lumang bayan', 'parulan', 'poblacion', 'rueda',
          'san jose', 'santa ines', 'santo niño', 'sipat', 'tabang'
        ],
        'pulilan': [
          'balatong A', 'balatong B', 'cutcot', 'dampol I', 'dampol II-A', 'dampol II-B', 'dulong malabon',
          'inaon', 'longos', 'lumbac', 'paltao', 'penabatan', 'poblacion', 'santa peregrina', 'santo cristo',
          'taal', 'tabon', 'tibag', 'tinejero'
        ],
        'san ildefonso': [
          'akle', 'alagao', 'anyatam', 'bagong barrio', 'basuit', 'bubulong malaki', 'bubulong munti',
          'buhol na mangga', 'bulusukan', 'calasag', 'calawitan', 'casalat', 'gabihan', 'garlang',
          'lapnit', 'maasim', 'makapilapil', 'malipampang', 'mataas na parang', 'matimbubong',
          'nabaong garlang', 'palapala', 'pasong bangkal', 'pinaod', 'poblacion', 'pulong tamo',
          'san juan', 'santa catalina bata', 'santa catalina matanda', 'sapang dayap', 'sapang putik',
          'sapang putol', 'sumandig', 'telepatio', 'umpucan', 'upig'
        ],
        'san jose del monte': [
          'assumption','bagong buhay', 'bagong buhay II', 'bagong buhay III', 'citrus', 'ciudad real',
          'dulong bayan', 'fatima', 'fatima II', 'fatima III', 'fatima IV', 'fatima V',
          'francisco homes-guijo', 'francisco homes-mulawin', 'francisco homes-narra',
          'francisco homes-yakal', 'gaya-gaya', 'graceville', 'gumaoc central', 'gumaoc east',
          'gumaoc west', 'kaybanban', 'kaypian', 'lawang pari', 'maharlika', 'minuyan',
          'minuyan II', 'minuyan III', 'minuyan IV', 'minuyan proper', 'minuyan V', 'muzon',
          'paradise III', 'poblacion', 'poblacion I', 'saint martin de porres', 'san isidro',
          'san manuel', 'san martin', 'san martin II', 'san martin III', 'san martin IV',
          'san pedro', 'san rafael', 'san rafael I', 'san rafael III', 'san rafael IV',
          'san rafael V', 'san roque', 'santa cruz', 'santa cruz II', 'santa cruz III',
          'santa cruz IV', 'santa cruz V', 'santo cristo', 'santo niño', 'santo niño II',
          'sapang palay', 'tungkong mangga'
        ],
        'san miguel': [
          'bagong pag-asa', 'bagong silang', 'balaong', 'balite', 'bantog', 'bardias',
          'baritan', 'batasan bata', 'batasan matanda', 'biak-na-bato', 'biclat', 'buga',
          'buliran', 'bulualto', 'calumpang', 'cambio', 'camias', 'ilog-bulo', 'king kabayo',
          'labne', 'lambakin', 'magmarale', 'malibay', 'maligaya', 'mandile', 'masalipit',
          'pacalag', 'paliwasan', 'partida', 'pinambaran', 'poblacion', 'pulong bayabas',
          'pulong duhat', 'sacdalan', 'salacot', 'salangan', 'san agustin', 'san jose',
          'san juan', 'san vicente', 'santa ines', 'santa lucia', 'santa rita bata',
          'santa rita matanda', 'sapang', 'sibul', 'tartaro', 'tibagan', 'tigpalas'
        ],
        'san rafael': [
          'bma-balagtas', 'banca-banca', 'caingin', 'capihan', 'coral na bato', 'cruz na daan',
          'dagat-dagatan', 'diliman I', 'diliman II', 'libis', 'lico', 'maasim', 'mabalas-balas',
          'maguinao', 'maronguillo', 'paco', 'pansumaloc', 'pantubig', 'pasong bangkal',
          'pasong callos', 'pasong intsik', 'pinacpinacan', 'poblacion', 'pulo',
          'pulong bayabas', 'salapungan', 'sampaloc', 'san agustin', 'san roque',
          'sapang pahalang', 'talacsan', 'tambubong', 'tukod', 'ulingao'
        ],
        'santa maria': [
          'bagbaguin', 'balasing', 'buenavista', 'bulac', 'camangyanan', 'catmon', 'cay pombo',
          'caysio', 'guyong', 'lalakhan', 'mag-asawang sapa', 'mahabang parang', 'manggahan',
          'parada', 'poblacion', 'pulong buhangin', 'san gabriel', 'san jose patag',
          'san vicente', 'santa clara', 'santa cruz', 'silangan', 'tabing bakod', 'tumana'
        ]
    };

    removeAllChildNodes(barangaySelect);

    if(municipalitySelect == "all"){
        const newBarangay = document.createElement('option');
        newBarangay.innerText = 'All';
        newBarangay.value = 'all';

        barangaySelect.appendChild(newBarangay);

        // barangaySelect.setAttribute("disabled", "disabled");
    }
    else if(municipalitySelect == "other"){
        const newBarangay = document.createElement('option');
        newBarangay.innerText = 'Other';
        newBarangay.value = 'other';

        barangaySelect.appendChild(newBarangay);

        // barangaySelect.setAttribute("disabled", "disabled");
    }
    else{
        let barangayContainer = barangaylist[municipalitySelect];

        let temp = document.createElement('option');
        temp.setAttribute('value', 'all');
        temp.innerText = 'All';
        barangay.appendChild(temp);

        barangayContainer.forEach((item)=>{

            processedItem = item.substring(0, 1).toUpperCase() + item.substring(1);
    
            for(i = 0; i < item.length; i++){
                if(processedItem[i] == ' '){
                    let splitStr = processedItem.split(' ');
                    for (j = 0; j < splitStr.length; j++) {
                        splitStr[j] = splitStr[j].charAt(0).toUpperCase() + splitStr[j].substring(1);     
                    }
                    processedItem = splitStr.join(' ');
                    break;
                }
            };
    
            let temp = document.createElement('option');
            temp.setAttribute('value', item);
            temp.innerHTML = processedItem;
            barangay.appendChild(temp);
        });

        // barangaySelect.removeAttribute("disabled");
    }
    viewAppointments()
}

function setupAdminLogs(){
    let from = document.querySelector("#from");
    let to = document.querySelector("#to");

    let curDate = new Date();

    from.value = `${curDate.getFullYear()}-${curDate.getMonth()+1}-${curDate.getDate()}`;
    to.value = `${curDate.getFullYear()}-${curDate.getMonth()+1}-${curDate.getDate()}`;
}

function appointmentSort(sortBy, sortState){
    let th = document.querySelector(`th[data-sortby=${sortBy}]`);
    let newState = null;

    let span = document.createElement("span");
    span.classList.add("material-icons-outlined");
    span.classList.add("sort");

    // 1 = ASC, 2 = DESC, 0 = DEFAULT
    if(sortState == 0){
        try {
            document.querySelector('.sort').remove();  
        } catch (error) {
            
        }

        th.setAttribute("data-sortState", "1");

        span.innerText = 'arrow_drop_up';
        th.appendChild(span);

        newState = 1;
    }
    else if(sortState == 1){
        try {
            document.querySelector('.sort').remove();  
        } catch (error) {
            
        }

        th.setAttribute("data-sortState", "2");

        span.innerText = 'arrow_drop_down';
        th.appendChild(span);

        newState = 2;
    }
    else if(sortState == 2){
        th.setAttribute("data-sortState", "0");
        newState = 0;
        try {
            document.querySelector('.sort').remove();  
        } catch (error) {
            
        }
    }

    universalSort = sortBy;
    universalSortStatus = newState;
    viewAppointments();

}

function adminLogsSort(sortBy, sortState){
    let th = document.querySelector(`th[data-sortby=${sortBy}]`);
    let newState = null;

    let span = document.createElement("span");
    span.classList.add("material-icons-outlined");
    span.classList.add("sort");

    // 1 = ASC, 2 = DESC, 0 = DEFAULT
    if(sortState == 0){
        try {
            document.querySelector('.sort').remove();  
        } catch (error) {
            
        }

        th.setAttribute("data-sortState", "1");

        span.innerText = 'arrow_drop_up';
        th.appendChild(span);

        newState = 1;
    }
    else if(sortState == 1){
        try {
            document.querySelector('.sort').remove();  
        } catch (error) {
            
        }

        th.setAttribute("data-sortState", "2");

        span.innerText = 'arrow_drop_down';
        th.appendChild(span);

        newState = 2;
    }
    else if(sortState == 2){
        th.setAttribute("data-sortState", "0");
        newState = 0;
        try {
            document.querySelector('.sort').remove();  
        } catch (error) {
            
        }
    }

    universalSort = sortBy;
    universalSortStatus = newState;
    insertAdminLogs();
}

function requestSort(sortBy, sortState){
    let th = document.querySelector(`th[data-sortby=${sortBy}]`);
    let newState = null;

    let span = document.createElement("span");
    span.classList.add("material-icons-outlined");
    span.classList.add("sort");

    // 1 = ASC, 2 = DESC, 0 = DEFAULT
    if(sortState == 0){
        try {
            document.querySelector('.sort').remove();  
        } catch (error) {
            
        }

        th.setAttribute("data-sortState", "1");

        span.innerText = 'arrow_drop_up';
        th.appendChild(span);

        newState = 1;
    }
    else if(sortState == 1){
        try {
            document.querySelector('.sort').remove();  
        } catch (error) {
            
        }

        th.setAttribute("data-sortState", "2");

        span.innerText = 'arrow_drop_down';
        th.appendChild(span);

        newState = 2;
    }
    else if(sortState == 2){
        th.setAttribute("data-sortState", "0");
        newState = 0;
        try {
            document.querySelector('.sort').remove();  
        } catch (error) {
            
        }
    }

    universalSort = sortBy;
    universalSortStatus = newState;
    insertReq();
}

function adminListSort(sortBy, sortState){
    let th = document.querySelector(`th[data-sortby=${sortBy}]`);
    let newState = null;

    let span = document.createElement("span");
    span.classList.add("material-icons-outlined");
    span.classList.add("sort");

    // 1 = ASC, 2 = DESC, 0 = DEFAULT
    if(sortState == 0){
        try {
            document.querySelector('.sort').remove();  
        } catch (error) {
            
        }

        th.setAttribute("data-sortState", "1");

        span.innerText = 'arrow_drop_up';
        th.appendChild(span);

        newState = 1;
    }
    else if(sortState == 1){
        try {
            document.querySelector('.sort').remove();  
        } catch (error) {
            
        }

        th.setAttribute("data-sortState", "2");

        span.innerText = 'arrow_drop_down';
        th.appendChild(span);

        newState = 2;
    }
    else if(sortState == 2){
        th.setAttribute("data-sortState", "0");
        newState = 0;
        try {
            document.querySelector('.sort').remove();  
        } catch (error) {
            
        }
    }

    universalSort = sortBy;
    universalSortStatus = newState;
    insertAdmin();
};

function postedAnnSort(sortBy, sortState){
    let th = document.querySelector(`th[data-sortby=${sortBy}]`);
    let newState = null;

    let span = document.createElement("span");
    span.classList.add("material-icons-outlined");
    span.classList.add("sort");

    // 1 = ASC, 2 = DESC, 0 = DEFAULT
    if(sortState == 0){
        try {
            document.querySelector('.sort').remove();  
        } catch (error) {
            
        }

        th.setAttribute("data-sortState", "1");

        span.innerText = 'arrow_drop_up';
        th.appendChild(span);

        newState = 1;
    }
    else if(sortState == 1){
        try {
            document.querySelector('.sort').remove();  
        } catch (error) {
            
        }

        th.setAttribute("data-sortState", "2");

        span.innerText = 'arrow_drop_down';
        th.appendChild(span);

        newState = 2;
    }
    else if(sortState == 2){
        th.setAttribute("data-sortState", "0");
        newState = 0;
        try {
            document.querySelector('.sort').remove();  
        } catch (error) {
            
        }
    }

    universalSort = sortBy;
    universalSortStatus = newState;
    insertPostedAnn();
};

function blockSort(sortBy, sortState){
    let th = document.querySelector(`th[data-sortby=${sortBy}]`);
    let newState = null;

    let span = document.createElement("span");
    span.classList.add("material-icons-outlined");
    span.classList.add("sort");

    // 1 = ASC, 2 = DESC, 0 = DEFAULT
    if(sortState == 0){
        try {
            document.querySelector('.sort').remove();  
        } catch (error) {
            
        }

        th.setAttribute("data-sortState", "1");

        span.innerText = 'arrow_drop_up';
        th.appendChild(span);

        newState = 1;
    }
    else if(sortState == 1){
        try {
            document.querySelector('.sort').remove();  
        } catch (error) {
            
        }

        th.setAttribute("data-sortState", "2");

        span.innerText = 'arrow_drop_down';
        th.appendChild(span);

        newState = 2;
    }
    else if(sortState == 2){
        th.setAttribute("data-sortState", "0");
        newState = 0;
        try {
            document.querySelector('.sort').remove();  
        } catch (error) {
            
        }
    }

    universalSort = sortBy;
    universalSortStatus = newState;
    insertBlockDate();
};

function feedbackSort(sortBy, sortState){
    let th = document.querySelector(`th[data-sortby=${sortBy}]`);
    let newState = null;

    let span = document.createElement("span");
    span.classList.add("material-icons-outlined");
    span.classList.add("sort");

    // 1 = ASC, 2 = DESC, 0 = DEFAULT
    if(sortState == 0){
        try {
            document.querySelector('.sort').remove();  
        } catch (error) {
            
        }

        th.setAttribute("data-sortState", "1");

        span.innerText = 'arrow_drop_up';
        th.appendChild(span);

        newState = 1;
    }
    else if(sortState == 1){
        try {
            document.querySelector('.sort').remove();  
        } catch (error) {
            
        }

        th.setAttribute("data-sortState", "2");

        span.innerText = 'arrow_drop_down';
        th.appendChild(span);

        newState = 2;
    }
    else if(sortState == 2){
        th.setAttribute("data-sortState", "0");
        newState = 0;
        try {
            document.querySelector('.sort').remove();  
        } catch (error) {
            
        }
    }

    universalSort = sortBy;
    universalSortStatus = newState;
    getFeedback();
};

function convertCompToPropDate(inputDate) {
    // Create a Date object from the input string
    const dateObject = new Date(inputDate);
  
    // Check if the date is valid
    if (isNaN(dateObject.getTime())) {
      return "Invalid Date";
    }
  
    // Get the components of the date
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(dateObject.getDate()).padStart(2, '0');
  
    // Form the output string in the "YYYY-MM-DD" format
    const outputDate = `${year}-${month}-${day}`;
  
    return outputDate;
  }