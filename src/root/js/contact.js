async function loadSocials() {
    try {
        const response = await fetch('js/data/socials.json');
        const socials = await response.json();
        const container = document.getElementById('socials-container');
        
        console.log("loading socials");
        container.innerHTML = socials.map(account => {
            if (account.type === 'copy') {
                return `
                    <div class="social-card" onclick="copyToClipboard('${account.copyValue}', this)">
                        <div class="copy-badge">Click to Copy</div>
                        <img src="${account.icon}" alt="${account.platform}" class="profile-pic">
                        <span class="social-platform">${account.platform}</span>
                        <div class="social-username">${account.username}</div>
                    </div>
                `;
            } else {
                return `
                    <a href="${account.link}" target="_blank" class="social-card">
                        <img src="${account.icon}" alt="${account.platform}" class="profile-pic">
                        <span class="social-platform">${account.platform}</span>
                        <div class="social-username">${account.username}</div>
                    </a>
                `;
            }
        }).join('');
    } catch (e) { console.error(e); }
}

function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(() => {
        const usernameEl = element.querySelector('.social-username');
        const originalText = usernameEl.innerText;
        
        // Visual feedback
        usernameEl.innerText = "Copied!";
        usernameEl.style.color = "var(--secondary-color)";
        element.classList.add('copied-glow');

        setTimeout(() => {
            usernameEl.innerText = originalText;
            usernameEl.style.color = "white";
            element.classList.remove('copied-glow');
        }, 2000);
    });
}

document.addEventListener("DOMContentLoaded", loadSocials);


