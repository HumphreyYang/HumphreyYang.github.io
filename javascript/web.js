function setSidebarState(isOpen, returnFocus = false) {
  const sidebar = document.querySelector(".sidebar");
  if (!sidebar) return;

  const toggle = document.querySelector(".sidebar-toggle");
  sidebar.id ||= "site-sidebar";
  sidebar.classList.toggle("active", isOpen);
  sidebar.inert = !isOpen;
  sidebar.setAttribute("aria-hidden", String(!isOpen));

  if (toggle) {
    toggle.setAttribute("aria-controls", sidebar.id);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    if (returnFocus) toggle.focus();
  }
}

function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  if (!sidebar) return;
  setSidebarState(!sidebar.classList.contains("active"));
}

function closeSidebar(returnFocus = false) {
  setSidebarState(false, returnFocus);
}

document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("fade-in", "show");

  const pagePath = (pathname) => pathname.replace(/\/$/, "/index.html").toLowerCase();
  const currentPath = pagePath(window.location.pathname);

  document.querySelectorAll(".site-nav a, .sidebar-nav-item").forEach((link) => {
    const destination = new URL(link.href, window.location.href);
    const isCurrent = destination.origin === window.location.origin &&
      pagePath(destination.pathname) === currentPath;
    link.classList.toggle("active", isCurrent);
    if (isCurrent) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  // Let the browser handle clicks, downloads, anchors, and modifier keys.
  document.querySelectorAll("a[href]").forEach((link) => {
    const destination = new URL(link.href, window.location.href);
    if ((destination.protocol === "https:" || destination.protocol === "http:") &&
        destination.origin !== window.location.origin &&
        !link.hasAttribute("target")) {
      link.target = "_blank";
      link.relList.add("noopener", "noreferrer");
    }
  });

  document.querySelectorAll("em#date").forEach((year) => {
    year.textContent = new Date().getFullYear();
  });

  const sidebar = document.querySelector(".sidebar");
  if (!sidebar) return;

  setSidebarState(sidebar.classList.contains("active"));

  document.addEventListener("click", function (event) {
    const toggle = document.querySelector(".sidebar-toggle");
    if (sidebar.classList.contains("active") &&
        !sidebar.contains(event.target) &&
        !toggle?.contains(event.target)) {
      closeSidebar();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && sidebar.classList.contains("active")) {
      closeSidebar(true);
    }
  });
});

window.addEventListener("pageshow", function () {
  document.body.classList.remove("fade-out");
  document.body.classList.add("show");
});
