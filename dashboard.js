document.addEventListener("DOMContentLoaded", () => {
  const savedEmail = localStorage.getItem("temp_email");
  if (savedEmail) {
    const namePart = savedEmail.split("@")[0];
    document.getElementById("studentNameDisplay").innerText = namePart;
    document.getElementById("userAvatar").innerText = namePart
      .charAt(0)
      .toUpperCase();
  }

  const themeBtn = document.getElementById("themeToggleBtn");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
    themeBtn.innerHTML = "☀️ Light";
  }

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
      localStorage.setItem("theme", "dark");
      themeBtn.innerHTML = "☀️ Light";
    } else {
      localStorage.setItem("theme", "light");
      themeBtn.innerHTML = "🌙 Dark";
    }
  });

  const monthNames = [
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
  document.getElementById("dynamicMonth").innerText =
    monthNames[new Date().getMonth()];

  buildCalendar();
  displayMenu();

  setupNavigation();
  document
    .getElementById("generateTokenBtn")
    .addEventListener("click", generateDailyToken);
  document
    .getElementById("daySelector")
    .addEventListener("change", displayMenu);
  document.getElementById("logoutBtn").addEventListener("click", () => {
    window.location.href = "logout.html";
  });
});

function setupNavigation() {
  const navItems = document.querySelectorAll(".nav-item[data-target]");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      document
        .querySelectorAll(".tab-content")
        .forEach((tab) => (tab.style.display = "none"));
      document
        .querySelectorAll(".nav-item")
        .forEach((btn) => btn.classList.remove("active"));

      const targetId = this.getAttribute("data-target");
      document.getElementById(targetId).style.display = "block";
      this.classList.add("active");
    });
  });
}

const todayDate = new Date().getDate();

function buildCalendar() {
  const grid = document.getElementById("calendarGrid");
  grid.innerHTML = "";
  for (let i = 1; i <= 31; i++) {
    const cell = document.createElement("div");
    cell.className = "day-cell";
    cell.innerText = i;
    cell.id = `day-${i}`;
    if (i === todayDate) cell.classList.add("today");
    grid.appendChild(cell);
  }
}

function generateDailyToken() {
  const todayCell = document.getElementById(`day-${todayDate}`);
  if (todayCell) todayCell.classList.add("collected");

  const statusText = document.getElementById("tokenStatus");
  statusText.innerText = "Active ✓";
  statusText.className = "status-badge active";

  document.getElementById("generateTokenBtn").style.display = "none";

  const monthNames = [
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
  const currentMonth = monthNames[new Date().getMonth()];

  const qrDataString = `Chitkara_Mess_${currentMonth}_${todayDate}`; // e.g., Chitkara_Mess_May_17
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrDataString}`;

  document.getElementById("dynamicQrImage").src = qrUrl;
  document.getElementById("qrDateDisplay").innerText =
    `${currentMonth} ${todayDate}`;

  document.getElementById("activeQrCard").style.display = "block";
}

const menuData = {
  Monday: {
    Breakfast: "Stuffed Mix Paratha + Green Chutney + Curd & Butter + Tea",
    Lunch:
      "Dal Tadka & Kadhi + Seasonal Vegetable + Steamed Rice + Wheat Roti + Salad",
    Snacks: "Patty served with Tomato Ketchup + Tea",
    Dinner:
      "Moong Masoor Dal + Kadhai Paneer + Steamed Rice + Wheat Roti + Rasgulla",
  },
  Tuesday: {
    Breakfast: "Poha + Sweet Daliya + Bread Toast & Jam + Fruits + Tea",
    Lunch:
      "Dal Makhani + Mix Veg (Seasonal) + Jeera Rice + Wheat Roti Boondi Raita + Salad",
    Snacks: "Samosa Served with Chutney + Tea",
    Dinner:
      "Rajmah Masala + Jeera Aloo + Steamed Rice + Wheat Roti + Hot Gulab Jamun",
  },
  Wednesday: {
    Breakfast:
      "Methi Paratha / Plain Paratha + Sabzi + Curd + Butter + Tea + (Sprouts Chat)",
    Lunch:
      "White Chana + Katha Mitha Kadoo Ki Sabzi / Aloo Nutri Sabzi + Steamed Rice + Roti + Plain Curd + Chutney + Onion Salad",
    Snacks: "Nacho Chips + Tea",
    Dinner:
      "Sabut Masoor Dal + Mix Vegetables + Steamed Rice + Wheat Roti + Chutney + Ice Cream",
  },
  Thursday: {
    Breakfast:
      "Marconi / Corn Cheeses Sandwich + Bread Jam & Toast + Sweet Daliya + Fruit + Tea",
    Lunch: "Kadhi+ Dry Aloo Mattar + Jeera Rice + Wheat Roti + Salad",
    Snacks: "Vegetable Pasta + Tea",
    Dinner:
      "Ghiya Chana Dal + Mattar Corn Masala / Aloo Capsicum + Steamed Rice + Wheat Roti + Roohafza Milk/ Kheer",
  },
  Friday: {
    Breakfast: "Mix Paratha + Curd & Butter + Tea",
    Lunch:
      "Rajmah Raseela + Soya Nutri Keema (high protein) + Jeera Rice + Wheat Roti + Mix Raita",
    Snacks: "Pastry + Tea",
    Dinner:
      "Moong Saboot Dal + Paneer Preparation + Egg Curry+ Steamed Rice + Wheat Roti + Rasgulla",
  },
  Saturday: {
    Breakfast: "Idli + Sambar + Chutney + Vegetable Upma + Bread Toast + Tea",
    Lunch:
      "Dal Makhani + Masala Soya Chaap + Mint Raita+ Carrot Rice + Wheat Roti",
    Snacks: "Peanut Chat + Khatta Meetha Pani / Panner Sandwich + Tea",
    Dinner: "Saboot Mix Dal + Chilli Potato + Roti + Steamed Rice + Kulfi",
  },
  Sunday: {
    Breakfast: "Poori + Aloo Chana Sabzi + Halwa + Fruit + Tea",
    Lunch:
      "Black Chana + Giya ki Sabzi + Steamed Rice + Wheat Roti + Boondi Raita + Salad",
    Snacks: "Tea + Biscuits / Pasta",
    Dinner:
      "Mah Channa Dal + Aloo Beans / Malai Kofta + Roti + Steamed Rice + Hot Gulab Jamun",
  },
};

function displayMenu() {
  const selectedDay = document.getElementById("daySelector").value;
  const dailyMenu = menuData[selectedDay];
  const container = document.getElementById("menuContainer");

  container.innerHTML = "";

  for (const [mealType, items] of Object.entries(dailyMenu)) {
    const card = document.createElement("div");
    card.className = "meal-card solid-card";
    card.innerHTML = `
            <div class="meal-icon">${mealType.charAt(0)}</div>
            <div class="meal-info">
                <h4>${mealType}</h4>
                <p>${items}</p>
            </div>
        `;
    container.appendChild(card);
  }
}
