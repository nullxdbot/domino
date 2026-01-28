// ===== STATE MANAGEMENT =====
let scores = [0, 0];
let wins = [0, 0];
let limit = 101;
let activePlayer = 0;
let currentTheme = 'blue';
let roundHistory = [[], []];
let roundCount = 1;
let lastWinner = null;
let compactMode = false;

let pendingAction = null; 

// Audio Elements
const sfxClick = document.getElementById('sfx-click');
const sfxWin = document.getElementById('sfx-win');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    loadGameData();
    initParticles();
});

// Optimized audio and vibration functions with reduced overhead
function playClick() { 
    if(sfxClick && sfxClick.readyState >= 2) { 
        sfxClick.currentTime = 0; 
        sfxClick.play().catch(()=>{}); 
    } 
}

function playWin() { 
    if(sfxWin) sfxWin.play().catch(()=>{}); 
}

// ===== PARTICLES ANIMATION =====
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 30; // Reduced from 50 for better performance
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.3 + 0.1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let particle of particles) {
            particle.update();
            particle.draw();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===== GAME LOGIC =====
function updateScore(player, amount) {
    if (scores[player] + amount < 0) return;
    
    if (amount !== 0) {
        roundHistory[player].push(amount);
    }

    scores[player] += amount;
    
    saveGameData();
    render();
    renderHistory();
    updateScoreDifference();
    checkWin(player);
    
    // Play sound after DOM updates for better responsiveness
    playClick();
}

function checkWin(player) {
    if (scores[player] >= limit) {
        gameOver(player);
    }
}

function gameOver(loserIndex) {
    playWin();
    const winnerIndex = loserIndex === 0 ? 1 : 0;
    wins[winnerIndex]++;
    lastWinner = winnerIndex;
    
    const winnerName = `Tim ${winnerIndex + 1}`;
    
    document.getElementById('winnerName').innerText = winnerName;
    document.getElementById('finalScore').innerText = scores[winnerIndex];
    document.getElementById('win-' + winnerIndex).innerText = wins[winnerIndex];
    
    document.getElementById('gameOverModal').classList.add('active');
    saveGameData();
}

function render() {
    const score0El = document.getElementById('score-0');
    const score1El = document.getElementById('score-1');
    
    score0El.innerText = scores[0];
    score1El.innerText = scores[1];
    
    updateScoreColor(0, score0El);
    updateScoreColor(1, score1El);

    const sisa0 = limit - scores[0];
    const sisa1 = limit - scores[1];

    const el0 = document.getElementById('remain-0');
    const el1 = document.getElementById('remain-1');

    if(el0) {
        el0.innerText = sisa0 > 0 ? `Kurang ${sisa0} lagi` : "MENANG!";
        el0.style.color = sisa0 <= 20 ? '#ff6b6b' : 'rgba(255,255,255,0.4)';
    }

    if(el1) {
        el1.innerText = sisa1 > 0 ? `Kurang ${sisa1} lagi` : "MENANG!";
        el1.style.color = sisa1 <= 20 ? '#ff6b6b' : 'rgba(255,255,255,0.4)';
    }

    const roundEl = document.getElementById('roundCount');
    if(roundEl) roundEl.innerText = roundCount;

    renderLastWinnerBadge();
}

function updateScoreColor(player, element) {
    const progress = scores[player] / limit;
    
    element.classList.remove('score-low', 'score-medium', 'score-high', 'score-critical');
    
    if (progress < 0.3) {
        element.classList.add('score-low');
    } else if (progress < 0.6) {
        element.classList.add('score-medium');
    } else if (progress < 0.85) {
        element.classList.add('score-high');
    } else {
        element.classList.add('score-critical');
    }
}

function updateScoreDifference() {
    const diffEl = document.getElementById('scoreDiff');
    if (!diffEl) return;
    
    const diff = Math.abs(scores[0] - scores[1]);
    
    if (diff === 0) {
        diffEl.innerHTML = '<i class="fas fa-equals"></i> Seri';
        diffEl.className = 'score-difference neutral';
    } else if (scores[0] < scores[1]) {
        diffEl.innerHTML = `<i class="fas fa-arrow-up"></i> Tim 1 unggul +${diff}`;
        diffEl.className = 'score-difference leading-p1';
    } else {
        diffEl.innerHTML = `<i class="fas fa-arrow-up"></i> Tim 2 unggul +${diff}`;
        diffEl.className = 'score-difference leading-p2';
    }
}

function renderHistory() {
    const list0 = document.getElementById('history-0');
    if(list0) {
        list0.innerHTML = roundHistory[0].map(num => 
            `<div class="hist-item">${num > 0 ? '+' + num : num}</div>`
        ).join('');
    }

    const list1 = document.getElementById('history-1');
    if(list1) {
        list1.innerHTML = roundHistory[1].map(num => 
            `<div class="hist-item">${num > 0 ? '+' + num : num}</div>`
        ).join('');
    }
}

function renderLastWinnerBadge() {
    const badge0 = document.getElementById('badge-0');
    const badge1 = document.getElementById('badge-1');
    
    if(badge0) badge0.style.display = 'none';
    if(badge1) badge1.style.display = 'none';
    
    if(lastWinner === 0 && badge0) {
        badge0.style.display = 'flex';
    } else if(lastWinner === 1 && badge1) {
        badge1.style.display = 'flex';
    }
}

function quickResetPlayer(player) {
    playClick();
    openConfirmModal(`Reset skor ${player === 0 ? 'Tim 1' : 'Tim 2'} ke 0?`, `quickreset-${player}`);
}

function performQuickReset(player) {
    scores[player] = 0;
    roundHistory[player] = [];
    saveGameData();
    render();
    renderHistory();
    updateScoreDifference();
}

function toggleCompactMode() {
    compactMode = document.getElementById('compactToggle').checked;
    const scoreboard = document.getElementById('scoreboard');
    
    if (compactMode) {
        scoreboard.classList.add('compact');
    } else {
        scoreboard.classList.remove('compact');
    }
    
    saveGameData();
}

// ===== LOCAL STORAGE =====
function saveGameData() {
    const gameData = {
        scores: scores,
        wins: wins,
        limit: limit,
        theme: currentTheme,
        history: roundHistory,
        roundCount: roundCount,
        lastWinner: lastWinner,
        compactMode: compactMode
    };
    localStorage.setItem('dominoScoreData', JSON.stringify(gameData));
}

function loadGameData() {
    const saved = localStorage.getItem('dominoScoreData');
    if (saved) {
        const data = JSON.parse(saved);
        scores = data.scores || [0, 0];
        wins = data.wins || [0, 0];
        limit = parseInt(data.limit) || 101;
        currentTheme = data.theme || 'blue';
        roundHistory = data.history || [[], []];
        roundCount = data.roundCount || 1;
        lastWinner = data.lastWinner !== undefined ? data.lastWinner : null;
        compactMode = data.compactMode || false;

        document.getElementById('win-0').innerText = wins[0];
        document.getElementById('win-1').innerText = wins[1];
        document.getElementById('limitInput').value = limit;
        document.getElementById('compactToggle').checked = compactMode;
        
        if (compactMode) {
            document.getElementById('scoreboard').classList.add('compact');
        }
        
        setTheme(currentTheme); 
        render();
        renderHistory();
        updateScoreDifference();
    }
}

// ===== CUSTOM CONFIRM MODAL LOGIC =====
function openConfirmModal(message, actionType) {
    document.getElementById('confirmMessage').innerText = message;
    pendingAction = actionType;
    document.getElementById('confirmModal').classList.add('active');
}

function closeConfirmModal() {
    document.getElementById('confirmModal').classList.remove('active');
    pendingAction = null;
}

function executeConfirm() {
    if (pendingAction === 'round') {
        performResetRound();
    } else if (pendingAction === 'hard') {
        performHardReset();
    } else if (pendingAction === 'quickreset-0') {
        performQuickReset(0);
    } else if (pendingAction === 'quickreset-1') {
        performQuickReset(1);
    }
    closeConfirmModal();
}

// ===== RESET TRIGGER =====
function resetRound() {
    openConfirmModal("Mulai ronde baru? Skor akan kembali ke 0.", "round");
}

function hardReset() {
    openConfirmModal("Hapus semua data? Skor dan Mahkota kemenangan akan hilang.", "hard");
}

// ===== FUNGSI RESET EKSEKUTOR =====
function performResetRound() {
    scores = [0, 0];
    roundHistory = [[], []];
    roundCount++;
    lastWinner = null;
    playClick();
    document.querySelectorAll('.overlay').forEach(el => el.classList.remove('active'));
    saveGameData();
    render();
    renderHistory();
    updateScoreDifference();
}

function performHardReset() {
    scores = [0, 0];
    wins = [0, 0];
    roundHistory = [[], []];
    roundCount = 1;
    lastWinner = null;
    playClick();
    document.getElementById('win-0').innerText = "0";
    document.getElementById('win-1').innerText = "0";
    document.querySelectorAll('.overlay').forEach(el => el.classList.remove('active'));
    saveGameData();
    render();
    renderHistory();
    updateScoreDifference();
}

// ===== CALCULATOR - OPTIMIZED VERSION =====
let calcVal = '0';
let lastOp = null;
let prevVal = null;

function openCalculator(player) {
    activePlayer = player;
    calcVal = '0';
    lastOp = null;
    prevVal = null;
    updateDisplay();
    document.getElementById('calculatorOverlay').classList.add('active');
}

function closeCalculatorOnOutside(e) {
    if(e.target.id === 'calculatorOverlay') {
        document.getElementById('calculatorOverlay').classList.remove('active');
    }
}

// Optimized: Update display without playing sound
function updateDisplay() {
    document.getElementById('calcDisplay').innerText = calcVal;
}

// Optimized: Append number without audio/vibration for instant response
function appendNumber(num) {
    if(calcVal === '0' && num !== '.') {
        calcVal = num;
    } else {
        calcVal += num;
    }
    updateDisplay();
}

// Optimized: Operator without audio for instant response
function appendOperator(op) {
    if(lastOp) {
        calculate();
    }
    prevVal = parseFloat(calcVal);
    lastOp = op;
    calcVal = '0';
    updateDisplay();
}

// Optimized: Calculate function
function calculate() {
    const current = parseFloat(calcVal);
    
    if(lastOp === '+') {
        prevVal += current;
    } else if(lastOp === '-') {
        prevVal -= current;
    } else if(lastOp === '*') {
        prevVal *= current;
    } else if(lastOp === '/') {
        prevVal /= current;
    }
    
    calcVal = prevVal.toString();
    lastOp = null;
    updateDisplay();
}

// Optimized: Done button with single sound at the end
function doneCalculator() {
    if(lastOp) {
        calculate();
    }
    
    const result = Math.floor(parseFloat(calcVal));
    
    if(!isNaN(result)) {
        updateScore(activePlayer, result);
    }
    
    document.getElementById('calculatorOverlay').classList.remove('active');
}

// Optimized: Backspace
function backspace() {
    calcVal = calcVal.slice(0, -1) || '0';
    updateDisplay();
}

// Optimized: Clear
function clearCalc() {
    calcVal = '0';
    lastOp = null;
    prevVal = null;
    updateDisplay();
}

// ===== SETTINGS & THEME =====
function toggleSettings() { 
    const el = document.getElementById('settingsOverlay');
    if(el) el.classList.toggle('active');
}

function updateLimit(val) { 
    let newVal = parseInt(val);
    if (!isNaN(newVal) && newVal > 0) { 
        limit = newVal; 
        saveGameData(); 
        render();
        updateScoreDifference();
    }
}

const themeConfig = {
    'blue': { primary: '#4361ee', accent: '#f72585' },
    'purple': { primary: '#7209b7', accent: '#4cc9f0' },
    'dark': { primary: '#e63946', accent: '#ffb703' }
};

function setTheme(themeName) {
    const root = document.documentElement;
    const theme = themeConfig[themeName];
    if (theme) {
        root.style.setProperty('--primary', theme.primary);
        root.style.setProperty('--accent', theme.accent);
    }
    document.querySelectorAll('.t-circle').forEach(el => el.classList.remove('active'));
    const activeBtn = document.querySelector(`.t-${themeName}`);
    if (activeBtn) activeBtn.classList.add('active');
    currentTheme = themeName;
    saveGameData();
}

// ===== FITUR ANTI-TIDUR (WAKE LOCK) =====
let wakeLock = null;

async function activateWakeLock() {
  if ('wakeLock' in navigator) {
    try {
      wakeLock = await navigator.wakeLock.request('screen');
      console.log('Anti-Tidur: Aktif');
      wakeLock.addEventListener('release', () => console.log('Anti-Tidur: Lepas'));
    } catch (err) {
      console.log('Gagal mengunci layar:', err);
    }
  }
}

document.addEventListener('click', async () => {
  if (!wakeLock) await activateWakeLock();
});

document.addEventListener('visibilitychange', async () => {
  if (wakeLock !== null && document.visibilityState === 'visible') {
    await activateWakeLock();
  }
});
