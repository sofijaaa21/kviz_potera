let teamSteps = 0;
let chaserSteps = 0;
let timeLeft = 120; // Vreme za igrača
let chaserTimeLeft = 120; // Vreme za tragača
let timer;
let chaserTimer;
let gamePaused = false; // Praćenje stanja igre
let isChaserTurn = false; // Da li je na redu tragač

function startFinalChase() {
    
    document.getElementById("menu").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("gameTitle").textContent = "Finalna potera";
    document.getElementById("stepCount").textContent = `Koraci: ${teamSteps}`;
    document.getElementById("answerList").innerHTML = "";
    timeLeft = 120;
    chaserSteps = 0;
    gamePaused = false;
    isChaserTurn = false;
    startTimer();
    document.getElementById("resumeButton").style.display = "none";
}

function startTimer() {
    document.getElementById("pozadinska").play();
    timer = setInterval(() => {
        if (gamePaused) return;
        timeLeft--;
        document.getElementById("timer").textContent = `Vreme: ${timeLeft}`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            pauseGame();
        }
    }, 1000);
}

function moveTeam() {
    if (gamePaused) return;
    if (isChaserTurn) {
        moveChaser();
        return;
    }

    teamSteps++;
    document.getElementById("stepCount").textContent = `Koraci: ${teamSteps}`;
    
    let answerList = document.getElementById("answerList");
    let listItem = document.createElement("div");
    listItem.classList.add("answer-item");
    listItem.textContent = `✅ ${teamSteps}`;
    listItem.style.backgroundColor = "red";
    answerList.appendChild(listItem);
    document.getElementById("tacno_igrac").play();
}

function moveChaser() {
    let answerItems = document.querySelectorAll(".answer-item");

    if (chaserSteps < teamSteps ) {
        answerItems[chaserSteps].style.backgroundColor = "blue";
        chaserSteps++;
        document.getElementById("tacno_igrac").play();
    }

    document.getElementById("stepCount").textContent = `Koraci: ${teamSteps - chaserSteps}`;

    if (chaserSteps >= teamSteps) {
        document.getElementById("loseSound").play();
        showAlert("Tragač je sustigao tim! Kraj igre.", 5000, () => resetGame());
    }
}

function showAlert(message, duration = 5000, callback = null) {
    const alertBox = document.getElementById("customAlert");
    alertBox.textContent = message;
    alertBox.style.display = "block";

    setTimeout(() => {
        alertBox.style.display = "none";
        
        if (callback) {
            setTimeout(callback, 2000); // Čeka još 2 sekunde pre resetovanja
        }
    }, duration);
}

function pauseGame() {
    gamePaused = true;
    clearInterval(timer);
    document.getElementById("resumeButton").style.display = "inline";
    showAlert("Vreme je isteklo za igrača! Kliknite da tragač počne.");
    document.getElementById("pozadinska").pause();
    document.getElementById("moveTeam").style.display = "none";
}

function resumeChaser() {
    gamePaused = false;
    document.getElementById("resumeButton").style.display = "none";
    startChaserTurn();
    document.getElementById("pozadinska").play();
}

function startChaserTurn() {
    isChaserTurn = true;
    document.getElementById("question").textContent = "Tragač sada odgovara!";
    chaserSteps = 0;
    chaserTimeLeft = 120;

    chaserTimer = setInterval(() => {
        if (gamePaused) return;

        chaserTimeLeft--;
        document.getElementById("timer").textContent = `Vreme Tragača: ${chaserTimeLeft}`;
        
        if (chaserTimeLeft <= 0) {
            clearInterval(chaserTimer);
            document.getElementById("end").play();
            
            showAlert("Tim je pobedio u finalnoj poteri!", 5000, () => resetGame());
        }
    }, 1000);
}

function resetGame() {
    setTimeout(() => {
        location.reload();
    }, 2000);
}
