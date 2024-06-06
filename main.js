document.getElementById('cutVideoBtn').addEventListener('click', () => {
    const videoUrl = document.getElementById('videoUrl').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;

    if (!videoUrl || !startTime || !endTime) {
        alert('Please fill in all fields');
        return;
    }

    if (parseInt(startTime) >= parseInt(endTime)) {
        alert('Start time must be less than end time');
        return;
    }

    fetch('https://video-cutter-backend.herokuapp.com/cut-video', { // Substitua pela URL do seu backend
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ videoUrl, startTime, endTime })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('result').innerHTML = `<a href="${data.path}" download>Download Cut Video</a>`;
        } else {
            document.getElementById('result').innerHTML = 'Failed to cut video';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerHTML = 'An error occurred';
    });
});

