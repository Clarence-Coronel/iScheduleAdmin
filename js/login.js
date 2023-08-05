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