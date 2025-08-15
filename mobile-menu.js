document.addEventListener('DOMContentLoaded', () => {
    // IntersectionObserver for section animations
    const observerOptions = { threshold: 0.1 };
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animated-section').forEach(section => {
        sectionObserver.observe(section);
    });

    // IntersectionObserver for list item and icon animations (staggered effect)
    const listItemAndIconObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.animated-list-item');
                items.forEach((item, index) => {
                    item.style.transitionDelay = `${index * 0.15}s`;
                    item.classList.add('is-visible');
                });
                const icons = entry.target.querySelectorAll('.icon-pulse');
                icons.forEach(icon => {
                    icon.classList.add('is-visible');
                });
                listItemAndIconObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.animated-section ul').forEach(list => { listItemAndIconObserver.observe(list); });
    document.querySelectorAll('.animated-section .flex-col').forEach(card => { listItemAndIconObserver.observe(card); });

    /* NEW: JavaScript for the dynamic wavy background effect */
    const canvas = document.getElementById('waveCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set up variables for the waves
    let waveCount = 5;
    let waves = [];
    let scrollOffset = 0;
    let time = 0;

    // Define the properties for each wave
    for (let i = 0; i < waveCount; i++) {
        waves.push({
            amplitude: 50 + Math.random() * 80,
            frequency: (Math.random() * 0.005) + 0.003,
            speed: (Math.random() * 0.01) + 0.005,
            color: `rgba(59, 130, 246, ${0.1 + Math.random() * 0.15})` // Transparent blues
        });
    }

    // Function to resize the canvas to fill the window
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // The main animation loop
    function animateWaves() {
        // Clear the canvas on each frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update time for continuous wave motion
        time += 0.05;

        // Loop through each wave and draw it
        waves.forEach((wave, index) => {
            ctx.beginPath();
            
            // The wave starts at the bottom of the canvas
            ctx.moveTo(0, canvas.height);
            
            // Draw the top curve of the wave
            for (let x = 0; x < canvas.width; x++) {
                // The y-position is a sine wave function
                // `time` makes it animate, `scrollOffset` makes it move with scrolling, `index` staggers the waves
                let y = Math.sin(x * wave.frequency + time * wave.speed + scrollOffset * 0.002 + index * 10) * wave.amplitude;
                // Add the offset to center the waves vertically on the screen
                ctx.lineTo(x, canvas.height / 2 + y);
            }
            
            // Close the path by drawing back to the bottom right and then bottom left
            ctx.lineTo(canvas.width, canvas.height);
            ctx.closePath();
            
            ctx.fillStyle = wave.color;
            ctx.fill();
        });
        
        // Request the next animation frame
        requestAnimationFrame(animateWaves);
    }

    // Event listeners
    window.addEventListener('resize', setCanvasSize);
    window.addEventListener('scroll', () => {
        // Update the scroll offset
        scrollOffset = window.scrollY;
    });
    
    // Start the canvas animation when the page loads
    setCanvasSize();
    animateWaves();
});
