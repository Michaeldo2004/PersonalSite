document.addEventListener('mousemove', function(e) {
    var cursor = document.getElementById('myCursor');
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});