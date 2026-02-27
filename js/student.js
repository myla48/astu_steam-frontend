// Check login and role
const userDisplay = document.getElementById("userDisplay");
userDisplay.innerText = "Logged in as: " + user.username;
const user = JSON.parse(localStorage.getItem("user"));

if (!user || user.role !== "student") {
  window.location.href = "login.html";
}

// Logout function
function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// Get form and complaints
const form = document.getElementById("complaintForm");
let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

// Submit complaint
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  const complaint = {
    id: Date.now(),
    title: title,
    description: description,
    status: "Pending",
  };

  complaints.push(complaint);

  localStorage.setItem("complaints", JSON.stringify(complaints));

  alert("Complaint submitted successfully!");

  form.reset();
});
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
