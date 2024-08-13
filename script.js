document.getElementById('idCardForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const photo = document.getElementById('photo').files[0];

    if (photo) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const photoDataURL = e.target.result;

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const img = new Image();
            img.src = photoDataURL;
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;

                // Draw the uploaded photo on the canvas
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // Load the PNG frame and draw it on top of the photo
                const frame = new Image();
                frame.src = '/its/image/border.png'; // Path yang benar untuk file border.png
                frame.onload = function() {
                    ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);

                    // Convert the result to a Data URL
                    const finalDataURL = canvas.toDataURL('image/jpeg');

                    // Simpan data di localStorage
                    localStorage.setItem('idCardName', name);
                    localStorage.setItem('idCardImage', finalDataURL);

                    // Redirect ke halaman download tanpa data besar di URL
                    window.location.href = 'download.html';
                };
                frame.onerror = function() {
                    console.error("Failed to load frame image");
                };
            };
        };
        reader.readAsDataURL(photo);
    } else {
        console.error("No photo selected");
    }
});
