

/*document.addEventListener('mousemove', (e) => {
    // Calculate a hue based on mouse X and Y position
    const hue = (e.clientX / window.innerWidth) * 360;
    
    // Update the CSS variable --secondary-color
    // We use HSL so the brightness and saturation stay constant ("mellow")
    document.documentElement.style.setProperty('--secondary-color', `hsl(${hue}, 70%, 60%)`);
});*/

// Matrix Effect
const matrixEl = document.getElementById('matrix');

function generateMatrix() {
    const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ$+-*/=%&@#";
    
    // Calculate how many characters fit the screen
    // We estimate based on font size (approx 15px wide/tall)
    const width = window.innerWidth;
    const height = window.innerHeight;
    const area = width * height;
    const charSize = 15 * 15; // Estimated pixels per character
    const totalChars = Math.floor(area / charSize) * 1.2; // 1.2 is a "buffer" to ensure full coverage

    let content = "";
    for (let i = 0; i < totalChars; i++) {
        content += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    matrixEl.innerText = content;
}

// 1. Initial generation
generateMatrix();

// 2. Regenerate if the user resizes their window
window.addEventListener('resize', generateMatrix);

// 3. Keep the "Glitch" effect moving
//setInterval(generateMatrix, 500);

// 4. Track mouse
document.addEventListener('mousemove', (e) => {
    matrixEl.style.setProperty('--mouse-x', `${e.clientX}px`);
    matrixEl.style.setProperty('--mouse-y', `${e.clientY}px`);
});


//status updates
async function loadStatus() {
    try {
        const response = await fetch('js/data/main-data.json');
        const data = await response.json();

        const statusDot = document.getElementById('status-dot');
        const statusText = document.getElementById('status-text');

        if (data.OpenForWork) {
            // It's true: Set to Open
            statusDot.className = 'dot open';
            statusText.innerText = data.OpenDescription;
        } else {
            // It's false: Set to Closed
            statusDot.className = 'dot closed';
            statusText.innerText = data.ClosedDescription;
        }
    } catch (error) {
        console.error("Could not load status data:", error);
    }
}

// Run on page load
loadStatus();

