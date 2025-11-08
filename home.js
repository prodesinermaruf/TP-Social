// 🍔 Sidebar toggle 
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
}

// ⚙️ Settings popup toggle
const settingsBtn = document.getElementById("settingsBtn");
const settingsPopup = document.getElementById("settingsPopup");

settingsBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  settingsPopup.classList.toggle("show");
});

document.addEventListener("click", (e) => {
  if (!settingsPopup.contains(e.target) && e.target !== settingsBtn) {
    settingsPopup.classList.remove("show");
  }
});

// 🌙 Dark / ☀️ Light Mode System
function applyTheme(theme) {
  const body = document.body;
  const sidebar = document.getElementById("sidebar");
  const slideBtn = document.querySelector(".slide-btn");
  const buttons = document.querySelectorAll(".sidebar button");

  if (theme === "dark") {
    // 🌙 Dark Mode
    body.classList.add("dark");
    body.classList.remove("light");
    body.style.background = 'url("darkmode2.jpg") no-repeat center center/cover';
    body.style.color = "#fff";

    if (sidebar) {
      sidebar.style.background = 'url("slidedark.jpg") no-repeat center center/cover';
      sidebar.style.backgroundSize = "cover";
      sidebar.style.backgroundPosition = "center";
      sidebar.style.backdropFilter = "blur(8px)";
    }

    buttons.forEach(btn => {
      btn.style.background = "rgba(255,255,255,0.1)";
      btn.style.color = "#fff";
    });

    if (slideBtn) slideBtn.style.filter = "brightness(1)";
  } else {
    // ☀️ Light Mode
    body.classList.add("light");
    body.classList.remove("dark");
    body.style.background = 'url("lightmode2.jpg") no-repeat center center/cover';
    body.style.color = "#222";

    if (sidebar) {
      sidebar.style.background = 'url("slidelight.jpg") no-repeat center center/cover';
      sidebar.style.backgroundSize = "cover";
      sidebar.style.backgroundPosition = "center";
      sidebar.style.backdropFilter = "blur(8px)";
    }

    buttons.forEach(btn => {
      btn.style.background = "rgba(0,0,0,0.1)";
      btn.style.color = "#000";
    });

    if (slideBtn) slideBtn.style.filter = "brightness(0.8)";
  }

  // Scroll বন্ধ রাখো
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  localStorage.setItem("theme", theme);
}

// 💾 Save & Apply Theme
function setDarkMode() {
  localStorage.setItem("theme", "dark");
  applyTheme("dark");
}

function setLightMode() {
  localStorage.setItem("theme", "light");
  applyTheme("light");
}

// 🧩 Load Saved Theme + Sidebar Auto Open
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  const sidebar = document.getElementById("sidebar");
  sidebar.classList.add("active");
});

// 📄 Load different pages
function loadPage(page, btn) {
  document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  // 🏠 Home button ক্লিক করলে sidebar বন্ধ হবে
  if (page === "home-content.html") {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.remove("active");
    return; // শুধু sidebar বন্ধ করবে
  }

  if (page) {
    window.location.href = page;
  }
}

// 🖱️ Sidebar close on outside click (mobile view only)
document.addEventListener("click", (e) => {
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.querySelector(".menu-toggle");
  const slideBtn = document.querySelector(".slide-btn");

  if (
    window.innerWidth <= 768 &&
    sidebar.classList.contains("active") &&
    !sidebar.contains(e.target) &&
    e.target !== menuToggle &&
    e.target !== slideBtn
  ) {
    sidebar.classList.remove("active");
  }
});

// 🎓 Show Student ID for 3 seconds
const nameEl = document.getElementById("name");
const numberEl = document.getElementById("number");
const popup = document.getElementById("studentIdPopup");

function showStudentId() {
  popup.classList.add("show");
  setTimeout(() => {
    popup.classList.remove("show");
  }, 3000); // 3 seconds
}

nameEl.addEventListener("click", showStudentId);
numberEl.addEventListener("click", showStudentId);
