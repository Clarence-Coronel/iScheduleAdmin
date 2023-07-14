let headerBtn = document.querySelectorAll('.header-btn');
let navLinks = document.querySelector('.nav-links');
let accountSetting = document.querySelector('.account-setting');
let accountBtn = document.querySelectorAll('.accBtn');
let screenDarken = document.querySelector('.darken-screen');
let navLinkItem = document.querySelectorAll('.nav-links__item');
let desktopMode = false;

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
    console.log(e.target);
    if(e.target.getAttribute('data-click') != 'doNothing'){
        navLinks.style.left = "-250px"
        screenDarken.style.display = 'none';
        
        accountSetting.style.display = 'none';
    }
});

navLinkItem.forEach((item)=>{
    item.addEventListener('mouseover',()=>{
        item.querySelector('.ico-nav').style.color = 'white';
    });

    item.addEventListener('mouseout', ()=>{
        item.querySelector('.ico-nav').style.color = 'rgb(210, 208, 208)';
    });
});



