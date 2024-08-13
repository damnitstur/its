window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const photo = urlParams.get('photo');

    const idCard = document.getElementById('idCard');
    const nameElement = idCard.querySelector('.name');
    const photoContainer = document.getElementById('photoContainer');

    nameElement.textContent = name;

    const img = new Image();
    img.src = photo;
    img.style.width = '100%';
    img.style.height = '100%';
    photoContainer.appendChild(img);

    document.getElementById('downloadBtn').addEventListener('click', function() {
        html2canvas(idCard).then(function(canvas) {
            const link = document.createElement('a');
            link.download = 'id_card.jpg';
            link.href = canvas.toDataURL('image/jpeg');
            link.click();
        });
    });
};
