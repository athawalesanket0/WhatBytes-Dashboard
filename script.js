const xValues = [0, 25, 50, 75, 100];
const yValues = [1, 3, 9, 7, 2];

new Chart("myChart", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "#2563eb",
            borderColor: "#93c5fd",
            data: yValues
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
        scales: {
            yAxes: [{
                ticks: { min: 0, max: 10, display: false },
                gridLines: { display: false }
            }],
            xAxes: [{
                gridLines: { display: false }
            }]
        }
    }
});

const popUp = document.getElementById("popup-update");
const popUpModal = document.getElementById("popup-modal");
const popUpBtn = document.querySelector(".popup-btn");
const rankInput = document.getElementById('rank');
const percentageInput = document.getElementById('percentage');
const scoreInput = document.getElementById('score');
const displayRank = document.getElementById('display-rank');
const displayPercentage = document.getElementById('display-percentage');
const displayScore = document.getElementById('display-score');
const displaySummaryScore = document.getElementById('display-summary-score');
const displayCorrectScore = document.getElementById('display-correct-score');
const displayPercentageScore = document.getElementById('display-percentage-score');
const progressCircle = document.getElementById('progress-circle').querySelector('.progress');
const totalScore = 15;
const circumference = 2 * Math.PI * 80;

progressCircle.style.strokeDasharray = circumference;

popUp.addEventListener('click', function () {
    popUpModal.classList.add('show');
})
popUpBtn.addEventListener('click', function (event) {
    if (event.target.classList.contains('cancel')) {
        popUpModal.classList.remove('show');
    }
    else if (event.target.classList.contains('save')) {
        let valid = true;

        if (!rankInput.value) {
            showError(rankInput, 'Rank is required.');
            valid = false;
        } else {
            clearError(rankInput);
        }

        if (!percentageInput.value) {
            showError(percentageInput, 'Percentage is required.');
            valid = false;
        } else {
            clearError(percentageInput);
        }

        if (!scoreInput.value) {
            showError(scoreInput, 'Score is required.');
            valid = false;
        } else {
            clearError(scoreInput);
        }

        if (valid) {
            const score = parseInt(scoreInput.value);
            const percentage = (score / totalScore * 100).toFixed(2);
            const offset = circumference - (score / totalScore * circumference);

            displayRank.textContent = rankInput.value;
            displayPercentage.textContent = percentageInput.value + '%';
            displayScore.textContent = `${scoreInput.value}/15`;
            displaySummaryScore.textContent = `${scoreInput.value}/15`;
            displayCorrectScore.textContent = scoreInput.value;
            displayPercentageScore.textContent = `${percentage}%`;

            progressCircle.style.strokeDashoffset = offset;
            popUpModal.classList.remove('show');
        }
    }
});

function showError(input, message) {
    const errorElement = document.getElementById(`${input.id}-error`);
    errorElement.textContent = message;
}

function clearError(input) {
    const errorElement = document.getElementById(`${input.id}-error`);
    errorElement.textContent = '';
}