function showDashboard(role) {
  let dashboards = document.querySelectorAll(".dashboard");

  dashboards.forEach(function (section) {
    section.classList.remove("active");
  });

  document.getElementById(role).classList.add("active");

  let roleText = role.charAt(0).toUppercase() + role.slice(1);

  document.getElementById("roleDisplay").innerText -
    " Logged in as : " +
    roleText;

  let links = document.querySelectorAll("nav a");
  links.forEach((link) => link.classList.remove("active-nav"));

  Element.classList.add("active-nav");
}
