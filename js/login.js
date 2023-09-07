function seePassword(fieldID, iconID){
    field = document.getElementById(fieldID);
    icon = document.getElementById(iconID);

    icon.innerHTML = icon.innerHTML == 'visibility_off' ? 'visibility' : 'visibility_off';

    field.setAttribute('type', icon.innerHTML == 'visibility_off' ? 'password' : 'text');
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
    let username = 'clarence-coronel';
    let password = '123';


    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                console.log(xhr.responseText);
            }
        }
    }

    xhr.open("POST", "../php/processLogin.php");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`user=${username}&pass=${password}`);
}