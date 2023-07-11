let headerBtn = document.querySelectorAll('.header-btn');
let header = document.querySelector('header');

headerBtn.forEach((item)=>{
    item.addEventListener('click', ()=>{
        header.style.left = "0";
    });
});

window.addEventListener('click', (e)=>{
    console.log(e.target);

    if(e.target.getAttribute('data-click') != 'doNothing'){
        header.style.left = "-300px"
    }
});

