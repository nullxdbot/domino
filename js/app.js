let scores = [0, 0];
let wins = [0, 0];
let limit = 101;
let activePlayer = 0;

// Audio Elements
const sfxClick = document.getElementById('sfx-click');
const sfxWin = document.getElementById('sfx-win');

function playClick() { if(sfxClick) { sfxClick.currentTime = 0; sfxClick.play().catch(()=>{}); } }
function playWin() { if(sfxWin) sfxWin.play().catch(()=>{}); if(navigator.vibrate) navigator.vibrate([200, 100, 200]); }

// Game Logic
function updateScore(player, amount) {
    playClick();
    if (scores[player] + amount < 0) return;
    scores[player] += amount;
    render();
    checkWin(player);
}

function updateName(player, name) { /* Logic simpan nama */ }

function checkWin(player) {
    if (scores[player] >= limit) {
        gameOver(player); // Pemain ini kalah (jika aturan > 101 kalah)
    }
    // Atau jika aturan siapa cepat 101 menang, ubah logika di sini
    // Asumsi: Mencapai 101 = KALAH (Aturan umum domino gaple)
    // Jika Anda ingin Mencapai 101 = MENANG, ganti teks di HTML Modal.
}

function gameOver(loserIndex) {
    playWin();
    // Jika yang mencapai limit kalah, maka lawannya menang
    const winnerIndex = loserIndex === 0 ? 1 : 0;
    wins[winnerIndex]++;
    
    // Update data modal
    const winnerName = document.querySelectorAll('.player-input')[winnerIndex].value;
    document.getElementById('winnerName').innerText = winnerName;
    document.getElementById('finalScore').innerText = scores[winnerIndex]; // Tampilkan skor pemenang
    document.getElementById('win-' + winnerIndex).innerText = wins[winnerIndex];
    
    document.getElementById('gameOverModal').classList.add('active');
}

function resetGame() {
    scores = [0, 0];
    document.querySelectorAll('.overlay').forEach(el => el.classList.remove('active'));
    render();
}

function render() {
    document.getElementById('score-0').innerText = scores[0];
    document.getElementById('score-1').innerText = scores[1];
}

// Calculator Logic
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

// Settings
function toggleSettings() {
    document.getElementById('settingsOverlay').classList.toggle('active');
}

function updateLimit(val) {
    limit = parseInt(val) || 101;
}

function setTheme(theme) {
    document.querySelectorAll('.t-circle').forEach(el => el.classList.remove('active'));
    // Tambahkan logika ganti warna CSS variable jika diperlukan
    // Saat ini hanya visual selection
}
