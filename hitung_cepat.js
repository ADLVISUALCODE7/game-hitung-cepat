// --- 1. Ambil Elemen dari HTML (DOM) ---
const scoreBoard = document.getElementById('scoreBoard');
const timerDisplay = document.getElementById('timerDisplay');
const questionDisplay = document.getElementById('question');
const answerInput = document.getElementById('answerInput');
const submitBtn = document.getElementById('submitBtn');
const startButton = document.getElementById('startButton');
const gameArea = document.getElementById('gameArea');

// Ambil elemen Audio
const startSound = document.getElementById('startSound');
const endSound = document.getElementById('endSound');

// --- 2. Variabel Game ---
let score = 0;
let timeLeft = 30; 
let gameInterval;
let correctAnswer = 0;
let isGameRunning = false;

// --- 3. Fungsi Logika Game ---

function generateProblem() {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    
    correctAnswer = num1 + num2;
    questionDisplay.textContent = `${num1} + ${num2} = ?`;
    
    answerInput.value = '';
    answerInput.focus();
}

function checkAnswer() {
    if (!isGameRunning) return;

    const userAnswer = parseInt(answerInput.value);
    
    if (isNaN(userAnswer)) {
        alert("Masukkan angka yang valid!");
        answerInput.focus();
        return;
    }

    if (userAnswer === correctAnswer) {
        score++;
        scoreBoard.textContent = `Skor: ${score}`;
        generateProblem(); 
    } else {
        generateProblem(); 
    }
}

function endGame() {
    isGameRunning = false;
    clearInterval(gameInterval);
    
    // Suara Selesai Game
    endSound.play();
    
    alert(`Waktu Habis! Skor Akhir Anda: ${score} Jawaban Benar.`);
    
    startButton.style.display = 'block';
    gameArea.style.display = 'none';
    questionDisplay.textContent = '? + ? =';
    answerInput.value = '';
}

function startGame() {
    if (isGameRunning) return;

    // Suara Mulai Game
    startSound.play();

    // Reset dan atur ulang variabel
    score = 0;
    timeLeft = 30;
    isGameRunning = true;
    scoreBoard.textContent = `Skor: ${score}`;
    timerDisplay.textContent = `Waktu: ${timeLeft} detik`;
    
    startButton.style.display = 'none';
    gameArea.style.display = 'block';

    generateProblem(); 
    
    // Game Loop (Timer)
    gameInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Waktu: ${timeLeft} detik`;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000); 
}

// --- 4. Event Listener ---
startButton.addEventListener('click', startGame);
submitBtn.addEventListener('click', checkAnswer);

answerInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') { 
        checkAnswer();
    }
});