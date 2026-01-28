// ===== STATE =====
let scores = [0, 0];
let wins = [0, 0];
let limit = 101;
let activePlayer = 0;

// Audio
const sfxClick = document.getElementById('sfx-click');
const sfxWin = document.getElementById('sfx-win');

// ===== AUDIO & HAPTIC =====
function playClick() {
    if(sfxClick) { sfxClick.currentTime = 0; sfxClick.play().catch(()=>{}); }
    if(navigator.vibrate) navigator.vibrate(10);
}

function playWin() {
    if(sfxWin) sfxWin.play().catch(()=>{});
    if(navigator.vibrate) navigator.vibrate([100, 50, 100]);
}

// ===== GAME LOGIC =====
function updateScore(player, amount) {
    playClick();
    if(scores[player] + amount < 0) return;
    scores[player] += amount;
    render();
    checkGame();
}

function updateName(player, val) {
    // Simpan nama jika perlu (bisa via localStorage)
}

function checkGame() {
    if (scores[0] >= limit) gameOver(0);
    else if (scores[1] >= limit) gameOver(1);
}

function gameOver(loserIndex) {
    playWin();
    const winnerIndex = loserIndex === 0 ? 1 : 0;
    wins[winnerIndex]++;
    
    document.getElementById('loserName').innerText = 
        document.querySelectorAll('.player-name')[loserIndex].value;
    document.getElementById('finalScore').innerText = scores[loserIndex];
    document.getElementById('gameOverModal').classList.add('active');
    
    // Update Wins UI
    document.getElementById(`win-${winnerIndex}`).innerText = wins[winnerIndex];
}

function resetGame() {
    playClick();
    scores = [0, 0];
    document.getElementById('gameOverModal').classList.remove('active');
    document.getElementById('drawerOverlay').classList.remove('active');
    document.getElementById('settingsDrawer').classList.remove('active');
    render();
}

function render() {
    document.getElementById('score-0').innerText = scores[0];
    document.getElementById('score-1').innerText = scores[1];
}

// ===== CALCULATOR LOGIC =====
let calcVal = '0';
let lastOp = null;
let prevVal = null;

function openCalculator(player) {
    playClick();
    activePlayer = player;
    calcVal = '0';
    lastOp = null;
    prevVal = null;
    updateCalcDisplay();
    document.getElementById('calculatorOverlay').classList.add('active');
}

function closeCalculator() {
    document.getElementById('calculatorOverlay').classList.remove('active');
}

function closeCalculatorOnOutside(e) {
    if(e.target.id === 'calculatorOverlay') closeCalculator();
}

function appendNumber(num) {
    playClick();
    if (calcVal === '0' && num !== '.') calcVal = num;
    else calcVal += num;
    updateCalcDisplay();
}

function appendOperator(op) {
    playClick();
    if (lastOp !== null) calculate();
    prevVal = parseFloat(calcVal);
    lastOp = op;
    calcVal = '0';
}

function calculate() {
    const current = parseFloat(calcVal);
    if (lastOp === '+') prevVal += current;
    if (lastOp === '-') prevVal -= current;
    if (lastOp === '*') prevVal *= current;
    if (lastOp === '/') prevVal /= current;
    calcVal = prevVal.toString();
    lastOp = null;
    updateCalcDisplay();
}

function doneCalculator() {
    playClick();
    if (lastOp) calculate();
    const result = Math.floor(parseFloat(calcVal));
    if (!isNaN(result)) {
        // Mode tambah skor (bukan replace)
        updateScore(activePlayer, result); 
    }
    closeCalculator();
}

function backspace() {
    playClick();
    calcVal = calcVal.slice(0, -1) || '0';
    updateCalcDisplay();
}

function clearCalc() {
    playClick();
    calcVal = '0';
    lastOp = null;
    prevVal = null;
    updateCalcDisplay();
}

function updateCalcDisplay() {
    document.getElementById('calcDisplay').innerText = calcVal;
}

// ===== SETTINGS =====
function toggleSettings() {
    document.getElementById('settingsDrawer').classList.toggle('active');
    document.getElementById('drawerOverlay').classList.toggle('active');
}

function updateLimit(val) {
    limit = parseInt(val) || 101;
}

function setTheme(name, el) {
    document.querySelectorAll('.theme-dot').forEach(d => d.classList.remove('active'));
    el.classList.add('active');
    
    const root = document.documentElement.style;
    if(name === 'purple') { root.setProperty('--bg-1', '#667eea'); root.setProperty('--bg-2', '#764ba2'); }
    if(name === 'blue') { root.setProperty('--bg-1', '#4facfe'); root.setProperty('--bg-2', '#00f2fe'); }
    if(name === 'orange') { root.setProperty('--bg-1', '#f093fb'); root.setProperty('--bg-2', '#f5576c'); }
    if(name === 'dark') { root.setProperty('--bg-1', '#232526'); root.setProperty('--bg-2', '#414345'); }
}
