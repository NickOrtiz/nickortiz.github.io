function toggleMenu() {
    const menu = document.querySelector('.nav-menu');
    menu.classList.toggle('active');
}

function toggleAccordion(header) {
    const allHeaders = document.querySelectorAll('.accordion-header');
    const allContents = document.querySelectorAll('.accordion-content');
    
    // Close all other sections
    allHeaders.forEach(h => {
        if (h !== header) h.classList.remove('active');
    });
    allContents.forEach(content => content.classList.remove('active'));
    
    // Toggle the clicked section
    header.classList.toggle('active');
    const content = header.nextElementSibling;
    content.classList.toggle('active');
}