const setMaxTextWidth = () => {
  let maxTextWidth = 0;
  
  const iconTextElements = document.querySelectorAll('.icon-text');
  
  iconTextElements.forEach((element) => {
    element.style.width = 'auto';
  });
  
  iconTextElements.forEach((element) => {
    if (element.offsetWidth > maxTextWidth) {
      maxTextWidth = element.offsetWidth;
    }
  });
  
  iconTextElements.forEach((element) => {
    element.style.width = `${maxTextWidth}px`;
  });
};

window.addEventListener("load", setMaxTextWidth);
window.addEventListener("resize", setMaxTextWidth);


function toggleDropdown() {
  const dropdown = document.getElementById('dropdownMenu');
  if (dropdown.classList.contains('show')) {
    dropdown.classList.remove('show');
    dropdown.style.display = 'none';  // This will ensure it's not only invisible but also not taking up any space.
  } else {
    dropdown.style.display = 'block'; // Or whatever display value it should have.
    dropdown.classList.add('show');
  }
}
  document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('fade-in', 'show');
    
    document.addEventListener('click', function(event) {
      if (event.target.tagName === 'A') {
        event.preventDefault();
        const href = event.target.getAttribute('href');
  
        document.body.classList.remove('show');
        document.body.classList.add('fade-out');
  
        setTimeout(function() {
          window.location.href = href;
        }, 500);
      }
    });
  });
  

  document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("scroll", function() {
      const dropdownIcon = document.querySelector('.fa-bars');
      const dropdownMenu = document.getElementById('dropdownMenu');
      if (window.scrollY > 100) {
        dropdownIcon.style.opacity = "0";
        dropdownIcon.style.pointerEvents = "none";
        dropdownIcon.style.transition = "opacity 0.5s ease-out";
        // Apply the same effect to the dropdown menu
        if (dropdownMenu.classList.contains('show')) {
          dropdownMenu.style.opacity = "0";
          dropdownMenu.style.transition = "opacity 0.5s ease-out";
          setTimeout(() => {
            dropdownMenu.classList.remove('show');
            dropdownMenu.style.display = 'none';
          }, 500); // Ensure this matches the transition time
        }
      } else {
        dropdownIcon.style.opacity = "1";
        dropdownIcon.style.pointerEvents = "auto";
        dropdownIcon.style.transition = "opacity 0.5s ease-in";
        // Reset dropdown menu opacity if needed
        dropdownMenu.style.opacity = "1";
      }
    });
  });