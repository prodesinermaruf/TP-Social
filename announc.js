// =============================== 🌙 THEME LOAD ===============================
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const savedTheme = localStorage.getItem("theme") || "light";
  body.className = savedTheme;
});

// =============================== ⚙️ SETTINGS MENU ===============================
const settingsBtn = document.getElementById("settingsBtn");
const settingsMenu = document.getElementById("settingsMenu");

settingsBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  settingsMenu.style.display =
    settingsMenu.style.display === "flex" ? "none" : "flex";
});

// 🟢 mobile view এ বাইরে ট্যাপ করলে বন্ধ হবে না
document.addEventListener("click", (e) => {
  const isMobile = window.innerWidth <= 768;
  if (!isMobile && !settingsMenu.contains(e.target) && e.target !== settingsBtn) {
    settingsMenu.style.display = "none";
  }
});

// =============================== 🔐 ADMIN LOGIN ===============================
let isAdmin = false;
const addBtn = document.getElementById("addBtn");
const loginModal = document.getElementById("loginModal");
const adminPassInput = document.getElementById("adminPass");
const ADMIN_PASS = "1234";

function openLogin() {
  loginModal.style.display = "flex";
  settingsMenu.style.display = "none";
  adminPassInput.focus();
}

function closeLogin() {
  loginModal.style.display = "none";
  adminPassInput.value = "";
  adminPassInput.placeholder = "Enter Admin Password";
}

function checkLogin() {
  const password = adminPassInput.value.trim();
  if (password === ADMIN_PASS) {
    isAdmin = true;
    addBtn.style.display = "flex";
    showDeleteButtons(true);
    closeLogin();
  } else {
    adminPassInput.value = "";
    adminPassInput.placeholder = "❌ Wrong Password";
  }
}

adminPassInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") checkLogin();
});

// =============================== ➕ ADD ANNOUNCEMENT ===============================
const addModal = document.getElementById("addModal");
const titleInput = document.getElementById("newTitle");
const contentInput = document.getElementById("newContent");
const typeSelect = document.getElementById("typeSelect");

addBtn.addEventListener("click", () => {
  if (!isAdmin) return;
  addModal.style.display = "flex";
  titleInput.focus();
});

function closeModal() {
  addModal.style.display = "none";
  titleInput.value = "";
  contentInput.value = "";
}

function addAnnouncement() {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const type = typeSelect.value;

  if (!title || !content) return;

  const container = document.getElementById("announcement-container");
  const newCard = document.createElement("div");
  newCard.classList.add("announcement");

  const date = new Date().toLocaleDateString("bn-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  newCard.innerHTML = `
    <span class="date">${date}</span>
    <h3 class="title">${type === "event" ? "📅 " : "📜 "}${title}</h3>
    <p class="details">${content}</p>
    <button class="delete-btn" onclick="deleteAnnouncement(this)" style="display:${isAdmin ? 'block' : 'none'}">✖</button>
  `;

  container.prepend(newCard);
  closeModal();
}

// =============================== ❌ DELETE ANNOUNCEMENT ===============================
function deleteAnnouncement(btn) {
  const passBox = document.createElement("input");
  passBox.type = "password";
  passBox.placeholder = "Enter admin password to delete";
  Object.assign(passBox.style, {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    zIndex: "2000",
    background: "#fff",
    outline: "none",
  });
  document.body.appendChild(passBox);
  passBox.focus();

  const submitDelete = () => {
    if (passBox.value.trim() === ADMIN_PASS) {
      btn.parentElement.remove();
    } else {
      passBox.placeholder = "❌ Wrong Password";
    }
    document.body.removeChild(passBox);
  };

  passBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") submitDelete();
  });
  passBox.addEventListener("blur", () => {
    if (document.body.contains(passBox)) document.body.removeChild(passBox);
  });
}

function showDeleteButtons(show) {
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.style.display = show ? "block" : "none";
  });
}

function goHome() {
  window.location.href = "home.html";
}

window.addEventListener("click", (e) => {
  if (e.target === addModal) closeModal();
  if (e.target === loginModal) closeLogin();
});

// Export
window.openLogin = openLogin;
window.closeLogin = closeLogin;
window.checkLogin = checkLogin;
window.addAnnouncement = addAnnouncement;
window.closeModal = closeModal;
window.deleteAnnouncement = deleteAnnouncement;
window.goHome = goHome;
