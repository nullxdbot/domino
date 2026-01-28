// ===== GAME STATE =====
let scores = [0, 0];
let playerNames = ['Pemain 1', 'Pemain 2'];
let winningScore = 101;
let currentPlayer = 0;
let currentTheme = 'default';

// ===== CALCULATOR STATE =====
let calcValue = '0';
let lastOperator = null;
let previousValue = null;

// ===== LOAD GAME =====
function loadGame() {
    const saved = localStorage.getItem('dominoScore');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            scores = data.scores || [0, 0];
            playerNames = data.playerNames || ['Pemain 1', 'Pemain 2'];
            winningScore = data.winningScore || 101;
            currentTheme = data.theme || 'default';
            
            updateAllDisplays();
            
            const winningScoreEl = document.getElementById('winningScore');
            if (winningScoreEl) {
                winningScoreEl.value = winningScore;
            }
            
            playerNames.forEach((name, i) => {
                const playerEl = document.querySelector(`[data-player="${i}"]`);
                if (playerEl) {
                    playerEl.value = name;
                }
            });

            // Apply saved theme
            applyTheme(currentTheme);
        } catch (e) {
            console.error('Error loading game:', e);
        }
    }
}

// ===== SAVE GAME =====
function saveGame() {
    try {
        localStorage.setItem('dominoScore', JSON.stringify({
            scores: scores,
            playerNames: playerNames,
            winningScore: winningScore,
            theme: currentTheme
        }));
    } catch (e) {
        console.error('Error saving game:', e);
    }
}

// ===== UPDATE DISPLAYS =====
function updateDisplay(player) {
    const scoreEl = document.getElementById(`score-${player}`);
    const badgeEl = document.getElementById(`badge-${player}`);
    const footerEl = document.getElementById(`footer-${player}`);
    const progressEl = document.getElementById(`progress-${player}`);
    
    if (scoreEl) {
        scoreEl.textContent = scores[player];
        // Add pop animation
        scoreEl.classList.remove('animate-scorePop');
        void scoreEl.offsetWidth; // Trigger reflow
        scoreEl.classList.add('animate-scorePop');
    }
    
    if (badgeEl) badgeEl.textContent = scores[player];
    if (footerEl) footerEl.textContent = scores[player];
    
    // Update progress bar
    if (progressEl) {
        const percentage = (scores[player] / winningScore) * 100;
        progressEl.style.width = Math.min(percentage, 100) + '%';
    }
}

function updateAllDisplays() {
    scores.forEach((_, i) => updateDisplay(i));
}

// ===== SCORE MANAGEMENT =====
function addScore(player, amount = 1) {
    scores[player] += amount;
    updateDisplay(player);
    saveGame();
    
    // Show confetti if near losing score
    if (scores[player] >= winningScore - 10 && scores[player] < winningScore) {
        showMiniConfetti();
    }
    
    checkWinner();
}

function subtractScore(player) {
    if (scores[player] > 0) {
        scores[player]--;
        updateDisplay(player);
        saveGame();
    }
}

// ===== CHECK WINNER/LOSER =====
function checkWinner() {
    scores.forEach((score, player) => {
        if (score >= winningScore) {
            showLoser(player);
        }
    });
}

function showLoser(player) {
    const winnerNameEl = document.getElementById('winnerName');
    const winnerScoreEl = document.getElementById('winnerScore');
    const overlayEl = document.getElementById('winnerOverlay');
    
    if (winnerNameEl) winnerNameEl.textContent = playerNames[player];
    if (winnerScoreEl) winnerScoreEl.textContent = scores[player];
    if (overlayEl) overlayEl.classList.add('active');
    
    // Show big confetti
    showConfetti();
}

// ===== RESET GAME =====
function resetGame() {
    if (confirm('Reset semua skor ke 0?')) {
        scores = [0, 0];
        updateAllDisplays();
        saveGame();
        const overlayEl = document.getElementById('winnerOverlay');
        if (overlayEl) overlayEl.classList.remove('active');
    }
}

// ===== PLAYER NAME =====
function updatePlayerName(player, name) {
    playerNames[player] = name || `Pemain ${player + 1}`;
    saveGame();
}

// ===== WINNING SCORE =====
function updateWinningScore() {
    const valueEl = document.getElementById('winningScore');
    if (valueEl) {
        const value = parseInt(valueEl.value);
        if (value >= 50 && value <= 500) {
            winningScore = value;
            saveGame();
            updateAllDisplays(); // Update progress bars
        }
    }
}

// ===== SETTINGS PANEL =====
function toggleSettings() {
    const panel = document.getElementById('settingsPanel');
    if (panel) panel.classList.toggle('active');
}

// ===== THEME SWITCHER =====
function changeTheme(theme) {
    currentTheme = theme;
    applyTheme(theme);
    saveGame();
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update active theme button
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-theme') === theme) {
            btn.classList.add('active');
        }
    });
}

// ===== CALCULATOR FUNCTIONS =====
function openCalculator(player) {
    currentPlayer = player;
    calcValue = '0';
    lastOperator = null;
    previousValue = null;
    updateCalcDisplay();
    const overlayEl = document.getElementById('calculatorOverlay');
    if (overlayEl) overlayEl.classList.add('active');
}

function closeCalculator() {
    const overlayEl = document.getElementById('calculatorOverlay');
    if (overlayEl) overlayEl.classList.remove('active');
}

function closeCalculatorOnOutside(event) {
    if (event.target.id === 'calculatorOverlay') {
        closeCalculator();
    }
}

function updateCalcDisplay() {
    const displayEl = document.getElementById('calcDisplay');
    if (displayEl) {
        displayEl.textContent = calcValue;
    }
}

function appendNumber(num) {
    if (calcValue === '0' || calcValue === 'Error') {
        calcValue = num;
    } else {
        calcValue += num;
    }
    updateCalcDisplay();
}

function appendOperator(op) {
    if (lastOperator && previousValue !== null) {
        calculate();
    }
    previousValue = parseFloat(calcValue);
    lastOperator = op;
    calcValue = '0';
}

function calculate() {
    if (previousValue === null || lastOperator === null) return;
    
    const current = parseFloat(calcValue);
    let result;
    
    switch (lastOperator) {
        case '+':
            result = previousValue + current;
            break;
        case '-':
            result = previousValue - current;
            break;
        case '*':
            result = previousValue * current;
            break;
        case '/':
            result = current !== 0 ? previousValue / current : 'Error';
            break;
    }
    
    if (result === 'Error') {
        calcValue = 'Error';
    } else {
        calcValue = result.toString();
    }
    
    previousValue = null;
    lastOperator = null;
    updateCalcDisplay();
}

function clearCalc() {
    calcValue = '0';
    lastOperator = null;
    previousValue = null;
    updateCalcDisplay();
}

function backspace() {
    if (calcValue.length > 1) {
        calcValue = calcValue.slice(0, -1);
    } else {
        calcValue = '0';
    }
    updateCalcDisplay();
}

function doneCalculator() {
    if (lastOperator) {
        calculate();
    }
    
    const value = parseFloat(calcValue);
    if (!isNaN(value) && value > 0) {
        addScore(currentPlayer, Math.floor(value));
    }
    closeCalculator();
}

// ===== CONFETTI EFFECT =====
function showConfetti() {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    
    const colors = ['#ff0080', '#00fff9', '#ffff00', '#00ff00', '#ff8c00'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.transform = 'rotate(0deg)';
        confetti.style.animation = 'confetti-fall ' + (2 + Math.random() * 2) + 's linear';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        
        container.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}

function showMiniConfetti() {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    
    const colors = ['#ff0080', '#00fff9'];
    const confettiCount = 20;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '8px';
        confetti.style.height = '8px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.animation = 'confetti-fall 1.5s linear';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        
        container.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 1500);
    }
}

// ===== EVENT LISTENERS =====
document.addEventListener('click', (e) => {
    const panel = document.getElementById('settingsPanel');
    const menuBtn = document.querySelector('.menu-btn');
    if (panel && menuBtn && !panel.contains(e.target) && !menuBtn.contains(e.target)) {
        panel.classList.remove('active');
    }
});

// ===== INITIALIZE =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadGame);
} else {
    loadGame();
}
