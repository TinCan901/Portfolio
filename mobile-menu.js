document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    const icon = toggle.querySelector('i');
    const header = document.querySelector('header');
    const h1 = header.querySelector('h1');
    const h2 = header.querySelector('h2');
    
    // Toggle menu function
    function toggleMenu() {
        nav.classList.toggle('active');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
        
        // Toggle aria-expanded attribute
        const isExpanded = nav.classList.contains('active');
        toggle.setAttribute('aria-expanded', isExpanded);
        
        // Show/hide header text based on menu state
        if (isExpanded) {
            h1.style.display = 'block';
            h2.style.display = 'block';
        } else {
            setTimeout(() => {
                h1.style.display = 'none';
                h2.style.display = 'none';
            }, 300); // Match this with your CSS transition time
        }
    }
    
    // Toggle menu on button click
    toggle.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on a link (mobile only)
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Close menu when clicking outside (optional)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            nav.classList.contains('active') && 
            !e.target.closest('nav') && 
            !e.target.closest('.mobile-menu-toggle')) {
            toggleMenu();
        }
    });
});
