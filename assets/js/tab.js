const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

function getMonthName(monthIndex) {
  const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
  return monthNames[monthIndex];
}

function getWeekendDates(year, monthIndex) {
  const weekends = [];
  const date = new Date(year, monthIndex, 1);
  while (date.getMonth() === monthIndex) {
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      weekends.push(new Date(date.getTime()));
    }
    date.setDate(date.getDate() + 1);
  }
  return weekends;
}

function createMonthTab(year, monthIndex) {
  const monthName = getMonthName(monthIndex);
  const tab = document.createElement('li');
  tab.innerHTML = monthName;
  tab.addEventListener('click', function() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(function(tab) {
      tab.classList.remove('active');
    });
    const tabContent = document.getElementById(`tab-content-${year}-${monthIndex}`);
    tabContent.classList.add('active');
  });
  return tab;
}

function createWeekendButton(date) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeekName = daysOfWeek[date.getDay()];
  const button = document.createElement('button');
  button.innerHTML = `${getMonthName(date.getMonth())} ${date.getDate()} (${dayOfWeekName})`;
  return button;
}

function createMonthTabContent(year, monthIndex) {
  const tabContent = document.createElement('div');
  tabContent.classList.add('tab');
  tabContent.setAttribute('id', `tab-content-${year}-${monthIndex}`);
  const weekendDates = getWeekendDates(year, monthIndex);
  weekendDates.forEach(function(date) {
    const button = createWeekendButton(date);
    tabContent.appendChild(button);
  });
  return tabContent;
}

const tabs = document.querySelector('#tabs ul');
const tabContentContainer = document.querySelector('#tabs');

// Add tabs for the current and next month
for (let i = 0; i < 2; i++) {
  let year = currentYear;
  let monthIndex = currentMonth + i;
  if (monthIndex > 11) {
    monthIndex = 0;
    year++;
  }
  const tab = createMonthTab(year, monthIndex);
  tabs.appendChild(tab);
  
  const tabContent = createMonthTabContent(year, monthIndex);
  tabContentContainer.appendChild(tabContent);
}

// Set the first tab as active
const firstTabContent = document.querySelector('.tab');
firstTabContent.classList.add('active');