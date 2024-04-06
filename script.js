const sentences = [
    "A year older, a year bolder...",
    "May this year bring you endless joy...",
    "And so the adventure begins...",
    "To more amazing memories...",
    "Let the celebrations begin...",
];

let currentSentence = 0;
const sentenceElement = document.getElementById("sentence");
const confettiCanvas = document.getElementById("confetti");
const confettiContext = confettiCanvas.getContext("2d");
const restartButton = document.getElementById("restart");
let confettiParticles = [];

confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

document.body.addEventListener("click", () => {
    if (currentSentence < sentences.length) {
        sentenceElement.style.opacity = 0;
        setTimeout(() => {
            sentenceElement.innerText = sentences[currentSentence];
            sentenceElement.style.opacity = 1;
            currentSentence++;
        }, 2000);
    } else if (currentSentence === sentences.length) {
        displayBirthdayMessage();
        // Remove event listener to stop further clicks from affecting the flow
        document.body.removeEventListener("click", arguments.callee);
    }
});

function displayBirthdayMessage() {
    sentenceElement.innerText = "Happy Birthday!";
    confettiCanvas.style.display = "block";
    restartButton.classList.remove("hidden");
    for (let i = 0; i < 100; i++) {
        confettiParticles.push(createConfettiParticle());
    }
    drawConfetti();
}

restartButton.addEventListener("click", () => {
    window.location.reload();
});

function createConfettiParticle() {
    return {
        x: Math.random() * confettiCanvas.width,
        y: 0,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 + 2,
        size: Math.random() * 5 + 5,
        color: `hsla(${Math.random() * 360}, 100%, 50%, 1)`,
    };
}

function drawConfetti() {
    confettiContext.clearRect(
        0,
        0,
        confettiCanvas.width,
        confettiCanvas.height
    );
    confettiParticles.forEach((particle, index) => {
        let x = particle.x + particle.speedX;
        let y = particle.y + particle.speedY;

        if (y > confettiCanvas.height) {
            confettiParticles[index] = createConfettiParticle();
        } else {
            particle.x = x;
            particle.y = y;
        }

        confettiContext.fillStyle = particle.color;
        confettiContext.fillRect(x, y, particle.size, particle.size);
    });

    requestAnimationFrame(drawConfetti);
}
