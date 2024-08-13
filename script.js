document.getElementById('idCardForm').addEventListener('submit', function(event) {
    event.preventDefault();

    console.log("Form submitted");

    const name = document.getElementById('name').value;
    console.log("Name:", name);
    const photo = document.getElementById('photo').files[0];

    if (photo) {
        console.log("Photo selected");
        const reader = new FileReader();
        reader.onload = function(e) {
            const photoDataURL = e.target.result;
            console.log("Photo data URL loaded");

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const img = new Image();
            img.src = photoDataURL;
            img.onload = function() {
                console.log("Image loaded");
                canvas.width = img.width;
                canvas.height = img.height;

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                const frame = new Image();
                frame.src = 'its/images/border.png';
                frame.onload = function() {
                    console.log("Frame loaded");
                    ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);

                    const finalDataURL = canvas.toDataURL('image/jpeg');
                    console.log("Final image generated");

                    const downloadURL = `download.html?name=${encodeURIComponent(name)}&photo=${encodeURIComponent(finalDataURL)}`;
                    window.location.href = downloadURL;
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
