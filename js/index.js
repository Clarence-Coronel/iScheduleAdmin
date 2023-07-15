let headerBtn = document.querySelectorAll('.header-btn');
let navLinks = document.querySelector('.nav-links');
let accountSetting = document.querySelector('.account-setting');
let accountBtn = document.querySelectorAll('.accBtn');
let screenDarken = document.querySelector('.darken-screen');
let navLinkItem = document.querySelectorAll('.nav-links__item');
let inputContainer = document.querySelectorAll('.input-container');
let desktopMode = false;


// AOS Initialization
AOS.init();

inputContainer.forEach((item)=>{

    try {
        item.querySelector('input').addEventListener('focusin',()=>{
            item.style.borderColor = '#4e73df'; //primary-color
        })
    
        item.querySelector('input').addEventListener('focusout',()=>{
            if(item.querySelector('input').value == ""){
                item.style.borderColor = 'rgb(80, 78, 78)'; //fontbase-color
            }
        })
    } catch (error) {
        
    }
        
});

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
    // console.log(e.target);
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



