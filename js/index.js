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
// AOS Initialization
AOS.init();
initial();

// DI KASAMA YUNG USERNAME KASI SA BACKEND NATIN SIYA IGENERATE FIRSTNAME-LASTNAME#kung pangilan siya ex.clarence-coronel2
const newAdmin = {
    'firstName': '',
    'middleName': '',
    'lastName': '',
    'phone': '',
    'password': '',
    'adminType': '',
}

applyAdminInfo();

function initial(){
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
    
    // navLinkItem.forEach((item)=>{
    //     item.addEventListener('mouseover',()=>{
    //         item.querySelectorAll('.ico-nav').forEach((item2)=>{
    //             item2.style.color = 'white';
    //         });
    //     });

    //     item.addEventListener('mouseout',()=>{
    //         item.querySelectorAll('.ico-nav').forEach((item2)=>{
    //             item2.style.color = 'rgb(210, 208, 208)';
    //         });
    //     });
    // });
}

function applyAdminInfo(){
    let accName = document.querySelector('.account-name');
    let role = document.querySelector('.role');
    let adminType = signedInAdmin.adminType;
    let roleTypes = ['Admin I', 'Admin II', 'Super Admin'];

    accName.innerText = `${signedInAdmin.firstName} ${signedInAdmin.middleName} ${signedInAdmin.lastName}`;

    if(adminType == 'admin_i'){
        role.innerText = 'Admin I';
    }
    else if(adminType == 'admin_ii'){
        role.innerText = 'Admin II';
    }
    else if(adminType == 'admin_super'){
        role.innerText = 'Super Admin';
    }
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
    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');
    let modalPositive = document.querySelector('.positive');
    let modalNegative = document.querySelector('.negative');
    let close = document.querySelector('.btn-close');
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
            *Pending Follow-Up Requests  <br>
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
            *Pending Follow-Up Requests  <br>
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
    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');
    let modalPositive = document.querySelector('.positive');
    let modalNegative = document.querySelector('.negative');
    let close = document.querySelector('.btn-close');

    modalPositive.style.display = 'none';
    modalTitle.innerHTML = 'Invalid Input';
    modalTitle.style.color = 'red';

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
    
    console.table(tableRow);

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

function editLevel(element){
    alert("labas modal");
    alert(element.getAttribute('data-username'));
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
    else if((newAdmin["phone"]).charAt(0) != '0'){
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
        patient['adminType'] = 1;
    }
    else if(document.querySelector('#adminII').checked){
        patient['adminType'] = 2;
    }
    else if(document.querySelector('#superAdmin').checked){
        patient['adminType'] = 3;
    }
    else{
        errorHandler('50');
        return false;
    }
    
    insertNewAdminAcc();
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
        formErrorMessage = 'Phone number requires to start with "0". Example: 09XX XXX XXXX.';
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
        formErrorMessage = 'Password must be equal or greater than 8 characters';
    }
    else if(code == '43'){
        formErrorMessage = 'Password must be equal or less than 64 characters';
    }
    else if(code == '44'){
        formErrorMessage = 'Password must contain upper and lower case letters, a number, and a special character.';
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

function insertNewAdminAcc(){
    alert('test')
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
    const modalTitle = document.querySelector('.modal-title');
    const modalBody = document.querySelector('.modal-body');
    const positive = document.querySelector('.positive');
    const negative = document.querySelector('.negative');
    
    modalTitle.innerHTML = 'Signing Out...';
    modalBody.innerHTML = 'Are you sure?';
    positive.innerHTML = 'Confirm';
    negative.innerHTML = 'Cancel';
    document.querySelector('.modal-dialog').classList.remove('modal-lg');


     // gumamit ng setattribute sa pag bigay ng onclick and tanggal
    positive.setAttribute('onclick', 'signOut()');

    modalLauncher()
}

function viewRequestApprove(id){
    let requestTarget = document.getElementById(id);
    let appID = requestTarget.getAttribute('data-appID');
    
    let title = document.querySelector('.modal-title');
    let body = document.querySelector('.modal-body');
    let positive = document.querySelector('.positive');
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
    positive.innerHTML = 'Schedule';
    body.innerHTML = html;
    // document.querySelector('.modal-dialog').classList.add('modal-lg');

    modalLauncher();
}

function viewRequestReject(id){
    let requestTarget = document.getElementById(id);
    let appID = requestTarget.getAttribute('data-appID');
    
    let title = document.querySelector('.modal-title');
    let body = document.querySelector('.modal-body');
    let positive = document.querySelector('.positive');

    title.innerHTML = 'Rejecting Appointment...';
    body.innerHTML = 'Are you sure?';
    positive.innerHTML = 'Confirm';

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