// Initialize Animate On Scroll (AOS)
AOS.init({
    once: false,       // whether animation should happen only once - while scrolling down
    mirror: true,      // whether elements should animate out while scrolling past them
    duration: 800,     // values from 0 to 3000, with step 50ms
    easing: 'ease-out-cubic', // default easing for AOS animations
});

// Navigation Dots Logic
document.addEventListener('DOMContentLoaded', () => {
    const dots = document.querySelectorAll('.dot');
    const container = document.querySelector('.presentation-container');
    const sections = document.querySelectorAll('.slide');

    // Add click event for smooth scrolling within container
    dots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            // Scroll the container to the section smoothly
            targetSection.scrollIntoView({ behavior: 'smooth' });
            
            // Active dot update is handled by the scroll event
        });
    });

    // Intersection Observer to detect which slide is currently in view
    const observerOptions = {
        root: null, // use viewport as root
        threshold: 0.5 // Trigger when 50% of the slide is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all dots
                dots.forEach(dot => dot.classList.remove('active'));
                
                // Add active class to corresponding dot
                const activeId = entry.target.getAttribute('id');
                const activeDot = document.querySelector(`.dot[href="#${activeId}"]`);
                if (activeDot) {
                    activeDot.classList.add('active');
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
});
