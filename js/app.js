let scores = [0, 0];
let wins = [0, 0];
let limit = 101;
let activePlayer = 0;

// Audio
const sfxClick = document.getElementById('sfx-click');
const sfxWin = document.getElementById('sfx-win');

function playClick() { if(sfxClick) { sfxClick.currentTime = 0; sfxClick.play().catch(()=>{}); } }
function playWin() { if(sfxWin) sfxWin.play().catch(()=>{}); if(navigator.vibrate) navigator.vibrate([200, 100, 200]); }

// Game Logic
function updateScore(p, val) {
    playClick();
    if(scores[p] + val < 0) return;
    scores[p] += val;
    render();
    if(scores[p] >= limit) gameOver(p);
}

function updateName(p, name) { /* Bisa tambah save localstorage */ }

function gameOver(loser) {
    playWin();
    const winner = loser === 0 ? 1 : 0;
    wins[winner]++;
    document.getElementById('win-'+winner).innerText = wins[winner];
    
    const loserName = document.querySelectorAll('.player-name')[loser].value;
    document.getElementById('loserName').innerText = loserName;
    document.getElementById('finalScore').innerText = scores[loser];
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

// Calculator
let calcVal = '0', lastOp = null, prevVal = null;

function openCalculator(p) {
    activePlayer = p; calcVal = '0'; lastOp = null;
    document.getElementById('calcDisplay').innerText = '0';
    document.getElementById('calculatorOverlay').classList.add('active');
}
function closeCalculator() { document.getElementById('calculatorOverlay').classList.remove('active'); }
function closeCalculatorOnOutside(e) { if(e.target.id === 'calculatorOverlay') closeCalculator(); }

function appendNumber(n) {
    playClick();
    if(calcVal === '0' && n !== '.') calcVal = n; else calcVal += n;
    document.getElementById('calcDisplay').innerText = calcVal;
}
function appendOperator(op) {
    playClick();
    if(lastOp) calculate();
    prevVal = parseFloat(calcVal); lastOp = op; calcVal = '0';
}
function calculate() {
    const cur = parseFloat(calcVal);
    if(lastOp === '+') prevVal += cur;
    if(lastOp === '-') prevVal -= cur;
    if(lastOp === '*') prevVal *= cur;
    if(lastOp === '/') prevVal /= cur;
    calcVal = prevVal.toString(); lastOp = null;
    document.getElementById('calcDisplay').innerText = calcVal;
}
function doneCalculator() {
    if(lastOp) calculate();
    const res = Math.floor(parseFloat(calcVal));
    if(!isNaN(res)) updateScore(activePlayer, res);
    closeCalculator();
}
function backspace() { calcVal = calcVal.slice(0,-1)||'0'; document.getElementById('calcDisplay').innerText = calcVal; }
function clearCalc() { calcVal = '0'; lastOp = null; document.getElementById('calcDisplay').innerText = '0'; }

// Settings & Theme
function toggleSettings() { document.getElementById('settingsOverlay').classList.toggle('active'); }
function updateLimit(v) { limit = parseInt(v) || 101; }

function setTheme(theme) {
    const root = document.querySelector('.app-frame').style;
    document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
    document.querySelector('.'+theme).classList.add('active');
    
    let bg = '';
    if(theme === 'purp') bg = 'linear-gradient(135deg, #667eea, #764ba2)';
    if(theme === 'ocean') bg = 'linear-gradient(135deg, #00c6ff, #0072ff)';
    if(theme === 'fire') bg = 'linear-gradient(135deg, #f093fb, #f5576c)';
    if(theme === 'dark') bg = 'linear-gradient(135deg, #434343, #000000)';
    
    root.background = bg;
    document.querySelector('.wallpaper-bg').style.background = bg;
}
