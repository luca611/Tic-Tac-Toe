let xAction = 0;
let oAction = 0;
let isAwin = false;

// Function to set the X or O in the cell
function set(id) {
    if (isAwin) return;
    cell = document.getElementById(id);
    if (xAction === oAction) {
        cell.classList.add("x");
        cell.innerHTML = "X";
        cell.onclick = null;
        xAction++;
    } else {
        cell.classList.add("o");
        cell.innerHTML = "O";
        cell.onclick = null;
        oAction++;
    }
    checkTris();
    if (isAwin) return;
    adjustBackground();
    fixText();
}

// Function to adjust the background color
function adjustBackground() {
    if (xAction === 0) {
        document.body.classList.remove("bodyPlayer2");
        cells = document.getElementsByClassName("cell");
        for (let i = 0; i < cells.length; i++) {
            cells[i].classList.remove("bodyPlayer2");
        }
        return;
    }
    document.body.classList.toggle("bodyPlayer2");
    cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.toggle("bodyPlayer2");
    }

}

// Function to change the player name and color
function fixText() {
    playerName = document.getElementById("playerName");
    if (xAction === oAction) {
        playerName.innerHTML = "Player 1";
        playerName.classList.add("orange");
        playerName.classList.remove("Blue");

    } else {
        playerName.innerHTML = "Player 2";
        playerName.classList.add("Blue");
        playerName.classList.remove("orange");
    }

}

// Function to check if there is a winning combination
function checkTris() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const cells = document.getElementsByClassName("cell");

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        const cellA = cells[a];
        const cellB = cells[b];
        const cellC = cells[c];

        if (cellA.classList.contains("x") && cellB.classList.contains("x") && cellC.classList.contains("x")) {
            setTimeout(() => {
                cellA.classList.add("green");
            }, 200);
            setTimeout(() => {
                cellB.classList.add("green");
            }, 400);
            setTimeout(() => {
                cellC.classList.add("green");
            }, 600);
            // X wins
            isAwin = true;
            showVictory(1);
            return;
        } else if (cellA.classList.contains("o") && cellB.classList.contains("o") && cellC.classList.contains("o")) {
            // O wins
            setTimeout(() => {
                cellA.classList.add("green");
            }, 200);
            setTimeout(() => {
                cellB.classList.add("green");
            }, 400);
            setTimeout(() => {
                cellC.classList.add("green");
            }, 600);
            isAwin = true;
            showVictory(2);
            return;
        }
    }

    // Check for a draw
    if (xAction + oAction === 9) {
        // It's a draw
        isAwin = true;
        showVictory(3);
    }
}

// Function to show victory message and confetti animation with a delay
function showVictory(type) {

    setTimeout(() => {
        //just toggling the classes to show the victory message
        document.getElementById('overlay').classList.toggle("overlay")
        document.getElementById('Icon');
        const victory = document.getElementById('victory');
        victory.classList.toggle("hide-message");
        victory.classList.toggle("winning-message")
        msg = document.getElementById('msg');
        if (type === 1) {
            Icon.innerHTML = "❌";
            msg.innerHTML = "Player 1 wins!";
        } else if (type === 2) {
            Icon.innerHTML = "⭕";
            msg.innerHTML = "Player 2 wins!";
        } else {
            Icon.innerHTML = "🤝";
            msg.innerHTML = "It's a draw!";
        }
        confettiRain();
    }, 2000);
}


// Function to create confetti animation
function confettiRain() {
    //generating 10 divs with random properties to create the confetti (rezie will break it a bit, but it's fine for now)
    for (let i = 0; i < 10; i++) {
        const randomRotation = Math.floor(Math.random() * 360);
        const randomWidth = Math.floor(Math.random() * Math.max(document.documentElement.clientWidth, window.innerWidth || 0));
        const randomHeight = Math.floor(Math.random() * Math.max(document.documentElement.clientHeight, window.innerHeight || 0));
        const randomAnimationDelay = Math.floor(Math.random() * 10);
        console.log(randomAnimationDelay)

        //colors for the confetti
        const colors = ['#0CD977', '#FF1C1C', '#FF93DE', '#5767ED', '#FFC61C', '#8497B0']
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.top = randomHeight + 'px';
        confetti.style.left = randomWidth + 'px';
        confetti.style.backgroundColor = randomColor;
        confetti.style.transform = 'skew(15deg) rotate(' + randomRotation + 'deg)';
        confetti.style.animationDelay = randomAnimationDelay + 's';
        document.getElementById("confetti-wrapper").appendChild(confetti);
    }
}

// Function to delete confetti animation
function deleteConfetti() {
    const confettiWrapper = document.getElementById("confetti-wrapper");
    while (confettiWrapper.firstChild) {
        confettiWrapper.removeChild(confettiWrapper.firstChild);
    }
}

// Function to reset the game
function resetGame() {
    xAction = 0;
    oAction = 0;
    isAwin = false;
    const cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove("green");
        cells[i].classList.remove("x", "o");
        cells[i].innerHTML = "";
        cells[i].onclick = function () {
            set(cells[i].id);
        };
    }
    document.getElementById("playerName").innerHTML = "Player 1";
    playerName = document.getElementById("playerName");
    playerName.classList.add("orange");
    playerName.classList.remove("Blue");
    document.getElementById('overlay').classList.toggle("overlay");
    document.getElementById('victory').classList.toggle("hide-message");
    document.getElementById('victory').classList.remove("winning-message");
    adjustBackground();
    deleteConfetti();
}
