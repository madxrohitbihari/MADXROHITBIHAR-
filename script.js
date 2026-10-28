// Immediately apply saved theme on script load to prevent flashing/default reset
(function() {
    const savedTheme = localStorage.getItem('selectedPortalTheme') || 'gold';
    if (savedTheme === 'white') {
        document.body.classList.add('theme-white-mode');
    } else if (savedTheme === 'black') {
        document.body.classList.add('theme-black-mode');
    }
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

const defaultNewImg = "https://i.postimg.cc/8kv2Mtxv/IMG-20260731-232847-281.jpg";  
const upcomingCommonLink = "https://madxrohitbihar-app.github.io/UPDATE-POUP/";

const activeApps = [  
    { id: 58, name: "1. APNA COLLEGE", img: "https://i.postimg.cc/jS76CFc0/image-search-1783748117436.png", link: "https://madxrohitbihar-app.github.io/Apna-collgeg-pro/" },  
    { id: 1, name: "2. CAREER WILL", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmYE_faasYwfAs0rQKDf4GcuoV7_Ws6ZUqWwmIpuHVSw&s", link: "https://madxrohitbihar-app.github.io/Careerwill-2pro/" },  
    { id: 70, name: "3. CAREERWILL 2", img: "https://i.postimg.cc/fW3pxXNF/image-search-1791302510366.png", link: "https://madxrohitbihar-app.github.io/Careerwill/" },
    { id: 19, name: "4. CDS JOURNEY", img: "https://i.postimg.cc/tRKNBNTh/image-search-1787230401173.webp", link: "https://cds.streamfiles.eu.org/" },
    { id: 9, name: "5. CW CTET", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAB_URIwHn37n8wv-FR6lhXAS7clYsz2wD_VbdNlJlGVj6S3KVb1i0cXbi&s=10", link: "https://sangam.free.nf/CW/course_index.html" },  
    { id: 66, name: "6. DISHA ONLINE CLASSES", img: "https://i.postimg.cc/nL9SkYrp/image-search-1790939575363.png", link: "https://disha-studyapkmod.vercel.app/" },
    { id: 6, name: "7. FUTUREKUL", img: "https://i.postimg.cc/CK0zWrN0/image-search-1784218678678.png", link: "https://madxrohitbihar-app.github.io/futurekul-pro/" },  
    { id: 16, name: "8. GS VISION", img: "https://i.postimg.cc/YSLHMFjS/image-search-1785250907310.png", link: "https://nexthope.pages.dev/gsvision/" },  
    { id: 10, name: "9. IFAS ACADEMY", img: "https://i.postimg.cc/XJdZmMRz/image-search-1784219774648.png", link: "https://sangam.free.nf/IFAS/" },  
    { id: 68, name: "10. KD LIVE", img: "https://i.postimg.cc/brWTQYdG/image-search-1791011692951.jpg", link: "https://madxrohitbihar-app.github.io/Kd-Live/" },
    { id: 60, name: "11. MAGNET BRAIN", img: "https://i.postimg.cc/J4VMkfDz/image-search-1788171765952.png", link: "https://www.magnetbrains.com/" },  
    { id: 72, name: "12. MISSION JEET", img: "https://i.postimg.cc/V6j70XqJ/image-search-1792039762960.png", link: "https://madxrohitbihar-app.github.io/Mission-Jeet/" },
    { id: 13, name: "13. NEXT TOPPERS", img: "https://i.postimg.cc/PqjZCyfr/image-search-1785225080041.jpg", link: "https://madxrohitbihar-app.github.io/Next-Toppers-pro/" },  
    { id: 101, name: "14. PARMAR ACADEMY", img: "https://i.postimg.cc/sxYz6q2p/image-search-1792562519230.webp", link: "https://madxrohitbihar-app.github.io/Parmar-/" },
    { id: 100, name: "15. PHYSICS WALLAH", img: "https://i.postimg.cc/ZRMVR91P/image-search-1791519463252.webp", link: "https://madxrohitbihar-app.github.io/Physics-pro/" },
    { id: 102, name: "16. PHYSICS PI", img: "https://i.postimg.cc/ZRMVR91P/image-search-1791519463252.webp", link: "http://pi.studyparcham.site" },
    { id: 20, name: "17. RG VIKRAMJEET", img: "https://i.postimg.cc/cLqhCJVD/image-search-1791011678203.png", link: "https://madxrohitbihar-app.github.io/Rg-Vikramjeet/" },
    { id: 4, name: "18. ROJGAR WITH ANKIT", img: "https://i.postimg.cc/fTfdSHbT/image-search-1783668281136.png", link: "https://madxrohitbihar-rwa.netlify.app/" },  
    { id: 3, name: "19. SELECTION WAY", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRquIqVyakcgsPuAsFkSm34nPLKZ_IY2W0-Rj5sd1-T-g&s=10", link: "https://old-meadow-c959.madxrohitbihar.workers.dev/" },  
    { id: 59, name: "20. STUDY IQ", img: "https://i.postimg.cc/850xN6Wz/image-search-1788171724038.jpg", link: "https://spidyiq.vercel.app/" },  
    { id: 8, name: "21. TEST SERIES", img: "https://i.postimg.cc/Bb9C4KYz/image-search-1785225815998.png", link: "https://repeatermock.com/" },  
    { id: 67, name: "22. THE OFFICERS ACADEMY", img: "https://i.postimg.cc/4y0hBtmy/image-search-1790939587430.webp", link: "https://studyapkmod-live.vercel.app/?view=courses" },  
    { id: 65, name: "23. TOPPER'S WISDOM", img: "https://i.postimg.cc/4x6z4BFq/image-search-1788787742041.jpg", link: "https://studyapkmod-toperwis.vercel.app/" },  
    { id: 12, name: "24. UNACADEMY", img: "https://i.postimg.cc/Wz6xPX4L/image-search-1785224943445.jpg", link: "https://madxrohitbihar-app.github.io/Unacdemy-pro/" },  
    { id: 71, name: "25. UNACADEMY ONLINE", img: "https://i.postimg.cc/Wz6xPX4L/image-search-1785224943445.jpg", link: "https://madxrohitbihar-app.github.io/Unacdemy-pro-/" },
    { id: 17, name: "26. VIBRANT ACADEMY", img: "https://i.postimg.cc/mgx3mfCs/image-search-1785251111107.png", link: "https://learnbyakp.site/vibrant" },  
    { id: 61, name: "27. VIDYAKHUL", img: "https://i.postimg.cc/9Qr5MJ2g/image-search-1787482867101.png", link: "https://vidyakool.streamfiles.eu.org/" }
];  

const upcomingApps = [  
    { id: 19, name: "1. GYAN BINDU", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCFvhxybNgyZB2ctiSjQkoDvGk9KjyK-tG34NGXWwaRA&s=10", link: upcomingCommonLink },  
    { id: 21, name: "2. VIDYAGRAM", img: "https://i.postimg.cc/rp74fjNW/image-search-1785091744942.png", link: upcomingCommonLink },  
    { id: 22, name: "3. ROJGAR WITH ANKIT", img: "https://i.postimg.cc/fTfdSHbT/image-search-1783668281136.png", link: upcomingCommonLink },  
    { id: 23, name: "4. KAUTILYA CLASSES", img: "https://i.postimg.cc/gkTMQkvN/image-search-1783667928451.png", link: upcomingCommonLink },  
    { id: 24, name: "5. WINNERS INSTITUTE", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 25, name: "6. LAKSHAY CLASSES", img: "https://i.postimg.cc/vHTy5TYz/image-search-1783668410024.jpg", link: upcomingCommonLink },  
    { id: 26, name: "7. PARMAR ACADEMY", img: "https://i.postimg.cc/vZvCjdZF/image-search-1783668554942.webp", link: upcomingCommonLink },  
    { id: 27, name: "8. AASH EDUCATION", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 28, name: "9. PHYSICS WITH UMESH RAJORIA", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 29, name: "10. ASTHA IAS", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 30, name: "11. EXAMPUR", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 31, name: "12. BOOSTER ACADEMY", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 32, name: "13. DP SIR MATHS", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 33, name: "14. ALPHA INSTITUTE PRO", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 34, name: "15. ANKIT SINGH", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 35, name: "16. SCIENCE MAGNET", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 36, name: "17. SPRING BOARD", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 37, name: "18. ASHISH SINGH LECTURES", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 38, name: "19. VK KNOWLEDGE", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 39, name: "20. PHYSICS BY UMESH SIR", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 40, name: "21. TANDAV CLASSES", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 41, name: "22. YODHA CLASSES", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 42, name: "23. YODHA APP", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 43, name: "24. KISHOR SIR MATHS", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 44, name: "25. MATHS BY DEEPAK SIR", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 45, name: "26. UNIQ SCIENCE ACADEMY", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 46, name: "27. YESH OFFICER", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 47, name: "28. STAR MATHEMATICS", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 48, name: "29. SAMYAK IAS", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 49, name: "30. SACHIN ACADEMY APP", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 50, name: "31. AMPLITUDE PHYSICS CLASSES", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 51, name: "32. ARMY STUDY", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 52, name: "33. PARAM ACADEMY", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 53, name: "34. KALAM ACADEMY", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 54, name: "35. GYANODAY KE GURUJI", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 55, name: "36. BSC PRO CLASSES", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 56, name: "37. ADDA247", img: defaultNewImg, link: upcomingCommonLink },  
    { id: 57, name: "38. VIDYAKHUL", img: defaultNewImg, link: upcomingCommonLink }  
];  

let favorites = JSON.parse(localStorage.getItem('userFavs')) || [];  

function openExternal(url) {
    let finalUrl = url;
    if (url.includes("youtu.be/") || url.includes("youtube.com/")) {
        const separator = url.includes("?") ? "&" : "?";
        finalUrl = `${url}${separator}vq=hd2160`; 
    }
    window.open(finalUrl, '_blank');
}

function showToast(msg) {  
    const toast = document.getElementById('toast');  
    toast.innerText = msg;  
    toast.classList.add('show');  
    setTimeout(() => toast.classList.remove('show'), 2000);  
}  

function openNotifications() {
    document.getElementById('notificationModal').style.display = 'flex';
}

function closeNotifications() {
    document.getElementById('notificationModal').style.display = 'none';
}

function toggleThemeDrawer() {
    const modal = document.getElementById('themeDrawerModal');
    if (modal.style.display === 'flex') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'flex';
    }
}

function closeThemeDrawerOnOuter(e) {
    if (e.target.id === 'themeDrawerModal') {
        toggleThemeDrawer();
    }
}

function setAppTheme(themeName) {
    document.body.classList.remove('theme-white-mode', 'theme-black-mode');
    document.querySelectorAll('.theme-opt-btn').forEach(btn => btn.classList.remove('active'));

    if (themeName === 'white') {
        document.body.classList.add('theme-white-mode');
        document.querySelector('.theme-white').classList.add('active');
        showToast("White Theme Activated!");
    } else if (themeName === 'black') {
        document.body.classList.add('theme-black-mode');
        document.querySelector('.theme-black').classList.add('active');
        showToast("Black Theme Activated!");
    } else {
        document.querySelector('.theme-gold').classList.add('active');
        showToast("Neon Gold Theme Activated!");
    }

    localStorage.setItem('selectedPortalTheme', themeName);
    setTimeout(() => toggleThemeDrawer(), 250);
}

// Initialize active state of theme buttons on load
function initThemeUI() {
    const savedTheme = localStorage.getItem('selectedPortalTheme') || 'gold';
    document.querySelectorAll('.theme-opt-btn').forEach(btn => btn.classList.remove('active'));
    if (savedTheme === 'white') {
        const btn = document.querySelector('.theme-white');
        if (btn) btn.classList.add('active');
    } else if (savedTheme === 'black') {
        const btn = document.querySelector('.theme-black');
        if (btn) btn.classList.add('active');
    } else {
        const btn = document.querySelector('.theme-gold');
        if (btn) btn.classList.add('active');
    }
}

function renderApps() {  
    const activeContainer = document.getElementById('active-apps-list');  
    document.getElementById('active-count').innerText = `${activeApps.length} Available`;  

    activeContainer.innerHTML = activeApps.map(app => `  
        <div class="app-card" data-name="${app.name.toLowerCase()}">  
            <div class="app-info">  
                <img src="${app.img}" class="app-icon" alt="${app.name}" onerror="this.src='https://via.placeholder.com/48/0d1424/fff?text=App'">  
                <div class="app-details">  
                    <span class="app-name">${app.name}</span>  
                    <span class="app-tag">Free Server Active</span>  
                </div>  
            </div>  
            <div class="app-actions">  
                <button class="fav-btn ${favorites.includes(app.id) ? 'active' : ''}" onclick="toggleFavorite(${app.id})">  
                    <i class="fa-${favorites.includes(app.id) ? 'solid' : 'regular'} fa-heart"></i>  
                </button>  
                <span onclick="openExternal('${app.link}')" class="open-btn">Open</span>  
            </div>  
        </div>  
    `).join('');  

    const upcomingContainer = document.getElementById('upcoming-apps-list');  
    document.getElementById('upcoming-count').innerText = `${upcomingApps.length} Coming Soon`;  

    upcomingContainer.innerHTML = upcomingApps.map(app => `  
        <div class="app-card" data-name="${app.name.toLowerCase()}">  
            <div class="app-info">  
                <img src="${app.img}" class="app-icon" alt="${app.name}" onerror="this.src='https://via.placeholder.com/48/0d1424/fff?text=App'">  
                <div class="app-details">  
                    <span class="app-name">${app.name}</span>  
                    <span class="app-tag">Coming Soon</span>  
                </div>  
            </div>  
            <div class="app-actions">  
                <button class="fav-btn ${favorites.includes(app.id) ? 'active' : ''}" onclick="toggleFavorite(${app.id})">  
                    <i class="fa-${favorites.includes(app.id) ? 'solid' : 'regular'} fa-heart"></i>  
                </button>  
                <span onclick="openExternal('${app.link}')" class="open-btn">Open</span>  
            </div>  
        </div>  
    `).join('');  
      
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
        <div class="app-card">  
            <div class="app-info">  
                <img src="${app.img}" class="app-icon" alt="${app.name}" onerror="this.src='https://via.placeholder.com/48/0d1424/fff?text=App'">  
                <div class="app-details">  
                    <span class="app-name">${app.name}</span>  
                    <span class="app-tag">Saved Item</span>  
                </div>  
            </div>  
            <div class="app-actions">  
                <button class="fav-btn active" onclick="toggleFavorite(${app.id})">  
                    <i class="fa-solid fa-heart"></i>  
                </button>  
                <span onclick="openExternal('${app.link}')" class="open-btn">Open</span>  
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

    const currentTab = document.getElementById(`tab-${tabName}`);
    if (currentTab) currentTab.classList.remove('hidden');  
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

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    return false;
});

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

window.addEventListener('pageshow', function(event) {
    checkAuthStatus();
});

document.addEventListener("DOMContentLoaded", () => {  
    const splash = document.getElementById("splash-screen");  
      
    if (!sessionStorage.getItem('splashShown')) {  
        setTimeout(() => {  
            splash.classList.add("hide-splash");  
            sessionStorage.setItem('splashShown', 'true');  
        }, 4000);  
    } else {  
        splash.style.display = 'none';  
    }  

    if (!sessionStorage.getItem('popupShown')) {
        setTimeout(() => {  
            document.getElementById('popupModal').style.display = 'flex';  
        }, 500);
    }

    checkAuthStatus();
    initThemeUI();

    const savedTab = sessionStorage.getItem('currentActiveTab');
    if (savedTab) {
        const targetNav = document.getElementById(`nav-${savedTab}`);
        if (targetNav) {
            switchTab(savedTab, targetNav);
        }
    }
});  

function closePopupAndShowAuth() {  
    document.getElementById('popupModal').style.display = 'none';  
    sessionStorage.setItem('popupShown', 'true'); 

    checkAuthStatus();
}  

renderApps();
    