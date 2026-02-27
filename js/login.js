// Get form
const form = document.getElementById("loginForm");

// When login form is submitted
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Stop refresh

  const username = document.getElementById("username").value;
  const role = document.getElementById("role").value;

  // Save login info in localStorage
  localStorage.setItem(
    "user",
    JSON.stringify({
      username: username,
      role: role,
    }),
  );

  // Redirect based on role
  if (role === "student") {
    window.location.href = "student.html";
  } else {
    window.location.href = "staff.html";
  }
});
