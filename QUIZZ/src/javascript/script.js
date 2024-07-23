// Declaração de variáveis;
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a","b","c","d"];

let points = 0;
let actualQuestion = 0;

//  Perguntas;
const questions = [
    {
        "question":"PHP foi desenvolvido para qual finalidade?",
        "answers":[
            {
                "answer":"back-end",
                "correct": true
            },
            {
                "answer":"Front-end",
                "correct":false
            },
            {
                "answer":"Sistema operacional",
                "correct": false
            },
            {
                "answer":"Banco de dados",
                "correct": false
            },
        ]
    },
    { 
        "question":"Qual a forma correta de declarar variável em Javascript:",
        "answers":[
            {
                "answer":"$var",
                "correct": false
            },
            {
                "answer":"_var",
                "correct":false
            },
            {
                "answer":"var",
                "correct": true
            },
            {
                "answer":"!var",
                "correct": false
            },
        ]
    },
    {
        "question":"Selecione a alternativa que corresponde ao seletor de ID do CSS:",
        "answers":[
            {
                "answer":".id",
                "correct": false
            },
            {
                "answer":"&id",
                "correct":false
            },
            {
                "answer":"_id",
                "correct": false
            },
            {
                "answer":"#id",
                "correct": true
            },
        ]
    },
    {
        "question":"Selecione a alternativa que corresponde ao seletor do estado Hover do CSS:",
        "answers":[
            {
                "answer":"::Hover",
                "correct": true
            },
            {
                "answer":"::Hover",
                "correct": false
            },
            {
                "answer":"<Hover>",
                "correct": false
            },
        ]
    },
]

// Substituição do quizz para a primeira pergunta;
function init(){
    //criar a primeira pergunta;
    createQuestion(0);
}
//Cria uma pergunta;
function createQuestion(i){

    //Limpar a questão anterior;
    const oldButtons = answersBox.querySelectorAll("button");
    oldButtons.forEach(function(btn){
        btn.remove()
    });
    //Alterar o texto da pergunta;
    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    //Insere as alternativas;
    questions[i].answers.forEach(function(answer, i){
        //Cria o template do botão do quizz;
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute("correct-answers", answer["correct"]);

        //Remover hide e tamplete class;
        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");
        //Inserir a alternativa na tela;
        answersBox.appendChild(answerTemplate);
        //Inserir um evento de click no botão;
        answerTemplate.addEventListener("click", function(){
            checkAnswer(this);
        });
    });

    actualQuestion++;
}

//Verificando resposta do usuário;
function checkAnswer(btn){
    //Seleciona todos os botões;
    const buttons = answersBox.querySelectorAll("button");
    //Verifica se a resposta esta corréta e adiciona classes nos botões;
    buttons.forEach(function(button){

        if(button.getAttribute("correct-answers") === "true"){
            button.classList.add("correct-answers");
            //checa se o usuário acertou a pergunta;
            if(btn === button){
                //incremento dos pontos;
                points++;
            }

        }else{
            button.classList.add("wrong-answer");
        }
    });

    //exibir próxima pergunta;
    nextQuestion();
    function nextQuestion(){
        //timer para o usuário ver as respostas;
        setTimeout(function(){
            //verifica se ainda há perguntas;
            if(actualQuestion >= questions.length){
                //apresenta uma mensagem de sucesso;
                showSuccessMassage();
                return;
            }

            createQuestion(actualQuestion);

        }, 1500);
    }

}
//Exibe a tela final;
function showSuccessMassage(){
    hideOrShowQuizz();
    // Trocar dados da tela de sucesso
    //calcular o score
    const score = ((points / questions.length)* 100).toFixed(2);

    const displayScore = document.querySelector("#display-score span");

    displayScore.textContent = score.toString();

    //alterar o número de perguntas corretas;
    const correctAnswers = document.querySelector("#correct-answers");
    correctAnswers.textContent = points;
    
    //alterar o total de perguntas;
    const totalQuestions = document.querySelector("#questions-qty");
    totalQuestions.textContent = questions.length;
}
//Mostra ou esconde o score;
function hideOrShowQuizz(){
    quizzContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");
}

//Reiniciar Quizz;
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function(){
    //Zerar o jogo;
    actualQuestion = 0;
    points = 0;
    hideOrShowQuizz();
    init();
})

//inicialização do quizz;
init()
