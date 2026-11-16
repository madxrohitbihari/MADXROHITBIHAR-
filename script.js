function updateWatermarkColor(theme) {
    const wm = document.getElementById('watermarkLayer');
    let colorHex = "%2300f3ff"; 
    let opacity = "0.08";
    
    if (theme === 'white') {
        colorHex = "%230f172a"; 
        opacity = "0.07";
    } else if (theme === 'black') {
        colorHex = "%23ffffff"; 
        opacity = "0.09";
    } else if (theme === 'gold') {
        colorHex = "%23f59e0b";
        opacity = "0.08";
    }

    wm.style.backgroundImage = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='420' height='140'><text x='20' y='70' fill='${colorHex}' fill-opacity='${opacity}' font-size='13' font-weight='900' font-family='sans-serif' letter-spacing='2'>MODEDUZONE ✦ MADXROHITBIHAR</text></svg>")`;
}

(function() {
    const savedTheme = localStorage.getItem('selectedPortalTheme') || 'gold';
    if (savedTheme === 'white') {
        document.body.classList.add('theme-white-mode');
    } else if (savedTheme === 'black') {
        document.body.classList.add('theme-black-mode');
    } else if (savedTheme === 'gold') {
        document.body.classList.add('theme-gold-mode');
    }
    updateWatermarkColor(savedTheme);
})();

function openAroLinks() {
    const apiToken = "0aa19e644db340e405f3b7654cdc70f70d705966";
    const targetUrl = "https://madxrohitbihari.github.io/MADX-KEY/";
    const apiUrl = `https://arolinks.com/api?api=${apiToken}&url=${encodeURIComponent(targetUrl)}`;

    const msgDiv = document.getElementById("status-msg");
    msgDiv.style.color = "var(--accent-gold)";
    msgDiv.innerText = "Generating Link...";
    showToast("Generating Access Link...");
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.status === "success" && data.shortenedUrl) {
                window.location.href = data.shortenedUrl;
            } else {
                msgDiv.style.color = "#ff4444";
                msgDiv.innerText = "Error generating link!";
                showToast("Error generating link!");
            }
        })
        .catch(() => {
            msgDiv.style.color = "#ff4444";
            msgDiv.innerText = "Network Error!";
            showToast("Network Error!");
        });
}

function verifyUserKey() {
    const userKey = document.getElementById("accessKeyInput").value.trim().toUpperCase();
    const msgDiv = document.getElementById("status-msg");
    
    const targetLen = 33; 
    if (userKey.length !== targetLen || !userKey.startsWith("MAD") || !userKey.endsWith("APN")) {
        msgDiv.style.color = "#ff4444";
        msgDiv.innerText = "⚠ Invalid key format!";
        showToast("⚠️ Invalid key format!");
        return;
    }

    let usedKeys = JSON.parse(localStorage.getItem("usedKeysRegistry")) || {};
    const currentTime = new Date().getTime();

    if (usedKeys[userKey]) {
        msgDiv.style.color = "#ff4444";
        msgDiv.innerText = "⚠️ This key has already been used! Please get a new key.";
        showToast("⚠️ Key already used! Get a new key");
        return;
    }

    usedKeys[userKey] = currentTime;
    localStorage.setItem("usedKeysRegistry", JSON.stringify(usedKeys));

    const keyExpiryDuration = 24 * 60 * 60 * 1000;
    const globalExpiryTime = currentTime + keyExpiryDuration; 
    localStorage.setItem("appAuthExpiry", globalExpiryTime);
    
    msgDiv.style.color = "var(--neon-green)";
    msgDiv.innerText = "Portal Unlocked Successfully!";
    showToast("Portal Unlocked Successfully!");

    setTimeout(() => {
        document.getElementById("authScreenWrapper").style.display = "none";
    }, 600);
}

function checkAuthStatus() {
    const expiryTime = localStorage.getItem("appAuthExpiry");
    const currentTime = new Date().getTime();
    const isVerified = expiryTime && currentTime < expiryTime;

    if (isVerified) {
        document.getElementById('authScreenWrapper').style.display = 'none';
    } else {
        document.getElementById('authScreenWrapper').style.display = 'flex';
    }
}

const activeApps = [  
    { id: 58, name: "1. APNA COLLEGE", img: "https://i.postimg.cc/jS76CFc0/image-search-1783748117436.png", link: "https://madxrohitbihar-app.github.io/Apna-collgeg-pro/" },  
    { 
        id: 1, 
        name: "2. CAREER WILL (ALL SERVERS)", 
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmYE_faasYwfAs0rQKDf4GcuoV7_Ws6ZUqWwmIpuHVSw&s", 
        isMultiServer: true,
        servers: [
            { name: "Server 1", link: "https://madxrohitbihar-app.github.io/Careerwill-2pro/" },
            { name: "Server 2", link: "https://madxrohitbihar-app.github.io/Careerwill/" },
            { name: "Server 3", link: "https://sangam.free.nf/CW/course_index.html" }
        ]
    },  
    { id: 19, name: "3. CDS JOURNEY", img: "https://i.postimg.cc/tRKNBNTh/image-search-1787230401173.webp", link: "https://cds.streamfiles.eu.org/" },
    { id: 66, name: "4. DISHA ONLINE CLASSES", img: "https://i.postimg.cc/nL9SkYrp/image-search-1790939575363.png", link: "https://disha-studyapkmod.vercel.app/" },
    { id: 6, name: "5. FUTUREKUL", img: "https://i.postimg.cc/CK0zWrN0/image-search-1784218678678.png", link: "https://madxrohitbihar-app.github.io/futurekul-pro/" },  
    { id: 16, name: "6. GS VISION", img: "https://i.postimg.cc/YSLHMFjS/image-search-1785250907310.png", link: "https://madxrohitbihar-app.github.io/GS-Vision/" },  
    { id: 103, name: "7. GUIDELY", img: "https://i.postimg.cc/z3Z1X3zG/image-search-1793353021694.png", link: "https://madxrohitbihar-app.github.io/Guidely-pro/" },
    { id: 10, name: "8. IFAS ACADEMY", img: "https://i.postimg.cc/XJdZmMRz/image-search-1784219774648.png", link: "https://sangam.free.nf/IFAS/" },  
    { id: 68, name: "9. KD LIVE", img: "https://i.postimg.cc/brWTQYdG/image-search-1791011692951.jpg", link: "https://madxrohitbihar-app.github.io/Kd-Live/" },
    { id: 60, name: "10. MAGNET BRAIN", img: "https://i.postimg.cc/J4VMkfDz/image-search-1788171765952.png", link: "https://www.magnetbrains.com/" },  
    { id: 104, name: "11. MD CLASSES", img: "https://i.postimg.cc/bwSzPcpM/image-search-1793367242436.png", link: "https://madxrohitbihar-app.github.io/MD-CLASSES-PRO/" },
    { id: 72, name: "12. MISSION JEET", img: "https://i.postimg.cc/V6j70XqJ/image-search-1792039762960.png", link: "https://madxrohitbihar-app.github.io/Mission-Jeet/" },
    { id: 13, name: "13. NEXT TOPPERS", img: "https://i.postimg.cc/PqjZCyfr/image-search-1785225080041.jpg", link: "https://madxrohitbihar-app.github.io/Next-Toppers-pro/" },  
    { id: 101, name: "14. PARMAR Academy", img: "https://i.postimg.cc/sxYz6q2p/image-search-1792562519230.webp", link: "https://madxrohitbihar-app.github.io/Parmar-/" },
    { id: 105, name: "15. PARMAR Academy 2", img: "https://i.postimg.cc/65gXYjC5/image-search-1793367333359.jpg", link: "https://modeduzone.netlify.app/" },
    { id: 100, name: "16. PHYSICS WALLAH", img: "https://i.postimg.cc/ZRMVR91P/image-search-1791519463252.webp", link: "https://madxrohitbihar-app.github.io/Physics-pro/" },
    { id: 102, name: "17. PHYSICS PI", img: "https://i.postimg.cc/ZRMVR91P/image-search-1791519463252.webp", link: "http://pi.studyparcham.site" },
    { id: 20, name: "18. RG VIKRAMJEET", img: "https://i.postimg.cc/cLqhCJVD/image-search-1791011678203.png", link: "https://madxrohitbihar-app.github.io/Rg-Vikramjeet/" },
    { id: 4, name: "19. ROJGAR WITH ANKIT", img: "https://i.postimg.cc/fTfdSHbT/image-search-1783668281136.png", link: "https://madxrohitbihar-app.github.io/RWA-Pro/" },  
    { id: 3, name: "20. SELECTION WAY", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRquIqVyakcgsPuAsFkSm34nPLKZ_IY2W0-Rj5sd1-T-g&s=10", link: "https://madxrohitbihar-app.github.io/Selection-way/" },  
    { id: 59, name: "21. STUDY IQ", img: "https://i.postimg.cc/850xN6Wz/image-search-1788171724038.jpg", link: "https://spidyiq.vercel.app/" },  
    { id: 8, name: "22. TEST SERIES", img: "https://i.postimg.cc/Bb9C4KYz/image-search-1785225815998.png", link: "https://repeatermock.com/" },  
    { id: 67, name: "23. THE OFFICERS ACADEMY", img: "https://i.postimg.cc/4y0hBtmy/image-search-1790939587430.webp", link: "https://studyapkmod-live.vercel.app/?view=courses" },  
    { id: 65, name: "24. TOPPER'S WISDOM", img: "https://i.postimg.cc/4x6z4BFq/image-search-1788787742041.jpg", link: "https://studyapkmod-toperwis.vercel.app/" },  
    { id: 12, name: "25. UNACADEMY", img: "https://i.postimg.cc/Wz6xPX4L/image-search-1785224943445.jpg", link: "https://madxrohitbihar-app.github.io/Unacdemy-pro/" },  
    { id: 71, name: "26. UNACADEMY ONLINE", img: "https://i.postimg.cc/Wz6xPX4L/image-search-1785224943445.jpg", link: "https://madxrohitbihar-app.github.io/Unacdemy-pro-/" },
    { id: 17, name: "27. VIBRANT ACADEMY", img: "https://i.postimg.cc/mgx3mfCs/image-search-1785251111107.png", link: "https://learnbyakp.site/vibrant" },  
    { id: 61, name: "28. VIDYAKHUL", img: "https://i.postimg.cc/9Qr5MJ2g/image-search-1787482867101.png", link: "https://vidyakool.streamfiles.eu.org/" }
];  

const upcomingApps = [];  
let favorites = JSON.parse(localStorage.getItem('userFavs')) || [];  

function openExternal(url, elementId) {
    if (elementId) {
        const card = document.getElementById(`app-card-${elementId}`);
        if (card) {
            document.querySelectorAll('.app-card').forEach(c => c.classList.remove('app-clicked'));
            card.classList.add('app-clicked');
        }
    }
    let finalUrl = url;
    if (url.includes("youtu.be/") || url.includes("youtube.com/")) {
        const separator = url.includes("?") ? "&" : "?";
        finalUrl = `${url}${separator}vq=hd2160`; 
    }
    window.open(finalUrl, '_blank');
}

function handleAppClick(appId) {
    const app = activeApps.concat(upcomingApps).find(a => a.id === appId);
    if (!app) return;

    const card = document.getElementById(`app-card-${appId}`);
    if (card) {
        document.querySelectorAll('.app-card').forEach(c => c.classList.remove('app-clicked'));
        card.classList.add('app-clicked');
    }

    if (app.isMultiServer) {
        document.getElementById('modalAppTitle').innerText = app.name;
        const listContainer = document.getElementById('serverOptionsList');
        listContainer.innerHTML = app.servers.map(server => `
            <div class="server-opt-btn" onclick="openExternal('${server.link}', ${appId}); closeServerModal();">
                <span><i class="fa-solid fa-server" style="color:var(--accent-cyan); margin-right:8px;"></i> ${server.name}</span>
                <i class="fa-solid fa-arrow-right" style="color:var(--text-secondary);"></i>
            </div>
        `).join('');
        document.getElementById('serverModal').style.display = 'flex';
    } else {
        openExternal(app.link, appId);
    }
}

function closeServerModal() {
    document.getElementById('serverModal').style.display = 'none';
}

function closeServerModalOnOuter(e) {
    if (e.target.id === 'serverModal') closeServerModal();
}

function showToast(msg) {  
    const toast = document.getElementById('toast');  
    toast.innerText = msg;  
    toast.classList.add('show');  
    setTimeout(() => toast.classList.remove('show'), 2000);  
}  

function openNotifications() { document.getElementById('notificationModal').style.display = 'flex'; }
function closeNotifications() { document.getElementById('notificationModal').style.display = 'none'; }
function toggleThemeDrawer() {
    const modal = document.getElementById('themeDrawerModal');
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
}
function closeThemeDrawerOnOuter(e) { if (e.target.id === 'themeDrawerModal') toggleThemeDrawer(); }

function setAppTheme(themeName) {
    document.body.classList.remove('theme-white-mode', 'theme-black-mode', 'theme-gold-mode');
    
    if (themeName === 'white') {
        document.body.classList.add('theme-white-mode');
        showToast("White Theme Activated!");
    } else if (themeName === 'black') {
        document.body.classList.add('theme-black-mode');
        showToast("Black Theme Activated!");
    } else if (themeName === 'gold') {
        document.body.classList.add('theme-gold-mode');
        showToast("Neon Gold Theme Activated!");
    } else {
        showToast("Neon Cyberpunk Theme Activated!");
    }
    
    updateWatermarkColor(themeName);
    localStorage.setItem('selectedPortalTheme', themeName);
    setTimeout(() => toggleThemeDrawer(), 250);
}

function renderApps() {  
    const activeContainer = document.getElementById('active-apps-list');  
    document.getElementById('active-count').innerText = `${activeApps.length} Available`;  

    activeContainer.innerHTML = activeApps.map(app => `  
        <div class="app-card" id="app-card-${app.id}" data-name="${app.name.toLowerCase()}">  
            <div class="app-info" onclick="handleAppClick(${app.id})">  
                <img src="${app.img}" class="app-icon" alt="${app.name}" onerror="this.src='https://via.placeholder.com/48/0d1424/fff?text=App'">  
                <div class="app-details">  
                    <span class="app-name">${app.name}</span>  
                    <span class="app-tag">${app.isMultiServer ? 'Multiple Server Active' : 'Free Server Active'}</span>  
                </div>  
            </div>  
            <div class="app-actions">  
                <button class="fav-btn ${favorites.includes(app.id) ? 'active' : ''}" onclick="toggleFavorite(${app.id})">  
                    <i class="fa-${favorites.includes(app.id) ? 'solid' : 'regular'} fa-heart"></i>  
                </button>  
                <span onclick="handleAppClick(${app.id})" class="open-btn">Open</span>  
            </div>  
        </div>  
    `).join('');  

    const upcomingContainer = document.getElementById('upcoming-apps-list');  
    document.getElementById('upcoming-count').innerText = `${upcomingApps.length} Coming Soon`;  
    upcomingContainer.innerHTML = upcomingApps.length > 0 ? '' : `<div class="no-data">No upcoming apps available.</div>`;  
    renderFavorites();  
}  

function toggleFavorite(id) {  
    if (favorites.includes(id)) {  
        favorites = favorites.filter(favId => favId !== id);  
        showToast("Removed from Favorites");  
    } else {  
        favorites.push(id);  
        showToast("Added to Favorites");  
    }  
    localStorage.setItem('userFavs', JSON.stringify(favorites));  
    renderApps();  
}  

function renderFavorites() {  
    const favContainer = document.getElementById('favorites-apps-list');  
    const favApps = activeApps.concat(upcomingApps).filter(app => favorites.includes(app.id));  
    if (favApps.length === 0) {  
        favContainer.innerHTML = `<div class="no-data">No favorite apps saved yet.</div>`;  
        return;  
    }  
    favContainer.innerHTML = favApps.map(app => `  
        <div class="app-card" id="fav-card-${app.id}">  
            <div class="app-info" onclick="handleAppClick(${app.id})">  
                <img src="${app.img}" class="app-icon" alt="${app.name}" onerror="this.src='https://via.placeholder.com/48/0d1424/fff?text=App'">  
                <div class="app-details">  
                    <span class="app-name">${app.name}</span>  
                    <span class="app-tag">Saved Item</span>  
                </div>  
            </div>  
            <div class="app-actions">  
                <button class="fav-btn active" onclick="toggleFavorite(${app.id})"><i class="fa-solid fa-heart"></i></button>  
                <span onclick="handleAppClick(${app.id})" class="open-btn">Open</span>  
            </div>  
        </div>  
    `).join('');  
}  

function switchTab(tabName, element) {  
    document.querySelectorAll('.bottom-nav .nav-item').forEach(item => item.classList.remove('active'));  
    if(element) element.classList.add('active');  
    ['apps', 'upcoming', 'favorites'].forEach(tab => {  
        const targetTab = document.getElementById(`tab-${tab}`);
        if (targetTab) targetTab.classList.add('hidden');  
    });  
    document.getElementById(`tab-${tabName}`).classList.remove('hidden');  
    window.scrollTo({ top: 0, behavior: 'smooth' });  
    sessionStorage.setItem('currentActiveTab', tabName);
}  

function filterApps() {  
    const query = document.getElementById('searchInput').value.toLowerCase();  
    document.querySelectorAll('.app-card').forEach(card => {  
        const name = card.getAttribute('data-name');  
        card.style.display = (name && name.includes(query)) ? 'flex' : 'none';  
    });  
}  

document.addEventListener("contextmenu", (e) => e.preventDefault());

window.addEventListener('pageshow', function(event) {
    checkAuthStatus();
});

document.addEventListener("DOMContentLoaded", () => {  
    const splash = document.getElementById("splash-screen");  
    if (!sessionStorage.getItem('splashShown')) {  
        setTimeout(() => {  
            splash.classList.add("hide-splash");  
            sessionStorage.setItem('splashShown', 'true');  

            if (!sessionStorage.getItem('popupShownOnce')) {
                document.getElementById('popupModal').style.display = 'flex';
            }
        }, 4000);  
    } else {  
        splash.style.display = 'none';  
        checkAuthStatus();
    }  

    setTimeout(() => {
        renderApps();
    }, 1200);

    const savedTab = sessionStorage.getItem('currentActiveTab');
    if (savedTab) {
        const targetNav = document.getElementById(`nav-${savedTab}`);
        if (targetNav) switchTab(savedTab, targetNav);
    }
});  

function closePopup() {  
    document.getElementById('popupModal').style.display = 'none';  
    sessionStorage.setItem('popupShownOnce', 'true');
    checkAuthStatus();
}
