// ===== STATE MANAGEMENT =====
let scores = [0, 0];
let wins = [0, 0];
let limit = 101;
let activePlayer = 0;
let currentTheme = 'purple';
let roundHistory = [[], []];
let roundCount = 1;
let lastWinner = null;
let compactMode = false;
let soundEnabled = true;

let pendingAction = null; 

// Audio Elements
const sfxClick = document.getElementById('sfx-click');
const sfxWin = document.getElementById('sfx-win');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    loadGameData();
});

// Optimized audio functions with sound toggle
function playClick() { 
    if(soundEnabled && sfxClick && sfxClick.readyState >= 2) { 
        sfxClick.currentTime = 0;
        sfxClick.volume = 0.3;
        sfxClick.play().catch(()=>{}); 
    } 
}

function playWin() { 
    if(soundEnabled && sfxWin) {
        sfxWin.volume = 0.5;
        sfxWin.play().catch(()=>{}); 
    }
}

function toggleSound() {
    soundEnabled = document.getElementById('soundToggle').checked;
    saveGameData();
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
    
    // Play sound only when score changes
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
    
    // Animate score changes
    animateScore(score0El, scores[0]);
    animateScore(score1El, scores[1]);
    
    updateScoreColor(0, score0El);
    updateScoreColor(1, score1El);

    const sisa0 = limit - scores[0];
    const sisa1 = limit - scores[1];

    const el0 = document.getElementById('remain-0');
    const el1 = document.getElementById('remain-1');

    if(el0) {
        el0.innerText = `${scores[0]} / ${limit}`;
    }

    if(el1) {
        el1.innerText = `${scores[1]} / ${limit}`;
    }

    // Update progress bars
    updateProgressBar(0, scores[0]);
    updateProgressBar(1, scores[1]);

    const roundEl = document.getElementById('roundCount');
    if(roundEl) roundEl.innerText = roundCount;

    renderLastWinnerBadge();
}

function updateProgressBar(player, score) {
    const progressEl = document.getElementById(`progress-${player}`);
    if (progressEl) {
        const percentage = Math.min((score / limit) * 100, 100);
        progressEl.style.width = percentage + '%';
    }
}

// Animated counter for score
function animateScore(element, targetScore) {
    const currentScore = parseInt(element.innerText) || 0;
    if (currentScore === targetScore) return;
    
    const diff = targetScore - currentScore;
    const duration = 500;
    const steps = 20;
    const stepValue = diff / steps;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    
    const interval = setInterval(() => {
        currentStep++;
        if (currentStep >= steps) {
            element.innerText = targetScore;
            clearInterval(interval);
        } else {
            const newValue = Math.round(currentScore + (stepValue * currentStep));
            element.innerText = newValue;
        }
    }, stepDuration);
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
        diffEl.querySelector('.diff-text').textContent = 'Pertandingan Seimbang';
        diffEl.className = 'score-diff-card neutral';
    } else if (scores[0] < scores[1]) {
        diffEl.querySelector('.diff-text').textContent = `Tim Alpha Unggul +${diff}`;
        diffEl.className = 'score-diff-card leading-p1';
    } else {
        diffEl.querySelector('.diff-text').textContent = `Tim Beta Unggul +${diff}`;
        diffEl.className = 'score-diff-card leading-p2';
    }
}

function renderHistory() {
    const list0 = document.getElementById('history-0');
    if(list0) {
        if (roundHistory[0].length === 0) {
            list0.innerHTML = '<div class="empty-history">No scores yet</div>';
        } else {
            list0.innerHTML = roundHistory[0].map((num, index) => 
                `<div class="hist-item" onclick="confirmDeleteScore(0, ${index})" title="Klik untuk hapus">
                    <span>${num > 0 ? '+' + num : num}</span>
                    <i class="fas fa-times hist-delete-icon"></i>
                </div>`
            ).join('');
        }
    }

    const list1 = document.getElementById('history-1');
    if(list1) {
        if (roundHistory[1].length === 0) {
            list1.innerHTML = '<div class="empty-history">No scores yet</div>';
        } else {
            list1.innerHTML = roundHistory[1].map((num, index) => 
                `<div class="hist-item" onclick="confirmDeleteScore(1, ${index})" title="Klik untuk hapus">
                    <span>${num > 0 ? '+' + num : num}</span>
                    <i class="fas fa-times hist-delete-icon"></i>
                </div>`
            ).join('');
        }
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
        compactMode: compactMode,
        soundEnabled: soundEnabled
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
        currentTheme = data.theme || 'purple';
        roundHistory = data.history || [[], []];
        roundCount = data.roundCount || 1;
        lastWinner = data.lastWinner !== undefined ? data.lastWinner : null;
        compactMode = data.compactMode || false;
        soundEnabled = data.soundEnabled !== undefined ? data.soundEnabled : true;

        document.getElementById('win-0').innerText = wins[0];
        document.getElementById('win-1').innerText = wins[1];
        document.getElementById('limitInput').value = limit;
        document.getElementById('compactToggle').checked = compactMode;
        document.getElementById('soundToggle').checked = soundEnabled;
        
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

// Optimized: Append number without sound (sound only on score change)
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
    console.log('toggleSettings called'); // Debug log
    const el = document.getElementById('settingsOverlay');
    if(el) {
        el.classList.toggle('active');
        console.log('Settings overlay toggled:', el.classList.contains('active'));
    } else {
        console.error('settingsOverlay element not found!');
    }
}

function openAbout() {
    // Close settings first
    const settings = document.getElementById('settingsOverlay');
    if(settings) settings.classList.remove('active');
    
    // Open about
    const about = document.getElementById('aboutOverlay');
    if(about) about.classList.add('active');
}

function closeAbout() {
    const about = document.getElementById('aboutOverlay');
    if(about) about.classList.remove('active');
}

function closeAboutOnOutside(e) {
    if(e.target.id === 'aboutOverlay') {
        closeAbout();
    }
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
    'purple': { primary: '#8b5cf6', secondary: '#ec4899' },
    'blue': { primary: '#3b82f6', secondary: '#06b6d4' },
    'green': { primary: '#10b981', secondary: '#34d399' },
    'pink': { primary: '#ec4899', secondary: '#f472b6' }
};

function setTheme(themeName) {
    const root = document.documentElement;
    const theme = themeConfig[themeName];
    if (theme) {
        root.style.setProperty('--primary', theme.primary);
        root.style.setProperty('--secondary', theme.secondary);
    }
    document.querySelectorAll('.theme-option').forEach(el => el.classList.remove('active'));
    const activeBtn = document.querySelector(`.theme-option.${themeName}`);
    if (activeBtn) activeBtn.classList.add('active');
    currentTheme = themeName;
    saveGameData();
}

// ===== DELETE INDIVIDUAL SCORE =====
let deleteScorePlayer = null;
let deleteScoreIndex = null;

function confirmDeleteScore(player, index) {
    playClick();
    deleteScorePlayer = player;
    deleteScoreIndex = index;
    
    const teamName = player === 0 ? 'TIM 1' : 'TIM 2';
    const scoreValue = roundHistory[player][index];
    const scoreText = scoreValue > 0 ? '+' + scoreValue : scoreValue;
    
    const modal = document.getElementById('deleteScoreModal');
    const message = document.getElementById('deleteScoreMessage');
    
    if (message) {
        message.textContent = `Hapus skor ${scoreText} dari ${teamName}?`;
    }
    
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeDeleteScoreModal() {
    playClick();
    const modal = document.getElementById('deleteScoreModal');
    if (modal) {
        modal.style.display = 'none';
    }
    deleteScorePlayer = null;
    deleteScoreIndex = null;
}

function executeDeleteScore() {
    playClick();
    
    if (deleteScorePlayer !== null && deleteScoreIndex !== null) {
        const scoreValue = roundHistory[deleteScorePlayer][deleteScoreIndex];
        
        // Kurangi score
        scores[deleteScorePlayer] -= scoreValue;
        
        // Hapus dari history
        roundHistory[deleteScorePlayer].splice(deleteScoreIndex, 1);
        
        // Update UI
        saveGameData();
        render();
        renderHistory();
        updateScoreDifference();
        
        // Close modal
        closeDeleteScoreModal();
    }
}


