// ===== STATE MANAGEMENT =====
let scores = [0, 0];
let wins = [0, 0];
let limit = 101;
let activePlayer = 0;

// Audio Elements
const sfxClick = document.getElementById('sfx-click');
const sfxWin = document.getElementById('sfx-win');

// ===== INITIALIZATION (AUTO-LOAD) =====
// Fungsi ini otomatis jalan saat aplikasi dibuka untuk mengambil data lama
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
    
    saveGameData(); // <--- Simpan setiap skor berubah
    render();
    checkWin(player);
}

function updateName(player, name) {
    saveGameData(); // <--- Simpan setiap nama berubah
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
    
    // Ambil nama terbaru dari input
    const inputs = document.querySelectorAll('.player-input');
    const winnerName = inputs[winnerIndex].value || `Pemain ${winnerIndex + 1}`;
    
    document.getElementById('winnerName').innerText = winnerName;
    document.getElementById('finalScore').innerText = scores[winnerIndex];
    document.getElementById('win-' + winnerIndex).innerText = wins[winnerIndex];
    
    document.getElementById('gameOverModal').classList.add('active');
    saveGameData();
}

function resetGame() {
    scores = [0, 0];
    document.querySelectorAll('.overlay').forEach(el => el.classList.remove('active'));
    saveGameData();
    render();
}

function render() {
    document.getElementById('score-0').innerText = scores[0];
    document.getElementById('score-1').innerText = scores[1];
}

// ===== LOCAL STORAGE (FITUR AUTO-SAVE) =====
function saveGameData() {
    const inputs = document.querySelectorAll('.player-input');
    const p1Name = inputs[0].value;
    const p2Name = inputs[1].value;

    const gameData = {
        scores: scores,
        wins: wins,
        names: [p1Name, p2Name],
        limit: limit
    };
    localStorage.setItem('dominoScoreData', JSON.stringify(gameData));
}

function loadGameData() {
    const saved = localStorage.getItem('dominoScoreData');
    if (saved) {
        const data = JSON.parse(saved);
        scores = data.scores || [0, 0];
        wins = data.wins || [0, 0];
        limit = data.limit || 101;
        
        // Restore Names
        const inputs = document.querySelectorAll('.player-input');
        if(data.names && data.names[0]) inputs[0].value = data.names[0];
        if(data.names && data.names[1]) inputs[1].value = data.names[1];

        // Restore Wins UI
        document.getElementById('win-0').innerText = wins[0];
        document.getElementById('win-1').innerText = wins[1];
        
        // Restore Limit Input
        document.getElementById('limitInput').value = limit;
        
        render();
    }
}

// ===== CALCULATOR LOGIC =====
let calcVal = '0';
let lastOp = null;
let prevVal = null;

function openCalculator(player) {
    activePlayer = player;
    calcVal = '0';
    lastOp = null;
    prevVal = null;
    document.getElementById('calcDisplay').innerText = '0';
    document.getElementById('calculatorOverlay').classList.add('active');
}

function closeCalculatorOnOutside(e) {
    if(e.target.id === 'calculatorOverlay') document.getElementById('calculatorOverlay').classList.remove('active');
}

function appendNumber(num) {
    playClick();
    if(calcVal === '0' && num !== '.') calcVal = num;
    else calcVal += num;
    document.getElementById('calcDisplay').innerText = calcVal;
}

function appendOperator(op) {
    playClick();
    if(lastOp) calculate();
    prevVal = parseFloat(calcVal);
    lastOp = op;
    calcVal = '0';
}

function calculate() {
    const current = parseFloat(calcVal);
    if(lastOp === '+') prevVal += current;
    if(lastOp === '-') prevVal -= current;
    if(lastOp === '*') prevVal *= current;
    if(lastOp === '/') prevVal /= current;
    calcVal = prevVal.toString();
    lastOp = null;
    document.getElementById('calcDisplay').innerText = calcVal;
}

function doneCalculator() {
    if(lastOp) calculate();
    const result = Math.floor(parseFloat(calcVal));
    if(!isNaN(result)) updateScore(activePlayer, result);
    document.getElementById('calculatorOverlay').classList.remove('active');
}

function backspace() {
    calcVal = calcVal.slice(0, -1) || '0';
    document.getElementById('calcDisplay').innerText = calcVal;
}

function clearCalc() {
    calcVal = '0'; lastOp = null;
    document.getElementById('calcDisplay').innerText = '0';
}

// ===== SETTINGS =====
function toggleSettings() {
    document.getElementById('settingsOverlay').classList.toggle('active');
}

function updateLimit(val) {
    limit = parseInt(val) || 101;
    saveGameData(); // Simpan setting limit juga
}

function setTheme(theme) {
    document.querySelectorAll('.t-circle').forEach(el => el.classList.remove('active'));
    // Logika tema visual (jika ingin dikembangkan lebih lanjut)
}
