// 🌗 Restore Theme
const savedTheme = localStorage.getItem("mode") || localStorage.getItem("theme") || "light";
document.body.classList.add(savedTheme);

// 🏠 Go to Home
document.getElementById("homeBtn").addEventListener("click", () => {
  window.location.href = "home.html";
});

// 📖 Read More Popup
function readMore(id) {
  const messages = {
    1: "Balancing study and fun helps you stay motivated. Schedule breaks, enjoy hobbies, and study smart — not hard!",
    2: "Campus life is full of stories — laughter, teamwork, friendships. These moments shape us for the future!",
    3: "To study smarter, make summaries, use flashcards, and avoid multitasking. Small steps make big progress!"
  };
  alert(messages[id]);
}
