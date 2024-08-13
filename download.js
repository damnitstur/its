window.onload = function() {
    // Ambil data dari localStorage
    const name = localStorage.getItem('idCardName');
    const photo = localStorage.getItem('idCardImage');

    if (name && photo) {
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

                // Hapus data dari localStorage setelah unduh
                localStorage.removeItem('idCardName');
                localStorage.removeItem('idCardImage');
            });
        });
    } else {
        console.error("No data found in localStorage");
    }
};
