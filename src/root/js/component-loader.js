async function loadComponent(elementId, filePath, setupFunction) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.log("no") 
        return;}

    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Failed to load ${filePath}`);
        const html = await response.text();
        element.innerHTML = html;
        console.log("working");
        // If there's extra logic needed (like the hamburger menu), run it now
        if (setupFunction) setupFunction();
    } catch (error) {
        console.error("Component Error:", error);
        console.log("failed");
    }
}

// Logic for the mobile menu (must run AFTER navbar is loaded)
function setupNavbar() {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    
    // 1. Mobile Toggle Logic
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });
    }

    // 2. Active Link Highlighting Logic
    const currentPath = window.location.pathname; // Gets the current URL path
    const allLinks = document.querySelectorAll('.nav-links a');

    allLinks.forEach(link => {
        // Get the filename from the href (e.g., "projects.html")
        const linkPath = link.getAttribute('href');

        // Check if the current path contains the link's path
        // We also check if we're at root "/" to highlight "index.html"
        if (currentPath.endsWith(linkPath) || (currentPath === "/" && linkPath === "index.html")) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Execute the loads
window.addEventListener('DOMContentLoaded', () => {
    loadComponent('global-navbar', 'components/navbar.html', setupNavbar);
    loadComponent('main-footer', 'components/footer.html');
    console.log("content loaded")
});