// Save this as script.js
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menu-button');
    const menuContainer = document.querySelector('.menu-container');
    
    menuButton.addEventListener('click', function() {
        menuButton.classList.toggle('active');
        menuContainer.classList.toggle('active');
        
        if (!menuContainer.classList.contains('active')) {
            menuContainer.classList.add('deactive');
            setTimeout(() => {
                menuContainer.classList.remove('deactive');
            }, 600);
        }
    });

    // Close menu when clicking menu items
    document.querySelectorAll('.menu-container ul li a').forEach(item => {
        item.addEventListener('click', function() {
            menuButton.classList.remove('active');
            menuContainer.classList.remove('active');
        });
    });
});