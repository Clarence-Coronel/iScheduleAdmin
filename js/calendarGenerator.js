// 
// LAGYAN NG CLASS NA FULL YUNG CALENDAR CELL PARA DI MAGING SELECTABLE
// 

// Pagkanagpalit ng buwan iclear yung slots
// pagkanagpalit ng date iclear yung slots
// If walang laman slots mag lagay text na select a date
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let container, monthContainer, calendarPrev, calendarNext;

let nextCounter = 0;

let date = new Date();
let selectedMonth = '';
let selectedYear = '';
let selectedDate = '';
let selectedSlot = '';

let oldMonth;
let currentMonth = date.getMonth();

function loadSlots(selectedDateVal){
    let slotContainer = document.querySelector('.slot-container');
    // retrieve dapat yung mga slots nung selectedDate from db pero for now eto hardcoded
    let tempSlotId = ['a', 'b', 'c', 'd'];
    let tempSlotInfo = ['8:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '1:00 PM - 2:00 PM', '2:00 PM - 4:00 PM'];
    let tempSlotAvail = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]

    slotContainer.style.justifyContent = 'flex-start';
    slotContainer.innerHTML = "";

    tempSlotId.forEach((item, index)=>{
        let newSlot = document.createElement('div');
        newSlot.classList.add('slot');
        newSlot.setAttribute('id',item);

        let newInfo = document.createElement('div');
        newInfo.innerHTML = tempSlotInfo[index];
        newInfo.classList.add('time');
        newSlot.appendChild(newInfo);

        let newSlotAvail = document.createElement('div');
        newSlotAvail.innerHTML = tempSlotAvail[index]+ ' Slot(s) Available';
        newInfo.classList.add('slotAvail');
        newSlot.appendChild(newSlotAvail);

        slotContainer.appendChild(newSlot);
    });

    // after iload yung bagong slot lagyan listener
    selectSlot();
}

function changeSlotContent(){
    alert('function na walang laman');
}

function selectSlot(){
    let timeSlots = document.querySelectorAll('.slot');
    
    timeSlots.forEach((item)=>{
        item.addEventListener('click',()=>{

            timeSlots.forEach((item2)=>{
                item2.classList.remove('slot-selected');
                item2.querySelectorAll('div').forEach((div) => {
                    div.style.color = 'rgb(80, 78, 78)';
                })
            });

            item.classList.add('slot-selected');
            selectedSlot = item.querySelector('.time').innerHTML;
            item.querySelectorAll('div').forEach((div) => {
                div.style.color = 'white';
            })
            document.querySelector('#timeSlot').value = item.id;
        });
    });
}

function selectDate(){
    
    let dateCells = document.querySelectorAll('.date');
    dateCells.forEach((item)=>{

        item.addEventListener('click', () =>{
            if(!item.classList.contains('block') && item.classList.contains('date') && !item.classList.contains('full')){
                dateCells.forEach((date)=>{
                    date.classList.remove('date-selected');
                });
                item.classList.add('date-selected');

                selectedDate = item.innerHTML;
                document.getElementById('scheduleDate').value = `${selectedMonth} ${selectedDate}, ${selectedYear}`;
                loadSlots(document.getElementById('scheduleDate').value);
            }
        });
    });
}

function nextMonthBtn(){
    let calendarCell = document.querySelectorAll('.key');
    // Clears selected border
    calendarCell.forEach((item)=>{
        item.style.border = '2px solid rgb(80, 78, 78)';
    });

    if(nextCounter < 11 && nextCounter >= 0){
        // Clears scheduleDate content para pag nag next or prev burado yung salected
        document.getElementById('scheduleDate').value = "";
        let nextMonth = months[date.getMonth()+1];

        oldMonth = currentMonth;
        currentMonth = date.getMonth()+1;

        if(currentMonth == 12){
            currentMonth = 0;
        }

        console.log('old month: ' + oldMonth);
        console.log('current month: ' + currentMonth);

        let year = date.getFullYear();
        if(!nextMonth)
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
        openModalUserError("Paalala",'Maari lamang mag schedule ng appointment sa susunod na labing-dalawang (12) buwan.');
    }
}

function prevMonthBtn(){
    let calendarCell = document.querySelectorAll('.key');

    // Clears selected border
    calendarCell.forEach((item)=>{
        item.style.border = '2px solid rgb(80, 78, 78)';
    });

    if(nextCounter > 0){
        // Clears scheduleDate content para pag nag next or prev burado yung salected
        document.getElementById('scheduleDate').value = "";
        let temp = new Date();
        let nextMonth = months[oldMonth];
        
        currentMonth = oldMonth;
        oldMonth = oldMonth-1;

        if(oldMonth == -1){
            oldMonth = 11;
        }
        
        // console.log('TESTING ' + oldMonth);
        // console.log('TESTING ' + currentMonth);
        // alert(currentMonthNav-1);

        if(temp.getMonth() == currentMonth){
            let year = temp.getFullYear();
            let currentDate = temp.getDate();
            date = new Date(`${nextMonth} ${currentDate}, ${year}`);
        }
        else{
            let year = temp.getFullYear();
            date = new Date(`${nextMonth} 1, ${year}`);
        }
        
        nextCounter--;
        InitialSetup();
        console.log(nextCounter);
    }
    else{ 
        openModalUserError("Paalala",'Maari lamang mag schedule ng appointment sa kasalukuyang buwan.');
    }
}

function InitialSetup(){

    container = document.querySelector('.calendar-container');
    monthContainer = document.querySelector('.calendar__month');
    calendarPrev = document.querySelector('#calendar__prev');
    calendarNext = document.querySelector('#calendar__next');

    calendarNext.addEventListener('click', nextMonthBtn);
    calendarPrev.addEventListener('click', prevMonthBtn);

    selectedMonth = months[date.getMonth()];
    selectedYear = date.getFullYear();

    monthContainer.innerHTML = selectedMonth + ' ' + selectedYear;
    let numOfDays = getDaysOfMonth(date.getFullYear(), date.getMonth());
    let firstDayOfMonth = getDayOfFirstDate(date.getFullYear(), months[date.getMonth()]);

    generateDate(numOfDays, firstDayOfMonth);

    selectDate();
    selectSlot();
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
        calendarCell[i].innerHTML = dateCounter++;
        calendarCell[i].classList.add('date');
        calendarCell[i].classList.remove('block');

        if(calendarCell[i].id == 'block'){
            calendarCell[i].classList.add('block');
        }
    }
    calendarCell.forEach((item)=>{
        if(nextCounter <= 1){
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