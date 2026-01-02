const progress = document.querySelector('.progress');
const speedText = document.getElementById('speed');
const statusText = document.getElementById('status');

const circumference = 2 * Math.PI * 110;

function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    progress.style.strokeDashoffset = offset;
}

async function startTest() {
    speedText.textContent = '0';
    setProgress(0);
    statusText.textContent = 'Testing download speed...';

    const imageUrl = "https://speed.cloudflare.com/__down?bytes=25000000";
    const startTime = performance.now();

    try {
        const response = await fetch(imageUrl, { cache: "no-store" });
        const blob = await response.blob();
        const endTime = performance.now();

        const duration = (endTime - startTime) / 1000;
        const bitsLoaded = blob.size * 8;
        const speedMbps = (bitsLoaded / duration / 1024 / 1024).toFixed(2);

        animateSpeed(speedMbps);
        statusText.textContent = 'Test completed';

    } catch (error) {
        statusText.textContent = 'Error testing speed';
    }
}

function animateSpeed(target) {
    let current = 0;
    const interval = setInterval(() => {
        current += target / 40;
        if (current >= target) {
            current = target;
            clearInterval(interval);
        }
        speedText.textContent = current.toFixed(1);
        setProgress(Math.min((current / 100) * 100, 100));
    }, 50);
}
