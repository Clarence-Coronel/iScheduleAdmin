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
        showError("Please fill up both fields");
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