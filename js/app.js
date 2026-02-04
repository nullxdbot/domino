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
let playerNames = ['TIM ALPHA', 'TIM BETA']
let isRoundActive = true
let pendingAction = null
let scoreAnimationTimers = [null, null]
let deleteScorePlayer = null
let deleteScoreIndex = null

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
        gameOver(player)
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
            el0.innerText = `${getTxt('limit_remain')}: ${sisa0}`
            el0.classList.remove('danger')
        }
    }

    if (el1) {
        if (sisa1 <= 0) {
            el1.innerText = getTxt('limit_reached')
            el1.classList.add('danger')
        } else {
            el1.innerText = `${getTxt('limit_remain')}: ${sisa1}`
            el1.classList.remove('danger')
        }
    }

    updateProgressBar(0, scores[0])
    updateProgressBar(1, scores[1])

    const roundEl = document.getElementById('roundCount')
    if (roundEl) roundEl.innerText = roundCount

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

function toggleCompactMode() {
    const toggle = document.getElementById('compactToggle')
    compactMode = toggle.checked
    const sb = document.getElementById('scoreboard')

    if (compactMode) {
        sb.classList.add('compact')
    } else {
        sb.classList.remove('compact')
    }

    saveGameData()
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
        playerNames: playerNames,
        isRoundActive: isRoundActive
    }
    localStorage.setItem('dominoScoreData', JSON.stringify(gameData))
}

function loadGameData() {
    const saved = localStorage.getItem('dominoScoreData')
    if (saved) {
        const data = JSON.parse(saved)
        scores = data.scores || [0, 0]
        wins = data.wins || [0, 0]
        limit = parseInt(data.limit) || 101
        currentTheme = data.theme || 'purple'
        currentLanguage = data.lang || 'id'
        roundHistory = data.history || [[], []]
        roundCount = data.roundCount || 1
        lastWinner = data.lastWinner !== undefined ? data.lastWinner : null
        compactMode = data.compactMode || false
        soundEnabled = data.soundEnabled !== undefined ? data.soundEnabled : true
        playerNames = data.playerNames || ['TIM ALPHA', 'TIM BETA']
        isRoundActive = data.isRoundActive !== undefined ? data.isRoundActive : true

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
        document.getElementById('soundToggle').checked = soundEnabled

        if (compactMode) {
            document.getElementById('scoreboard').classList.add('compact')
        }

        setTheme(currentTheme)
        updateDOMTranslations()
        render()
        renderHistory()
        updateScoreDifference()
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
        performResetRound()
    } else if (pendingAction === 'hard') {
        performHardReset()
    } else if (pendingAction && pendingAction.startsWith('quickreset-')) {
        const player = parseInt(pendingAction.split('-')[1])
        performQuickReset(player)
    }
    history.back()
}

function resetRound() {
    openConfirmModal(getTxt('reset_round_msg'), "round")
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
    playerNames = ['TIM ALPHA', 'TIM BETA']
    isRoundActive = true

    document.getElementById('win-0').innerText = "0"
    document.getElementById('win-1').innerText = "0"
    
    saveGameData()
    render()
    renderHistory()
    updateScoreDifference()
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
