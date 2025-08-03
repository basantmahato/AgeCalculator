let isDOBOpen = false;
let dateOfBirth;

const settingGearEl = document.getElementById("settingIcon");
const settingContentEl = document.getElementById("settingContent");
const initialTextEl = document.getElementById("initialText");
const afterDOBbtnTxtEl = document.getElementById("afterDOBBtnTxt");
const dobButtonEl = document.getElementById("dobButton");
const dobInputEl = document.getElementById("dobInput");

const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const dayEl = document.getElementById("day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");

const makeTwoDigitNumber = (number) => {
    return number > 9 ? number : `0${number}`;
};

const toggleDateOfBirthSelector = () => {
    if (isDOBOpen) {
        settingContentEl.classList.add("hide");
    } else {
        settingContentEl.classList.remove("hide");
    }
    isDOBOpen = !isDOBOpen;
};

const updateAge = () => {
    const now = new Date();
    let years = now.getFullYear() - dateOfBirth.getFullYear();
    let months = now.getMonth() - dateOfBirth.getMonth();
    let days = now.getDate() - dateOfBirth.getDate();
    let hours = now.getHours() - dateOfBirth.getHours();
    let minutes = now.getMinutes() - dateOfBirth.getMinutes();
    let seconds = now.getSeconds() - dateOfBirth.getSeconds();

    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }

    if (minutes < 0) {
        minutes += 60;
        hours--;
    }

    if (hours < 0) {
        hours += 24;
        days--;
    }

    if (days < 0) {
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
        months--;
    }

    if (months < 0) {
        months += 12;
        years--;
    }

    yearEl.innerHTML = makeTwoDigitNumber(years);
    monthEl.innerHTML = makeTwoDigitNumber(months);
    dayEl.innerHTML = makeTwoDigitNumber(days);
    hourEl.innerHTML = makeTwoDigitNumber(hours);
    minuteEl.innerHTML = makeTwoDigitNumber(minutes);
    secondEl.innerHTML = makeTwoDigitNumber(seconds);
};

// ✅ This function was missing earlier
const localStorageGetter = () => {
    const year = localStorage.getItem("year");
    const month = localStorage.getItem("month");
    const date = localStorage.getItem("date");

    if (year && month && date) {
        dateOfBirth = new Date(year, month, date);
    }
};

// ✅ On page load, get DOB and update UI if DOB exists
localStorageGetter();

if (dateOfBirth) {
    initialTextEl.classList.add("hide");
    afterDOBbtnTxtEl.classList.remove("hide");
    updateAge();
    setInterval(() => updateAge(), 1000);
} else {
    initialTextEl.classList.remove("hide");
    afterDOBbtnTxtEl.classList.add("hide");
}

// ✅ Called only on user click
const setDOBhandler = () => {
    const dateString = dobInputEl.value;
    dateOfBirth = dateString ? new Date(dateString) : null;

    if (dateOfBirth) {
        localStorage.setItem("year", dateOfBirth.getFullYear());
        localStorage.setItem("month", dateOfBirth.getMonth());
        localStorage.setItem("date", dateOfBirth.getDate());

        initialTextEl.classList.add("hide");
        afterDOBbtnTxtEl.classList.remove("hide");

        updateAge();
        clearInterval(window.ageInterval); // prevent multiple intervals
        window.ageInterval = setInterval(() => updateAge(), 1000);
    } else {
        afterDOBbtnTxtEl.classList.add("hide");
        initialTextEl.classList.remove("hide");
    }
};

settingGearEl.addEventListener("click", toggleDateOfBirthSelector);
dobButtonEl.addEventListener("click", setDOBhandler);
