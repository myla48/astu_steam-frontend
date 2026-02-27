// ================== FAKE DATABASE ==================
let complaints = [];

// ================== FORM SUBMISSION ==================
document
  .getElementById("complaintForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let title = document.getElementById("title").value;
    let category = document.getElementById("category").value;
    let description = document.getElementById("description").value;

    let complaint = {
      id: Date.now(), // unique id
      title: title,
      category: category,
      description: description,
      status: "Open",
    };

    complaints.push(complaint);

    renderStudentTable();
    renderStaffTable();

    this.reset();
  });

// ================== STUDENT TABLE ==================
function renderStudentTable() {
  let tbody = document.querySelector("#complaintTable tbody");
  tbody.innerHTML = "";

  complaints.forEach(function (c) {
    let badgeClass = getStatusClass(c.status);

    let row = `
            <tr>
                <td>${c.title}</td>
                <td>${c.category}</td>
                <td><span class="${badgeClass}">${c.status}</span></td>
            </tr>
        `;

    tbody.innerHTML += row;
  });
}

// ================== STAFF TABLE ==================
function renderStaffTable() {
  let tbody = document.querySelector("#staffTable tbody");
  tbody.innerHTML = "";

  complaints.forEach(function (c) {
    let badgeClass = getStatusClass(c.status);

    let row = `
            <tr>
                <td>${c.title}</td>
                <td>${c.category}</td>
                <td><span class="${badgeClass}">${c.status}</span></td>
                <td>
                    <select onchange="updateStatus(${c.id}, this.value)">
                        <option ${c.status === "Open" ? "selected" : ""}>Open</option>
                        <option ${c.status === "In Progress" ? "selected" : ""}>In Progress</option>
                        <option ${c.status === "Resolved" ? "selected" : ""}>Resolved</option>
                    </select>
                </td>
            </tr>
        `;

    tbody.innerHTML += row;
  });
}

// ================== UPDATE STATUS ==================
function updateStatus(id, newStatus) {
  complaints = complaints.map(function (c) {
    if (c.id === id) {
      c.status = newStatus;
    }
    return c;
  });

  renderStudentTable();
  renderStaffTable();
}

// ================== BADGE COLOR LOGIC ==================
function getStatusClass(status) {
  if (status === "Open") return "status-open";
  if (status === "In Progress") return "status-progress";
  if (status === "Resolved") return "status-resolved";
}

// ================== DASHBOARD SWITCH ==================
function showDashboard(role, element) {
  let dashboards = document.querySelectorAll(".dashboard");
  dashboards.forEach((section) => section.classList.remove("active"));

  document.getElementById(role).classList.add("active");

  let roleText = role.charAt(0).toUpperCase() + role.slice(1);
  document.getElementById("roleDisplay").innerText =
    "Logged in as: " + roleText;

  let links = document.querySelectorAll("nav a");
  links.forEach((link) => link.classList.remove("active-nav"));

  if (element) element.classList.add("active-nav");
}
