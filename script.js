
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll('.category-btn');
    const contents = document.querySelectorAll('.content');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            contents.forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            const category = button.dataset.category;
            document.querySelector(`.${category}-content`).classList.add('active');
        });
    });

    // Add scroll animation
    const modelSpace = document.querySelector('.model-space');
    const aboutSection = document.querySelector('.about-section');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const aboutOffset = aboutSection.offsetTop;
        const aboutHeight = aboutSection.offsetHeight;
        
        // Calculate progress (0 to 1) of scroll between home and about section
        let progress;
        
        if (scrollPosition <= aboutOffset) {
            // Before about section
            progress = Math.min(Math.max(scrollPosition / aboutOffset, 0), 1);
        } else if (scrollPosition > aboutOffset + aboutHeight) {
            // After about section - keep final position
            progress = 1;
        } else {
            // Within about section
            progress = 1;
        }
        
        // Initial position (center)
        const startX = 50;
        const startY = 50;
        const startScale = 1.5;

        // Final position (left side)
        const endX = 100;
        const endY = 60;
        const endScale = 1.0;

        // Calculate current position
        const currentX = startX + (endX - startX) * progress;
        const currentY = startY + (endY - startY) * progress;
        const currentScale = startScale + (endScale - startScale) * progress;

        // Apply transformation
        modelSpace.style.transform = `translate(-${currentX}%, -${currentY}%) scale(${currentScale})`;

        // Add fade-out effect
        const fadeStart = aboutOffset + aboutHeight + -30; // Start fading after 100px below about section
        const fadeEnd = fadeStart + 10; // Fully faded out 200px after fadeStart
        
        if (scrollPosition >= fadeStart && scrollPosition <= fadeEnd) {
            // Calculate opacity based on fade range
            const fadeProgress = (scrollPosition - fadeStart) / (fadeEnd - fadeStart);
            modelSpace.style.opacity = 1 - fadeProgress; // Gradually fade out
        } else if (scrollPosition > fadeEnd) {
            // Keep fully invisible after fade end
            modelSpace.style.opacity = 0;
        } else {
            // Fully visible before fade start
            modelSpace.style.opacity = 1;
        }
    });
});


// document.addEventListener("DOMContentLoaded", () => {
//     const buttons = document.querySelectorAll('.category-btn');
//     const contents = document.querySelectorAll('.content');

//     buttons.forEach(button => {
//         button.addEventListener('click', () => {
//             buttons.forEach(btn => btn.classList.remove('active'));
//             contents.forEach(content => content.classList.remove('active'));
//             button.classList.add('active');
//             const category = button.dataset.category;
//             document.querySelector(`.${category}-content`).classList.add('active');
//         });
//     });

//     // Add scroll animation
//     const modelSpace = document.querySelector('.model-space');
//     const aboutSection = document.querySelector('.about-section');
    
//     window.addEventListener('scroll', () => {
//         const scrollPosition = window.scrollY;
//         const windowHeight = window.innerHeight;
//         const aboutOffset = aboutSection.offsetTop;
//         const aboutHeight = aboutSection.offsetHeight;
        
//         // Calculate progress (0 to 1) of scroll between home and about section
//         let progress;
        
//         if (scrollPosition <= aboutOffset) {
//             // Before about section
//             progress = Math.min(Math.max(scrollPosition / aboutOffset, 0), 1);
//         } else if (scrollPosition > aboutOffset + aboutHeight) {
//             // After about section - keep final position
//             progress = 1;
//         } else {
//             // Within about section
//             progress = 1;
//         }
        
//         // Initial position (center)
//         const startX = 50;
//         const startY = 50;
//         const startScale = 1.5;

//         // Final position (left side)
//         const endX = 100;
//         const endY = 60;
//         const endScale = 1.0;

//         // Calculate current position
//         const currentX = startX + (endX - startX) * progress;
//         const currentY = startY + (endY - startY) * progress;
//         const currentScale = startScale + (endScale - startScale) * progress;
        
//         // Apply transformation
//         modelSpace.style.transform = `translate(-${currentX}%, -${currentY}%) scale(${currentScale})`;
//     });
// });



// Add this to your existing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const cards = document.querySelectorAll('.carousel-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentAngle = 0;
    const angleIncrement = 360 / cards.length;
    
    // Position cards in a circle
    function arrangeCards() {
        cards.forEach((card, index) => {
            const angle = (angleIncrement * index) * (Math.PI / 180);
            const radius = 350; // Adjust this value to change circle size
            
            const x = Math.sin(angle) * radius;
            const z = Math.cos(angle) * radius;
            
            card.style.transform = `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) rotateY(${angleIncrement * index}deg)`;
        });
    }
    
    // Rotate carousel
    function rotateCarousel(direction) {
        currentAngle += (direction === 'next' ? -angleIncrement : angleIncrement);
        carousel.style.transform = `rotateY(${currentAngle}deg)`;
    }
    
    // Event listeners
    prevBtn.addEventListener('click', () => rotateCarousel('prev'));
    nextBtn.addEventListener('click', () => rotateCarousel('next'));
    
    // Initialize carousel
    arrangeCards();
    
    // Optional: Auto-rotation
    let autoRotate = setInterval(() => rotateCarousel('next'), 5000);
    
    // Pause auto-rotation on hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoRotate));
    carousel.addEventListener('mouseleave', () => {
        autoRotate = setInterval(() => rotateCarousel('next'), 5000);
    });
});

// Add to your existing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Interactive panels
    const panels = document.querySelectorAll('.panel');
    
    panels.forEach(panel => {
        panel.addEventListener('mouseenter', () => {
            const items = panel.querySelectorAll('.tool-item, .measure-item');
            items.forEach((item, index) => {
                item.style.transition = `transform 0.3s ease ${index * 0.1}s`;
                item.style.transform = 'translateX(10px)';
            });
        });
        
        panel.addEventListener('mouseleave', () => {
            const items = panel.querySelectorAll('.tool-item, .measure-item');
            items.forEach(item => {
                item.style.transform = 'translateX(0)';
            });
        });
    });
});