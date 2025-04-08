const popup = document.createElement("div");
popup.innerHTML = `
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <span>no new notifications</span>
    <button id="closePopup" style="
      background: none;
      border: none;
      color: white;
      font-size: 18px;
      margin-left: 10px;
      cursor: pointer;
    ">&times;</button>
  </div>
`;
popup.style.position = "absolute";
popup.style.top = "60px";
popup.style.right = "20px";
popup.style.padding = "20px";
popup.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
popup.style.color = "white";
popup.style.borderRadius = "8px";
popup.style.display = "none";
popup.style.opacity = "0";
popup.style.transition = "opacity 0.3s ease";
popup.style.zIndex = "1000";
document.body.appendChild(popup);

const bellIcon = document.getElementById("bell-icon");
let isVisible = false;

// animation
bellIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  isVisible = !isVisible;
  if (isVisible) {
    popup.style.display = "block";
    setTimeout(() => {
      popup.style.opacity = "1";
    }, 10);
  } else {
    popup.style.opacity = "0";
    setTimeout(() => {
      popup.style.display = "none";
    }, 300);
  }
});

// close outside
document.addEventListener("click", () => {
  if (isVisible) {
    popup.style.opacity = "0";
    setTimeout(() => {
      popup.style.display = "none";
    }, 300);
    isVisible = false;
  }
});

// popup on
popup.addEventListener("click", (e) => {
  e.stopPropagation();
});

// popup close
popup.querySelector("#closePopup").addEventListener("click", () => {
  popup.style.opacity = "0";
  setTimeout(() => {
    popup.style.display = "none";
    isVisible = false;
  }, 300);
});
const calendarContainer = document.getElementById("calendar-container");

  let currentDate = new Date();

  const createCalendar = (year, month) => {
    const date = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = date.getDay();

    const monthName = date.toLocaleString('default', { month: 'long' });

    let calendarHTML = `
    <div style="
    max-width: 700px;
    padding: 30px;
    background: #2b2b2b;
    color: white;
    font-family: 'League Spartan', sans-serif;
    border-radius: 12px;
    box-shadow: 0 2px 15px rgba(0,0,0,0.5);
    font-size: 18px;
    ">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <button id="prevMonth" style="
            background: none;
            border: none;
            color: #aaa;
            font-size: 20px;
            cursor: pointer;
            padding: 5px 10px;
            border-radius: 6px;
          ">&larr;</button>
          <h2 style="margin: 0;">${monthName} ${year}</h2>
          <button id="nextMonth" style="
            background: none;
            border: none;
            color: #aaa;
            font-size: 20px;
            cursor: pointer;
            padding: 5px 10px;
            border-radius: 6px;
          ">&rarr;</button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; text-align: center; font-weight: bold; color: #aaa;">
          <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; margin-top: 10px;">
    `;

    for (let i = 0; i < startDay; i++) {
      calendarHTML += `<div></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = 
        day === new Date().getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear();
    
      const isPast =
        new Date(year, month, day) < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    
      const bgColor = isToday ? '#4caf50' : isPast ? '#111' : '#1e1e1e';
      const textColor = isPast ? '#777' : 'white';
      const hoverColor = isToday ? '#43a047' : isPast ? '#111' : '#3a3a3a';
      const cursorStyle = isPast ? 'default' : 'pointer';
    
      calendarHTML += `
        <div style="
          padding: 16px;
          border-radius: 6px;
          background: ${bgColor};
          color: ${textColor};
          cursor: ${cursorStyle};
          transition: background 0.2s, transform 0.2s;
          font-weight: ${isToday ? 'bold' : 'normal'};
          box-shadow: ${isToday ? '0 0 8px #4caf50aa' : 'none'};
          transform: ${isToday ? 'scale(1.05)' : 'none'};
          font-size: 18px;
        "
        ${!isPast ? `
          onmouseover="this.style.background='${hoverColor}'"
          onmouseout="this.style.background='${bgColor}'"
        ` : ''}
        >
          ${day}
        </div>
      `;
    }
    

    calendarHTML += `</div></div>`;
    calendarContainer.innerHTML = calendarHTML;

    // Add button event listeners
    document.getElementById("prevMonth").addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      createCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });

    document.getElementById("nextMonth").addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      createCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });
  };

  createCalendar(currentDate.getFullYear(), currentDate.getMonth());