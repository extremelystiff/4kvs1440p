document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('image-compare-container');
    const topImageWrapper = container.querySelector('.img-wrapper');
    const handle = container.querySelector('.slider-handle');

    let isDragging = false;

    // Function to handle the slider movement
    function moveSlider(x) {
        const rect = container.getBoundingClientRect();
        // Calculate the position of the cursor/touch as a percentage
        let position = ((x - rect.left) / rect.width) * 100;

        // Clamp the position between 0 and 100
        position = Math.max(0, Math.min(100, position));

        // Update the width of the top image wrapper and the handle's position
        topImageWrapper.style.width = `${position}%`;
        handle.style.left = `${position}%`;
    }

    // --- Event Listeners for Desktop (Mouse) ---

    // Start dragging on mouse down
    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        // Prevent default browser actions, like image dragging
        e.preventDefault();
    });

    // Stop dragging on mouse up anywhere on the page
    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Move slider on mouse move if dragging
    window.addEventListener('mousemove', (e) => {
        if (isDragging) {
            moveSlider(e.clientX);
        }
    });

    // --- Event Listeners for Mobile (Touch) ---

    // Start dragging on touch start
    container.addEventListener('touchstart', (e) => {
        isDragging = true;
        // The 'passive: false' is important to allow preventDefault
    }, { passive: false });

    // Stop dragging on touch end
    window.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Move slider on touch move if dragging
    window.addEventListener('touchmove', (e) => {
        if (isDragging) {
            // Prevent page scrolling while dragging the slider
            e.preventDefault();
            moveSlider(e.touches[0].clientX);
        }
    }, { passive: false });
});
