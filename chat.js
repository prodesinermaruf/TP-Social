// 🌗 Apply Saved Theme from Home
let savedTheme = localStorage.getItem("mode") || localStorage.getItem("theme") || "light";
document.body.classList.add(savedTheme);

const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const imgInput = document.getElementById("imgInput");
const imgPreviewContainer = document.getElementById("imgPreviewContainer");
const imgPreview = document.getElementById("imgPreview");
const removeImgBtn = document.getElementById("removeImg");
const homeBtn = document.getElementById("homeBtn");

let selectedImage = null;

// 🏠 Go to Home
homeBtn.addEventListener("click", () => {
  window.location.href = "home.html";
});

// 🖼️ Select Image Preview
imgInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    selectedImage = file;
    imgPreview.src = URL.createObjectURL(file);
    imgPreviewContainer.classList.remove("hidden");
  }
});

// ❌ Remove Selected Image
removeImgBtn.addEventListener("click", () => {
  selectedImage = null;
  imgPreview.src = "";
  imgPreviewContainer.classList.add("hidden");
  imgInput.value = "";
});

// ✉️ Send Message
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (!text && !selectedImage) return;

  const msg = document.createElement("div");
  msg.classList.add("message", "sent");

  if (text) msg.textContent = text;

  if (selectedImage) {
    const imgTag = document.createElement("img");
    imgTag.src = URL.createObjectURL(selectedImage);
    imgTag.classList.add("chat-img");
    msg.appendChild(imgTag);

    selectedImage = null;
    imgPreview.src = "";
    imgPreviewContainer.classList.add("hidden");
    imgInput.value = "";
  }

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  messageInput.value = "";

  autoReply();
});

// 🤖 Auto Reply
function autoReply() {
  setTimeout(() => {
    const replies = [
      "Nice!",
      "Okay 👍",
      "Haha 😂",
      "Got it!",
      "Good point!",
      "Interesting..."
    ];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    const msg = document.createElement("div");
    msg.classList.add("message", "received");
    msg.textContent = reply;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 800);
}
