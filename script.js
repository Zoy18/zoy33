document.getElementById('roll-btn').addEventListener('click', function() {
    const d1 = document.getElementById('dice1');
    const d2 = document.getElementById('dice2');
    const status = document.getElementById('status');
    const totalDisplay = document.getElementById('total');

    // Start Animation
    d1.classList.add('rolling');
    d2.classList.add('rolling');
    status.innerText = "Rolling...";

    setTimeout(() => {
        // Stop Animation
        d1.classList.remove('rolling');
        d2.classList.remove('rolling');

        // Generate Numbers
        const roll1 = Math.floor(Math.random() * 6) + 1;
        const roll2 = Math.floor(Math.random() * 6) + 1;
        const total = roll1 + roll2;

        // Update UI
        d1.innerText = roll1;
        d2.innerText = roll2;
        status.innerText = `You rolled ${roll1} and ${roll2}!`;
        totalDisplay.innerText = `Total: ${total}`;
    }, 600);
});