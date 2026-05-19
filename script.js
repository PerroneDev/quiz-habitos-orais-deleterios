// Base de dados das perguntas
const questions = [
    {
        question: "O que são hábitos orais deletérios?",
        options: [
            "Hábitos saudáveis da infância",
            "Comportamentos repetitivos que podem prejudicar o desenvolvimento da face e da boca",
            "Apenas doenças genéticas",
            "Problemas causados somente por má higiene",
            "Alterações comuns sem consequências"
        ],
        answerIndex: 1
    },
    {
        question: "Qual dos hábitos abaixo é considerado deletério?",
        options: [
            "Escovar os dentes",
            "Mastigar alimentos",
            "Chupar dedo com frequência",
            "Beber água",
            "Dormir cedo"
        ],
        answerIndex: 2
    },
    {
        question: "O uso prolongado de chupeta pode causar:",
        options: [
            "Melhor alinhamento dental",
            "Fortalecimento da mastigação",
            "Alterações na mordida e na arcada dentária",
            "Crescimento saudável do palato",
            "Nenhuma alteração"
        ],
        answerIndex: 2
    },
    {
        question: "A respiração oral acontece quando a criança:",
        options: [
            "Respira somente pelo nariz",
            "Respira principalmente pela boca",
            "Fala muito rápido",
            "Mastiga devagar",
            "Respira apenas dormindo"
        ],
        answerIndex: 1
    },
    {
        question: "Qual é um sinal de alerta relacionado aos hábitos orais deletérios?",
        options: [
            "Dormir com a boca fechada",
            "Boa mastigação",
            "Ronco ou respiração ruidosa",
            "Respiração silenciosa",
            "Postura corporal adequada"
        ],
        answerIndex: 2
    },
    {
        question: "A mordida aberta acontece quando:",
        options: [
            "Os dentes encaixam corretamente",
            "Existe espaço entre os dentes superiores e inferiores ao fechar a boca",
            "A língua fica escondida",
            "Os dentes ficam totalmente retos",
            "A criança perde dentes de leite"
        ],
        answerIndex: 1
    },
    {
        question: "Qual profissional pode ajudar na prevenção e orientação desses hábitos?",
        options: [
            "Engenheiro",
            "Veterinário",
            "Fonoaudiólogo",
            "Motorista",
            "Mecânico"
        ],
        answerIndex: 2
    },
    {
        question: "Até aproximadamente qual idade os hábitos deletérios devem ser desestimulados?",
        options: [
            "1 ano",
            "2 anos",
            "3 anos",
            "6 anos",
            "10 anos"
        ],
        answerIndex: 2
    },
    {
        question: "Qual função pode ser prejudicada pelos hábitos orais deletérios?",
        options: [
            "Apenas a audição",
            "Mastigação, fala e deglutição",
            "Apenas a visão",
            "Apenas a escrita",
            "Coordenação motora fina"
        ],
        answerIndex: 1
    },
    {
        question: "Qual estratégia é recomendada para retirada da chupeta ou dedo?",
        options: [
            "Retirada brusca com punição",
            "Ignorar completamente",
            "Retirada gradual e acolhedora",
            "Castigos frequentes",
            "Manter o hábito até a adolescência"
        ],
        answerIndex: 2
    }
];

// Estado do Jogo
let currentQuestionIndex = 0;
let score = 0;

// Elementos do DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const currentQuestionNum = document.getElementById('current-question-num');
const progressBar = document.getElementById('progress-bar');

const scoreText = document.getElementById('score-text');
const scoreCircle = document.querySelector('.score-circle');
const resultMessage = document.getElementById('result-message');
const resultTitle = document.getElementById('result-title');

// Event Listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', handleNextQuestion);
restartBtn.addEventListener('click', () => location.reload());

// Funções
function startQuiz() {
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    // Resetar botão e estado visual
    nextBtn.disabled = true;
    optionsContainer.style.opacity = '1';
    questionText.style.opacity = '1';

    const currentQuestion = questions[currentQuestionIndex];

    // Atualizar UI de progresso
    currentQuestionNum.textContent = currentQuestionIndex + 1;
    // O progresso visualiza a pergunta atual
    const progressPercentage = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    // Atualizar texto da pergunta
    questionText.textContent = currentQuestion.question;

    // Limpar opções anteriores
    optionsContainer.innerHTML = '';

    // Gerar novas opções
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.textContent = option;

        // Configuração inicial de animação
        button.style.opacity = '0';
        button.style.transform = 'translateY(15px)';

        button.addEventListener('click', () => selectOption(index, button));
        optionsContainer.appendChild(button);

        // Trigger de animação de entrada com delay
        setTimeout(() => {
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, 50 + index * 80);
    });
}

function selectOption(selectedIndex, selectedButton) {
    const currentQuestion = questions[currentQuestionIndex];
    const optionButtons = document.querySelectorAll('.option-btn');

    // Desabilitar todas as opções após o clique
    optionButtons.forEach(btn => {
        btn.disabled = true;
    });

    // Habilitar botão de Próxima Pergunta
    nextBtn.disabled = false;

    const isCorrect = selectedIndex === currentQuestion.answerIndex;

    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('wrong');
        // Mostrar a alternativa correta em verde
        optionButtons[currentQuestion.answerIndex].classList.add('correct');
    }
}

function handleNextQuestion() {
    currentQuestionIndex++;

    // Animação de saída antes de carregar a próxima pergunta
    optionsContainer.style.opacity = '0';
    questionText.style.opacity = '0';

    setTimeout(() => {
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 300);
}

function showResult() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');

    // Completar barra de progresso
    progressBar.style.width = '100%';

    // Atualizar texto do placar
    scoreText.textContent = `${score}/10`;

    // Limpar classes de resultado anteriores e aplicar nova
    scoreCircle.classList.remove('success', 'fail');

    // Condições de vitória/derrota (mais da metade = 6 ou mais acertos)
    if (score > 5) {
        resultTitle.textContent = "Parabéns!";
        resultMessage.textContent = "Você acertou mais da metade e ganhou uma prenda. Procure o apresentador!";
        scoreCircle.classList.add('success');
    } else {
        resultTitle.textContent = "Que pena!";
        resultMessage.textContent = "Você não atingiu a pontuação mínima, mas o importante é o que aprendeu!";
        scoreCircle.classList.add('fail');
    }
}
