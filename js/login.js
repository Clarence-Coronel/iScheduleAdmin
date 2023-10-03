let formContainer = document.querySelector('.form-container');

let isResendAvail = false;
const loginHTML = 
`
<form class="login-form">
                <div class="input-container">
                    <div class="input-field">
                        <input type="text" name="username" id="username" required onfocus="changeBorderFocus(this.id)" onblur="changeBorderBlur(this.id)">
                        <label for="username">Username</label>
                    </div>
                    <div class="input-field">
                        <input type="password" name="password" id="password" required onfocus="changeBorderFocus(this.id)" onblur="changeBorderBlur(this.id)">
                        <label for="password">Password</label>
                        <span class="material-icons see-password" id="seePassword" onclick="seePassword('password', this.id)">visibility_off</span>
                    </div>
                </div>
                <div class="error-container">
                        <span class="login-msg"></span>
                </div>
                <div class="button-field">
                    <button class="login-btn" type="button" onclick="validateLogin()">Login</button>
                    <button class="forgot-btn" type="button" onclick="openForgotPassword()">Forgot Password?</button>
                </div>     
            </form>
`;


const forgotHTML = 
`
<form class="forgot-form">
            <h3>Forgot Password</h3>
            <div class="partA">
                 <div class="input-container">
                    <div class="input-field">
                        <input type="text" name="username" id="username" required oninput="inputLimiter(this.id, 70)" onfocus="changeBorderFocus(this.id)" onblur="changeBorderBlur(this.id); inputLimiterBlur(this.id, 70)">
                        <label for="username">Username</label>
                    </div>
                </div>
            </div>
            <div class="partB" style="display: none;">
                <div class="OTP-container">
                    <div class="textInfo-container">
                        <span class="subText">Your One-Time Password has been sent to <span class="phoneDisplay">09XX XXX XXXX</span></span>
                    </div>
                    <div class="OTP-body">
                        <div class="OTP-field">
                            <input type="text" name="OTP" id="OTP" oninput="inputLimiterNum(this.id, 5)" onblur="inputLimiterNum(this.id, 5)" oninput="inputLimiter(this.id, 5)" onblur="inputLimiterBlur(this.id, 5)">
                            <button class="resend-btn" onclick="resendOTPtoPhone()">Re-Send</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="partC" style="display: none;">
                <div class="input-container">
                    <div class="input-field">
                        <input type="password" onpaste="return false;" ondrop="return false;" name="password" required id="password" onfocus="changeBorderFocus(this.id)" onblur="changeBorderBlur(this.id)">
                        <label for="password">Password</label>
                        <span class="material-icons see-password" id="seePassword" onclick="seePassword('password', this.id); seePassword('confirmPassword', 'seeConfirmPassword')">visibility_off</span>
                    </div>
                    <div class="input-field">
                        <input type="password" onpaste="return false;" ondrop="return false;" name="confirmPassword" required id="confirmPassword" onfocus="changeBorderFocus(this.id)" onblur="changeBorderBlur(this.id)">
                        <label for="confirmPassword">Confirm Password</label>
                        <span class="material-icons see-password" id="seeConfirmPassword" onclick="seePassword('confirmPassword', this.id); seePassword('password', 'seePassword')">visibility_off</span>
                    </div>
                </div>
            </div>
            <div class="error-container">
                <span class="forgot-msg"></span>
            </div> 
            <div class="button-field">
                <button class="next-btn" type="button" onclick="forgotNext()">Next</button>
                <button class="forgot-btn" type="button" onclick="openLogin()">Back to Login</button>
            </div>
        </form>
`;

formContainer.innerHTML = loginHTML;
let ctr = 1;
let retrieveUsername = "";
let forgotPassPhone = "";


const fakeOTP = "12345";

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

function seePassword(fieldID, iconID){
    field = document.getElementById(fieldID);
    icon = document.getElementById(iconID);

    icon.innerText = icon.innerText == 'visibility_off' ? 'visibility' : 'visibility_off';

    field.setAttribute('type', icon.innerText == 'visibility_off' ? 'password' : 'text');
}

function changeBorderFocus(id){
    let field = document.getElementById(id);
    field.parentElement.style.borderColor = '#4e73df';
}

function changeBorderBlur(id){
    let field = document.getElementById(id);
    if(field.value == "") field.parentElement.style.borderColor = 'rgb(80, 78, 78)';
}

function validateLogin(){
    const xhr = new XMLHttpRequest();
    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;
    
    if(username == "" || password == ""){
        showError("Please fill in both fields");
        return;
    }

    xhr.onload = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                let result = parseInt(xhr.responseText);
                if(result == 1){
                    window.location.href="../index.php";
                }
                else{
                    showError("Incorrect username or password");
                }
            }
        }
    }

    xhr.open("POST", "../php/processLogin.php");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`user=${username}&pass=${password}`);
}

function showError(str = ""){
    let msg = document.querySelector('.login-msg');

    if(msg.innerText != ""){
        msg.classList.add('error-animate');
        setTimeout(()=>{
            msg.classList.remove('error-animate');
        },500);
    } 
    msg.innerText = str;
}



function sendOTPtoPhone(){
    // magsend otp
}

function resendOTPtoPhone(){
    // di na magopen panibago modal kaya nakahiwalay tong function na to
    
    if(isResendAvail){
        sendOTPtoPhone();
        isResendAvail = false;
        resetCD();
    }
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
    headerClose.style.display = 'block'
    positive.style.display = 'block';
    negative.style.display = 'block';
    positive.innerText = 'Understood';
    negative.innerText = 'Cancel';
}

function openForgotPassword(){
    ctr = 1;
    formContainer.innerHTML = forgotHTML;
}

function openLogin(){
    formContainer.innerHTML = loginHTML;
}

function forgotNext(){
    const partA = document.querySelector('.partA');
    const partB = document.querySelector('.partB');
    const partC = document.querySelector('.partC');

    if(ctr == 1){
        let usernameInput = document.querySelector('#username');

        if(usernameInput.value == ""){
            showErrorForgot("Please fill in your username")
        }else{

            const xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        if(xhr.responseText != 0){
                            forgotPassPhone = xhr.responseText;
                            partA.style.display = 'none';
                            partB.style.display = 'block';
                            clearErrorForgot();
                            ctr++;
                            let showHiddenPhone = forgotPassPhone.slice(9);
                            let phoneDisplay = document.querySelector('.phoneDisplay');
                            phoneDisplay.innerText = "09XX XXX " + showHiddenPhone;
                            retrieveUsername = usernameInput.value;

                            // dito dapat tawagin yung function na mag send ng otp;
                            // gamit yung num sa forgotPassPhone na variable
                            alert("sending fake OTP");
                            resetCD()
                        }
                        else{
                            showErrorForgot("Username not found")
                        }
                    }
                }
            }

            xhr.open("POST", "../php/checkUserExist.php");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(`username=${usernameInput.value}`);
        } 
    }
    else if(ctr == 2){
        const OTPInput = document.querySelector('#OTP').value;

        if(OTPInput == fakeOTP){
            partB.style.display = 'none';
            partC.style.display = 'block';
            clearErrorForgot();
            ctr++;
        }
        else{
            showErrorForgot("Invalid OTP")
        }
    }
    else{
        const password = document.querySelector('#password');
        const cPassword= document.querySelector('#confirmPassword');

        if(password.value == "" || cPassword.value == ""){
            showErrorForgot("Please fill in both fields");
            return;
        }
        
        if(password.value != cPassword.value){
            showErrorForgot("Password do not match");
            return;
        }
        else{
            if(password.value.length < 8){
                showErrorForgot("Password must be equal or greater than 8 characters")
                return;
            }
            else if(password.value.length > 64){
                showErrorForgot("Password must be equal or less than 64 characters");
                return;
            }
            else if(!containsLetterNumSpeChar(password.value)){
                showErrorForgot("Password must contain an upper & lower case letter, a number, and a special character");
                return;
            }
        }

        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    let title = document.querySelector(".modal-title");
                    let positive = document.querySelector(".positive");
                    let negative = document.querySelector('.negative');
                    let body = document.querySelector('.modal-body');

                    title.innerText = "Success";
                    body.innerText = "Password has been successfully changed.";
                    negative.innerText = 'Close';
                    positive.style.display = 'none';

                    modalLauncher();
                    openLogin();
                }
                else{
                    alert("Something went wrong. Try again later.")
                }
            }
        }

        xhr.open("POST", "../php/forgotUpdatePass.php");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(`username=${retrieveUsername}&newPassword=${password.value}`);
    }
}

function showErrorForgot(str = ""){
    let msg = document.querySelector('.forgot-msg');

    if(msg.innerText != ""){
        msg.classList.add('error-animate');
        setTimeout(()=>{
            msg.classList.remove('error-animate');
        },500);
    } 
    msg.innerText = str;
}

function clearErrorForgot(){
    let msg = document.querySelector('.forgot-msg');

    msg.innerText = "";
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

function modalLauncher(){
    // let positive = document.querySelector('.positive');

    // positive.removeAttribute('onclick');
    let modalLauncher = document.querySelector('.modal-launcher');
    modalLauncher.click();
}