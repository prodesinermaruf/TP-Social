const enterByIdBtn = document.getElementById("enterById");
const msg = document.getElementById("loginMsg");

// Create hidden password section
const passwordSection = document.createElement("div");
passwordSection.innerHTML = `
  <p style="color:#2ecc71; font-weight:bold;">Student Key is Valid</p>
  <p>Please Enter A Unique Password</p>
  <input type="password" id="password1" class="id-input" placeholder="Input password...">
  <input type="password" id="password2" class="id-input" placeholder="Confirm password...">
  <button id="continueBtn" class="enter-btn">Continue</button>
  <p id="continueMsg" style="margin-top:8px;font-size:14px;font-weight:500;"></p>
  <p style="font-size:12px;opacity:0.8;">Security Notice: Your student key and password are confidential.</p>
`;
passwordSection.style.display = "none";
document.querySelector(".login-container").appendChild(passwordSection);

// When Enter is clicked
enterByIdBtn.addEventListener("click", () => {
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
  }, 1000);
});

// Continue button → loading animation
document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "continueBtn") {
    const btn = e.target;
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

    // Disable button and show loading
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
});
