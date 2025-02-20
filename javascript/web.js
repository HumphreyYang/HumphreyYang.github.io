const setMaxTextWidth = () => {
  let maxTextWidth = 0;
  const iconTextElements = document.querySelectorAll(".icon-text");
  
  iconTextElements.forEach((element) => {
    element.style.width = "auto";
    if (element.offsetWidth > maxTextWidth) {
      maxTextWidth = element.offsetWidth;
    }
  });
  
  iconTextElements.forEach((element) => {
    element.style.width = `${maxTextWidth}px`;
  });
};

function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("active");
}

function closeSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.remove("active");
}

document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("fade-in", "show");

  // Handle browser navigation
  window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
      document.body.classList.remove("fade-out");
      document.body.classList.add("fade-in", "show");
    }
  });

  // Set active page
  const currentPath = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
  const links = document.querySelectorAll(".sidebar-nav-item");
  
  links.forEach(link => {
    const linkPath = link.getAttribute('href').toLowerCase();
    link.classList.remove('active');
    
    // Handle home page special case
    if ((currentPath === '' || currentPath === 'index.html') && linkPath === 'index.html') {
      link.classList.add('active');
    }
    // Handle other pages
    else if (currentPath === linkPath) {
      link.classList.add('active');
    }
  });

  // Link click handler
  document.addEventListener("click", function (event) {
    const link = event.target.closest("a");
    if (!link || link.classList.contains("no-fade")) return;

    if (link.hostname !== window.location.hostname) return;

    event.preventDefault();
    const url = link.href;

    document.body.classList.remove("show");
    document.body.classList.add("fade-out");

    setTimeout(() => {
      window.location.href = url;
    }, 500);
  });

  // Close sidebar interactions
  document.addEventListener("click", function (event) {
    const sidebar = document.querySelector(".sidebar");
    const toggleBtn = document.querySelector(".sidebar-toggle");
    
    if (!sidebar.contains(event.target) && 
        !toggleBtn.contains(event.target) &&
        sidebar.classList.contains("active")) {
      closeSidebar();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeSidebar();
    }
  });

  window.addEventListener("load", setMaxTextWidth);
  window.addEventListener("resize", setMaxTextWidth);
});