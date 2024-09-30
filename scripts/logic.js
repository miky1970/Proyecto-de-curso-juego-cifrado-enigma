document.addEventListener('DOMContentLoaded', () => {
    const COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
    let secretCode = [];
    let currentGuess = [];
    let attempts = 0;
    let remainingAttempts = 10;

    function generateSecretCode() {
        secretCode = [];
        for (let i = 0; i < 4; i++) {
            const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
            secretCode.push(randomColor);
        }
        console.log('Código secreto:', secretCode);  // Para debugging
    }

    function createRow() {
        const row = document.createElement('div');
        row.className = 'code-row';
        
        for (let i = 0; i < 4; i++) {
            const pin = document.createElement('div');
            pin.className = 'pin';
            pin.addEventListener('click', () => selectColor(pin, i));
            row.appendChild(pin);
        }

        // Añadir contenedor para las bolitas de retroalimentación
        const feedbackContainer = document.createElement('div');
        feedbackContainer.className = 'feedback-container';
        for (let i = 0; i < 4; i++) {
            const feedbackPin = document.createElement('div');
            feedbackPin.className = 'feedback-pin';
            feedbackContainer.appendChild(feedbackPin);
        }
        row.appendChild(feedbackContainer);

        document.getElementById('code-rows').appendChild(row);
        currentGuess = ['gray', 'gray', 'gray', 'gray'];
    }

    function selectColor(pin, index) {
        const currentColor = COLORS.indexOf(currentGuess[index]);
        const nextColor = (currentColor + 1) % COLORS.length;
        currentGuess[index] = COLORS[nextColor];
        pin.style.backgroundColor = COLORS[nextColor];
    }

    function updateFeedback(row, correctPositions, correctColors) {
        const feedbackPins = row.querySelectorAll('.feedback-pin');
        for (let i = 0; i < correctPositions; i++) {
            feedbackPins[i].style.backgroundColor = 'black';
        }
        for (let i = correctPositions; i < correctPositions + correctColors; i++) {
            feedbackPins[i].style.backgroundColor = 'white';
        }
        for (let i = correctPositions + correctColors; i < 4; i++) {
            feedbackPins[i].style.backgroundColor = 'gray';
        }
    }

    function checkGuess() {
        let correctColors = 0;
        let correctPositions = 0;

        currentGuess.forEach((color, index) => {
            if (secretCode[index] === color) {
                correctPositions++;
            } else if (secretCode.includes(color)) {
                correctColors++;
            }
        });

        const currentRow = document.querySelectorAll('.code-row')[attempts];
        updateFeedback(currentRow, correctPositions, correctColors);

        attempts++;
        remainingAttempts--;
        document.getElementById('remaining-attempts').textContent = remainingAttempts;

        if (correctPositions === 4) {
            alert('¡Has ganado!');
        } else if (remainingAttempts === 0) {
            alert('Has alcanzado el número máximo de intentos. El código era: ' + secretCode.join(', '));
        } else {
            createRow();
        }
    }

    function resetGame() {
        attempts = 0;
        remainingAttempts = 10;
        document.getElementById('remaining-attempts').textContent = remainingAttempts;
        document.getElementById('code-rows').innerHTML = '';
        generateSecretCode();
        createRow();
    }

    document.getElementById('check-btn').addEventListener('click', checkGuess);
    document.getElementById('reset-btn').addEventListener('click', resetGame);

    generateSecretCode();
    createRow();
});
