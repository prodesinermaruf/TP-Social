const enterByIdBtn = document.getElementById("enterById");
const msg = document.getElementById("loginMsg");

// Create hidden password section
const passwordSection = document.createElement("div");
passwordSection.innerHTML = `
  <p id="stun">Student ID is Valid</p>
  <p>Please Enter A Unique Password</p>

  <div class="password-wrapper">
    <input type="password" id="password1" class="id-input" placeholder="Input password...">
    <button type="button" class="toggle-visibility" data-target="password1" aria-label="Show password">
      <svg class="eye-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 
        5-5 5 2.24 5 5-2.24 5-5 5z"></path>
        <circle cx="12" cy="12" r="2.5"></circle>
      </svg>
    </button>
  </div>

  <div class="password-wrapper">
    <input type="password" id="password2" class="id-input" placeholder="Confirm password...">
    <button type="button" class="toggle-visibility" data-target="password2" aria-label="Show password">
      <svg class="eye-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 
        5-5 5 2.24 5 5-2.24 5-5 5z"></path>
        <circle cx="12" cy="12" r="2.5"></circle>
      </svg>
    </button>
  </div>

  <button id="continueBtn" class="enter-btn">Continue</button>
  <p id="continueMsg" style="margin-top:8px;font-size:14px;font-weight:500;"></p>
  <p style="font-size:12px;opacity:0.8;">Security Notice: Your student key and password are confidential.</p>
`;
passwordSection.style.display = "none";
document.querySelector(".login-container").appendChild(passwordSection);

// Verify ID
function handleEnterAction() {
  const studentID = document.getElementById("studentID").value.trim();
  if (!studentID) {
    msg.textContent = "❌ Please input your student key.";
    return;
  }

  msg.textContent = "⏳ Verifying key...";
  setTimeout(() => {
    msg.textContent = "";
    document.getElementById("loginForm").style.display = "none";
    passwordSection.style.display = "flex";
    passwordSection.style.flexDirection = "column";
    passwordSection.style.alignItems = "center";
    passwordSection.style.gap = "10px";
    document.getElementById("password1").focus();
  }, 1000);
}

enterByIdBtn.addEventListener("click", handleEnterAction);
document.getElementById("studentID").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handleEnterAction();
  }
});

// Continue button
function handleContinueAction() {
  const btn = document.getElementById("continueBtn");
  const p1 = document.getElementById("password1").value.trim();
  const p2 = document.getElementById("password2").value.trim();
  const continueMsg = document.getElementById("continueMsg");

  if (!p1 || !p2) {
    continueMsg.style.color = "red";
    continueMsg.textContent = "⚠️ Please fill both password fields.";
    return;
  }
  if (p1 !== p2) {
    continueMsg.style.color = "red";
    continueMsg.textContent = "⚠️ Passwords do not match!";
    return;
  }

  btn.disabled = true;
  btn.innerHTML = `<span class="loader"></span> Opening...`;
  continueMsg.textContent = "";

  setTimeout(() => {
    localStorage.setItem("studentPassword", p1);
    btn.innerHTML = "✅ Opened!";
    btn.style.backgroundColor = "#2ecc71";

    setTimeout(() => {
      window.location.href = "home.html";
    }, 1000);
  }, 2000);
}

// Enter key handling
document.addEventListener("keypress", (e) => {
  const active = document.activeElement;
  if (e.key === "Enter") {
    if (active.id === "password1") {
      e.preventDefault();
      document.getElementById("password2").focus();
    } else if (active.id === "password2") {
      e.preventDefault();
      handleContinueAction();
    }
  }
});

// ✅ Hover + Click combined password toggle
function setupHoverToggle(passwordId, toggleSelector) {
  const input = document.getElementById(passwordId);
  const toggle = document.querySelector(toggleSelector);
  input.dataset.clicked = "false";

  // Hover করলে show
  toggle.addEventListener("mouseenter", () => {
    if (input.dataset.clicked === "false") input.type = "text";
  });

  // Hover ছাড়লে hide
  toggle.addEventListener("mouseleave", () => {
    if (input.dataset.clicked === "false") input.type = "password";
  });

  // Click করলে lock/unlock
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    if (input.dataset.clicked === "false") {
      input.type = "text";
      input.dataset.clicked = "true";
    } else {
      input.type = "password";
      input.dataset.clicked = "false";
    }
  });
}

// Delay দিয়ে call করা লাগবে কারণ password section পরে create হয়
setTimeout(() => {
  setupHoverToggle("password1", '.toggle-visibility[data-target="password1"]');
  setupHoverToggle("password2", '.toggle-visibility[data-target="password2"]');
}, 800);
document.getElementById("continueBtn").addEventListener("click", handleContinueAction);
