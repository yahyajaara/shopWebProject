

document.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll('.filter-toggle');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const isActive = content.classList.contains('active');

            // Toggle current section
            if (isActive) {
                content.classList.remove('active');
                toggle.textContent = toggle.textContent.replace('−', '+');
            } else {
                content.classList.add('active');
                toggle.textContent = toggle.textContent.replace('+', '−');
            }
        });
    });
});



