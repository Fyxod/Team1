const selectedDateDisplay = document.getElementById("selected-date");
    const timeInput = document.getElementById("timeInput");
    const subjectInput = document.getElementById("subjectInput");
    const typeSelect = document.getElementById("typeSelect");
    const roomSelect = document.getElementById("roomSelect");
    const addEntryButton = document.getElementById("addEntry");
    const entryList = document.getElementById("entryList");
    const dateElement = document.getElementById("current-date");

    let currentDate = new Date();
    let selectedDate = null;
    let currentDayKey = null;

    let weeklyEntries = {
      Sun: [], Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: []
    };

    const now = new Date();
    const options = { weekday: "short" };
    const dayName = now.toLocaleDateString(undefined, options);
    const formattedDate = `${dayName}, ${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}`;
    dateElement.textContent = formattedDate;

    const createCalendar = (year, month) => {
      const date = new Date(year, month, 1);
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const startDay = date.getDay();
      const today = new Date();
      const monthName = date.toLocaleString("default", { month: "long" });
    
      let calendarHTML = `
        <div style="max-width: 950px; padding: 40px; background: #2b2b2b; color: white; font-family: 'League Spartan', sans-serif; border-radius: 18px; box-shadow: 0 4px 25px rgba(0,0,0,0.6); font-size: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
            <button id="prevMonth" style="background: none; border: none; color: #aaa; font-size: 28px; cursor: pointer; padding: 6px 12px; border-radius: 8px;">&larr;</button>
            <h2 style="margin: 0; font-size: 28px;">${monthName} ${year}</h2>
            <button id="nextMonth" style="background: none; border: none; color: #aaa; font-size: 28px; cursor: pointer; padding: 6px 12px; border-radius: 8px;">&rarr;</button>
          </div>
          <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 14px; text-align: center; font-weight: bold; color: #ccc; font-size: 18px;">
            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
          </div>
          <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 14px; margin-top: 14px;">
      `;
    
      for (let i = 0; i < startDay; i++) calendarHTML += `<div></div>`;
    
      for (let day = 1; day <= daysInMonth; day++) {
        const dateObj = new Date(year, month, day);
        const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
        const isSelected = selectedDate &&
                           dateObj.getDate() === selectedDate.getDate() &&
                           dateObj.getMonth() === selectedDate.getMonth() &&
                           dateObj.getFullYear() === selectedDate.getFullYear();
      
        const isPast = dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate());
        
        const bgColor = isToday
          ? "#4caf50"
          : isSelected
          ? "#1976d2"
          : isPast
          ? "#1a1a1a"
          : "#262626";
      
        const textColor = isPast ? "#777" : "white";
        const hoverColor = isToday ? "#43a047" : isPast ? "#1a1a1a" : "#3c3c3c";
        const cursorStyle = isPast ? "default" : "pointer";
        const clickHandler = isPast ? "" : `onclick="handleDateClick(${day}, ${month}, ${year})"`;
      
        calendarHTML += `
          <div style="
            padding: 20px;
            border-radius: 10px;
            background: ${bgColor};
            color: ${textColor};
            cursor: ${cursorStyle};
            transition: background 0.2s, transform 0.2s;
            font-weight: ${isToday ? "bold" : "normal"};
            box-shadow: ${isToday ? "0 0 12px #4caf50aa" : isSelected ? "0 0 10px #1976d2aa" : "none"};
            transform: ${isToday || isSelected ? "scale(1.08)" : "none"};
            font-size: 22px;
          " ${clickHandler} ${!isPast ? `onmouseover="this.style.background='${hoverColor}'" onmouseout="this.style.background='${bgColor}'"` : ""}>
            ${day}
          </div>`;
      }
      
    
      calendarHTML += `</div></div>`;
      document.getElementById("calendar-container").innerHTML = calendarHTML;
    
      // Navigation handlers
      document.getElementById("prevMonth").addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        createCalendar(currentDate.getFullYear(), currentDate.getMonth());
      });
      document.getElementById("nextMonth").addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        createCalendar(currentDate.getFullYear(), currentDate.getMonth());
      });
    };
    

    function handleDateClick(day, month, year) {
      selectedDate = new Date(year, month, day);
      const dayName = selectedDate.toLocaleDateString(undefined, { weekday: "short" });
      const formatted = `${dayName}, ${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}`;
      currentDayKey = dayName;
      if (selectedDateDisplay) selectedDateDisplay.textContent = `Selected: ${formatted}`;
      renderEntries();
      createCalendar(currentDate.getFullYear(), currentDate.getMonth()); // Refresh to highlight selected
    }
    

    addEntryButton.addEventListener("click", () => {
      if (!currentDayKey) {
        alert("Please select a date first.");
        return;
      }
      const time = timeInput.value.trim();
      const subject = subjectInput.value.trim();
      const type = typeSelect.value;
      const room = roomSelect.value;
      if (!time || !subject || type === "Type" || room === "Room") {
        alert("Please fill in all fields.");
        return;
      }
      const entry = { time, subject, type, room };
      weeklyEntries[currentDayKey].push(entry);
      renderEntries();
      timeInput.value = "";
      subjectInput.value = "";
      typeSelect.selectedIndex = 0;
      roomSelect.selectedIndex = 0;
    });

    function renderEntries() {
      entryList.innerHTML = "";
      if (!currentDayKey || !weeklyEntries[currentDayKey]) return;
      weeklyEntries[currentDayKey].forEach((entry) => {
        const div = document.createElement("div");
        div.style.padding = "8px 0";
        div.style.borderBottom = "1px solid #333";
        div.innerHTML = `<strong>${entry.time}</strong> — ${entry.subject} (${entry.type}, ${entry.room})`;
        entryList.appendChild(div);
      });
    }

    createCalendar(currentDate.getFullYear(), currentDate.getMonth());
    handleDateClick(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear());