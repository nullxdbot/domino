// ===== STATE MANAGEMENT =====
let scores = [0, 0];
let wins = [0, 0];
let limit = 101;
let activePlayer = 0;
let currentTheme = 'blue';

let pendingAction = null; 

// Audio Elements
const sfxClick = document.getElementById('sfx-click');
const sfxWin = document.getElementById('sfx-win');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    loadGameData();
});

function playClick() { if(sfxClick) { sfxClick.currentTime = 0; sfxClick.play().catch(()=>{}); } }
function playWin() { if(sfxWin) sfxWin.play().catch(()=>{}); if(navigator.vibrate) navigator.vibrate([200, 100, 200]); }

// ===== GAME LOGIC =====
function updateScore(player, amount) {
    playClick();
    if (scores[player] + amount < 0) return;
    scores[player] += amount;
    
    saveGameData();
    render();
    checkWin(player);
}

function updateName(player, name) { saveGameData(); }

function checkWin(player) {
    if (scores[player] >= limit) {
        gameOver(player);
    }
}

function gameOver(loserIndex) {
    playWin();
    const winnerIndex = loserIndex === 0 ? 1 : 0;
    wins[winnerIndex]++;
    
    const inputs = document.querySelectorAll('.player-input');
    const winnerName = inputs[winnerIndex].value || `Pemain ${winnerIndex + 1}`;
    
    document.getElementById('winnerName').innerText = winnerName;
    document.getElementById('finalScore').innerText = scores[winnerIndex];
    document.getElementById('win-' + winnerIndex).innerText = wins[winnerIndex];
    
    document.getElementById('gameOverModal').classList.add('active');
    saveGameData();
}

function render() {
    document.getElementById('score-0').innerText = scores[0];
    document.getElementById('score-1').innerText = scores[1];
}

// ===== LOCAL STORAGE =====
function saveGameData() {
    const inputs = document.querySelectorAll('.player-input');
    const gameData = {
        scores: scores,
        wins: wins,
        names: [inputs[0].value, inputs[1].value],
        limit: limit,
        theme: currentTheme
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
        
        const inputs = document.querySelectorAll('.player-input');
        if(data.names) {
            inputs[0].value = data.names[0] || "Nama Pemain";
            inputs[1].value = data.names[1] || "Nama Pemain";
        }

        document.getElementById('win-0').innerText = wins[0];
        document.getElementById('win-1').innerText = wins[1];
        document.getElementById('limitInput').value = limit;
        
        setTheme(currentTheme); 
        render();
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
    playClick();
    document.querySelectorAll('.overlay').forEach(el => el.classList.remove('active'));
    saveGameData();
    render();
}

function performHardReset() {
    scores = [0, 0];
    wins = [0, 0];
    playClick();
    document.getElementById('win-0').innerText = "0";
    document.getElementById('win-1').innerText = "0";
    document.querySelectorAll('.overlay').forEach(el => el.classList.remove('active'));
    saveGameData();
    render();
}

// ===== CALCULATOR =====
let calcVal = '0', lastOp = null, prevVal = null;

function openCalculator(player) {
    activePlayer = player;
    calcVal = '0'; lastOp = null; prevVal = null;
    document.getElementById('calcDisplay').innerText = '0';
    document.getElementById('calculatorOverlay').classList.add('active');
}
function closeCalculatorOnOutside(e) { if(e.target.id === 'calculatorOverlay') document.getElementById('calculatorOverlay').classList.remove('active'); }
function appendNumber(num) { playClick(); if(calcVal === '0' && num !== '.') calcVal = num; else calcVal += num; document.getElementById('calcDisplay').innerText = calcVal; }
function appendOperator(op) { playClick(); if(lastOp) calculate(); prevVal = parseFloat(calcVal); lastOp = op; calcVal = '0'; }
function calculate() { const current = parseFloat(calcVal); if(lastOp === '+') prevVal += current; if(lastOp === '-') prevVal -= current; if(lastOp === '*') prevVal *= current; if(lastOp === '/') prevVal /= current; calcVal = prevVal.toString(); lastOp = null; document.getElementById('calcDisplay').innerText = calcVal; }
function doneCalculator() { if(lastOp) calculate(); const result = Math.floor(parseFloat(calcVal)); if(!isNaN(result)) updateScore(activePlayer, result); document.getElementById('calculatorOverlay').classList.remove('active'); }
function backspace() { calcVal = calcVal.slice(0, -1) || '0'; document.getElementById('calcDisplay').innerText = calcVal; }
function clearCalc() { calcVal = '0'; lastOp = null; document.getElementById('calcDisplay').innerText = '0'; }

// ===== SETTINGS & THEME =====
function toggleSettings() { 
    const el = document.getElementById('settingsOverlay');
    if(el) el.classList.toggle('active');
}

function updateLimit(val) { 
    let newVal = parseInt(val);
    if (!isNaN(newVal) && newVal > 0) { limit = newVal; saveGameData(); }
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
