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
let playerNames = ['TIM ALPHA', 'TIM BETA'];

let pendingAction = null;

// Track active score animation per player to prevent race conditions
let scoreAnimationTimers = [null, null];

// Audio Elements
const sfxClick = document.getElementById('sfx-click');
const sfxWin = document.getElementById('sfx-win');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    loadGameData();
    initKeyboard();
    initGameOverOverlay();
});

// ===== HISTORY & BACK BUTTON LOGIC (NEW) =====
// Ini adalah jantung agar tombol Back HP berfungsi menutup modal
window.onpopstate = function(event) {
    // Panggil fungsi untuk menutup tampilan modal secara paksa (UI only)
    closeAllModalsUI();
};

function closeAllModalsUI() {
    // Tutup semua overlay yang menggunakan class 'active'
    document.querySelectorAll('.overlay').forEach(el => el.classList.remove('active'));

    // Tutup modal Delete Score (style.display)
    const deleteModal = document.getElementById('deleteScoreModal');
    if (deleteModal) {
        deleteModal.style.display = 'none';
        deleteScorePlayer = null; // Reset variabel
        deleteScoreIndex = null;
    }

    // Tutup modal Edit Name (style.display)
    const editModal = document.getElementById('editNameModal');
    if (editModal) editModal.style.display = 'none';
    
    // Reset pending action jika confirm modal tertutup
    pendingAction = null;
}

// ===== SOUND =====
function playClick() {
    if (soundEnabled && sfxClick && sfxClick.readyState >= 2) {
        sfxClick.currentTime = 0;
        sfxClick.volume = 0.3;
        sfxClick.play().catch(() => {});
    }
}

function playWin() {
    if (soundEnabled && sfxWin) {
        sfxWin.volume = 0.5;
        sfxWin.play().catch(() => {});
    }
}

function toggleSound() {
    soundEnabled = document.getElementById('soundToggle').checked;
    saveGameData();
}

// ===== KEYBOARD SUPPORT =====
function initKeyboard() {
    document.addEventListener('keydown', (e) => {
        const calcOverlay = document.getElementById('calculatorOverlay');
        const calcOpen = calcOverlay && calcOverlay.classList.contains('active');

        if (e.key === 'Escape') {
            // Jika tombol ESC ditekan, kita anggap sama dengan tombol Back
            if (history.state && history.state.modal) {
                history.back();
            } else {
                closeAllModalsUI();
            }
            return;
        }

        if (!calcOpen) return;

        if (e.key >= '0' && e.key <= '9') {
            appendNumber(e.key);
        } else if (e.key === '.') {
            appendNumber('.');
        } else if (e.key === '+') {
            appendOperator('+');
        } else if (e.key === '-') {
            appendOperator('-');
        } else if (e.key === '*') {
            appendOperator('*');
        } else if (e.key === '/') {
            e.preventDefault();
            appendOperator('/');
        } else if (e.key === 'Enter' || e.key === '=') {
            e.preventDefault();
            doneCalculator();
        } else if (e.key === 'Backspace') {
            e.preventDefault();
            backspace();
        }
    });
}

// ===== GAME OVER OVERLAY — close on tap outside =====
function initGameOverOverlay() {
    const overlay = document.getElementById('gameOverModal');
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                // Gunakan history.back() agar sinkron dengan tombol HP
                history.back(); 
            }
        });
    }
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

    playClick();
}

// Undo: hapus entry terakhir dari history dan kurangi scornya
function undoLastScore(player) {
    if (roundHistory[player].length === 0) return;

    playClick();
    const lastValue = roundHistory[player].pop();
    scores[player] -= lastValue;
    if (scores[player] < 0) scores[player] = 0;

    saveGameData();
    render();
    renderHistory();
    updateScoreDifference();
}

function checkWin(player) {
    if (scores[player] >= limit) {
        gameOver(player);
    }
}

// player yang mencapai limit = KALAH (domino: tertinggi kalah)
function gameOver(loserIndex) {
    playWin();
    const winnerIndex = loserIndex === 0 ? 1 : 0;
    wins[winnerIndex]++;
    lastWinner = winnerIndex;

    document.getElementById('winnerName').innerText = playerNames[winnerIndex];
    // Tampilkan kedua skor di modal
    document.getElementById('finalScoreLoser').innerText = scores[loserIndex];
    document.getElementById('finalScoreWinner').innerText = scores[winnerIndex];
    document.getElementById('finalLoserName').innerText = playerNames[loserIndex];
    document.getElementById('finalWinnerName').innerText = playerNames[winnerIndex];
    document.getElementById('win-' + winnerIndex).innerText = wins[winnerIndex];

    // UPDATED: Push state agar Back Button menutup Game Over
    history.pushState({modal: 'gameover'}, null, '#gameover');
    document.getElementById('gameOverModal').classList.add('active');
    setTimeout(() => spawnConfetti(), 300);

    saveGameData();
}

function render() {
    const score0El = document.getElementById('score-0');
    const score1El = document.getElementById('score-1');

    animateScore(score0El, scores[0], 0);
    animateScore(score1El, scores[1], 1);

    updateScoreColor(0, score0El);
    updateScoreColor(1, score1El);

    const sisa0 = limit - scores[0];
    const sisa1 = limit - scores[1];

    const el0 = document.getElementById('remain-0');
    const el1 = document.getElementById('remain-1');

    if (el0) {
        if (sisa0 <= 0) {
            el0.innerText = '⚠️ MENCAPAI LIMIT';
            el0.classList.add('danger');
        } else {
            el0.innerText = `Batas tersisa: ${sisa0}`;
            el0.classList.remove('danger');
        }
    }

    if (el1) {
        if (sisa1 <= 0) {
            el1.innerText = '⚠️ MENCAPAI LIMIT';
            el1.classList.add('danger');
        } else {
            el1.innerText = `Batas tersisa: ${sisa1}`;
            el1.classList.remove('danger');
        }
    }

    updateProgressBar(0, scores[0]);
    updateProgressBar(1, scores[1]);

    const roundEl = document.getElementById('roundCount');
    if (roundEl) roundEl.innerText = roundCount;

    renderLastWinnerBadge();
    renderPlayerNames();
    renderUndoButtons();
}

function renderPlayerNames() {
    const name0 = document.getElementById('player-name-0');
    const name1 = document.getElementById('player-name-1');
    if (name0) name0.innerText = playerNames[0];
    if (name1) name1.innerText = playerNames[1];
}

function renderUndoButtons() {
    const undo0 = document.getElementById('undo-btn-0');
    const undo1 = document.getElementById('undo-btn-1');
    if (undo0) undo0.style.display = roundHistory[0].length > 0 ? 'flex' : 'none';
    if (undo1) undo1.style.display = roundHistory[1].length > 0 ? 'flex' : 'none';
}

function updateProgressBar(player, score) {
    const progressEl = document.getElementById(`progress-${player}`);
    const progressTextEl = document.getElementById(`progress-text-${player}`);

    if (progressEl) {
        const percentage = Math.min((score / limit) * 100, 100);
        progressEl.style.width = percentage + '%';
    }

    if (progressTextEl) {
        progressTextEl.innerText = `${score} / ${limit}`;
    }
}

// Animated counter — cancel previous animation sebelum mulai yang baru
function animateScore(element, targetScore, playerIndex) {
    if (scoreAnimationTimers[playerIndex]) {
        clearInterval(scoreAnimationTimers[playerIndex]);
        scoreAnimationTimers[playerIndex] = null;
    }

    const currentScore = parseInt(element.innerText) || 0;
    if (currentScore === targetScore) return;

    const diff = targetScore - currentScore;
    const duration = 400;
    const steps = 16;
    const stepValue = diff / steps;
    const stepDuration = duration / steps;
    let currentStep = 0;

    scoreAnimationTimers[playerIndex] = setInterval(() => {
        currentStep++;
        if (currentStep >= steps) {
            element.innerText = targetScore;
            clearInterval(scoreAnimationTimers[playerIndex]);
            scoreAnimationTimers[playerIndex] = null;
        } else {
            element.innerText = Math.round(currentScore + (stepValue * currentStep));
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

// Score diff: di domino, skor LEBIH RENDAH = lebih unggul
function updateScoreDifference() {
    const diffEl = document.getElementById('scoreDiff');
    if (!diffEl) return;

    const diff = Math.abs(scores[0] - scores[1]);

    if (diff === 0) {
        diffEl.querySelector('.diff-text').textContent = 'Pertandingan Seimbang';
        diffEl.className = 'score-diff-card neutral';
    } else if (scores[0] < scores[1]) {
        // scores[0] lebih rendah = Tim Alpha lebih aman = unggul
        diffEl.querySelector('.diff-text').textContent = `${playerNames[0]} Unggul +${diff}`;
        diffEl.className = 'score-diff-card leading-p1';
    } else {
        // scores[1] lebih rendah = Tim Beta lebih aman = unggul
        diffEl.querySelector('.diff-text').textContent = `${playerNames[1]} Unggul +${diff}`;
        diffEl.className = 'score-diff-card leading-p2';
    }
}

function renderHistory() {
    const list0 = document.getElementById('history-0');
    if (list0) {
        if (roundHistory[0].length === 0) {
            list0.innerHTML = '<div class="empty-history">Belum ada skor</div>';
        } else {
            list0.innerHTML = roundHistory[0].map((num, index) =>
                `<div class="hist-item" onclick="confirmDeleteScore(0, ${index})" title="Ketuk untuk hapus">
                    <span>${num > 0 ? '+' + num : num}</span>
                    <i class="fas fa-times hist-delete-icon"></i>
                </div>`
            ).join('');
        }
    }

    const list1 = document.getElementById('history-1');
    if (list1) {
        if (roundHistory[1].length === 0) {
            list1.innerHTML = '<div class="empty-history">Belum ada skor</div>';
        } else {
            list1.innerHTML = roundHistory[1].map((num, index) =>
                `<div class="hist-item" onclick="confirmDeleteScore(1, ${index})" title="Ketuk untuk hapus">
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

    if (badge0) badge0.style.display = 'none';
    if (badge1) badge1.style.display = 'none';

    if (lastWinner === 0 && badge0) {
        badge0.style.display = 'flex';
    } else if (lastWinner === 1 && badge1) {
        badge1.style.display = 'flex';
    }
}

function quickResetPlayer(player) {
    openConfirmModal(`Reset skor ${playerNames[player]} ke 0?`, `quickreset-${player}`);
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

// ===== PLAYER NAME EDITING =====
function openEditName(player) {
    playClick();
    document.getElementById('editNamePlayer').value = player;
    document.getElementById('editNameInput').value = playerNames[player];
    
    // UPDATED: Push state
    history.pushState({modal: 'editname'}, null, '#editname');
    document.getElementById('editNameModal').style.display = 'flex';
    setTimeout(() => document.getElementById('editNameInput').focus(), 150);
}

function closeEditNameModal() {
    // UPDATED: Gunakan history.back() agar trigger penutupan UI lewat popstate
    history.back();
}

function saveEditName() {
    playClick();
    const player = parseInt(document.getElementById('editNamePlayer').value);
    const newName = document.getElementById('editNameInput').value.trim();
    if (newName.length > 0) {
        playerNames[player] = newName.toUpperCase();
        saveGameData();
        render();
        updateScoreDifference();
    }
    // Tutup modal via history back
    history.back();
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
        soundEnabled: soundEnabled,
        playerNames: playerNames
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
        playerNames = data.playerNames || ['TIM ALPHA', 'TIM BETA'];

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

// ===== CUSTOM CONFIRM MODAL =====
function openConfirmModal(message, actionType) {
    document.getElementById('confirmMessage').innerText = message;
    pendingAction = actionType;
    
    // UPDATED: Push State
    history.pushState({modal: 'confirm'}, null, '#confirm');
    document.getElementById('confirmModal').classList.add('active');
}

function closeConfirmModal() {
    // UPDATED: Close via history
    history.back();
}

function executeConfirm() {
    if (pendingAction === 'round') {
        performResetRound();
    } else if (pendingAction === 'hard') {
        performHardReset();
    } else if (pendingAction && pendingAction.startsWith('quickreset-')) {
        const player = parseInt(pendingAction.split('-')[1]);
        performQuickReset(player);
    }
    // Tutup modal via history
    history.back();
}

// ===== RESET =====
function resetRound() {
    openConfirmModal("Mulai ronde baru? Skor akan kembali ke 0.", "round");
}

function hardReset() {
    openConfirmModal("Hapus semua data? Skor dan kemenangan akan hilang.", "hard");
}

function performResetRound() {
    scores = [0, 0];
    roundHistory = [[], []];
    roundCount++;
    lastWinner = null;
    
    // UI Cleanup akan dilakukan oleh history.back() di executeConfirm
    // Tapi kita perlu bersihkan overlay lain kalau misalnya dipanggil dari Game Over
    // Namun karena Game Over juga punya history, logic ini aman.
    
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
    playerNames = ['TIM ALPHA', 'TIM BETA'];
    document.getElementById('win-0').innerText = "0";
    document.getElementById('win-1').innerText = "0";
    
    saveGameData();
    render();
    renderHistory();
    updateScoreDifference();
}

// ===== CALCULATOR =====
let calcVal = '0';
let lastOp = null;
let prevVal = null;

function openCalculator(player) {
    activePlayer = player;
    calcVal = '0';
    lastOp = null;
    prevVal = null;
    
    // UPDATED: Push State
    history.pushState({modal: 'calculator'}, null, '#calculator');
    
    updateDisplay();
    document.getElementById('calculatorOverlay').classList.add('active');
}

function closeCalculatorOnOutside(e) {
    if (e.target.id === 'calculatorOverlay') {
        // UPDATED: Close via history
        history.back();
    }
}

function updateDisplay() {
    document.getElementById('calcDisplay').innerText = calcVal;
}

function appendNumber(num) {
    // Guard: cegah multiple decimal point
    if (num === '.' && calcVal.includes('.')) return;

    if (calcVal === '0' && num !== '.') {
        calcVal = num;
    } else {
        calcVal += num;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (lastOp) {
        calculate();
    }
    prevVal = parseFloat(calcVal);
    lastOp = op;
    calcVal = '0';
    updateDisplay();
}

function calculate() {
    const current = parseFloat(calcVal);

    // Guard: NaN propagation
    if (isNaN(current) || isNaN(prevVal)) {
        calcVal = '0';
        prevVal = null;
        lastOp = null;
        updateDisplay();
        return;
    }

    if (lastOp === '+') {
        prevVal += current;
    } else if (lastOp === '-') {
        prevVal -= current;
    } else if (lastOp === '*') {
        prevVal *= current;
    } else if (lastOp === '/') {
        // Guard: division by zero
        if (current === 0) {
            calcVal = '0';
            prevVal = null;
            lastOp = null;
            updateDisplay();
            return;
        }
        prevVal /= current;
    }

    calcVal = prevVal.toString();
    lastOp = null;
    updateDisplay();
}

function doneCalculator() {
    if (lastOp) {
        calculate();
    }

    const result = Math.floor(parseFloat(calcVal));

    if (!isNaN(result) && result !== 0) {
        updateScore(activePlayer, result);
    }

    // UPDATED: Close via history
    history.back();
}

function backspace() {
    calcVal = calcVal.slice(0, -1) || '0';
    updateDisplay();
}

function clearCalc() {
    calcVal = '0';
    lastOp = null;
    prevVal = null;
    updateDisplay();
}

// ===== SETTINGS & THEME =====
function toggleSettings() {
    const el = document.getElementById('settingsOverlay');
    if (el) {
        // UPDATED Logic
        if (!el.classList.contains('active')) {
            // Membuka: Push state
            history.pushState({modal: 'settings'}, null, '#settings');
            el.classList.add('active');
        } else {
            // Menutup: Gunakan history back agar state bersih
            history.back();
        }
    }
}

function openAbout() {
    // Tutup settings dulu (via history back jika perlu, tapi agak tricky)
    // Sederhananya, hide settings UI manual lalu push about
    const settings = document.getElementById('settingsOverlay');
    if (settings && settings.classList.contains('active')) {
        history.back(); // Ini akan menutup settings
        // Kita beri sedikit delay agar animasi smooth, lalu buka about
        setTimeout(() => {
            history.pushState({modal: 'about'}, null, '#about');
            document.getElementById('aboutOverlay').classList.add('active');
        }, 100);
    } else {
        // Langsung buka
        history.pushState({modal: 'about'}, null, '#about');
        document.getElementById('aboutOverlay').classList.add('active');
    }
}

function closeAbout() {
    // UPDATED: Close via history
    history.back();
}

function updateLimit(val) {
    let newVal = parseInt(val);
    if (!isNaN(newVal) && newVal >= 10) {
        limit = newVal;
        saveGameData();
        render();
        updateScoreDifference();
    }
}

const themeConfig = {
    'purple': { primary: '#8b5cf6', secondary: '#ec4899', primaryLight: '#a78bfa' },
    'blue':   { primary: '#3b82f6', secondary: '#06b6d4', primaryLight: '#60a5fa' },
    'green':  { primary: '#10b981', secondary: '#34d399', primaryLight: '#34d399' },
    'pink':   { primary: '#ec4899', secondary: '#f472b6', primaryLight: '#f472b6' }
};

function setTheme(themeName) {
    const root = document.documentElement;
    const theme = themeConfig[themeName];
    if (theme) {
        root.style.setProperty('--primary', theme.primary);
        root.style.setProperty('--secondary', theme.secondary);
        root.style.setProperty('--primary-light', theme.primaryLight);
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

    const scoreValue = roundHistory[player][index];
    const scoreText = scoreValue > 0 ? '+' + scoreValue : scoreValue;

    const modal = document.getElementById('deleteScoreModal');
    const message = document.getElementById('deleteScoreMessage');

    if (message) {
        message.textContent = `Hapus skor ${scoreText} dari ${playerNames[player]}?`;
    }

    // UPDATED: Push state
    if (modal) {
        history.pushState({modal: 'deletescore'}, null, '#deletescore');
        modal.style.display = 'flex';
    }
}

function closeDeleteScoreModal() {
    playClick();
    // UPDATED: Close via history
    history.back();
}

function executeDeleteScore() {
    playClick();

    if (deleteScorePlayer !== null && deleteScoreIndex !== null) {
        const scoreValue = roundHistory[deleteScorePlayer][deleteScoreIndex];

        scores[deleteScorePlayer] -= scoreValue;
        // Guard: cegah skor negatif
        if (scores[deleteScorePlayer] < 0) scores[deleteScorePlayer] = 0;

        roundHistory[deleteScorePlayer].splice(deleteScoreIndex, 1);

        saveGameData();
        render();
        renderHistory();
        updateScoreDifference();

        // Tutup modal via history
        history.back();
    }
}

// ===== CONFETTI =====
function spawnConfetti() {
    const container = document.getElementById('confetti');
    if (!container) return;
    container.innerHTML = '';

    const colors = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#f472b6', '#fbbf24'];

    for (let i = 0; i < 60; i++) {
        const piece = document.createElement('div');
        piece.classList.add('confetti-piece');

        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const delay = Math.random() * 0.6;
        const size = 6 + Math.random() * 6;
        const rotation = Math.random() * 360;
        const isCircle = Math.random() > 0.5;

        piece.style.cssText = `
            left: ${left}%;
            background-color: ${color};
            animation-delay: ${delay}s;
            width: ${size}px;
            height: ${size}px;
            border-radius: ${isCircle ? '50%' : '2px'};
            transform: rotate(${rotation}deg);
        `;

        container.appendChild(piece);
    }
}
