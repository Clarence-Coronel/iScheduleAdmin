// LAGYAN NG CLASS NA FULL YUNG CALENDAR CELL PARA DI MAGING SELECTABLE


// Pagkanagpalit ng buwan iclear yung slots
// pagkanagpalit ng date iclear yung slots
// If walang laman slots mag lagay text na select a date
const container = document.querySelector('.calendar-container');
let monthContainer;
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const blockedDates = [];
let nextCounter = 0;

let date = new Date();
let selectedMonth = '';
let selectedYear = '';
let selectedDate = '';
let selectedSlot = '';

let oldMonth;

let currentMonth = date.getMonth();
let year = date.getFullYear();

let isExecuted = false;

let monthNav = true;


function loadSlots(date){
    let slotContainer = document.querySelector('.slot-container');
    // retrieve dapat yung mga slots nung selectedDate from db pero for now eto hardcoded
    // let tempSlotId = ['a', 'b', 'c', 'd'];
    // let tempSlotInfo = ['8:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '1:00 PM - 2:00 PM', '2:00 PM - 4:00 PM'];
    // let tempSlotAvail = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]

    slotContainer.style.justifyContent = 'flex-start';
    slotContainer.innerHTML = "";

    let temp = new Date(date);
    let day = '';
    switch (temp.getDay()){
        case 1:
            day = 'mon';
            break;
        case 2:
            day = 'tue';
            break;
        case 3:
            day = 'wed';
            break;
        case 4:
            day = 'thu';
            break;
        case 5:
            day = 'fri';
            break; 
        case 6:
            day = 'sat';
            break;   
    }

    let slots = [];
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (){
        if(this.readyState == 4){
            if(this.status == 200){
                slots = JSON.parse(this.responseText);

                slots.forEach((item)=>{
                    let newSlot = document.createElement('div');
                    newSlot.classList.add('slot');
                    newSlot.setAttribute('data-schedid', item.schedID);
            
                    let newInfo = document.createElement('div');
                    newInfo.innerHTML = `${item.startTime} - ${item.stopTime}`;
                    newInfo.classList.add('time');
                    newSlot.appendChild(newInfo);
            
                    let newSlotAvail = document.createElement('div');
                    let slotsAvail;
            
                    const xhr2 = new XMLHttpRequest();
                    xhr2.onreadystatechange = function(){
                        if(this.readyState == 4){
                            if(this.status == 200){
                                slotsAvail = item.max - this.responseText;
                                if(slotsAvail == 0) {
                                    newSlot.setAttribute('data-full', 'true');
                                }
                                else{
                                    newSlot.setAttribute('data-full', 'false');
                                }
                            }
                        }
                    }
            
                    xhr2.open("POST", "./php/getNumPatient.php", false);
                    xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    xhr2.send(`date=${date}&schedID=${item.schedID}`);
            
                    newSlotAvail.innerHTML = slotsAvail + ' Slot(s) Available';
                    newInfo.classList.add('slotAvail');
                    newSlot.appendChild(newSlotAvail);
            
                    slotContainer.appendChild(newSlot);
                });
            
                // after iload yung bagong slot lagyan listener
                selectSlot();
            }
        }
    }

    xhr.open("POST", "./php/getSched2.php", false);
    xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
    xhr.send(`deptID=${patient['department']}&day=${day}`);

    console.table(slots)


    
}

function resetCalData(){
    let slotContainer = document.querySelector('.slot-container');
    document.querySelector('#scheduleDate').value = '';
    document.querySelector('#timeSlot').value = '';

    slotContainer.style.justifyContent = 'center';

    slotContainer.innerHTML = `<div class="calendar__instruction">Pumili ng Petsa</div>`;
}

function selectSlot(){
    let timeSlots = document.querySelectorAll('.slot');
    
    timeSlots.forEach((item)=>{
        if(item.dataset.full == 'false'){
            item.addEventListener('click',()=>{
                timeSlots.forEach((item2)=>{
                    item2.classList.remove('slot-selected');
                });
        
                item.classList.add('slot-selected');
                selectedSlot = item.querySelector('.time').innerHTML;
                document.querySelector('#timeSlot').value = item.dataset.schedid;
                
                // else{
                //     item.style.backgroundColor = 'rgb(233, 64, 64)';
                //     item.style.color = 'white';
                // }
            });
        }
        else{
            item.classList.add('slot-full');
        }
    });
}

function selectDate(element){
    let dateCells = document.querySelectorAll('.date');
    
    element.addEventListener('click', () =>{
        if(!element.classList.contains('block') && element.classList.contains('date') && !element.classList.contains('full')){
            dateCells.forEach((date)=>{
                date.classList.remove('date-selected');
            });
            element.classList.add('date-selected');
            selectedDate = element.innerHTML;
            document.getElementById('scheduleDate').value = `${selectedMonth} ${selectedDate}, ${selectedYear}`;
            document.querySelector('#timeSlot').value = '';
            loadSlots(element.dataset.date);
        }
    });
}

function nextMonthBtn(){
    if(!monthNav) return;
    
    let calendarCell = document.querySelectorAll('.key');
    // Clears selected border
    calendarCell.forEach((item)=>{
        item.style.border = '2px solid rgb(80, 78, 78)';
    });

    if(nextCounter < 11 && nextCounter >= 0){
        resetCalData();
        // Clears scheduleDate content para pag nag next or prev burado yung salected
        document.getElementById('scheduleDate').value = "";
        let nextMonth = months[date.getMonth()+1];

        oldMonth = currentMonth;
        currentMonth = date.getMonth()+1;

        if(currentMonth == 12){
            currentMonth = 0;
            nextMonth = months[0];
        }

        console.log('old month: ' + oldMonth);
        console.log('current month: ' + currentMonth);

        year = date.getFullYear();
        if(nextMonth == months[0])
        {
            year++;
            nextMonth='January';
        } 
        date = new Date(`${nextMonth} 1, ${year}`);
        nextCounter++;
        InitialSetup();
        console.log(nextCounter);
    }
    else{
        openModalUserError("Warning","Scheduling is restricted to a maximum window of 12 months");
    }
}

function prevMonthBtn(){
    if(!monthNav) return;

    let calendarCell = document.querySelectorAll('.key');

    // Clears selected border
    calendarCell.forEach((item)=>{
        item.style.border = '2px solid rgb(80, 78, 78)';
    });

    if(nextCounter <= 11 && nextCounter > 0){
        resetCalData()
        // Clears scheduleDate content para pag nag next or prev burado yung salected
        document.getElementById('scheduleDate').value = "";
        let temp = new Date();
        let nextMonth;
        

        if(currentMonth == 0){
            oldMonth = 0;
            currentMonth = 11;
            year--;
            nextMonth = months[currentMonth];
        }else{
            // currentMonth = oldMonth;
            // oldMonth--;

            oldMonth = currentMonth;
            currentMonth--;
            nextMonth = months[currentMonth];
        }

        console.log('old month: '+oldMonth);
        console.log('current month:'+currentMonth);
        
        // console.log('TESTING ' + oldMonth);
        // console.log('TESTING ' + currentMonth);
        // alert(currentMonthNav-1);

        if(temp.getMonth() == currentMonth){
            let year = temp.getFullYear();
            let currentDate = temp.getDate();
            date = new Date(`${nextMonth} ${currentDate}, ${year}`);
        }
        else{
            // let year = temp.getFullYear();
            date = new Date(`${nextMonth} 1, ${year}`);
        }
        
        nextCounter--;
        InitialSetup();
    }
    else{ 
        openModalUserError("Warning","Scheduling is limited to the current month and future dates");
    }

    console.log(currentMonth);
    console.log(year);
}

function openModalUserError(title, body){
    resetModal();
    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');
    let modalCloseBtn = document.querySelector('.btn-close');
    let negativeBtn = document.querySelector('.negative');
    let positiveBtn = document.querySelector('.positive');
    let modalHeader = document.querySelector('.modal-header');
    let modalFooter = document.querySelector('.modal-footer');
    let modal = document.querySelector('.modal-dialog');

    modalHeader.style.display = 'flex';
    modalFooter.style.display = 'flex';
    modal.classList.remove('modal-lg');
    
    positiveBtn.style.display = 'none';
    // modalCloseBtn.style.display = 'none';

    modalTitle.style.color = "red";
    modalTitle.innerHTML = title;
    modalBody.innerHTML = body;
    modalBody.style.fontSize = '1.3rem';

    modalLauncher();
}

function InitialSetup(initial = false){

    if(initial){
        resetCalData();
    }

    getBlockedDates();
    selectedMonth = months[date.getMonth()];
    selectedYear = date.getFullYear();

    monthContainer.innerHTML = selectedMonth + ' ' + selectedYear;
    let numOfDays = getDaysOfMonth(date.getFullYear(), date.getMonth());
    let firstDayOfMonth = getDayOfFirstDate(date.getFullYear(), months[date.getMonth()]);

    generateDate(numOfDays, firstDayOfMonth);

    // selectDate();
    // selectSlot();
    // getDaysOfMonth(date.getFullYear(), date.getMonth())

    let tempDate = new Date();
    if(!isExecuted){
        if(`${tempDate.getDate()}` == getDaysOfMonth(tempDate.getFullYear(), tempDate.getMonth())){
            document.querySelector('#calendar__next').click();
            isExecuted = true;
        }
    }

    loadSched();
}

function checkDateValid(date){
    date = convertProperDate(date);
    valid = true;

    blockedDates.forEach(item =>{

        if(date == convertProperDate(item.date)) {
            valid= false;
        }

        if(item.isYearly){
            if(convertProperDate(date, true) == convertProperDate(item.date, true)) valid= false;
        }

    })

    return valid;
}

function convertProperDate(selectedDate, removeYear = false){
    let year = selectedDate.split('-')[0];
    let month = selectedDate.split('-')[1];
    let date = selectedDate.split('-')[2];

    if(month.length == 1){
        month = '0'+month;
    }

    if(date.length == 1){
        date = '0'+date;
    }

    if(removeYear) return `${month}-${date}`;
    else return `${year}-${month}-${date}`;
}

function generateDate(days, NameOfDay1st){

    let startingPoint = NameOfDay1st; //kinukuha kung anong araw yung 1st ng month para lam natin san mag start
    let numOfIteration = days + NameOfDay1st; //kaya nag add ng NameOfDay1st kasi if ma move konwari ng +2 yung starting point dapat yung end point din
    let dateCounter = 1; //counter ng date kasi di pede yung i kasi yun yung posisyon nung cell

    // para kita yung sixthRow by default kasi binubura to pag puro X laman
    const sixthRow = document.querySelector('.sixthRow');
    sixthRow.style.display = 'flex';

    try {
        deleteCalendarCells();
    } catch (error) {
        
    }

    generateCalendarCells();

    // Resetting each calendarCell
    let calendarCell = document.querySelectorAll('.key');
    calendarCell.forEach((item)=>{
        item.innerHTML = "";
        item.classList.remove('date');
    });

    for(i = startingPoint; i < numOfIteration; i++ ){
        //gives value of date then increment, di kasama increment sa ibibigay
        // DITO BINIBIGYAN NG NUMBER
        calendarCell[i].innerHTML = dateCounter;
        calendarCell[i].classList.add('date');
        calendarCell[i].classList.remove('block');

        checkDate = `${year}-${currentMonth+1}-${dateCounter}`;
        dateObj = new Date(checkDate);

        if(!checkDateValid(checkDate)){
            calendarCell[i].classList.add('block');
        }

        let proceedChkFull = false;
        let schedules = [];
        let availScheds = [];
        let day;

        const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

        day = daysOfWeek[dateObj.getDay()];


        calendarCell[i].setAttribute('data-date', checkDate);
        dateCounter++;

        if(calendarCell[i].id == 'block'){
            calendarCell[i].classList.add('block');
        }

        if(!checkDateValid(checkDate)){
            calendarCell[i].classList.add('block');
            calendarCell[i].classList.remove('date');
        }

        if(dateObj.getDay() == 0){
            calendarCell[i].classList.add('block');
            calendarCell[i].classList.remove('date');
        }

    }
    calendarCell.forEach((item)=>{
        if(nextCounter < 1){
            if(item.innerHTML <= date.getDate()){
                item.classList.remove('date');
                item.classList.add('block');
            }
        }
        if(item.innerHTML == "") {
            item.classList.remove('date');
            item.classList.add('block');
            item.innerHTML = 'X';
        }


        // Checks if the sixth row contains a date if none hide it
        let sixthRowChildren = sixthRow.children;
        let counterOfEmpty = 0

        for(i = 0; i < sixthRowChildren.length; i++){
            if(sixthRowChildren[i].innerHTML == 'X') counterOfEmpty++;
        }

        if(counterOfEmpty == 7) sixthRow.style.display = 'none';
        
    });
    loadSched();
}

function getDaysOfMonth(year, month){
    // adds 1 to month kasi yung kinukuha nating month sa getMonth is 0 yung january, 11 december
    return new Date(year, month+1, 0).getDate();
};

function getDayOfFirstDate(year, month){
    let dateString = `${month} 1, ${year}`;
    let tempDate = new Date(dateString);

    return tempDate.getDay();
    // 0 = sunday and 6 = saturday
}

function generateCalendarCells(){
    let rows = document.querySelectorAll('.date-content');

    rows.forEach((item)=>{
        for(i = 0; i <7; i++){
            let temp = document.createElement('div');
            // lagyan block class?
            if(i == 0) {
                temp.setAttribute('id', 'block');
                temp.classList.add('block');
            }
            temp.classList.add('box');
            temp.classList.add('date');
            temp.classList.add('key');
            item.appendChild(temp);
        }
    });
    
}

function deleteCalendarCells(){
    let rows = document.querySelectorAll('.date-content');

    rows.forEach((item)=>{
        while (item.hasChildNodes())
        {
            item.removeChild(item.firstChild)
        }
    })
}

function getBlockedDates(){
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                try {
                    arrayOfObjects = JSON.parse(xhr.responseText);
                    const currentDate = new Date();
    
                    arrayOfObjects.forEach(item =>{
                        let skip = false;
    
                        let tempDate = new Date(item.date);
                        
                        if(item.isYearly == 1) item.isYearly = true;
                        else item.isYearly = false;
    
                        if(currentDate > tempDate &&  !item.isYearly) skip = true;
    
                        if(!skip){
                            blockedDates.push(item);
                        }
                    })
                } catch (error) {
                    
                }

            }
        }
    }

    xhr.open("POST", "./php/getBlockedDates.php", true);
    xhr.send();
}

function loadSched(){
    const dates = document.querySelectorAll('.date');

    if(dates.length == 0) return;

    monthNav = false;

    let thisMonth = currentMonth+1;
    let thisYear = year;
    
    let proceedChkFull = false;
    let schedules = [];
    let availScheds = [];

    let counter = 0;

    let calendarTitle = document.querySelector('.calendar__month');
    let content = months[currentMonth] + " " + thisYear;

    calendarTitle.innerText = "Generating Schedule...";

    dates.forEach((item, index)=>{
        let curDate = `${thisYear}-${thisMonth}-${item.innerText}`;
        let dateObj = new Date(curDate);
        const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        let day = daysOfWeek[dateObj.getDay()];

        let xhr = new XMLHttpRequest();

        // console.log("Day: " + day)
        // console.log("Dept ID: " + patient.department)

        xhr.onreadystatechange = function(){
            if(this.readyState == 4){
                if(this.status == 200){
                    counter++;
                    try {
                        schedules = JSON.parse(this.responseText);
                        proceedChkFull = true;

                        if(proceedChkFull){
                            schedules.forEach(sched=>{
                        
                                const xhr2 = new XMLHttpRequest();
                        
                                xhr2.onreadystatechange = function(){
                                    if(this.readyState == 4){
                                        if(this.status == 200){
                                            if(this.response == 1){
                                                availScheds.push(item);
                                            }
                                        }
                                    }
                                    else{
                                    }
                                }
                        
                                xhr2.open("POST", "./php/checkSchedFull.php", false);
                                xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                                xhr2.send(`date=${curDate}&schedID=${sched.schedID}&max=${sched.max}`);
                            })
                        
                            // console.table(availScheds);
                        
                            if(availScheds.length == 0) {
                                item.classList.add('block');
                                item.classList.remove('date');
                                if(!(parseInt(item.innerText) <= date.getDate())){
                                    item.setAttribute('id','full');
                                    item.innerText = 'Full';
                                }
                            }
                            else{
                                selectDate(item);
                            }
                        }

                    } catch (error) {
                        item.classList.add('block');
                        item.classList.remove('date');
                    }

                    if(counter == dates.length) {
                        calendarTitle.innerText = content;
                        monthNav = true;
                    }
                }
            }
        }
        
        xhr.open("POST", "./php/getSched.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(`deptID=${patient['department']}&day=${day}`);
    });
}