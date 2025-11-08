const askBox = document.getElementById("askBox");
const askForm = document.getElementById("askForm");
const questionInput = document.getElementById("questionInput");
const imgInput = document.getElementById("imgInput");
const imgPreviewContainer = document.getElementById("imgPreviewContainer");
const imgPreview = document.getElementById("imgPreview");
const removeImg = document.getElementById("removeImg");
const homeBtn = document.getElementById("homeBtn");

let selectedImg = null;

// 🌗 Load Theme
let savedTheme = localStorage.getItem("mode") || localStorage.getItem("theme") || "light";
document.body.classList.add(savedTheme);

// 🏠 Go Home
homeBtn.addEventListener("click", () => {
  window.location.href = "home.html";
});

// 🖼️ Image Preview
imgInput.addEventListener("change", () => {
  const file = imgInput.files[0];
  if (file) {
    selectedImg = file;
    imgPreview.src = URL.createObjectURL(file);
    imgPreviewContainer.classList.remove("hidden");
  }
});

// ❌ Remove Image
removeImg.addEventListener("click", () => {
  selectedImg = null;
  imgPreview.src = "";
  imgPreviewContainer.classList.add("hidden");
  imgInput.value = "";
});

// ✉️ Send Question
askForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = questionInput.value.trim();
  if (!text && !selectedImg) return;

  const msg = document.createElement("div");
  msg.classList.add("question", "sent");

  if (text) msg.textContent = text;

  if (selectedImg) {
    const imgTag = document.createElement("img");
    imgTag.src = URL.createObjectURL(selectedImg);
    imgTag.classList.add("ask-img");
    msg.appendChild(imgTag);

    selectedImg = null;
    imgPreview.src = "";
    imgPreviewContainer.classList.add("hidden");
    imgInput.value = "";
  }

  askBox.appendChild(msg);
  askBox.scrollTop = askBox.scrollHeight;
  questionInput.value = "";

  autoReply();
});

// 🤖 Auto Reply
function autoReply() {
  setTimeout(() => {
    const replies = [
      "Good question!",
      "Let’s find out 🤔",
      "Nice one!",
      "I’ll check that!",
      "Interesting thought!",
      "Hmm, I agree!"
    ];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    const msg = document.createElement("div");
    msg.classList.add("question", "received");
    msg.textContent = reply;
    askBox.appendChild(msg);
    askBox.scrollTop = askBox.scrollHeight;
  }, 900);
}
