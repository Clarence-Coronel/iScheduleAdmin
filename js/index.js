let headerBtn = document.querySelectorAll('.header-btn');
let navLinks = document.querySelector('.nav-links');
let screenDarken = document.querySelector('.darken-screen');

headerBtn.forEach((item)=>{
    item.addEventListener('click', ()=>{
        navLinks.style.left = "0";
        screenDarken.style.display = 'block';
    });
});

window.addEventListener('click', (e)=>{
    console.log(e.target);

    if(e.target.getAttribute('data-click') != 'doNothing'){
        navLinks.style.left = "-300px"
        screenDarken.style.display = 'none';
    }
});

