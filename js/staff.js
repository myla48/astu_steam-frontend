// Check login and role
const userDisplay = document.getElementById("userDisplay");
userDisplay.innerText = "Logged in as: " + user.username;
const user = JSON.parse(localStorage.getItem("user"));

if (!user || user.role !== "staff") {
  window.location.href = "login.html";
}

// Logout
function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// Load complaints
let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
const tableBody = document.getElementById("complaintTableBody");

// Display complaints
function displayComplaints() {
  tableBody.innerHTML = "";

  complaints.forEach(function (complaint) {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${complaint.title}</td>
            <td>${complaint.description}</td>
            <td>${complaint.status}</td>
            <td>
                <select onchange="changeStatus(${complaint.id}, this.value)">
                    <option value="Pending" ${complaint.status === "Pending" ? "selected" : ""}>Pending</option>
                    <option value="In Progress" ${complaint.status === "In Progress" ? "selected" : ""}>In Progress</option>
                    <option value="Resolved" ${complaint.status === "Resolved" ? "selected" : ""}>Resolved</option>
                </select>
            </td>
            <td>
                <button onclick="deleteComplaint(${complaint.id})">Delete</button>
            </td>
        `;

    tableBody.appendChild(row);
  });
}

// Change status
function changeStatus(id, newStatus) {
  const complaint = complaints.find(function (item) {
    return item.id === id;
  });

  if (complaint) {
    complaint.status = newStatus;
    localStorage.setItem("complaints", JSON.stringify(complaints));
    displayComplaints();
  }
}

// Delete complaint
function deleteComplaint(id) {
  complaints = complaints.filter(function (item) {
    return item.id !== id;
  });

  localStorage.setItem("complaints", JSON.stringify(complaints));
  displayComplaints();
}

// Filter complaints
function filterComplaints() {
  const selected = document.getElementById("filterStatus").value;

  if (selected === "All") {
    displayComplaints();
    return;
  }

  const filtered = complaints.filter(function (item) {
    return item.status === selected;
  });

  tableBody.innerHTML = "";

  filtered.forEach(function (complaint) {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${complaint.title}</td>
            <td>${complaint.description}</td>
            <td>${complaint.status}</td>
            <td>-</td>
            <td>-</td>
        `;

    tableBody.appendChild(row);
  });
}

// Load on page open
displayComplaints();
function updateStats() {
  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "Pending").length;
  const inProgress = complaints.filter(
    (c) => c.status === "In Progress",
  ).length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;

  document.getElementById("totalComplaints").innerText = total;
  document.getElementById("pendingComplaints").innerText = pending;
  document.getElementById("inProgressComplaints").innerText = inProgress;
  document.getElementById("resolvedComplaints").innerText = resolved;
}
function searchComplaints() {
  const query = document.getElementById("searchInput").value.toLowerCase();

  const filtered = complaints.filter(
    (c) =>
      c.title.toLowerCase().includes(query) ||
      c.description.toLowerCase().includes(query),
  );

  tableBody.innerHTML = "";

  filtered.forEach((c) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${c.title}</td>
            <td>${c.description}</td>
            <td>${c.status}</td>
            <td>
                <select onchange="changeStatus(${c.id}, this.value)">
                    <option value="Pending" ${c.status === "Pending" ? "selected" : ""}>Pending</option>
                    <option value="In Progress" ${c.status === "In Progress" ? "selected" : ""}>In Progress</option>
                    <option value="Resolved" ${c.status === "Resolved" ? "selected" : ""}>Resolved</option>
                </select>
            </td>
            <td>
                <button onclick="deleteComplaint(${c.id})">Delete</button>
            </td>
        `;
    tableBody.appendChild(row);
  });

  updateStats(); // Keep stats updated
}
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
