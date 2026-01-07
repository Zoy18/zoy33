const symbols = ['🍒', '🍋', '🔔', '💎', '7️⃣', '⭐'];
let balance = 100;
let isSpinning = false;

const reels = [
    document.getElementById('reel1'),
    document.getElementById('reel2'),
    document.getElementById('reel3')
];
const spinBtn = document.getElementById('spin-btn');
const balanceDisplay = document.getElementById('balance-display');
const messageArea = document.getElementById('message-area');
const winnerScreen = document.getElementById('winner-screen');
const winText = document.getElementById('win-text');

spinBtn.addEventListener('click', () => {
    if (balance <= 0 || isSpinning) return;

    // Start Spin
    isSpinning = true;
    spinBtn.disabled = true;
    balance -= 10; // Cost per spin
    updateDisplay();
    messageArea.textContent = "Spinning...";

    let spinCount = 0;
    const interval = setInterval(() => {
        // Update display with random symbols every 200ms
        reels.forEach(reel => {
            reel.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        });
        
        spinCount++;
        if (spinCount > 10) { // Stops after ~2 seconds
            clearInterval(interval);
            checkWin();
        }
    }, 200);
});

function checkWin() {
    isSpinning = false;
    const results = reels.map(r => r.textContent);
    
    if (results[0] === results[1] && results[1] === results[2]) {
        let winAmount = 50;
        if (results[0] === '7️⃣') winAmount = 200;
        
        balance += winAmount;
        showWinner(results[0], winAmount);
    } else {
        spinBtn.disabled = balance <= 0;
        messageArea.textContent = balance <= 0 ? "GAME OVER" : "Try Again!";
    }
    updateDisplay();
}

function updateDisplay() {
    balanceDisplay.textContent = `Coins: ${balance}`;
}

function showWinner(symbol, amount) {
    winText.textContent = `JACKPOT! ${symbol} x 3 \n +${amount} Coins!`;
    winnerScreen.classList.remove('hidden');
}

function closeWinner() {
    winnerScreen.classList.add('hidden');
    spinBtn.disabled = false;
    messageArea.textContent = "Good Luck!";
}
