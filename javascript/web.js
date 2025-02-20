const setMaxTextWidth = () => {
  let maxTextWidth = 0;
  const iconTextElements = document.querySelectorAll('.icon-text');
  
  iconTextElements.forEach((element) => {
    element.style.width = 'auto';
    if (element.offsetWidth > maxTextWidth) {
      maxTextWidth = element.offsetWidth;
    }
  });
  
  iconTextElements.forEach((element) => {
    element.style.width = `${maxTextWidth}px`;
  });
};

function toggleDropdown() {
  const dropdown = document.getElementById('dropdownMenu');
  if (dropdown.classList.contains('show')) {
    dropdown.classList.remove('show');
    dropdown.style.display = 'none';
  } else {
    dropdown.style.display = 'block';
    dropdown.classList.add('show');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Initial setup
  document.body.classList.add('fade-in', 'show');
  
  // Handle browser navigation (back/forward)
  window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
      document.body.classList.remove('fade-out');
      document.body.classList.add('fade-in', 'show');
    }
  });

  // Unified link handler
  document.addEventListener('click', function(event) {
    const link = event.target.closest('a');
    if (!link || link.classList.contains('no-fade')) return;

    // Handle external links normally
    if (link.hostname !== window.location.hostname) return;

    event.preventDefault();
    const url = link.href;

    // Fade transition
    document.body.classList.remove('show');
    document.body.classList.add('fade-out');

    setTimeout(() => {
      window.location.href = url;
    }, 500);
  });

  // Scroll handler
  window.addEventListener('scroll', function() {
    const dropdownIcon = document.querySelector('.fa-bars');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    if (window.scrollY > 100) {
      if (dropdownIcon) {
        dropdownIcon.style.opacity = "0";
        dropdownIcon.style.pointerEvents = "none";
        dropdownIcon.style.transition = "opacity 0.5s ease-out";
      }
      if (dropdownMenu && dropdownMenu.classList.contains('show')) {
        dropdownMenu.style.opacity = "0";
        dropdownMenu.style.transition = "opacity 0.5s ease-out";
        setTimeout(() => {
          dropdownMenu.classList.remove('show');
          dropdownMenu.style.display = 'none';
        }, 500);
      }
    } else {
      if (dropdownIcon) {
        dropdownIcon.style.opacity = "1";
        dropdownIcon.style.pointerEvents = "auto";
        dropdownIcon.style.transition = "opacity 0.5s ease-in";
      }
      if (dropdownMenu) {
        dropdownMenu.style.opacity = "1";
      }
    }
  });

  // Text width calculations
  window.addEventListener('load', setMaxTextWidth);
  window.addEventListener('resize', setMaxTextWidth);
});