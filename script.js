document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const imagePopup = document.getElementById('imagePopup');
    const imagePopupImg = document.getElementById('imagePopupImg');
    const imagePopupClose = document.getElementById('imagePopupClose');
    const imagePopupDescription = document.getElementById('imagePopupDescription');
    const colorWheelButton = document.getElementById('colorWheelButton');
    const colorPopup = document.getElementById('colorPopup');
    const colorPopupClose = document.getElementById('colorPopupClose');
    const cursorColorInput = document.getElementById('cursorColorInput');
    const colorPopupDone = document.getElementById('colorPopupDone');
    const repoPopup = document.getElementById('repoPopup');
    const repoPopupClose = document.getElementById('repoPopupClose');
    const repoPopupCloseButton = document.getElementById('repoPopupCloseButton');
    const repoPopupRedirectButton = document.getElementById('repoPopupRedirectButton');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedCursorColor = localStorage.getItem('cursorColor') || '#ffffff';
    let privateRepoUrl = '';

    document.body.classList.toggle('light-mode', savedTheme === 'light');
    document.documentElement.style.setProperty('--cursor-color', savedCursorColor);
    themeToggle.checked = savedTheme === 'light';
    cursorColorInput.value = savedCursorColor;

    themeToggle.addEventListener('change', function() {
        const isLightMode = themeToggle.checked;
        document.body.classList.toggle('light-mode', isLightMode);
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    });

    document.querySelectorAll('.about-image, .about-project-image').forEach(function(image) {
        image.addEventListener('dblclick', function() {
            imagePopupImg.src = image.src;
            imagePopupImg.alt = image.alt;
            imagePopupDescription.textContent = image.dataset.description || '';
            imagePopupDescription.classList.toggle('open', Boolean(image.dataset.description));
            imagePopup.classList.add('open');
            document.body.classList.add('popup-open');
            imagePopup.setAttribute('aria-hidden', 'false');
        });
    });

    function closeImagePopup() {
        imagePopup.classList.remove('open');
        document.body.classList.remove('popup-open');
        imagePopup.setAttribute('aria-hidden', 'true');
        imagePopupImg.src = '';
        imagePopupDescription.textContent = '';
        imagePopupDescription.classList.remove('open');
    }

    imagePopupClose.addEventListener('click', closeImagePopup);

    imagePopup.addEventListener('click', function(e) {
        if (e.target === imagePopup) {
            closeImagePopup();
        }
    });

    colorWheelButton.addEventListener('click', function() {
        cursorColorInput.value = localStorage.getItem('cursorColor') || '#ffffff';
        colorPopup.classList.add('open');
        document.body.classList.add('popup-open');
        colorPopup.setAttribute('aria-hidden', 'false');
    });

    function closeColorPopup() {
        colorPopup.classList.remove('open');
        document.body.classList.remove('popup-open');
        colorPopup.setAttribute('aria-hidden', 'true');
    }

    colorPopupClose.addEventListener('click', closeColorPopup);

    colorPopupDone.addEventListener('click', function() {
        const selectedColor = cursorColorInput.value;
        document.documentElement.style.setProperty('--cursor-color', selectedColor);
        localStorage.setItem('cursorColor', selectedColor);
        closeColorPopup();
    });

    document.querySelectorAll('.private-repo-link').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            privateRepoUrl = link.dataset.repoUrl;
            repoPopup.classList.add('open');
            document.body.classList.add('popup-open');
            repoPopup.setAttribute('aria-hidden', 'false');
        });
    });

    function closeRepoPopup() {
        repoPopup.classList.remove('open');
        document.body.classList.remove('popup-open');
        repoPopup.setAttribute('aria-hidden', 'true');
    }

    repoPopupClose.addEventListener('click', closeRepoPopup);
    repoPopupCloseButton.addEventListener('click', closeRepoPopup);
    repoPopupRedirectButton.addEventListener('click', function() {
        if (privateRepoUrl) {
            window.open(privateRepoUrl, '_blank');
        }
        closeRepoPopup();
    });

    repoPopup.addEventListener('click', function(e) {
        if (e.target === repoPopup) {
            closeRepoPopup();
        }
    });
});

document.addEventListener('mousemove', function(e) {
    var cursor = document.getElementById('myCursor');
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});
