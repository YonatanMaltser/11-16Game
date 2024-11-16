let wallet = 100;

function updateWallet(amount) {
    wallet += amount;
    document.getElementById("walletDisplay").textContent = wallet.toFixed(2);
}

function playGame() {
    const betAmount = parseFloat(document.getElementById("betAmount").value);
    const multiplier = parseFloat(document.getElementById("multiplier").value);

    if (betAmount > wallet) {
        alert("Insufficient funds!");
        return;
    }

    const winChance = 100 / multiplier;
    const randomRoll = Math.random() * 100;

    if (randomRoll <= winChance) {
        const profit = betAmount * multiplier;
        alert(`You won! Your profit is ${profit.toFixed(2)} coins.`);
        updateWallet(profit);
    } else {
        alert("You lost! Better luck next time.");
        updateWallet(-betAmount);
    }

    calculateProfit();
}

function calculateProfit() {
    const betAmount = parseFloat(document.getElementById("betAmount").value) || 0;
    const multiplier = parseFloat(document.getElementById("multiplier").value) || 1;

    const profit = betAmount * multiplier;

    document.getElementById("profitDisplay").textContent = profit.toFixed(2);
    document.getElementById("multiplierDisplay").textContent = `${multiplier.toFixed(2)}x`;
    updateWinChance(multiplier);
}

function updateWinChance(multiplier) {
    const winChance = (100 / multiplier).toFixed(2);

    document.getElementById("winChanceDisplay").textContent = `${winChance}%`;

    const progressCircle = document.querySelector(".progress");
    const maxOffset = 440;
    const offset = maxOffset - (maxOffset * winChance) / 100;
    progressCircle.style.strokeDashoffset = offset;
}

function applyMultiplier() {
    const multiplier = parseFloat(document.getElementById("multiplier").value);
    calculateProfit();
}

document.addEventListener("DOMContentLoaded", () => {
    // Update profit calculation when the page loads
    calculateProfit();

    // Add event listeners for real-time updates
    document.getElementById("betAmount").addEventListener("input", calculateProfit);
    document.getElementById("multiplier").addEventListener("input", calculateProfit);
});
