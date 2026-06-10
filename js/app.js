let scores = [0, 0]
let wins = [0, 0]
let limit = 101
let activePlayer = 0
let currentTheme = 'purple'
let currentLanguage = 'id'
let roundHistory = [[], []]
let roundCount = 1
let lastWinner = null
let compactMode = false
let soundEnabled = true
let iosMode = false
let playerNames = ['TIM NULLXD', 'TIM ZENITH']
let isRoundActive = true
let pendingAction = null
let scoreAnimationTimers = [null, null]
let deleteScorePlayer = null
let deleteScoreIndex = null

// ALIG MODE
let gameMode = 'normal' // 'normal' or 'alig'
let aligPlayerCount = 2
let aligRoundCount = 1
let aligScores = [0, 0, 0, 0]
let aligWins = [0, 0, 0, 0]
let aligRoundHistory = [[], [], [], []]
let aligPlayerNames = ['PEMAIN 1', 'PEMAIN 2', 'PEMAIN 3', 'PEMAIN 4', 'PEMAIN 5']
let aligIsRoundActive = true
let aligLastWinner = null
let aligDone = [false, false, false, false, false] // track siapa sudah selesai
let aligBet = [1000, 2000, 3000, 4000] // taruhan posisi 2, 3, 4, 5
const ALIG_LIMIT = 51

// QIU QIU MODE
let qqPlayers = []        // [{name, saldo}]
let qqDeltas = []         // nominal per player ronde ini
let qqPendingSign = []    // tanda +/- sementara
let qqHistory = []        // riwayat ronde
let qqRonde = 1
let qqPlayerCount = 3
let qqPlayerNames = ['PEMAIN 1','PEMAIN 2','PEMAIN 3','PEMAIN 4','PEMAIN 5','PEMAIN 6','PEMAIN 7','PEMAIN 8']
const QQ_STEP = 1000

const sfxClick = document.getElementById('sfx-click')
const sfxWin = document.getElementById('sfx-win')

const translations = {
    id: {
        round: "Ronde",
        match_balanced: "Pertandingan Seimbang",
        leading: "Unggul",
        winner_badge: "Pemenang!",
        tap_hint: "Ketuk untuk tambah",
        limit_remain: "Batas tersisa",
        limit_reached: "⚠️ MENCAPAI LIMIT",
        history: "Riwayat",
        no_history: "Belum ada skor",
        add_score: "Tambah Skor",
        new_round: "Ronde Baru",
        calculator: "Kalkulator",
        settings: "Pengaturan",
        language: "Bahasa",
        theme: "Tema Warna",
        score_limit: "Batas Skor",
        points: "poin",
        sound_effect: "Efek Suara",
        compact_mode: "Mode Ringkas",
        ios_mode: "Mode iOS",
        subtitle: "by NullXD",
        reset_all: "Reset Semua",
        about_app: "Tentang Aplikasi",
        follow_me: "Ikuti Saya:",
        dev_credit: "Dibuat dengan ❤️ oleh Farrel Aulia Irfealdo",
        win_title: "Menang!",
        won_round: "Memenangkan Ronde Ini!",
        view_score: "Lihat Skor",
        are_you_sure: "Apakah Anda yakin?",
        cancel: "Batal",
        confirm: "Konfirmasi",
        delete_confirm: "Hapus skor ini?",
        delete: "Hapus",
        change_name: "Ubah Nama Tim",
        save: "Simpan",
        features: "Fitur",
        feat_ui: "UI Modern & Elegan",
        feat_score: "Pelacakan Skor Real-time",
        feat_calc: "Kalkulator Bawaan",
        feat_theme: "Pilihan Tema Warna",
        feat_hist: "Riwayat Skor & Undo",
        feat_name: "Nama Tim Dapat Diedit",
        feat_save: "Penyimpanan Otomatis",
        developer: "Pengembang",
        dev_desc: "Dibuat oleh <strong>Farrel Aulia Irfealdo</strong><br>dengan cinta dari Indonesia 🇮🇩",
        reset_score_msg: "Reset skor {name} ke 0?",
        reset_round_msg: "Mulai ronde baru? Skor akan kembali ke 0.",
        hard_reset_msg: "Hapus semua data? Skor dan kemenangan akan hilang.",
        delete_specific_msg: "Hapus skor {score} dari {name}?"
    },
    en: {
        round: "Round",
        match_balanced: "Match Balanced",
        leading: "Leading",
        winner_badge: "Winner!",
        tap_hint: "Tap to add",
        limit_remain: "Remaining limit",
        limit_reached: "⚠️ LIMIT REACHED",
        history: "History",
        no_history: "No score yet",
        add_score: "Add Score",
        new_round: "New Round",
        calculator: "Calculator",
        settings: "Settings",
        language: "Language",
        theme: "Color Theme",
        score_limit: "Score Limit",
        points: "pts",
        sound_effect: "Sound Effect",
        compact_mode: "Compact Mode",
        ios_mode: "iOS Mode",
        subtitle: "by NullXD",
        reset_all: "Reset All",
        about_app: "About App",
        follow_me: "Follow Me:",
        dev_credit: "Made with ❤️ by Farrel Aulia Irfealdo",
        win_title: "Victory!",
        won_round: "Won This Round!",
        view_score: "View Score",
        are_you_sure: "Are you sure?",
        cancel: "Cancel",
        confirm: "Confirm",
        delete_confirm: "Delete this score?",
        delete: "Delete",
        change_name: "Edit Team Name",
        save: "Save",
        features: "Features",
        feat_ui: "Modern & Elegant UI",
        feat_score: "Real-time Score Tracking",
        feat_calc: "Built-in Calculator",
        feat_theme: "Color Theme Selection",
        feat_hist: "History & Undo",
        feat_name: "Editable Team Names",
        feat_save: "Auto Save Data",
        developer: "Developer",
        dev_desc: "Created by <strong>Farrel Aulia Irfealdo</strong><br>with love from Indonesia 🇮🇩",
        reset_score_msg: "Reset {name}'s score to 0?",
        reset_round_msg: "Start new round? Scores will reset to 0.",
        hard_reset_msg: "Delete all data? Scores and wins will be lost.",
        delete_specific_msg: "Delete score {score} from {name}?"
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadGameData()
    initKeyboard()
    initGameOverOverlay()
    renderModeBadge()
})

window.onpopstate = function(event) {
    closeAllModalsUI()
}

function getTxt(key, params = {}) {
    let text = translations[currentLanguage][key] || key
    for (const prop in params) {
        text = text.replace(`{${prop}}`, params[prop])
    }
    return text
}

function setLanguage(lang) {
    currentLanguage = lang
    updateDOMTranslations()
    saveGameData()
    render() 
    updateScoreDifference()
    renderHistory()
}

function updateDOMTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n')
        if (translations[currentLanguage][key]) {
            if (key === 'dev_desc') {
                el.innerHTML = translations[currentLanguage][key]
            } else {
                el.innerText = translations[currentLanguage][key]
            }
        }
    })
    
    const limitInputSuffix = document.querySelector('.input-suffix')
    if (limitInputSuffix) limitInputSuffix.innerText = getTxt('points')
    
    const deleteMsg = document.getElementById('deleteScoreMessage')
    if (deleteMsg && !deleteScorePlayer) { 
        deleteMsg.innerText = getTxt('delete_confirm')
    }
    
    const confirmMsg = document.getElementById('confirmMessage')
    if (confirmMsg && !pendingAction) {
        confirmMsg.innerText = getTxt('are_you_sure')
    }
}

function closeAllModalsUI() {
    document.querySelectorAll('.overlay').forEach(el => el.classList.remove('active'))
    
    const deleteModal = document.getElementById('deleteScoreModal')
    if (deleteModal) {
        deleteModal.style.display = 'none'
        deleteScorePlayer = null
        deleteScoreIndex = null
    }

    const editModal = document.getElementById('editNameModal')
    if (editModal) editModal.style.display = 'none'
    
    pendingAction = null
}

function playClick() {
    if (soundEnabled && sfxClick && sfxClick.readyState >= 2) {
        sfxClick.currentTime = 0
        sfxClick.volume = 0.3
        sfxClick.play().catch(() => {})
    }
}

function playWin() {
    if (soundEnabled && sfxWin) {
        sfxWin.volume = 0.5
        sfxWin.play().catch(() => {})
    }
}

function toggleSound() {
    soundEnabled = document.getElementById('soundToggle').checked
    saveGameData()
}

function initKeyboard() {
    document.addEventListener('keydown', (e) => {
        const calcOverlay = document.getElementById('calculatorOverlay')
        const calcOpen = calcOverlay && calcOverlay.classList.contains('active')

        if (e.key === 'Escape') {
            if (history.state && history.state.modal) {
                history.back()
            } else {
                closeAllModalsUI()
            }
            return
        }

        if (!calcOpen) return

        if (e.key >= '0' && e.key <= '9') {
            appendNumber(e.key)
        } else if (e.key === '.') {
            appendNumber('.')
        } else if (e.key === '+') {
            appendOperator('+')
        } else if (e.key === '-') {
            appendOperator('-')
        } else if (e.key === '*') {
            appendOperator('*')
        } else if (e.key === '/') {
            e.preventDefault()
            appendOperator('/')
        } else if (e.key === 'Enter' || e.key === '=') {
            e.preventDefault()
            doneCalculator()
        } else if (e.key === 'Backspace') {
            e.preventDefault()
            backspace()
        }
    })
}

function initGameOverOverlay() {
    const overlay = document.getElementById('gameOverModal')
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                history.back()
            }
        })
    }
}

function updateScore(player, amount) {
    if (!isRoundActive) return

    if (scores[player] + amount < 0) return

    if (amount !== 0) {
        roundHistory[player].push(amount)
    }

    scores[player] += amount

    saveGameData()
    render()
    renderHistory()
    updateScoreDifference()
    checkWin(player)

    playClick()
}

function undoLastScore(player) {
    if (!isRoundActive) return

    if (roundHistory[player].length === 0) return

    playClick()
    const lastValue = roundHistory[player].pop()
    scores[player] -= lastValue
    if (scores[player] < 0) scores[player] = 0

    saveGameData()
    render()
    renderHistory()
    updateScoreDifference()
}

function checkWin(player) {
    if (scores[player] >= limit) {
        const loser = player
        const winner = player === 0 ? 1 : 0
        gameOver(winner)
    }
}

function gameOver(winnerIndex) {
    if (!isRoundActive) return
    
    isRoundActive = false

    playWin()
    const loserIndex = winnerIndex === 0 ? 1 : 0
    wins[winnerIndex]++
    lastWinner = winnerIndex

    document.getElementById('winnerName').innerText = playerNames[winnerIndex]
    document.getElementById('finalScoreLoser').innerText = scores[loserIndex]
    document.getElementById('finalScoreWinner').innerText = scores[winnerIndex]
    document.getElementById('finalLoserName').innerText = playerNames[loserIndex]
    document.getElementById('finalWinnerName').innerText = playerNames[winnerIndex]
    document.getElementById('win-' + winnerIndex).innerText = wins[winnerIndex]

    const congratsText = document.querySelector('.congrats-text')
    if(congratsText) congratsText.innerText = getTxt('win_title')
    
    const announceText = document.querySelector('.winner-announce')
    if(announceText) announceText.innerHTML = `<span id="winnerName">${playerNames[winnerIndex]}</span> ${getTxt('won_round')}`

    history.pushState({modal: 'gameover'}, null, '#gameover')
    document.getElementById('gameOverModal').classList.add('active')
    setTimeout(() => spawnConfetti(), 300)

    saveGameData()
    render()
}

function renderHeaderRound() {
    const el = document.getElementById('roundCount')
    if (el) el.innerText = gameMode === 'alig' ? aligRoundCount : gameMode === 'qq' ? qqRonde : roundCount
}

function render() {
    const score0El = document.getElementById('score-0')
    const score1El = document.getElementById('score-1')

    animateScore(score0El, scores[0], 0)
    animateScore(score1El, scores[1], 1)

    updateScoreColor(0, score0El)
    updateScoreColor(1, score1El)

    const sisa0 = limit - scores[0]
    const sisa1 = limit - scores[1]

    const el0 = document.getElementById('remain-0')
    const el1 = document.getElementById('remain-1')

    if (el0) {
        if (sisa0 <= 0) {
            el0.innerText = getTxt('limit_reached')
            el0.classList.add('danger')
        } else {
            el0.innerText = `Sisa ${sisa0} lagi`
            el0.classList.remove('danger')
        }
    }

    if (el1) {
        if (sisa1 <= 0) {
            el1.innerText = getTxt('limit_reached')
            el1.classList.add('danger')
        } else {
            el1.innerText = `Sisa ${sisa1} lagi`
            el1.classList.remove('danger')
        }
    }

    updateProgressBar(0, scores[0])
    updateProgressBar(1, scores[1])

    const roundEl = document.getElementById('roundCount')
    if (roundEl) roundEl.innerText = roundCount
    renderHeaderRound()

    renderLastWinnerBadge()
    renderPlayerNames()
    renderUndoButtons()

    const btnText0 = document.querySelector('#card-0 .action-btn.plus span')
    const btnText1 = document.querySelector('#card-1 .action-btn.plus span')
    const btnIcon0 = document.querySelector('#card-0 .action-btn.plus use')
    const btnIcon1 = document.querySelector('#card-1 .action-btn.plus use')

    if (btnText0 && btnText1 && btnIcon0 && btnIcon1) {
        if (!isRoundActive) {
            btnText0.innerText = getTxt('new_round')
            btnText1.innerText = getTxt('new_round')
            btnIcon0.setAttribute('href', '#ic-rotate')
            btnIcon1.setAttribute('href', '#ic-rotate')
        } else {
            btnText0.innerText = getTxt('add_score')
            btnText1.innerText = getTxt('add_score')
            btnIcon0.setAttribute('href', '#ic-plus')
            btnIcon1.setAttribute('href', '#ic-plus')
        }
    }
    
    document.querySelectorAll('.score-tap-hint span').forEach(el => {
        el.innerText = getTxt('tap_hint')
    })
    
    document.querySelectorAll('.winner-ribbon span').forEach(el => {
        el.innerText = getTxt('winner_badge')
    })
}

function renderPlayerNames() {
    const name0 = document.getElementById('player-name-0')
    const name1 = document.getElementById('player-name-1')
    if (name0) name0.innerText = playerNames[0]
    if (name1) name1.innerText = playerNames[1]
}

function renderUndoButtons() {
    const undo0 = document.getElementById('undo-btn-0')
    const undo1 = document.getElementById('undo-btn-1')
    
    if (undo0) undo0.style.display = (roundHistory[0].length > 0 && isRoundActive) ? 'flex' : 'none'
    if (undo1) undo1.style.display = (roundHistory[1].length > 0 && isRoundActive) ? 'flex' : 'none'
}

function updateProgressBar(player, score) {
    const progressEl = document.getElementById(`progress-${player}`)
    const progressTextEl = document.getElementById(`progress-text-${player}`)

    if (progressEl) {
        const percentage = Math.min((score / limit) * 100, 100)
        progressEl.style.width = percentage + '%'
    }

    if (progressTextEl) {
        progressTextEl.innerText = `${score} / ${limit}`
    }
}

function animateScore(element, targetScore, playerIndex) {
    if (scoreAnimationTimers[playerIndex]) {
        clearInterval(scoreAnimationTimers[playerIndex])
        scoreAnimationTimers[playerIndex] = null
    }

    const currentScore = parseInt(element.innerText) || 0
    if (currentScore === targetScore) return

    const diff = targetScore - currentScore
    const duration = 400
    const steps = 16
    const stepValue = diff / steps
    const stepDuration = duration / steps
    let currentStep = 0

    scoreAnimationTimers[playerIndex] = setInterval(() => {
        currentStep++
        if (currentStep >= steps) {
            element.innerText = targetScore
            clearInterval(scoreAnimationTimers[playerIndex])
            scoreAnimationTimers[playerIndex] = null
        } else {
            element.innerText = Math.round(currentScore + (stepValue * currentStep))
        }
    }, stepDuration)
}

function updateScoreColor(player, element) {
    const progress = scores[player] / limit

    element.classList.remove('score-low', 'score-medium', 'score-high', 'score-critical')

    if (progress < 0.3) {
        element.classList.add('score-low')
    } else if (progress < 0.6) {
        element.classList.add('score-medium')
    } else if (progress < 0.85) {
        element.classList.add('score-high')
    } else {
        element.classList.add('score-critical')
    }
}

function updateScoreDifference() {
    const diffEl = document.getElementById('scoreDiff')
    if (!diffEl) return

    const diff = Math.abs(scores[0] - scores[1])
    const txt = diffEl.querySelector('.diff-text')

    if (diff === 0) {
        txt.textContent = getTxt('match_balanced')
        diffEl.className = 'score-diff-card neutral'
    } else if (scores[0] < scores[1]) {
        txt.textContent = `${playerNames[1]} ${getTxt('leading')} +${diff}`
        diffEl.className = 'score-diff-card leading-p2'
    } else {
        txt.textContent = `${playerNames[0]} ${getTxt('leading')} +${diff}`
        diffEl.className = 'score-diff-card leading-p1'
    }
}

function renderHistory() {
    const list0 = document.getElementById('history-0')
    if (list0) {
        if (roundHistory[0].length === 0) {
            list0.innerHTML = `<div class="empty-history">${getTxt('no_history')}</div>`
        } else {
            list0.innerHTML = roundHistory[0].map((num, index) =>
                `<div class="hist-item" onclick="confirmDeleteScore(0, ${index})" title="${getTxt('delete')}">
                    <span>${num > 0 ? '+' + num : num}</span>
                    <i class="fas fa-times hist-delete-icon"></i>
                </div>`
            ).join('')
        }
    }

    const list1 = document.getElementById('history-1')
    if (list1) {
        if (roundHistory[1].length === 0) {
            list1.innerHTML = `<div class="empty-history">${getTxt('no_history')}</div>`
        } else {
            list1.innerHTML = roundHistory[1].map((num, index) =>
                `<div class="hist-item" onclick="confirmDeleteScore(1, ${index})" title="${getTxt('delete')}">
                    <span>${num > 0 ? '+' + num : num}</span>
                    <i class="fas fa-times hist-delete-icon"></i>
                </div>`
            ).join('')
        }
    }
}

function renderLastWinnerBadge() {
    const badge0 = document.getElementById('badge-0')
    const badge1 = document.getElementById('badge-1')

    if (badge0) badge0.style.display = 'none'
    if (badge1) badge1.style.display = 'none'

    if (lastWinner === 0 && badge0) {
        badge0.style.display = 'flex'
    } else if (lastWinner === 1 && badge1) {
        badge1.style.display = 'flex'
    }
}

function quickResetPlayer(player) {
    openConfirmModal(getTxt('reset_score_msg', {name: playerNames[player]}), `quickreset-${player}`)
}

function performQuickReset(player) {
    scores[player] = 0
    roundHistory[player] = []
    
    saveGameData()
    render()
    renderHistory()
    updateScoreDifference()
}

function toggleIOSMode() {
    const toggle = document.getElementById('iosToggle')
    iosMode = toggle.checked
    const sb = document.getElementById('scoreboard')
    if (iosMode) sb.classList.add('ios-mode')
    else sb.classList.remove('ios-mode')
    saveGameData()
}


function toggleCompactMode() {
    const toggle = document.getElementById('compactToggle')
    compactMode = toggle.checked
    applyCompactMode()
    saveGameData()
}

function applyCompactMode() {
    const boards = [
        document.getElementById('scoreboard'),
        document.getElementById('aligBoard'),
        document.getElementById('qqBoard')
    ]
    boards.forEach(function(b) {
        if (!b) return
        if (compactMode) b.classList.add('compact')
        else b.classList.remove('compact')
    })
}

function openEditName(player) {
    playClick()
    document.getElementById('editNamePlayer').value = player
    document.getElementById('editNameInput').value = playerNames[player]
    
    history.pushState({modal: 'editname'}, null, '#editname')
    document.getElementById('editNameModal').style.display = 'flex'
    setTimeout(() => document.getElementById('editNameInput').focus(), 150)
}

function closeEditNameModal() {
    history.back()
}

function saveEditName() {
    playClick()
    const p = parseInt(document.getElementById('editNamePlayer').value)
    const n = document.getElementById('editNameInput').value.trim()
    
    if (n) {
        playerNames[p] = n.toUpperCase()
        saveGameData()
        render()
        updateScoreDifference()
    }
    history.back()
}

function saveGameData() {
    const gameData = {
        scores: scores,
        wins: wins,
        limit: limit,
        theme: currentTheme,
        lang: currentLanguage,
        history: roundHistory,
        roundCount: roundCount,
        lastWinner: lastWinner,
        compactMode: compactMode,
        soundEnabled: soundEnabled,
        iosMode: iosMode,
        playerNames: playerNames,
        isRoundActive: isRoundActive,
        gameMode: gameMode,
        aligScores: aligScores,
        aligWins: aligWins,
        aligRoundHistory: aligRoundHistory,
        aligPlayerNames: aligPlayerNames,
        aligPlayerCount: aligPlayerCount,
        aligIsRoundActive: aligIsRoundActive,
        aligLastWinner: aligLastWinner,
        aligDone: aligDone,
        aligRoundCount: aligRoundCount,
        aligGameHistory: aligGameHistory,
        aligBet: aligBet,
        qqPlayers: qqPlayers,
        qqHistory: qqHistory,
        qqRonde: qqRonde,
        qqPlayerCount: qqPlayerCount,
        qqPlayerNames: qqPlayerNames,
        qqStep: qqStep,
        dataVersion: 2    }
    localStorage.setItem('dominoScoreData', JSON.stringify(gameData))
}

function loadGameData() {
    const saved = localStorage.getItem('dominoScoreData')
    if (saved) {
        const data = JSON.parse(saved)

        // Version migration: if data version < 2, clear alig data to prevent undefined bugs
        if (!data.dataVersion || data.dataVersion < 2) {
            // Keep normal game data but reset alig to defaults
            data.aligScores = [0, 0, 0, 0]
            data.aligWins = [0, 0, 0, 0]
            data.aligRoundHistory = [[], [], [], []]
            data.aligPlayerNames = ['PEMAIN 1', 'PEMAIN 2', 'PEMAIN 3', 'PEMAIN 4', 'PEMAIN 5']
            data.aligPlayerCount = 2
            data.aligRoundCount = 1
            data.dataVersion = 2
        }
        scores = data.scores || [0, 0]
        wins = data.wins || [0, 0]
        limit = parseInt(data.limit) || 101
        currentTheme = data.theme || 'purple'
        currentLanguage = data.lang || 'id'
        roundHistory = data.history || [[], []]
        roundCount = data.roundCount || 1
        lastWinner = data.lastWinner !== undefined ? data.lastWinner : null
        compactMode = data.compactMode || false
        iosMode = data.iosMode || false
        soundEnabled = data.soundEnabled !== undefined ? data.soundEnabled : true
        playerNames = data.playerNames || ['TIM ALPHA', 'TIM ZENITH']
        isRoundActive = data.isRoundActive !== undefined ? data.isRoundActive : true
        gameMode = data.gameMode || 'normal'
        aligPlayerCount = data.aligPlayerCount || 2

        // Normalize arrays to always have exactly 4 elements
        const defaultNames = ['PEMAIN 1', 'PEMAIN 2', 'PEMAIN 3', 'PEMAIN 4', 'PEMAIN 5']
        const raw = data.aligPlayerNames || []
        aligPlayerNames = [0,1,2,3,4].map(i => (raw[i] && raw[i] !== 'undefined') ? raw[i] : defaultNames[i])

        const rawScores = data.aligScores || []
        aligScores = [0,1,2,3].map(i => rawScores[i] || 0)

        const rawWins = data.aligWins || []
        aligWins = [0,1,2,3].map(i => rawWins[i] || 0)

        const rawHist = data.aligRoundHistory || []
        aligRoundHistory = [0,1,2,3].map(i => Array.isArray(rawHist[i]) ? rawHist[i] : [])

        aligIsRoundActive = data.aligIsRoundActive !== undefined ? data.aligIsRoundActive : true
        aligLastWinner = data.aligLastWinner !== undefined ? data.aligLastWinner : null
        aligDone = Array.isArray(data.aligDone) ? data.aligDone : [false,false,false,false,false]
        aligRoundCount = data.aligRoundCount || 1
        aligGameHistory = Array.isArray(data.aligGameHistory) ? data.aligGameHistory : []
        aligBet = Array.isArray(data.aligBet) && data.aligBet.length === 4 ? data.aligBet : [1000, 2000, 3000, 4000]

        // QQ mode
        qqPlayerCount = data.qqPlayerCount || 3
        qqPlayerNames = Array.isArray(data.qqPlayerNames) && data.qqPlayerNames.length >= 8 ? data.qqPlayerNames : ['PEMAIN 1','PEMAIN 2','PEMAIN 3','PEMAIN 4','PEMAIN 5','PEMAIN 6','PEMAIN 7','PEMAIN 8']
        qqHistory = Array.isArray(data.qqHistory) ? data.qqHistory : []
        qqRonde = data.qqRonde || 1
        qqStep = data.qqStep || 1000
        if (Array.isArray(data.qqPlayers) && data.qqPlayers.length > 0) {
            qqPlayers = data.qqPlayers
            qqDeltas = qqPlayers.map(() => 0)
            qqPendingSign = qqPlayers.map(() => 1)
        } else {
            qqInitPlayers()
        }

        const totalWins = wins[0] + wins[1]
        if (totalWins >= roundCount) {
            roundCount = totalWins + 1
        }

        if (scores[0] >= limit || scores[1] >= limit) {
            isRoundActive = false
        }

        document.getElementById('win-0').innerText = wins[0]
        document.getElementById('win-1').innerText = wins[1]
        document.getElementById('limitInput').value = limit
        document.getElementById('compactToggle').checked = compactMode
        const iosToggleEl = document.getElementById('iosToggle')
        if (iosToggleEl) iosToggleEl.checked = iosMode
        document.getElementById('soundToggle').checked = soundEnabled

        if (compactMode) {
            applyCompactMode()
        }

        if (iosMode) {
            const sb = document.getElementById('scoreboard')
            if (sb) sb.classList.add('ios-mode')
        }

        setTheme(currentTheme)
        updateDOMTranslations()

        if (gameMode === 'alig') {
            showAligMode()
        } else if (gameMode === 'qq') {
            showQQMode()
        } else {
            render()
            renderHistory()
            updateScoreDifference()
        }
        renderModeBadge()
    }
}

function openConfirmModal(message, actionType) {
    document.getElementById('confirmMessage').innerText = message
    pendingAction = actionType
    
    history.pushState({modal: 'confirm'}, null, '#confirm')
    document.getElementById('confirmModal').classList.add('active')
}

function closeConfirmModal() {
    history.back()
}

function executeConfirm() {
    if (pendingAction === 'round') {
        if (gameMode === 'alig') {
            aligNewRound()
        } else {
            performResetRound()
        }
    } else if (pendingAction === 'hard') {
        performHardReset()
    } else if (pendingAction && pendingAction.startsWith('quickreset-')) {
        const player = parseInt(pendingAction.split('-')[1])
        performQuickReset(player)
    }
    history.back()
}

function hardReset() {
    openConfirmModal(getTxt('hard_reset_msg'), "hard")
}

function performResetRound() {
    scores = [0, 0]
    roundHistory = [[], []]
    roundCount++
    lastWinner = null
    isRoundActive = true
    
    saveGameData()
    render()
    renderHistory()
    updateScoreDifference()
}

function performHardReset() {
    scores = [0, 0]
    wins = [0, 0]
    roundHistory = [[], []]
    roundCount = 1
    lastWinner = null
    playerNames = ['TIM NULLXD', 'TIM ZENITH']
    isRoundActive = true

    // Also reset alig data
    aligScores = [0,0,0,0,0]
    aligWins = [0,0,0,0,0]
    aligRoundHistory = [[],[],[],[],[]]
    aligRoundCount = 1
    aligIsRoundActive = true
    aligLastWinner = null
    aligDone = [false,false,false,false,false]
    aligPlayerNames = ['PEMAIN 1','PEMAIN 2','PEMAIN 3','PEMAIN 4','PEMAIN 5']
    aligGameHistory = []
    aligBet = [1000, 2000, 3000, 4000]
    ;[0,1,2,3].forEach(i => { const el = document.getElementById(`aligBet${i}`); if(el) el.value = aligBet[i] })

    document.getElementById('win-0').innerText = "0"
    document.getElementById('win-1').innerText = "0"
    
    saveGameData()
    if (gameMode === 'alig') {
        createAligBoard()
        renderAlig()
    } else {
        render()
        renderHistory()
        updateScoreDifference()
    }
}

let calcVal = '0'
let lastOp = null
let prevVal = null

function openCalculator(player) {
    if (!isRoundActive) {
        resetRound()
        return
    }

    activePlayer = player
    calcVal = '0'
    lastOp = null
    prevVal = null
    
    history.pushState({modal: 'calculator'}, null, '#calculator')
    
    updateDisplay()
    document.getElementById('calculatorOverlay').classList.add('active')
}

function closeCalculatorOnOutside(e) {
    if (e.target.id === 'calculatorOverlay') {
        history.back()
    }
}

function updateDisplay() {
    document.getElementById('calcDisplay').innerText = calcVal
}

function appendNumber(num) {
    if (num === '.' && calcVal.includes('.')) return

    if (calcVal === '0' && num !== '.') {
        calcVal = num
    } else {
        calcVal += num
    }
    updateDisplay()
}

function appendOperator(op) {
    if (lastOp) {
        calculate()
    }
    prevVal = parseFloat(calcVal)
    lastOp = op
    calcVal = '0'
    updateDisplay()
}

function calculate() {
    const current = parseFloat(calcVal)

    if (isNaN(current) || isNaN(prevVal)) {
        calcVal = '0'
        prevVal = null
        lastOp = null
        updateDisplay()
        return
    }

    if (lastOp === '+') {
        prevVal += current
    } else if (lastOp === '-') {
        prevVal -= current
    } else if (lastOp === '*') {
        prevVal *= current
    } else if (lastOp === '/') {
        if (current === 0) {
            calcVal = '0'
            prevVal = null
            lastOp = null
            updateDisplay()
            return
        }
        prevVal /= current
    }

    calcVal = prevVal.toString()
    lastOp = null
    updateDisplay()
}

function doneCalculator() {
    if (lastOp) {
        calculate()
    }

    const result = Math.floor(parseFloat(calcVal))

    if (!isNaN(result) && result !== 0) {
        updateScore(activePlayer, result)
    }

    history.back()
}

function backspace() {
    calcVal = calcVal.slice(0, -1) || '0'
    updateDisplay()
}

function clearCalc() {
    calcVal = '0'
    lastOp = null
    prevVal = null
    updateDisplay()
}

function toggleSettings() {
    const el = document.getElementById('settingsOverlay')
    if (el) {
        if (!el.classList.contains('active')) {
            history.pushState({modal: 'settings'}, null, '#settings')
            el.classList.add('active')
        } else {
            history.back()
        }
    }
}

function openAbout() {
    const settings = document.getElementById('settingsOverlay')
    if (settings && settings.classList.contains('active')) {
        history.back() 
        setTimeout(() => {
            history.pushState({modal: 'about'}, null, '#about')
            document.getElementById('aboutOverlay').classList.add('active')
        }, 100)
    } else {
        history.pushState({modal: 'about'}, null, '#about')
        document.getElementById('aboutOverlay').classList.add('active')
    }
}

function closeAbout() {
    history.back()
}

function updateLimit(val) {
    let newVal = parseInt(val)
    if (!isNaN(newVal) && newVal >= 10) {
        limit = newVal
        saveGameData()
        render()
        updateScoreDifference()
    }
}

function setTheme(themeName) {
    const root = document.documentElement
    const config = {
        'purple': { p: '#8b5cf6', s: '#ec4899', l: '#a78bfa' },
        'blue':   { p: '#3b82f6', s: '#06b6d4', l: '#60a5fa' },
        'green':  { p: '#10b981', s: '#34d399', l: '#34d399' },
        'pink':   { p: '#ec4899', s: '#f472b6', l: '#f472b6' }
    }
    const t = config[themeName]
    if (t) {
        root.style.setProperty('--primary', t.p)
        root.style.setProperty('--secondary', t.s)
        root.style.setProperty('--primary-light', t.l)
    }
    document.querySelectorAll('.theme-option').forEach(el => el.classList.remove('active'))
    const activeBtn = document.querySelector(`.theme-option.${themeName}`)
    if (activeBtn) activeBtn.classList.add('active')
    currentTheme = themeName
    saveGameData()
}

function confirmDeleteScore(player, index) {
    if (!isRoundActive) return

    playClick()
    deleteScorePlayer = player
    deleteScoreIndex = index

    const scoreValue = roundHistory[player][index]
    const scoreText = scoreValue > 0 ? '+' + scoreValue : scoreValue

    const modal = document.getElementById('deleteScoreModal')
    const message = document.getElementById('deleteScoreMessage')

    if (message) {
        message.textContent = getTxt('delete_specific_msg', {score: scoreText, name: playerNames[player]})
    }

    if (modal) {
        history.pushState({modal: 'deletescore'}, null, '#deletescore')
        modal.style.display = 'flex'
    }
}

function closeDeleteScoreModal() {
    playClick()
    history.back()
}

function executeDeleteScore() {
    playClick()

    if (deleteScorePlayer !== null && deleteScoreIndex !== null) {
        const scoreValue = roundHistory[deleteScorePlayer][deleteScoreIndex]

        scores[deleteScorePlayer] -= scoreValue
        if (scores[deleteScorePlayer] < 0) scores[deleteScorePlayer] = 0

        roundHistory[deleteScorePlayer].splice(deleteScoreIndex, 1)

        saveGameData()
        render()
        renderHistory()
        updateScoreDifference()

        history.back()
    }
}

function spawnConfetti() {
    const container = document.getElementById('confetti')
    if (!container) return
    container.innerHTML = ''

    const colors = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#f472b6', '#fbbf24']

    for (let i = 0; i < 60; i++) {
        const piece = document.createElement('div')
        piece.classList.add('confetti-piece')

        const color = colors[Math.floor(Math.random() * colors.length)]
        const left = Math.random() * 100
        const delay = Math.random() * 0.6
        const size = 6 + Math.random() * 6
        const rotation = Math.random() * 360
        const isCircle = Math.random() > 0.5

        piece.style.cssText = `
            left: ${left}%;
            background-color: ${color};
            animation-delay: ${delay}s;
            width: ${size}px;
            height: ${size}px;
            border-radius: ${isCircle ? '50%' : '2px'};
            transform: rotate(${rotation}deg);
        `

        container.appendChild(piece)
    }
}



// ============================================================
// ALIG MODE — v4: fix reset, history, badge, perfect
// ============================================================

// aligGameHistory: array of round results, persisted
// each entry: { round, winner, winnerScore, payments: [{from,to,amount}], ranking: [{name,score,pay}] }
let aligGameHistory = []

function aligName(i) {
    const d = ['PEMAIN 1','PEMAIN 2','PEMAIN 3','PEMAIN 4','PEMAIN 5']
    const n = aligPlayerNames[i]
    return (n && n !== 'undefined' && n.trim() !== '') ? n : d[i]
}

// ---- Save/Load extension (called after base saveGameData/loadGameData) ----
// Patched into saveGameData / loadGameData via the existing calls — we just keep aligGameHistory in sync


function renderModeBadge() {
    const badge = document.getElementById('modeBadge')
    if (!badge) return
    if (gameMode === 'alig') {
        badge.innerHTML = `<span class="mode-badge-alig">🀱 ALIG</span>`
        badge.style.display = 'flex'
    } else if (gameMode === 'qq') {
        badge.innerHTML = `<span class="mode-badge-alig" style="background:rgba(232,184,75,0.15);border-color:rgba(232,184,75,0.4);color:#e8b84b;">🀱 QQ</span>`
        badge.style.display = 'flex'
    } else {
        badge.style.display = 'none'
    }
}

function switchMode(mode) {
    gameMode = mode
    saveGameData()
    renderModeBadge()
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode)
    })
    const aligCountSetting = document.getElementById('aligCountSetting')
    const aligBetSetting = document.getElementById('aligBetSetting')
    const qqCountSetting = document.getElementById('qqCountSetting')
    // Hide all mode-specific settings first
    if (aligCountSetting) aligCountSetting.style.display = 'none'
    if (aligBetSetting) aligBetSetting.style.display = 'none'
    if (qqCountSetting) qqCountSetting.style.display = 'none'

    if (mode === 'alig') {
        if (aligCountSetting) aligCountSetting.style.display = 'block'
        if (aligBetSetting) aligBetSetting.style.display = 'flex'
        hideQQMode()
        showAligMode()
    } else if (mode === 'qq') {
        if (qqCountSetting) qqCountSetting.style.display = 'block'
        hideAligMode()
        showQQMode()
    } else {
        hideAligMode()
        hideQQMode()
        render()
        renderHistory()
        updateScoreDifference()
    }
    renderHeaderRound()
}

function showAligMode() {
    document.getElementById('scoreboard').style.display = 'none'
    const diff = document.getElementById('scoreDiff')
    if (diff) diff.style.display = 'none'
    const qqBoard = document.getElementById('qqBoard')
    if (qqBoard) qqBoard.remove()
    const cs = document.getElementById('aligCountSetting')
    if (cs) cs.style.display = 'block'
    const bs = document.getElementById('aligBetSetting')
    if (bs) bs.style.display = 'flex'
    // Sync bet inputs with current values
    ;[0,1,2,3].forEach(i => {
        const el = document.getElementById(`aligBet${i}`)
        if (el) el.value = aligBet[i]
    })
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.toggle('active', b.dataset.mode === 'alig'))
    document.querySelectorAll('.alig-count-btn').forEach(b => b.classList.toggle('active', parseInt(b.dataset.count) === aligPlayerCount))
    createAligBoard()
    renderAlig()
    renderHeaderRound()
}

function hideAligMode() {
    if (gameMode !== 'qq') {
        document.getElementById('scoreboard').style.display = ''
        const diff = document.getElementById('scoreDiff')
        if (diff) diff.style.display = ''
    }
    const board = document.getElementById('aligBoard')
    if (board) board.remove()
}

function createAligBoard() {
    const old = document.getElementById('aligBoard')
    if (old) old.remove()
    const board = document.createElement('div')
    board.id = 'aligBoard'
    board.className = 'alig-board'
    if (compactMode) board.classList.add('compact')
    board.innerHTML = buildAligBoardHTML()
    const ref = document.getElementById('scoreDiff')
    if (ref) ref.insertAdjacentElement('afterend', board)
    else document.querySelector('.app-container').appendChild(board)
}

function buildAligBoardHTML() {
    const colorClass = ['alig-p1','alig-p2','alig-p3','alig-p4','alig-p5']
    let cards = ''
    for (let i = 0; i < aligPlayerCount; i++) {
        const score = aligScores[i] || 0
        const pct = Math.min((score / ALIG_LIMIT) * 100, 100)
        const progColor = pct >= 100 ? 'var(--danger)' : pct >= 70 ? '#f59e0b' : '#10b981'
        const progPulse = pct >= 70 ? ' prog-pulse' : ''
        const h = aligRoundHistory[i] || []
        const chipColors = ['chip-c0','chip-c1','chip-c2','chip-c3','chip-c4','chip-c5','chip-c6','chip-c7']
        const chipsHTML = h.length === 0
            ? '<span class="alig-empty-txt">–</span>'
            : h.map((v, idx) => `<span class="alig-hist-chip ${chipColors[idx % chipColors.length]}" onclick="aligDeleteScore(${i},${idx})">+${v}</span>`).join('')
        const undoDisplay = h.length > 0 && aligIsRoundActive ? 'flex' : 'none'
        const scoreClass = pct >= 100 ? ' alig-score-danger' : pct >= 70 ? ' alig-score-warning' : ''
        cards += `
        <div class="alig-player-card ${colorClass[i]}" id="alig-card-${i}">
            <div class="alig-card-top">
                <div class="alig-card-left">
                    <div class="alig-name-row">
                        <div class="alig-name" id="alig-name-${i}" onclick="openAligEditName(${i})">${aligName(i)}</div>
                    </div>
                    <div class="alig-progress-bar">
                        <div class="alig-progress-fill${progPulse}" id="alig-prog-${i}" style="width:${pct}%;background:${progColor}"></div>
                    </div>
                    <div class="alig-history-wrap" id="alig-hist-${i}">${chipsHTML}</div>
                </div>
                <div class="alig-card-right">
                    <div class="alig-wins-badge">
                        <svg class="svg-icon" style="width:10px;height:10px;color:var(--accent)"><use href="#ic-star"/></svg>
                        <span id="alig-wins-${i}">${aligWins[i]||0}</span>
                    </div>
                    <div class="alig-score-big${scoreClass}" id="alig-score-${i}">${score}</div>
                    <div class="alig-limit-txt">/ ${ALIG_LIMIT}</div>
                </div>
            </div>
            <div class="alig-actions">
                <button class="alig-btn-undo" id="alig-undo-${i}" onclick="aligUndo(${i})" style="display:${undoDisplay}">
                    <svg class="svg-icon" style="width:13px;height:13px;color:var(--primary)"><use href="#ic-rotate-left"/></svg>
                </button>
                <button class="alig-btn-add" onclick="openAligScoreInput(${i})">
                    <svg class="svg-icon" style="width:14px;height:14px;color:#fff"><use href="#ic-plus"/></svg>
                    <span>Tambah</span>
                </button>
            </div>
        </div>`
    }
    return `
        <div class="alig-header-bar">
            <div class="alig-round-info">
                <svg class="svg-icon" style="width:13px;height:13px;color:var(--accent)"><use href="#ic-crown"/></svg>
                <span>Ronde <strong id="alig-round">${aligRoundCount}</strong></span>
            </div>
            <div class="alig-header-right">
                <span class="alig-limit-badge">🏁 ${ALIG_LIMIT}</span>
                <button class="alig-finish-btn" onclick="aligFinalizeRound()" id="alig-finish-btn">
                    <svg class="svg-icon" style="width:11px;height:11px;color:#fff"><use href="#ic-check"/></svg>
                    Selesai
                </button>
                <button class="alig-new-round-btn" onclick="aligConfirmNewRound()">
                    <svg class="svg-icon" style="width:11px;height:11px;color:var(--primary)"><use href="#ic-rotate"/></svg>
                    Baru
                </button>
                <button class="alig-history-btn" onclick="openAligHistory()" title="Riwayat">📋</button>
            </div>
        </div>
        <div class="alig-players-wrap" id="aligPlayersWrap">${cards}</div>
    `
}

// ---- Confirm new round ----
function aligConfirmNewRound() {
    const m = document.getElementById('aligConfirmModal')
    if (m) m.style.display = 'flex'
}
function closeAligConfirm() {
    const m = document.getElementById('aligConfirmModal')
    if (m) m.style.display = 'none'
}

// ---- Tab switching ----
let aligActiveTab = 'batu'
let aligCalcVal = '0'
let aligCalcPrev = null
let aligCalcOp_pending = null
let aligActivePlayer = 0
let aligStoneValues = []

function switchAligTab(tab) {
    aligActiveTab = tab
    document.getElementById('tabBatu').classList.toggle('active', tab === 'batu')
    document.getElementById('tabAngka').classList.toggle('active', tab === 'angka')
    document.getElementById('aligTabBatu').style.display = tab === 'batu' ? 'block' : 'none'
    document.getElementById('aligTabAngka').style.display = tab === 'angka' ? 'block' : 'none'
    updateAligTotal()
}

// ---- Calculator ----
function aligCalcNum(n) {
    aligCalcVal = aligCalcVal === '0' ? n : aligCalcVal + n
    document.getElementById('aligCalcDisplay').textContent = aligCalcVal
    updateAligTotal()
}
function aligCalcOp(op) {
    const cur = parseFloat(aligCalcVal)||0
    aligCalcPrev = aligCalcOp_pending !== null ? applyOp(aligCalcPrev, cur, aligCalcOp_pending) : cur
    aligCalcOp_pending = op; aligCalcVal = '0'
    document.getElementById('aligCalcDisplay').textContent = '0'
    updateAligTotal()
}
function aligCalcClear() {
    aligCalcVal='0'; aligCalcPrev=null; aligCalcOp_pending=null
    document.getElementById('aligCalcDisplay').textContent='0'
    updateAligTotal()
}
function aligCalcBack() {
    aligCalcVal = aligCalcVal.slice(0,-1)||'0'
    document.getElementById('aligCalcDisplay').textContent = aligCalcVal
    updateAligTotal()
}
function applyOp(a,b,op) {
    if(op==='+') return a+b; if(op==='-') return a-b
    if(op==='*') return a*b; if(op==='/') return b!==0?a/b:a
    return b
}
function getAligCalcTotal() {
    const cur = parseFloat(aligCalcVal)||0
    if(aligCalcOp_pending!==null&&aligCalcPrev!==null)
        return Math.max(0,Math.floor(applyOp(aligCalcPrev,cur,aligCalcOp_pending)))
    return Math.max(0,Math.floor(cur))
}

// ---- Stone input ----
function openAligScoreInput(player) {
    if (!aligIsRoundActive) return
    aligActivePlayer = player
    aligStoneValues = []; aligCalcVal='0'; aligCalcPrev=null; aligCalcOp_pending=null
    aligActiveTab = 'batu'
    document.getElementById('aligInputName').textContent = aligName(player)
    document.getElementById('tabBatu').classList.add('active')
    document.getElementById('tabAngka').classList.remove('active')
    document.getElementById('aligTabBatu').style.display = 'block'
    document.getElementById('aligTabAngka').style.display = 'none'
    document.getElementById('aligCalcDisplay').textContent = '0'
    renderAligSelectedStones(); updateAligTotal()
    document.getElementById('aligInputOverlay').style.display = 'flex'
    playClick()
}
function aligAddStone(val) { aligStoneValues.push(val); renderAligSelectedStones(); updateAligTotal(); playClick() }
function aligClearStones() { aligStoneValues=[]; renderAligSelectedStones(); updateAligTotal() }
function renderAligSelectedStones() {
    const el = document.getElementById('aligStoneSelected')
    if (!el) return
    el.innerHTML = aligStoneValues.length === 0
        ? '<span style="color:var(--text-muted);font-size:12px">Belum ada batu dipilih</span>'
        : aligStoneValues.map((v,i)=>`<span class="alig-stone-chip" onclick="aligRemoveStone(${i})">${v} ✕</span>`).join('')
}
function aligRemoveStone(i) { aligStoneValues.splice(i,1); renderAligSelectedStones(); updateAligTotal() }
function updateAligTotal() {
    const t = aligActiveTab==='batu' ? aligStoneValues.reduce((a,b)=>a+b,0) : getAligCalcTotal()
    const el = document.getElementById('aligInputTotal')
    if (el) el.textContent = t
}
function confirmAligScore() {
    let total = 0
    if (aligActiveTab==='batu') {
        if (aligStoneValues.length===0) return
        total = aligStoneValues.reduce((a,b)=>a+b,0)
    } else {
        total = getAligCalcTotal()
        if (total===0) return
    }
    aligScores[aligActivePlayer] += total
    aligRoundHistory[aligActivePlayer].push(total)
    saveGameData(); renderAlig(); closeAligInput(); playClick()
}
function closeAligInput() { document.getElementById('aligInputOverlay').style.display='none' }

// ---- Undo ----
function aligUndo(player) {
    if (!aligIsRoundActive||!aligRoundHistory[player].length) return
    aligScores[player] = Math.max(0, aligScores[player]-aligRoundHistory[player].pop())
    saveGameData(); renderAlig(); playClick()
}

// ---- Finalize round — hitung pemenang dari skor terendah ----
function aligFinalizeRound() {
    if (!aligIsRoundActive) return
    aligIsRoundActive = false

    const winnerPlayer = [...Array(aligPlayerCount).keys()]
        .sort((a,b) => aligScores[a] - aligScores[b])[0]
    aligLastWinner = winnerPlayer
    aligWins[winnerPlayer]++
    aligRoundCount++

    const others = [...Array(aligPlayerCount).keys()]
        .filter(i => i !== winnerPlayer)
        .sort((a,b) => aligScores[a] - aligScores[b])
    let totalReceive = 0
    const payments = []
    others.forEach((playerIdx, pos) => {
        const amount = aligBet[pos] || (pos+1)*1000
        totalReceive += amount
        payments.push({from: aligName(playerIdx), to: aligName(winnerPlayer), amount})
    })

    const roundResult = {
        round: aligRoundCount - 1,
        winner: aligName(winnerPlayer),
        winnerScore: aligScores[winnerPlayer],
        totalReceive,
        payments,
        ranking: [winnerPlayer,...others].map((pi) => ({
            name: aligName(pi),
            score: aligScores[pi],
            diff: aligScores[pi] - aligScores[winnerPlayer],  // selisih vs winner
            isWinner: pi === winnerPlayer,
            pay: pi === winnerPlayer ? totalReceive : (aligBet[others.indexOf(pi)] || (others.indexOf(pi)+1)*1000)
        }))
    }
    aligGameHistory.push(roundResult)
    playWin(); saveGameData(); renderAlig()
    showAligPayment(winnerPlayer, roundResult)
}

// ---- Payment modal ----
function showAligPayment(winnerPlayer, roundResult) {
    const modal = document.getElementById('aligPayModal')
    const content = document.getElementById('aligPayContent')
    if (!modal||!content) return

    const posLabels = ['1','2','3','4']
    const rankHTML = roundResult.ranking.map((r,i)=>`
        <div class="alig-pay-row" style="${r.isWinner?'background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.25)':''}">
            <span style="font-size:11px;font-weight:700;color:var(--text-muted);width:16px;flex-shrink:0">#${posLabels[i]}</span>
            <span class="alig-pay-name">${r.name}</span>
            <span class="alig-pay-score">${r.score} poin${r.isWinner ? '' : `<span style="font-size:10px;color:var(--text-muted);margin-left:3px">(+${r.diff})</span>`}</span>
            <span class="alig-pay-amount ${r.isWinner?'receive':'pay'}">
                ${r.isWinner?`+Rp ${r.pay.toLocaleString('id-ID')}`:`−Rp ${r.pay.toLocaleString('id-ID')}`}
            </span>
        </div>`).join('')

    const payDetailHTML = roundResult.payments.map(p=>`
        <div class="alig-pay-detail-row">
            <span class="alig-pay-detail-label">${p.from} → ${p.to}</span>
            <span class="alig-pay-detail-value">Rp ${p.amount.toLocaleString('id-ID')}</span>
        </div>`).join('')

    content.innerHTML = `
        <div class="alig-pay-title">Ronde ${roundResult.round} Selesai!</div>
        <div class="alig-pay-winner">Menang: ${roundResult.winner}</div>
        <div class="alig-pay-ranking">${rankHTML}</div>
        <hr class="alig-pay-divider">
        <div style="font-size:12px;font-weight:700;color:var(--text-secondary);margin-bottom:8px;">Detail Pembayaran</div>
        <div class="alig-pay-detail-row" style="background:rgba(16,185,129,0.1);border-radius:8px;padding:8px 10px;margin-bottom:8px;">
            <span style="color:#10b981;font-weight:700;">Total diterima ${roundResult.winner}</span>
            <span style="color:#10b981;font-weight:800;font-family:'JetBrains Mono',monospace;">+Rp ${roundResult.totalReceive.toLocaleString('id-ID')}</span>
        </div>
        ${payDetailHTML}
        <div class="alig-pay-actions">
            <button class="alig-pay-btn-close" onclick="closeAligPayment()">Tutup</button>
            <button class="alig-pay-btn-new" onclick="closeAligPayment();aligConfirmNewRound()">
                Ronde Baru
            </button>
        </div>`
    modal.style.display = 'flex'
    spawnConfetti()
}

function closeAligPayment() {
    const m = document.getElementById('aligPayModal')
    if (m) m.style.display = 'none'
}

// ---- Game History ----
function openAligHistory() {
    const modal = document.getElementById('aligHistoryModal')
    const content = document.getElementById('aligHistoryContent')
    if (!modal||!content) return

    if (aligGameHistory.length === 0) {
        content.innerHTML = `
            <div class="alig-modal-handle"></div>
            <div class="alig-pay-title">Riwayat Permainan</div>
            <div style="text-align:center;color:var(--text-muted);padding:30px 0;font-size:14px">Belum ada ronde selesai</div>
            <div class="alig-pay-actions">
                <button class="alig-pay-btn-new" style="flex:1" onclick="closeAligHistory()">Tutup</button>
            </div>`
        modal.style.display = 'flex'
        return
    }

    const names = [...Array(aligPlayerCount).keys()].map(i=>aligName(i))

    // 1. Hitung net per pemain (untung/rugi total)
    const net = {}
    names.forEach(n => net[n] = 0)
    aligGameHistory.forEach(r => {
        r.payments.forEach(p => {
            if (net[p.from] !== undefined) net[p.from] -= p.amount
            if (net[p.to]   !== undefined) net[p.to]   += p.amount
        })
    })

    // 2. Hitung hutang bersih antar pasangan (A→B net)
    // Untuk setiap pasangan (i,j), hitung net dari semua transaksi
    const pairDebt = {} // key: "A|B" value: amount (positif = A bayar ke B)
    aligGameHistory.forEach(r => {
        r.payments.forEach(p => {
            const key = [p.from, p.to].sort().join('|')
            if (!pairDebt[key]) pairDebt[key] = {}
            // p.from bayar p.amount ke p.to
            pairDebt[key][p.from] = (pairDebt[key][p.from]||0) + p.amount
        })
    })

    // Resolve each pair to a single net direction
    const settlements = []
    Object.entries(pairDebt).forEach(([key, flows]) => {
        const [nameA, nameB] = key.split('|')
        const aOwes = flows[nameA]||0  // A total bayar ke B
        const bOwes = flows[nameB]||0  // B total bayar ke A
        const diff = aOwes - bOwes
        if (diff > 0) settlements.push({from: nameA, to: nameB, amount: diff})
        else if (diff < 0) settlements.push({from: nameB, to: nameA, amount: -diff})
        // if diff === 0: lunas, tidak perlu bayar
    })

    // 3. Net summary per pemain
    const summaryRows = names.map(name => {
        const n = net[name]||0
        const wins = aligGameHistory.filter(r=>r.winner===name).length
        const netStr = n >= 0
            ? `<span style="color:#10b981;font-weight:800;font-family:'JetBrains Mono',monospace">+Rp ${n.toLocaleString('id-ID')}</span>`
            : `<span style="color:var(--danger);font-weight:800;font-family:'JetBrains Mono',monospace">−Rp ${Math.abs(n).toLocaleString('id-ID')}</span>`
        return `
        <div style="display:flex;align-items:center;gap:8px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,0.06)">
            <span style="flex:1;font-weight:700;font-size:13px">${name}</span>
            <span style="font-size:11px;color:var(--text-muted)">${wins}x menang</span>
            ${netStr}
        </div>`
    }).join('')

    // 4. Settlement section
    let settlementHTML = ''
    if (settlements.length === 0) {
        settlementHTML = `<div style="text-align:center;color:var(--text-muted);font-size:12px;padding:10px 0">Semua lunas!</div>`
    } else {
        settlementHTML = settlements.map(s => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 12px;background:rgba(239,68,68,0.07);border:1px solid rgba(239,68,68,0.15);border-radius:10px;margin-bottom:6px">
            <span style="font-size:13px;font-weight:600">${s.from} <span style="color:var(--text-muted)">bayar ke</span> ${s.to}</span>
            <span style="font-weight:800;color:var(--danger);font-family:'JetBrains Mono',monospace">Rp ${s.amount.toLocaleString('id-ID')}</span>
        </div>`).join('')
    }

    // 5. Per-round rows (no emoji)
    const roundRows = [...aligGameHistory].reverse().map(r => {
        const payLines = r.payments.map(p =>
            `<div style="font-size:11px;color:var(--text-secondary);padding:2px 0">${p.from} bayar <strong style="color:var(--text-primary)">Rp ${p.amount.toLocaleString('id-ID')}</strong> ke ${p.to}</div>`
        ).join('')
        // Selisih skor per pemain vs winner (dari ranking)
        const rankLines = r.ranking ? r.ranking.filter(rk => !rk.isWinner).map(rk =>
            `<div style="font-size:10px;color:var(--text-muted);padding:1px 0">${rk.name}: ${rk.score} poin <span style="color:rgba(255,255,255,0.3)">(selisih +${rk.diff ?? '?'})</span></div>`
        ).join('') : ''
        return `
        <div style="background:rgba(255,255,255,0.04);border-radius:12px;padding:10px 12px;margin-bottom:7px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
                <span style="font-size:12px;font-weight:700;color:var(--accent)">Ronde ${r.round}</span>
                <span style="font-size:12px;color:#10b981;font-weight:700">Menang: ${r.winner} (${r.winnerScore} poin)</span>
            </div>
            ${rankLines ? `<div style="margin-bottom:5px">${rankLines}</div>` : ''}
            ${payLines}
        </div>`
    }).join('')

    content.innerHTML = `
        <div class="alig-modal-handle"></div>
        <div class="alig-pay-title">Riwayat Permainan</div>

        <div style="font-size:12px;font-weight:700;color:var(--text-secondary);margin-bottom:8px;">Rekap Untung / Rugi</div>
        <div style="background:rgba(255,255,255,0.04);border-radius:12px;padding:4px 14px;margin-bottom:16px">${summaryRows}</div>

        <div style="font-size:12px;font-weight:700;color:var(--text-secondary);margin-bottom:8px;">Yang Harus Dibayar Sekarang</div>
        <div style="margin-bottom:16px">${settlementHTML}</div>

        <div style="font-size:12px;font-weight:700;color:var(--text-secondary);margin-bottom:8px;">Detail Per Ronde</div>
        ${roundRows}

        <div class="alig-pay-actions" style="margin-top:8px">
            <button class="alig-pay-btn-new" style="flex:1" onclick="closeAligHistory()">Tutup</button>
        </div>`
    modal.style.display = 'flex'
}

function closeAligHistory() {
    const m = document.getElementById('aligHistoryModal')
    if (m) m.style.display = 'none'
}

// ---- New round (no confirm — called after confirm) ----
function aligNewRound() {
    aligScores = [0,0,0,0,0]
    aligRoundHistory = [[],[],[],[],[]]
    aligIsRoundActive = true
    aligLastWinner = null
    aligDone = [false,false,false,false,false]
    closeAligConfirm()
    saveGameData()
    createAligBoard()
    renderAlig()
    renderHeaderRound()
}

// ---- Render ----
function renderAlig() {
    const ranked = [...Array(aligPlayerCount).keys()].sort((a,b)=>{
        if(a===aligLastWinner) return -1
        if(b===aligLastWinner) return 1
        return aligScores[a]-aligScores[b]
    })

    for (let i = 0; i < aligPlayerCount; i++) {
        const score = aligScores[i]
        const pct = Math.min((score/ALIG_LIMIT)*100, 100)
        const rank = ranked.indexOf(i)

        const scoreEl = document.getElementById(`alig-score-${i}`)
        if (scoreEl) {
            scoreEl.textContent = score
            scoreEl.className = 'alig-score-big'
            if(pct>=100) scoreEl.classList.add('alig-score-danger')
            else if(pct>=70) scoreEl.classList.add('alig-score-warning')
            else if(rank===0&&score>0) scoreEl.classList.add('alig-score-safe')
        }
        const prog = document.getElementById(`alig-prog-${i}`)
        if (prog) {
            prog.style.width = pct+'%'
            prog.style.background = pct>=100?'var(--danger)':pct>=70?'#f59e0b':'#10b981'
        }
        const winsEl = document.getElementById(`alig-wins-${i}`)
        if (winsEl) winsEl.textContent = aligWins[i]||0
        const nameEl = document.getElementById(`alig-name-${i}`)
        if (nameEl) nameEl.textContent = aligName(i)
        const histEl = document.getElementById(`alig-hist-${i}`)
        if (histEl) {
            const h = aligRoundHistory[i]||[]
            histEl.innerHTML = h.length===0
                ? '<span class="alig-empty-txt">–</span>'
                : h.map((v,idx)=>`<span class="alig-hist-chip chip-c${idx%8}" onclick="aligDeleteScore(${i},${idx})">+${v}</span>`).join('')
        }
        const undoBtn = document.getElementById(`alig-undo-${i}`)
        if (undoBtn) undoBtn.style.display = ((aligRoundHistory[i]?.length>0)&&aligIsRoundActive)?'flex':'none'

        const card = document.getElementById(`alig-card-${i}`)
        if (card) {
            card.classList.remove('alig-winner-card','alig-loser-card','alig-done-card')
            if(!aligIsRoundActive && aligLastWinner===i) card.classList.add('alig-winner-card')
        }
    }

    const roundEl = document.getElementById('alig-round')
    if (roundEl) roundEl.textContent = aligRoundCount
    const finishBtn = document.getElementById('alig-finish-btn')
    if (finishBtn) finishBtn.style.display = aligIsRoundActive ? 'flex' : 'none'
    renderHeaderRound()
}

// ---- Delete score chip ----
function aligDeleteScore(player, index) {
    if (!aligIsRoundActive) return
    aligScores[player] = Math.max(0, aligScores[player]-aligRoundHistory[player][index])
    aligRoundHistory[player].splice(index,1)
    saveGameData(); renderAlig(); playClick()
}

// ---- Edit name ----
function openAligEditName(player) {
    document.getElementById('aligEditNamePlayer').value = player
    document.getElementById('aligEditNameInput').value = aligName(player)
    document.getElementById('aligEditNameOverlay').style.display = 'flex'
    setTimeout(()=>document.getElementById('aligEditNameInput').focus(), 150)
    playClick()
}
function closeAligEditName() { document.getElementById('aligEditNameOverlay').style.display='none' }
// ---- Edit nama QQ (reuse alig modal) ----
function openQQEditName(player) {
    document.getElementById('aligEditNamePlayer').value = 'qq:' + player
    document.getElementById('aligEditNameInput').value = qqPlayers[player]?.name || qqPlayerNames[player] || ('PEMAIN ' + (player+1))
    document.getElementById('aligEditNameOverlay').style.display = 'flex'
    setTimeout(()=>document.getElementById('aligEditNameInput').focus(), 150)
    playClick()
}

function saveAligName() {
    const raw = document.getElementById('aligEditNamePlayer').value
    const n = document.getElementById('aligEditNameInput').value.trim()
    if (!n) { closeAligEditName(); return }
    if (String(raw).startsWith('qq:')) {
        const p = parseInt(raw.replace('qq:',''))
        qqPlayerNames[p] = n.toUpperCase()
        if (qqPlayers[p]) qqPlayers[p].name = n.toUpperCase()
        saveGameData()
        // Update nama langsung di DOM tanpa rebuild board (agar qqDeltas tidak hilang)
        const nameEl = document.querySelector(`#qq-pc-${p} .qq-pcard-name`)
        if (nameEl) nameEl.textContent = n.toUpperCase()
        // Update saldo strip saja
        const saldoEl = document.getElementById('qq-saldo-rows')
        if (saldoEl) {
            saldoEl.innerHTML = qqPlayers.map(pl => {
                const s = pl.saldo
                const cls = s > 0 ? 'pos' : s < 0 ? 'neg' : 'zero'
                const str = s === 0 ? 'Rp 0' : (s > 0 ? '+' : '−') + 'Rp ' + Math.abs(s).toLocaleString('id-ID')
                return `<div class="qq-board-row"><span class="qq-board-name">${pl.name}</span><span class="qq-board-val ${cls}">${str}</span></div>`
            }).join('')
        }
    } else {
        const p = parseInt(raw)
        aligPlayerNames[p] = n.toUpperCase(); saveGameData(); renderAlig()
    }
    closeAligEditName()
}

// ---- Update taruhan ----
function updateAligBet(pos, val) {
    const v = parseInt(val) || 0
    aligBet[pos] = Math.max(0, v)
    saveGameData()
}

// ---- Change player count ----
function changeAligPlayerCount(count) {
    aligPlayerCount = count
    aligScores=[0,0,0,0,0]; aligRoundHistory=[[],[],[],[],[]]; aligIsRoundActive=true; aligLastWinner=null
    saveGameData(); createAligBoard(); renderAlig()
    document.querySelectorAll('.alig-count-btn').forEach(b=>b.classList.toggle('active',parseInt(b.dataset.count)===count))
}

// ---- Override resetRound for settings panel ----
function resetRound() {
    if (gameMode==='alig') { aligConfirmNewRound(); return }
    if (gameMode==='qq') { qqHardReset(); return }
    openConfirmModal(getTxt('reset_round_msg'),'round')
}
// QIU QIU MODE — Catatan Hutang
let qqStep = 1000

function qqInitPlayers() {
    qqPlayers = [...Array(qqPlayerCount)].map((_, i) => ({
        name: qqPlayerNames[i] || ('PEMAIN ' + (i+1)),
        saldo: 0
    }))
    qqDeltas = qqPlayers.map(() => 0)
    qqPendingSign = qqPlayers.map(() => 1)
    qqHistory = []
    qqRonde = 1
}

function showQQMode() {
    document.getElementById('scoreboard').style.display = 'none'
    const diff = document.getElementById('scoreDiff'); if (diff) diff.style.display = 'none'
    const cs = document.getElementById('aligCountSetting'); if (cs) cs.style.display = 'none'
    const bs = document.getElementById('aligBetSetting'); if (bs) bs.style.display = 'none'
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.toggle('active', b.dataset.mode === 'qq'))
    const qcs = document.getElementById('qqCountSetting'); if (qcs) qcs.style.display = 'block'
    createQQBoard(); renderQQ(); renderHeaderRound()
}

function hideQQMode() {
    document.getElementById('scoreboard').style.display = ''
    const diff = document.getElementById('scoreDiff'); if (diff) diff.style.display = ''
    const board = document.getElementById('qqBoard'); if (board) board.remove()
    const qcs = document.getElementById('qqCountSetting'); if (qcs) qcs.style.display = 'none'
}

function createQQBoard() {
    const old = document.getElementById('qqBoard'); if (old) old.remove()
    const board = document.createElement('div')
    board.id = 'qqBoard'; board.className = 'qq-board'
    if (compactMode) board.classList.add('compact')
    board.innerHTML = buildQQBoardHTML()
    const ref = document.getElementById('scoreDiff')
    if (ref) ref.insertAdjacentElement('afterend', board)
    else document.querySelector('.app-container').appendChild(board)
    attachQQEvents()
}

function buildQQBoardHTML() {
    const cards = qqPlayers.map((p, i) => {
        const s = p.saldo
        const saloCls = s > 0 ? ' pos' : s < 0 ? ' neg' : ''
        const cardCls = s > 0 ? ' menang' : s < 0 ? ' kalah' : ''
        const saldoStr = s === 0 ? 'Rp 0' : (s > 0 ? '+' : '−') + 'Rp ' + Math.abs(s).toLocaleString('id-ID')
        const midVal = s === 0 ? '0' : Math.abs(s).toLocaleString('id-ID')
        return `<div class="qq-pcard${cardCls}" id="qq-pc-${i}">
            <div class="qq-pcard-top">
                <div class="qq-pcard-name" onclick="openQQEditName(${i})">✎ ${p.name}</div>
                <div class="qq-saldo-top${saloCls}" id="qq-saldo-${i}">${saldoStr}</div>
            </div>
            <div class="qq-pcard-ctrl">
                <button class="qq-ctrl-btn minus" onclick="qqApply(${i},-1)">−</button>
                <div class="qq-mid-val${saloCls}" id="qq-mid-${i}" onclick="qqOpenManual(${i})">${midVal}</div>
                <button class="qq-ctrl-btn plus" onclick="qqApply(${i},1)">+</button>
            </div>
        </div>`
    }).join('')

    return `
    <div class="qq-topbar">
        <div class="qq-step-wrap">
            <span class="qq-step-label">STEP</span>
            <input class="qq-step-input" id="qqStepInput" type="text" inputmode="numeric"
                value="${qqStep.toLocaleString('id-ID')}"
                oninput="qqStepLive(this)"
                onblur="qqStepCommit(this)">
        </div>
        <div class="qq-topbar-right">
            <button class="qq-hist-btn" onclick="qqOpenHist()">${qqHistory.length > 0 ? qqHistory.length + ' catatan' : 'riwayat'}</button>
            <button class="qq-reset-btn" onclick="qqConfirmReset()">↺</button>
        </div>
    </div>
    <div class="qq-cards" id="qq-cards">${cards}</div>

    <!-- Modal riwayat -->
    <div class="qq-manual-overlay" id="qqHistOverlay" onclick="if(event.target.id==='qqHistOverlay')qqCloseHist()">
        <div class="qq-manual-modal" style="max-height:70vh;overflow-y:auto">
            <div class="qq-manual-title" style="margin-bottom:12px">RIWAYAT</div>
            <div id="qqHistList"></div>
        </div>
    </div>

    <!-- Modal input manual saldo -->
    <div class="qq-manual-overlay" id="qqManualOverlay" onclick="if(event.target.id==='qqManualOverlay')qqCloseManual()">
        <div class="qq-manual-modal">
            <div class="qq-manual-title" id="qqManualTitle">NAMA</div>
            <div class="qq-mode-toggle">
                <button class="qq-mode-btn active" id="qqModeDelta" onclick="qqSetMode('delta')">± Tambah / Kurang</button>
                <button class="qq-mode-btn" id="qqModeSet" onclick="qqSetMode('set')">= Set Nilai</button>
            </div>
            <div class="qq-manual-inputrow">
                <button class="qq-manual-sign pos" id="qqManualSign" onclick="qqToggleSign()">+</button>
                <input class="qq-manual-input" id="qqManualInput" type="text" inputmode="numeric" placeholder="0" oninput="qqFmtManual()">
            </div>
            <div class="qq-manual-preview" id="qqManualPreview">–</div>
            <div class="qq-manual-actions">
                <button class="qq-manual-cancel" onclick="qqCloseManual()">Batal</button>
                <button class="qq-manual-ok" id="qqManualOkBtn" onclick="qqConfirmManual()">✓ Tambah</button>
            </div>
        </div>
    </div>

    <!-- Modal konfirmasi reset -->
    <div class="qq-manual-overlay" id="qqResetOverlay" onclick="if(event.target.id==='qqResetOverlay')qqCloseReset()">
        <div class="qq-manual-modal">
            <div class="qq-manual-title">Reset Semua?</div>
            <div class="qq-manual-hint" style="margin-bottom:24px">Semua saldo kembali ke Rp 0.<br>Riwayat akan dihapus.</div>
            <div class="qq-manual-actions">
                <button class="qq-manual-cancel" onclick="qqCloseReset()">Batal</button>
                <button class="qq-manual-ok" style="background:linear-gradient(135deg,#ff4757,#c0392b);color:#fff" onclick="qqDoReset()">↺ Reset</button>
            </div>
        </div>
    </div>`
}

function attachQQEvents() {}

function qqStepLive(inp) {
    const raw = inp.value.replace(/[^0-9]/g, '')
    const num = parseInt(raw) || 0
    const fmt = num > 0 ? num.toLocaleString('id-ID') : ''
    const pos = inp.selectionStart, oldLen = inp.value.length
    inp.value = fmt
    try { inp.setSelectionRange(pos + fmt.length - oldLen, pos + fmt.length - oldLen) } catch(e) {}
}

function qqStepCommit(inp) {
    const raw = inp.value.replace(/[^0-9]/g, '')
    const num = parseInt(raw) || 1000
    qqStep = Math.max(100, num)
    inp.value = qqStep.toLocaleString('id-ID')
    saveGameData()
}

function qqApply(i, dir) {
    const delta = dir * qqStep
    const before = qqPlayers[i].saldo
    const after = before + delta
    qqPlayers[i].saldo = after
    qqHistory.unshift({ name: qqPlayers[i].name, delta, before, after, playerIdx: i })
    const card = document.getElementById('qq-pc-' + i)
    if (card) {
        card.style.background = dir > 0 ? 'rgba(26,237,122,0.18)' : 'rgba(255,71,87,0.18)'
        setTimeout(() => { card.style.background = '' }, 300)
    }
    saveGameData(); renderQQ(); playClick()
}

let qqManualIdx = -1
let qqManualSign = 1
let qqManualMode = 'delta'

function qqSetMode(mode) {
    qqManualMode = mode
    document.getElementById('qqModeDelta').classList.toggle('active', mode === 'delta')
    document.getElementById('qqModeSet').classList.toggle('active', mode === 'set')
    document.getElementById('qqManualInput').value = ''
    const okBtn = document.getElementById('qqManualOkBtn')
    if (okBtn) okBtn.textContent = mode === 'set' ? '✓ Set' : (qqManualSign > 0 ? '✓ Tambah' : '✓ Kurang')
    qqUpdateManualPreview()
}
function qqOpenManual(i) {
    qqManualIdx = i
    qqManualSign = 1
    qqManualMode = 'delta'
    document.getElementById('qqManualTitle').textContent = qqPlayers[i].name
    document.getElementById('qqModeDelta').classList.add('active')
    document.getElementById('qqModeSet').classList.remove('active')
    const inp = document.getElementById('qqManualInput')
    inp.value = ''
    const btn = document.getElementById('qqManualSign')
    btn.textContent = '+'; btn.className = 'qq-manual-sign pos'
    const okBtn = document.getElementById('qqManualOkBtn')
    if (okBtn) okBtn.textContent = '✓ Tambah'
    qqUpdateManualPreview()
    document.getElementById('qqManualOverlay').style.display = 'flex'
    setTimeout(() => inp.focus(), 120)
}
function qqCloseManual() {
    document.getElementById('qqManualOverlay').style.display = 'none'
    qqManualIdx = -1
}
function qqToggleSign() {
    qqManualSign *= -1
    const btn = document.getElementById('qqManualSign')
    btn.textContent = qqManualSign < 0 ? '−' : '+'
    btn.className = 'qq-manual-sign' + (qqManualSign < 0 ? ' neg' : ' pos')
    if (qqManualMode === 'delta') {
        const okBtn = document.getElementById('qqManualOkBtn')
        if (okBtn) okBtn.textContent = qqManualSign > 0 ? '✓ Tambah' : '✓ Kurang'
    }
    qqUpdateManualPreview()
}
function qqFmtManual() {
    const inp = document.getElementById('qqManualInput')
    const raw = inp.value.replace(/[^0-9]/g, '')
    const num = parseInt(raw) || 0
    const fmt = num > 0 ? num.toLocaleString('id-ID') : ''
    const pos = inp.selectionStart, oldLen = inp.value.length
    inp.value = fmt
    try { inp.setSelectionRange(pos + fmt.length - oldLen, pos + fmt.length - oldLen) } catch(e) {}
    qqUpdateManualPreview()
}
function qqUpdateManualPreview() {
    const inp = document.getElementById('qqManualInput')
    const prev = document.getElementById('qqManualPreview')
    if (!inp || !prev) return
    const num = parseInt(inp.value.replace(/[^0-9]/g, '')) || 0
    const cur = qqManualIdx >= 0 ? qqPlayers[qqManualIdx].saldo : 0
    if (qqManualMode === 'delta') {
        if (num === 0) { prev.innerHTML = '–'; prev.className = 'qq-manual-preview'; return }
        const delta = qqManualSign * num
        const result = cur + delta
        const dStr = (delta > 0 ? '+' : '−') + 'Rp ' + Math.abs(delta).toLocaleString('id-ID')
        const rStr = 'Rp ' + Math.abs(result).toLocaleString('id-ID')
        prev.innerHTML = '<span class="' + (delta>0?'pos':'neg') + '">' + dStr + '</span> → <strong>' + rStr + '</strong>'
        prev.className = 'qq-manual-preview'
    } else {
        const final = qqManualSign * num
        prev.textContent = num === 0 ? '–' : (final > 0 ? '+' : '−') + 'Rp ' + Math.abs(final).toLocaleString('id-ID')
        prev.className = 'qq-manual-preview' + (final > 0 ? ' pos' : final < 0 ? ' neg' : '')
    }
}
function qqConfirmManual() {
    if (qqManualIdx < 0) return
    const num = parseInt(document.getElementById('qqManualInput').value.replace(/[^0-9]/g, '')) || 0
    if (num === 0) { qqCloseManual(); return }
    const before = qqPlayers[qqManualIdx].saldo
    let after, delta
    if (qqManualMode === 'delta') {
        delta = qqManualSign * num
        after = before + delta
    } else {
        after = qqManualSign * num
        delta = after - before
    }
    qqPlayers[qqManualIdx].saldo = after
    if (delta !== 0) qqHistory.unshift({ name: qqPlayers[qqManualIdx].name, delta, before, after, playerIdx: qqManualIdx })
    saveGameData(); renderQQ(); playClick(); qqCloseManual()
}

function qqOpenHist() {
    const overlay = document.getElementById('qqHistOverlay')
    if (!overlay) return
    const listEl = document.getElementById('qqHistList')
    if (listEl) {
        if (!qqHistory.length) {
            listEl.innerHTML = '<div class="qq-hist-empty">Belum ada catatan</div>'
        } else {
            listEl.innerHTML = qqHistory.map((h, hi) => {
                const sign = h.delta > 0 ? '+' : '−'
                const cls  = h.delta > 0 ? 'pos' : 'neg'
                const amt  = sign + 'Rp ' + Math.abs(h.delta).toLocaleString('id-ID')
                const afterStr = h.after !== undefined
                    ? ((h.after >= 0 ? '' : '−') + 'Rp ' + Math.abs(h.after).toLocaleString('id-ID')) : ''
                return `<div class="qq-h-row">
                    <span class="qq-h-name">${h.name}</span>
                    <span class="qq-h-delta ${cls}">${amt}</span>
                    <span class="qq-h-after">→ ${afterStr}</span>
                    ${hi === 0 ? '<button class="qq-h-undo" id="qq-ubtn2">↩ Undo</button>' : '<span></span>'}
                </div>`
            }).join('')
            const ubtn = document.getElementById('qq-ubtn2')
            if (ubtn) ubtn.addEventListener('click', () => { qqUndo(); qqCloseHist(); setTimeout(qqOpenHist, 80) })
        }
    }
    overlay.style.display = 'flex'
}
function qqCloseHist() {
    const o = document.getElementById('qqHistOverlay')
    if (o) o.style.display = 'none'
}

function qqConfirmReset() { document.getElementById('qqResetOverlay').style.display = 'flex' }
function qqCloseReset()   { document.getElementById('qqResetOverlay').style.display = 'none' }
function qqDoReset() {
    qqPlayers.forEach(p => { p.saldo = 0 })
    qqHistory = []
    saveGameData(); renderQQ(); playClick(); qqCloseReset()
}

function qqUndo() {
    if (!qqHistory.length) return
    const last = qqHistory.shift()
    const p = qqPlayers[last.playerIdx] || qqPlayers.find(x => x.name === last.name)
    if (p) p.saldo = last.before
    saveGameData(); renderQQ()
}

function renderQQ() {
    qqPlayers.forEach((p, i) => {
        const s = p.saldo
        const sEl = document.getElementById('qq-saldo-' + i)
        const mEl = document.getElementById('qq-mid-' + i)
        if (sEl) {
            sEl.className = 'qq-saldo-top' + (s > 0 ? ' pos' : s < 0 ? ' neg' : '')
            sEl.textContent = s === 0 ? 'Rp 0' : (s > 0 ? '+' : '−') + 'Rp ' + Math.abs(s).toLocaleString('id-ID')
        }
        if (mEl) {
            mEl.className = 'qq-mid-val' + (s > 0 ? ' pos' : s < 0 ? ' neg' : '')
            mEl.textContent = s === 0 ? '0' : Math.abs(s).toLocaleString('id-ID')
        }
        const card = document.getElementById('qq-pc-' + i)
        if (card) {
            card.classList.remove('menang','kalah')
            if (s > 0) card.classList.add('menang')
            else if (s < 0) card.classList.add('kalah')
        }
    })
    const hbtn = document.querySelector('.qq-hist-btn')
    if (hbtn) hbtn.textContent = qqHistory.length > 0 ? qqHistory.length + ' catatan' : 'riwayat'
    renderHeaderRound()
}

function qqToggleHist() {}

function changeQQPlayerCount(count) {
    qqPlayerCount = count; qqInitPlayers(); saveGameData(); createQQBoard(); renderQQ()
    document.querySelectorAll('.qq-count-btn').forEach(b => b.classList.toggle('active', parseInt(b.dataset.count) === count))
}

function qqHardReset() { qqInitPlayers(); saveGameData(); createQQBoard(); renderQQ() }

// ========================================
// 🎵 MUSIC PLAYER FEATURE
// ========================================

const NEOXR_API_KEY = 'SelfFrrl'
const NEOXR_API_URL = 'https://api.neoxr.eu/api/yts'

let musicQueue = []
let currentMusicIndex = -1
let ytPlayer = null
let isPlayerReady = false
let isPlaying = false

const musicBtn = document.getElementById('music-btn')
const musicModal = document.getElementById('music-modal')
const musicCloseBtn = document.getElementById('music-close-btn')
const musicSearchInput = document.getElementById('music-search-input')
const musicSearchBtn = document.getElementById('music-search-btn')
const musicLoading = document.getElementById('music-loading')
const musicResults = document.getElementById('music-results')
const musicEmpty = document.getElementById('music-empty')
const musicPlayer = document.getElementById('music-player')
const musicPlayerThumb = document.getElementById('music-player-thumb')
const musicPlayerTitle = document.getElementById('music-player-title')
const musicPlayerArtist = document.getElementById('music-player-artist')
const musicPlayBtn = document.getElementById('music-play-btn')
const musicPlayIcon = document.getElementById('music-play-icon')
const musicPauseIcon = document.getElementById('music-pause-icon')
const musicPrevBtn = document.getElementById('music-prev-btn')
const musicNextBtn = document.getElementById('music-next-btn')
const musicClosePlayerBtn = document.getElementById('music-close-player-btn')

window.addEventListener('load', () => {
    if (musicBtn) {
        musicBtn.style.display = 'flex'
        setTimeout(() => { loadYouTubeAPI() }, 1000)
    }
})

function loadYouTubeAPI() {
    if (window.YT && window.YT.Player) {
        initYouTubePlayer()
        return
    }
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    tag.async = true
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    window.onYouTubeIframeAPIReady = () => { initYouTubePlayer() }
}

function initYouTubePlayer() {
    const container = document.getElementById('youtube-player-container')
    if (!container) return
    try {
        ytPlayer = new YT.Player('youtube-player-container', {
            height: '0', width: '0',
            playerVars: { autoplay: 0, controls: 0, playsinline: 1, rel: 0, modestbranding: 1 },
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
                onError: onPlayerError
            }
        })
    } catch (e) {}
}

function onPlayerReady() { isPlayerReady = true }

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true; updatePlayButton(true)
    } else if (event.data === YT.PlayerState.PAUSED) {
        isPlaying = false; updatePlayButton(false)
    } else if (event.data === YT.PlayerState.ENDED) {
        playNext()
    }
}

function onPlayerError() {
    if (currentMusicIndex < musicQueue.length - 1) setTimeout(() => playNext(), 1000)
}

if (musicBtn) musicBtn.addEventListener('click', () => { musicModal.classList.add('active'); if (musicSearchInput) musicSearchInput.focus() })
if (musicCloseBtn) musicCloseBtn.addEventListener('click', () => { musicModal.classList.remove('active') })
if (musicModal) musicModal.addEventListener('click', (e) => { if (e.target === musicModal) musicModal.classList.remove('active') })
if (musicSearchBtn) musicSearchBtn.addEventListener('click', searchMusic)
if (musicSearchInput) musicSearchInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') searchMusic() })

async function searchMusic() {
    const query = musicSearchInput.value.trim()
    if (query.length < 3) {
        musicSearchInput.style.borderColor = '#ef4444'
        setTimeout(() => { musicSearchInput.style.borderColor = '' }, 1000)
        return
    }
    musicLoading.style.display = 'flex'
    musicResults.innerHTML = ''
    musicEmpty.style.display = 'none'
    try {
        const response = await fetch(`${NEOXR_API_URL}?q=${encodeURIComponent(query)}&apikey=${NEOXR_API_KEY}`)
        const data = await response.json()
        musicLoading.style.display = 'none'
        if (data.status && data.data && data.data.length > 0) {
            displayResults(data.data)
        } else {
            musicEmpty.style.display = 'flex'
        }
    } catch (e) {
        musicLoading.style.display = 'none'
        musicEmpty.innerHTML = `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><p>Gagal mencari. Cek koneksi internet.</p>`
        musicEmpty.style.display = 'flex'
    }
}

function displayResults(songs) {
    musicResults.innerHTML = ''
    songs.forEach((song, index) => {
        const card = document.createElement('div')
        card.className = 'music-song-card'
        const thumbnail = song.thumbnail || song.image || ''
        const title = song.title || 'Unknown Title'
        const artist = song.author?.name || 'Unknown Artist'
        const duration = song.timestamp || song.duration?.timestamp || '0:00'
        const views = formatViews(song.views || 0)
        card.innerHTML = `<img class="music-song-thumb" src="${thumbnail}" alt="${title}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2280%22 height=%2260%22%3E%3Crect fill=%22%23333%22 width=%2280%22 height=%2260%22/%3E%3C/svg%3E'"><div class="music-song-info"><div class="music-song-title">${title}</div><div class="music-song-artist">${artist}</div><div class="music-song-duration">${duration} • ${views} views</div></div>`
        card.addEventListener('click', () => { playSong(songs, index); musicModal.classList.remove('active') })
        musicResults.appendChild(card)
    })
}

function formatViews(views) {
    if (views >= 1000000) return (views / 1000000).toFixed(1) + 'M'
    if (views >= 1000) return (views / 1000).toFixed(1) + 'K'
    return views.toString()
}

function playSong(queue, index) {
    if (!isPlayerReady) { setTimeout(() => playSong(queue, index), 2000); return }
    if (!ytPlayer || !ytPlayer.loadVideoById) return
    musicQueue = queue
    currentMusicIndex = index
    const song = musicQueue[currentMusicIndex]
    const videoId = song.videoId || song.id
    if (!videoId) { if (currentMusicIndex < queue.length - 1) playSong(queue, currentMusicIndex + 1); return }
    musicPlayerThumb.src = song.thumbnail || song.image || ''
    musicPlayerTitle.textContent = song.title || 'Unknown'
    musicPlayerArtist.textContent = song.author?.name || 'Unknown Artist'
    try {
        ytPlayer.loadVideoById(videoId)
        musicPlayer.style.display = 'block'
    } catch (e) {
        if (currentMusicIndex < musicQueue.length - 1) setTimeout(() => playNext(), 1000)
    }
}

if (musicPlayBtn) musicPlayBtn.addEventListener('click', togglePlayPause)
if (musicPrevBtn) musicPrevBtn.addEventListener('click', playPrevious)
if (musicNextBtn) musicNextBtn.addEventListener('click', playNext)
if (musicClosePlayerBtn) musicClosePlayerBtn.addEventListener('click', closePlayer)

function togglePlayPause() {
    if (!ytPlayer || currentMusicIndex === -1) return
    try { isPlaying ? ytPlayer.pauseVideo() : ytPlayer.playVideo() } catch (e) {}
}
function playPrevious() { if (currentMusicIndex > 0) playSong(musicQueue, currentMusicIndex - 1) }
function playNext() { if (currentMusicIndex < musicQueue.length - 1) playSong(musicQueue, currentMusicIndex + 1) }

function closePlayer() {
    try { if (ytPlayer) ytPlayer.stopVideo() } catch (e) {}
    musicPlayer.style.display = 'none'
    currentMusicIndex = -1
    isPlaying = false
    updatePlayButton(false)
}

function updatePlayButton(playing) {
    if (musicPlayIcon && musicPauseIcon) {
        musicPlayIcon.style.display = playing ? 'none' : 'block'
        musicPauseIcon.style.display = playing ? 'block' : 'none'
    }
}
