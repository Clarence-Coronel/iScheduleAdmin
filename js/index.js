let headerBtn = document.querySelectorAll('.header-btn');
let navLinks = document.querySelector('.nav-links');
let accountSetting = document.querySelector('.account-setting');
let accountBtn = document.querySelectorAll('.accBtn');
let screenDarken = document.querySelector('.darken-screen');
let navLinkItem = document.querySelectorAll('.nav-links__item');
const main = document.querySelector('main');
let desktopMode = false;
let contentIsOpen = false;

// AOS Initialization
AOS.init();
initial();

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

    if(val == 0){
        modalTitle.innerHTML = 'Admin I Capabilities'
        modalBody.innerHTML = 
        `
            *View Scheduled Appointments
        `
    }
    else if(val == 1){
        modalTitle.innerHTML = 'Admin II Capabilities'
        modalBody.innerHTML = 
        `   
            *Dashboard <br>
            *Schedule An Appointment <br>
            *View Scheduled Appointments  <br>
        `
    }
    else if(val == 2){
        modalTitle.innerHTML = 'Super Admin Capabilities'
        modalBody.innerHTML = 
        `   
            *Dashboard <br>
            *Schedule An Appointment <br>
            *View Scheduled Appointments  <br>
            *Edit Department Schedules  <br>
            *Manage Admins <br>
            *Manage Website Status <br>
            *Block Dates <br>
        `
    }

    modalLauncher();

}

function modalLauncher(){
    let modalLauncher = document.querySelector('.modal-launcher');
    modalLauncher.click();
}

function showManageAdmins(){
    const manageAdmin = document.querySelector('.manage-admins__sub-container');   

    let newDisplay = manageAdmin.style.display == 'none' ? 'block' : 'none';
    changeArrow()

    if(!contentIsOpen) manageAdmin.style.display = newDisplay;

    contentIsOpen = false;
}

function generateCreateAcc(){
    main.innerHTML = myAccount;
    let iconPassword = document.querySelectorAll('.ico-pass');
    changeArrow();
    contentIsOpen = true;
    createAccInputBorderStyle();

    iconPassword.forEach((item)=>{
        item.addEventListener('click', ()=>{
            if(item.innerHTML == 'visibility_off'){
                iconPassword.forEach((item2)=>{
                    item2.innerHTML = 'visibility'
                })
                document.querySelector('#password').setAttribute('type', 'text');
                document.querySelector('#confirmPassword').setAttribute('type', 'text');
            }
            else{
                iconPassword.forEach((item)=>{
                    item.innerHTML = 'visibility_off'
                })
                document.querySelector('#password').setAttribute('type', 'password');
                document.querySelector('#confirmPassword').setAttribute('type', 'password');
            }
        })
    });


}

function generateDisableAcc(){
    contentIsOpen = true;
    main.innerHTML = "";
}

function generateAdminLogs(){
    contentIsOpen = true;
    main.innerHTML = "";
}

function generateDashboard(){
    main.innerHTML = "";
}

function changeArrow(){
    let newIco = document.querySelector('.change').innerHTML == 'chevron_right' ? 'chevron_left' : 'chevron_right';
    document.querySelector('.change').innerHTML = newIco;
}
