// 1. BANCO DE DATOS (Se elegirá una aleatoria por cada nivel)
const levelPool = [
    [{pass: "ROOT", hint: "Usuario con máximo privilegio."}, {pass: "OPEN", hint: "Antónimo de cerrado."}],
    [{pass: "GATE", hint: "Puerta de enlace de red."}, {pass: "LINK", hint: "Conexión entre nodos."}],
    [{pass: "VAULT", hint: "Bóveda de alta seguridad."}, {pass: "GOLD", hint: "Metal precioso almacenado."}],
    [{pass: "ADMIN", hint: "Credencial estándar de gestión."}, {pass: "LOGIN", hint: "Acceso al sistema."}],
    [{pass: "SHELL", hint: "Interfaz de línea de comandos."}, {pass: "LINUX", hint: "Pingüino informático."}],
    [{pass: "BINARY", hint: "Base 2: ceros y unos."}, {pass: "HIDDEN", hint: "Invisible al usuario común."}],
    [{pass: "FIREWALL", hint: "Muro de protección digital."}, {pass: "NETWORK", hint: "Conjunto de equipos interconectados."}],
    [{pass: "DATABASE", hint: "Almacén estructurado de datos."}, {pass: "PROTOCOL", hint: "Reglas de transferencia."}],
    [{pass: "ALGORITHM", hint: "Serie de pasos lógicos."}, {pass: "MAINFRAME", hint: "Servidor central de gran potencia."}],
    [{pass: "CYBERPUNK", hint: "Estética de alta tecnología."}, {pass: "ENIGMA", hint: "El misterio final."}]
];

let currentLevel = 0;
let attemptsLeft = 3;
let timeLeft = 90; 
let activePass = "";
let timerInterval;
const SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

// Elementos
const intro = document.getElementById('intro-screen');
const game = document.getElementById('game-screen');
const startBtn = document.getElementById('start-btn');
const scrambleOut = document.getElementById('scramble-output');
const hintOut = document.getElementById('hint-output');
const levelLabel = document.getElementById('level-label');
const timerOut = document.getElementById('timer');
const input = document.getElementById('terminal-input');
const execBtn = document.getElementById('exec-btn');
const feedback = document.getElementById('feedback');
const detectionMeter = document.getElementById('detection-meter');
const failOverlay = document.getElementById('fail-overlay');

// INICIO
startBtn.addEventListener('click', () => {
    intro.classList.add('d-none');
    game.classList.remove('d-none');
    startTimer();
    loadLevel();
});

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        let mins = Math.floor(timeLeft / 60);
        let secs = timeLeft % 60;
        timerOut.innerText = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        if (timeLeft <= 0) triggerFail();
    }, 1000);
}

function loadLevel() {
    feedback.innerText = "";
    if (currentLevel < levelPool.length) {
        // --- SELECCIÓN ALEATORIA DEL NIVEL ---
        const pool = levelPool[currentLevel];
        const selection = pool[Math.floor(Math.random() * pool.length)];
        activePass = selection.pass;
        
        levelLabel.innerText = `CAPA_DINÁMICA: ${String(currentLevel + 1).padStart(2, '0')}`;
        hintOut.innerText = `Pista: ${selection.hint}`;
        
        runScrambleEffect(activePass.length);
        input.value = "";
        input.focus();
    } else {
        victory();
    }
}

function runScrambleEffect(len) {
    let its = 0;
    const interval = setInterval(() => {
        let res = "";
        for(let i=0; i<len; i++) res += SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        scrambleOut.innerText = res;
        its++;
        if(its > 12) clearInterval(interval);
    }, 50);
}

function validate() {
    const val = input.value.toUpperCase().trim();
    
    // --- COMANDOS OCULTOS ---
    if (val === "MATRIX") {
        document.body.style.filter = "hue-rotate(90deg) brightness(1.1)";
        feedback.innerText = "OVERRIDE_VISUAL_SUCCESS";
        input.value = ""; return;
    }
    if (val === "REBOOT") {
        location.reload(); return;
    }
    if (val === "HELP") {
        feedback.innerText = "ACCESO_DENEGADO";
        feedback.style.color = "cyan";
        input.value = ""; return;
    }

    // --- LÓGICA DE JUEGO ---
    if (val === activePass) {
        feedback.innerText = "AUTENTICACIÓN CORRECTA.";
        feedback.style.color = "var(--neon-green)";
        currentLevel++;
        setTimeout(loadLevel, 800);
    } else {
        attemptsLeft--;
        updateDetectionUI();
        feedback.innerText = "ALERTA: CREDENCIALES INVÁLIDAS.";
        feedback.style.color = "#ff3131";
    }
    input.value = "";
}

function updateDetectionUI() {
    detectionMeter.innerHTML = "";
    for(let i=0; i<attemptsLeft; i++) {
        detectionMeter.innerHTML += '<i class="fa-solid fa-triangle-exclamation"></i>';
    }
    if (attemptsLeft <= 0) triggerFail();
}

function triggerFail() {
    clearInterval(timerInterval);
    failOverlay.classList.remove('d-none');
    setTimeout(() => location.reload(), 3500);
}

function victory() {
    clearInterval(timerInterval);
    scrambleOut.innerText = "GRANT_ACCESS";
    hintOut.innerText = "BÓVEDA ABIERTA. EXTRACCIÓN INICIADA.";
    input.style.display = "none";
    execBtn.style.display = "none";
}

execBtn.addEventListener('click', validate);
input.addEventListener('keypress', (e) => { if(e.key === 'Enter') validate(); });