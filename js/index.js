let headerBtn = document.querySelectorAll('.header-btn');
let navLinks = document.querySelector('.nav-links');
let accountSetting = document.querySelector('.account-setting');
let accountBtn = document.querySelectorAll('.accBtn');
let screenDarken = document.querySelector('.darken-screen');
let accSettingClick = 0;

headerBtn.forEach((item)=>{
    item.addEventListener('click', ()=>{
        navLinks.style.left = "0";
        screenDarken.style.display = 'block';
    });
});

accountBtn.forEach((item)=>{
    item.addEventListener('click', ()=>{
        accountSetting.style.display = 'flex';
        accSettingClick++;
    });
});

window.addEventListener('click', (e)=>{
    console.log(e.target);
    console.log(accSettingClick);
    if(e.target.getAttribute('data-click') != 'doNothing'){
        navLinks.style.left = "-400px"
        screenDarken.style.display = 'none';
        accountSetting.style.display = 'none';
    }

    if(accSettingClick == 4){
        accountSetting.style.display = 'none';
        accSettingClick = 0;
    }

});

