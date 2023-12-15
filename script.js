let datesTag = document.querySelector("#dates");
let monthsTag = document.querySelector("#months");
let weekTag = document.querySelector("#week");
let titleTag = document.querySelector("header"),
  currentDate = document.querySelector("#current-date"),
  prevNextIcon = document.querySelectorAll("span");
let addEventBtn = document.querySelector("#add-event");
let eventFormModal = document.querySelector("dialog");

// getting new date, current year and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

// storing full name of all months in array
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const renderCalendar = () => {
  datesTag.innerHTML = "";
  monthsTag.innerHTML = "";
  weekTag.innerHTML = "";
  titleTag.innerHTML = "<h1>eCalendar</h1>";
  let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
  let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
  let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
  let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
  // TODO: Render header
  titleTag.innerHTML += `<h2>${currYear}</h2>`;
  // TODO: Render months
  for (let i = currMonth - 1; i <= currMonth + 1; i++) {
    monthsTag.innerHTML += `<li id="${
      i == currMonth ? "current-month" : ""
    }" class="three-latest-months">${
      i === 12 ? months[0] : i === -1 ? months[11] : months[i]
    }</li>`;
  }
  // TODO: Render days
  for (let i = 0; i <= 6; i++) {
    weekTag.innerHTML += `<li class="day-in-week">${days[i]}</li>`;
  }
  // TODO: Render dates
  // TODO: Dates of last month
  for (let i = firstDayOfMonth; i > 0; i--) {
    datesTag.innerHTML += `<li class="inactive">${
      lastDateOfLastMonth - i + 1
    }</li>`;
  }
  // TOCO: Dates of this month
  for (let i = 1; i <= lastDateOfMonth; i++) {
    // creating li of all days of current month
    // adding active class to li if the current day, month, and year matched
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "current-date"
        : "";
    let isWeekend =
      new Date(`${currYear}-${currMonth + 1}-${i}`).getDay() === 6 ||
      new Date(`${currYear}-${currMonth + 1}-${i}`).getDay() === 0
        ? "weekend"
        : "";
    datesTag.innerHTML += `<li id="${isToday}" class="${isWeekend}">${i}</li>`;
  }
  // TODO: Dates of next month
  for (let i = lastDayOfMonth; i < 6; i++) {
    datesTag.innerHTML += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
  }
};

renderCalendar();

prevNextIcon.forEach((icon) => {
  // getting prev and next icons
  icon.addEventListener("click", () => {
    // adding click event on both icons
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    currMonth =
      icon.id === "prev"
        ? currMonth - 1
        : icon.id === "next"
        ? currMonth + 1
        : currMonth;

    if (currMonth < 0 || currMonth > 11) {
      // if current month is less than 0 or greater than 11
      // creating a new date of current year & month and pass it as date value
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear(); // updating current year with new date year
      currMonth = date.getMonth(); // updating current month with new date month
    } else {
      date = new Date(); // pass the current date as date value
    }
    renderCalendar(); // calling renderCalendar function
  });
});

addEventBtn.addEventListener("click", () => {
  eventFormModal.showModal(); // Opens a modal
});

eventFormModal.addEventListener("click", (e) => {
  const dialogDimensions = eventFormModal.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    eventFormModal.close();
  }
});
