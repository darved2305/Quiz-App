const quizData = [
    {
        question: "What's the fastest land animal? 🏃‍♂️",
        options: ["Cheetah", "Lion", "Tiger", "Leopard"],
        correct: 0
    },
    {
        question: "Which planet is known as the Red Planet? 🔴",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What's the largest ocean on Earth? 🌊",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correct: 3
    },
    {
        question: "Who painted the Mona Lisa? 🎨",
        options: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Michelangelo"],
        correct: 2
    },
    {
        question: "What's the chemical symbol for gold? ✨",
        options: ["Go", "Gd", "Au", "Ag"],
        correct: 2
    },
    {
        question: "Which is the smallest country in the world? 🏰",
        options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
        correct: 1
    },
    {
        question: "How many hearts does an octopus have? 🐙",
        options: ["1", "2", "3", "4"],
        correct: 2
    },
    {
        question: "What's the hardest natural substance? 💎",
        options: ["Gold", "Iron", "Diamond", "Platinum"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = -1;

function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 8 + 4 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = Math.random() * 3 + 3 + 's';
        particle.style.background = `hsl(${Math.random() * 360}, 100%, 80%)`;
        particlesContainer.appendChild(particle);
        setTimeout(() => particle.remove(), 6000);
    }, 300);
}

function createFireworks() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = Math.random() * 100 + '%';
            firework.style.top = Math.random() * 100 + '%';
            firework.style.background = `hsl(${Math.random() * 360}, 100%, 60%)`;
            document.body.appendChild(firework);
            setTimeout(() => firework.remove(), 1000);
        }, i * 200);
    }
}

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = `hsl(${Math.random() * 360}, 100%, 60%)`;
            confetti.style.animationDelay = Math.random() * 3 + 's';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }, i * 50);
    }
}

function startQuiz() {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    const question = quizData[currentQuestion];
    document.getElementById('question').textContent = question.question;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    selectedOption = -1;

    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionElement);
    });

    updateProgress();
    document.getElementById('next-btn').style.display = 'none';
}

function selectOption(index) {
    if (selectedOption !== -1) return;
    selectedOption = index;
    const options = document.querySelectorAll('.option');
    const correctIndex = quizData[currentQuestion].correct;
    options[index].classList.add('selected');

    setTimeout(() => {
        options[correctIndex].classList.add('correct');
        if (index !== correctIndex) {
            options[index].classList.add('incorrect');
        } else {
            score++;
            document.getElementById('score').textContent = score;
            createFireworks();
        }
        document.getElementById('next-btn').style.display = 'block';
    }, 500);
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    document.getElementById('progress').style.width = progress + '%';
}

function showResults() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('final-score').textContent = score + '/' + quizData.length;

    const percentage = (score / quizData.length) * 100;
    let message = '';
    if (percentage === 100) {
        message = '🏆 PERFECT SCORE! You are a QUIZ MASTER! 🏆';
        createConfetti();
    } else if (percentage >= 80) {
        message = '🌟 AMAZING! You really know your stuff! 🌟';
    } else if (percentage >= 60) {
        message = '👍 Good job! Keep learning! 👍';
    } else {
        message = '📚 Time to hit the books! You can do better! 📚';
    }
    document.getElementById('result-message').textContent = message;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedOption = -1;
    document.getElementById('score').textContent = '0';
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('welcome-screen').classList.remove('hidden');
}

createParticles();
