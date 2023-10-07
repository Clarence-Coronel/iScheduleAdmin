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
        formErrorMessage = 'Phone # canoot be empty.';
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

    if(formState <= 2){
        formState++;
        
        // formParts.forEach((form)=>{
        //     form.style.display = 'none';
        // });

        if(formState == 1){
            if(checkFormA()){
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
    patient.department = dept;

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
    if(middleName == ""){
        errorHandler("80");
        return false;
    }
    if (!isLettersOnly(middleName)){
        errorHandler("81");
        return false;
    }
    if(middleName.length > 30 || middleName.length == 1){
        errorHandler('82');
        return false;
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
    console.table(patient);
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
                        <tr class="table-row">
                            <td>${item.rate}</td>
                            <td>${item.content}</td>
                            <td title="YYYY-MM-DD">${convertRetrievedDate(item.dateSubmitted)}</td>
                        </tr>
                        `;
    
                        feedbackTable.innerHTML += rowTemplate;
                        
                    });
                    setupTablePagination('feedback-table', 'prevButton', 'nextButton', 10);
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
                        <tr class="table-row">
                            <td>${date}</td>
                            <td>${dateName}</td>
                            <td>${isYearly}</td>
                            <td><button class="removeBtn" id="blockDate-${id}" data-name="${dateName}" onclick="confirmBlockDateRemove(this.id)">Delete</button></td>
                        </tr>
                        `;

                        table.innerHTML += template;
                    })
                } catch (error) {
                    
                }
                setupTablePagination('date-table', 'prevButton', 'nextButton', 10);
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
                        <tr class="table-row">
                            <td>${title}</td>
                            <td>${datePosted}</td>
                            <td>${timePosted}</td>
                            <td>${author}</td>
                            <td><button class="removeBtn" id="ann-${id}" data-title="${title}" onclick="confirmAnnRemove(this.id)">Delete</button></td>
                        </tr>
                        `;

                        table.innerHTML += template;
                    })
                } catch (error) {
                    
                }
                setupTablePagination('ann-table', 'prevButton', 'nextButton', 10);                
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
                        <tr class="table-row">
                            <td>${capitalFirstLetter(lastName)}, ${capitalFirstLetter(firstName)} ${capitalFirstLetter(middleName)}</td>
                            <td>${username}</td>
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
                    
                }
                setupTablePagination('admin-table', 'prevButton', 'nextButton', 10);
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
                    setupTablePagination('logs-table', 'prevButton', 'nextButton', 10);
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

    if(fullDate == "" && activity == "" && adminType == "" && sortBy == ""){
        return;
    }

    let obj = {
        date: fullDate,
        activity: activity,
        adminType: adminType,
        sortBy: sortBy
    }

    let toSend = JSON.stringify(obj);

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
}

function applyDeleteSched(schedID, deptID, day){

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
}

function applyAddSched(day){
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
}

function limitNumbers(id, str){
    let input = document.getElementById(id);
    let newStr = "";

    for(i = 0; i < input.value.length; i++){
        for(j = 0; j < str.length; j++){
            if(input.value[i] == str[j]){
                console.log(str[j])
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

// function exportTableToExcel(tableId, fileName, excludeColumns = []) {
//     var workbook = new ExcelJS.Workbook();
//     var worksheet = workbook.addWorksheet('Sheet 1', { properties: { defaultColWidth: 20 } });
//     var table = document.getElementById(tableId);

//     // Set header row style with background color
//     var headerRow = worksheet.getRow(1);
//     headerRow.eachCell(function(cell) {
//         cell.fill = {
//             type: 'pattern',
//             pattern: 'solid',
//             fgColor: { argb: 'FF434343' }, // RGB(67, 67, 67)
//         };
//         cell.font = { color: { argb: 'FFFFFF' } }; // White text color
//     });

//     Array.from(table.rows).forEach(function(row) {
//         var excelRow = worksheet.addRow([]);
//         Array.from(row.cells).forEach(function(cell, index) {
//             if (!excludeColumns.includes(index)) {
//                 var cellValue = cell.textContent.trim();
//                 var cell = excelRow.getCell(index + 1);
//                 cell.value = cellValue;
//                 cell.alignment = { wrapText: true, horizontal: 'left', vertical: 'middle' };
//             }
//         });
//     });

//     workbook.xlsx.writeBuffer().then(function(buffer) {
//         var blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//         var link = document.createElement('a');
//         link.href = window.URL.createObjectURL(blob);
//         link.download = fileName;
//         link.click();
//     });
// }


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
            fgColor: { argb: 'FF434343' } // rgb(67, 67, 67)
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

function setupTablePagination(tableId, prevButtonId, nextButtonId, rowsPerPage) {
    const table = document.getElementById(tableId);
    const prevButton = document.getElementById(prevButtonId);
    const nextButton = document.getElementById(nextButtonId);
    let currentPage = 1;
    let pageNum = document.querySelector("#pageNum");

    const tableRows = table.querySelectorAll('.table-row');
    const totalPages = Math.ceil(tableRows.length / rowsPerPage);
    
    pageNum.innerText = '1';

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

    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            pageNum.innerText = currentPage;
            showRows(currentPage);
        } else {
            pageNum.classList.add('error-animate');
            pageNum.style.color = 'red';
            setTimeout(()=>{
                pageNum.classList.remove('error-animate');
                pageNum.style.color = 'rgb(80, 78, 78)';
            },500)
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            pageNum.innerText = currentPage;
            showRows(currentPage);
        } else {
            pageNum.classList.add('error-animate');
            pageNum.style.color = 'red';
            setTimeout(()=>{
                pageNum.classList.remove('error-animate');
                pageNum.style.color = 'rgb(80, 78, 78)';
            },500)
        }
    });
}