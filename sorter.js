
function endGame(){
    document.getElementById("greenCity").style.display="none";
}

function nextGame() {
    document.getElementById("city-builder-container").style.display="block";
    document.getElementById("turn-off-appliances-container").style.display="none";
}




const appliancesContainer = document.getElementById('appliances-container');
const totalScoreDisplay = document.getElementById('totalScore');
const restartGameButton = document.getElementById('restartGameButton');
const timerDisplay = document.getElementById('timer');

let currentScore = 0;
let timer;
let timeLeft = 30;

const appliances = [
    { name: 'Light', on: '💡', off: '🔅', type: 'turn-off' },
    { name: 'Fan', on: '🌬️', off: '🌫️', type: 'turn-off' },
    { name: 'TV', on: '📺', off: '📴', type: 'turn-off' },
    { name: 'Heater', on: '🔥', off: '❄️', type: 'turn-off' },
    { name: 'AC', on: '❄️', off: '🌡️', type: 'turn-off' },
    { name: 'Computer', on: '💻', off: '🖥️', type: 'turn-off' },
    { name: 'Washing Machine', on: '🧺', off: '🧼', type: 'turn-off' },
    { name: 'Microwave', on: '🍲', off: '🍲', type: 'turn-off' },
    { name: 'Fridge', on: '🥶', off: '❄️', type: 'turn-off' },
    { name: 'Oven', on: '🔥', off: '🍞', type: 'turn-off' },
    { name: 'Lamp', on: '🛋️', off: '🛋️', type: 'turn-off' },
    { name: 'Plant', on: '🌵', off: '🌵', type: 'non-turn-off' },
    { name: 'Clock', on: '⏰', off: '⏰', type: 'non-turn-off' },
    { name: 'Books', on: '📚', off: '📚', type: 'non-turn-off' },
    { name: 'Sofa', on: '🛋️', off: '🛋️', type: 'non-turn-off' },
    { name: 'Table', on: '🛏️', off: '🛏️', type: 'non-turn-off' },
    { name: 'Cup', on: '🍵', off: '🍵', type: 'non-turn-off' },
    { name: 'Game Console', on: '🎮', off: '🔌', type: 'turn-off' }, // New appliance
    { name: 'Kettle', on: '🍵', off: '🔥', type: 'turn-off' }, // New appliance
    { name: 'Dishwasher', on: '🍽️', off: '🚫', type: 'turn-off' }, // New appliance
];

function initializeGame() {
    currentScore = 0;
    timeLeft = 30;
    appliancesContainer.innerHTML = '';
    clearInterval(timer);

    appliances.forEach(appliance => {
        const div = document.createElement('div');
        div.className = 'appliance on';
        div.dataset.name = appliance.name;
        div.dataset.type = appliance.type;
        div.dataset.on = appliance.on;
        div.dataset.off = appliance.off;
        div.addEventListener('click', handleApplianceClick);

        const emojiSpan = document.createElement('span');
        emojiSpan.textContent = appliance.on;
        div.appendChild(emojiSpan);

        const nameP = document.createElement('p');
        nameP.textContent = appliance.name;
        div.appendChild(nameP);

        appliancesContainer.appendChild(div);
    });

    updateScore1();
    startTimer();
}

function handleApplianceClick(event) {
    const applianceDiv = event.currentTarget;
    const type = applianceDiv.dataset.type;
    const currentState = applianceDiv.classList.contains('on');
    const emojiSpan = applianceDiv.querySelector('span');

    if (type === 'turn-off') {
        if (currentState) {
            applianceDiv.classList.remove('on');
            applianceDiv.classList.add('off');
            emojiSpan.textContent = applianceDiv.dataset.off;
            updateScore1(10); // Correctly turning off an appliance
        } else {
            applianceDiv.classList.remove('off');
            applianceDiv.classList.add('on');
            emojiSpan.textContent = applianceDiv.dataset.on;
            updateScore1(-10); // Incorrectly turning on an appliance
        }
    } else {
        if (currentState) {
            applianceDiv.classList.remove('on');
            applianceDiv.classList.add('off');
            emojiSpan.textContent = applianceDiv.dataset.off;
            updateScore1(-10);
        } else {
            applianceDiv.classList.remove('off');
            applianceDiv.classList.add('on');
            emojiSpan.textContent = applianceDiv.dataset.on;
            updateScore1(10);
        }
    }
}

function updateScore1(change = 0) {
    currentScore += change;
    totalScoreDisplay.textContent = `Score: ${currentScore}`;
}

function startTimer() {
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert(`Game Over! Your final score is ${((currentScore/140)*100).toFixed(0)}%`);
            nextGame();
        }
    }, 1000);
}

initializeGame();





const gridContainer = document.getElementById('grid-container');
const scoreDisplay = document.getElementById('score');
const moneyDisplay = document.getElementById('money');
const resetButton = document.getElementById('resetButton');
const optionButtons = document.querySelectorAll('.option-btn');

let score = 0;
let money = 50;
let selectedOption = null;
let gridItems = [];
let numRows = 5;
let numCols = 10;

function greenCity() {
    score = 0;
    money = 50;
    selectedOption = null;
    gridItems = [];
    gridContainer.innerHTML = '';

    for (let i = 0; i < numRows * numCols; i++) {
        const div = document.createElement('div');
        div.className = 'grid-cell';
        div.addEventListener('click', handleCellClick);
        gridContainer.appendChild(div);
        gridItems.push(div);
    }

    updateScore();
    updateMoney();
}

function handleCellClick(event) {
    if (selectedOption) {
        const cell = event.target;
        const { type, score: optionScore, cost: optionCost } = selectedOption.dataset;

        if (!cell.classList.contains('selected') && money + parseInt(optionCost) >= 0) {
            cell.textContent = selectedOption.textContent;
            cell.dataset.type = type;
            cell.dataset.score = optionScore;
            cell.dataset.cost = optionCost;
            cell.classList.add('selected');
            cell.classList.add(type === 'positive' ? 'clicked' : 'incorrect');
            updateScore(parseInt(optionScore));
            updateMoney(parseInt(optionCost));
        }
    }
}

function updateScore(change = 0) {
    score += change;
    scoreDisplay.textContent = `Score: ${score}`;
}

function updateMoney(change = 0) {
    money -= change;
    moneyDisplay.textContent = `Coins: ${money}`;
    if(money==0){
        alert(`Game Over! Your final score is ${score}`);
    }
}

function handleOptionClick(event) {
    selectedOption = event.target;
    optionButtons.forEach(button => button.classList.remove('active'));
    selectedOption.classList.add('active');
}

optionButtons.forEach(button => {
    button.addEventListener('click', handleOptionClick);
});

resetButton.addEventListener('click', greenCity);

greenCity();