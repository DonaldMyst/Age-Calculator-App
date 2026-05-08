document.querySelector("button").addEventListener("click",calculateAge);
let userInput = document.getElementById("date");
userInput.max = new Date().toISOString().split("T")[0];
let result = document.getElementById("result");

function calculateAge(){
    if(!userInput.value){
        result.innerHTML = "Please select a valid date";
        result.classList.remove("show");
        setTimeout(() => result.classList.add("show"), 10);
        return;
    }

    let birthDate = new Date(userInput.value);
            
    let d1 = birthDate.getDate();
    let m1 = birthDate.getMonth() + 1;
    let y1 = birthDate.getFullYear();
            
    let today = new Date();

    let d2 = today.getDate();
    let m2 = today.getMonth() + 1;
    let y2 = today.getFullYear();

    let d3, m3, y3;
            
    y3 = y2 - y1;
            
    let prevMonth = m2 - 1 || 12;
    let prevYear = m2 === 1 ? y2 - 1 : y2;

    if (m2 >= m1){
        m3 = m2 - m1;
    }else{
        y3--;
        m3 = 12 + m2 - m1;
    }

    if (d2 >= d1){
        d3 = d2 - d1;
    }else{
        m3--;
        d3 = getDaysInMonth(prevYear,prevMonth) + d2 - d1;
    }

    if (m3 < 0){
        m3 = 11;
        y3--;
    }

    result.innerHTML = `You are <span>${y3}</span> years, 
    <span>${m3}</span> months and <span>${d3}</span> days old`;
            
    result.classList.remove("show");
    setTimeout(() => result.classList.add("show"), 10);

    birthdayCountdown(today, m1, d1);
    totalDaysLived(today, birthDate);
}

function getDaysInMonth(year, month){
    return new Date(year, month, 0).getDate();
}

function birthdayCountdown (today, m1, d1){
    let nextBirthday = new Date(today.getFullYear(), m1 - 1, d1);

    if(today > nextBirthday){
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    let diff = nextBirthday - today;
    let daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

    result.innerHTML += `<br><br> <span>${daysLeft}</span> days until your next birthday`;
}

function totalDaysLived(today, birthDate){
    let totalDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
    result.innerHTML += `<br><br> You have lived <span>${totalDays}</span> days`;
}