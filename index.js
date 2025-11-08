// ✅ Theme setup
const theme = localStorage.getItem("theme") || "light";
document.body.classList.add(theme === "dark" ? "dark-mode" : "light-mode");

// ✅ Background setup
document.body.style.background = `url('login.jpg') no-repeat center center / cover`;
document.body.style.backgroundAttachment = "fixed";
document.body.style.color = theme === "dark" ? "#fff" : "#000";

// ✅ Login functionality
const form = document.getElementById("loginForm");
const enterByIdBtn = document.getElementById("enterById");
const msg = document.getElementById("loginMsg");

async function handleLogin(department, semester, shift, studentID) {
  if (!department && !studentID) {
    msg.textContent = "❌ Please select Department or enter Student ID.";
    return;
  }

  msg.textContent = "⏳ Logging in...";

  setTimeout(() => {
    msg.textContent = "✅ Logged in successfully!";
    localStorage.setItem("userDept", department);
    localStorage.setItem("userSem", semester);
    localStorage.setItem("userShift", shift);
    localStorage.setItem("studentID", studentID);
    window.location.href = "home.html";
  }, 1200);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const department = document.getElementById("department").value;
  const semester = document.getElementById("semester").value;
  const shift = document.getElementById("shift").value;
  handleLogin(department, semester, shift, "");
});

enterByIdBtn.addEventListener("click", () => {
  const studentID = document.getElementById("studentID").value.trim();
  handleLogin("", "", "", studentID);
});
